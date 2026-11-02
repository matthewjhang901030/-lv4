/* ============================================================
   Argon · 墨語 — Đề kiểm tra Unit 1-1
   Nguồn câu hỏi + đáp án: sách TOCFL Band B Level 4, tr. 10–14
   Nguồn transcript: Answer Keys, tr. 224–225
   Audio: B2-audio/01-1.mp3
   ============================================================ */

const EXAM_META = {
  id: "1-1",
  title: "Unit 1-1 · 個人資料",
  subtitle: "姓名、國籍、出生、年齡、性別、婚姻",
  audio: "B2-audio/01-1.mp3",
  duration: 30 * 60,
  listeningDuration: 10 * 60,
  total: 30
};

const EXAM_SECTIONS = [
  { id: "listening", no: "一", zh: "對話聽力", vi: "Nghe hội thoại", from: 1, to: 5, audio: true },
  { id: "sentence", no: "二", zh: "完成句子", vi: "Hoàn thành câu", from: 6, to: 13 },
  { id: "blank", no: "三", zh: "選詞填空", vi: "Điền từ vào đoạn văn", from: 14, to: 23, material: "cloze" },
  { id: "reading", no: "四", zh: "材料閱讀", vi: "Đọc thiệp cưới", from: 24, to: 27, material: "invitation" },
  { id: "passage", no: "五", zh: "短文閱讀", vi: "Đọc hiểu đoạn văn", from: 28, to: 30, material: "passage" }
];

const TRANSCRIPTS = [
  {
    n: 1,
    title: "對話 1 · Tuổi thật và tuổi mụ",
    lines: [
      { sp: "男", zh: "聽說華人通常都有兩個年齡：一個實歲，一個虛歲，這是怎麼算的？" },
      { sp: "女", zh: "一般來說，法定年齡是指實際上的歲數，是從出生那天的年月日開始算的，是實歲。" },
      { sp: "男", zh: "我們國家也是採用這樣的方法。那虛歲呢？" },
      { sp: "女", zh: "華人通常是以虛歲來算，出生那天就算一歲，過了年又加一歲。" }
    ],
    question: "這位小姐的意思是什麼？",
    answer: "B",
    vi: "Người Hoa có hai cách tính tuổi: 實歲 (tuổi thật) tính từ ngày sinh; 虛歲 (tuổi mụ) tính từ lúc sinh là 1 tuổi, qua Tết thêm 1 tuổi. Vì vậy hai cách tính cho ra kết quả khác nhau."
  },
  {
    n: 2,
    title: "對話 2 · Thẻ bảo hiểm y tế",
    lines: [
      { sp: "男", zh: "我用健保卡看病，醫生是否看得到我之前的就醫紀錄？" },
      { sp: "女", zh: "並不是把健保卡插入讀卡機就能直接看得到！除非刻意去閱讀卡上的資料才能進一步看到。" },
      { sp: "男", zh: "看診內容都看得到嗎？" },
      { sp: "女", zh: "健保卡只會顯示最近六次的看診日期、醫療診所的名稱及代碼。目前健保卡上還未記錄看診的內容。你放心！" }
    ],
    question: "這位小姐要這位先生對什麼放心？",
    answer: "B",
    vi: "Thẻ bảo hiểm chỉ hiển thị ngày khám, tên và mã cơ sở y tế của 6 lần gần nhất, chưa ghi nội dung khám bệnh. Vì vậy bác sĩ không xem được nội dung khám trước đó."
  },
  {
    n: 3,
    title: "對話 3 · Ảnh của trẻ em trên mạng xã hội",
    lines: [
      { sp: "男", zh: "在社群網站上，常看到一些年輕媽媽把自家寶貝的照片上傳，跟大家分享初為人母的喜悅。" },
      { sp: "女", zh: "難道她們不擔心這些上傳的照片所透露的資訊，也許在將來會對孩子造成意想不到的影響？" },
      { sp: "男", zh: "上面又沒姓名、地址、電話等個人資料，只不過是小孩可愛的生活照片。" },
      { sp: "女", zh: "對有心利用的人來說，從照片上孩子的穿著、周遭環境、背景等，就能拼湊出一些訊息，甚至遭人惡意利用。" }
    ],
    question: "下面哪一個是他們談話的主題？",
    answer: "D",
    vi: "Người phụ nữ lo rằng ảnh tải lên có thể để lộ thông tin (quần áo, môi trường xung quanh, bối cảnh) và bị kẻ xấu lợi dụng. Chủ đề là thông tin trong ảnh có thể bị lợi dụng."
  },
  {
    n: 4,
    title: "對話 4 · Hoạt động phản đối và truyền thông",
    lines: [
      { sp: "男", zh: "自從林飛發動了環保抗議活動之後，現已成了名人了。" },
      { sp: "女", zh: "可不是嗎？經由媒體的報導，讓更多人了解並參加了這次的抗議活動，給了他很大的幫助。" },
      { sp: "男", zh: "現在活動已經告一段落，群眾也都退場了，可是不管他到哪兒都還有記者報導他的一舉一動，他希望大眾不要再把焦點放在他的身上了。" },
      { sp: "女", zh: "這談何容易，有得必有失。" }
    ],
    question: "這位小姐說「談何容易」，指的是什麼？",
    answer: "C",
    vi: "「談何容易」nghĩa là “nói thì dễ, làm mới khó”. Cô ấy muốn nói việc bảo các phóng viên đừng đưa tin về Lâm Phi là rất khó, vì anh ấy đã trở thành tâm điểm."
  },
  {
    n: 5,
    title: "對話 5 · Quan điểm về hôn nhân",
    lines: [
      { sp: "男", zh: "現在有些人對配偶和婚姻生活的期待比較高。" },
      { sp: "女", zh: "是啊！他們比較重視婚姻的品質，要是不理想，寧可離婚也不願意忍受不幸的婚姻。" }
    ],
    question: "現在有些人對婚姻的看法怎麼樣？",
    answer: "D",
    vi: "Một số người coi trọng chất lượng hôn nhân; nếu không lý tưởng, họ thà ly hôn còn hơn chịu đựng một cuộc hôn nhân bất hạnh."
  }
];

