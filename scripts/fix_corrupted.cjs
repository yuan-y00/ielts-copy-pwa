const fs = require('fs');
const file = 'src/data/packs/ielts-exam-context-2000.json';
let d = JSON.parse(fs.readFileSync(file, 'utf-8'));

// Find and fix items where difficulty is a string (register swapped with difficulty)
let fixed = 0;
for (const item of d) {
  // Check for swapped fields: difficulty is string (should be 1-5)
  if (typeof item.difficulty === 'string' && !Array.isArray(item.tags)) {
    // Fields are shifted: register→difficulty, difficulty→(missing), tags→(corrupted)
    // We need to find the original values. Unfortunately we can't recover.
    // Best approach: delete and regenerate
  }
  // Check for Chinese in shortMeaningInSentence
  if (typeof item.shortMeaningInSentence === 'string' && /[一-鿿]/.test(item.shortMeaningInSentence)) {
    // Chinese ended up in SIS - swap with shortMeaning if shortMeaning doesn't have Chinese
    if (typeof item.shortMeaning === 'string' && !/[一-鿿]/.test(item.shortMeaning)) {
      const tmp = item.shortMeaningInSentence;
      item.shortMeaningInSentence = item.shortMeaning;
      item.shortMeaning = tmp;
      fixed++;
    }
  }
}

// Fix missing difficulty and tags
for (const item of d) {
  if (typeof item.difficulty !== 'number' || item.difficulty < 1 || item.difficulty > 5) {
    item.difficulty = item.register === 'academic' ? 4 : item.register === 'formal' ? 3 : 2;
    fixed++;
  }
  if (!Array.isArray(item.tags)) {
    item.tags = ['academic', item.topic ? item.topic.toLowerCase().replace(/\s+/g,'-') : 'general'];
    fixed++;
  }
}

// Remove items that were truly corrupted (missing critical fields)
d = d.filter(item => {
  if (typeof item.term !== 'string' || !item.term) return false;
  if (typeof item.example !== 'string' || !item.example) return false;
  if (typeof item.exampleZh !== 'string' || !item.exampleZh) return false;
  return true;
});

fs.writeFileSync(file, JSON.stringify(d));
console.log('Fixed', fixed, 'issues. Remaining:', d.length, 'items');
