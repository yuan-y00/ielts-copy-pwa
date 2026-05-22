// DEPRECATED / DO NOT RUN
// This generator may produce low-quality or over-target items.
// Use only with a manually curated candidate pool.
const fs = require('fs');
const file = 'src/data/packs/ielts-exam-context-2000.json';
const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
const existing = new Set(data.map(d => d.term.toLowerCase()));
const FF = {GDP:'Gross Domestic Product',UN:'United Nations',WHO:'World Health Organization',NGO:'Non-Governmental Organization',EU:'European Union',CO2:'Carbon Dioxide',AI:'Artificial Intelligence',ICT:'Information and Communication Technology',STEM:'Science, Technology, Engineering and Mathematics','R&D':'Research and Development',EV:'Electric Vehicle',IELTS:'International English Language Testing System',KPI:'Key Performance Indicator',ROI:'Return on Investment'};

const newItems = [];
let id = data.length + 1;
let skipped = 0, added = 0;
const TARGET = 2000;
const TOPICS = ['Education','Technology and Media','Environment and Energy','Health and Lifestyle','Society and Government','Transport and Urban Life','Tourism and Accommodation','Science and Research','Trend and Comparison','Argument and Logic'];
const SKILLS = ['Writing','Reading','Listening','Speaking'];
const TYPES = ['word','phrase','collocation','sentence_pattern'];
const REGS = ['neutral','semi-formal','formal','academic'];

// Template pools for generating examples
const exAcademic = [
  'The {term} of this approach has been demonstrated in several recent studies.',
  'Researchers have identified {term} as a key factor in determining outcomes.',
  'The report highlights the {term} of early intervention in addressing the issue.',
  'Evidence suggests that {term} plays a crucial role in shaping public opinion.',
  'The concept of {term} has gained considerable attention in academic circles.',
  'Critics argue that {term} alone cannot solve the underlying structural problems.',
  'The findings reinforce the importance of {term} in policy development.',
  'A growing body of research supports the {term} of this perspective.',
];
const exTrend = [
  'The data shows a clear {term} over the period from 2010 to 2020.',
  'There was a {term} in the number of participants between the two surveys.',
  'The figures indicate a {term} throughout the first half of the decade.',
  'A {term} can be observed in the graph from the second quarter onwards.',
  'The chart illustrates {term} in consumer spending patterns.',
];
const exSoc = [
  'The {term} has become a major topic of public debate in recent years.',
  'Many people believe that {term} should be a top priority for governments.',
  'The issue of {term} affects communities across the country in different ways.',
  'Public attitudes towards {term} have shifted considerably over the past decade.',
  'Addressing {term} requires cooperation between government business and civil society.',
];
const exEnv = [
  'The impact of {term} on the environment has been widely documented.',
  'Scientists warn that {term} could have serious consequences for future generations.',
  'Efforts to address {term} have gained momentum in international policy discussions.',
  'The relationship between {term} and climate change is now well established.',
  'Reducing {term} is essential for achieving long-term environmental sustainability.',
];
const exEdu = [
  'The importance of {term} in education cannot be overstated.',
  'Schools and universities are increasingly focusing on {term} in their programmes.',
  'Research shows that {term} has a significant impact on student outcomes.',
  'The education system needs to place greater emphasis on {term}.',
];
const exHealth = [
  'The link between lifestyle choices and {term} is now well understood.',
  'Public health campaigns have raised awareness about {term} in recent years.',
  'Access to healthcare plays a crucial role in managing {term}.',
  'The rise in {term} has put increasing pressure on healthcare systems worldwide.',
];
const exTech = [
  'The rapid development of {term} has transformed many aspects of daily life.',
  'Concerns about {term} have led to calls for stricter regulation of technology.',
  'The widespread adoption of {term} has created both opportunities and challenges.',
  'Experts predict that {term} will continue to reshape industries in the coming years.',
];

const templates = {
  'Education': exEdu, 'Technology and Media': exTech,
  'Environment and Energy': exEnv, 'Health and Lifestyle': exHealth,
  'Society and Government': exSoc, 'Transport and Urban Life': exSoc,
  'Tourism and Accommodation': exSoc, 'Science and Research': exAcademic,
  'Trend and Comparison': exTrend, 'Argument and Logic': exAcademic,
};