const INVITATION = {
  seal: "囍",
  header: ["謹詹於中華民國一百年", "國曆十月十日", "農曆九月十四日（星期一）"],
  body: [
    "為",
    "長男 林英才",
    "次女 陳台麗",
    "舉行結婚典禮"
  ],
  invite: ["敬備喜筵　恭請", "光臨"],
  hosts: ["林台生　王亮玉", "陳有權　周美珠", "鞠躬"],
  details: [
    ["席設", "林宅"],
    ["地址", "台北市民生路一〇一號"],
    ["電話", "(02) 2918-2345"],
    ["時間", "晚上六點三十分入席"]
  ],
  vi: "Thiệp cưới của gia đình họ Lâm và họ Trần: lễ cưới cho con trai trưởng Lâm Anh Tài và con gái thứ Trần Đài Lệ, tổ chức ngày 10/10 dương lịch (14/9 âm lịch), tiệc tại nhà họ Lâm, vào lúc 18:30. Thiệp do bố mẹ hai bên đứng ra mời."
};

const PASSAGE = {
  title: "新台灣之子",
  paragraphs: [
    "在現代的社會，與外籍人士通婚的情況日益普遍，而新生的第二代也越來越多，隨著他們的成長，必然面臨教育、就學、文化、新生活等問題。根據統計新女性移民的孩子佔13.2%，即每7.5個出生的嬰兒中，就有一個是外籍女性移民的新生子女，台灣正處於一個大熔爐的時代。",
    "「新台灣之子」隨著成長，慢慢地覺察到處在人群中的相似和相異。身分角色的認定，文化習俗的衝突與融合，在在都讓具有外籍配偶的家庭，面臨了該如何去面對社會、生活、語言歧異的困擾，而家庭、父母、學校、教師也針對這些困擾，不斷地思考該如何去教導小小的新台灣之子，如何使新台灣之子所具有的雙重文化特色，從困擾轉換成為多元化的生活態度和價值觀。",
    "有的學校就將這種多元文化特色融入到校園生活裡，例如，讓他們使用各國不同的語言方式來道早安，說謝謝、對不起等，讓所有的小朋友自然而然地接受生活的多元、文化的多元。"
  ],
  vi: "Xã hội hiện đại ngày càng có nhiều cuộc hôn nhân với người nước ngoài; thế hệ thứ hai (新台灣之子) lớn lên phải đối mặt với giáo dục, học hành, văn hóa, lối sống. Theo thống kê, con của nữ di dân chiếm 13,2% trẻ sơ sinh. Các em có thể gặp khó khăn về thân phận, xung đột và hòa hợp văn hóa; gia đình, nhà trường cần giúp các em chuyển khó khăn thành thái độ sống đa dạng. Một số trường đưa văn hóa đa dạng vào đời sống học đường."
};

