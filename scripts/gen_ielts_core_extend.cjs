const fs=require('fs');
const file='src/data/packs/ielts-exam-context-2000.json';
const data=JSON.parse(fs.readFileSync(file,'utf-8'));
const existing=new Set(data.map(d=>d.term.toLowerCase()));
const FF={UN:'United Nations',WHO:'World Health Organization',EU:'European Union',UK:'United Kingdom',US:'United States',CO2:'Carbon Dioxide',AI:'Artificial Intelligence'};

const newItems=[];let id=data.length+1,added=0,skipped=0;

function add(t,sm,sis,topic,sk,ex,ez,rg,df,tg,type){
  if(existing.has(t.toLowerCase())){skipped++;return false;}
  existing.add(t.toLowerCase());
  newItems.push({id:'ielts-exam-context-2000-'+String(id).padStart(4,'0'),packId:'ielts-exam-context-2000',term:t,type:type||'word',topic,examSkill:sk,examUse:'',shortMeaning:sm,shortMeaningInSentence:sis,example:ex,exampleZh:ez,register:rg||'semi-formal',difficulty:df||2,sourceType:'ielts_style_original',sourceTitle:'Original IELTS-style learning sentence',sourceUrl:'',sourceDate:'',isRealSourceSentence:false,tags:tg||['ielts'],fullForm:FF[t]||undefined});
  id++;added++;return true;
}

