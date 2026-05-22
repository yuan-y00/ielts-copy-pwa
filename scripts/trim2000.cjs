const fs = require('fs');
let d = JSON.parse(fs.readFileSync('src/data/ielts_words.json', 'utf-8'));
d = d.slice(0, 2000);
d.forEach((e, i) => { e.id = i + 1; });
fs.writeFileSync('src/data/ielts_words.json', JSON.stringify(d, null, 2) + '\n');
console.log('Trimmed to', d.length, 'entries');