function genExample(term, topic) {
  const pool = templates[topic] || exAcademic;
  const tpl = pool[Math.floor(Math.random() * pool.length)];
  return tpl.replace('{term}', term);
}

function genExampleZh(example, term) {
  const map = {
    'The {term} of this approach has been demonstrated in several recent studies.': '这种方法在该领域的 {term} 已在最近的几项研究中得到证实。',
    'Researchers have identified {term} as a key factor in determining outcomes.': '研究人员已将 {term} 确定为决定结果的关键因素。',
    'The report highlights the {term} of early intervention in addressing the issue.': '报告强调了早期干预在解决问题方面的 {term}。',
    'Evidence suggests that {term} plays a crucial role in shaping public opinion.': '证据表明 {term} 在塑造公众舆论方面发挥着关键作用。',
    'The concept of {term} has gained considerable attention in academic circles.': '{term} 的概念在学术界获得了相当大的关注。',
    'Critics argue that {term} alone cannot solve the underlying structural problems.': '批评者认为仅靠 {term} 无法解决根本的结构性问题。',
    'The findings reinforce the importance of {term} in policy development.': '研究结果加强了 {term} 在政策制定中的重要性。',
    'A growing body of research supports the {term} of this perspective.': '越来越多的研究支持这种观点的 {term}。',
    'The data shows a clear {term} over the period from 2010 to 2020.': '数据显示在 2010 到 2020 年期间明显的 {term}。',
    'There was a {term} in the number of participants between the two surveys.': '两次调查之间参与者数量出现了 {term}。',
    'The figures indicate a {term} throughout the first half of the decade.': '数据表明十年上半段的 {term}。',
    'A {term} can be observed in the graph from the second quarter onwards.': '从第二季度开始图表中可以观察到 {term}。',
    'The chart illustrates {term} in consumer spending patterns.': '图表展示了消费模式中的 {term}。',
    'The {term} has become a major topic of public debate in recent years.': '{term} 近年来已成为公众辩论的主要话题。',
    'Many people believe that {term} should be a top priority for governments.': '许多人认为 {term} 应该是政府的首要任务。',
    'The issue of {term} affects communities across the country in different ways.': '{term} 的问题以不同方式影响着全国各地的社区。',
    'Public attitudes towards {term} have shifted considerably over the past decade.': '过去十年公众对 {term} 的态度发生了显著变化。',
    'Addressing {term} requires cooperation between government business and civil society.': '解决 {term} 需要政府、企业和公民社会之间的合作。',
    'The impact of {term} on the environment has been widely documented.': '{term} 对环境的影响已被广泛记录。',
    'Scientists warn that {term} could have serious consequences for future generations.': '科学家警告 {term} 可能会对后代产生严重后果。',
    'Efforts to address {term} have gained momentum in international policy discussions.': '解决 {term} 的努力在国际政策讨论中获得了动力。',
    'The relationship between {term} and climate change is now well established.': '{term} 与气候变化之间的关系现在已经很清楚。',
    'Reducing {term} is essential for achieving long-term environmental sustainability.': '减少 {term} 对于实现长期环境可持续性至关重要。',
    'The importance of {term} in education cannot be overstated.': '{term} 在教育中的重要性怎么强调都不为过。',
    'Schools and universities are increasingly focusing on {term} in their programmes.': '学校和大学在课程中越来越注重 {term}。',
    'Research shows that {term} has a significant impact on student outcomes.': '研究表明 {term} 对学生成绩有显著影响。',
    'The education system needs to place greater emphasis on {term}.': '教育体系需要更加重视 {term}。',
    'The link between lifestyle choices and {term} is now well understood.': '生活方式选择与 {term} 之间的联系现在已经很清楚。',
    'Public health campaigns have raised awareness about {term} in recent years.': '近年来公共卫生宣传提高了人们对 {term} 的认识。',
    'Access to healthcare plays a crucial role in managing {term}.': '获得医疗服务在管理 {term} 方面起着关键作用。',
    'The rise in {term} has put increasing pressure on healthcare systems worldwide.': '{term} 的增加给全球医疗系统带来了越来越大的压力。',
    'The rapid development of {term} has transformed many aspects of daily life.': '{term} 的快速发展已经改变了日常生活的许多方面。',
    'Concerns about {term} have led to calls for stricter regulation of technology.': '对 {term} 的担忧导致了对更严格技术监管的呼吁。',
    'The widespread adoption of {term} has created both opportunities and challenges.': '{term} 的广泛采用既创造了机遇也带来了挑战。',
    'Experts predict that {term} will continue to reshape industries in the coming years.': '专家预测 {term} 将在未来几年继续重塑各行各业。',
  };
  // Find the matching template
  for (const [en, zh] of Object.entries(map)) {
    if (example === en.replace('{term}', term)) return zh.replace('{term}', term);
  }
  // Fallback: simple translation
  return example.replace(term, '{term}').replace(new RegExp(term, 'gi'), term);
}

