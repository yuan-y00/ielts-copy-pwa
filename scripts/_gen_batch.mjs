const fs = require('fs');

const file = 'src/data/packs/ielts-exam-context-2000.json';
const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
const existingTerms = new Set(data.map(d => d.term.toLowerCase()));

let idCounter = 221;
const newItems = [];

function add(term, type, topic, examSkill, examUse, shortMeaning, shortMeaningInSentence, example, exampleZh, register, difficulty, tags) {
  if (existingTerms.has(term.toLowerCase())) return false;
  existingTerms.add(term.toLowerCase());
  const sid = 'ielts-exam-context-2000-' + String(idCounter).padStart(4, '0');
  newItems.push({
    id: sid, packId: 'ielts-exam-context-2000', term, type, topic, examSkill, examUse,
    shortMeaning, shortMeaningInSentence, example, exampleZh, register, difficulty,
    sourceType: 'ielts_style_original',
    sourceTitle: 'Original IELTS-style learning sentence',
    sourceUrl: '', sourceDate: '', isRealSourceSentence: false, tags
  });
  idCounter++;
  return true;
}

// Society & Government
add('voting right','collocation','Society and Government','Reading','讨论选举权','选举权','right to vote','Voting rights were extended to women in most countries only during the twentieth century.','大多数国家女性到二十世纪才获得 voting right。','semi-formal',2,['society','government']);
add('law enforcement','collocation','Society and Government','Reading','讨论执法','执法','police and rules','Effective law enforcement requires trust between the police and local communities.','有效的 law enforcement 需要警方与当地社区之间的信任。','formal',3,['society','government']);
add('policy maker','collocation','Society and Government','Writing','讨论政策制定者','政策制定者','rule decision maker','Policy makers must balance economic growth with environmental protection when drafting new laws.','policy maker 在起草新法律时必须平衡经济增长与环境保护。','formal',3,['government','policy']);
add('civil right','collocation','Society and Government','Reading','讨论公民权利','公民权利','basic citizen freedom','The civil rights movement of the 1960s brought significant legal changes to many countries.','1960 年代的 civil right 运动给许多国家带来了重大法律变革。','formal',4,['society','law']);
add('public service','collocation','Society and Government','Listening','讨论公共服务','公共服务','government help work','Public services such as libraries and parks play an important role in community life.','图书馆和公园等 public service 在社区生活中发挥着重要作用。','neutral',2,['government','community']);
add('social welfare','collocation','Society and Government','Writing','讨论社会福利','社会福利','government safety net','The social welfare system provides financial help to families living below the poverty line.','social welfare 体系为生活在贫困线以下的家庭提供经济援助。','formal',3,['society','government']);
add('political party','collocation','Society and Government','Reading','讨论政党','政党','political group','Each political party presented its plan for reducing unemployment during the campaign.','每个 political party 在竞选活动中都提出了减少失业的计划。','semi-formal',2,['government','politics']);
add('human right','collocation','Society and Government','Writing','讨论人权','人权','basic human protection','Access to clean water is increasingly recognised as a fundamental human right worldwide.','获取清洁用水正日益被全球承认为一项基本的 human right。','formal',3,['society','law']);
add('protest','word','Society and Government','Speaking','讨论抗议','抗议','public disagreement show','Thousands of students took part in a peaceful protest against the proposed tuition increase.','数千名学生参加了反对拟议学费上涨的和平 protest。','neutral',2,['society','politics']);
add('jury','word','Society and Government','Listening','讨论陪审团','陪审团','citizen decision group','The jury reached a verdict after three days of reviewing the evidence in court.','jury 在审查法庭证据三天后做出了裁决。','formal',3,['government','law']);

// Transport
add('carpool','word','Transport and Urban Life','Speaking','讨论拼车','拼车','sharing a car ride','Carpooling to work is a simple way to reduce both traffic and carbon emissions.','carpool 上班是减少交通和碳排放的简单方法。','neutral',2,['transport','environment']);
add('one-way street','phrase','Transport and Urban Life','Listening','讨论单行道','单行道','road with one direction','Be careful because that is a one-way street and you cannot enter from this side.','小心因为那是 one-way street 你不能从这边进入。','neutral',1,['transport','daily']);
add('speed limit','collocation','Transport and Urban Life','Listening','讨论限速','限速','fastest allowed speed','The speed limit on this motorway section has been reduced to 50 miles per hour.','这段高速公路的 speed limit 已降至每小时 50 英里。','neutral',1,['transport','safety']);
add('public transit','collocation','Transport and Urban Life','Writing','讨论公共交通','公共交通','shared travel system','An efficient public transit system can significantly reduce a city carbon footprint.','高效的 public transit 系统可以显著减少城市的碳足迹。','semi-formal',2,['transport','urban']);
add('road infrastructure','collocation','Transport and Urban Life','Reading','讨论道路基础设施','道路基础设施','road building systems','Investment in road infrastructure has not kept pace with the rapid growth of vehicle ownership.','road infrastructure 投资未能跟上车辆拥有量的快速增长。','formal',3,['transport','infrastructure']);

// Tourism
add('package holiday','collocation','Tourism and Accommodation','Listening','讨论套餐旅游','套餐旅游','all-in-one trip deal','Package holidays often work out cheaper than booking flights and hotels separately.','package holiday 通常比单独预订机票和酒店更便宜。','neutral',2,['tourism','travel']);
add('tourist attraction','collocation','Tourism and Accommodation','Speaking','讨论旅游景点','旅游景点','popular visitor spot','The museum has become the most visited tourist attraction since its renovation last year.','自去年翻新以来该博物馆已成为访问量最大的 tourist attraction。','neutral',2,['tourism','culture']);
add('double room','collocation','Tourism and Accommodation','Listening','讨论双人房','双人房','room for two people','I would like to book a double room with a sea view for three nights from Friday.','我想预订一间海景 double room 从周五开始住三晚。','neutral',1,['tourism','accommodation']);

// Science
add('control group','collocation','Science and Research','Reading','讨论对照组','对照组','untreated comparison group','The control group received a placebo while the experimental group got the actual treatment.','control group 接受了安慰剂而实验组接受了实际治疗。','academic',4,['science','research']);
add('field study','collocation','Science and Research','Listening','讨论实地研究','实地研究','real-world research','The biology students are doing a field study of local plants in the nearby nature reserve.','生物学学生正在附近的自然保护区进行当地植物的 field study。','academic',3,['science','education']);
add('peer-reviewed journal','collocation','Science and Research','Reading','讨论同行评审期刊','同行评审期刊','expert-checked publication','The findings were published in a leading peer-reviewed journal after months of review.','经过数月的审查后这些发现发表在一本领先的 peer-reviewed journal 上。','academic',5,['science','academic']);

console.log('Generated', newItems.length, 'items (0221-0' + (220 + newItems.length) + ')');
fs.writeFileSync('src/data/packs/_ielts_batch_0221.json', JSON.stringify(newItems, null, 2));
console.log('Wrote to src/data/packs/_ielts_batch_0221.json');
