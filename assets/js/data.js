/* ============================================================
   Argon · 墨語 — Nội dung khóa TOCFL Band B (Level 4)
   Bài mẫu: Unit 1-1 · 個人資料
   Nguồn: The Ultimate Guide to Chinese Vocabulary & TOCFL
          Band B Level 4 + audio B2-audio/01-1.mp3
   ============================================================ */

const COURSE = {
  id: "tocfl-b2",
  title: "TOCFL Band B · Level 4",
  subtitle: "華語文能力測驗 · 高階篇",
  totalThemes: 10,
  totalUnits: 30,
  themes: [
    {
      n: 1,
      zh: "個人資料",
      vi: "Thông tin cá nhân",
      units: [
        { id: "1-1", zh: "姓名、國籍、出生、年齡、性別、婚姻", vi: "Họ tên, quốc tịch, ngày sinh, tuổi, giới tính, hôn nhân", page: 10, audio: "B2-audio/01-1.mp3", available: true },
        { id: "1-2", zh: "職業、宗教、信仰、家人、喜惡、外貌", vi: "Nghề nghiệp, tôn giáo, tín ngưỡng, gia đình, sở thích, ngoại hình", page: 16, available: false },
        { id: "1-3", zh: "居住型態、房間設備、費用", vi: "Kiểu nhà ở, thiết bị phòng, chi phí", page: 24, available: false }
      ]
    },
    {
      n: 2,
      zh: "房屋與家庭、環境",
      vi: "Nhà cửa, gia đình & môi trường",
      units: [
        { id: "2-1", zh: "地理環境", vi: "Môi trường địa lý", page: 30, available: false },
        { id: "2-2", zh: "氣候與出產", vi: "Khí hậu và sản vật", page: 38, available: false },
        { id: "2-3", zh: "自然變遷、環保", vi: "Biến đổi tự nhiên, bảo vệ môi trường", page: 46, available: false }
      ]
    },
    {
      n: 3,
      zh: "日常生活",
      vi: "Đời sống hằng ngày",
      units: [
        { id: "3-1", zh: "家居生活", vi: "Sinh hoạt trong nhà", page: 54, available: false },
        { id: "3-2", zh: "工作場所、收入", vi: "Nơi làm việc, thu nhập", page: 62, available: false },
        { id: "3-3", zh: "學校生活", vi: "Đời sống học đường", page: 70, available: false },
        { id: "3-4", zh: "未來規畫、公共服務", vi: "Kế hoạch tương lai, dịch vụ công", page: 76, available: false }
      ]
    },
    {
      n: 4,
      zh: "休閒娛樂",
      vi: "Giải trí & thư giãn",
      units: [
        { id: "4-1", zh: "空閒時光、嗜好及興趣、運動", vi: "Thời gian rảnh, sở thích, thể thao", page: 82, available: false },
        { id: "4-2", zh: "藝文活動、娛樂媒體", vi: "Hoạt động nghệ thuật, truyền thông giải trí", page: 88, available: false },
        { id: "4-3", zh: "智識及藝術追求", vi: "Theo đuổi tri thức và nghệ thuật", page: 96, available: false }
      ]
    },
    {
      n: 5,
      zh: "飲食",
      vi: "Ẩm thực",
      units: [
        { id: "5-1", zh: "飲食種類、型態、作法", vi: "Loại món ăn, hình thức, cách làm", page: 104, available: false },
        { id: "5-2", zh: "外食、餐廳服務", vi: "Ăn ngoài, dịch vụ nhà hàng", page: 110, available: false }
      ]
    },
    {
      n: 6,
      zh: "與他人關係",
      vi: "Quan hệ với người khác",
      units: [
        { id: "6-1", zh: "人際關係、邀約、信件往來", vi: "Quan hệ, lời mời, thư từ", page: 118, available: false },
        { id: "6-2", zh: "組織成員", vi: "Thành viên tổ chức", page: 126, available: false },
        { id: "6-3", zh: "社會文化", vi: "Văn hóa xã hội", page: 134, available: false }
      ]
    },
    {
      n: 7,
      zh: "健康及身體照顧",
      vi: "Sức khỏe & chăm sóc cơ thể",
      units: [
        { id: "7-1", zh: "身體部位、身體狀況", vi: "Bộ phận cơ thể, tình trạng sức khỏe", page: 142, available: false },
        { id: "7-2", zh: "衛生、個人習慣", vi: "Vệ sinh, thói quen cá nhân", page: 148, available: false },
        { id: "7-3", zh: "疾病與意外、醫藥服務、保險", vi: "Bệnh tật, tai nạn, dịch vụ y tế, bảo hiểm", page: 154, available: false }
      ]
    },
    {
      n: 8,
      zh: "旅行",
      vi: "Du lịch",
      units: [
        { id: "8-1", zh: "國內旅行", vi: "Du lịch trong nước", page: 162, available: false },
        { id: "8-2", zh: "離島旅行", vi: "Du lịch đảo", page: 170, available: false },
        { id: "8-3", zh: "國際旅行", vi: "Du lịch quốc tế", page: 178, available: false }
      ]
    },
    {
      n: 9,
      zh: "購物",
      vi: "Mua sắm",
      units: [
        { id: "9-1", zh: "網路購物", vi: "Mua sắm trực tuyến", page: 184, available: false },
        { id: "9-2", zh: "夜市購物", vi: "Mua sắm chợ đêm", page: 190, available: false },
        { id: "9-3", zh: "百貨公司購物", vi: "Mua sắm trung tâm thương mại", page: 196, available: false }
      ]
    },
    {
      n: 10,
      zh: "教育",
      vi: "Giáo dục",
      units: [
        { id: "10-1", zh: "選系", vi: "Chọn ngành học", page: 202, available: false },
        { id: "10-2", zh: "教育制度和系統", vi: "Hệ thống giáo dục", page: 210, available: false },
        { id: "10-3", zh: "語言、電腦、溝通等能力", vi: "Năng lực ngôn ngữ, máy tính, giao tiếp", page: 218, available: false }
      ]
    }
  ]
};

