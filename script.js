// ----------------------
// المتغيرات الرئيسية
// ----------------------
let lang = "";
let index = 0;
let scores = {leader:0, thinker:0, rebel:0};

// ----------------------
// البيانات: أسئلة + مجموعات + لغات
// ----------------------
const data = {
  ar:[
    {group:"Leadership", q:"كيف تتصرف عند مواجهة مشكلة؟", a:[{text:"أحلها بنفسي",type:"leader"},{text:"أطلب المساعدة",type:"thinker"},{text:"أتجاهلها",type:"rebel"}]},
    {group:"Logic", q:"هل تعتمد على العقل أم القلب؟", a:[{text:"العقل",type:"thinker"},{text:"القلب",type:"rebel"},{text:"كليهما",type:"leader"}]},
    {group:"Courage", q:"كيف تواجه الخوف؟", a:[{text:"أتخطاه",type:"leader"},{text:"أتجنبه",type:"rebel"},{text:"أفكر كثيراً",type:"thinker"}]},
    {group:"Freedom", q:"هل تحب الروتين أم الحرية؟", a:[{text:"الروتين",type:"thinker"},{text:"الحرية",type:"rebel"},{text:"متوازن",type:"leader"}]},
    {group:"Decision", q:"كيف تتخذ القرارات؟", a:[{text:"سريع",type:"leader"},{text:"تحليل",type:"thinker"},{text:"أترك للصدفة",type:"rebel"}]},
    {group:"Social", q:"كيف تتصرف مع الناس؟", a:[{text:"قيادي",type:"leader"},{text:"ودود",type:"thinker"},{text:"مستقل",type:"rebel"}]},
    {group:"Work", q:"تفضل العمل؟", a:[{text:"وحدي",type:"rebel"},{text:"مع فريق",type:"leader"},{text:"تحليل ودراسة",type:"thinker"}]},
    {group:"Risk", q:"هل تحب المخاطرة؟", a:[{text:"دائماً",type:"rebel"},{text:"نادرًا",type:"thinker"},{text:"حسب الموقف",type:"leader"}]},
    {group:"Emotion", q:"كيف تتحكم بعواطفك؟", a:[{text:"أفضل العقل",type:"thinker"},{text:"اتبع القلب",type:"rebel"},{text:"توازن",type:"leader"}]},
    {group:"Challenge", q:"هل تحب التحديات؟", a:[{text:"نعم بشغف",type:"leader"},{text:"أحياناً",type:"thinker"},{text:"أفضل الراحة",type:"rebel"}]}
  ],
  en:[
    {group:"Leadership", q:"How do you handle problems?", a:[{text:"Solve it myself",type:"leader"},{text:"Ask for help",type:"thinker"},{text:"Ignore it",type:"rebel"}]},
    {group:"Logic", q:"Do you rely on logic or emotion?", a:[{text:"Logic",type:"thinker"},{text:"Emotion",type:"rebel"},{text:"Both",type:"leader"}]},
    {group:"Courage", q:"How do you face fear?", a:[{text:"Overcome it",type:"leader"},{text:"Avoid it",type:"rebel"},{text:"Think a lot",type:"thinker"}]},
    {group:"Freedom", q:"Do you prefer routine or freedom?", a:[{text:"Routine",type:"thinker"},{text:"Freedom",type:"rebel"},{text:"Balanced",type:"leader"}]},
    {group:"Decision", q:"How do you make decisions?", a:[{text:"Quickly",type:"leader"},{text:"Analyze",type:"thinker"},{text:"By chance",type:"rebel"}]},
    {group:"Social", q:"How do you deal with people?", a:[{text:"Leader",type:"leader"},{text:"Friendly",type:"thinker"},{text:"Independent",type:"rebel"}]},
    {group:"Work", q:"Do you prefer to work?", a:[{text:"Alone",type:"rebel"},{text:"Team",type:"leader"},{text:"Study first",type:"thinker"}]},
    {group:"Risk", q:"Do you like risks?", a:[{text:"Always",type:"rebel"},{text:"Rarely",type:"thinker"},{text:"Depends",type:"leader"}]},
    {group:"Emotion", q:"How do you control your emotions?", a:[{text:"Use logic",type:"thinker"},{text:"Follow heart",type:"rebel"},{text:"Balance",type:"leader"}]},
    {group:"Challenge", q:"Do you enjoy challenges?", a:[{text:"Yes",type:"leader"},{text:"Sometimes",type:"thinker"},{text:"Prefer comfort",type:"rebel"}]}
  ],
  fr:[
    {group:"Leadership", q:"Comment gérez-vous les problèmes?", a:[{text:"Je le résous moi-même",type:"leader"},{text:"Demander de l'aide",type:"thinker"},{text:"Ignorer",type:"rebel"}]},
    {group:"Logic", q:"Logique ou émotion?", a:[{text:"Logique",type:"thinker"},{text:"Émotion",type:"rebel"},{text:"Les deux",type:"leader"}]},
    {group:"Courage", q:"Comment affrontez-vous la peur?", a:[{text:"Je surmonte",type:"leader"},{text:"J'évite",type:"rebel"},{text:"Je réfléchis",type:"thinker"}]},
    {group:"Freedom", q:"Préférez-vous la routine ou la liberté?", a:[{text:"Routine",type:"thinker"},{text:"Liberté",type:"rebel"},{text:"Équilibré",type:"leader"}]},
    {group:"Decision", q:"Comment prenez-vous des décisions?", a:[{text:"Rapidement",type:"leader"},{text:"Analyse",type:"thinker"},{text:"Au hasard",type:"rebel"}]},
    {group:"Social", q:"Comment interagissez-vous avec les gens?", a:[{text:"Leader",type:"leader"},{text:"Amical",type:"thinker"},{text:"Indépendant",type:"rebel"}]},
    {group:"Work", q:"Préférez-vous travailler?", a:[{text:"Seul",type:"rebel"},{text:"En équipe",type:"leader"},{text:"Étudier d'abord",type:"thinker"}]},
    {group:"Risk", q:"Aimez-vous les risques?", a:[{text:"Toujours",type:"rebel"},{text:"Rarement",type:"thinker"},{text:"Selon la situation",type:"leader"}]},
    {group:"Emotion", q:"Comment contrôlez-vous vos émotions?", a:[{text:"Logique",type:"thinker"},{text:"Cœur",type:"rebel"},{text:"Équilibré",type:"leader"}]},
    {group:"Challenge", q:"Aimez-vous les défis?", a:[{text:"Oui",type:"leader"},{text:"Parfois",type:"thinker"},{text:"Confort",type:"rebel"}]}
  ]
};

