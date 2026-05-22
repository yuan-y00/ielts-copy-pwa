const fs = require('fs');
const file = 'src/data/packs/ielts-exam-context-2000.json';
const d = JSON.parse(fs.readFileSync(file, 'utf-8'));
const fixes = {
  'assert': [/asserts/gi, 'assert'],
  'dismiss': [/dismiss/gi, 'dismiss'],
  'climb steadily': [/steadily climbed/gi, 'climb steadily'],
  'dip slightly': [/slightly dipped/gi, 'dip slightly'],
  'fluctuate wildly': [/wildly fluctuated/gi, 'fluctuate wildly'],
  'narrow the gap': [/narrow/gi, 'narrow the gap'],
};
let fixed = 0;
for (const item of d) {
  const f = fixes[item.term];
  if (f) { const old = item.exampleZh; item.exampleZh = old.replace(f[0], f[1]); if (old !== item.exampleZh) fixed++; }
}
fs.writeFileSync(file, JSON.stringify(d));
console.log('Fixed', fixed, 'items. Adding GDP fullForm...');
const gdp = d.find(x => x.term === 'GDP');
if (gdp && !gdp.fullForm) { gdp.fullForm = 'Gross Domestic Product'; console.log('Fixed GDP fullForm'); }
fs.writeFileSync(file, JSON.stringify(d));
console.log('Done');