const LESSON = {
  id: "1-1",
  theme: 1,
  themeZh: "個人資料",
  themeVi: "Thông tin cá nhân",
  zh: "姓名、國籍、出生、年齡、性別、婚姻",
  vi: "Họ tên, quốc tịch, ngày sinh, tuổi, giới tính, hôn nhân",
  audio: "B2-audio/01-1.mp3",
  page: 10,
  goals: [
    "Nghe hiểu và nắm được thông tin cá nhân trong các đoạn hội thoại thực tế.",
    "Phân biệt 實歲 / 虛歲 và các cách diễn đạt tuổi tác, giấy tờ, hôn nhân.",
    "Đọc hiểu thiệp cưới, thông báo và đoạn văn về gia đình, văn hóa.",
    "Dùng chính xác 25 từ cốt lõi + 25 từ mở rộng của bài."
  ],
  structure: [
    { zh: "一、對話聽力", vi: "Nghe hội thoại", count: 5, icon: "headphones" },
    { zh: "二、完成句子", vi: "Hoàn thành câu", count: 8, icon: "pencil" },
    { zh: "三、選詞填空", vi: "Điền từ vào đoạn văn", count: 10, icon: "text" },
    { zh: "四、材料閱讀", vi: "Đọc thiệp cưới", count: 4, icon: "mail" },
    { zh: "五、短文閱讀", vi: "Đọc hiểu đoạn văn", count: 3, icon: "book" }
  ]
};

