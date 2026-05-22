const fs = require('fs');
const file = 'src/data/packs/ielts-exam-context-2000.json';

// Generate base items as compact arrays: [term, type, topic, examSkill, shortMeaning, shortMeaningInSentence, example, exampleZh, register, difficulty, tags[]]
const base = [
['curriculum','word','Education','Reading','课程','what students study','The national curriculum has been revised to include digital literacy.','国家 curriculum 已修订以纳入数字素养。','formal',3,['education','policy']],
['assessment','word','Education','Writing','评估','measuring learning','Continuous assessment provides a more accurate picture of student progress than final exams.','持续的 assessment 比期末考试更能准确反映学生的进步。','formal',2,['education','evaluation']],
['tuition','word','Education','Listening','学费','school fee','Many students struggle to afford the rising cost of university tuition.','许多学生难以负担不断上涨的大学 tuition。','neutral',2,['education','finance']],
['vocational','word','Education','Writing','职业的','job skill training','Vocational training programs help bridge the gap between education and employment.','vocational 培训项目有助于弥合教育与就业之间的差距。','formal',4,['education','employment']],
['literacy','word','Education','Reading','读写能力','reading and writing','Digital literacy is becoming as important as traditional literacy in modern workplaces.','数字 literacy 在现代工作场所变得与传统 literacy 同等重要。','semi-formal',3,['education','technology']],
['pedagogy','word','Education','Reading','教学法','teaching methods','Modern pedagogy emphasizes collaborative learning over rote memorisation.','现代 pedagogy 强调协作学习而非死记硬背。','academic',5,['education','academic']],
['keep pace with','phrase','Education','Writing','跟上','stay as fast as','Schools must keep pace with rapid technological advances to remain relevant.','学校必须 keep pace with 快速的技术进步以保持相关性。','semi-formal',3,['education','technology','phrase']],
['extracurricular','word','Education','Speaking','课外的','outside class','Extracurricular activities help students develop teamwork and leadership skills.','extracurricular 活动帮助学生培养团队合作和领导能力。','semi-formal',3,['education','activities']],
['scholarship','word','Education','Listening','奖学金','study funding','She was awarded a full scholarship to study engineering at a leading university.','她获得了一项全额 scholarship 去一所顶尖大学攻读工程学。','neutral',2,['education','finance']],
['peer pressure','collocation','Education','Speaking','同伴压力','group influence','Peer pressure can significantly influence academic performance during adolescence.','peer pressure 会显著影响青少年时期的学业表现。','neutral',2,['education','psychology']],
];

function makeItem(item, idx) {
  return {
    id: 'ielts-exam-context-2000-' + String(idx).padStart(4, '0'),
    packId: 'ielts-exam-context-2000',
    term: item[0], type: item[1], topic: item[2], examSkill: item[3],
    examUse: '', shortMeaning: item[4], shortMeaningInSentence: item[5],
    example: item[6], exampleZh: item[7], register: item[8], difficulty: item[9],
    sourceType: 'ielts_style_original',
    sourceTitle: 'Original IELTS-style learning sentence',
    sourceUrl: '', sourceDate: '', isRealSourceSentence: false,
    tags: item[10]
  };
}

const items = base.map((b, i) => makeItem(b, i + 1));
fs.writeFileSync(file, JSON.stringify(items));
console.log('Base:', items.length, 'items written to', file);
