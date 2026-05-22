const fs = require('fs');

const file = 'src/data/packs/ielts-exam-context-2000.json';
const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
const existingTerms = new Set(data.map(d => d.term.toLowerCase()));

let idCounter = data.length + 1;
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
add('voting right','collocation','Society and Government','Reading','discuss voting rights','选举权','right to vote','Voting rights were extended to women in most countries only during the twentieth century.','大多数国家女性到二十世纪才获得 voting right。','semi-formal',2,['society','government']);
add('law enforcement','collocation','Society and Government','Reading','discuss law enforcement','执法','police and rules','Effective law enforcement requires trust between the police and local communities.','有效的 law enforcement 需要警方与当地社区之间的信任。','formal',3,['society','government']);
add('policy maker','collocation','Society and Government','Writing','discuss policy making','政策制定者','rule decision maker','Policy makers must balance economic growth with environmental protection when drafting new laws.','policy maker 在起草新法律时必须平衡经济增长与环境保护。','formal',3,['government','policy']);
add('civil right','collocation','Society and Government','Reading','discuss civil rights','公民权利','basic citizen freedom','The civil rights movement of the 1960s brought significant legal changes to many countries.','1960 年代的 civil right 运动给许多国家带来了重大法律变革。','formal',4,['society','law']);
add('public service','collocation','Society and Government','Listening','discuss public services','公共服务','government help work','Public services such as libraries and parks play an important role in community life.','图书馆和公园等 public service 在社区生活中发挥着重要作用。','neutral',2,['government','community']);
add('social welfare','collocation','Society and Government','Writing','discuss social welfare','社会福利','government safety net','The social welfare system provides financial help to families living below the poverty line.','social welfare 体系为生活在贫困线以下的家庭提供经济援助。','formal',3,['society','government']);
add('political party','collocation','Society and Government','Reading','discuss political parties','政党','political group','Each political party presented its plan for reducing unemployment during the campaign.','每个 political party 在竞选活动中都提出了减少失业的计划。','semi-formal',2,['government','politics']);
add('human right','collocation','Society and Government','Writing','discuss human rights','人权','basic human protection','Access to clean water is increasingly recognised as a fundamental human right worldwide.','获取清洁用水正日益被全球承认为一项基本的 human right。','formal',3,['society','law']);
add('peaceful protest','collocation','Society and Government','Speaking','discuss peaceful protest','和平抗议','calm public disagreement','Thousands of students joined a peaceful protest against the proposed tuition fee increase.','数千名学生参加了反对拟议学费上涨的 peaceful protest。','neutral',2,['society','politics']);
add('jury service','collocation','Society and Government','Listening','discuss jury duty','陪审服务','citizen court duty','Citizens may be called for jury service and are legally required to attend unless excused.','公民可能被要求参加 jury service 除非获得豁免否则法律要求必须出席。','formal',3,['government','law']);

// Transport
add('carpool lane','collocation','Transport and Urban Life','Speaking','discuss carpool lanes','拼车道','shared car lane','The carpool lane is reserved for vehicles with at least two passengers during rush hour.','carpool lane 在高峰时段保留给至少有两名乘客的车辆。','neutral',2,['transport','urban']);
add('one-way street','phrase','Transport and Urban Life','Listening','discuss one-way streets','单行道','road with one direction','Be careful because that is a one-way street and you cannot enter from this side.','小心因为那是 one-way street 你不能从这边进入。','neutral',1,['transport','daily']);
add('speed limit','collocation','Transport and Urban Life','Listening','discuss speed limits','限速','fastest allowed speed','The speed limit on this motorway section has been reduced to 50 miles per hour.','这段高速公路的 speed limit 已降至每小时 50 英里。','neutral',1,['transport','safety']);
add('public transit','collocation','Transport and Urban Life','Writing','discuss public transit','公共交通','shared travel system','An efficient public transit system can significantly reduce car use in city centers.','高效的 public transit 系统可以显著减少市中心的汽车使用。','semi-formal',2,['transport','urban']);
add('road infrastructure','collocation','Transport and Urban Life','Reading','discuss road infrastructure','道路基础设施','road building systems','Investment in road infrastructure has not kept pace with the rapid growth of vehicle ownership.','road infrastructure 投资未能跟上车辆拥有量的快速增长。','formal',3,['transport','infrastructure']);
add('traffic signal','collocation','Transport and Urban Life','Listening','discuss traffic signals','交通信号灯','road light control','The traffic signal at the junction was out of order causing major delays this morning.','路口的 traffic signal 出了故障导致今早严重延误。','neutral',1,['transport','daily']);

// Tourism
add('package holiday','collocation','Tourism and Accommodation','Listening','discuss package holidays','套餐旅游','all-in-one trip deal','Package holidays often work out cheaper than booking flights and hotels separately.','package holiday 通常比单独预订机票和酒店更便宜。','neutral',2,['tourism','travel']);
add('tourist attraction','collocation','Tourism and Accommodation','Speaking','discuss tourist attractions','旅游景点','popular visitor spot','The museum has become the most visited tourist attraction since last year renovation.','自去年翻新以来该博物馆已成为访问量最大的 tourist attraction。','neutral',2,['tourism','culture']);
add('double room','collocation','Tourism and Accommodation','Listening','discuss hotel rooms','双人房','room for two people','I would like to book a double room with a sea view for three nights from Friday.','我想预订一间海景 double room 从周五开始住三晚。','neutral',1,['tourism','accommodation']);
add('check-in counter','collocation','Tourism and Accommodation','Listening','discuss airport check-in','值机柜台','airport registration desk','Please proceed to the check-in counter at least two hours before your departure time.','请在起飞前至少两小时前往 check-in counter。','neutral',1,['tourism','airport']);
add('carry-on luggage','collocation','Tourism and Accommodation','Speaking','discuss hand luggage','随身行李','bag taken on plane','Most airlines allow one piece of carry-on luggage plus a small personal item like a handbag.','大多数航空公司允许一件 carry-on luggage 外加一个小个人物品如手提包。','neutral',1,['tourism','travel']);

// Science & Research
add('control group','collocation','Science and Research','Reading','discuss experimental control','对照组','untreated comparison group','The control group received a placebo while the experimental group got the actual treatment.','control group 接受了安慰剂而实验组接受了实际治疗。','academic',4,['science','research']);
add('field study','collocation','Science and Research','Listening','discuss field research','实地研究','real-world research','The biology students are doing a field study of local plants in the nature reserve.','生物学学生正在自然保护区进行当地植物的 field study。','academic',3,['science','education']);
add('peer-reviewed journal','collocation','Science and Research','Reading','discuss academic publishing','同行评审期刊','expert-checked publication','The findings were published in a leading peer-reviewed journal after months of review.','经过数月的审查后这些发现发表在一本领先的 peer-reviewed journal 上。','academic',5,['science','academic']);
add('research grant','collocation','Science and Research','Listening','discuss research funding','研究资助','money for research','The team applied for a research grant to continue their work on renewable energy storage.','团队申请了 research grant 以继续他们在可再生能源存储方面的工作。','formal',3,['science','funding']);

console.log('Generated', newItems.length, 'items');
fs.writeFileSync('src/data/packs/_ielts_batch.json', JSON.stringify(newItems));
console.log('Done. First id:', newItems[0]?.id, 'Last id:', newItems[newItems.length-1]?.id);