const terms=[
// Listening - common everyday scenarios
['accommodation','住宿','place to stay','Tourism and Accommodation','Listening','We booked our accommodation near the city centre so we can walk everywhere.','我们在市中心附近订了 accommodation 这样走路就能去任何地方。','neutral',1,['tourism','daily']],
['appointment','预约','scheduled meeting','Health and Lifestyle','Listening','I have a doctor appointment at ten so I cannot attend the morning meeting.','我十点有个医生 appointment 所以不能参加早上的会议。','neutral',1,['health','daily']],
['registration','注册','signing up','Education','Listening','Registration for the new semester opens next Monday at 9am online.','新学期的 registration 下周一上午九点在网上开放。','neutral',1,['education','daily']],
['membership','会员','being a member','Society and Government','Listening','The gym membership includes unlimited access to all classes and the swimming pool.','健身房 membership 包含无限参加所有课程和使用游泳池。','neutral',1,['daily','lifestyle']],
['in advance','提前','beforehand','Transport and Urban Life','Listening','You should book your train ticket in advance because prices go up closer to the travel date.','你应该 in advance 预订火车票因为越接近旅行日期价格越贵。','neutral',1,['daily','transport']],
['on time','准时','punctual','Transport and Urban Life','Listening','The bus arrived on time despite the heavy rain this morning.','尽管今天早上下大雨巴士还是 on time 到了。','neutral',1,['daily','transport']],

// Speaking - natural everyday expressions
['on offer','提供中','available at a discount','Trend and Comparison','Speaking','There is a special deal on offer this week for new customers who sign up online.','本周有一个 on offer 的特别优惠针对在线注册的新客户。','neutral',1,['daily','shopping']],
['with a view to','为了','with the aim of','Argument and Logic','Speaking','I am saving money with a view to travelling around Southeast Asia next summer.','我在存钱 with a view to 明年夏天去东南亚旅行。','neutral',2,['daily','speaking']],
['by heart','熟记','from memory','Education','Speaking','I learned the poem by heart when I was in primary school and I still remember it.','我小学时把这首诗 by heart 背了下来现在还记得。','neutral',1,['daily','education']],
['keep in touch','保持联系','stay connected','Society and Government','Speaking','Social media makes it much easier to keep in touch with friends who live far away.','社交媒体让与住在远方的朋友 keep in touch 变得容易多了。','neutral',1,['daily','communication']],
['take part in','参加','participate','Education','Speaking','I would love to take part in the school debate competition but I get very nervous speaking in public.','我很想 take part in 学校的辩论比赛但在公共场合讲话我很紧张。','neutral',1,['daily','education']],

// Task 1 - basic but important
['fall to','下降到','drop to a level','Trend and Comparison','Writing','The unemployment rate fell to its lowest level in over a decade according to the latest figures.','根据最新数据 unemployment rate fall to 了十多年来的最低水平。','formal',2,['task1','data']],
['rise to','上升到','climb to a level','Trend and Comparison','Writing','The number of overseas visitors rose to a record high of over three million last year.','海外游客数量 rise to 了超过三百万的历史新高。','formal',2,['task1','data']],
['stand at','位于','be at a level','Trend and Comparison','Writing','The inflation rate currently stands at 2.1 percent which is within the target range.','inflation rate 目前 stand at 百分之二点一在目标范围内。','formal',3,['task1','data']],
['make up','构成','constitute','Trend and Comparison','Writing','Renewable sources now make up over a third of the total electricity generated in the country.','renewable source 现在 make up 该国总发电量的三分之一以上。','formal',2,['task1','data']],
['come from','来自','originate from','Trend and Comparison','Writing','The majority of imported goods come from neighbouring countries within the free trade zone.','大多数进口商品 come from 自由贸易区内的邻国。','neutral',2,['task1','data']],

// Task 2 - high-frequency opinion/argument
['face the challenge','面对挑战','deal with difficulty','Argument and Logic','Writing','Governments around the world face the challenge of balancing economic growth with environmental protection.','世界各国政府 face the challenge 在经济增长与环境保护之间取得平衡。','semi-formal',2,['argument','society']],
['take action','采取行动','do something','Argument and Logic','Writing','If we do not take action now the consequences of climate change will become irreversible.','如果我们现在不 take action 气候变化的后果将变得不可逆转。','semi-formal',2,['argument','environment']],
['play a part','发挥作用','have a role','Argument and Logic','Writing','Both individuals and governments must play a part in reducing the amount of waste we produce.','个人和政府都必须 play a part 在减少我们产生的垃圾量方面。','semi-formal',2,['argument','society']],
['meet the needs','满足需求','satisfy requirements','Argument and Logic','Writing','The current education system does not fully meet the needs of students who prefer practical learning.','当前的教育体系没有完全 meet the needs 喜欢实践学习的学生。','semi-formal',2,['argument','education']],
['take for granted','视为理所当然','assume','Argument and Logic','Writing','We often take clean water for granted until a shortage reminds us how precious it really is.','我们常常 take clean water for granted 直到短缺提醒我们它有多珍贵。','neutral',2,['argument','daily']],

// Reading - common academic vocabulary
['whereas','而','but in contrast','Trend and Comparison','Reading','The north of the country is mountainous whereas the south is mostly flat farmland.','该国北部多山 whereas 南部多为平坦的农田。','formal',2,['reading','comparison']],
['in contrast','相比之下','differently','Trend and Comparison','Reading','In contrast to the previous year sales figures showed a significant improvement across all regions.','in contrast 前一年销售数据在所有地区都显示出显著改善。','formal',2,['reading','comparison']],
['furthermore','此外','in addition','Argument and Logic','Reading','The building is old and furthermore the heating system has not been updated for over twenty years.','这栋建筑很旧 furthermore 供暖系统已经二十多年没有更新了。','formal',2,['reading','argument']],
['moreover','而且','besides','Argument and Logic','Reading','The new policy is expensive moreover there is little evidence it will achieve its stated goals.','新政策很 expensive moreover 几乎没有 evidence 表明它会实现既定目标。','formal',3,['reading','argument']],
['nevertheless','尽管如此','in spite of that','Argument and Logic','Reading','The experiment did not produce the expected results nevertheless the data will be useful for future studies.','实验没有产生预期的结果 nevertheless 数据对未来的研究将有用。','formal',3,['reading','argument']],
];

for(const t of terms)add(t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8],t[9],t[10]);
const updated=data.concat(newItems);
fs.writeFileSync(file,JSON.stringify(updated));
console.log('IELTS: Added',added,'| Skipped:',skipped,'| Total:',updated.length);