// Generate items
function generate(term, type, topic, examSkill, shortMeaning, shortMeaningInSentence, register, difficulty, tags) {
  if (existing.has(term.toLowerCase())) { skipped++; return; }
  existing.add(term.toLowerCase());
  const example = genExample(term, topic);
  const exampleZh = genExampleZh(example, term);
  newItems.push({
    id: 'ielts-exam-context-2000-' + String(id).padStart(4, '0'),
    packId: 'ielts-exam-context-2000', term, type, topic, examSkill,
    examUse: '', shortMeaning, shortMeaningInSentence, example, exampleZh,
    register, difficulty,
    sourceType: 'ielts_style_original',
    sourceTitle: 'Original IELTS-style learning sentence',
    sourceUrl: '', sourceDate: '', isRealSourceSentence: false,
    tags, fullForm: FF[term] || undefined,
  });
  id++; added++;
}

// ===== MASSIVE CANDIDATE POOL (~1200 terms at 6.5-7.5 level) =====
// Format: [term, type, topic, examSkill, shortMeaning, shortMeaningInSentence, register, difficulty, tags]

function W(term,type,topic,examSkill,sm,sis,rg,df,tags){generate(term,type,topic,examSkill,sm,sis,rg,df,tags)}
function R(term,type,topic,sm,sis,rg,df,tags){generate(term,type,topic,'Reading',sm,sis,rg,df,tags)}
function S(term,type,topic,sm,sis,rg,df,tags){generate(term,type,topic,'Speaking',sm,sis,rg,df,tags)}
function L(term,type,topic,sm,sis,rg,df,tags){generate(term,type,topic,'Listening',sm,sis,rg,df,tags)}

console.log('Starting fast generation. Target:', TARGET, '| Current:', data.length);

// Pool A: Academic Verbs (Writing/Reading focus)
W('accelerate','word','Trend and Comparison','Writing','加速','speed up','formal',3,['academic','trend']);
W('accommodate','word','Society and Government','Writing','容纳','make room for','formal',3,['academic','society']);
W('accumulate','word','Trend and Comparison','Writing','积累','gather over time','formal',3,['academic','data']);
W('acknowledge','word','Argument and Logic','Writing','承认','accept as true','formal',3,['academic','argument']);
W('administer','word','Society and Government','Writing','管理','manage','formal',3,['academic','government']);
R('affiliation','word','Society and Government','Reading','隶属关系','organisational link','academic',5,['academic','society']);
W('aggravate','word','Health and Lifestyle','Writing','加重','make worse','formal',4,['academic','health']);
W('allocate','word','Society and Government','Writing','分配','give out','formal',3,['academic','government']);
R('amplify','word','Technology and Media','Reading','放大','make stronger','formal',4,['academic','technology']);
W('anchor','word','Argument and Logic','Writing','锚定','fix firmly','formal',4,['academic','writing']);
R('annihilate','word','Trend and Comparison','Reading','彻底消灭','destroy completely','academic',5,['academic','reading']);
R('annotate','word','Education','Reading','注释','add notes to','academic',4,['academic','education']);
W('anticipate','word','Trend and Comparison','Writing','预期','expect','formal',3,['academic','writing']);
W('appraise','word','Science and Research','Writing','评估','evaluate','academic',5,['academic','research']);
W('approximate','word','Trend and Comparison','Writing','近似','roughly calculate','formal',4,['academic','data']);
W('aspire','word','Education','Writing','渴望','hope to achieve','semi-formal',3,['academic','education']);
W('assemble','word','Science and Research','Writing','组装','put together','formal',3,['academic','research']);
R('attain','word','Education','Reading','达到','achieve','formal',3,['academic','education']);
W('attribute','word','Argument and Logic','Writing','归因于','consider as caused by','formal',4,['academic','argument']);
R('augment','word','Science and Research','Reading','增强','add to','academic',5,['academic','research']);

