const fs = require('fs');
const file = 'src/data/packs/ielts-exam-context-2000.json';
const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
const existing = new Set(data.map(d => d.term.toLowerCase()));

const FF = {
  GDP:'Gross Domestic Product',UN:'United Nations',WHO:'World Health Organization',NGO:'Non-Governmental Organization',EU:'European Union',CO2:'Carbon Dioxide',AI:'Artificial Intelligence',ICT:'Information and Communication Technology',STEM:'Science, Technology, Engineering and Mathematics','R&D':'Research and Development',EV:'Electric Vehicle',IELTS:'International English Language Testing System',KPI:'Key Performance Indicator',ROI:'Return on Investment',
};

const newItems = [];
let id = data.length + 1;
let added = 0;

function a(t,ty,tp,sk,sm,sis,ex,ez,rg,df,tg){
  if(existing.has(t.toLowerCase()))return false;
  existing.add(t.toLowerCase());
  newItems.push({id:'ielts-exam-context-2000-'+String(id).padStart(4,'0'),packId:'ielts-exam-context-2000',term:t,type:ty,topic:tp,examSkill:sk,examUse:'',shortMeaning:sm,shortMeaningInSentence:sis,example:ex,exampleZh:ez,register:rg,difficulty:df,sourceType:'ielts_style_original',sourceTitle:'Original IELTS-style learning sentence',sourceUrl:'',sourceDate:'',isRealSourceSentence:false,tags:tg,fullForm:FF[t]||undefined});
  id++;added++;return true;
}

