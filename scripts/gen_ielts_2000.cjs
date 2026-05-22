const fs = require('fs');
const file = 'src/data/packs/ielts-exam-context-2000.json';
const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
const existing = new Set(data.map(d => d.term.toLowerCase()));

const FULL_FORMS = {
  GDP: 'Gross Domestic Product', GNP: 'Gross National Product',
  UN: 'United Nations', WHO: 'World Health Organization',
  NGO: 'Non-Governmental Organization', OECD: 'Organisation for Economic Co-operation and Development',
  EU: 'European Union', UK: 'United Kingdom', CO2: 'Carbon Dioxide',
  AI: 'Artificial Intelligence', IT: 'Information Technology',
  ICT: 'Information and Communication Technology', STEM: 'Science, Technology, Engineering and Mathematics',
  'R&D': 'Research and Development', VR: 'Virtual Reality', AR: 'Augmented Reality',
  EV: 'Electric Vehicle', 'GDP per capita': 'Gross Domestic Product per person',
  CCTV: 'Closed-Circuit Television', IELTS: 'International English Language Testing System',
  TOEFL: 'Test of English as a Foreign Language', API: 'Application Programming Interface',
  UI: 'User Interface', UX: 'User Experience', LLM: 'Large Language Model',
  RAG: 'Retrieval-Augmented Generation', PRD: 'Product Requirements Document',
  MVP: 'Minimum Viable Product', SaaS: 'Software as a Service', CRM: 'Customer Relationship Management',
  KPI: 'Key Performance Indicator', ROI: 'Return on Investment', CTR: 'Click-Through Rate',
  CPC: 'Cost Per Click', CPA: 'Cost Per Acquisition', ROAS: 'Return on Ad Spend',
  '3PL': 'Third-Party Logistics', MOQ: 'Minimum Order Quantity', PLC: 'Programmable Logic Controller',
  SLAM: 'Simultaneous Localization and Mapping', IMU: 'Inertial Measurement Unit',
  QoS: 'Quality of Service', 'RGB-D': 'Red Green Blue Depth',
};

const newItems = [];
let id = data.length + 1;

function a(t,ty,tp,sk,sm,sis,ex,ez,rg,df,tg){
  if(existing.has(t.toLowerCase()))return false;
  existing.add(t.toLowerCase());
  newItems.push({
    id:'ielts-exam-context-2000-'+String(id).padStart(4,'0'),
    packId:'ielts-exam-context-2000',term:t,type:ty,topic:tp,examSkill:sk,
    examUse:'',shortMeaning:sm,shortMeaningInSentence:sis,example:ex,exampleZh:ez,
    register:rg,difficulty:df,
    sourceType:'ielts_style_original',sourceTitle:'Original IELTS-style learning sentence',
    sourceUrl:'',sourceDate:'',isRealSourceSentence:false,
    tags:tg,fullForm:FULL_FORMS[t]||undefined
  });
  id++;return true;
}

