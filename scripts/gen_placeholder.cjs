// Generates 1500 placeholder entries (ids 501-2000)
// These will be fixed by fixWords.ts and checkWords.ts validation
const fs = require('fs');

const themes = [
  'Education and Work','Environment and Energy','Technology and Society',
  'Health and Psychology','Culture and History','Economy and Business',
  'Science and Research','Urbanization and Transport','Media and Communication',
  'Government and Law','Family and Society','Travel and Globalization'
];

const entries = [];
for (let i = 501; i <= 2000; i++) {
  const t = themes[(i - 501) % 12];
  entries.push({
    id: i,
    word: 'word' + i,
    theme: t,
    translation: '待翻译',
    shortMeaningInSentence: '待填写',
    exampleEn: 'Example sentence for word' + i + '.',
    exampleZh: '这是word' + i + '的中文例句'
  });
}

fs.writeFileSync('src/data/new_entries.json', JSON.stringify(entries, null, 2));
console.log('Generated', entries.length, 'placeholder entries to src/data/new_entries.json');
