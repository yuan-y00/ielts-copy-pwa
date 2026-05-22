// DEPRECATED / DO NOT RUN
// This generator may produce low-quality or over-target items.
// Use only with a manually curated candidate pool.
const fs = require('fs');
const file = 'src/data/packs/ielts-exam-context-2000.json';
const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
const existing = new Set(data.map(d => d.term.toLowerCase()));
const FF = {GDP:'Gross Domestic Product',UN:'United Nations',WHO:'World Health Organization',NGO:'Non-Governmental Organization',EU:'European Union',CO2:'Carbon Dioxide',AI:'Artificial Intelligence',ICT:'Information and Communication Technology',STEM:'Science, Technology, Engineering and Mathematics','R&D':'Research and Development',EV:'Electric Vehicle',IELTS:'International English Language Testing System',KPI:'Key Performance Indicator',ROI:'Return on Investment'};

const exPool = [
  ['The concept of {term} is central to understanding modern {topicWord}.','{term} 的概念是理解现代{topicZh}的核心。'],
  ['Researchers have studied the effects of {term} on {topicWord} for decades.','研究人员几十年来一直在研究 {term} 对{topicZh}的影响。'],
  ['Governments around the world are increasingly focusing on {term} in their policies.','世界各国政府在政策中越来越关注 {term}。'],
  ['The report highlights {term} as one of the most significant challenges of our time.','报告强调 {term} 是我们这个时代最重大的挑战之一。'],
  ['Public awareness of {term} has grown considerably in recent years.','近年来公众对 {term} 的认识有了相当大的提高。'],
  ['The impact of {term} can be seen across multiple sectors of the economy.','{term} 的影响可以在经济的多个部门中看到。'],
  ['Many experts believe that addressing {term} should be a top priority.','许多专家认为解决 {term} 应该是最优先的事项。'],
  ['The data reveals a clear connection between {term} and overall wellbeing.','数据显示 {term} 与整体福祉之间存在明显的联系。'],
  ['The development of {term} has transformed the way people approach this field.','{term} 的发展已经改变了人们处理这一领域的方式。'],
  ['There is ongoing debate about the extent to which {term} influences outcomes.','关于 {term} 在多大程度上影响结果一直存在争论。'],
  ['The study examines the relationship between {term} and long-term success.','该研究考察了 {term} 与长期成功之间的关系。'],
  ['Understanding {term} is essential for anyone working in this area.','理解 {term} 对于在这一领域工作的任何人都至关重要。'],
];

const topicZh = {'Education':'教育','Technology and Media':'科技与媒体','Environment and Energy':'环境与能源','Health and Lifestyle':'健康与生活方式','Society and Government':'社会与政府','Transport and Urban Life':'交通与城市生活','Tourism and Accommodation':'旅游与住宿','Science and Research':'科学研究','Trend and Comparison':'趋势与对比','Argument and Logic':'论证与逻辑'};
const topicEn = {'Education':'education','Technology and Media':'technology','Environment and Energy':'the environment','Health and Lifestyle':'public health','Society and Government':'society','Transport and Urban Life':'urban development','Tourism and Accommodation':'tourism','Science and Research':'scientific research','Trend and Comparison':'data analysis','Argument and Logic':'logical reasoning'};

const newItems = [];
let id = data.length + 1, added = 0, skipped = 0;
const TARGET = 2000;

function add(term,sm,sis,topic,type,examSkill,diff){
  if(existing.has(term.toLowerCase())){skipped++;return;}
  existing.add(term.toLowerCase());
  const tpl = exPool[Math.floor(Math.random()*exPool.length)];
  const example = tpl[0].replace('{term}',term).replace('{topicWord}',topicEn[topic]||topic);
  const exampleZh = tpl[1].replace('{term}',term).replace('{topicZh}',topicZh[topic]||'');
  newItems.push({
    id:'ielts-exam-context-2000-'+String(id).padStart(4,'0'),packId:'ielts-exam-context-2000',
    term,type:type||'word',topic,examSkill:examSkill||'Reading',examUse:'',
    shortMeaning:sm,shortMeaningInSentence:sis,
    example,exampleZh,
    register:'semi-formal',difficulty:diff||3,
    sourceType:'ielts_style_original',sourceTitle:'Original IELTS-style learning sentence',
    sourceUrl:'',sourceDate:'',isRealSourceSentence:false,
    tags:['academic',topic.toLowerCase().replace(/\s+/g,'-')],
    fullForm:FF[term]||undefined
  });
  id++;added++;
}

// Ultra-compact: [term, sm, sis, topic, type, examSkill, diff]
const terms = require('./_ielts_fast_terms.json');
for(const t of terms) add(t[0],t[1],t[2],t[3]||'Argument and Logic',t[4]||'word',t[5]||'Writing',t[6]||3);

const updated = data.concat(newItems);
fs.writeFileSync(file, JSON.stringify(updated));
console.log('Added',added,'| Dup:',skipped,'| Total:',updated.length,'| Need',TARGET-updated.length,'more');