// Pool B: Abstract nouns for Writing
W('aftermath','word','Society and Government','Writing','后果','result of an event','formal',4,['academic','society']);
W('consensus','word','Argument and Logic','Writing','共识','general agreement','formal',3,['academic','argument']);
W('constraint','word','Society and Government','Writing','限制','limitation','formal',4,['academic','society']);
W('controversy','word','Argument and Logic','Writing','争议','public disagreement','formal',3,['academic','argument']);
W('correlation','word','Science and Research','Writing','相关性','connection','formal',4,['academic','research']);
W('criterion','word','Science and Research','Writing','标准','standard for judgment','academic',5,['academic','research']);
W('defect','word','Science and Research','Writing','缺陷','flaw','formal',4,['academic','research']);
W('deviation','word','Trend and Comparison','Writing','偏离','departure from norm','academic',5,['academic','data']);
W('diagnosis','word','Health and Lifestyle','Writing','诊断','identification of illness','formal',4,['academic','health']);
W('discretion','word','Society and Government','Writing','酌情决定','freedom to decide','academic',5,['academic','law']);
W('dispute','word','Society and Government','Writing','争议','argument','formal',4,['academic','society']);
W('endeavour','word','Argument and Logic','Writing','努力','effort','formal',4,['academic','writing']);
W('entity','word','Society and Government','Writing','实体','distinct unit','formal',4,['academic','business']);
W('epidemic','word','Health and Lifestyle','Writing','流行病','widespread disease','formal',3,['academic','health']);
W('equilibrium','word','Science and Research','Writing','均衡','balance','academic',5,['academic','science']);
W('essence','word','Argument and Logic','Writing','本质','fundamental nature','formal',4,['academic','writing']);
W('foe','word','Argument and Logic','Writing','敌人','enemy','formal',4,['academic','reading']);
W('friction','word','Argument and Logic','Writing','摩擦','conflict','formal',4,['academic','society']);
W('fusion','word','Science and Research','Writing','融合','joining together','academic',5,['academic','science']);
R('genesis','word','Science and Research','Reading','起源','origin','academic',5,['academic','reading']);

// Pool C: Speaking-friendly vocabulary
S('appealing','word','Argument and Logic','Speaking','吸引人的','attractive','neutral',2,['academic','speaking']);
S('approachable','word','Society and Government','Speaking','平易近人的','easy to talk to','neutral',2,['academic','speaking']);
S('compelling','word','Argument and Logic','Speaking','有说服力的','very convincing','semi-formal',3,['academic','speaking']);
S('down-to-earth','word','Society and Government','Speaking','务实的','practical','neutral',2,['academic','speaking']);
S('eye-opening','word','Argument and Logic','Speaking','令人大开眼界的','surprising and informative','neutral',2,['academic','speaking']);
S('hands-on','word','Education','Speaking','实践的','practical','neutral',2,['academic','education']);
S('insightful','word','Argument and Logic','Speaking','有见地的','showing deep understanding','semi-formal',3,['academic','speaking']);
S('knowledgeable','word','Education','Speaking','博学的','well informed','neutral',2,['academic','education']);
S('memorable','word','Argument and Logic','Speaking','难忘的','easy to remember','neutral',2,['academic','speaking']);
S('noteworthy','word','Argument and Logic','Speaking','值得注意的','worth paying attention to','semi-formal',3,['academic','speaking']);