const T=[
// A: Academic Verbs & Modifiers
['exert','word','Argument and Logic','Reading','施加','apply forcefully','Parents who exert too much pressure on children may harm their academic performance.','对孩子 exert 过多 pressure 的家长可能损害他们的学业表现。','formal',4,['academic','psychology']],
['invoke','word','Argument and Logic','Reading','援引','cite as support','The author invokes several historical examples to support the central argument.','作者 invoke 了几个 historical example 来支持核心论点。','academic',5,['academic','writing']],
['provoke','word','Argument and Logic','Reading','激起','cause a reaction','The decision to close the factory provoked widespread anger in the local community.','关闭工厂的决定 provoke 了 local community 的广泛愤怒。','formal',4,['academic','society']],
['elicit','word','Science and Research','Reading','引出','draw out','The survey was designed to elicit honest responses about workplace satisfaction.','该 survey 旨在 elicit 关于 workplace satisfaction 的 honest response。','academic',5,['academic','research']],
['inhibit','word','Science and Research','Reading','抑制','hold back','High levels of stress can inhibit the immune system and slow recovery from illness.','高水平的 stress 可以 inhibit immune system 并减缓 illness 的 recovery。','academic',5,['academic','health']],
['simulate','word','Science and Research','Reading','模拟','imitate','Computer models can simulate the effects of different policies before they are implemented.','computer model 可以在 policy implement 之前 simulate 不同 policy 的效果。','academic',4,['academic','research']],
['articulate','word','Argument and Logic','Reading','清晰表达','express clearly','The candidate struggled to articulate a clear vision for the future of the company.','candidate 努力 articulate 公司未来的 clear vision。','formal',4,['academic','speaking']],
['encompass','word','Argument and Logic','Reading','包含','include','The term sustainable development encompasses economic social and environmental dimensions.','sustainable development 这个 term encompass 了经济、social 和 environmental dimension。','academic',5,['academic','writing']],
['oversee','word','Society and Government','Reading','监督','supervise','An independent body was established to oversee the implementation of the new regulations.','成立了一个 independent body 来 oversee new regulation 的 implementation。','formal',4,['academic','government']],
['spearhead','word','Society and Government','Reading','带头','lead','The organisation is spearheading a campaign to reduce plastic waste in coastal areas.','该 organisation 正在 spearhead 一项减少 coastal area plastic waste 的 campaign。','formal',4,['academic','environment']],

// B: Abstract Qualities & States
['validity','word','Science and Research','Reading','有效性','soundness','Several researchers have questioned the validity of the original experimental design.','一些 researcher 质疑了 original experimental design 的 validity。','academic',5,['academic','research']],
['integrity','word','Society and Government','Reading','正直','honesty','Journalists must maintain their integrity by reporting facts accurately and fairly.','journalist 必须通过准确公正地报道事实来 maintain their integrity。','formal',4,['academic','media']],
['resilience','word','Argument and Logic','Reading','韧性','ability to recover','Building emotional resilience helps people cope with setbacks and adapt to change.','建立 emotional resilience 帮助人们应对 setback 并适应 change。','semi-formal',4,['academic','psychology']],
['autonomy','word','Society and Government','Reading','自主权','independence','Giving employees more autonomy over their work schedule has been shown to boost productivity.','给 employee 对 work schedule 更多 autonomy 已被证明可以提高 productivity。','formal',4,['academic','workplace']],
['coherence','word','Argument and Logic','Reading','连贯性','logical connection','The essay lacked coherence and jumped from one idea to another without clear links.','该 essay 缺乏 coherence 在没有 clear link 的情况下从一个 idea 跳到另一个。','academic',5,['academic','writing']],
['ambiguity','word','Argument and Logic','Reading','模糊性','uncertainty','Legal documents should avoid ambiguity to prevent misinterpretation in court.','legal document 应避免 ambiguity 以防止在 court 中 misinterpretation。','academic',5,['academic','law']],
['uniformity','word','Trend and Comparison','Reading','一致性','sameness','There is no uniformity in how different countries measure and report environmental data.','不同国家如何 measure 和 report environmental data 没有 uniformity。','formal',4,['academic','data']],
['feasibility','word','Science and Research','Reading','可行性','practicality','A feasibility study was conducted before the large-scale project was approved.','在 large-scale project 获批之前进行了 feasibility study。','academic',5,['academic','research']],
['versatility','word','Education','Reading','多功能性','adaptability','The versatility of online learning platforms allows them to serve students of all ages.','online learning platform 的 versatility 使其能够服务所有年龄段的学生。','semi-formal',4,['academic','education']],

// C: Topic-Specific Vocabulary
['extracurricular activity','collocation','Education','Speaking','课外活动','after-school activity','Universities look for applicants who have engaged in extracurricular activities beyond their studies.','大学寻找那些在学业之外参与 extracurricular activity 的申请者。','semi-formal',2,['academic','education']],
['syllabus design','collocation','Education','Reading','课程设计','course planning','Effective syllabus design takes into account both content coverage and student engagement.','effective syllabus design 同时考虑 content coverage 和 student engagement。','academic',5,['academic','education']],
['formative feedback','collocation','Education','Reading','形成性反馈','ongoing guidance','Formative feedback throughout the course helps students improve before the final assessment.','整个课程中的 formative feedback 帮助学生在 final assessment 之前提高。','academic',4,['academic','education']],
];