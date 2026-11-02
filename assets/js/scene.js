/* ============================================================
   Argon · 墨語 — Three.js hero scene
   A quiet jade orb, calligraphy words and orbit rings.
   ============================================================ */
(function () {
  "use strict";

  const HERO_WORDS = ["年齡", "婚姻", "文化", "語言", "旅行", "夢想"];
  const S = {
    active: false,
    canvas: null,
    renderer: null,
    scene: null,
    camera: null,
    root: null,
    orb: null,
    orbShell: null,
    ringA: null,
    ringB: null,
    particles: null,
    glow: null,
    textSprites: [],
    lights: {},
    materials: {},
    textures: [],
    raf: 0,
    width: 1,
    height: 1,
    dpr: 1,
    visible: true,
    dragging: false,
    pointer: { x: 0, y: 0, lastX: 0, lastY: 0 },
    targetRot: { x: 0.08, y: 0 },
    start: performance.now(),
    resizeObserver: null,
    abort: null,
    io: null,
    fontTimer: null
  };

  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
  const isDark = () => document.documentElement.getAttribute("data-theme") === "dark";

  function palette() {
    const dark = isDark();
    return dark
      ? {
          orb: 0x0ea5e9,
          orbEmissive: 0x075985,
          orbOpacity: 0.9,
          shell: 0x7dd3fc,
          ringA: 0x38bdf8,
          ringB: 0x2dd4bf,
          particles: 0x7dd3fc,
          glowA: "rgba(14,165,233,.38)",
          glowB: "rgba(45,212,191,.08)",
          text: ["#bae6fd", "#38bdf8"],
          textShadow: "rgba(2,132,199,.55)",
          ambient: 0.9,
          key: 1.5
        }
      : {
          orb: 0x38bdf8,
          orbEmissive: 0x0284c7,
          orbOpacity: 0.88,
          shell: 0x0284c7,
          ringA: 0x0284c7,
          ringB: 0x0f766e,
          particles: 0x0ea5e9,
          glowA: "rgba(56,189,248,.3)",
          glowB: "rgba(15,118,110,.08)",
          text: ["#075985", "#0284c7"],
          textShadow: "rgba(255,255,255,.55)",
          ambient: 1.15,
          key: 1.8
        };
  }

  function canWebGL() {
    try {
      const c = document.createElement("canvas");
      return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl") || c.getContext("experimental-webgl")));
    } catch {
      return false;
    }
  }

  function fallback() {
    const hero = S.canvas?.closest?.(".hero");
    if (hero) hero.classList.add("no-webgl");
  }

  function makeGlowTexture(p) {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    const g = ctx.createRadialGradient(256, 256, 10, 256, 256, 250);
    g.addColorStop(0, p.glowA);
    g.addColorStop(0.46, p.glowB);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 512);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    S.textures.push(tex);
    return tex;
  }

  function makeTextTexture(text, p) {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 320;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 640, 320);

    // A soft ink halo keeps the calligraphy legible over the orb.
    const halo = ctx.createRadialGradient(320, 164, 30, 320, 164, 190);
    halo.addColorStop(0, isDark() ? "rgba(6,18,29,.55)" : "rgba(255,255,255,.64)");
    halo.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, 640, 320);

    const grad = ctx.createLinearGradient(150, 0, 510, 0);
    grad.addColorStop(0, p.text[0]);
    grad.addColorStop(1, p.text[1]);
    ctx.font = '400 152px "Ma Shan Zheng", "Noto Serif TC", "Songti TC", serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = p.textShadow;
    ctx.shadowBlur = isDark() ? 20 : 10;
    ctx.fillStyle = grad;
    ctx.fillText(text, 320, 170);
    ctx.shadowBlur = 0;

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = Math.min(8, S.renderer?.capabilities?.getMaxAnisotropy?.() || 1);
    S.textures.push(tex);
    return tex;
  }

  function disposeTexture(tex) {
    if (!tex) return;
    const i = S.textures.indexOf(tex);
    if (i >= 0) S.textures.splice(i, 1);
    try { tex.dispose(); } catch { /* noop */ }
  }

  function makeRing(radius, color, opacity) {
    const geo = new THREE.TorusGeometry(radius, 0.007, 6, 240);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity, depthWrite: false });
    const ring = new THREE.Mesh(geo, mat);
    return ring;
  }

  function makeBead(color, size = 0.045) {
    const geo = new THREE.SphereGeometry(size, 10, 10);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 });
    return new THREE.Mesh(geo, mat);
  }

  function buildTextSprites() {
    const p = palette();
    const positions = [
      [-2.35, 0.94, 0.35, 1.36],
      [2.25, 0.62, 0.18, 1.28],
      [-1.72, -1.38, 0.55, 1.18],
      [1.82, -1.28, 0.4, 1.22],
      [0.22, 1.88, 0.05, 1.05],
      [-0.2, -1.92, 0.25, 1.08]
    ];
    HERO_WORDS.forEach((text, i) => {
      const map = makeTextTexture(text, p);
      const mat = new THREE.SpriteMaterial({
        map,
        transparent: true,
        depthWrite: false,
        opacity: 0.9
      });
      const sprite = new THREE.Sprite(mat);
      const [x, y, z, scale] = positions[i];
      sprite.position.set(x, y, z);
      sprite.scale.set(scale * 2.05, scale, 1);
      sprite.userData = {
        text,
        base: new THREE.Vector3(x, y, z),
        phase: i * 1.17,
        speed: 0.36 + (i % 3) * 0.1,
        scale
      };
      S.root.add(sprite);
      S.textSprites.push(sprite);
    });
  }

  function refreshTextSprites() {
    if (!S.active) return;
    const p = palette();
    S.textSprites.forEach((sprite) => {
      const old = sprite.material.map;
      sprite.material.map = makeTextTexture(sprite.userData.text, p);
      sprite.material.needsUpdate = true;
      disposeTexture(old);
    });
  }

  function refresh() {
    if (!S.active) return;
    const p = palette();
    if (S.materials.orb) {
      S.materials.orb.color.setHex(p.orb);
      S.materials.orb.emissive.setHex(p.orbEmissive);
      S.materials.orb.opacity = p.orbOpacity;
    }
    if (S.materials.shell) S.materials.shell.color.setHex(p.shell);
    if (S.materials.ringA) S.materials.ringA.color.setHex(p.ringA);
    if (S.materials.ringB) S.materials.ringB.color.setHex(p.ringB);
    if (S.materials.particles) S.materials.particles.color.setHex(p.particles);
    if (S.glow) {
      const old = S.glow.material.map;
      S.glow.material.map = makeGlowTexture(p);
      S.glow.material.needsUpdate = true;
      disposeTexture(old);
    }
    if (S.lights.ambient) S.lights.ambient.intensity = p.ambient;
    if (S.lights.key) S.lights.key.intensity = p.key;
    refreshTextSprites();
  }

  function addOrbitBeads() {
    const beads = [
      [1.92, 0, 0, 0x38bdf8],
      [-1.3, 1.28, 0.3, 0x2dd4bf],
      [1.18, -1.38, 0.2, 0x38bdf8],
      [-1.9, -0.2, -0.3, 0x7dd3fc]
    ];
    beads.forEach(([x, y, z, color]) => {
      const bead = makeBead(color, 0.035);
      bead.position.set(x, y, z);
      bead.userData.orbit = true;
      bead.userData.phase = Math.random() * Math.PI * 2;
      S.root.add(bead);
    });
  }

  function bindEvents() {
    const canvas = S.canvas;
    S.abort = new AbortController();
    const { signal } = S.abort;

    canvas.addEventListener("pointerdown", (e) => {
      S.dragging = true;
      S.pointer.lastX = e.clientX;
      S.pointer.lastY = e.clientY;
      canvas.setPointerCapture?.(e.pointerId);
      canvas.style.cursor = "grabbing";
    }, { signal });

    canvas.addEventListener("pointermove", (e) => {
      const rect = canvas.getBoundingClientRect();
      S.pointer.x = clamp(((e.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1, -1, 1);
      S.pointer.y = clamp(((e.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1, -1, 1);
      if (!S.dragging) return;
      const dx = e.clientX - S.pointer.lastX;
      const dy = e.clientY - S.pointer.lastY;
      S.pointer.lastX = e.clientX;
      S.pointer.lastY = e.clientY;
      S.targetRot.y += dx * 0.007;
      S.targetRot.x = clamp(S.targetRot.x + dy * 0.0045, -0.5, 0.5);
    }, { signal });

    const endDrag = () => {
      S.dragging = false;
      if (canvas) canvas.style.cursor = "grab";
    };
    canvas.addEventListener("pointerup", endDrag, { signal });
    canvas.addEventListener("pointercancel", endDrag, { signal });
    canvas.addEventListener("pointerleave", endDrag, { signal });

    document.addEventListener("visibilitychange", () => {
      S.visible = document.visibilityState === "visible";
    }, { signal });
  }

  function resize() {
    if (!S.active || !S.renderer || !S.canvas) return;
    const rect = S.canvas.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));
    if (w === S.width && h === S.height) return;
    S.width = w;
    S.height = h;
    S.renderer.setSize(w, h, false);
    S.camera.aspect = w / h;
    S.camera.updateProjectionMatrix();
  }

  function tick(now) {
    if (!S.active) return;
    S.raf = requestAnimationFrame(tick);
    if (!S.visible) return;

    const t = (now - S.start) / 1000;
    if (!S.dragging) {
      S.targetRot.y += 0.0014;
      S.targetRot.x += (-S.pointer.y * 0.09 - S.targetRot.x) * 0.005;
    }
    S.root.rotation.y += (S.targetRot.y - S.root.rotation.y) * 0.055;
    S.root.rotation.x += (S.targetRot.x - S.root.rotation.x) * 0.055;
    S.root.position.x += ((S.pointer.x * 0.1) - S.root.position.x) * 0.04;
    S.root.position.y += ((S.pointer.y * 0.06) - S.root.position.y) * 0.04;

    if (S.orb) {
      S.orb.rotation.y = t * 0.18;
      S.orb.rotation.z = Math.sin(t * 0.25) * 0.08;
    }
    if (S.orbShell) {
      S.orbShell.rotation.y = -t * 0.1;
      S.orbShell.rotation.x = t * 0.07;
    }
    if (S.ringA) {
      S.ringA.rotation.z = 0.16 + t * 0.08;
      S.ringA.rotation.x = 1.18 + Math.sin(t * 0.18) * 0.1;
    }
    if (S.ringB) {
      S.ringB.rotation.z = -0.42 - t * 0.055;
      S.ringB.rotation.y = 0.6 + Math.cos(t * 0.16) * 0.12;
    }
    if (S.glow) {
      const s = 4.45 + Math.sin(t * 0.7) * 0.08;
      S.glow.scale.set(s, s, 1);
    }

    S.textSprites.forEach((sprite) => {
      const d = sprite.userData;
      sprite.position.y = d.base.y + Math.sin(t * d.speed + d.phase) * 0.11;
      sprite.position.x = d.base.x + Math.cos(t * d.speed * 0.7 + d.phase) * 0.045;
      sprite.material.opacity = 0.78 + Math.sin(t * 0.6 + d.phase) * 0.13;
    });

    S.root.children.forEach((child) => {
      if (!child.userData.orbit) return;
      child.position.y += Math.sin(t * 0.8 + child.userData.phase) * 0.0005;
    });

    S.renderer.render(S.scene, S.camera);
  }

  function mount(canvas) {
    if (!canvas) return false;
    if (!window.THREE || !canWebGL()) {
      S.canvas = canvas;
      fallback();
      return false;
    }
    if (S.active && S.canvas === canvas) {
      resize();
      return true;
    }
    destroy();
    S.canvas = canvas;

    try {
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      S.renderer = renderer;

      const scene = new THREE.Scene();
      S.scene = scene;
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60);
      camera.position.set(0, 0.05, 6.25);
      S.camera = camera;

      const root = new THREE.Group();
      S.root = root;
      scene.add(root);

      const p = palette();

      const ambient = new THREE.HemisphereLight(0xdff5ff, 0x0b1f2e, p.ambient);
      S.lights.ambient = ambient;
      scene.add(ambient);

      const key = new THREE.DirectionalLight(0xe0f2fe, p.key);
      key.position.set(3.2, 4.6, 5.2);
      S.lights.key = key;
      scene.add(key);

      const rim = new THREE.PointLight(0x2dd4bf, 9, 14, 2);
      rim.position.set(-3.4, -1.2, 2.8);
      scene.add(rim);

      const sky = new THREE.PointLight(0x38bdf8, 7, 12, 2);
      sky.position.set(2.4, 2.6, 2);
      scene.add(sky);

      const glowMap = makeGlowTexture(p);
      const glow = new THREE.Sprite(new THREE.SpriteMaterial({
        map: glowMap,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: 0.95
      }));
      glow.position.z = -1.1;
      glow.scale.set(4.45, 4.45, 1);
      root.add(glow);
      S.glow = glow;

      const orbGeo = new THREE.IcosahedronGeometry(1.12, 5);
      const orbMat = new THREE.MeshStandardMaterial({
        color: p.orb,
        emissive: p.orbEmissive,
        emissiveIntensity: isDark() ? 0.5 : 0.24,
        roughness: 0.24,
        metalness: 0.36,
        transparent: true,
        opacity: p.orbOpacity
      });
      const orb = new THREE.Mesh(orbGeo, orbMat);
      root.add(orb);
      S.orb = orb;
      S.materials.orb = orbMat;

      const shellGeo = new THREE.IcosahedronGeometry(1.22, 2);
      const shellMat = new THREE.MeshBasicMaterial({
        color: p.shell,
        wireframe: true,
        transparent: true,
        opacity: isDark() ? 0.14 : 0.1,
        depthWrite: false
      });
      const shell = new THREE.Mesh(shellGeo, shellMat);
      root.add(shell);
      S.orbShell = shell;
      S.materials.shell = shellMat;

      const ringA = makeRing(1.92, p.ringA, isDark() ? 0.62 : 0.5);
      ringA.rotation.x = 1.18;
      ringA.rotation.z = 0.16;
      root.add(ringA);
      S.ringA = ringA;
      S.materials.ringA = ringA.material;

      const ringB = makeRing(2.38, p.ringB, isDark() ? 0.45 : 0.36);
      ringB.rotation.y = 0.6;
      ringB.rotation.z = -0.42;
      root.add(ringB);
      S.ringB = ringB;
      S.materials.ringB = ringB.material;

      addOrbitBeads();

      const count = 260;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = 2.7 + Math.random() * 2.1;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.72;
        positions[i * 3 + 2] = r * Math.cos(phi) * 0.52;
      }
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: p.particles,
        size: 0.026,
        transparent: true,
        opacity: isDark() ? 0.7 : 0.5,
        depthWrite: false,
        sizeAttenuation: true
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      root.add(particles);
      S.particles = particles;
      S.materials.particles = particleMat;

      buildTextSprites();
      bindEvents();

      S.active = true;
      S.visible = document.visibilityState === "visible";
      S.start = performance.now();
      S.targetRot = { x: 0.08, y: 0 };
      S.root.rotation.set(0.08, 0, 0);
      canvas.style.cursor = "grab";
      canvas.style.touchAction = "none";

      S.resizeObserver = new ResizeObserver(resize);
      S.resizeObserver.observe(canvas);
      resize();

      canvas.closest(".hero")?.classList.remove("no-webgl");
      S.raf = requestAnimationFrame(tick);

      // Canvas text needs the brush font; redraw once it is ready.
      if (document.fonts?.ready) {
        document.fonts.ready.then(() => {
          if (S.active) refreshTextSprites();
        }).catch(() => { /* noop */ });
      }
      S.fontTimer = setTimeout(() => {
        if (S.active) refreshTextSprites();
      }, 1600);

      return true;
    } catch (err) {
      console.warn("[ArgonScene] Could not start WebGL scene:", err);
      destroy();
      S.canvas = canvas;
      fallback();
      return false;
    }
  }

  function destroy() {
    S.active = false;
    if (S.raf) cancelAnimationFrame(S.raf);
    S.raf = 0;
    if (S.fontTimer) clearTimeout(S.fontTimer);
    S.fontTimer = null;
    S.abort?.abort();
    S.abort = null;
    S.resizeObserver?.disconnect();
    S.resizeObserver = null;
    S.io?.disconnect();
    S.io = null;

    if (S.scene) {
      S.scene.traverse((obj) => {
        if (obj.geometry) { try { obj.geometry.dispose(); } catch { /* noop */ } }
        if (obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => {
            if (m.map) { try { m.map.dispose(); } catch { /* noop */ } }
            try { m.dispose(); } catch { /* noop */ }
          });
        }
      });
    }
    S.textures.forEach((tex) => { try { tex.dispose(); } catch { /* noop */ } });
    S.textures = [];
    if (S.renderer) {
      try { S.renderer.dispose(); } catch { /* noop */ }
      try { S.renderer.forceContextLoss?.(); } catch { /* noop */ }
    }

    S.renderer = null;
    S.scene = null;
    S.camera = null;
    S.root = null;
    S.orb = null;
    S.orbShell = null;
    S.ringA = null;
    S.ringB = null;
    S.particles = null;
    S.glow = null;
    S.textSprites = [];
    S.lights = {};
    S.materials = {};
    S.width = 0;
    S.height = 0;
  }

  window.ArgonScene = { mount, destroy, refresh };
})();