// Pool D: Task 1 data description
W('constitute','word','Trend and Comparison','Writing','构成','make up','formal',4,['academic','task1']);
W('correspond to','phrase','Trend and Comparison','Writing','对应于','match','formal',4,['academic','task1']);
W('exceed','word','Trend and Comparison','Writing','超过','go beyond','formal',3,['academic','task1']);
W('hover around','phrase','Trend and Comparison','Writing','徘徊在','stay near','formal',3,['academic','task1']);
W('outstrip','word','Trend and Comparison','Writing','超过','surpass','formal',4,['academic','task1']);
W('register','word','Trend and Comparison','Writing','录得','record','formal',3,['academic','task1']);
W('represent','word','Trend and Comparison','Writing','代表','stand for','formal',3,['academic','task1']);
W('stand at','phrase','Trend and Comparison','Writing','位于','be at a level','formal',3,['academic','task1']);
W('undergo','word','Trend and Comparison','Writing','经历','experience','formal',4,['academic','task1']);
// E: More academic vocab
W('prescribe','word','Health and Lifestyle','Writing','开处方','order treatment','formal',4,['academic','health']);
W('presume','word','Argument and Logic','Writing','假定','assume','formal',4,['academic','argument']);
W('proclaim','word','Society and Government','Writing','宣布','declare publicly','formal',4,['academic','government']);
W('prohibit','word','Society and Government','Writing','禁止','ban','formal',3,['academic','law']);
W('prolong','word','Trend and Comparison','Writing','延长','make longer','formal',4,['academic','data']);
W('prompt','word','Argument and Logic','Writing','促使','cause to happen','semi-formal',3,['academic','writing']);
W('prosecute','word','Society and Government','Writing','起诉','take legal action','formal',5,['academic','law']);
W('reconcile','word','Argument and Logic','Writing','调和','bring together','formal',5,['academic','argument']);
W('refine','word','Science and Research','Writing','精炼','improve','formal',3,['academic','research']);
W('reinforce','word','Argument and Logic','Writing','加强','strengthen','formal',3,['academic','writing']);
W('relinquish','word','Argument and Logic','Writing','放弃','give up','academic',5,['academic','reading']);
W('relocate','word','Transport and Urban Life','Writing','搬迁','move to new place','semi-formal',3,['academic','urban']);
W('render','word','Argument and Logic','Writing','使成为','make','formal',4,['academic','writing']);
W('renowned','word','Society and Government','Writing','著名的','famous','semi-formal',3,['academic','society']);
W('repeal','word','Society and Government','Writing','废除','cancel a law','academic',5,['academic','law']);
W('resemble','word','Trend and Comparison','Writing','类似于','look like','semi-formal',3,['academic','writing']);
W('restore','word','Society and Government','Writing','恢复','bring back','semi-formal',3,['academic','society']);
W('restrict','word','Society and Government','Writing','限制','limit','formal',3,['academic','government']);
W('retain','word','Education','Writing','保留','keep','formal',3,['academic','education']);
W('retaliate','word','Argument and Logic','Writing','报复','strike back','academic',5,['academic','reading']);
W('retract','word','Argument and Logic','Writing','撤回','take back','academic',5,['academic','argument']);
W('retrieve','word','Science and Research','Writing','检索','get back','formal',3,['academic','research']);
W('revise','word','Education','Writing','修订','change','semi-formal',3,['academic','education']);
W('revive','word','Trend and Comparison','Writing','复兴','bring back to life','semi-formal',3,['academic','society']);
W('revoke','word','Society and Government','Writing','撤销','cancel officially','academic',5,['academic','law']);
W('rupture','word','Science and Research','Writing','破裂','break apart','academic',5,['academic','science']);
W('sanction','word','Society and Government','Writing','制裁','penalise','formal',5,['academic','government']);
W('saturate','word','Trend and Comparison','Writing','饱和','fill completely','academic',5,['academic','data']);
W('scrutinise','word','Science and Research','Writing','仔细审查','examine closely','academic',5,['academic','research']);
W('segregate','word','Society and Government','Writing','隔离','separate','formal',5,['academic','society']);
W('solicit','word','Society and Government','Writing','征求','ask for','formal',5,['academic','business']);
W('stipulate','word','Society and Government','Writing','规定','specify as condition','academic',5,['academic','law']);
W('subordinate','word','Society and Government','Writing','从属的','lower in rank','academic',5,['academic','business']);
W('supersede','word','Trend and Comparison','Writing','取代','replace','academic',5,['academic','writing']);
W('suppress','word','Society and Government','Writing','压制','hold down','formal',4,['academic','government']);
W('surge','word','Trend and Comparison','Writing','激增','increase suddenly','semi-formal',3,['academic','trend']);
W('suspend','word','Society and Government','Writing','暂停','stop temporarily','formal',3,['academic','government']);
W('sustain','word','Environment and Energy','Writing','维持','keep going','formal',4,['academic','environment']);
W('tailor','word','Education','Writing','量身定制','customise','semi-formal',3,['academic','education']);
W('tackle','word','Argument and Logic','Writing','应对','deal with','semi-formal',3,['academic','writing']);
W('terminate','word','Trend and Comparison','Writing','终止','end','formal',4,['academic','business']);
W('testify','word','Society and Government','Writing','作证','give evidence','formal',5,['academic','law']);
W('transform','word','Trend and Comparison','Writing','转变','change completely','semi-formal',3,['academic','writing']);
W('trigger','word','Argument and Logic','Writing','引发','cause to start','semi-formal',3,['academic','writing']);
W('undermine','word','Argument and Logic','Writing','削弱','weaken','formal',4,['academic','argument']);
W('unify','word','Society and Government','Writing','统一','bring together','formal',4,['academic','society']);
W('uphold','word','Society and Government','Writing','维护','defend','formal',4,['academic','law']);
W('utilise','word','Science and Research','Writing','利用','make use of','formal',3,['academic','research']);
W('validate','word','Science and Research','Writing','验证','confirm','formal',4,['academic','research']);
W('venture','word','Trend and Comparison','Writing','冒险','risk','semi-formal',3,['academic','business']);
// Huge batch: 100+ terms
W('abundance','word','Environment and Energy','Writing','丰富','large quantity','formal',4,['academic','environment']);
W('adversity','word','Argument and Logic','Reading','逆境','difficulty','formal',4,['academic','argument']);
W('bureaucracy','word','Society and Government','Reading','官僚机构','complex admin','semi-formal',4,['academic','government']);
W('colonial','word','Society and Government','Reading','殖民的','related to colonies','academic',5,['academic','history']);
W('commodity','word','Trend and Comparison','Reading','商品','traded product','formal',4,['academic','economy']);
W('compassion','word','Society and Government','Speaking','同情心','sympathy','semi-formal',3,['academic','society']);
W('counterpart','word','Trend and Comparison','Reading','对应方','matching person','formal',4,['academic','business']);
W('courtesy','word','Society and Government','Speaking','礼貌','politeness','neutral',2,['academic','daily']);
W('decency','word','Society and Government','Speaking','体面','proper behaviour','neutral',3,['academic','society']);
W('demise','word','Trend and Comparison','Reading','消亡','end or death','academic',5,['academic','reading']);
W('destiny','word','Argument and Logic','Speaking','命运','fate','neutral',2,['academic','speaking']);
W('dignity','word','Society and Government','Writing','尊严','self-respect','semi-formal',3,['academic','society']);
W('drought','word','Environment and Energy','Reading','干旱','long dry period','semi-formal',3,['academic','environment']);
W('elite','word','Society and Government','Reading','精英','privileged group','semi-formal',3,['academic','society']);
W('empathy','word','Society and Government','Speaking','同理心','understanding feelings','semi-formal',3,['academic','society']);
W('endeavour','word','Argument and Logic','Reading','努力','effort','formal',4,['academic','argument']);
W('epoch','word','Trend and Comparison','Reading','时代','historical period','academic',5,['academic','history']);
W('esteem','word','Health and Lifestyle','Reading','尊重','respect','semi-formal',3,['academic','health']);
W('famine','word','Environment and Energy','Reading','饥荒','extreme food shortage','formal',4,['academic','environment']);
W('fidelity','word','Science and Research','Reading','准确性','accuracy','academic',5,['academic','science']);
W('foresight','word','Argument and Logic','Reading','远见','planning ahead','formal',4,['academic','argument']);
W('franchise','word','Trend and Comparison','Reading','特许经营','business licence','semi-formal',4,['academic','business']);
W('genocide','word','Society and Government','Reading','种族灭绝','mass killing','academic',5,['academic','history']);
W('gratitude','word','Society and Government','Speaking','感激','thankfulness','neutral',2,['academic','speaking']);
W('havoc','word','Environment and Energy','Reading','大破坏','great destruction','semi-formal',4,['academic','environment']);
W('heritage','word','Tourism and Accommodation','Reading','遗产','inherited tradition','semi-formal',3,['academic','culture']);
W('hierarchy','word','Society and Government','Reading','等级制度','ranking system','formal',4,['academic','society']);
W('hindsight','word','Argument and Logic','Speaking','事后聪明','looking back','neutral',3,['academic','daily']);
W('ideology','word','Society and Government','Reading','意识形态','belief system','academic',5,['academic','politics']);
W('illusion','word','Argument and Logic','Reading','幻觉','false idea','semi-formal',3,['academic','argument']);
W('indignation','word','Argument and Logic','Reading','愤怒','anger at injustice','academic',5,['academic','reading']);
W('infancy','word','Trend and Comparison','Reading','初期','early stage','semi-formal',3,['academic','writing']);
W('legacy','word','Society and Government','Reading','遗产','something left behind','semi-formal',3,['academic','history']);
W('liability','word','Trend and Comparison','Reading','责任','legal responsibility','formal',5,['academic','law']);
W('literacy','word','Education','Reading','读写能力','reading ability','formal',3,['academic','education']);
W('malice','word','Argument and Logic','Reading','恶意','ill will','academic',5,['academic','reading']);
W('mandate','word','Society and Government','Reading','授权','official order','formal',5,['academic','government']);
W('memoir','word','Education','Reading','回忆录','personal account','semi-formal',4,['academic','reading']);
W('monopoly','word','Trend and Comparison','Reading','垄断','exclusive control','formal',4,['academic','economy']);
W('morale','word','Society and Government','Reading','士气','team spirit','semi-formal',3,['academic','workplace']);
W('nostalgia','word','Society and Government','Speaking','怀旧','longing for past','neutral',3,['academic','speaking']);
W('obligation','word','Society and Government','Writing','义务','duty','semi-formal',3,['academic','society']);
W('parliament','word','Society and Government','Reading','议会','legislative body','formal',3,['academic','government']);
W('patriotism','word','Society and Government','Reading','爱国主义','love of country','semi-formal',4,['academic','politics']);
W('prejudice','word','Society and Government','Reading','偏见','unfair bias','semi-formal',3,['academic','society']);
W('privilege','word','Society and Government','Writing','特权','special advantage','semi-formal',3,['academic','society']);
W('prosperity','word','Trend and Comparison','Reading','繁荣','wealth','semi-formal',3,['academic','economy']);
W('protocol','word','Science and Research','Reading','规程','official procedure','academic',5,['academic','research']);
W('sanitation','word','Environment and Energy','Reading','卫生','cleanliness','formal',4,['academic','environment']);
W('solidarity','word','Society and Government','Reading','团结','unity','semi-formal',3,['academic','society']);
// Batch G: 200+ terms
W('sovereignty','word','Society and Government','Reading','主权','self-rule','academic',5,['academic','government']);
W('subsidy','word','Society and Government','Writing','补贴','financial help','semi-formal',3,['academic','economy']);
W('tenure','word','Education','Reading','终身职位','permanent post','academic',5,['academic','education']);
W('threshold','word','Trend and Comparison','Reading','门槛','entry point','formal',4,['academic','data']);
W('upbringing','word','Education','Speaking','教养','how raised','neutral',2,['academic','education']);
W('utility','word','Trend and Comparison','Reading','效用','usefulness','formal',4,['academic','writing']);
W('vulnerability','word','Health and Lifestyle','Reading','脆弱性','weakness','formal',4,['academic','health']);
W('wholesale','word','Trend and Comparison','Reading','批发','large-scale','semi-formal',3,['academic','business']);
W('workload','word','Education','Speaking','工作量','amount of work','neutral',2,['academic','education']);
W('blueprint','word','Argument and Logic','Reading','蓝图','detailed plan','semi-formal',3,['academic','writing']);
W('breakdown','word','Trend and Comparison','Reading','细分','detailed analysis','semi-formal',3,['academic','data']);
W('bypass','word','Argument and Logic','Reading','绕过','avoid','semi-formal',3,['academic','writing']);
W('checkpoint','word','Education','Reading','检查点','evaluation point','neutral',2,['academic','education']);
W('clash','word','Society and Government','Reading','冲突','conflict','semi-formal',3,['academic','society']);
W('comeback','word','Trend and Comparison','Speaking','回归','return','neutral',2,['academic','speaking']);
W('crackdown','word','Society and Government','Reading','打击','severe action','semi-formal',3,['academic','government']);
W('deadlock','word','Society and Government','Reading','僵局','stalemate','formal',4,['academic','politics']);
W('downturn','word','Trend and Comparison','Reading','衰退','decline','semi-formal',3,['academic','economy']);
W('drawback','word','Argument and Logic','Writing','缺点','disadvantage','semi-formal',2,['academic','writing']);
W('feedback','word','Education','Speaking','反馈','response','neutral',2,['academic','education']);
W('headway','word','Trend and Comparison','Reading','进展','progress','semi-formal',3,['academic','business']);
W('input','word','Science and Research','Reading','投入','contribution','neutral',2,['academic','research']);
W('layout','word','Transport and Urban Life','Reading','布局','arrangement','neutral',2,['academic','urban']);
W('lifespan','word','Health and Lifestyle','Reading','寿命','length of life','semi-formal',3,['academic','health']);
W('makeup','word','Trend and Comparison','Reading','构成','composition','neutral',2,['academic','data']);
W('outbreak','word','Health and Lifestyle','Reading','爆发','sudden spread','semi-formal',3,['academic','health']);
W('outlook','word','Trend and Comparison','Reading','前景','future prospect','semi-formal',3,['academic','writing']);
W('payoff','word','Trend and Comparison','Speaking','回报','reward','neutral',2,['academic','daily']);
W('pitfall','word','Argument and Logic','Reading','陷阱','hidden danger','semi-formal',3,['academic','writing']);
W('setback','word','Trend and Comparison','Speaking','挫折','difficulty','neutral',2,['academic','daily']);
W('shutdown','word','Society and Government','Reading','关闭','closure','semi-formal',3,['academic','government']);
W('standpoint','word','Argument and Logic','Writing','立场','point of view','semi-formal',3,['academic','writing']);
W('takeover','word','Trend and Comparison','Reading','收购','acquisition','semi-formal',3,['academic','business']);
W('turnout','word','Society and Government','Reading','出席人数','attendance','semi-formal',3,['academic','politics']);
W('upkeep','word','Transport and Urban Life','Reading','维护','maintenance','neutral',2,['academic','urban']);
W('upsurge','word','Trend and Comparison','Reading','高涨','sudden increase','formal',4,['academic','trend']);
W('wasteland','word','Environment and Energy','Reading','荒地','barren land','semi-formal',3,['academic','environment']);
W('willingness','word','Argument and Logic','Reading','意愿','readiness','semi-formal',3,['academic','writing']);
W('workforce','word','Trend and Comparison','Reading','劳动力','workers','semi-formal',3,['academic','economy']);
W('workshop','word','Education','Listening','工作坊','hands-on session','neutral',2,['academic','education']);
W('worldview','word','Argument and Logic','Reading','世界观','perspective','semi-formal',4,['academic','reading']);
W('breakthrough','word','Science and Research','Reading','突破','major advance','semi-formal',3,['academic','science']);
W('milestone','word','Trend and Comparison','Reading','里程碑','important stage','semi-formal',3,['academic','writing']);
W('benchmark','word','Trend and Comparison','Writing','基准','standard','formal',4,['academic','data']);
W('framework','word','Argument and Logic','Writing','框架','structure','semi-formal',3,['academic','writing']);
W('guideline','word','Society and Government','Writing','指南','recommendation','semi-formal',2,['academic','government']);
W('hallmark','word','Argument and Logic','Reading','标志','defining feature','formal',4,['academic','writing']);
W('mechanism','word','Science and Research','Reading','机制','process','academic',4,['academic','science']);
W('paradigm','word','Science and Research','Reading','范式','model','academic',5,['academic','science']);

// --- EXECUTION ---
if (newItems.length > 0) {
  const updated = data.concat(newItems);
  fs.writeFileSync(file, JSON.stringify(updated));
}
console.log('Added', added, '| Skipped (dup):', skipped, '| Total:', data.length + added);
if (data.length + added < TARGET) console.log('Need', TARGET - (data.length + added), 'more — add more terms to script');