const VOCAB = [
  /* ---------- 25 TỪ CỐT LÕI ---------- */
  {
    zh: "年齡", py: "niánlíng", vi: "tuổi, độ tuổi", pos: "名", core: true,
    note: "Cách nói trang trọng/trung tính hơn 歲數. Thường dùng trong giấy tờ, khảo sát, thông báo.",
    colloc: ["年齡層", "法定年齡", "年齡差距"],
    ex: [
      { zh: "華人通常有兩個年齡：一個實歲，一個虛歲。", py: "Huárén tōngcháng yǒu liǎng ge niánlíng: yī ge shísùi, yī ge xūsùi.", vi: "Người Hoa thường có hai cách tính tuổi: một là tuổi thật, một là tuổi mụ." },
      { zh: "法定年齡是指實際上的歲數。", py: "Fǎdìng niánlíng shì zhǐ shíjì shang de sùishù.", vi: "Tuổi hợp pháp là chỉ số tuổi thực tế." }
    ]
  },
  {
    zh: "實歲", py: "shísùi", vi: "tuổi thật (tính từ ngày sinh)", pos: "名", core: true,
    note: "Tính từ ngày tháng năm sinh thực tế; còn gọi là 足歲.",
    colloc: ["實歲和虛歲", "算實歲"],
    ex: [
      { zh: "實歲是從出生那天的年月日開始算的。", py: "Shísùi shì cóng chūshēng nà tiān de niányuèrì kāishǐ suàn de.", vi: "Tuổi thật được tính từ ngày tháng năm sinh." },
      { zh: "她今年實歲二十五，虛歲二十七。", py: "Tā jīnnián shísùi èrshíwǔ, xūsùi èrshíqī.", vi: "Năm nay cô ấy 25 tuổi thật, 27 tuổi mụ." }
    ]
  },
  {
    zh: "虛歲", py: "xūsùi", vi: "tuổi mụ (tính theo năm âm lịch)", pos: "名", core: true,
    note: "Sinh ra đã tính 1 tuổi, qua Tết thêm 1 tuổi. Cách tính truyền thống của người Hoa.",
    colloc: ["算虛歲", "虛歲一歲"],
    ex: [
      { zh: "華人通常以虛歲來算，出生那天就算一歲，過了年又加一歲。", py: "Huárén tōngcháng yǐ xūsùi lái suàn, chūshēng nà tiān jiù suàn yī suì, guò le nián yòu jiā yī suì.", vi: "Người Hoa thường tính tuổi mụ: sinh ra là 1 tuổi, qua Tết lại thêm 1 tuổi." },
      { zh: "在老一輩的眼裡，虛歲比實歲更重要。", py: "Zài lǎo yībèi de yǎnlǐ, xūsùi bǐ shísùi gèng zhòngyào.", vi: "Trong mắt người lớn tuổi, tuổi mụ quan trọng hơn tuổi thật." }
    ]
  },
  {
    zh: "法定", py: "fǎdìng", vi: "hợp pháp, do pháp luật quy định", pos: "形", core: true,
    note: "Đứng trước danh từ: 法定年齡, 法定程序, 法定代理人.",
    colloc: ["法定年齡", "法定程序", "法定代理人"],
    ex: [
      { zh: "法定年齡是指實際上的歲數。", py: "Fǎdìng niánlíng shì zhǐ shíjì shang de sùishù.", vi: "Tuổi hợp pháp là chỉ số tuổi thực tế." },
      { zh: "十八歲是許多國家的法定成年年齡。", py: "Shíbā suì shì xǔduō guójiā de fǎdìng chéngnián niánlíng.", vi: "Mười tám tuổi là tuổi trưởng thành hợp pháp ở nhiều nước." }
    ]
  },
  {
    zh: "就醫", py: "jiùyī", vi: "đi khám bệnh, tìm điều trị", pos: "動", core: true,
    note: "Trang trọng hơn 看病. Thường dùng trong văn bản, bảo hiểm, y tế.",
    colloc: ["就醫紀錄", "及早就醫", "就醫權利"],
    ex: [
      { zh: "我用健保卡看病，醫生是否看得到我之前的就醫紀錄？", py: "Wǒ yòng jiànbǎokǎ kànbìng, yīshēng shìfǒu kàndedào wǒ zhīqián de jiùyī jìlù?", vi: "Tôi dùng thẻ bảo hiểm y tế đi khám, bác sĩ có xem được lịch sử khám bệnh trước đây của tôi không?" },
      { zh: "身體不舒服時，應該及早就醫。", py: "Shēntǐ bù shūfu shí, yīnggāi jízǎo jiùyī.", vi: "Khi thấy trong người không khỏe, nên đi khám sớm." }
    ]
  },
  {
    zh: "看診", py: "kànzhěn", vi: "khám bệnh (bác sĩ)", pos: "動", core: true,
    note: "Chủ yếu dùng cho bác sĩ: bác sĩ khám bệnh. Bệnh nhân đi khám thường nói 看病.",
    colloc: ["看診日期", "看診內容", "看診時間"],
    ex: [
      { zh: "健保卡只會顯示最近六次的看診日期、醫療診所的名稱及代碼。", py: "Jiànbǎokǎ zhǐ huì xiǎnshì zuìjìn liù cì de kànzhěn rìqī, yīliáo zhěnsuǒ de míngchēng jí dàimǎ.", vi: "Thẻ bảo hiểm y tế chỉ hiển thị ngày khám của sáu lần gần nhất, tên và mã của cơ sở y tế." },
      { zh: "醫生每天看診到晚上九點。", py: "Yīshēng měitiān kànzhěn dào wǎnshang jiǔ diǎn.", vi: "Bác sĩ khám bệnh mỗi ngày đến 9 giờ tối." }
    ]
  },
  {
    zh: "上傳", py: "shàngchuán", vi: "tải lên", pos: "動", core: true,
    note: "Trái nghĩa với 下載 (tải xuống).",
    colloc: ["上傳照片", "上傳檔案", "上傳雲端"],
    ex: [
      { zh: "年輕媽媽把自家寶貝的照片上傳，跟大家分享初為人母的喜悅。", py: "Niánqīng māma bǎ zìjiā bǎobèi de zhàopiàn shàngchuán, gēn dàjiā fēnxiǎng chū wéi rén mǔ de xǐyuè.", vi: "Người mẹ trẻ tải ảnh em bé nhà mình lên, chia sẻ niềm vui lần đầu làm mẹ với mọi người." },
      { zh: "請把作業上傳到雲端硬碟。", py: "Qǐng bǎ zuòyè shàngchuán dào yúnduān yìngdié.", vi: "Hãy tải bài tập lên ổ đĩa đám mây." }
    ]
  },
  {
    zh: "透露", py: "tòulù", vi: "tiết lộ, để lộ", pos: "動", core: true,
    note: "Thường dùng với thông tin, bí mật, tin tức: 透露消息, 透露資訊.",
    colloc: ["透露訊息", "透露消息", "透露口風"],
    ex: [
      { zh: "這些上傳的照片所透露的資訊，也許在將來會對孩子造成意想不到的影響。", py: "Zhèxiē shàngchuán de zhàopiàn suǒ tòulù de zīxùn, yěxǔ zài jiānglái huì duì háizi zàochéng yìxiǎngbùdào de yǐngxiǎng.", vi: "Những thông tin mà các bức ảnh tải lên để lộ ra có thể sẽ gây ảnh hưởng không ngờ tới đứa trẻ trong tương lai." },
      { zh: "他沒有透露這次比賽的結果。", py: "Tā méiyǒu tòulù zhè cì bǐsài de jiéguǒ.", vi: "Anh ấy không tiết lộ kết quả cuộc thi lần này." }
    ]
  },
  {
    zh: "周遭", py: "zhōuzāo", vi: "xung quanh, vùng lân cận", pos: "名", core: true,
    note: "Thường đứng trước danh từ: 周遭環境, 周遭的人.",
    colloc: ["周遭環境", "周遭的人", "周遭事物"],
    ex: [
      { zh: "從照片上孩子的穿著、周遭環境、背景等，就能拼湊出一些訊息。", py: "Cóng zhàopiàn shang háizi de chuānzhuó, zhōuzāo huánjìng, bèijǐng děng, jiù néng pīncòu chū yīxiē xùnxī.", vi: "Từ quần áo, môi trường xung quanh, bối cảnh của đứa trẻ trong ảnh, người ta có thể ghép ra một số thông tin." },
      { zh: "我們應該關心周遭的人。", py: "Wǒmen yīnggāi guānxīn zhōuzāo de rén.", vi: "Chúng ta nên quan tâm đến những người xung quanh." }
    ]
  },
  {
    zh: "惡意", py: "èyì", vi: "ác ý, cố ý (làm hại)", pos: "名／形", core: true,
    note: "Trái nghĩa: 善意 (thiện ý).",
    colloc: ["惡意利用", "惡意中傷", "惡意攻擊"],
    ex: [
      { zh: "甚至遭人惡意利用。", py: "Shènzhì zāo rén èyì lìyòng.", vi: "Thậm chí bị người khác lợi dụng với ác ý." },
      { zh: "請不要用惡意的言語傷害別人。", py: "Qǐng bùyào yòng èyì de yányǔ shānghài biérén.", vi: "Đừng dùng lời lẽ ác ý để làm tổn thương người khác." }
    ]
  },
  {
    zh: "抗議", py: "kàngyì", vi: "phản đối, biểu tình", pos: "動／名", core: true,
    note: "Có thể dùng như động từ (抗議政府) hoặc danh từ (發動抗議).",
    colloc: ["抗議活動", "發動抗議", "表達抗議"],
    ex: [
      { zh: "自從林飛發動了環保抗議活動之後，現已成了名人了。", py: "Zìcóng Lín Fēi fādòng le huánbǎo kàngyì huódòng zhīhòu, xiàn yǐ chéng le míngrén le.", vi: "Từ khi Lâm Phi phát động hoạt động phản đối bảo vệ môi trường, anh ấy đã trở thành người nổi tiếng." },
      { zh: "居民抗議政府在公園旁興建工廠。", py: "Jūmín kàngyì zhèngfǔ zài gōngyuán páng xīngjiàn gōngchǎng.", vi: "Cư dân phản đối việc chính phủ xây nhà máy bên cạnh công viên." }
    ]
  },
  {
    zh: "焦點", py: "jiāodiǎn", vi: "tiêu điểm, tâm điểm", pos: "名", core: true,
    note: "常用搭配: 成為焦點, 把焦點放在...上, 關注焦點.",
    colloc: ["關注焦點", "把焦點放在", "成為焦點"],
    ex: [
      { zh: "他希望大家不要再把焦點放在他的身上了。", py: "Tā xīwàng dàjiā bùyào zài bǎ jiāodiǎn fàng zài tā de shēnshang le.", vi: "Anh ấy hy vọng mọi người đừng chú ý đến anh ấy nữa." },
      { zh: "這則新聞成為媒體關注的焦點。", py: "Zhè zé xīnwén chéngwéi méitǐ guānzhù de jiāodiǎn.", vi: "Tin tức này trở thành tâm điểm chú ý của truyền thông." }
    ]
  },
  {
    zh: "忍受", py: "rěnshòu", vi: "chịu đựng", pos: "動", core: true,
    note: "Chịu đựng điều khó chịu, đau khổ. Mạnh hơn 忍耐.",
    colloc: ["忍受委屈", "無法忍受", "忍受痛苦"],
    ex: [
      { zh: "要是婚姻不理想，寧可離婚也不願意忍受不幸的婚姻。", py: "Yàoshi hūnyīn bù lǐxiǎng, nìngkě líhūn yě bù yuànyì rěnshòu bùxìng de hūnyīn.", vi: "Nếu hôn nhân không lý tưởng, thà ly hôn còn hơn chịu đựng một cuộc hôn nhân bất hạnh." },
      { zh: "我無法忍受這麼吵的環境。", py: "Wǒ wúfǎ rěnshòu zhème chǎo de huánjìng.", vi: "Tôi không thể chịu đựng được môi trường ồn ào thế này." }
    ]
  },
  {
    zh: "委屈", py: "wěiqu", vi: "uất ức, tủi thân", pos: "名／形／動", core: true,
    note: "受委屈 = bị oan ức; 覺得委屈 = cảm thấy tủi thân.",
    colloc: ["受委屈", "覺得委屈", "滿腹委屈"],
    ex: [
      { zh: "結了婚就會受委屈。", py: "Jié le hūn jiù huì shòu wěiqu.", vi: "Kết hôn rồi sẽ phải chịu uất ức." },
      { zh: "她覺得自己受了委屈，忍不住哭了。", py: "Tā juéde zìjǐ shòu le wěiqu, rěnbuzhù kū le.", vi: "Cô ấy cảm thấy mình bị oan ức, không nhịn được mà khóc." }
    ]
  },
  {
    zh: "寧可", py: "nìngkě", vi: "thà rằng, thà", pos: "副", core: true,
    note: "Cấu trúc: 寧可 A，也不 B = thà A còn hơn B.",
    colloc: ["寧可...也不...", "寧可放棄", "寧可單身"],
    ex: [
      { zh: "要是婚姻不理想，寧可離婚也不願意忍受不幸的婚姻。", py: "Yàoshi hūnyīn bù lǐxiǎng, nìngkě líhūn yě bù yuànyì rěnshòu bùxìng de hūnyīn.", vi: "Nếu hôn nhân không lý tưởng, thà ly hôn còn hơn chịu đựng một cuộc hôn nhân bất hạnh." },
      { zh: "我寧可走路，也不願意等這麼久的公車。", py: "Wǒ nìngkě zǒulù, yě bù yuànyì děng zhème jiǔ de gōngchē.", vi: "Tôi thà đi bộ còn hơn đợi xe buýt lâu như vậy." }
    ]
  },
  {
    zh: "婚姻", py: "hūnyīn", vi: "hôn nhân", pos: "名", core: true,
    note: "Danh từ chỉ quan hệ vợ chồng. 結婚 là động từ (kết hôn).",
    colloc: ["婚姻生活", "婚姻品質", "婚姻關係"],
    ex: [
      { zh: "婚姻是一種需要長時間相處互動的人際關係。", py: "Hūnyīn shì yī zhǒng xūyào cháng shíjiān xiāngchǔ hùdòng de rénjì guānxi.", vi: "Hôn nhân là một mối quan hệ giữa người với người cần thời gian dài chung sống và tương tác." },
      { zh: "他們結婚二十年，婚姻生活很幸福。", py: "Tāmen jiéhūn èrshí nián, hūnyīn shēnghuó hěn xìngfú.", vi: "Họ kết hôn hai mươi năm, cuộc sống hôn nhân rất hạnh phúc." }
    ]
  },
  {
    zh: "配偶", py: "pèi'ǒu", vi: "vợ/chồng, bạn đời", pos: "名", core: true,
    note: "Từ trang trọng, dùng trong giấy tờ: 配偶欄 (mục vợ/chồng).",
    colloc: ["外籍配偶", "配偶欄", "法定配偶"],
    ex: [
      { zh: "王先生的配偶是王太太，王太太的配偶就是王先生。", py: "Wáng xiānsheng de pèi'ǒu shì Wáng tàitai, Wáng tàitai de pèi'ǒu jiù shì Wáng xiānsheng.", vi: "Vợ của ông Vương là bà Vương, chồng của bà Vương chính là ông Vương." },
      { zh: "在填寫表格時，請寫上配偶的姓名。", py: "Zài tiánxiě biǎogé shí, qǐng xiě shàng pèi'ǒu de xìngmíng.", vi: "Khi điền biểu mẫu, hãy ghi tên vợ/chồng." }
    ]
  },
  {
    zh: "衝突", py: "chōngtū", vi: "xung đột", pos: "名／動", core: true,
    note: "Dùng cho ý kiến, văn hóa, lợi ích: 文化衝突, 發生衝突.",
    colloc: ["文化衝突", "發生衝突", "利益衝突"],
    ex: [
      { zh: "文化習俗的衝突與融合，在在都讓具有外籍配偶的家庭面臨困擾。", py: "Wénhuà xísú de chōngtū yǔ rónghé, zàizài dōu ràng jùyǒu wàijí pèi'ǒu de jiātíng miànlín kùnrǎo.", vi: "Xung đột và hòa hợp văn hóa, phong tục đều khiến các gia đình có vợ/chồng nước ngoài gặp khó khăn." },
      { zh: "兩人因為意見不同而發生衝突。", py: "Liǎng rén yīnwèi yìjiàn bùtóng ér fāshēng chōngtū.", vi: "Hai người xảy ra xung đột vì ý kiến khác nhau." }
    ]
  },
  {
    zh: "融合", py: "rónghé", vi: "hòa hợp, kết hợp", pos: "動", core: true,
    note: "Hai hay nhiều thứ hòa vào nhau thành một thể thống nhất.",
    colloc: ["文化融合", "融合在一起", "融合發展"],
    ex: [
      { zh: "文化習俗的衝突與融合，是多元社會的重要課題。", py: "Wénhuà xísú de chōngtū yǔ rónghé, shì duōyuán shèhuì de zhòngyào kètí.", vi: "Xung đột và hòa hợp văn hóa là đề tài quan trọng của xã hội đa nguyên." },
      { zh: "這道菜融合了中西方的烹飪特色。", py: "Zhè dào cài rónghé le zhōngxīfāng de pēngrèn tèsè.", vi: "Món ăn này kết hợp đặc trưng nấu nướng của phương Đông và phương Tây." }
    ]
  },
  {
    zh: "多元", py: "duōyuán", vi: "đa dạng, nhiều chiều", pos: "形", core: true,
    note: "Thường dùng: 多元文化, 多元社會, 多元化.",
    colloc: ["多元文化", "多元社會", "多元化"],
    ex: [
      { zh: "讓所有的小朋友自然而然地接受生活的多元、文化的多元。", py: "Ràng suǒyǒu de xiǎopéngyou zìrán'érrán de jiēshòu shēnghuó de duōyuán, wénhuà de duōyuán.", vi: "Để tất cả trẻ em tự nhiên tiếp nhận sự đa dạng của cuộc sống và văn hóa." },
      { zh: "台灣是一個多元文化的社會。", py: "Táiwān shì yī ge duōyuán wénhuà de shèhuì.", vi: "Đài Loan là một xã hội đa văn hóa." }
    ]
  },
  {
    zh: "外籍", py: "wàijí", vi: "thuộc quốc tịch nước ngoài", pos: "形", core: true,
    note: "Đứng trước danh từ: 外籍人士, 外籍配偶, 外籍員工.",
    colloc: ["外籍人士", "外籍配偶", "外籍員工"],
    ex: [
      { zh: "與外籍人士通婚的情況日益普遍。", py: "Yǔ wàijí rénshì tōnghūn de qíngkuàng rìyì pǔbiàn.", vi: "Tình trạng kết hôn với người nước ngoài ngày càng phổ biến." },
      { zh: "這家公司聘請了許多外籍員工。", py: "Zhè jiā gōngsī pìngqǐng le xǔduō wàijí yuángōng.", vi: "Công ty này đã tuyển nhiều nhân viên nước ngoài." }
    ]
  },
  {
    zh: "通婚", py: "tōnghūn", vi: "kết hôn (với người nước ngoài/nhóm khác)", pos: "動", core: true,
    note: "Thường nói 與外籍人士通婚, 跨國通婚.",
    colloc: ["跨國通婚", "與外籍人士通婚"],
    ex: [
      { zh: "與外籍人士通婚的情況日益普遍。", py: "Yǔ wàijí rénshì tōnghūn de qíngkuàng rìyì pǔbiàn.", vi: "Tình trạng kết hôn với người nước ngoài ngày càng phổ biến." },
      { zh: "在現代社會，不同族群通婚已經很常見。", py: "Zài xiàndài shèhuì, bùtóng zúqún tōnghūn yǐjīng hěn chángjiàn.", vi: "Trong xã hội hiện đại, việc kết hôn giữa các dân tộc khác nhau đã rất phổ biến." }
    ]
  },
  {
    zh: "典禮", py: "diǎnlǐ", vi: "lễ, buổi lễ", pos: "名", core: true,
    note: "Buổi lễ trang trọng: 結婚典禮, 畢業典禮, 開幕典禮.",
    colloc: ["結婚典禮", "畢業典禮", "開幕典禮"],
    ex: [
      { zh: "為長男林英才、次女陳台麗舉行結婚典禮。", py: "Wèi zhǎngnán Lín Yīngcái, cìnǚ Chén Táilì jǔxíng jiéhūn diǎnlǐ.", vi: "Tổ chức lễ cưới cho con trai trưởng Lâm Anh Tài và con gái thứ Trần Đài Lệ." },
      { zh: "畢業典禮將於下週五舉行。", py: "Bìyè diǎnlǐ jiāng yú xià zhōuwǔ jǔxíng.", vi: "Lễ tốt nghiệp sẽ được tổ chức vào thứ Sáu tuần sau." }
    ]
  },
  {
    zh: "新郎", py: "xīnláng", vi: "chú rể", pos: "名", core: true,
    note: "Cặp đôi: 新郎 / 新娘.",
    colloc: ["新郎新娘", "新郎致詞"],
    ex: [
      { zh: "新郎是誰？", py: "Xīnláng shì shéi?", vi: "Chú rể là ai?" },
      { zh: "新郎穿著西裝，在門口迎接客人。", py: "Xīnláng chuānzhe xīzhuāng, zài ménkǒu yíngjiē kèrén.", vi: "Chú rể mặc vest, đứng ở cửa đón khách." }
    ]
  },
  {
    zh: "新娘", py: "xīnniáng", vi: "cô dâu", pos: "名", core: true,
    note: "Cặp đôi: 新郎 / 新娘.",
    colloc: ["新娘禮服", "新娘父母"],
    ex: [
      { zh: "新娘穿著白紗，看起來非常美麗。", py: "Xīnniáng chuānzhe báishā, kàn qǐlái fēicháng měilì.", vi: "Cô dâu mặc váy trắng, trông rất xinh đẹp." },
      { zh: "新娘的父母在門口迎接賓客。", py: "Xīnniáng de fùmǔ zài ménkǒu yíngjiē bīnkè.", vi: "Bố mẹ cô dâu đứng ở cửa đón khách." }
    ]
  },

  /* ---------- 25 TỪ MỞ RỘNG ---------- */
  {
    zh: "健保卡", py: "jiànbǎokǎ", vi: "thẻ bảo hiểm y tế", pos: "名", core: false,
    note: "Thẻ bảo hiểm y tế quốc gia của Đài Loan.",
    colloc: ["健保卡紀錄", "插入健保卡"],
    ex: [
      { zh: "我用健保卡看病，醫生看得到我之前的就醫紀錄嗎？", py: "Wǒ yòng jiànbǎokǎ kànbìng, yīshēng kàndedào wǒ zhīqián de jiùyī jìlù ma?", vi: "Tôi dùng thẻ bảo hiểm y tế đi khám, bác sĩ có xem được lịch sử khám bệnh trước đây của tôi không?" }
    ]
  },
  {
    zh: "醫療", py: "yīliáo", vi: "y tế, điều trị", pos: "名／形", core: false,
    note: "醫療院所 = cơ sở y tế; 醫療服務 = dịch vụ y tế.",
    colloc: ["醫療診所", "醫療服務", "醫療費用"],
    ex: [
      { zh: "健保卡只會顯示看診日期、醫療診所的名稱及代碼。", py: "Jiànbǎokǎ zhǐ huì xiǎnshì kànzhěn rìqī, yīliáo zhěnsuǒ de míngchēng jí dàimǎ.", vi: "Thẻ bảo hiểm y tế chỉ hiển thị ngày khám, tên và mã của cơ sở y tế." }
    ]
  },
  {
    zh: "社群", py: "shèqún", vi: "cộng đồng (mạng xã hội)", pos: "名", core: false,
    note: "社群網站 = mạng xã hội; 社群媒體 = truyền thông xã hội.",
    colloc: ["社群網站", "社群媒體", "社群經營"],
    ex: [
      { zh: "在社群網站上，常看到年輕媽媽上傳孩子的照片。", py: "Zài shèqún wǎngzhàn shang, cháng kàndào niánqīng māma shàngchuán háizi de zhàopiàn.", vi: "Trên mạng xã hội, thường thấy các bà mẹ trẻ tải ảnh con lên." }
    ]
  },
  {
    zh: "拼湊", py: "pīncòu", vi: "ghép lại, chắp nối", pos: "動", core: false,
    note: "Ghép các mảnh thông tin rời rạc để tạo thành bức tranh hoàn chỉnh.",
    colloc: ["拼湊訊息", "拼湊真相"],
    ex: [
      { zh: "從照片上的穿著、周遭環境，就能拼湊出一些訊息。", py: "Cóng zhàopiàn shang de chuānzhuó, zhōuzāo huánjìng, jiù néng pīncòu chū yīxiē xùnxī.", vi: "Từ quần áo và môi trường xung quanh trong ảnh, người ta có thể ghép ra một số thông tin." }
    ]
  },
  {
    zh: "團體", py: "tuántǐ", vi: "tập thể, nhóm", pos: "名", core: false,
    note: "團體活動 = hoạt động tập thể; 團體生活 = đời sống tập thể.",
    colloc: ["團體活動", "團體生活", "小團體"],
    ex: [
      { zh: "在團體裡，想要取得大家的信任並不容易。", py: "Zài tuántǐ lǐ, xiǎngyào qǔdé dàjiā de xìnrèn bìng bù róngyì.", vi: "Trong một tập thể, muốn giành được sự tin tưởng của mọi người không hề dễ." }
    ]
  },
  {
    zh: "組織", py: "zǔzhī", vi: "tổ chức; sắp xếp", pos: "名／動", core: false,
    note: "Danh từ: một tổ chức; động từ: tổ chức sự kiện.",
    colloc: ["組織活動", "非營利組織", "組織成員"],
    ex: [
      { zh: "你要組織一個學生社團，就必須先了解成員的需求。", py: "Nǐ yào zǔzhī yī ge xuéshēng shètuán, jiù bìxū xiān liǎojiě chéngyuán de xūqiú.", vi: "Nếu bạn muốn thành lập một câu lạc bộ sinh viên, trước tiên phải hiểu nhu cầu của thành viên." }
    ]
  },
  {
    zh: "權力", py: "quánlì", vi: "quyền lực", pos: "名", core: false,
    note: "Phân biệt 權利 (quyền lợi) và 權力 (quyền lực).",
    colloc: ["掌握權力", "職位上的權力", "權力鬥爭"],
    ex: [
      { zh: "有了職位上的權力，你才能代表這個組織說話。", py: "Yǒu le zhíwèi shang de quánlì, nǐ cái néng dàibiǎo zhège zǔzhī shuōhuà.", vi: "Có quyền lực ở vị trí công tác, bạn mới có thể đại diện cho tổ chức này phát biểu." }
    ]
  },
  {
    zh: "依據", py: "yījù", vi: "căn cứ, dựa theo", pos: "名／介", core: false,
    note: "依據規定 = căn cứ quy định; 有依據 = có căn cứ.",
    colloc: ["依據規定", "法律依據", "有所依據"],
    ex: [
      { zh: "無論說話做事都能有所依據，才能合理地發展自己。", py: "Wúlùn shuōhuà zuòshì dōu néng yǒu suǒ yījù, cái néng hélǐ de fāzhǎn zìjǐ.", vi: "Dù nói hay làm đều có căn cứ, mới có thể phát triển bản thân một cách hợp lý." }
    ]
  },
  {
    zh: "協調", py: "xiétiáo", vi: "phối hợp, điều hòa", pos: "動", core: false,
    note: "協調不同意見; 協調分工.",
    colloc: ["協調分工", "協調意見", "互相協調"],
    ex: [
      { zh: "結婚前，兩人應該協調好婚後的家事分工。", py: "Jiéhūn qián, liǎng rén yīnggāi xiétiáo hǎo hūnhòu de jiāshì fēngōng.", vi: "Trước khi kết hôn, hai người nên thống nhất việc phân công việc nhà sau kết hôn." }
    ]
  },
  {
    zh: "分攤", py: "fēntān", vi: "chia sẻ, phân chia (chi phí, việc)", pos: "動", core: false,
    note: "分攤費用 = chia sẻ chi phí; 分攤家事 = chia việc nhà.",
    colloc: ["分攤費用", "分攤家事", "平均分攤"],
    ex: [
      { zh: "家事應該由夫妻共同分攤，而不是一個人的責任。", py: "Jiāshì yīnggāi yóu fūqī gòngtóng fēntān, ér bùshì yī ge rén de zérèn.", vi: "Việc nhà nên do vợ chồng cùng chia sẻ, chứ không phải trách nhiệm của một người." }
    ]
  },
  {
    zh: "國曆", py: "guólì", vi: "dương lịch", pos: "名", core: false,
    note: "Còn gọi là 陽曆. Đối lập với 農曆 (âm lịch).",
    colloc: ["國曆新年", "國曆日期"],
    ex: [
      { zh: "喜帖上寫著國曆十月十日、農曆九月十四日。", py: "Xǐtiě shang xiězhe guólì shí yuè shí rì, nónglì jiǔ yuè shísì rì.", vi: "Thiệp cưới ghi ngày 10 tháng 10 dương lịch và ngày 14 tháng 9 âm lịch." }
    ]
  },
  {
    zh: "農曆", py: "nónglì", vi: "âm lịch", pos: "名", core: false,
    note: "Lịch truyền thống của người Hoa, dùng cho Tết và lễ hội.",
    colloc: ["農曆新年", "農曆生日", "農曆九月"],
    ex: [
      { zh: "華人通常以農曆來計算傳統節日。", py: "Huárén tōngcháng yǐ nónglì lái jìsuàn chuántǒng jiérì.", vi: "Người Hoa thường dùng âm lịch để tính các ngày lễ truyền thống." }
    ]
  },
  {
    zh: "光臨", py: "guānglín", vi: "quang lâm, đến dự (kính ngữ)", pos: "動", core: false,
    note: "Kính ngữ mời khách đến dự. Thường dùng trên thiệp mời.",
    colloc: ["恭請光臨", "歡迎光臨", "蒞臨光臨"],
    ex: [
      { zh: "敬備喜筵，恭請光臨。", py: "Jìng bèi xǐyán, gōngqǐng guānglín.", vi: "Kính dọn tiệc cưới, trân trọng mời quý khách đến dự." }
    ]
  },
  {
    zh: "邀請", py: "yāoqǐng", vi: "mời", pos: "動", core: false,
    note: "邀請函 = thiệp mời; 應邀 = nhận lời mời.",
    colloc: ["邀請函", "應邀出席", "邀請親友"],
    ex: [
      { zh: "這次婚禮是由雙方父母出面邀請的。", py: "Zhè cì hūnlǐ shì yóu shuāngfāng fùmǔ chūmiàn yāoqǐng de.", vi: "Lễ cưới lần này do bố mẹ hai bên đứng ra mời." }
    ]
  },
  {
    zh: "喜酒", py: "xǐjiǔ", vi: "tiệc cưới, rượu mừng", pos: "名", core: false,
    note: "喝喜酒 = đi dự tiệc cưới.",
    colloc: ["喝喜酒", "辦喜酒"],
    ex: [
      { zh: "婚禮結束後，親友們一起喝喜酒。", py: "Hūnlǐ jiéshù hòu, qīnyǒu men yīqǐ hē xǐjiǔ.", vi: "Sau lễ cưới, họ hàng bạn bè cùng dự tiệc mừng." }
    ]
  },
  {
    zh: "根據", py: "gēnjù", vi: "dựa theo, căn cứ", pos: "介／名", core: false,
    note: "根據 + nguồn tin/quy định: 根據統計, 根據規定.",
    colloc: ["根據統計", "根據規定", "根據研究"],
    ex: [
      { zh: "根據統計，每七點五個嬰兒中就有一個是新住民子女。", py: "Gēnjù tǒngjì, měi qī diǎn wǔ ge yīng'ér zhōng jiù yǒu yī ge shì xīnzhùmín zǐnǚ.", vi: "Theo thống kê, cứ 7,5 trẻ sơ sinh thì có một em là con của người nhập cư." }
    ]
  },
  {
    zh: "統計", py: "tǒngjì", vi: "thống kê", pos: "動／名", core: false,
    note: "統計資料 = số liệu thống kê; 統計學 = thống kê học.",
    colloc: ["統計資料", "統計數字", "根據統計"],
    ex: [
      { zh: "根據統計，新女性移民的孩子佔13.2%。", py: "Gēnjù tǒngjì, xīn nǚxìng yímín de háizi zhàn shísān diǎn èr bǎi fēnzhī.", vi: "Theo thống kê, con của nữ di dân mới chiếm 13,2%." }
    ]
  },
  {
    zh: "大熔爐", py: "dàrónglú", vi: "nồi lẩu lớn (ẩn dụ về xã hội đa văn hóa)", pos: "名", core: false,
    note: "Ví von nơi nhiều nền văn hóa hòa trộn vào nhau.",
    colloc: ["文化大熔爐", "民族大熔爐"],
    ex: [
      { zh: "台灣正處於一個大熔爐的時代。", py: "Táiwān zhèng chǔyú yī ge dàrónglú de shídài.", vi: "Đài Loan đang ở trong một thời đại của một nồi lẩu văn hóa lớn." }
    ]
  },
  {
    zh: "融入", py: "róngrù", vi: "hòa nhập, hòa vào", pos: "動", core: false,
    note: "融入社會 = hòa nhập xã hội; 融入生活 = hòa vào cuộc sống.",
    colloc: ["融入社會", "融入生活", "融入校園"],
    ex: [
      { zh: "學校將多元文化特色融入到校園生活裡。", py: "Xuéxiào jiāng duōyuán wénhuà tèsè róngrù dào xiàoyuán shēnghuó lǐ.", vi: "Nhà trường đưa đặc sắc văn hóa đa dạng vào đời sống học đường." }
    ]
  },
  {
    zh: "衝動", py: "chōngdòng", vi: "bốc đồng, xung động", pos: "名／形", core: false,
    note: "一時衝動 = bốc đồng nhất thời; 衝動購買 = mua sắm bốc đồng.",
    colloc: ["一時衝動", "衝動購買", "別太衝動"],
    ex: [
      { zh: "結婚不是一時衝動，而是需要長時間相處的決定。", py: "Jiéhūn bùshì yīshí chōngdòng, ér shì xūyào cháng shíjiān xiāngchǔ de juédìng.", vi: "Kết hôn không phải là bốc đồng nhất thời, mà là quyết định cần thời gian dài chung sống." }
    ]
  },
  {
    zh: "面對", py: "miànduì", vi: "đối mặt, đương đầu", pos: "動", core: false,
    note: "面對問題 = đối mặt vấn đề; 面臨 = đứng trước (khó khăn).",
    colloc: ["面對問題", "面對挑戰", "面對現實"],
    ex: [
      { zh: "大學畢業後，就要面對就業的問題。", py: "Dàxué bìyè hòu, jiù yào miànduì jiùyè de wèntí.", vi: "Sau khi tốt nghiệp đại học, phải đối mặt với vấn đề việc làm." }
    ]
  },
  {
    zh: "相處", py: "xiāngchǔ", vi: "chung sống, hòa hợp", pos: "動", core: false,
    note: "相處融洽 = chung sống hòa thuận; 難以相處 = khó gần.",
    colloc: ["相處融洽", "長時間相處", "難以相處"],
    ex: [
      { zh: "婚姻是一種需要長時間相處互動的人際關係。", py: "Hūnyīn shì yī zhǒng xūyào cháng shíjiān xiāngchǔ hùdòng de rénjì guānxi.", vi: "Hôn nhân là một mối quan hệ cần thời gian dài chung sống và tương tác." }
    ]
  },
  {
    zh: "支配", py: "zhīpèi", vi: "chi phối, phân phối", pos: "動", core: false,
    note: "支配時間 = sắp xếp thời gian; 支配金錢 = chi phối tiền bạc.",
    colloc: ["支配時間", "支配金錢", "受情緒支配"],
    ex: [
      { zh: "婚後的金錢應該由夫妻共同支配。", py: "Hūnhòu de jīnqián yīnggāi yóu fūqī gòngtóng zhīpèi.", vi: "Tiền bạc sau kết hôn nên do vợ chồng cùng quản lý." }
    ]
  },
  {
    zh: "互助", py: "hùzhù", vi: "tương trợ, giúp đỡ lẫn nhau", pos: "動", core: false,
    note: "互助合作 = hợp tác tương trợ.",
    colloc: ["互助合作", "守望相助", "互助精神"],
    ex: [
      { zh: "一個好的團體需要成員之間互相尊重、互助合作。", py: "Yī ge hǎo de tuántǐ xūyào chéngyuán zhījiān hùxiāng zūnzhòng, hùzhù hézuò.", vi: "Một tập thể tốt cần các thành viên tôn trọng và giúp đỡ hợp tác lẫn nhau." }
    ]
  },
  {
    zh: "而已", py: "éryǐ", vi: "mà thôi", pos: "助", core: false,
    note: "Đặt cuối câu, thường đi với 只是/不過: 只是...而已.",
    colloc: ["只是...而已", "不過...而已"],
    ex: [
      { zh: "婚姻不只是夫妻二人的事而已，還包括雙方的家人。", py: "Hūnyīn bù zhǐshì fūqī èr rén de shì éryǐ, hái bāokuò shuāngfāng de jiārén.", vi: "Hôn nhân không chỉ là chuyện của hai vợ chồng mà thôi, còn bao gồm gia đình hai bên." }
    ]
  }
];