const CLOZE_PARAGRAPHS = [
  {
    text: "在團體裡，如果你想做一件事，可是這件事本來不屬於你管的，或者說你還沒有取得「管」的權力，那麼想要取得大家的信任，讓事情能 {14} 辦好，這就很不容易。",
    vi: "Trong tập thể, nếu bạn muốn làm một việc vốn không thuộc quyền quản lý của mình, hoặc chưa có “quyền” quản lý, thì việc giành được sự tin tưởng của mọi người để mọi việc được {14} giải quyết là rất không dễ."
  },
  {
    text: "舉個例子來說，你要 {15} 一個學生社團，而這些學生為什麼願意 {16} 你的領導管理？應該是這個團體給了你職位上的 {17}，你才能代表這個組織說話，說出來的話才能得到大學生的支持，才有人願意執行。",
    vi: "Ví dụ, bạn muốn {15} một câu lạc bộ sinh viên, tại sao các sinh viên này sẵn sàng {16} sự lãnh đạo của bạn? Chính tập thể đã cho bạn {17} ở vị trí công tác, bạn mới có thể đại diện tổ chức phát biểu, lời nói mới được sinh viên ủng hộ và có người thực hiện."
  },
  {
    text: "同樣的，在人生中也要找到自己的定位，有了合適的地位，無論說話做事都能有所 {18}，才能合理地發展自己，才能有所成就，這就是所謂的名正言順。",
    vi: "Tương tự, trong cuộc sống cũng phải tìm được vị trí của mình; có địa vị thích hợp thì nói năng làm việc mới có {18}, mới phát triển bản thân hợp lý và đạt thành tựu — đó chính là “danh chính ngôn thuận”."
  },
  {
    text: "結婚不是 {19} 之間說結婚就馬上結婚的。婚姻是一種需要長時間 {20} 互動的人際關係，而且不只是夫妻二人 {21}，還包括娘家、婆家的親人，以及將來和子女之間的親子關係等等。",
    vi: "Kết hôn không phải là chuyện {19} nói cưới là cưới ngay. Hôn nhân là mối quan hệ cần thời gian dài {20} và tương tác, không chỉ là chuyện của hai vợ chồng {21}, mà còn gồm người thân hai bên và mối quan hệ cha mẹ – con cái sau này."
  },
  {
    text: "在結婚之前，對婚姻、家庭、配偶、子女的責任都要有相當的心理準備。現在有些人在結婚前會先跟對方討論，了解一些結婚後必須要 {22} 的問題，例如：結婚後誰做飯？誰打掃？跟雙方父母之間如何相處？兩人之間的金錢、家庭經濟，以及將來對孩子的教育態度要如何等等。這些問題如果有50%你都不知道，或是沒想過，那麼你對婚姻的態度就還不夠 {23}，還不適合結婚。",
    vi: "Trước khi kết hôn, cần chuẩn bị tâm lý cho trách nhiệm với hôn nhân, gia đình, vợ/chồng, con cái. Một số người bàn trước những vấn đề phải {22} sau kết hôn: ai nấu ăn, ai dọn dẹp, đối xử với bố mẹ hai bên thế nào, tiền bạc, kinh tế gia đình, quan điểm giáo dục con... Nếu 50% những điều này bạn không biết hoặc chưa nghĩ tới, thái độ với hôn nhân chưa đủ {23}, chưa phù hợp để kết hôn."
  }
];

