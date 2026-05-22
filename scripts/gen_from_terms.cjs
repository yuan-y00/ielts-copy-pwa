const fs = require('fs');
const file = 'src/data/packs/ielts-exam-context-2000.json';
const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
const existing = new Set(data.map(d => d.term.toLowerCase()));

const FULL_FORMS = {
  GDP: 'Gross Domestic Product', UN: 'United Nations', WHO: 'World Health Organization',
  NGO: 'Non-Governmental Organization', EU: 'European Union', CO2: 'Carbon Dioxide',
  AI: 'Artificial Intelligence', ICT: 'Information and Communication Technology',
  STEM: 'Science, Technology, Engineering and Mathematics', 'R&D': 'Research and Development',
  EV: 'Electric Vehicle', IELTS: 'International English Language Testing System',
  KPI: 'Key Performance Indicator', ROI: 'Return on Investment',
};

const newItems = [];
let id = data.length + 1;

// Compact generation: [term, type, topic, examSkill, shortMeaning, shortMeaningInSentence, example, exampleZh, register, difficulty, tags]
const terms = [];
let added = 0;

// Helper to generate with same format as before
function add(t,ty,tp,sk,sm,sis,ex,ez,rg,df,tg){
  if(existing.has(t.toLowerCase()))return false;existing.add(t.toLowerCase());
  newItems.push({id:'ielts-exam-context-2000-'+String(id).padStart(4,'0'),packId:'ielts-exam-context-2000',term:t,type:ty,topic:tp,examSkill:sk,examUse:'',shortMeaning:sm,shortMeaningInSentence:sis,example:ex,exampleZh:ez,register:rg,difficulty:df,sourceType:'ielts_style_original',sourceTitle:'Original IELTS-style learning sentence',sourceUrl:'',sourceDate:'',isRealSourceSentence:false,tags:tg,fullForm:FULL_FORMS[t]||undefined});id++;added++;return true;
}

// Read terms from the JSON file
const termData = JSON.parse(fs.readFileSync('scripts/_ielts_terms.json', 'utf-8'));
for (const t of termData) add(t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8],t[9],t[10]);

const updated = data.concat(newItems);
fs.writeFileSync(file, JSON.stringify(updated));
console.log('Added', added, 'items from', termData.length, 'candidates. Total:', updated.length);