const PHRASES = [
  {
    zh: "面對問題", py: "miànduì wèntí", vi: "đối mặt với vấn đề",
    ex: { zh: "大學畢業，就得面對就業的問題，無法逃避。", py: "Dàxué bìyè, jiù děi miànduì jiùyè de wèntí, wúfǎ táobì.", vi: "Tốt nghiệp đại học là phải đối mặt với vấn đề việc làm, không thể trốn tránh." }
  },
  {
    zh: "面臨困擾", py: "miànlín kùnrǎo", vi: "đứng trước khó khăn, bối rối",
    ex: { zh: "大學畢業，可能面臨找不到工作的困擾，得早點計畫。", py: "Dàxué bìyè, kěnéng miànlín zhǎobudào gōngzuò de kùnrǎo, děi zǎodiǎn jìhuà.", vi: "Tốt nghiệp đại học, có thể gặp khó khăn vì không tìm được việc, phải lên kế hoạch sớm." }
  },
  {
    zh: "取得信任", py: "qǔdé xìnrèn", vi: "giành được sự tin tưởng",
    ex: { zh: "在團體裡，想要取得大家的信任，這就很不容易。", py: "Zài tuántǐ lǐ, xiǎngyào qǔdé dàjiā de xìnrèn, zhè jiù hěn bù róngyì.", vi: "Trong tập thể, muốn giành được sự tin tưởng của mọi người thì rất không dễ." }
  },
  {
    zh: "名正言順", py: "míng zhèng yán shùn", vi: "danh chính ngôn thuận",
    ex: { zh: "有了合適的地位，說話做事才能名正言順。", py: "Yǒu le héshì de dìwèi, shuōhuà zuòshì cái néng míng zhèng yán shùn.", vi: "Có địa vị thích hợp thì nói năng làm việc mới danh chính ngôn thuận." }
  }
];