// ----------------------
// النتائج لكل نوع شخصية
// ----------------------
const results = {
  ar:{
    leader:{title:"قائد طبيعي",desc:"أنت شخص قيادي وتحمل المسؤولية بكل ثقة."},
    thinker:{title:"مفكر استراتيجي",desc:"أنت شخص يعتمد على العقل والتحليل قبل التصرف."},
    rebel:{title:"ثائر مستقل",desc:"أنت شخص حر ومتمرد ولا تحب القيود."}
  },
  en:{
    leader:{title:"Natural Leader",desc:"You are confident and take responsibility."},
    thinker:{title:"Strategic Thinker",desc:"You rely on logic and analysis."},
    rebel:{title:"Independent Rebel",desc:"You are free-spirited and resist restrictions."}
  },
  fr:{
    leader:{title:"Leader Naturel",desc:"Vous êtes confiant et prenez vos responsabilités."},
    thinker:{title:"Penseur Stratégique",desc:"Vous analysez avant d'agir."},
    rebel:{title:"Rebelle Indépendant",desc:"Vous êtes libre et résistez aux règles."}
  }
};

// ----------------------
// الدوال
// ----------------------
function startQuiz(l){
  lang = l;
  window.location.href="quiz.html?lang="+l;
}

function getLangFromURL(){
  const params = new URLSearchParams(window.location.search);
  return params.get('lang') || 'en';
}

function loadQuiz(){
  lang = getLangFromURL();
  const quizDiv = document.getElementById("quiz");
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const progressEl = document.getElementById("progress");

  let index = 0;
  let scores = {leader:0,thinker:0,rebel:0};

  function showQuestion(){
    const q = data[lang][index];
    questionEl.innerText = q.q;
    progressEl.innerText = (index+1)+" / "+data[lang].length;
    answersEl.innerHTML = "";
    q.a.forEach(ans=>{
      const btn = document.createElement("button");
      btn.innerText = ans.text;
      btn.onclick = ()=>{
        scores[ans.type]++;
        index++;
        if(index<data[lang].length){
          showQuestion();
        } else {
          showResult();
        }
      };
      answersEl.appendChild(btn);
    });
  }

  function showResult(){
    const maxType = Object.keys(scores).reduce((a,b)=>scores[a]>=scores[b]?a:b);
    localStorage.setItem("resultTitle",results[lang][maxType].title);
    localStorage.setItem("resultDesc",results[lang][maxType].desc);
    window.location.href="result.html?lang="+lang;
  }

  showQuestion();
}

function loadResult(){
  const lang = getLangFromURL();
  document.getElementById("finalTitle").innerText = localStorage.getItem("resultTitle");
  document.getElementById("finalDesc").innerText = localStorage.getItem("resultDesc");
}

function restartQuiz(){
  window.location.href="index.html";
}

// ----------------------
// تشغيل عند التحميل
// ----------------------
if(document.getElementById("quiz")) loadQuiz();
if(document.getElementById("result")) loadResult();