const QUESTIONS = [
  /* ---------- 一、對話聽力 ---------- */
  {
    n: 1, section: "listening", type: "mcq",
    q: "這位小姐的意思是什麼？",
    qVi: "Ý của cô ấy là gì?",
    options: ["只有華人有法定年齡", "實歲跟虛歲的算法不同", "法定年齡比虛歲多一歲", "華人的年齡都不是真的"],
    answer: 1,
    explain: "Cô ấy giải thích 實歲 tính từ ngày sinh, còn 虛歲 tính từ lúc sinh (1 tuổi) và qua Tết thêm 1 tuổi. Hai cách tính khác nhau, nên B đúng."
  },
  {
    n: 2, section: "listening", type: "mcq",
    q: "這位小姐要這位先生對什麼放心？",
    qVi: "Cô ấy muốn anh ấy yên tâm về điều gì?",
    options: ["健保卡沒有就醫紀錄", "健保卡看不到看診內容", "健保卡每次只能顯示六種醫療紀錄", "到目前為止健保卡都沒出過什麼問題"],
    answer: 1,
    explain: "Thẻ chỉ hiện ngày khám, tên và mã cơ sở y tế của 6 lần gần nhất; chưa ghi nội dung khám. Vì vậy “健保卡看不到看診內容” là điều cần yên tâm."
  },
  {
    n: 3, section: "listening", type: "mcq",
    q: "下面哪一個是他們談話的主題？",
    qVi: "Chủ đề chính của cuộc trò chuyện là gì?",
    options: ["上傳照片的技巧", "如何保護上傳的照片", "哪些照片是可以上傳的", "照片上的資訊可能被利用"],
    answer: 3,
    explain: "Người phụ nữ lo ảnh có thể để lộ thông tin về quần áo, môi trường, bối cảnh và bị kẻ xấu lợi dụng. Trọng tâm là “thông tin trên ảnh có thể bị lợi dụng”."
  },
  {
    n: 4, section: "listening", type: "mcq",
    q: "這位小姐說「談何容易」，指的是什麼？",
    qVi: "「談何容易」ở đây có nghĩa là gì?",
    options: ["發動抗議活動很難", "要結束抗議活動很難", "要記者不要報導林飛很難", "要記者把焦點放在群眾身上很難"],
    answer: 2,
    explain: "「談何容易」= nói thì dễ, làm mới khó. Lâm Phi đã thành tâm điểm; bảo phóng viên đừng đưa tin về anh ấy là rất khó. Chọn C."
  },
  {
    n: 5, section: "listening", type: "mcq",
    q: "現在有些人對婚姻的看法怎麼樣？",
    qVi: "Hiện nay một số người có quan điểm thế nào về hôn nhân?",
    options: ["結了婚就會受委屈", "為了婚姻品質而不願結婚", "為了不離婚而寧可不結婚", "婚姻品質不理想則寧可離婚"],
    answer: 3,
    explain: "Người phụ nữ nói họ coi trọng chất lượng hôn nhân; nếu không lý tưởng thì 寧可離婚 còn hơn chịu đựng. Chọn D."
  },

  /* ---------- 二、完成句子 ---------- */
  {
    n: 6, section: "sentence", type: "mcq",
    q: "好久不見，現在你在哪兒______？",
    qVi: "Lâu rồi không gặp, bây giờ bạn làm việc ở đâu?",
    options: ["成就", "高就", "就位", "就任"],
    answer: 1,
    explain: "「高就」là cách nói lịch sự để hỏi nơi làm việc của người khác. 成就 = thành tựu; 就位 = vào vị trí; 就任 = nhậm chức."
  },
  {
    n: 7, section: "sentence", type: "mcq",
    q: "張先生夫婦已結婚二十年了，張先生是張太太的______。",
    qVi: "Ông Trương và vợ đã kết hôn hai mươi năm, ông Trương là ___ của bà Trương.",
    options: ["對象", "外遇", "配偶", "配對"],
    answer: 2,
    explain: "「配偶」= vợ/chồng (trang trọng). 對象 = đối tượng (người yêu); 外遇 = ngoại tình; 配對 = ghép đôi."
  },
  {
    n: 8, section: "sentence", type: "mcq",
    q: "大家都公認他的______生活是我們大夥兒中最令人羨慕的。",
    qVi: "Mọi người đều công nhận cuộc sống ___ của anh ấy là đáng ghen tị nhất trong nhóm.",
    options: ["結緣", "姻緣", "結婚", "婚姻"],
    answer: 3,
    explain: "「婚姻生活」= cuộc sống hôn nhân. 結緣 = kết duyên; 姻緣 = nhân duyên; 結婚 = kết hôn (động từ)."
  },
  {
    n: 9, section: "sentence", type: "mcq",
    q: "男女平等的社會不應該出現性別______的行為。",
    qVi: "Một xã hội bình đẳng giới không nên có hành vi ___ giới tính.",
    options: ["歧視", "輕視", "忽視", "平視"],
    answer: 0,
    explain: "「性別歧視」= phân biệt đối xử giới tính. 輕視 = coi thường; 忽視 = bỏ qua; 平視 = nhìn ngang tầm mắt."
  },
  {
    n: 10, section: "sentence", type: "mcq",
    q: "醫生可以徵得直系______的同意後施行手術。",
    qVi: "Bác sĩ có thể tiến hành phẫu thuật sau khi được sự đồng ý của ___ trực hệ.",
    options: ["親戚", "親屬", "親子", "親情"],
    answer: 1,
    explain: "「直系親屬」= người thân trực hệ. 親戚 = họ hàng nói chung; 親子 = cha mẹ – con; 親情 = tình thân."
  },
  {
    n: 11, section: "sentence", type: "mcq",
    q: "出生年月日、住址等都算是個人______。",
    qVi: "Ngày tháng năm sinh, địa chỉ... đều được coi là ___ cá nhân.",
    options: ["事件", "狀況", "資料", "情報"],
    answer: 2,
    explain: "「個人資料」= thông tin cá nhân. 事件 = sự kiện; 狀況 = tình trạng; 情報 = tình báo/thông tin (mang tính bí mật)."
  },
  {
    n: 12, section: "sentence", type: "mcq",
    q: "李小姐說她屬十二______中的龍，這樣大概就可以算出她的年齡了。",
    qVi: "Cô Lý nói mình tuổi con rồng trong mười hai ___, như vậy có thể tính ra tuổi.",
    options: ["性別", "排行", "等級", "生肖"],
    answer: 3,
    explain: "「十二生肖」= mười hai con giáp. 性別 = giới tính; 排行 = thứ bậc; 等級 = cấp bậc."
  },
  {
    n: 13, section: "sentence", type: "mcq",
    q: "林先生印在名片上的______是副理。",
    qVi: "Chức danh ___ in trên danh thiếp của ông Lâm là phó lý.",
    options: ["擔任", "職責", "職稱", "姓名"],
    answer: 2,
    explain: "「職稱」= chức danh (phó lý, giám đốc...). 擔任 = đảm nhiệm; 職責 = trách nhiệm công việc; 姓名 = họ tên."
  },

  /* ---------- 三、選詞填空 ---------- */
  {
    n: 14, section: "blank", type: "mcq",
    q: "讓事情能 {14} 辦好",
    qVi: "để mọi việc được ___ giải quyết",
    options: ["流利", "順利", "順手", "隨手"],
    answer: 1,
    explain: "「順利」= thuận lợi, suôn sẻ. 流利 dùng cho nói/đọc; 順手 = tiện tay; 隨手 = tùy tay."
  },
  {
    n: 15, section: "blank", type: "mcq",
    q: "你要 {15} 一個學生社團",
    qVi: "bạn muốn ___ một câu lạc bộ sinh viên",
    options: ["構造", "團體", "系統", "組織"],
    answer: 3,
    explain: "「組織」= thành lập, tổ chức. 構造 = cấu tạo; 團體 = tập thể (danh từ); 系統 = hệ thống."
  },
  {
    n: 16, section: "blank", type: "mcq",
    q: "這些學生為什麼願意 {16} 你的領導管理？",
    qVi: "tại sao các sinh viên này sẵn sàng ___ sự lãnh đạo của bạn?",
    options: ["尊敬", "遵守", "從事", "佩服"],
    answer: 1,
    explain: "「遵守」= tuân thủ. 遵守領導管理 = tuân theo sự lãnh đạo/quản lý. 尊敬 = tôn kính; 從事 = làm nghề; 佩服 = khâm phục."
  },
  {
    n: 17, section: "blank", type: "mcq",
    q: "這個團體給了你職位上的 {17}",
    qVi: "tập thể đã cho bạn ___ ở vị trí công tác",
    options: ["名稱", "人權", "權利", "權力"],
    answer: 3,
    explain: "「權力」= quyền lực (quyền quản lý, chỉ huy). 權利 = quyền lợi; 人權 = nhân quyền; 名稱 = tên gọi."
  },
  {
    n: 18, section: "blank", type: "mcq",
    q: "無論說話做事都能有所 {18}",
    qVi: "dù nói hay làm đều có ___",
    options: ["證據", "據說", "依據", "收據"],
    answer: 2,
    explain: "「有所依據」= có căn cứ. 證據 = chứng cứ; 據說 = nghe nói; 收據 = biên lai."
  },
  {
    n: 19, section: "blank", type: "mcq",
    q: "結婚不是 {19} 之間說結婚就馬上結婚的",
    qVi: "Kết hôn không phải là chuyện ___ nói cưới là cưới ngay.",
    options: ["一陣", "一時", "一致", "一再"],
    answer: 1,
    explain: "「一時」= nhất thời. 結婚不是一時之間... = kết hôn không phải chuyện nhất thời. 一陣 = một lúc; 一致 = nhất trí; 一再 = lặp đi lặp lại."
  },
  {
    n: 20, section: "blank", type: "mcq",
    q: "婚姻是一種需要長時間 {20} 互動的人際關係",
    qVi: "Hôn nhân là mối quan hệ cần thời gian dài ___ và tương tác.",
    options: ["相當", "相處", "相對", "相似"],
    answer: 1,
    explain: "「相處」= chung sống, giao tiếp với nhau. 相當 = khá/tương đương; 相對 = tương đối; 相似 = giống nhau."
  },
  {
    n: 21, section: "blank", type: "mcq",
    q: "不只是夫妻二人 {21}",
    qVi: "không chỉ là chuyện của hai vợ chồng ___",
    options: ["而已", "左右", "剛好", "足夠"],
    answer: 0,
    explain: "「而已」= mà thôi, đặt cuối câu. 不只是...而已 = không chỉ là... mà thôi."
  },
  {
    n: 22, section: "blank", type: "mcq",
    q: "了解一些結婚後必須要 {22} 的問題",
    qVi: "hiểu những vấn đề phải ___ sau khi kết hôn",
    options: ["面臨", "面試", "面對", "當面"],
    answer: 2,
    explain: "「面對問題」= đối mặt vấn đề. 面臨 cũng gần nghĩa nhưng thường đi với tình huống/khó khăn; 面試 = phỏng vấn; 當面 = trực tiếp trước mặt."
  },
  {
    n: 23, section: "blank", type: "mcq",
    q: "你對婚姻的態度就還不夠 {23}",
    qVi: "thái độ của bạn với hôn nhân vẫn chưa đủ ___",
    options: ["老實", "實在", "熟練", "成熟"],
    answer: 3,
    explain: "「成熟」= trưởng thành, chín chắn. Thái độ với hôn nhân chưa đủ chín chắn. 老實 = thật thà; 實在 = thực tế; 熟練 = thành thạo."
  },

  /* ---------- 四、材料閱讀 ---------- */
  {
    n: 24, section: "reading", type: "mcq",
    q: "新郎是誰？",
    qVi: "Chú rể là ai?",
    options: ["林英才", "林台生", "王亮玉", "陳有權"],
    answer: 0,
    explain: "Thiệp ghi “長男 林英才、次女 陳台麗 舉行結婚典禮”. 長男 = con trai trưởng, tức chú rể là Lâm Anh Tài. 林台生 là bố chú rể."
  },
  {
    n: 25, section: "reading", type: "mcq",
    q: "這次婚禮是由誰出面邀請的？",
    qVi: "Lễ cưới lần này do ai đứng ra mời?",
    options: ["新郎新娘", "新郎父母", "新娘父母", "雙方父母"],
    answer: 3,
    explain: "Cuối thiệp có tên 林台生、王亮玉 (bố mẹ chú rể) và 陳有權、周美珠 (bố mẹ cô dâu), cùng “鞠躬”. Vậy là do bố mẹ hai bên đứng ra mời."
  },
  {
    n: 26, section: "reading", type: "mcq",
    q: "在哪裡請大家喝喜酒？",
    qVi: "Mọi người được mời uống rượu mừng ở đâu?",
    options: ["新郎家裡", "新娘家裡", "雙方家裡", "結婚禮堂"],
    answer: 0,
    explain: "Thiệp ghi “席設：林宅” — tiệc được đặt tại nhà họ Lâm, tức nhà chú rể. Địa chỉ: 台北市民生路一〇一號."
  },
  {
    n: 27, section: "reading", type: "mcq",
    q: "下面哪一個說法是對的？",
    qVi: "Phát biểu nào dưới đây là đúng?",
    options: ["新郎在家裡是排行老大", "只請男方的親友來家裡喝喜酒", "喜帖是給雙方家長全家來喝喜酒的", "舉行結婚典禮和請吃喜酒不是同一天"],
    answer: 0,
    explain: "Thiệp ghi “長男 林英才” — chú rể là con trai trưởng, tức anh cả trong nhà. Các ý còn lại không đúng theo nội dung thiệp."
  },

  /* ---------- 五、短文閱讀 ---------- */
  {
    n: 28, section: "passage", type: "mcq",
    q: "台灣為什麼正處於一個大熔爐的時代？",
    qVi: "Vì sao Đài Loan đang ở trong thời đại “nồi lẩu lớn”?",
    options: ["出生率提高了", "女性人數增加了", "外籍配偶家庭日益普遍", "教育文化都出現問題了"],
    answer: 2,
    explain: "Đoạn văn nói “與外籍人士通婚的情況日益普遍... 台灣正處於一個大熔爐的時代”. Nguyên nhân là các gia đình có vợ/chồng nước ngoài ngày càng nhiều."
  },
  {
    n: 29, section: "passage", type: "mcq",
    q: "台灣社會面臨什麼樣的挑戰？",
    qVi: "Xã hội Đài Loan đối mặt với thách thức gì?",
    options: ["新生第二代的教育問題", "外籍女性移民的生育率太高", "新台灣之子在人群中的衝突", "新生第二代在語言上的歧異"],
    answer: 0,
    explain: "Đoạn văn nêu: “隨著他們的成長，必然面臨教育、就學、文化、新生活等問題”. Thách thức chính là giáo dục thế hệ thứ hai."
  },
  {
    n: 30, section: "passage", type: "mcq",
    q: "學校將如何幫助新台灣之子？",
    qVi: "Nhà trường sẽ giúp đỡ “những đứa con mới của Đài Loan” như thế nào?",
    options: ["讓每個學生都具有雙重文化", "讓每個學生用自己的母語上課", "讓他們覺察到自己在人群中的差異", "讓多元文化特色帶入到校園的學習環境裡"],
    answer: 3,
    explain: "Đoạn cuối nói trường “將這種多元文化特色融入到校園生活裡”, dạy chào hỏi, cảm ơn bằng nhiều ngôn ngữ. Chọn D."
  }
];

const ANSWER_KEY = {
  1: "B", 2: "B", 3: "D", 4: "C", 5: "D",
  6: "B", 7: "C", 8: "D", 9: "A", 10: "B", 11: "C", 12: "D", 13: "C",
  14: "B", 15: "D", 16: "B", 17: "D", 18: "C", 19: "B", 20: "B", 21: "A", 22: "C", 23: "D",
  24: "A", 25: "D", 26: "A", 27: "A", 28: "C", 29: "A", 30: "D"
};
