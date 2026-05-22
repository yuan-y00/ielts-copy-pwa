const fs = require('fs');
const file = 'src/data/packs/ielts-exam-context-2000.json';
let raw = fs.readFileSync(file, 'utf-8');

// Remove replacement chars
raw = raw.replace(/�/g, '');

// The original had 。 before " or ,
// After corruption: Chinese char + ? + ," or Chinese char + ?"
// Fix: ? before ," or just " after CJK → 。 before those
// Pattern: 　-鿿 range followed by ? then " or ,"
// Replace: CJK?," → CJK。,"
raw = raw.replace(/([一-鿿　-〿＀-￯])\?,\"/g, '$1。,\"');
raw = raw.replace(/([一-鿿　-〿＀-￯])\?\"/g, '$1。\"');
// For CJK directly followed by ," (missing period and ?)
raw = raw.replace(/([一-鿿]),\"/g, '$1。,\"');

try {
  const items = JSON.parse(raw);
  fs.writeFileSync(file, JSON.stringify(items));
  console.log('SUCCESS:', items.length, 'items');
} catch(e) {
  console.log('FAIL:', e.message.substring(0, 100));
}