// Bulk terms: [term,type,topic,examSkill,shortMeaning,shortMeaningInSentence,example,exampleZh,register,difficulty,tags]
const T=[
// Writing - Academic verbs & expressions
['assert','word','Argument and Logic','Writing','断言','state firmly','The author asserts that early intervention is the most effective way to address learning gaps.','作者 asserts 早期干预是解决学习差距的最有效方法。','formal',4,['academic','writing']],
['advocate','word','Argument and Logic','Writing','提倡','publicly support','Many educators advocate for smaller class sizes to improve student outcomes.','许多教育工作者 advocate 小班教学以改善学生成果。','formal',3,['academic','education']],
['dismiss','word','Argument and Logic','Reading','驳回','reject as unimportant','It would be unwise to dismiss the concerns raised by the local community.','忽视当地社区提出的担忧是不明智的。','formal',4,['academic','argument']],
['endorse','word','Society and Government','Reading','支持','publicly approve','The proposal was endorsed by several leading environmental organisations.','该提案得到了几个主要环保组织的 endorse。','formal',4,['academic','government']],
['outline','word','Argument and Logic','Writing','概述','give a summary','The first paragraph outlines the main arguments that will be discussed in the essay.','第一段 outline 了文章将讨论的主要论点。','formal',3,['academic','writing']],
['propose','word','Argument and Logic','Writing','提议','put forward','The committee proposed a new framework for evaluating the environmental impact of projects.','委员会 propose 了一个评估项目环境影响的新框架。','formal',3,['academic','government']],
['query','word','Science and Research','Reading','质疑','question','Several researchers have queried the methodology used in the original study.','几位研究人员 query 了原研究中使用的方法。','formal',4,['academic','research']],
['reckon','word','Argument and Logic','Speaking','认为','think','I reckon the benefits of the new policy will outweigh the costs in the long term.','我 reckon 新政策的好处从长远来看会超过成本。','neutral',2,['academic','speaking']],
['speculate','word','Trend and Comparison','Reading','推测','guess','It is too early to speculate about the long-term effects of the new legislation.','现在就 speculate 新立法的长期影响还为时过早。','formal',4,['academic','writing']],
['verify','word','Science and Research','Reading','核实','check if true','Independent experts were brought in to verify the accuracy of the experimental results.','独立专家被请来 verify 实验结果的准确性。','formal',3,['academic','research']],

// Reading - Advanced vocabulary
['adjacent','word','Transport and Urban Life','Reading','邻近的','next to','The new shopping centre was built on land adjacent to the railway station.','新的购物中心建在火车站 adjacent 的地块上。','formal',4,['academic','reading']],
['commence','word','Trend and Comparison','Reading','开始','begin','Construction is scheduled to commence in the spring and finish by the end of the year.','施工计划在春季 commence 并在年底前完工。','formal',3,['academic','business']],
['diminish','word','Trend and Comparison','Reading','减少','become smaller','The effectiveness of the medicine diminished over time as the patient developed resistance.','随着患者产生抗药性药物的有效性逐渐 diminish。','formal',4,['academic','science']],
['displace','word','Society and Government','Reading','取代','force out','Automation threatens to displace workers in manufacturing and administrative roles.','自动化威胁着要 displace 制造业和行政岗位的工人。','formal',4,['academic','technology']],
['erode','word','Environment and Energy','Reading','侵蚀','gradually destroy','Coastal erosion has been accelerated by rising sea levels and more frequent storms.','海平面上升和更频繁的风暴加速了海岸线的 erode。','formal',4,['academic','environment']],
['flourish','word','Trend and Comparison','Reading','繁荣','grow well','Small businesses have flourished in the area since the pedestrian zone was introduced.','自从引入步行区以来小企业在该地区 flourish 起来。','semi-formal',3,['academic','economy']],
['linger','word','Trend and Comparison','Reading','持续','stay longer than expected','The effects of the recession continued to linger long after the official recovery began.','经济衰退的影响在官方复苏开始后仍继续 linger。','formal',4,['academic','economy']],
['outpace','word','Trend and Comparison','Reading','超过','grow faster than','Demand for skilled workers continues to outpace supply in the technology sector.','技术行业对熟练工人的需求继续 outpace 供应。','formal',4,['academic','economy']],
['plunge','word','Trend and Comparison','Reading','骤降','fall suddenly','Visitor numbers plunged during the winter months but recovered strongly in spring.','游客数量在冬季月份 plunge 但在春季强劲恢复。','semi-formal',3,['academic','tourism']],
['prosper','word','Trend and Comparison','Reading','繁荣','be successful','The region has prospered since the opening of the new international airport.','自新国际机场开放以来该地区 prosper 起来。','formal',3,['academic','economy']],
['retain','word','Education','Reading','保留','keep','Students who take handwritten notes tend to retain information better than those who type.','手写笔记的学生往往比打字的学生更好地 retain 信息。','formal',3,['academic','education']],
['scarce','word','Trend and Comparison','Reading','稀缺的','in short supply','Fresh water is becoming increasingly scarce in many parts of the world.','在世界许多地方淡水正变得越来越 scarce。','semi-formal',3,['academic','environment']],
['thrive','word','Trend and Comparison','Reading','蓬勃发展','grow vigorously','The company has thrived despite intense competition in the global market.','尽管全球市场竞争激烈该公司仍然 thrive。','semi-formal',3,['academic','business']],
['vanish','word','Trend and Comparison','Reading','消失','disappear','Many traditional crafts have nearly vanished as mass production took over.','随着大规模生产的兴起许多传统工艺几乎 vanish。','semi-formal',3,['academic','culture']],
['wane','word','Trend and Comparison','Reading','减弱','gradually decrease','Public interest in the issue has waned since the initial media coverage faded.','自最初的媒体报道消退以来公众对该问题的兴趣已经 wane。','formal',5,['academic','media']],

// B2: Collocations & Phrases
['have a bearing on','phrase','Argument and Logic','Writing','影响','affect','The quality of early education has a direct bearing on a child future academic success.','早期教育的质量对一个孩子未来的学业成功有直接的 have a bearing on。','formal',4,['academic','education']],
['be at odds with','phrase','Argument and Logic','Reading','与……不一致','disagree with','The new evidence is at odds with the long-held theory about the causes of the disease.','新证据与关于该疾病病因的长期理论 be at odds with。','formal',5,['academic','science']],
['fall short of','phrase','Trend and Comparison','Reading','未达到','fail to reach','The project fell short of its original targets due to budget cuts and staffing issues.','该项目因为预算削减和人员问题 fall short of 最初的目标。','semi-formal',3,['academic','business']],
['give rise to','phrase','Argument and Logic','Writing','引起','cause','Rapid urbanisation has given rise to a range of social and environmental challenges.','快速的城市化 give rise to 了一系列社会和环境挑战。','formal',4,['academic','society']],
['lose sight of','phrase','Argument and Logic','Speaking','忽略','forget','In the rush to meet deadlines we should not lose sight of the bigger picture.','在赶 deadline 的过程中我们不应 lose sight of 更大的图景。','neutral',3,['academic','daily']],
['run counter to','phrase','Argument and Logic','Reading','违背','go against','The proposed changes run counter to the original principles of the programme.','拟议的变更 run counter to 该计划的原始原则。','formal',5,['academic','argument']],
['single out','phrase','Argument and Logic','Speaking','挑出','choose one','It would be unfair to single out one department when the problem affects the whole company.','当问题影响整个公司时 single out 一个部门是不公平的。','neutral',3,['academic','daily']],
['zero in on','phrase','Argument and Logic','Speaking','聚焦','focus closely','The investigation has zeroed in on three potential causes of the equipment failure.','调查已经 zero in on 设备故障的三个潜在原因。','neutral',3,['academic','daily']],
['by virtue of','phrase','Argument and Logic','Reading','由于','because of','The city became a cultural centre by virtue of its location at the crossroads of trade routes.','这座城市 by virtue of 其位于贸易路线交汇处的地理位置成为文化中心。','academic',5,['academic','history']],
['in light of','phrase','Argument and Logic','Reading','鉴于','considering','In light of recent findings the government has revised its public health guidance.','in light of 最近的发现政府修订了其公共卫生指南。','formal',4,['academic','government']],
['with the exception of','phrase','Trend and Comparison','Reading','除……之外','excluding','With the exception of the smallest firms most companies now have an online presence.','with the exception of 最小的公司大多数公司现在都有在线业务。','formal',3,['academic','business']],

// B3: Task 1 vocabulary
['a sizeable minority','phrase','Trend and Comparison','Writing','相当少数','big minority','A sizeable minority of respondents reported being dissatisfied with the current service.','a sizeable minority 的受访者表示对当前服务不满意。','formal',4,['academic','task1']],
['an overwhelming majority','phrase','Trend and Comparison','Writing','压倒性多数','very large majority','An overwhelming majority of those surveyed supported stricter environmental regulations.','an overwhelming majority 的受访者支持更严格的环境法规。','formal',3,['academic','task1']],
['climb steadily','phrase','Trend and Comparison','Writing','稳步攀升','go up gradually','The number of international students climbed steadily throughout the decade.','国际学生数量在整个十年间 steadily climbed。','formal',3,['academic','task1']],
['dip slightly','phrase','Trend and Comparison','Writing','小幅下降','go down a little','Sales dipped slightly in the second quarter before recovering in the third.','销售额在第二季度 slightly dipped 然后在第三季度恢复。','formal',3,['academic','task1']],
['fluctuate wildly','phrase','Trend and Comparison','Writing','剧烈波动','go up and down a lot','The currency fluctuated wildly during the period of political uncertainty.','在政治不确定时期货币 wildly fluctuated。','formal',4,['academic','task1']],
['hold steady','phrase','Trend and Comparison','Writing','保持稳定','stay the same','The unemployment rate held steady at around four percent for most of the decade.','失业率在十年的大部分时间里 hold steady 在百分之四左右。','formal',3,['academic','task1']],
['level out','phrase','Trend and Comparison','Writing','趋于平稳','become flat','After a period of rapid growth the figures began to level out in the final quarter.','经过一段快速增长后数字在最后一个季度开始 level out。','formal',3,['academic','task1']],
['narrow the gap','phrase','Trend and Comparison','Writing','缩小差距','reduce the difference','The gap between male and female earnings has narrowed significantly over the past twenty years.','男女收入之间的差距在过去二十年中显著 narrow。','formal',3,['academic','society']],

// B4: Education, Tech, Environment
['alumni','word','Education','Reading','校友','former students','The university alumni network provides valuable career connections for graduates.','该大学的 alumni 网络为毕业生提供了宝贵的人脉。','semi-formal',3,['academic','education']],
['mentor','word','Education','Reading','导师','guide','A good mentor can help young professionals navigate the early stages of their career.','好的 mentor 可以帮助年轻专业人士度过职业生涯的早期阶段。','semi-formal',2,['academic','career']],
['solar-powered','word','Environment and Energy','Reading','太阳能的','using sun energy','Solar-powered streetlights have been installed along the entire coastal promenade.','沿海长廊沿线安装了 solar-powered 路灯。','neutral',2,['academic','environment']],
['wind farm','collocation','Environment and Energy','Reading','风力发电场','group of wind turbines','The offshore wind farm generates enough electricity to power over a hundred thousand homes.','海上 wind farm 发电量足以为超过十万户家庭供电。','semi-formal',2,['academic','environment']],
['geothermal','word','Environment and Energy','Reading','地热的','using earth heat','Iceland generates most of its electricity from geothermal and hydroelectric sources.','冰岛的大部分电力来自 geothermal 和水力发电。','academic',5,['academic','environment']],
['telemedicine','word','Health and Lifestyle','Reading','远程医疗','remote doctor visits','Telemedicine has made healthcare more accessible for people in remote rural areas.','telemedicine 使偏远农村地区的人们更容易获得医疗服务。','formal',4,['academic','health']],
['sanitation','word','Environment and Energy','Reading','卫生设施','clean water and waste','Access to basic sanitation remains a challenge for over two billion people worldwide.','全球超过二十亿人仍然难以获得 basic sanitation。','formal',4,['academic','global']],
['watershed','word','Environment and Energy','Reading','分水岭','turning point','The court ruling marked a watershed moment in the history of environmental law.','法院裁决标志着环境法历史上的 watershed 时刻。','formal',5,['academic','law']],
['distort','word','Technology and Media','Reading','扭曲','twist from truth','Social media algorithms can distort how the public understands complex scientific issues.','社交媒体算法会 distort 公众对复杂科学问题的理解。','formal',4,['academic','media']],
['eradicate','word','Society and Government','Writing','根除','completely remove','Vaccination programmes have helped eradicate several deadly diseases worldwide.','疫苗接种计划帮助在全球 eradicate 了几种致命疾病。','formal',5,['academic','health']],
['stimulate','word','Trend and Comparison','Writing','刺激','encourage activity','Lower interest rates can stimulate spending and investment during an economic downturn.','较低的利率可以在经济衰退期间 stimulate 消费和投资。','formal',3,['academic','economy']],
['comply with','phrase','Society and Government','Reading','遵守','follow rules','All businesses must comply with the new data protection regulations by the end of the year.','所有企业必须在年底前 comply with 新的数据保护法规。','formal',4,['academic','law']],
['lag behind','phrase','Trend and Comparison','Reading','落后','fall behind','Rural areas still lag behind cities in access to reliable high-speed internet.','农村地区在可靠的高速互联网接入方面仍然 lag behind 城市。','semi-formal',3,['academic','technology']],
['dispose of','phrase','Environment and Energy','Reading','处理','get rid of properly','Households must learn to dispose of electronic waste properly rather than putting it in general rubbish.','家庭必须学会妥善 dispose of 电子垃圾而不是扔进普通垃圾。','semi-formal',3,['academic','environment']],
['capitalise on','phrase','Trend and Comparison','Reading','利用','take advantage of','The company failed to capitalise on the growing demand for sustainable packaging.','该公司未能 capitalise on 对可持续包装日益增长的需求。','formal',4,['academic','business']],
['resort to','phrase','Argument and Logic','Reading','诉诸','turn to as last option','When patients cannot afford healthcare they often resort to home remedies or delay treatment.','当患者负担不起医疗费用时他们经常 resort to 家庭疗法或推迟治疗。','formal',4,['academic','health']],
['abide by','phrase','Society and Government','Reading','遵守','obey','All members of the organisation must abide by the code of conduct at all times.','该组织的所有成员必须始终 abide by 行为准则。','formal',4,['academic','law']],
['set aside','phrase','Argument and Logic','Speaking','留出','reserve','It is wise to set aside a portion of your income each month for unexpected emergencies.','每月 set aside 一部分收入以备不时之需是明智的。','neutral',2,['academic','daily']],
['opt for','phrase','Trend and Comparison','Speaking','选择','choose','An increasing number of students are opting for vocational training over traditional university degrees.','越来越多的学生 opt for 职业培训而不是传统的大学学位。','neutral',2,['academic','education']],
['devoid of','phrase','Argument and Logic','Reading','缺乏','completely without','A city devoid of green spaces can feel oppressive and unhealthy for its residents.','devoid of 绿地的城市对居民来说可能感到压抑和不健康。','formal',5,['academic','environment']],
['in the wake of','phrase','Trend and Comparison','Reading','在……之后','following','In the wake of the scandal several senior executives resigned from their positions.','in the wake of 丑闻几位高管辞去了职务。','formal',4,['academic','business']],
['go hand in hand with','phrase','Argument and Logic','Writing','与……密切相关','closely connected','Economic development often goes hand in hand with increased energy consumption.','经济发展往往 go hand in hand with 能源消耗的增加。','semi-formal',3,['academic','economy']],
['at the expense of','phrase','Argument and Logic','Writing','以……为代价','sacrificing','Economic growth should not come at the expense of environmental protection.','经济增长不应 at the expense of 环境保护。','formal',3,['academic','environment']],
['take precedence over','phrase','Argument and Logic','Writing','优先于','be more important than','In an emergency passenger safety must take precedence over commercial considerations.','在紧急情况下乘客安全必须 take precedence over 商业考虑。','formal',4,['academic','safety']],
['behind the times','phrase','Argument and Logic','Speaking','过时的','old-fashioned','The current curriculum is behind the times and fails to prepare students for the modern workforce.','当前的课程 behind the times 无法让学生为现代职场做好准备。','neutral',2,['academic','education']],
['up to speed','phrase','Education','Speaking','跟上进度','fully informed','New employees usually need a few weeks to get up to speed with the company procedures.','新员工通常需要几周时间才能 get up to speed 公司的流程。','neutral',2,['academic','workplace']],
['over the course of','phrase','Trend and Comparison','Writing','在……期间','during','Over the course of the twentieth century life expectancy nearly doubled in most countries.','over the course of 二十世纪大多数国家的预期寿命几乎翻了一番。','formal',3,['academic','history']],
['feasible','word','Argument and Logic','Writing','可行的','practical to do','Switching entirely to renewable energy within ten years may not be feasible for every country.','十年内完全转向可再生能源对每个国家来说可能不 feasible。','formal',4,['academic','environment']],
['inevitable','word','Argument and Logic','Reading','不可避免的','certain to happen','Some degree of economic disruption is inevitable during the transition to a green economy.','在向绿色经济转型的过程中一定程度的经济 disruption 是 inevitable 的。','formal',4,['academic','economy']],
['reluctant','word','Argument and Logic','Reading','不情愿的','unwilling','Many small businesses are reluctant to invest in new technology due to the upfront costs.','由于前期成本许多小企业 reluctant 投资新技术。','semi-formal',3,['academic','business']],
['foremost','word','Argument and Logic','Writing','最重要的','most important','The foremost challenge facing the healthcare system is the ageing population.','医疗系统面临的 foremost 挑战是人口老龄化。','formal',4,['academic','health']],
['indispensable','word','Argument and Logic','Reading','不可或缺的','absolutely necessary','The internet has become an indispensable tool for research and communication in the modern world.','互联网已成为现代世界研究和沟通的 indispensable 工具。','formal',4,['academic','technology']],
['embrace','word','Argument and Logic','Writing','拥抱','accept willingly','Organisations that embrace change are more likely to thrive in a competitive global market.','embrace 变革的组织更有可能在竞争激烈的全球市场中 thrive。','semi-formal',3,['academic','business']],
['devise','word','Society and Government','Writing','设计','plan or invent','The government has devised a new strategy to reduce carbon emissions from public transport.','政府 devise 了一项减少公共交通碳排放的新策略。','formal',4,['academic','government']],
['deteriorate','word','Trend and Comparison','Reading','恶化','get worse','Air quality in the city has deteriorated sharply over the past five years.','该市的空气质量在过去五年中 sharply deteriorated。','formal',4,['academic','environment']],
['counterpart','word','Trend and Comparison','Reading','对应方','matching equivalent','The female counterpart of the species has a much brighter plumage than the male.','该物种的 female counterpart 羽毛比雄性鲜艳得多。','academic',5,['academic','science']],
['renowned','word','Society and Government','Reading','著名的','famous for','The city is renowned for its vibrant street art and thriving independent music scene.','这座城市以其充满活力的街头艺术和 thriving independent music scene 而 renowned。','formal',3,['academic','culture']],
['persist','word','Trend and Comparison','Reading','持续','continue despite difficulty','If the symptoms persist for more than a few days you should consult a doctor.','如果症状 persist 超过几天你应该咨询医生。','semi-formal',3,['academic','health']],
['withstand','word','Argument and Logic','Reading','承受','resist or endure','The bridge was designed to withstand earthquakes of up to magnitude eight.','这座桥被设计为 withstand 高达八级的地震。','formal',4,['academic','engineering']],
['flourish','word','Trend and Comparison','Reading','繁荣','grow vigorously','Small independent bookshops have flourished since the community introduced a local shopping campaign.','自从社区推出本地购物活动以来小型独立书店 flourish 起来。','semi-formal',3,['academic','economy']],
['adjacent to','phrase','Transport and Urban Life','Reading','邻近','next to','The new library was built on land adjacent to the main railway station for easy access.','新图书馆建在 main railway station adjacent to 的地块上以便于通行。','formal',4,['academic','urban']],
['prone to','phrase','Health and Lifestyle','Reading','易于','likely to suffer from','Elderly people are more prone to heatstroke during prolonged periods of hot weather.','老年人在 prolonged hot weather 期间更 prone to 中暑。','semi-formal',3,['academic','health']],
['accountable for','phrase','Society and Government','Reading','对……负责','responsible for','Public officials must be held accountable for how they spend taxpayer money.','公职人员必须对如何使用 taxpayer money accountable for。','formal',4,['academic','government']],
['on the verge of','phrase','Trend and Comparison','Reading','濒临','about to','The company was on the verge of bankruptcy before a last-minute investment saved it.','在最后一刻的投资挽救之前该公司 on the verge of 破产。','semi-formal',3,['academic','business']],
['in accordance with','phrase','Society and Government','Reading','根据','following','All experiments were conducted in accordance with the university ethical guidelines.','所有实验都是 in accordance with 大学伦理指南进行的。','academic',5,['academic','research']],
['throw light on','phrase','Argument and Logic','Reading','揭示','help explain','The newly discovered documents throw light on the mysterious events of that period.','新发现的文件 throw light on 那个时期的神秘事件。','formal',4,['academic','history']],
['keep abreast of','phrase','Education','Reading','跟上','stay updated','Healthcare professionals must keep abreast of the latest medical research and treatments.','医疗专业人员必须 keep abreast of 最新的医学研究和治疗方法。','formal',4,['academic','health']],
['bear the brunt of','phrase','Argument and Logic','Reading','首当其冲','suffer the worst','Low-income communities often bear the brunt of environmental pollution and climate impacts.','低收入社区往往 bear the brunt of 环境污染和气候影响。','formal',4,['academic','environment']],
['adhere to','phrase','Society and Government','Reading','遵守','stick to','All construction projects must adhere to the updated building safety standards.','所有建筑项目都必须 adhere to 最新的建筑安全标准。','formal',4,['academic','law']],
['in the midst of','phrase','Trend and Comparison','Reading','处于……之中','in the middle of','The country is in the midst of a demographic shift that will reshape its economy for decades.','该国 in the midst of 一场将重塑其经济数十年的人口转变。','formal',4,['academic','society']],
['rule of thumb','phrase','Argument and Logic','Speaking','经验法则','general guide','As a rule of thumb you should save at least ten percent of your monthly income for emergencies.','作为 rule of thumb 你应该至少将每月收入的百分之十存起来以备急用。','neutral',3,['academic','daily']],
];

for (const t of T) { a(t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8],t[9],t[10]); }
const updated = data.concat(newItems);
fs.writeFileSync(file, JSON.stringify(updated));
console.log('Added', added, 'from', T.length, 'candidates. Total:', updated.length, '| Remaining to 2000:', 2000 - updated.length);