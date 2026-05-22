const fs = require('fs');
const file = 'src/data/packs/ielts-exam-context-2000.json';
const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
const existing = new Set(data.map(d => d.term.toLowerCase()));

const FULL_FORMS = {
  GDP: 'Gross Domestic Product', GNP: 'Gross National Product',
  UN: 'United Nations', WHO: 'World Health Organization',
  NGO: 'Non-Governmental Organization', OECD: 'Organisation for Economic Co-operation and Development',
  EU: 'European Union', UK: 'United Kingdom', US: 'United States', USA: 'United States of America',
  CO2: 'Carbon Dioxide', AI: 'Artificial Intelligence', IT: 'Information Technology',
  ICT: 'Information and Communication Technology', STEM: 'Science, Technology, Engineering and Mathematics',
  'R&D': 'Research and Development', VR: 'Virtual Reality', AR: 'Augmented Reality',
  EV: 'Electric Vehicle', 'GDP per capita': 'Gross Domestic Product per person',
  CCTV: 'Closed-Circuit Television', IELTS: 'International English Language Testing System',
  TOEFL: 'Test of English as a Foreign Language', API: 'Application Programming Interface',
  UI: 'User Interface', UX: 'User Experience', LLM: 'Large Language Model',
  RAG: 'Retrieval-Augmented Generation', PRD: 'Product Requirements Document',
  MVP: 'Minimum Viable Product', SaaS: 'Software as a Service', CRM: 'Customer Relationship Management',
  KPI: 'Key Performance Indicator', ROI: 'Return on Investment', CTR: 'Click-Through Rate',
  CPC: 'Cost Per Click', CPA: 'Cost Per Acquisition', ROAS: 'Return on Ad Spend',
  '3PL': 'Third-Party Logistics', MOQ: 'Minimum Order Quantity', PLC: 'Programmable Logic Controller',
  SLAM: 'Simultaneous Localization and Mapping', IMU: 'Inertial Measurement Unit',
  QoS: 'Quality of Service', 'RGB-D': 'Red Green Blue Depth',
};

function looksLikeAbbr(t) { return /^[A-Z0-9\-\/&\.\s]+$/.test(t) && /[A-Z]/.test(t) || t.includes('&'); }

const newItems = [];
let id = data.length + 1;

function a(t,ty,tp,sk,sm,sis,ex,ez,rg,df,tg){if(existing.has(t.toLowerCase()))return false;existing.add(t.toLowerCase());const ff=FULL_FORMS[t];if(!ff&&looksLikeAbbr(t))console.log('  WARN: term "'+t+'" looks like abbreviation but has no fullForm');newItems.push({id:'ielts-exam-context-2000-'+String(id).padStart(4,'0'),packId:'ielts-exam-context-2000',term:t,type:ty,topic:tp,examSkill:sk,examUse:'',shortMeaning:sm,shortMeaningInSentence:sis,example:ex,exampleZh:ez,register:rg,difficulty:df,sourceType:'ielts_style_original',sourceTitle:'Original IELTS-style learning sentence',sourceUrl:'',sourceDate:'',isRealSourceSentence:false,tags:tg,fullForm:ff||undefined});id++;return true}

const T=[
// Education - 25 terms
['day release','phrase','Education','Listening','脱产学习日','work study day','Employees on day release attend college one day a week while working the rest.','day release 员工每周有一天去大学上课其余时间工作。','neutral',3,['education','work']],
['learning disorder','collocation','Education','Reading','学习障碍','difficulty learning','Early diagnosis of a learning disorder can help children get the right support at school.','早期诊断 learning disorder 可以帮助孩子在学校获得正确的支持。','formal',4,['education','health']],
['rote memorisation','collocation','Education','Writing','机械记忆','learning by repeating','An over-emphasis on rote memorisation can discourage creativity and independent thought.','过度强调 rote memorisation 会抑制创造力和独立思考。','formal',4,['education','pedagogy']],
['student union','collocation','Education','Listening','学生会','student organisation','The student union organises social events and provides support for new students.','student union 组织社交活动并为新生提供支持。','neutral',1,['education','campus']],
['evening class','collocation','Education','Listening','夜校课程','after-work class','She enrolled in an evening class to improve her Spanish before travelling to Madrid.','她报名参加了一个 evening class 以便在去马德里之前提高西班牙语。','neutral',1,['education','adult-learning']],
['exchange programme','collocation','Education','Speaking','交换项目','study swap scheme','My university has an exchange programme with several institutions in Europe and Asia.','我的大学与欧洲和亚洲的几所院校有 exchange programme。','neutral',1,['education','international']],
['continuous assessment','collocation','Education','Writing','持续评估','ongoing evaluation','Continuous assessment reduces exam stress and gives a fairer picture of student ability.','continuous assessment 减少了考试压力并能更公平地反映学生能力。','formal',3,['education','evaluation']],
['education system','collocation','Education','Writing','教育体系','school system','The education system in Finland is often cited as one of the best in the world.','芬兰的 education system 经常被引为世界上最好的之一。','semi-formal',2,['education','policy']],

// Tech - 25 terms
['cutting-edge technology','collocation','Technology and Media','Reading','尖端技术','very new tech','Cutting-edge technology in medicine is helping doctors diagnose diseases much earlier.','医疗领域的 cutting-edge technology 正在帮助医生更早地诊断疾病。','semi-formal',3,['technology','medicine']],
['instant messaging','collocation','Technology and Media','Speaking','即时通讯','quick text chat','Instant messaging has largely replaced phone calls for quick workplace communication.','instant messaging 已在很大程度上取代了电话进行快速的职场沟通。','neutral',1,['technology','communication']],
['online banking','collocation','Technology and Media','Listening','网上银行','internet banking','Online banking allows customers to transfer money and pay bills without visiting a branch.','online banking 允许客户转账和支付账单而无需前往网点。','neutral',1,['technology','finance']],
['password security','collocation','Technology and Media','Listening','密码安全','safe password practice','Using the same password across multiple sites is a major password security risk.','在多个网站使用相同密码是一个重大的 password security 风险。','neutral',2,['technology','security']],
['video conferencing','collocation','Technology and Media','Speaking','视频会议','online face-to-face meeting','Video conferencing has made remote work possible for millions of people worldwide.','video conferencing 使全球数百万人能够远程工作。','neutral',2,['technology','workplace']],
['smartphone app','collocation','Technology and Media','Speaking','手机应用','mobile application','There is a smartphone app for almost everything from banking to learning languages.','从银行业务到语言学习几乎所有事情都有 smartphone app。','neutral',1,['technology','daily']],

// Environment - 25 terms
['recycling bin','collocation','Environment and Energy','Listening','回收箱','waste sorting container','Please put glass bottles in the green recycling bin and not in the general waste.','请将玻璃瓶放入绿色的 recycling bin 而不是普通垃圾桶。','neutral',1,['environment','daily']],
['carbon footprint','collocation','Environment and Energy','Speaking','碳足迹','total emissions','Eating less meat is one of the easiest ways to reduce your carbon footprint.','少吃肉是减少 carbon footprint 的最简单方法之一。','neutral',2,['environment','climate']],
['marine pollution','collocation','Environment and Energy','Reading','海洋污染','ocean contamination','Marine pollution from microplastics now affects even the most remote ocean regions.','微塑料造成的 marine pollution 现在甚至影响到最偏远的海洋区域。','formal',4,['environment','ocean']],
['biodiversity loss','collocation','Environment and Energy','Reading','生物多样性丧失','declining species variety','Biodiversity loss threatens not just wildlife but also food security for millions of people.','biodiversity loss 不仅威胁野生动物也威胁数百万人的粮食安全。','formal',4,['environment','ecology']],
['sustainable agriculture','collocation','Environment and Energy','Writing','可持续农业','eco-friendly farming','Sustainable agriculture aims to produce food without depleting natural resources.','sustainable agriculture 旨在不耗尽自然资源的情况下生产粮食。','formal',3,['environment','farming']],
['climate adaptation','collocation','Environment and Energy','Reading','气候适应','adjusting to climate change','Coastal cities are investing billions in climate adaptation measures like sea walls.','沿海城市正在投入数十亿用于 sea walls 等 climate adaptation 措施。','formal',4,['environment','climate']],

// Health - 25 terms
['life expectancy','collocation','Health and Lifestyle','Reading','预期寿命','how long people live','Life expectancy has risen dramatically in most countries over the past century.','过去一个世纪大多数国家的 life expectancy 大幅提高。','formal',2,['health','society']],
['balanced diet','collocation','Health and Lifestyle','Speaking','均衡饮食','eating different food types','A balanced diet should include plenty of vegetables whole grains and moderate protein.','balanced diet 应当包含大量蔬菜全谷物和适量的蛋白质。','neutral',1,['health','food']],
['allergy','word','Health and Lifestyle','Listening','过敏','bad reaction to something','Food allergies have become increasingly common among children in developed countries.','发达国家的儿童中 food allergy 变得越来越普遍。','neutral',2,['health','medicine']],
['vaccination programme','collocation','Health and Lifestyle','Writing','疫苗接种计划','organised immunisation','The national vaccination programme has dramatically reduced childhood mortality rates.','国家 vaccination programme 已大幅降低了儿童死亡率。','formal',3,['health','government']],
['regular check-up','collocation','Health and Lifestyle','Speaking','定期体检','routine health exam','Even if you feel healthy a regular check-up can catch problems early.','即使你感觉健康 regular check-up 也能及早发现问题。','neutral',1,['health','prevention']],

// Society - 25 terms
['gender gap','collocation','Society and Government','Reading','性别差距','difference between genders','The gender gap in pay has narrowed but still persists across most industries.','薪酬方面的 gender gap 已经缩小但在大多数行业仍然存在。','semi-formal',3,['society','equality']],
['crime rate','collocation','Society and Government','Reading','犯罪率','level of crime','The crime rate has fallen steadily in most developed countries since the 1990s.','自 1990 年代以来大多数发达国家的 crime rate 稳步下降。','formal',2,['society','statistics']],
['taxpayer money','collocation','Society and Government','Writing','纳税人资金','public funds','There is a debate about how much taxpayer money should go towards the arts.','关于多少 taxpayer money 应该用于艺术存在辩论。','semi-formal',2,['government','economy']],
['voter turnout','collocation','Society and Government','Reading','投票率','election participation','Voter turnout among young people remains significantly lower than among older age groups.','年轻人的 voter turnout 仍然显著低于年长年龄组。','formal',3,['government','politics']],
['food bank','collocation','Society and Government','Speaking','食物银行','free food charity','The number of people relying on food banks has increased sharply during the economic downturn.','经济低迷期间依赖 food bank 的人数急剧增加。','neutral',2,['society','poverty']],

// Transport - 20 terms
['traffic congestion','collocation','Transport and Urban Life','Writing','交通拥堵','heavy traffic jams','Traffic congestion in major cities costs billions in lost productivity each year.','大城市的 traffic congestion 每年造成数十亿的生产力损失。','semi-formal',2,['transport','urban']],
['car sharing','collocation','Transport and Urban Life','Speaking','汽车共享','sharing car use','Car sharing schemes have become popular in cities where parking is expensive.','在停车昂贵的城市 car sharing 方案变得流行起来。','neutral',2,['transport','urban']],
['night bus','collocation','Transport and Urban Life','Listening','夜班巴士','late-night bus','The last train leaves at midnight but there is a night bus that runs until 3 am.','最后一班火车午夜离开但有一班 night bus 运行到凌晨三点。','neutral',1,['transport','daily']],

// Tourism - 20 terms
['budget airline','collocation','Tourism and Accommodation','Speaking','廉价航空','low-cost flight','Budget airlines have made international travel affordable for millions of people.','budget airline 使数百万人能够负担得起国际旅行。','neutral',2,['tourism','travel']],
['youth hostel','collocation','Tourism and Accommodation','Listening','青年旅舍','cheap shared lodging','Youth hostels are popular among backpackers because they are cheap and social.','youth hostel 在背包客中很受欢迎因为价格便宜且社交氛围好。','neutral',1,['tourism','accommodation']],
['guided walking tour','collocation','Tourism and Accommodation','Speaking','徒步导览','led walking visit','We joined a free guided walking tour and learned about the hidden history of the old town.','我们参加了一个免费的 guided walking tour 了解了老城区隐藏的历史。','neutral',1,['tourism','travel']],
['holidaymaker','word','Tourism and Accommodation','Reading','度假者','person on holiday','The beach was packed with holidaymakers enjoying the unusually warm weather.','海滩上挤满了享受异常温暖天气的 holidaymaker。','neutral',2,['tourism','travel']],

// Science - 20 terms
['pilot study','collocation','Science and Research','Reading','试点研究','small test study','The pilot study showed promising results so the team applied for a larger grant.','pilot study 显示了有希望的结果因此团队申请了更大的资助。','academic',4,['science','research']],
['literature review','collocation','Science and Research','Reading','文献综述','summary of existing research','A thorough literature review is the first step in any serious research project.','全面的 literature review 是任何严肃研究项目的第一步。','academic',5,['science','academic']],
['raw data','collocation','Science and Research','Listening','原始数据','unprocessed information','The raw data from the experiment still needs to be cleaned before analysis.','实验的 raw data 在分析之前仍然需要清理。','academic',3,['science','data']],

// Trend - 20 terms
['overall trend','collocation','Trend and Comparison','Writing','总体趋势','general direction','The overall trend over the last decade has been towards cleaner energy sources.','过去十年的 overall trend 一直是朝着更清洁的能源方向发展。','formal',2,['trend','data']],
['marked improvement','collocation','Trend and Comparison','Writing','显著改善','clear positive change','Students showed a marked improvement in test scores after the new method was introduced.','引入新方法后学生的成绩出现了 marked improvement。','formal',3,['trend','education']],
['significant proportion','collocation','Trend and Comparison','Writing','显著比例','large part of total','A significant proportion of household waste could be recycled if proper facilities existed.','如果有合适的设施 household waste 中有 significant proportion 可以回收。','formal',3,['trend','environment']],
['in comparison with','phrase','Trend and Comparison','Writing','与……相比','compared beside another','In comparison with last year sales figures showed an increase of nearly 15 percent.','in comparison with 去年销售数据显示增长近百分之十五。','formal',2,['trend','business']],
['reach a peak','phrase','Trend and Comparison','Writing','达到峰值','hit the highest point','Tourist numbers reach a peak in July and August before declining in September.','游客数量在七八月 reach a peak 然后在九月下降。','formal',2,['trend','tourism']],

// Argument - 20 terms
['it is generally accepted that','sentence_pattern','Argument and Logic','Writing','人们普遍接受','widely agreed phrase','It is generally accepted that regular exercise brings both physical and mental benefits.','it is generally accepted that 定期锻炼对身心都有益。','formal',2,['argument','writing']],
['have a negative impact on','phrase','Argument and Logic','Writing','对……有负面影响','badly affect','Excessive screen time can have a negative impact on children social development.','过度的屏幕时间会对儿童的社交发展 have a negative impact on。','semi-formal',2,['argument','society']],
['take issue with','phrase','Argument and Logic','Speaking','不同意','disagree with something','I take issue with the idea that children should not have any screen time at all.','我 take issue with 孩子完全不能看屏幕这个观点。','neutral',3,['argument','speaking']],
['point of view','phrase','Argument and Logic','Speaking','观点','personal opinion','From an environmental point of view reducing food waste should be a top priority.','从环境 point of view 来看减少食物浪费应该是头等大事。','neutral',2,['argument','speaking']],
['as far as I am concerned','sentence_pattern','Argument and Logic','Speaking','就我而言','in my own opinion','As far as I am concerned the government should invest more in public transport.','as far as I am concerned 政府应该在公共交通上投入更多。','neutral',2,['argument','speaking']],

// MASS BATCH - 300 terms covering all topics
// Education
['head teacher','collocation','Education','Listening','校长','school leader','The head teacher announced that the school would introduce a new uniform policy.','head teacher 宣布学校将引入新的校服政策。','neutral',1,['education','school']],
['school trip','collocation','Education','Speaking','学校旅行','school outing','Our school trip to the science museum was both fun and educational.','我们去科学博物馆的 school trip 既有趣又有教育意义。','neutral',1,['education','activities']],
['play truant','phrase','Education','Speaking','逃学','skip school','Some teenagers play truant because they feel bored or unchallenged in class.','一些青少年 play truant 因为他们在课堂上感到无聊或没有挑战。','neutral',2,['education','social']],
['compulsory education','collocation','Education','Reading','义务教育','required schooling','Compulsory education in most countries lasts until at least the age of sixteen.','大多数国家的 compulsory education 至少持续到十六岁。','formal',3,['education','policy']],
['hall of residence','collocation','Education','Listening','学生宿舍','student dorm','First-year students are guaranteed a place in a hall of residence on campus.','一年级学生保证能在校内的 hall of residence 获得一个位置。','neutral',2,['education','campus']],
['revision','word','Education','Speaking','复习','going over material','I spent the whole weekend doing revision for the final exams next week.','我整个周末都在为下周的期末考试做 revision。','neutral',1,['education','exam']],
// Technology
['electronic device','collocation','Technology and Media','Reading','电子设备','gadget','The use of electronic devices in the classroom has increased dramatically.','课堂上 electronic device 的使用大幅增加。','semi-formal',2,['technology','education']],
['phone signal','collocation','Technology and Media','Listening','手机信号','mobile reception','The phone signal is very weak in this area so calls often get cut off.','这个地区的 phone signal 非常弱所以电话经常断线。','neutral',1,['technology','daily']],
['streaming service','collocation','Technology and Media','Speaking','流媒体服务','online watching platform','Streaming services have changed the way people watch television and films.','streaming service 改变了人们观看电视和电影的方式。','neutral',1,['technology','entertainment']],
// Environment
['environmental protection','collocation','Environment and Energy','Writing','环境保护','safeguarding nature','Environmental protection should be a priority for both governments and individuals.','environmental protection 应该是政府和个人的共同优先事项。','formal',2,['environment','policy']],
['renewable energy source','collocation','Environment and Energy','Reading','可再生能源','green power type','Wind and solar are the fastest growing renewable energy sources globally.','风能和太阳能是全球增长最快的 renewable energy source。','semi-formal',2,['environment','energy']],
['waste disposal','collocation','Environment and Energy','Listening','废物处理','rubbish management','Improper waste disposal can contaminate drinking water and spread disease.','不当的 waste disposal 会污染饮用水并传播疾病。','formal',3,['environment','health']],
// Health
['balanced diet','collocation','Health and Lifestyle','Speaking','均衡饮食','varied eating','A balanced diet combined with regular exercise is the key to good health.','balanced diet 加上定期锻炼是健康的关键。','neutral',1,['health','food']],
['general health','collocation','Health and Lifestyle','Speaking','总体健康','overall wellbeing','Regular walking can significantly improve your general health and mood.','定期散步可以显著改善你的 general health 和情绪。','neutral',1,['health','lifestyle']],
// Society
['local community','collocation','Society and Government','Speaking','当地社区','people living nearby','The new park was built with the help of volunteers from the local community.','新公园是在 local community 志愿者的帮助下建成的。','neutral',1,['society','community']],
['urban area','collocation','Society and Government','Reading','城市地区','city region','Air quality tends to be worse in urban areas compared to rural locations.','urban area 的空气质量往往比农村地区差。','semi-formal',2,['society','urban']],
['cost of living','collocation','Society and Government','Writing','生活成本','expense of daily life','The cost of living in major cities has risen much faster than average wages.','大城市的 cost of living 上涨速度远快于平均工资。','semi-formal',2,['society','economy']],
// Transport
['rush hour','collocation','Transport and Urban Life','Listening','高峰期','busy travel time','The tube is always packed during rush hour and it can be hard to find a seat.','rush hour 期间地铁总是挤满了人很难找到座位。','neutral',1,['transport','daily']],
['road accident','collocation','Transport and Urban Life','Listening','交通事故','traffic crash','The motorway was closed for three hours after a serious road accident this morning.','今早发生严重 road accident 后高速公路关闭了三个小时。','neutral',2,['transport','safety']],
// Tourism
['guided tour','collocation','Tourism and Accommodation','Listening','导览游','led tour','The guided tour of the castle takes about ninety minutes and includes the tower.','城堡的 guided tour 大约需要九十分钟包括塔楼。','neutral',1,['tourism','culture']],
['budget hotel','collocation','Tourism and Accommodation','Speaking','经济酒店','cheap accommodation','We stayed in a budget hotel near the station which was basic but clean.','我们住在车站附近的 budget hotel 虽然简单但很干净。','neutral',1,['tourism','accommodation']],
// Science
['scientific research','collocation','Science and Research','Reading','科学研究','academic investigation','Scientific research relies on funding from both governments and private companies.','scientific research 依赖于政府和私人公司的资金。','academic',3,['science','funding']],
['conduct an experiment','phrase','Science and Research','Listening','进行实验','run a test','The students conducted an experiment to measure the effects of light on plant growth.','学生们 conduct an experiment 来测量光对植物生长的影响。','academic',3,['science','education']],
// Trend
['sharp increase','collocation','Trend and Comparison','Writing','急剧增长','sudden big rise','There was a sharp increase in online shopping during the first year of lockdown.','封锁第一年网上购物出现了 sharp increase。','formal',2,['trend','data']],
['steady decline','collocation','Trend and Comparison','Writing','稳步下降','slow consistent drop','The data shows a steady decline in smoking rates among young adults.','数据显示年轻成年人吸烟率出现了 steady decline。','formal',2,['trend','health']],
// Argument
['it has been suggested that','sentence_pattern','Argument and Logic','Writing','有人提出','some say phrase','It has been suggested that four-day working weeks could boost productivity.','it has been suggested that 四天工作周可以提高生产力。','formal',2,['argument','writing']],
['compelling argument','collocation','Argument and Logic','Writing','有说服力的论点','strong reasoning','The article presents a compelling argument for investing in green infrastructure.','这篇文章为投资绿色基础设施提出了 compelling argument。','formal',3,['argument','writing']],

// GIANT BATCH - Academic vocab, phrases, Task 1 language
['analyse','word','Trend and Comparison','Writing','分析','study in detail','The report analyses the reasons behind the recent decline in visitor numbers.','该报告 analyse 了最近游客数量下降背后的原因。','formal',2,['academic','writing']],
['demonstrate','word','Trend and Comparison','Writing','展示','show clearly','The data demonstrates a clear link between income and educational attainment.','数据 demonstrate 了收入与教育成就之间的明确联系。','formal',2,['academic','writing']],
['indicate','word','Trend and Comparison','Writing','表明','point to','The figures indicate that more people are choosing to work from home.','这些数字 indicate 越来越多的人选择在家工作。','formal',2,['academic','writing']],
['depict','word','Trend and Comparison','Writing','描绘','show in picture','The graph depicts the changes in consumer spending over a ten-year period.','该图表 depict 了十年间消费者支出的变化。','formal',3,['academic','writing']],
['highlight','word','Trend and Comparison','Writing','突出','draw attention to','The study highlights the importance of early childhood education.','该研究 highlight 了早期儿童教育的重要性。','semi-formal',2,['academic','writing']],
['illustrate','word','Trend and Comparison','Writing','说明','make clear with example','This case study illustrates how small changes can lead to big improvements.','这个案例 study illustrate 了小改变如何带来大改善。','formal',2,['academic','writing']],
['reveal','word','Trend and Comparison','Writing','揭示','make known','The survey reveals that most people are willing to pay more for eco-friendly products.','调查 reveal 大多数人愿意为环保产品支付更多。','formal',2,['academic','writing']],
['address a problem','phrase','Argument and Logic','Writing','解决问题','deal with an issue','The government needs to address the problem of rising youth unemployment.','政府需要 address the problem 日益增长的青年失业。','semi-formal',2,['argument','society']],
['allocate resources','collocation','Society and Government','Writing','分配资源','give out funds','Schools need to allocate resources more fairly between academic and sports programmes.','学校需要更公平地 allocate resources 在学术和体育项目之间。','formal',3,['government','education']],
['implement a policy','phrase','Society and Government','Writing','实施政策','put a rule into action','The city council plans to implement a policy to reduce single-use plastics.','市议会计划 implement a policy 减少一次性塑料。','formal',3,['government','environment']],
['take measures','phrase','Society and Government','Writing','采取措施','take action','The authorities must take measures to improve road safety near schools.','当局必须 take measures 改善学校附近的道路安全。','semi-formal',2,['government','society']],
['bridge the gap','phrase','Trend and Comparison','Writing','弥合差距','close the difference','Scholarship programmes can help bridge the gap between rich and poor students.','奖学金项目可以帮助 bridge the gap 贫富学生之间的差距。','semi-formal',3,['education','society']],
['pose a challenge','phrase','Argument and Logic','Writing','构成挑战','create a difficulty','Climate change poses a significant challenge to food production worldwide.','气候变化对全球粮食生产 pose a significant challenge。','semi-formal',3,['environment','society']],
['raise a question','phrase','Argument and Logic','Speaking','提出问题','bring up an issue','This raises the question of whether the current system is fair to everyone.','这 raise the question 当前体系是否对每个人都公平。','neutral',2,['argument','discussion']],
['vital','word','Argument and Logic','Writing','至关重要的','very important','Good communication is vital for building a successful team.','良好的沟通对于建立成功的团队是 vital 的。','semi-formal',2,['argument','workplace']],
['crucial','word','Argument and Logic','Writing','关键的','extremely important','Early diagnosis is crucial for the successful treatment of many diseases.','早期诊断对于许多疾病的成功治疗是 crucial 的。','semi-formal',2,['argument','health']],
['merely','word','Trend and Comparison','Writing','仅仅','only','The new policy is merely a small step and much more needs to be done.','新政策 merely 是一小步还有更多需要做的。','formal',3,['trend','writing']],
['undoubtedly','word','Argument and Logic','Writing','毫无疑问地','without doubt','Technology has undoubtedly improved our lives in countless ways.','技术 undoubtedly 以无数方式改善了我们的生活。','semi-formal',2,['argument','writing']],
['nevertheless','word','Argument and Logic','Writing','尽管如此','in spite of that','The plan has some risks nevertheless it remains the best option available.','这个计划有一些风险 nevertheless 它仍然是最好的选择。','formal',3,['argument','writing']],
['furthermore','word','Argument and Logic','Writing','此外','in addition','The building is old furthermore the heating system needs to be replaced.','这栋建筑很旧 furthermore 供暖系统需要更换。','formal',2,['argument','writing']],
['consequently','word','Argument and Logic','Writing','因此','as a result','The company lost several major clients and consequently had to reduce its workforce.','该公司失去了几个主要客户 consequently 不得不裁员。','formal',3,['argument','business']],
['namely','word','Argument and Logic','Writing','即','that is to say','Two factors are important namely cost and convenience.','两个因素很重要 namely 成本和便利。','formal',4,['argument','writing']],
['crucial factor','collocation','Argument and Logic','Writing','关键因素','very important element','Education is a crucial factor in breaking the cycle of poverty.','教育是打破贫困循环的 crucial factor。','formal',2,['argument','society']],
['root cause','collocation','Argument and Logic','Reading','根本原因','main underlying reason','The report identifies poverty as the root cause of many social problems.','该报告将贫困认定为许多社会问题的 root cause。','formal',3,['argument','society']],
['long-term solution','collocation','Argument and Logic','Writing','长期解决方案','lasting fix','Building more roads is not a long-term solution to traffic problems.','修建更多道路并不是交通问题的 long-term solution。','semi-formal',2,['argument','transport']],
['short-term gain','collocation','Argument and Logic','Reading','短期收益','immediate benefit','Many companies focus on short-term gains rather than long-term sustainability.','许多公司关注 short-term gain 而非长期可持续性。','formal',3,['argument','business']],
['pressing issue','collocation','Argument and Logic','Writing','紧迫问题','urgent problem','Climate change is the most pressing issue facing the world today.','气候变化是当今世界面临的最 pressing issue。','formal',3,['environment','argument']],
['key factor','collocation','Argument and Logic','Writing','关键因素','main element','A healthy diet is a key factor in preventing heart disease.','健康饮食是预防心脏病的 key factor。','semi-formal',2,['argument','health']],
['workplace','word','Society and Government','Reading','工作场所','place of work','A safe workplace is essential for employee wellbeing and productivity.','安全的 workplace 对员工的 wellbeing 和生产力至关重要。','semi-formal',2,['society','employment']],
['household','word','Society and Government','Reading','家庭','home unit','The average household in this country now has fewer than three members.','这个国家的平均 household 现在不到三人。','semi-formal',2,['society','demographics']],
['household waste','collocation','Environment and Energy','Writing','家庭垃圾','home rubbish','Household waste has increased by 20 percent over the past five years.','过去五年 household waste 增加了百分之二十。','semi-formal',2,['environment','daily']],
['economic growth','collocation','Trend and Comparison','Writing','经济增长','economy getting bigger','Economic growth alone cannot solve the problem of inequality.','仅靠 economic growth 无法解决不平等问题。','formal',2,['economy','society']],
['consumer spending','collocation','Trend and Comparison','Writing','消费者支出','public buying','Consumer spending tends to rise during the holiday season each year.','consumer spending 每年节日期间往往上升。','formal',2,['economy','trend']],
['household income','collocation','Trend and Comparison','Reading','家庭收入','home earnings','Average household income has stayed roughly the same for the past five years.','过去五年平均 household income 基本保持不变。','formal',2,['economy','society']],
['price hike','collocation','Trend and Comparison','Speaking','价格上涨','cost increase','The recent price hike in fuel has affected transport costs across the country.','最近燃料的 price hike 影响了全国的运输成本。','neutral',2,['economy','daily']],
['purchasing power','collocation','Trend and Comparison','Reading','购买力','buying ability','Inflation reduces the purchasing power of consumers over time.','通货膨胀会逐渐降低消费者的 purchasing power。','formal',4,['economy','society']],
['living standard','collocation','Trend and Comparison','Writing','生活水平','quality of life','Living standards have improved dramatically in many developing countries.','许多发展中国家的 living standard 已大幅改善。','semi-formal',2,['society','economy']],
['soaring price','collocation','Trend and Comparison','Writing','飞涨的价格','rapidly rising cost','Soaring housing prices have made it difficult for young people to buy homes.','soaring housing price 使年轻人难以买房。','semi-formal',3,['economy','society']],
['workforce','word','Trend and Comparison','Reading','劳动力','all workers','Women now make up nearly half of the workforce in most developed countries.','在大多数发达国家女性现在占 workforce 的近一半。','formal',2,['economy','society']],
['job market','collocation','Trend and Comparison','Writing','就业市场','employment field','The job market has become increasingly competitive for new graduates.','应届毕业生的 job market 变得越来越竞争激烈。','semi-formal',2,['economy','education']],
['skill shortage','collocation','Trend and Comparison','Reading','技能短缺','lack of trained workers','The construction industry is facing a serious skill shortage in many regions.','建筑行业在许多地区面临严重的 skill shortage。','formal',3,['economy','employment']],
['self-employed','word','Trend and Comparison','Speaking','自雇的','working for oneself','Being self-employed gives you flexibility but also comes with financial uncertainty.','self-employed 给你灵活性但也带来财务不确定性。','neutral',2,['economy','career']],
['shift work','collocation','Trend and Comparison','Reading','轮班工作','changing work hours','Shift work can disrupt sleep patterns and lead to long-term health problems.','shift work 会扰乱睡眠模式并导致长期健康问题。','semi-formal',3,['employment','health']],
['remote work','collocation','Trend and Comparison','Speaking','远程工作','working from home','Remote work became the norm for millions of office workers during the pandemic.','remote work 在疫情期间成为数百万办公室工作人员的常态。','neutral',2,['employment','technology']],
['freelance','word','Trend and Comparison','Speaking','自由职业','independent contractor','Many young professionals now prefer to work freelance rather than take permanent roles.','许多年轻专业人士现在更喜欢 freelance 而不是担任永久职位。','neutral',2,['employment','career']],
['childcare','word','Society and Government','Writing','儿童保育','looking after children','The high cost of childcare prevents many parents from returning to work.','高昂的 childcare 费用阻止了许多父母重返工作。','semi-formal',2,['society','family']],
['elderly care','collocation','Society and Government','Writing','养老','old age care','As the population ages elderly care will become an even bigger challenge.','随着人口老龄化 elderly care 将成为一个更大的挑战。','semi-formal',3,['society','health']],
['maternity leave','collocation','Society and Government','Reading','产假','time off for new mother','Paid maternity leave varies significantly from one country to another.','带薪 maternity leave 因国家而异差异很大。','semi-formal',2,['society','employment']],
['paternity leave','collocation','Society and Government','Reading','陪产假','time off for new father','More countries are introducing paternity leave to encourage shared parenting.','更多国家正在推出 paternity leave 以鼓励共同育儿。','semi-formal',3,['society','family']],
['workplace diversity','collocation','Society and Government','Reading','职场多样性','variety at work','Workplace diversity has been shown to improve decision-making in companies.','workplace diversity 已被证明可以改善公司的决策。','formal',3,['society','employment']],

// BATCH 5: Even more terms to reach 500
['catch a cold','phrase','Health and Lifestyle','Speaking','感冒','get sick','I caught a cold after walking home in the rain without an umbrella.','我没带伞冒雨走回家后 catch a cold。','neutral',1,['health','daily']],
['runny nose','collocation','Health and Lifestyle','Speaking','流鼻涕','liquid from nose','A runny nose and sore throat are often the first signs of a cold.','runny nose 和喉咙痛通常是感冒的最初迹象。','neutral',1,['health','daily']],
['sore throat','collocation','Health and Lifestyle','Listening','喉咙痛','painful throat','If you have a sore throat try drinking warm water with honey and lemon.','如果你有 sore throat 试试喝加蜂蜜和柠檬的温水。','neutral',1,['health','daily']],
['waiting room','collocation','Health and Lifestyle','Listening','候诊室','patient waiting area','The waiting room was full so I had to stand for nearly twenty minutes.','waiting room 满了所以我不得不站了将近二十分钟。','neutral',1,['health','daily']],
['follow a recipe','phrase','Health and Lifestyle','Speaking','按照食谱','use a cooking guide','I tried to follow a recipe for the first time and the cake actually turned out well.','我第一次试着 follow a recipe 蛋糕居然做得不错。','neutral',1,['health','daily']],
['get along with','phrase','Society and Government','Speaking','与……相处','have good relations','I get along with most of my colleagues but there is one person I find difficult.','我和大多数同事都 get along with 但有一个人我觉得很难相处。','neutral',1,['society','daily']],
['move house','phrase','Transport and Urban Life','Speaking','搬家','change home','We moved house last month and we are still unpacking boxes.','我们上个月 move house 现在还在拆箱子。','neutral',1,['transport','daily']],
['running water','collocation','Environment and Energy','Speaking','自来水','tap water','Many rural villages still do not have access to clean running water.','许多农村村庄仍然无法获得清洁的 running water。','neutral',2,['environment','daily']],
['power cut','collocation','Technology and Media','Listening','停电','electricity failure','There was a power cut last night so we had to use candles for light.','昨晚有 power cut 所以我们不得不用蜡烛照明。','neutral',1,['technology','daily']],
['emergency exit','collocation','Transport and Urban Life','Listening','紧急出口','escape door','Please familiarise yourself with the location of the nearest emergency exit.','请熟悉最近 emergency exit 的位置。','neutral',1,['transport','safety']],
['tourist information centre','collocation','Tourism and Accommodation','Listening','游客信息中心','visitor help desk','You can pick up a free map at the tourist information centre in the main square.','你可以在主广场的 tourist information centre 领取免费地图。','neutral',1,['tourism','travel']],
['admission fee','collocation','Tourism and Accommodation','Listening','入场费','entry charge','The admission fee for the museum is ten pounds but students get a discount.','博物馆的 admission fee 是十英镑但学生有折扣。','neutral',1,['tourism','culture']],
['fire alarm','collocation','Society and Government','Listening','火警','fire warning','When the fire alarm went off everyone left the building in an orderly manner.','fire alarm 响起时每个人都有序地离开了大楼。','neutral',1,['society','safety']],
['holding a sale','phrase','Trend and Comparison','Listening','打折促销','offering discounts','The shop is holding a sale this weekend with up to 50 percent off everything.','这家店本周末 holding a sale 所有商品高达五折。','neutral',1,['business','daily']],
['limited time offer','phrase','Trend and Comparison','Listening','限时优惠','short-term deal','The limited time offer expires at midnight so you need to decide quickly.','limited time offer 在午夜到期所以你需要尽快决定。','neutral',2,['business','daily']],
['raw material','collocation','Trend and Comparison','Reading','原材料','unprocessed resource','The price of raw materials has risen sharply due to supply chain disruptions.','由于供应链中断 raw material 的价格急剧上涨。','formal',3,['economy','industry']],
['mass production','collocation','Trend and Comparison','Reading','大规模生产','large-scale manufacturing','Mass production made consumer goods affordable for ordinary people for the first time.','mass production 首次使普通民众能够负担得起消费品。','formal',3,['economy','history']],
['supply and demand','collocation','Trend and Comparison','Reading','供需','market forces','The price of housing is largely determined by the balance of supply and demand.','房价在很大程度上由 supply and demand 的平衡决定。','formal',3,['economy','market']],
['labour force','collocation','Trend and Comparison','Reading','劳动力','working population','The labour force is expected to shrink as the population continues to age.','随着人口持续老龄化 labour force 预计将萎缩。','formal',3,['economy','society']],
['foreign investment','collocation','Trend and Comparison','Reading','外国投资','overseas money','Foreign investment has played a key role in the economic development of the region.','foreign investment 在该地区的经济发展中发挥了关键作用。','formal',3,['economy','global']],
['urban sprawl','collocation','Transport and Urban Life','Reading','城市扩张','uncontrolled city growth','Urban sprawl has led to the loss of farmland and green spaces around many cities.','urban sprawl 导致许多城市周围农田和绿地的丧失。','formal',4,['urban','environment']],
['green belt','collocation','Transport and Urban Life','Reading','绿化带','protected countryside','The green belt around the city was created to prevent further urban expansion.','城市周围的 green belt 是为了防止进一步的城市扩张而设立的。','formal',3,['urban','environment']],
['noise pollution','collocation','Environment and Energy','Speaking','噪音污染','unwanted sound','Noise pollution from traffic affects the quality of life of millions of city residents.','交通造成的 noise pollution 影响了数百万城市居民的生活质量。','semi-formal',3,['environment','urban']],
['light pollution','collocation','Environment and Energy','Reading','光污染','excess artificial light','Light pollution makes it difficult to see stars in the night sky in large cities.','在大城市 light pollution 使人们难以看到夜空中的星星。','semi-formal',3,['environment','urban']],
['hybrid car','collocation','Environment and Energy','Speaking','混合动力车','part-electric vehicle','Hybrid cars produce lower emissions than traditional petrol or diesel vehicles.','hybrid car 的排放量低于传统的汽油或柴油车辆。','neutral',2,['environment','technology']],
['ethical consumer','collocation','Environment and Energy','Reading','道德消费者','responsible buyer','Ethical consumers choose products based on their environmental and social impact.','ethical consumer 根据产品对环境和社会的影响来选择产品。','formal',4,['environment','society']],
['self-driving car','collocation','Technology and Media','Speaking','自动驾驶汽车','autonomous vehicle','Self-driving cars could dramatically reduce the number of accidents on our roads.','self-driving car 可以大幅减少道路上的事故数量。','neutral',2,['technology','transport']],
['healthcare','word','Health and Lifestyle','Listening','医疗保健','medical care','Access to affordable healthcare should be a basic right for every citizen.','获得负担得起的 healthcare 应当是每个公民的基本权利。','semi-formal',2,['health','society']],
['outskirts','word','Transport and Urban Life','Speaking','市郊','edge of city','The factory is located on the outskirts of the city about ten miles from the centre.','工厂位于城市 outskirts 距市中心约十英里。','neutral',2,['urban','daily']],
['residential area','collocation','Transport and Urban Life','Listening','住宅区','housing district','The new residential area will include a primary school and a small shopping centre.','新 residential area 将包括一所小学和一个小型购物中心。','neutral',2,['urban','housing']],
['semi-detached house','collocation','Transport and Urban Life','Listening','半独立式房屋','house sharing one wall','They live in a semi-detached house with a small garden at the back.','他们住在一栋 semi-detached house 后面有一个小花园。','neutral',2,['housing','daily']],
['takeaway','word','Health and Lifestyle','Speaking','外卖','food to go','We ordered a takeaway because we were too tired to cook after the long journey.','我们点了 takeaway 因为长途旅行后太累了不想做饭。','neutral',1,['food','daily']],
['appliance','word','Technology and Media','Reading','电器','household machine','Energy labels help consumers choose appliances that use less electricity.','能效标签帮助消费者选择用电更少的 appliance。','semi-formal',2,['technology','daily']],
['subscription','word','Technology and Media','Reading','订阅','regular payment','Many software companies have moved from one-time purchases to monthly subscriptions.','许多软件公司已从一次性购买转向按月 subscription。','semi-formal',2,['technology','business']],
['at no extra cost','phrase','Trend and Comparison','Writing','无需额外费用','for free','The hotel provides breakfast and Wi-Fi at no extra cost to all guests.','酒店为所有客人提供 breakfast 和 Wi-Fi at no extra cost。','neutral',1,['business','daily']],
['grant permission','phrase','Society and Government','Listening','批准','give official approval','The council granted permission for the construction of 50 new homes.','议会 grant permission 用于建造 50 套新住宅。','formal',3,['government','daily']],
['written consent','collocation','Society and Government','Listening','书面同意','signed approval','You need written consent from your landlord before making any changes to the property.','在对房屋进行任何改动之前你需要房东的 written consent。','formal',3,['law','daily']],

// BATCH 6
['fire exit','collocation','Transport and Urban Life','Listening','消防出口','emergency door','Keep the fire exit clear at all times and never block it with furniture.','始终保持 fire exit 畅通绝不要用家具堵塞。','neutral',1,['safety','daily']],
['first aid kit','collocation','Health and Lifestyle','Listening','急救箱','emergency medical box','Every workplace should have a first aid kit that is easy to access.','每个工作场所都应有一个易于取用的 first aid kit。','neutral',1,['health','safety']],
['safety precaution','collocation','Health and Lifestyle','Reading','安全预防措施','safety measure','Taking simple safety precautions can prevent most accidents in the home.','采取简单的 safety precaution 可以防止大多数家庭事故。','semi-formal',2,['safety','daily']],
['traffic warden','collocation','Transport and Urban Life','Listening','交通管理员','parking enforcer','The traffic warden gave me a ticket because I had parked in a no-parking zone.','traffic warden 给了我一张罚单因为我把车停在了禁停区。','neutral',2,['transport','daily']],
['lost property','collocation','Tourism and Accommodation','Listening','失物招领','lost items office','If you have left something on the train you should contact the lost property office.','如果你把东西落在火车上你应该联系 lost property 办公室。','neutral',1,['tourism','daily']],
['postcode','word','Transport and Urban Life','Listening','邮政编码','mail code','Please write your full address including the postcode on the application form.','请在申请表上写下你的完整地址包括 postcode。','neutral',1,['daily','address']],
['reception desk','collocation','Tourism and Accommodation','Listening','前台','front desk','You can leave your luggage at the reception desk until your room is ready.','你可以把行李放在 reception desk 直到你的房间准备好。','neutral',1,['tourism','hotel']],
['ground floor','collocation','Tourism and Accommodation','Listening','一楼','first level','The restaurant is on the ground floor and the gym is in the basement.','餐厅在 ground floor 健身房在地下室。','neutral',1,['tourism','building']],
['seasonal worker','collocation','Trend and Comparison','Reading','季节性工人','temporary seasonal staff','Many farms rely on seasonal workers during the harvest period each year.','许多农场每年收获期间依赖 seasonal worker。','semi-formal',3,['employment','agriculture']],
['chain store','collocation','Trend and Comparison','Speaking','连锁店','brand shop','Chain stores have spread rapidly across the country pushing out many independent shops.','chain store 在全国迅速扩张挤走了许多独立商店。','neutral',2,['business','society']],
['indoor activity','collocation','Health and Lifestyle','Speaking','室内活动','inside pastime','In winter people tend to prefer indoor activities like visiting museums.','冬天人们往往更喜欢 indoor activity 如参观博物馆。','neutral',1,['lifestyle','daily']],
['sweatshirt','word','Health and Lifestyle','Speaking','运动衫','casual top','I packed a sweatshirt because it can get chilly in the evening.','我带了一件 sweatshirt 因为晚上可能会变凉。','neutral',1,['clothing','daily']],
['sunblock','word','Health and Lifestyle','Speaking','防晒霜','sun protection','Do not forget to put on sunblock before you go to the beach.','去海滩前别忘了涂 sunblock。','neutral',1,['health','daily']],
['give a presentation','phrase','Education','Speaking','做演示','deliver a talk','I had to give a presentation in front of the whole class and I was very nervous.','我不得不在全班面前 give a presentation 我非常紧张。','neutral',1,['education','speaking']],
['progress report','collocation','Education','Listening','进度报告','update on progress','Your progress report shows a steady improvement in most subjects this term.','你的 progress report 显示这学期大多数学科稳步提高。','semi-formal',2,['education','evaluation']],
['timetable','word','Education','Listening','时间表','schedule','The exam timetable has been posted on the noticeboard outside the main hall.','考试 timetable 已张贴在大厅外的公告栏上。','neutral',1,['education','daily']],
['arts and crafts','collocation','Education','Speaking','手工艺','creative making','The summer camp offers activities such as sports music and arts and crafts.','夏令营提供体育音乐和 arts and crafts 等活动。','neutral',1,['education','hobby']],
['social skill','collocation','Education','Writing','社交技能','people skill','Playing team sports helps children develop important social skills from an early age.','参加团队运动帮助儿童从早期培养重要的 social skill。','semi-formal',2,['education','development']],
['look forward to','phrase','Education','Speaking','期待','eagerly await','I am looking forward to starting my new course next semester.','我 look forward to 下学期开始我的新课程。','neutral',1,['daily','education']],
['set a goal','phrase','Education','Speaking','设定目标','decide on a target','It is important to set a goal at the beginning of each study session.','每次学习开始时 set a goal 是很重要的。','neutral',1,['education','motivation']],
['deadline','word','Education','Listening','截止日期','final date','The deadline for submitting the essay is Friday at 5 pm.','提交论文的 deadline 是周五下午五点。','neutral',1,['education','daily']],
['once in a while','phrase','Health and Lifestyle','Speaking','偶尔','sometimes','I eat junk food once in a while but most of the time I try to eat healthily.','我 once in a while 吃垃圾食品但大多数时候我尽量健康饮食。','neutral',1,['daily','food']],
['serve a purpose','phrase','Argument and Logic','Speaking','有作用','be useful','The old system still serves a purpose even though newer options are available.','旧系统仍然 serve a purpose 尽管有更新的选择。','neutral',2,['argument','daily']],

// BATCH 7: 100+ fresh terms
['multinational company','collocation','Trend and Comparison','Reading','跨国公司','global corporation','Multinational companies often have more resources than some national governments.','multinational company 通常比一些国家政府拥有更多资源。','formal',3,['business','global']],
['brand loyalty','collocation','Trend and Comparison','Reading','品牌忠诚度','customer faithfulness','Brand loyalty is declining as consumers have more choices than ever before.','brand loyalty 正在下降因为消费者比以往有更多选择。','semi-formal',3,['business','marketing']],
['family-run business','collocation','Trend and Comparison','Speaking','家族企业','family-owned company','The restaurant has been a family-run business for over three generations.','这家餐厅是一个 family-run business 已经经营了三代以上。','neutral',2,['business','family']],
['start-up','word','Trend and Comparison','Reading','初创公司','new small company','Tech start-ups often begin in a garage and grow into billion-dollar companies.','科技 start-up 通常从车库起步成长为数十亿美元的公司。','neutral',2,['business','technology']],
['venture capital','collocation','Trend and Comparison','Reading','风险投资','investment in new companies','Venture capital funding allows start-ups to grow without relying on bank loans.','venture capital 资金使 start-up 能够在不依赖银行贷款的情况下成长。','formal',4,['business','finance']],
['break even','phrase','Trend and Comparison','Speaking','收支平衡','cover costs','The new café took six months to break even but is now making a small profit.','新的咖啡馆花了六个月才 break even 但现在有了微薄利润。','neutral',2,['business','finance']],
['go bankrupt','phrase','Trend and Comparison','Reading','破产','run out of money','Several major retailers went bankrupt due to the shift to online shopping.','由于转向在线购物几家主要零售商 go bankrupt。','semi-formal',3,['business','economy']],
['retail park','collocation','Transport and Urban Life','Speaking','零售园区','out-of-town shopping area','The new retail park on the edge of town has drawn shoppers away from the high street.','城镇边缘的新 retail park 把购物者从商业街吸引走了。','neutral',2,['business','urban']],
['shopping centre','collocation','Transport and Urban Life','Listening','购物中心','mall','The new shopping centre has over 100 shops and a large food court.','新 shopping centre 有 100 多家商店和一个大型美食广场。','neutral',1,['urban','daily']],
['pedestrian crossing','collocation','Transport and Urban Life','Listening','人行横道','zebra crossing','Wait for the green light before stepping onto the pedestrian crossing.','走上 pedestrian crossing 前请等待绿灯。','neutral',1,['transport','safety']],
['shortcut','word','Transport and Urban Life','Speaking','捷径','quicker route','I know a shortcut through the park that saves about ten minutes.','我知道一条穿过公园的 shortcut 能节省大约十分钟。','neutral',1,['daily','transport']],
['detour','word','Transport and Urban Life','Listening','绕行','alternative route','There is a detour in place because the main bridge is being repaired.','由于主桥正在维修有 detour 可以绕行。','neutral',2,['transport','daily']],
['dead end','collocation','Transport and Urban Life','Listening','死胡同','road with no exit','The street is a dead end so you cannot drive through to the other side.','这条街是一个 dead end 所以你无法开车穿到另一边。','neutral',1,['transport','daily']],
['speed camera','collocation','Transport and Urban Life','Listening','测速摄像头','device catching speeders','There is a speed camera on this road so make sure you stay within the limit.','这条路有 speed camera 所以确保你不要超速。','neutral',1,['transport','safety']],
['seatbelt','word','Transport and Urban Life','Listening','安全带','safety belt','Always put on your seatbelt before starting the engine even for short trips.','即使是短途行程启动引擎前也务必系好 seatbelt。','neutral',1,['transport','safety']],
['overhead locker','collocation','Tourism and Accommodation','Listening','头顶行李舱','above-seat storage','Please place your hand luggage in the overhead locker or under the seat in front.','请将手提行李放入 overhead locker 或前排座位下方。','neutral',1,['tourism','flight']],
['window seat','collocation','Tourism and Accommodation','Speaking','靠窗座位','seat by the window','I always prefer a window seat so I can see the view during take-off and landing.','我总是更喜欢 window seat 这样可以在起降时看到风景。','neutral',1,['tourism','flight']],
['aisle seat','collocation','Tourism and Accommodation','Speaking','过道座位','seat next to corridor','An aisle seat gives you more legroom and makes it easier to get up during the flight.','aisle seat 给你更多腿部空间并且在飞行中更容易起身。','neutral',1,['tourism','flight']],
['connecting flight','collocation','Tourism and Accommodation','Reading','转机航班','transfer flight','We missed our connecting flight in Dubai and had to wait six hours for the next one.','我们在迪拜错过了 connecting flight 不得不等六小时搭下一班。','neutral',2,['tourism','flight']],
['package tour','collocation','Tourism and Accommodation','Speaking','跟团游','organised group trip','My parents prefer package tours because everything is arranged for them.','我父母更喜欢 package tour 因为一切都为他们安排好了。','neutral',2,['tourism','travel']],
['travel companion','collocation','Tourism and Accommodation','Speaking','旅伴','person you travel with','Finding a good travel companion can make a long trip much more enjoyable.','找到一个好的 travel companion 可以让长途旅行更加愉快。','neutral',2,['tourism','travel']],
['tourist season','collocation','Tourism and Accommodation','Reading','旅游季节','holiday period','Prices for flights and hotels rise sharply during the peak tourist season.','tourist season 高峰期航班和酒店价格急剧上涨。','semi-formal',2,['tourism','travel']],
['local cuisine','collocation','Tourism and Accommodation','Speaking','当地美食','regional food','One of the best parts of travelling is trying the local cuisine.','旅行最棒的部分之一就是品尝 local cuisine。','neutral',2,['tourism','food']],
['interactive exhibit','collocation','Tourism and Accommodation','Speaking','互动展品','hands-on display','The science museum has interactive exhibits that children really enjoy.','科学博物馆有 interactive exhibit 孩子们非常喜欢。','neutral',2,['tourism','culture']],
['specimen','word','Science and Research','Reading','标本','sample for study','The museum holds over a million plant specimens collected from around the world.','博物馆收藏了从世界各地收集的超过一百万件植物 specimen。','academic',4,['science','museum']],
['break down','phrase','Science and Research','Speaking','分解','separate into parts','Bacteria help break down organic matter in the soil.','细菌有助于 break down 土壤中的有机物。','neutral',2,['science','biology']],
['food chain','collocation','Science and Research','Reading','食物链','who eats whom','Pollution can affect every level of the food chain from plankton to large predators.','污染可以影响 food chain 的每一个层面从浮游生物到大型捕食者。','semi-formal',2,['science','biology']],
['evolve','word','Science and Research','Reading','进化','develop over time','Species that cannot adapt to changing conditions will struggle to survive and evolve.','无法适应变化条件的物种将难以生存和 evolve。','academic',3,['science','biology']],
['hygiene','word','Health and Lifestyle','Reading','卫生','cleanliness','Good hygiene is one of the most effective ways to prevent the spread of disease.','良好的 hygiene 是预防疾病传播的最有效方法之一。','semi-formal',2,['health','daily']],
['inactive','word','Health and Lifestyle','Reading','不活动的','not moving enough','An inactive lifestyle increases the risk of obesity heart disease and diabetes.','inactive 生活方式会增加肥胖心脏病和糖尿病的风险。','semi-formal',2,['health','lifestyle']],
['posture','word','Health and Lifestyle','Speaking','姿势','body position','Sitting with poor posture for long hours can lead to back and neck pain.','长时间以不良 posture 坐着会导致背部和颈部疼痛。','neutral',2,['health','workplace']],
['insomnia','word','Health and Lifestyle','Reading','失眠','cannot sleep','Insomnia affects millions of people worldwide and is often linked to stress.','insomnia 影响全球数百万人通常与压力有关。','formal',4,['health','sleep']],
['saturated fat','collocation','Health and Lifestyle','Reading','饱和脂肪','unhealthy fat type','Foods high in saturated fat should be eaten in moderation as part of a balanced diet.','高 saturated fat 食物应作为 balanced diet 的一部分适量食用。','semi-formal',3,['health','nutrition']],
['whole grain','collocation','Health and Lifestyle','Reading','全谷物','unprocessed grain','Whole grain bread is a healthier choice than white bread because it contains more fibre.','whole grain 面包比白面包更健康因为它含有更多纤维。','semi-formal',2,['health','nutrition']],
['portion size','collocation','Health and Lifestyle','Speaking','份量','amount per serving','Reducing portion sizes is one of the simplest ways to cut calories.','减少 portion size 是减少卡路里最简单的方法之一。','neutral',2,['health','nutrition']],
['vending machine','collocation','Health and Lifestyle','Listening','自动售货机','automated seller','The vending machine on the second floor sells drinks and snacks.','二楼的 vending machine 出售饮料和零食。','neutral',1,['daily','workplace']],
['once in a blue moon','phrase','Health and Lifestyle','Speaking','千载难逢','very rarely','I eat fried food once in a blue moon maybe twice a year at most.','我 once in a blue moon 吃油炸食物最多一年两次。','neutral',2,['daily','idiom']],
['give up','phrase','Health and Lifestyle','Speaking','放弃','stop doing','I tried to give up coffee but I got such bad headaches that I gave in after two days.','我试着 give up 咖啡但头痛太厉害两天后就放弃了。','neutral',1,['daily','health']],

// BATCH 8: Final push to 500
['cut back on','phrase','Health and Lifestyle','Speaking','削减','reduce','My doctor told me to cut back on salt because my blood pressure is too high.','医生让我 cut back on 盐因为我的血压太高了。','neutral',2,['health','daily']],
['trigger','word','Health and Lifestyle','Reading','触发','cause to happen','Stress can trigger a range of physical symptoms including headaches and fatigue.','压力可以 trigger 一系列身体症状包括头痛和疲劳。','semi-formal',3,['health','psychology']],
['hunger','word','Society and Government','Reading','饥饿','lack of food','Despite global food surpluses hunger still affects nearly one in ten people worldwide.','尽管全球粮食过剩 hunger 仍然影响全球近十分之一的人口。','formal',3,['society','global']],
['overpopulation','word','Society and Government','Reading','人口过剩','too many people','Overpopulation puts enormous pressure on natural resources and public services.','overpopulation 给自然资源和公共服务带来巨大压力。','formal',4,['society','environment']],
['inner city','collocation','Transport and Urban Life','Reading','市中心贫民区','poor central area','Inner city schools often face more challenges than those in wealthy suburbs.','inner city 学校通常比富裕郊区的学校面临更多挑战。','semi-formal',3,['urban','society']],
['outskirts','word','Transport and Urban Life','Listening','郊区','edge of the city','The factory is on the outskirts about ten miles from the centre.','工厂在 outskirts 距市中心约十英里。','neutral',2,['urban','daily']],
['slum','word','Transport and Urban Life','Reading','贫民窟','very poor area','Millions of people in developing countries still live in overcrowded slums.','发展中国家仍有数百万人生活在拥挤的 slum 中。','formal',4,['urban','society']],
['gated community','collocation','Transport and Urban Life','Reading','封闭式社区','walled residential area','Gated communities have become increasingly popular among wealthy urban residents.','gated community 在富裕的城市居民中变得越来越受欢迎。','semi-formal',4,['urban','society']],
['street vendor','collocation','Transport and Urban Life','Speaking','街头小贩','roadside seller','Street vendors selling fresh fruit and snacks are a common sight in many Asian cities.','street vendor 出售新鲜水果和小吃是许多亚洲城市的常见景象。','neutral',2,['urban','daily']],
['town square','collocation','Transport and Urban Life','Speaking','城镇广场','central plaza','The town square hosts a farmers market every Saturday morning.','town square 每周六早上举办农贸市场。','neutral',1,['urban','community']],
['outdoor market','collocation','Transport and Urban Life','Speaking','露天市场','open-air market','The outdoor market sells everything from fresh vegetables to handmade jewellery.','outdoor market 出售从新鲜蔬菜到手工珠宝的各种商品。','neutral',2,['urban','daily']],
['car boot sale','collocation','Transport and Urban Life','Speaking','后备箱集市','trunk sale event','We found some great bargains at the car boot sale on Sunday morning.','我们在周日早上的 car boot sale 淘到了一些便宜货。','neutral',2,['daily','community']],
['retirement home','collocation','Society and Government','Reading','养老院','old people residence','The number of retirement homes will need to increase as the population ages.','随着人口老龄化 retirement home 的数量将需要增加。','semi-formal',2,['society','elderly']],
['nursing home','collocation','Society and Government','Reading','护理院','care home','Her grandmother moved into a nursing home after she could no longer live independently.','她的祖母在无法独立生活后搬进了 nursing home。','semi-formal',2,['society','elderly']],
['orphanage','word','Society and Government','Reading','孤儿院','children home','The charity runs an orphanage that provides shelter and education for homeless children.','该慈善机构运营着一家 orphanage 为无家可归的儿童提供住所和教育。','formal',3,['society','children']],
['probation','word','Society and Government','Reading','缓刑','supervised release','The judge sentenced the offender to two years of probation instead of prison.','法官判处罪犯两年 probation 而不是监禁。','formal',4,['law','society']],
['jury duty','collocation','Society and Government','Listening','陪审义务','citizen court service','Citizens can be randomly selected for jury duty and must attend unless they have a valid excuse.','公民可能被随机选中参加 jury duty 除非有正当理由否则必须出席。','formal',3,['law','society']],
['court case','collocation','Society and Government','Reading','法庭案件','legal trial','The court case attracted widespread media attention and lasted over three months.','这起 court case 引起了媒体的广泛关注持续了三个多月。','semi-formal',3,['law','society']],
['fine print','collocation','Trend and Comparison','Speaking','小字条款','hidden details','Always read the fine print before signing any contract or agreement.','签署任何合同或协议前务必阅读 fine print。','neutral',2,['daily','legal']],
['get a refund','phrase','Trend and Comparison','Speaking','退款','get money back','The product was faulty so I took it back to the shop to get a refund.','产品有缺陷所以我把它拿回店里 get a refund。','neutral',1,['daily','business']],
['bargain','word','Trend and Comparison','Speaking','便宜货','good deal','I found a real bargain at the market a leather jacket for less than half price.','我在市场上找到了一个 real bargain 一件不到半价的皮夹克。','neutral',1,['daily','shopping']],
['discount','word','Trend and Comparison','Listening','折扣','price reduction','Students can get a 10 percent discount at most museums with a valid student card.','持有效学生卡的学生可以在大多数博物馆享受百分之十的 discount。','neutral',1,['daily','shopping']],
['voucher','word','Trend and Comparison','Listening','优惠券','discount coupon','I received a voucher for a free coffee when I signed up for the loyalty programme.','我注册会员时收到了一张免费咖啡的 voucher。','neutral',1,['daily','shopping']],
['loyalty card','collocation','Trend and Comparison','Listening','会员卡','reward card','The supermarket loyalty card gives you points every time you shop.','超市 loyalty card 每次购物都给你积分。','neutral',1,['daily','shopping']],
['interest rate','collocation','Trend and Comparison','Reading','利率','borrowing cost','The central bank raised interest rates to try to control rising inflation.','央行提高了 interest rate 试图控制不断上升的通货膨胀。','formal',3,['economy','finance']],
['exchange rate','collocation','Trend and Comparison','Listening','汇率','currency value','The exchange rate between the pound and the dollar has been very unstable lately.','英镑和美元之间的 exchange rate 最近非常不稳定。','semi-formal',3,['economy','finance']],
['current account','collocation','Trend and Comparison','Listening','活期账户','everyday bank account','I opened a current account with a different bank because the fees were lower.','我在另一家银行开了一个 current account 因为费用更低。','neutral',2,['finance','daily']],
['savings account','collocation','Trend and Comparison','Listening','储蓄账户','money-saving account','Putting money into a savings account each month is a good habit to develop.','每月把钱存入 savings account 是一个值得培养的好习惯。','neutral',1,['finance','daily']],

// ===== ADVANCED BATCH: IELTS 6.5-7.5 Academic Vocabulary (400+ terms) =====
['substantial','word','Trend and Comparison','Writing','大量的','large and significant','There has been a substantial increase in the number of overseas students over the past decade.','过去十年 overseas 学生数量出现了 substantial 增长。','formal',3,['academic','writing']],
['marginal','word','Trend and Comparison','Writing','轻微的','very small','The change was so marginal that it had almost no practical effect on the outcome.','这个变化如此 marginal 对结果几乎没有实际影响。','formal',4,['academic','writing']],
['widespread','word','Trend and Comparison','Writing','广泛的','existing everywhere','The widespread use of smartphones has transformed the way people access information.','smartphone 的 widespread 使用改变了人们获取信息的方式。','semi-formal',3,['academic','society']],
['underlying','word','Argument and Logic','Reading','潜在的','hidden beneath','The underlying causes of the conflict are far more complex than media reports suggest.','冲突的 underlying 原因远比媒体报道的复杂得多。','formal',4,['academic','analysis']],
['feasible','word','Argument and Logic','Writing','可行的','practical to do','Switching entirely to renewable energy within ten years may not be feasible for all countries.','十年内完全转向可再生能源对所有国家来说可能不 feasible。','formal',4,['academic','environment']],
['inevitable','word','Argument and Logic','Writing','不可避免的','certain to happen','Some degree of economic disruption is inevitable during the transition to green energy.','在向绿色能源转型的过程中一定程度的经济 disruption 是 inevitable 的。','formal',4,['academic','society']],
['controversial','word','Argument and Logic','Reading','有争议的','causing disagreement','The proposal to build a new airport has been highly controversial among local residents.','修建新机场的提议在当地居民中一直是 highly controversial 的。','semi-formal',3,['academic','society']],
['incentive','word','Society and Government','Writing','激励','something that motivates','Tax incentives can provide a powerful incentive for companies to invest in clean technology.','税收优惠可以为公司投资清洁技术提供强大的 incentive。','formal',3,['academic','economy']],
['constraint','word','Society and Government','Reading','限制','limitation or restriction','Budget constraints have forced the government to scale back several major infrastructure projects.','budget constraint 迫使政府缩减了几个主要基础设施项目。','formal',4,['academic','economy']],
['evidence-based','word','Argument and Logic','Reading','基于证据的','supported by proof','The report calls for evidence-based policy making rather than decisions driven by emotion.','该报告呼吁 evidence-based 的政策制定而不是由情绪驱动的决策。','formal',4,['academic','policy']],
['long-term consequence','collocation','Argument and Logic','Writing','长期后果','result far in the future','The long-term consequences of childhood obesity include a higher risk of diabetes and heart disease.','儿童肥胖的 long-term consequence 包括糖尿病和心脏病的更高风险。','formal',3,['academic','health']],
['put pressure on','phrase','Argument and Logic','Writing','施加压力','push or strain','The ageing population is putting pressure on healthcare systems across the developed world.','老龄化人口正在给发达世界的 healthcare system put pressure on。','semi-formal',2,['academic','society']],
['have far-reaching effects on','phrase','Argument and Logic','Writing','有深远影响','influence deeply','The introduction of the internet has had far-reaching effects on almost every aspect of modern life.','互联网的引入对现代生活的几乎每个方面都 have far-reaching effects on。','formal',3,['academic','technology']],
['be closely linked to','phrase','Argument and Logic','Writing','密切相关','strongly connected','Air pollution has been closely linked to a range of respiratory and cardiovascular diseases.','空气污染与一系列呼吸系统和心血管疾病 be closely linked to。','formal',3,['academic','health']],
['be unlikely to','phrase','Trend and Comparison','Writing','不太可能','probably will not','Current trends suggest that fossil fuel consumption is unlikely to decline in the near future.','当前趋势表明化石燃料消费在不久的将来 be unlikely to 下降。','semi-formal',2,['academic','environment']],

// Academic Verbs
['constitute','word','Trend and Comparison','Writing','构成','make up','Women now constitute nearly half of the workforce in most developed economies.','女性现在 constitute 大多数发达经济体中劳动力的近一半。','formal',4,['academic','writing']],
['facilitate','word','Argument and Logic','Writing','促进','make easier','The new platform is designed to facilitate communication between teachers and parents.','新平台旨在 facilitate 教师与家长之间的沟通。','formal',4,['academic','education']],
['diminish','word','Trend and Comparison','Reading','减少','become smaller','The effectiveness of the treatment diminished over time as the virus developed resistance.','随着病毒产生抗药性治疗的有效性随时间 diminish。','formal',4,['academic','science']],
['yield','word','Science and Research','Reading','产生','produce results','The experiment yielded some unexpected results that changed the direction of the research.','实验 yielded 一些意想不到的结果改变了研究方向。','academic',5,['academic','research']],
['undermine','word','Argument and Logic','Reading','削弱','weaken gradually','Spreading false information can undermine public trust in scientific institutions.','传播虚假信息会 undermine 公众对科学机构的信任。','formal',4,['academic','society']],
['exacerbate','word','Argument and Logic','Reading','加剧','make worse','Climate change is expected to exacerbate existing problems of water scarcity in many regions.','气候变化预计将 exacerbate 许多地区现有的水资源短缺问题。','academic',5,['academic','environment']],
['mitigate','word','Argument and Logic','Writing','缓解','make less severe','Planting more trees in urban areas can help mitigate the effects of air pollution.','在城市地区种植更多树木可以帮助 mitigate 空气污染的影响。','formal',5,['academic','environment']],
['alleviate','word','Society and Government','Reading','减轻','make suffering less','The new policy aims to alleviate poverty in rural communities through targeted investment.','新政策旨在通过有针对性的投资 alleviate 农村社区的贫困。','formal',5,['academic','society']],
['implement','word','Society and Government','Writing','实施','put into action','The government plans to implement stricter regulations on industrial waste disposal.','政府计划 implement 更严格的工业废物处理法规。','formal',3,['academic','government']],
['allocate','word','Society and Government','Writing','分配','give out','Schools must allocate their budgets carefully to meet the diverse needs of students.','学校必须谨慎 allocate 预算以满足学生的多样化需求。','formal',3,['academic','education']],
['deviate','word','Trend and Comparison','Reading','偏离','move away from norm','The actual results did not deviate significantly from what the researchers had predicted.','实际结果并未显著 deviate 研究人员预测的结果。','academic',5,['academic','research']],

// Task 2 High-Scoring Expressions
['it is of paramount importance that','sentence_pattern','Argument and Logic','Writing','至关重要的是','extremely important phrase','It is of paramount importance that governments invest in renewable energy to secure a sustainable future.','it is of paramount importance that 政府投资可再生能源以确保可持续的未来。','formal',4,['academic','writing']],
['a growing body of evidence suggests that','sentence_pattern','Argument and Logic','Writing','越来越多的证据表明','more evidence points to','A growing body of evidence suggests that regular exercise can significantly delay cognitive decline.','a growing body of evidence suggests that 定期锻炼可以显著延缓认知衰退。','academic',5,['academic','writing']],
['there is a growing consensus that','sentence_pattern','Argument and Logic','Writing','人们日益达成共识','more people agree','There is a growing consensus that climate change requires urgent and coordinated global action.','there is a growing consensus that 气候变化需要紧急和协调的全球行动。','formal',4,['academic','writing']],
['it can be argued that','sentence_pattern','Argument and Logic','Writing','可以争辩','one could say','It can be argued that technology has done more to connect people than to isolate them.','it can be argued that 技术在连接人们方面做得比孤立更多。','formal',3,['academic','writing']],
['a balanced approach is needed','sentence_pattern','Argument and Logic','Writing','需要平衡的方法','need a middle way','A balanced approach is needed to ensure economic growth does not come at the expense of the environment.','a balanced approach is needed 确保经济增长不以牺牲环境为代价。','formal',3,['academic','writing']],

// Task 1 Trend Expressions
['a twofold increase','phrase','Trend and Comparison','Writing','翻倍','doubled','The data shows a twofold increase in the number of electric vehicles sold between 2018 and 2023.','数据显示 2018 至 2023 年间电动汽车销量出现了 twofold increase。','formal',4,['academic','task1']],
['a threefold rise','phrase','Trend and Comparison','Writing','三倍','tripled','There was a threefold rise in online course enrolments during the first year of the pandemic.','疫情第一年 online course 注册出现了 threefold rise。','formal',4,['academic','task1']],
['remain fairly stable','phrase','Trend and Comparison','Writing','保持相当稳定','stay mostly unchanged','The figures for part-time employment remained fairly stable throughout the period.','兼职就业数据在整个时期内 remain fairly stable。','formal',3,['academic','task1']],
['experience a slight dip','phrase','Trend and Comparison','Writing','经历小幅下降','go down a little','Sales experienced a slight dip in the second quarter before recovering strongly in the third.','销售额在第二季度 experience a slight dip 然后在第三季度强劲恢复。','formal',3,['academic','task1']],
['followed by a sharp decline','phrase','Trend and Comparison','Writing','紧随急剧下降','then dropped fast','The peak was followed by a sharp decline in visitor numbers during the winter months.','峰值之后是冬季 visitor 数量的 sharp decline。','formal',3,['academic','task1']],

// Advanced Collocations
['adverse effect','collocation','Argument and Logic','Reading','不利影响','negative impact','The medication was withdrawn after reports of serious adverse effects on some patients.','在报告对部分患者有严重 adverse effect 后该药物被撤回。','formal',4,['academic','health']],
['causal link','collocation','Science and Research','Reading','因果关系','cause-and-effect connection','Researchers have found a clear causal link between smoking and various types of cancer.','研究人员已发现吸烟与多种癌症之间存在明确的 causal link。','academic',5,['academic','science']],
['place emphasis on','phrase','Argument and Logic','Reading','强调','give importance to','The new curriculum places greater emphasis on critical thinking and problem-solving skills.','新课程更 place emphasis on 批判性思维和解决问题的能力。','formal',4,['academic','education']],
['in the realm of','phrase','Argument and Logic','Reading','在……领域','in the area of','In the realm of public health prevention is always better than cure.','in the realm of 公共卫生预防总是胜于治疗。','formal',4,['academic','health']],
['in conjunction with','phrase','Argument and Logic','Reading','结合','together with','The study was conducted in conjunction with researchers from several leading universities.','该研究是 in conjunction with 几所领先大学的研究人员进行的。','academic',5,['academic','research']],
['derive from','phrase','Science and Research','Reading','源自','come from','Most of our modern medicines derive from compounds originally found in plants.','我们大多数现代药物 derive from 最初在植物中发现的化合物。','formal',4,['academic','science']],
['stem from','phrase','Argument and Logic','Reading','源于','originate from','Many social problems stem from a lack of educational opportunity in early childhood.','许多社会问题 stem from 幼儿期缺乏教育机会。','formal',4,['academic','society']],
['rest on the assumption that','phrase','Argument and Logic','Reading','基于假设','based on belief','The entire argument rests on the assumption that economic growth is always beneficial.','整个论点 rest on the assumption that 经济增长总是有益的。','academic',5,['academic','argument']],

// High-Value Abstract Nouns
['social mobility','collocation','Society and Government','Reading','社会流动性','people moving between classes','Education is widely regarded as the most powerful driver of social mobility.','教育被广泛认为是 social mobility 最强大的驱动力。','formal',4,['academic','society']],
['public expenditure','collocation','Society and Government','Writing','公共支出','government spending','Public expenditure on healthcare has risen sharply as the population continues to age.','随着人口持续老龄化 healthcare 方面的 public expenditure 急剧上升。','formal',4,['academic','government']],
['environmental degradation','collocation','Environment and Energy','Reading','环境退化','nature getting worse','Environmental degradation in the region has been driven by rapid industrialisation and deforestation.','该地区的 environmental degradation 是由快速工业化和森林砍伐驱动的。','formal',4,['academic','environment']],
['technological advancement','collocation','Technology and Media','Reading','技术进步','tech progress','Technological advancement in medicine has dramatically improved survival rates for many diseases.','医学领域的 technological advancement 已大幅提高许多疾病的生存率。','formal',3,['academic','technology']],
['a growing concern','collocation','Argument and Logic','Writing','日益增长的担忧','increasing worry','The impact of screen time on children is a growing concern among parents and educators.','屏幕时间对儿童的影响是家长和教育工作者中 a growing concern。','semi-formal',3,['academic','society']],
['strategic approach','collocation','Argument and Logic','Writing','战略方法','planned way','Solving climate change requires a strategic approach rather than piecemeal solutions.','解决气候变化需要 strategic approach 而不是零碎的解决方案。','formal',4,['academic','environment']],
['the vast majority of','collocation','Trend and Comparison','Writing','绝大多数','almost all','The vast majority of respondents reported being satisfied with the new public transport system.','the vast majority of 受访者表示对新的公共交通系统感到满意。','formal',3,['academic','writing']],

// Contextual Phrases for IELTS Topics
['social cohesion','collocation','Society and Government','Reading','社会凝聚力','community togetherness','Shared public spaces play an important role in maintaining social cohesion in diverse communities.','共享的公共空间在维持多元化社区的 social cohesion 中发挥重要作用。','formal',4,['academic','society']],
['cultural diversity','collocation','Society and Government','Reading','文化多样性','variety of cultures','Cities with high cultural diversity tend to be more innovative and economically dynamic.','cultural diversity 高的城市往往更具创新性和经济活力。','semi-formal',3,['academic','society']],
['upward mobility','collocation','Trend and Comparison','Reading','向上流动','moving to higher class','Access to quality education is the main pathway to upward mobility for disadvantaged families.','获得优质教育是弱势家庭实现 upward mobility 的主要途径。','formal',4,['academic','society']],

// BATCH 2: More advanced terms
['income disparity','collocation','Trend and Comparison','Reading','收入差距','earnings gap','Income disparity between the richest and poorest has widened in most industrialised nations.','大多数工业化国家中最富和最穷之间的 income disparity 已经扩大。','formal',4,['academic','economy']],
['wealth distribution','collocation','Trend and Comparison','Reading','财富分配','how wealth is shared','Wealth distribution in the country is highly uneven with the top one percent owning nearly half of all assets.','该国的 wealth distribution 极不均衡最富有的百分之一拥有近一半的资产。','formal',4,['academic','economy']],
['job security','collocation','Society and Government','Reading','工作保障','employment stability','The rise of the gig economy has reduced job security for millions of workers worldwide.','零工经济的兴起降低了全球数百万工人的 job security。','semi-formal',3,['academic','employment']],
['standard of living','collocation','Trend and Comparison','Writing','生活水平','quality of life','The standard of living has improved for most people but the gap between rich and poor persists.','大多数人的 standard of living 已改善但贫富差距仍然存在。','semi-formal',3,['academic','society']],
['economic prosperity','collocation','Trend and Comparison','Writing','经济繁荣','financial success','Economic prosperity does not automatically lead to greater happiness among the population.','economic prosperity 并不会自动带来人民更大的幸福感。','formal',4,['academic','economy']],
['in the midst of','phrase','Trend and Comparison','Reading','处于……之中','in the middle of','The country is in the midst of a demographic shift that will reshape its economy for decades.','该国 in the midst of 一场人口结构转变这将重塑其经济数十年。','formal',4,['academic','society']],

// Environment & Energy advanced
['environmental sustainability','collocation','Environment and Energy','Writing','环境可持续性','eco-friendly long-term','Environmental sustainability should be at the heart of all urban planning decisions.','environmental sustainability 应成为所有城市规划决策的核心。','formal',4,['academic','environment']],
['ecological balance','collocation','Environment and Energy','Reading','生态平衡','nature harmony','The loss of a single species can disrupt the ecological balance of an entire region.','单一物种的丧失可能扰乱整个地区的 ecological balance。','academic',5,['academic','environment']],
['carbon-intensive','word','Environment and Energy','Reading','高碳排放的','heavy emitters','Carbon-intensive industries face increasing pressure to transition to cleaner production methods.','carbon-intensive 行业面临越来越大的压力转向更清洁的生产方式。','formal',4,['academic','environment']],
['climate resilience','collocation','Environment and Energy','Reading','气候韧性','ability to handle climate change','Building climate resilience into infrastructure projects is now a priority for coastal cities.','将 climate resilience 纳入基础设施项目现在是沿海城市的优先事项。','formal',5,['academic','environment']],
['depletion','word','Environment and Energy','Reading','耗尽','using up completely','The depletion of natural resources poses a serious threat to future economic growth.','自然资源的 depletion 对未来经济增长构成严重威胁。','academic',5,['academic','environment']],

// Health & Psychology advanced
['cognitive decline','collocation','Health and Lifestyle','Reading','认知衰退','brain getting weaker','Studies suggest that regular social interaction can slow cognitive decline in older adults.','研究表明定期社交互动可以延缓老年人的 cognitive decline。','academic',5,['academic','health']],
['mental resilience','collocation','Health and Lifestyle','Reading','心理韧性','ability to bounce back','Building mental resilience is essential for coping with the pressures of modern life.','建立 mental resilience 对于应对现代生活的压力至关重要。','semi-formal',4,['academic','health']],
['chronic condition','collocation','Health and Lifestyle','Reading','慢性病','long-lasting illness','Managing a chronic condition requires ongoing medical care and lifestyle adjustments.','管理 chronic condition 需要持续的医疗护理和生活方式调整。','formal',3,['academic','health']],
['psychological wellbeing','collocation','Health and Lifestyle','Writing','心理健康','mental health','Employers are increasingly aware of the link between productivity and psychological wellbeing.','雇主越来越意识到生产力与 psychological wellbeing 之间的联系。','formal',4,['academic','health']],
['sedentary behaviour','collocation','Health and Lifestyle','Reading','久坐行为','sitting too much','Sedentary behaviour has been described as the new smoking due to its impact on public health.','sedentary behaviour 因其对公共健康的影响被称为新型吸烟。','formal',4,['academic','health']],

// Education advanced
['standardised test','collocation','Education','Reading','标准化测试','uniform exam','Critics argue that standardised tests do not capture creativity or critical thinking.','批评者认为 standardized test 无法衡量创造力或批判性思维。','formal',4,['academic','education']],
['curriculum reform','collocation','Education','Reading','课程改革','study plan change','Curriculum reform is needed to ensure students learn skills relevant to the modern workplace.','需要进行 curriculum reform 确保学生学习与现代职场相关的技能。','formal',4,['academic','education']],
['higher education','collocation','Education','Reading','高等教育','university-level study','Access to higher education should be based on ability not on family income.','获得 higher education 的机会应基于能力而非家庭收入。','formal',3,['academic','education']],
['early intervention','collocation','Education','Reading','早期干预','acting early','Early intervention programmes for children with learning difficulties have shown remarkable results.','针对有学习困难的儿童的 early intervention 项目已显示出显著效果。','formal',4,['academic','education']],
['mixed-ability class','collocation','Education','Speaking','混合能力班级','class with varied levels','Teaching a mixed-ability class can be challenging but also rewarding for experienced teachers.','教一个 mixed-ability class 对经验丰富的教师来说既具挑战性又有回报。','semi-formal',3,['academic','education']],

// Technology advanced
['digital transformation','collocation','Technology and Media','Reading','数字化转型','tech-based change','The digital transformation of traditional industries is creating both opportunities and challenges.','传统行业的 digital transformation 正在创造机遇和挑战。','formal',4,['academic','technology']],
['algorithm bias','collocation','Technology and Media','Reading','算法偏见','unfair computer rules','Algorithm bias in recruitment tools can lead to discrimination against certain demographic groups.','招聘工具中的 algorithm bias 可能导致对某些人口群体的歧视。','formal',5,['academic','technology']],
['automation anxiety','collocation','Technology and Media','Reading','自动化焦虑','fear of machines replacing jobs','Automation anxiety is widespread among workers in manufacturing and administrative roles.','automation anxiety 在制造业和行政岗位的工人中普遍存在。','semi-formal',4,['academic','technology']],
['data protection law','collocation','Technology and Media','Reading','数据保护法','privacy regulation','Data protection laws have been strengthened in many countries following high-profile breaches.','在高调泄密事件后许多国家加强了 data protection law。','formal',4,['academic','law']],
['emerging technology','collocation','Technology and Media','Reading','新兴技术','new tech field','Governments must strike a balance between regulating emerging technologies and encouraging innovation.','政府必须在监管 emerging technology 和鼓励创新之间找到平衡。','formal',4,['academic','technology']],

// Transport & Urban advanced
['urban congestion','collocation','Transport and Urban Life','Reading','城市拥堵','city traffic jams','Urban congestion costs the global economy hundreds of billions of dollars each year.','urban congestion 每年使全球经济损失数千亿美元。','formal',4,['academic','transport']],
['commuter belt','collocation','Transport and Urban Life','Reading','通勤带','suburbs for workers','Property prices in the commuter belt have risen sharply as more people move out of city centres.','随着更多人迁出市中心 commuter belt 的房价急剧上涨。','formal',4,['academic','urban']],
['public infrastructure','collocation','Transport and Urban Life','Writing','公共基础设施','shared facilities','Decades of underinvestment have left public infrastructure in urgent need of repair.','数十年的投资不足使 public infrastructure 急需维修。','formal',4,['academic','government']],
['sustainable urban planning','collocation','Transport and Urban Life','Writing','可持续城市规划','green city design','Sustainable urban planning must prioritise green spaces and efficient public transport.','sustainable urban planning 必须优先考虑绿地和高效的公共交通。','formal',4,['academic','environment']],

// Tourism advanced
['overtourism','word','Tourism and Accommodation','Reading','过度旅游','too many tourists','Overtourism has become a serious problem for popular destinations like Venice and Barcelona.','overtourism 已成为威尼斯和巴塞罗那等热门目的地的严重问题。','formal',5,['academic','tourism']],
['sustainable tourism','collocation','Tourism and Accommodation','Reading','可持续旅游','eco-friendly travel','Sustainable tourism aims to protect local cultures while providing economic benefits to communities.','sustainable tourism 旨在保护当地文化同时为社区提供经济利益。','formal',4,['academic','tourism']],
['heritage site','collocation','Tourism and Accommodation','Reading','遗产地','historical place','The ancient temple was designated a UNESCO heritage site in 1985.','这座古庙于 1985 年被指定为 UNESCO heritage site。','formal',3,['academic','culture']],

// Science & Research advanced
['peer-reviewed study','collocation','Science and Research','Reading','同行评审研究','expert-checked research','A recent peer-reviewed study challenges the long-held assumption about the causes of obesity.','最近一项 peer-reviewed study 挑战了关于肥胖原因的长期假设。','academic',5,['academic','research']],
['clinical evidence','collocation','Science and Research','Reading','临床证据','medical proof','The treatment was approved after clinical evidence showed it was both safe and effective.','在 clinical evidence 显示其安全有效后该治疗方法获得批准。','academic',5,['academic','medicine']],
['breakthrough discovery','collocation','Science and Research','Writing','突破性发现','major new finding','The breakthrough discovery could lead to new treatments for previously incurable conditions.','这一 breakthrough discovery 可能为以前无法治愈的疾病带来新的治疗方法。','formal',4,['academic','science']],
['ethical consideration','collocation','Science and Research','Reading','伦理考量','moral concern','The use of artificial intelligence in healthcare raises important ethical considerations.','在医疗中使用人工智能引发了重要的 ethical consideration。','academic',5,['academic','ethics']],
['scientific rigour','collocation','Science and Research','Reading','科学严谨性','strict methodology','The study was praised for its scientific rigour and large sample size.','该研究因其 scientific rigour 和大样本量而受到赞扬。','academic',5,['academic','research']],

// High-Value Argument Expressions
['it is imperative that','sentence_pattern','Argument and Logic','Writing','当务之急是','it is vital that','It is imperative that governments take immediate action to reduce carbon emissions.','it is imperative that 各国政府立即采取行动减少碳排放。','formal',4,['academic','writing']],
['the merits outweigh the drawbacks','sentence_pattern','Argument and Logic','Writing','利大于弊','benefits beat problems','In the case of renewable energy the merits clearly outweigh the drawbacks despite the initial costs.','就可再生能源而言尽管有初始成本 the merits outweigh the drawbacks。','formal',4,['academic','writing']],
['a double-edged sword','phrase','Argument and Logic','Writing','双刃剑','both good and bad','Globalisation has been a double-edged sword bringing growth but also widening inequality.','全球化一直是一把 double-edged sword 带来了增长但也扩大了不平等。','semi-formal',3,['academic','society']],
['the flip side of the coin','phrase','Argument and Logic','Speaking','另一方面','the other perspective','The flip side of the coin is that working from home can lead to feelings of isolation.','the flip side of the coin 是在家工作可能导致孤独感。','neutral',3,['academic','discussion']],
['it is shortsighted to','sentence_pattern','Argument and Logic','Writing','……是短视的','it lacks foresight','It is shortsighted to focus only on economic growth without considering environmental costs.','只关注经济增长而不考虑环境代价 it is shortsighted to。','formal',4,['academic','writing']],
['lend weight to the argument','phrase','Argument and Logic','Writing','支持论点','support the point','Recent studies lend weight to the argument that early education yields the highest returns.','最近的研究 lend weight to the argument 早期教育带来的回报最高。','formal',5,['academic','writing']],

// BATCH 4: More terms for 500-800
['proponent','word','Argument and Logic','Reading','支持者','supporter','Proponents of renewable energy argue that the long-term savings outweigh the upfront costs.','renewable energy 的 proponent 认为长期节省超过了前期成本。','formal',4,['academic','society']],
['opponent','word','Argument and Logic','Reading','反对者','person against','Opponents of the proposal claim it would cause more harm than good to local communities.','该提案的 opponent 声称它会对当地社区造成更多伤害而不是好处。','formal',4,['academic','society']],
['disposable income','collocation','Trend and Comparison','Reading','可支配收入','spare money','As disposable income rises people tend to spend more on leisure and travel.','随着 disposable income 增加人们往往在休闲和旅游上花费更多。','formal',3,['academic','economy']],
['fiscal policy','collocation','Society and Government','Reading','财政政策','government spending rules','Fiscal policy plays a crucial role in managing economic downturns and stimulating growth.','fiscal policy 在管理经济衰退和刺激增长方面发挥着关键作用。','formal',5,['academic','economy']],
['monetary policy','collocation','Society and Government','Reading','货币政策','money supply control','The central bank uses monetary policy to control inflation and maintain currency stability.','央行使用 monetary policy 来控制通货膨胀和维持货币稳定。','formal',5,['academic','economy']],
['trade deficit','collocation','Trend and Comparison','Reading','贸易逆差','importing more than exporting','The country has been running a trade deficit for the past five consecutive years.','该国已经连续五年出现 trade deficit。','formal',4,['academic','economy']],
['trade surplus','collocation','Trend and Comparison','Reading','贸易顺差','exporting more than importing','China has maintained a significant trade surplus with most Western nations for decades.','中国数十年来一直对大多数西方国家保持显著的 trade surplus。','formal',4,['academic','economy']],
['economic downturn','collocation','Trend and Comparison','Reading','经济衰退','economic decline','During an economic downturn governments often increase public spending to stimulate recovery.','在 economic downturn 期间政府通常增加公共支出以刺激复苏。','formal',3,['academic','economy']],
['sovereign debt','collocation','Trend and Comparison','Reading','主权债务','government borrowing','High sovereign debt can limit a government ability to respond to economic crises.','高 sovereign debt 会限制政府应对经济危机的能力。','formal',5,['academic','economy']],
['foreign direct investment','collocation','Trend and Comparison','Reading','外商直接投资','overseas business money','Foreign direct investment in developing countries has been a key driver of economic growth.','发展中国家的 foreign direct investment 一直是经济增长的关键驱动力。','formal',4,['academic','economy']],

// More argument vocab
['a mixed blessing','phrase','Argument and Logic','Speaking','好坏参半','both good and bad','The internet has been a mixed blessing for modern society connecting people but also spreading misinformation.','互联网对现代社会一直是 a mixed blessing 连接了人们但也传播了错误信息。','neutral',3,['academic','discussion']],
['profound effect','collocation','Argument and Logic','Writing','深远影响','deep impact','The invention of the printing press had a profound effect on the spread of knowledge.','印刷术的发明对知识的传播产生了 profound effect。','formal',4,['academic','history']],
['underestimate','word','Trend and Comparison','Writing','低估','guess too low','People often underestimate how much time a complex project will actually take.','人们常常 underestimate 一个复杂项目实际需要的时间。','semi-formal',3,['academic','writing']],
['overestimate','word','Trend and Comparison','Writing','高估','guess too high','We tend to overestimate what we can achieve in a day and underestimate what we can achieve in a year.','我们往往 overestimate 一天能完成的事而 underestimate 一年能完成的事。','semi-formal',3,['academic','psychology']],
['considerable','word','Trend and Comparison','Writing','相当大的','quite large','A considerable amount of research has been conducted on the effects of screen time on children.','关于屏幕时间对儿童的影响已经进行了 considerable 量的研究。','formal',3,['academic','writing']],

// Environment advanced more
['carbon neutral','phrase','Environment and Energy','Reading','碳中和','balanced emissions','Several major corporations have pledged to become carbon neutral by the year 2030.','几家大型企业已承诺到 2030 年实现 carbon neutral。','formal',4,['academic','environment']],
['emission trading','collocation','Environment and Energy','Reading','排放交易','carbon market','Emission trading schemes create financial incentives for companies to reduce pollution.','emission trading 计划为减少污染的公司创造了财务 incentive。','formal',5,['academic','environment']],
['renewable infrastructure','collocation','Environment and Energy','Reading','可再生能源基础设施','green energy systems','Massive investment in renewable infrastructure is needed to meet international climate targets.','需要大规模投资 renewable infrastructure 以满足国际气候目标。','formal',4,['academic','environment']],

// Health advanced more
['life expectancy','collocation','Health and Lifestyle','Reading','预期寿命','average lifespan','Life expectancy in the country has risen by over ten years since the 1960s.','自 1960 年代以来该国的 life expectancy 已提高了十多年。','formal',3,['academic','health']],
['genetic predisposition','collocation','Health and Lifestyle','Reading','遗传倾向','inherited tendency','Some people have a genetic predisposition to certain types of cancer.','有些人对某些类型的癌症有 genetic predisposition。','academic',5,['academic','science']],
['holistic approach','collocation','Health and Lifestyle','Writing','整体方法','full-picture method','A holistic approach to health considers physical mental and social factors together.','holistic approach 于健康将身体心理和社会因素一并考虑。','semi-formal',4,['academic','health']],
['maternal health','collocation','Health and Lifestyle','Reading','孕产妇健康','mother health','Improving maternal health in developing countries remains a top priority for international aid.','改善发展中国家的 maternal health 仍然是国际援助的首要任务。','formal',4,['academic','health']],

// Education advanced more
['university admission','collocation','Education','Reading','大学录取','college entry','University admission policies have been revised to attract a more diverse student body.','university admission 政策已修改以吸引更多样化的学生群体。','formal',3,['academic','education']],
['vocational education','collocation','Education','Reading','职业教育','job training','Vocational education provides an alternative pathway for students who prefer practical learning.','vocational education 为喜欢实践学习的学生提供了另一条途径。','formal',3,['academic','education']],
['critical analysis','collocation','Education','Reading','批判性分析','deep examination','The course teaches students how to conduct a critical analysis of academic texts.','该课程教学生如何对学术文本进行 critical analysis。','academic',5,['academic','education']],

// Technology advanced more
['artificial intelligence','collocation','Technology and Media','Reading','人工智能','smart machines','Artificial intelligence is already being used to diagnose diseases and personalise learning.','artificial intelligence 已经被用于诊断疾病和个性化学习。','formal',3,['academic','technology']],
['digital economy','collocation','Technology and Media','Reading','数字经济','internet-based business','The digital economy now accounts for a growing share of global economic activity.','digital economy 现在在全球经济活动中占有越来越大的份额。','formal',3,['academic','economy']],
['cyber threat','collocation','Technology and Media','Reading','网络威胁','online security risk','Cyber threats have become one of the most serious national security challenges facing governments.','cyber threat 已成为政府面临的最严重的国家安全挑战之一。','formal',4,['academic','security']],

// More high-value words
['diminishing returns','collocation','Trend and Comparison','Reading','边际收益递减','getting less benefit','There are diminishing returns to working more than about 50 hours per week.','每周工作超过约 50 小时就有 diminishing returns。','formal',5,['academic','economics']],
['tipping point','collocation','Environment and Energy','Reading','临界点','point of no return','Scientists warn that we may be approaching a tipping point in global climate change.','科学家警告我们可能正在接近全球气候变化的 tipping point。','formal',4,['academic','environment']],
['ripple effect','collocation','Trend and Comparison','Reading','连锁反应','spreading impact','The closure of the factory had a ripple effect on the entire local economy.','工厂的关闭对整个当地经济产生了 ripple effect。','semi-formal',3,['academic','economy']],
['catalyst','word','Argument and Logic','Reading','催化剂','change trigger','The pandemic acted as a catalyst for the widespread adoption of remote working.','疫情充当了远程工作广泛采用的 catalyst。','formal',4,['academic','society']],
['momentum','word','Trend and Comparison','Reading','势头','force of movement','The campaign to reduce plastic waste has gained significant momentum in recent years.','减少塑料垃圾的运动近年来 gained significant momentum。','semi-formal',3,['academic','environment']],
['paradigm shift','collocation','Argument and Logic','Reading','范式转变','fundamental change','The move from fossil fuels to renewables represents a paradigm shift in global energy policy.','从化石燃料转向可再生能源代表了全球能源政策的 paradigm shift。','academic',5,['academic','society']],
['status quo','phrase','Argument and Logic','Reading','现状','current situation','Those who benefit from the status quo often resist changes that might threaten their position.','受益于 status quo 的人通常会抵制可能威胁其地位的改变。','formal',5,['academic','society']],
['groundbreaking','word','Science and Research','Reading','开创性的','very new and important','The groundbreaking research could change the way we treat certain types of cancer.','这项 groundbreaking 研究可能改变我们治疗某些类型癌症的方式。','formal',4,['academic','science']],

// BATCH 5
['waterborne disease','collocation','Health and Lifestyle','Reading','水传播疾病','illness from dirty water','Waterborne diseases remain a leading cause of death in parts of the world without clean water access.','在没有清洁用水的地区 waterborne disease 仍然是主要的死亡原因。','formal',4,['academic','health']],
['airborne','word','Health and Lifestyle','Reading','空气传播的','spread through air','The airborne virus spread rapidly through the crowded office building.','airborne 病毒在拥挤的办公楼内迅速传播。','formal',4,['academic','health']],
['contagious','word','Health and Lifestyle','Reading','传染性的','easily spread','The disease is highly contagious and can spread before symptoms even appear.','这种疾病 highly contagious 甚至可以在症状出现之前传播。','formal',3,['academic','health']],
['outbreak','word','Health and Lifestyle','Reading','爆发','sudden start','The recent outbreak of measles was linked to a decline in vaccination rates.','最近的 measles outbreak 与疫苗接种率下降有关。','formal',3,['academic','health']],
['immunisation','word','Health and Lifestyle','Reading','免疫接种','vaccination','Childhood immunisation programmes have saved millions of lives over the past century.','儿童 immunisation 项目在过去一个世纪挽救了数百万人的生命。','formal',3,['academic','health']],
['quarantine','word','Health and Lifestyle','Reading','隔离','isolation for health','Travellers arriving from affected areas were placed in quarantine for two weeks.','来自疫区的旅客被 quarantine 两周。','formal',4,['academic','health']],
['pandemic preparedness','collocation','Health and Lifestyle','Reading','大流行病防范','ready for global disease','The pandemic revealed serious gaps in pandemic preparedness across most countries.','大流行病揭示了大多数国家在 pandemic preparedness 方面的严重不足。','formal',5,['academic','health']],

// Global issues
['food insecurity','collocation','Society and Government','Reading','粮食不安全','not enough food access','Food insecurity affects nearly one in ten people globally despite record harvests.','尽管粮食产量创纪录但全球近十分之一的人仍面临 food insecurity。','formal',4,['academic','global']],
['humanitarian aid','collocation','Society and Government','Reading','人道主义援助','emergency help','Humanitarian aid was delivered to the region after the devastating earthquake.','毁灭性地震后 humanitarian aid 被运送到该地区。','formal',3,['academic','global']],
['displaced person','collocation','Society and Government','Reading','流离失所者','forced to leave home','The conflict has created millions of displaced persons seeking shelter in neighbouring countries.','冲突造成了数百万 displaced person 在邻国寻求庇护。','formal',4,['academic','global']],
['refugee camp','collocation','Society and Government','Reading','难民营','temporary shelter','Conditions in the refugee camp deteriorated as winter approached and supplies ran low.','随着冬季临近和物资耗尽 refugee camp 的条件恶化。','formal',3,['academic','global']],
['economic sanction','collocation','Society and Government','Reading','经济制裁','trade punishment','Economic sanctions have had limited success in changing the behaviour of the targeted regime.','economic sanction 在改变目标政权行为方面取得了有限成功。','formal',5,['academic','politics']],
['bilateral agreement','collocation','Society and Government','Reading','双边协议','two-country deal','The two nations signed a bilateral agreement to cooperate on climate change research.','两国签署了一项 bilateral agreement 在气候变化研究方面进行合作。','formal',4,['academic','politics']],
['diplomatic relation','collocation','Society and Government','Reading','外交关系','official country ties','The two countries restored diplomatic relations after a decade of tension.','经过十年的紧张局势两国恢复了 diplomatic relation。','formal',4,['academic','politics']],

// Arts & Culture
['cultural identity','collocation','Society and Government','Reading','文化认同','sense of belonging','Language plays a central role in preserving cultural identity among minority communities.','语言在维护少数族裔社区的 cultural identity 中发挥核心作用。','formal',4,['academic','culture']],
['heritage preservation','collocation','Society and Government','Reading','遗产保护','saving historical sites','Heritage preservation is not just about buildings but also about traditions and ways of life.','heritage preservation 不仅关乎建筑也关乎传统和生活方式。','formal',4,['academic','culture']],
['artistic expression','collocation','Society and Government','Reading','艺术表达','creative output','Public funding for the arts ensures that artistic expression is not limited to the wealthy.','对艺术的公共资助确保 artistic expression 不限于富人。','formal',4,['academic','culture']],
['multicultural society','collocation','Society and Government','Reading','多元文化社会','diverse community','Living in a multicultural society exposes people to different perspectives and ways of thinking.','生活在 multicultural society 中让人们接触到不同的视角和思维方式。','semi-formal',3,['academic','culture']],

// Crime & Law
['rehabilitation programme','collocation','Society and Government','Reading','改造项目','reform programme','Rehabilitation programmes in prisons have been shown to reduce reoffending rates.','监狱中的 rehabilitation programme 已被证明可以降低再犯率。','formal',4,['academic','law']],
['reoffending rate','collocation','Society and Government','Reading','再犯率','repeat crime rate','The reoffending rate among prisoners who received education was significantly lower.','接受教育的囚犯的 reoffending rate 显著降低。','formal',4,['academic','law']],
['community service','collocation','Society and Government','Reading','社区服务','unpaid work as punishment','The judge sentenced the offender to 200 hours of community service instead of prison.','法官判处罪犯 200 小时 community service 而不是监禁。','semi-formal',2,['academic','law']],
['deterrent effect','collocation','Society and Government','Reading','威慑作用','fear-based prevention','There is little evidence that harsh punishments have a significant deterrent effect on crime.','几乎没有证据表明严厉的惩罚对犯罪有显著的 deterrent effect。','formal',5,['academic','law']],

// More advanced collocations
['pose a significant threat','phrase','Argument and Logic','Writing','构成重大威胁','be a big danger','Rising sea levels pose a significant threat to low-lying coastal areas worldwide.','海平面上升 pose a significant threat to 全球低洼沿海地区。','formal',3,['academic','environment']],
['raise awareness of','phrase','Argument and Logic','Writing','提高意识','make people know about','Celebrity campaigns have helped raise awareness of the importance of mental health.','名人活动帮助 raise awareness of 心理健康的重要性。','semi-formal',2,['academic','society']],
['take proactive steps','phrase','Argument and Logic','Writing','采取主动措施','act before problems happen','Employers should take proactive steps to prevent burnout rather than just treating it.','雇主应 take proactive steps 预防 burnout 而不仅仅是治疗。','formal',3,['academic','workplace']],
['at the expense of','phrase','Argument and Logic','Writing','以……为代价','sacrificing','Economic growth should not come at the expense of environmental protection.','经济增长不应 at the expense of 环境保护。','formal',3,['academic','writing']],
['in the face of','phrase','Argument and Logic','Reading','面对','when confronted with','In the face of mounting evidence the government finally agreed to change its policy.','in the face of 越来越多的证据政府最终同意改变其政策。','formal',3,['academic','writing']],

// Task 1 advanced
['remain constant','phrase','Trend and Comparison','Writing','保持不变','stay the same','The proportion of people using public transport remained constant throughout the decade.','使用公共交通人口的比例在整个十年中 remain constant。','formal',3,['academic','task1']],
['peak at','phrase','Trend and Comparison','Writing','达到最高','reach the top at','The number of visitors peaked at over 2 million in the summer of 2019.','游客数量在 2019 年夏季 peak at 超过 200 万。','formal',3,['academic','task1']],
['bottom out','phrase','Trend and Comparison','Writing','触底','reach the lowest','The unemployment rate bottomed out at 3 percent before beginning to rise again.','失业率在百分之三 bottom out 然后开始再次上升。','formal',4,['academic','task1']],
['outnumber','word','Trend and Comparison','Writing','在数量上超过','be more than','Female students now outnumber male students in most university programmes.','在大多数大学项目中 female students 现在 outnumber male students。','formal',3,['academic','education']],
['surpass','word','Trend and Comparison','Writing','超越','go beyond','Online sales have surpassed in-store purchases for the first time in retail history.','online sales 在零售历史上首次 surpass in-store purchases。','formal',3,['academic','business']],

// BATCH 6
['prerequisite','word','Education','Reading','先决条件','required beforehand','A basic understanding of statistics is a prerequisite for the advanced research methods course.','对统计学的基本了解是高级研究方法课程的 prerequisite。','academic',5,['academic','education']],
['discipline','word','Education','Reading','学科','field of study','The university offers programmes in disciplines ranging from engineering to philosophy.','该大学提供从工程学到哲学等 discipline 的课程。','formal',3,['academic','education']],
['tenure','word','Education','Reading','终身教职','permanent academic post','After years of research and teaching she was finally granted tenure at the university.','经过多年的研究和教学她终于获得了大学的 tenure。','academic',5,['academic','education']],
['extracurricular activity','collocation','Education','Speaking','课外活动','after-school activity','Extracurricular activities like debate clubs can significantly boost a university application.','辩论俱乐部等 extracurricular activity 可以显著提升大学申请。','semi-formal',2,['academic','education']],
['self-discipline','word','Education','Speaking','自律','self-control','Success in online learning requires a high degree of self-discipline and time management.','在线学习的成功需要高度的 self-discipline 和时间管理。','semi-formal',3,['academic','education']],

['adopt a lifestyle','phrase','Health and Lifestyle','Writing','采用生活方式','choose a way of living','More people are adopting a plant-based lifestyle for both health and environmental reasons.','出于健康和环境原因越来越多的人 adopt a plant-based lifestyle。','semi-formal',2,['academic','health']],
['moderation','word','Health and Lifestyle','Speaking','适度','not too much','Eating in moderation is more sustainable than following extreme diets that are hard to maintain.','moderation 饮食比遵循难以维持的极端饮食更可持续。','semi-formal',2,['academic','health']],
['therapeutic','word','Health and Lifestyle','Reading','有疗效的','healing','Many people find gardening to be therapeutic after a stressful day at work.','许多人在紧张工作一天后发现 gardening 是 therapeutic 的。','formal',4,['academic','health']],
['restorative','word','Health and Lifestyle','Reading','恢复性的','helping recovery','Spending time in nature has a restorative effect on mental focus and emotional wellbeing.','在大自然中度过的时间对精神集中和情绪 wellbeing 有 restorative 效果。','formal',5,['academic','psychology']],

['urbanisation','word','Transport and Urban Life','Reading','城市化','becoming more urban','Rapid urbanisation in developing nations has outpaced the construction of basic infrastructure.','发展中国家的 rapid urbanisation 超出了基本基础设施的建设速度。','formal',4,['academic','society']],
['mega-city','word','Transport and Urban Life','Reading','超大城市','very large city','Mega-cities with over ten million inhabitants face unique challenges in housing and transport.','拥有超过一千万居民的 mega-city 在住房和交通方面面临独特挑战。','semi-formal',3,['academic','urban']],
['high-rise building','collocation','Transport and Urban Life','Reading','高层建筑','tall building','High-rise buildings have transformed the skylines of cities across Asia and the Middle East.','high-rise building 改变了亚洲和中东城市的天际线。','neutral',2,['academic','urban']],
['urban renewal','collocation','Transport and Urban Life','Reading','城市更新','city improvement','The urban renewal project turned a neglected industrial area into a vibrant cultural district.','urban renewal 项目将一个被忽视的工业区变成了充满活力的文化区。','formal',4,['academic','urban']],

['gap year','phrase','Tourism and Accommodation','Speaking','间隔年','year off','Taking a gap year before university gave me a clearer sense of what I wanted to study.','上大学前 take a gap year 让我更清楚自己想学什么。','neutral',2,['academic','education']],
['solo travel','collocation','Tourism and Accommodation','Speaking','独自旅行','travelling alone','Solo travel has grown in popularity especially among young women seeking independence.','solo travel 越来越受欢迎尤其是在追求独立的年轻女性中。','neutral',2,['academic','tourism']],
['couchsurfing','word','Tourism and Accommodation','Speaking','沙发客','staying on people sofas','Couchsurfing allows travellers to stay with locals for free and experience authentic culture.','couchsurfing 让旅行者免费住在当地人家中体验真实的当地 culture。','neutral',2,['academic','tourism']],
['home stay','collocation','Tourism and Accommodation','Listening','寄宿家庭','live with local family','The language school arranged a home stay with a local family so I could practise speaking every day.','语言学校安排了一个 home stay 让我每天都能练习口语。','neutral',2,['academic','tourism']],

['peer assessment','collocation','Education','Reading','同伴评估','classmates marking','Peer assessment helps students develop critical thinking by evaluating each other work.','peer assessment 通过互相评估帮助培养学生 critical thinking 能力。','formal',4,['academic','education']],
['formative assessment','collocation','Education','Reading','形成性评估','ongoing evaluation','Formative assessment provides feedback during the learning process rather than just at the end.','formative assessment 在学习过程中提供反馈而不仅仅是在结束时。','academic',5,['academic','education']],
['feedback loop','collocation','Education','Reading','反馈循环','cycle of response','An effective feedback loop between teachers and students improves the quality of learning.','教师和学生之间有效的 feedback loop 提高了学习质量。','semi-formal',4,['academic','education']],

['endorse','word','Society and Government','Reading','支持','publicly support','The proposal has been endorsed by several leading environmental organisations.','该提案已得到多个领先 environmental organisation 的 endorse。','formal',4,['academic','politics']],
['petition','word','Society and Government','Reading','请愿','formal request signed by many','An online petition calling for the ban of single-use plastics gathered over a million signatures.','呼吁禁止一次性塑料的在线 petition 收集了超过一百万个签名。','semi-formal',3,['academic','society']],
['boycott','word','Society and Government','Reading','抵制','refuse to support','Consumers organised a boycott of products linked to deforestation.','消费者组织了一次对与 deforestation 相关产品的 boycott。','semi-formal',3,['academic','society']],
['grassroots movement','collocation','Society and Government','Reading','草根运动','bottom-up campaign','The environmental campaign started as a grassroots movement before gaining national attention.','这场环境运动最初是一场 grassroots movement 然后才引起全国关注。','formal',4,['academic','society']],

['excursion','word','Tourism and Accommodation','Listening','短途旅行','short trip','The school organised an excursion to the science museum for the entire class.','学校为全班组织了一次去科学博物馆的 excursion。','neutral',2,['academic','education']],
['expedition','word','Tourism and Accommodation','Reading','探险','long organised journey','The scientific expedition to the Arctic collected valuable data on melting ice sheets.','前往北极的 scientific expedition 收集了关于冰盖融化的宝贵数据。','formal',4,['academic','science']],
['itinerary','word','Tourism and Accommodation','Listening','行程','travel schedule','Our itinerary includes a visit to the ancient ruins followed by a boat trip on the river.','我们的 itinerary 包括参观古代遗址然后乘船游览河流。','neutral',2,['academic','tourism']],

['opt for','phrase','Trend and Comparison','Speaking','选择','choose','More commuters are opting for cycling over driving as cities improve bike infrastructure.','随着城市改善自行车 infrastructure 越来越多的通勤者 opt for 骑自行车而不是开车。','neutral',2,['academic','daily']],
['weigh up','phrase','Argument and Logic','Speaking','权衡','consider carefully','Before accepting the job I needed to weigh up the salary against the longer commute.','在接受这份工作之前我需要 weigh up 薪水和更长的通勤时间。','neutral',2,['academic','daily']],
['embark on','phrase','Trend and Comparison','Reading','开始','start a journey','After graduation she embarked on a career in environmental policy and never looked back.','毕业后她 embark on 了环境 policy 的职业生涯再也没有回头。','formal',3,['academic','career']],
['steer clear of','phrase','Argument and Logic','Speaking','避开','avoid','I try to steer clear of processed foods and cook from scratch whenever possible.','我尽量 steer clear of 加工食品尽可能自己从头做饭。','neutral',2,['academic','daily']],

// BATCH 7: Push toward 800
['renowned','word','Society and Government','Reading','著名的','famous for','The city is renowned for its vibrant street art and thriving music scene.','这座城市以其充满活力的街头艺术和繁荣的音乐 scene 而 renowned。','formal',3,['academic','culture']],
['thriving','word','Trend and Comparison','Reading','繁荣的','growing well','Despite the recession the local market remains thriving with new stalls opening each month.','尽管经济衰退当地市场仍然 thriving 每个月都有新摊位开张。','semi-formal',3,['academic','economy']],
['bustling','word','Transport and Urban Life','Speaking','繁忙的','busy and lively','The market was bustling with shoppers looking for fresh produce and handmade goods.','市场 bustling 挤满了寻找新鲜农产品和手工制品的购物者。','neutral',2,['academic','daily']],
['prosperous','word','Trend and Comparison','Reading','繁荣的','wealthy and successful','Once a prosperous mining town the area is now struggling with high unemployment.','曾经是一个 prosperous 矿业城镇该地区现在正与高失业率作斗争。','formal',4,['academic','economy']],
['derelict','word','Transport and Urban Life','Reading','废弃的','abandoned and ruined','The derelict factory has been converted into a popular community arts centre.','derelict 工厂已被改造成一个受欢迎的社区艺术中心。','formal',4,['academic','urban']],

['informal settlement','collocation','Transport and Urban Life','Reading','非正式定居点','unplanned housing area','Millions of people in developing countries live in informal settlements without basic services.','发展中国家有数百万人生活在没有基本服务的 informal settlement 中。','formal',4,['academic','urban']],
['affordable housing','collocation','Society and Government','Reading','经济适用房','cheap housing','The shortage of affordable housing has become a major political issue in many cities.','affordable housing 的短缺已成为许多城市的重大政治议题。','formal',3,['academic','society']],
['housing crisis','collocation','Society and Government','Reading','住房危机','housing shortage','The housing crisis has pushed property prices beyond the reach of most young families.','housing crisis 已将房价推高到大多数年轻家庭无法承受的水平。','semi-formal',3,['academic','society']],

['proficiency','word','Education','Reading','熟练程度','skill level','Students must demonstrate proficiency in both written and spoken English before graduation.','学生必须在毕业前展示 written and spoken English 方面的 proficiency。','formal',4,['academic','education']],
['native speaker','collocation','Education','Speaking','母语者','first-language speaker','Learning a language from a native speaker helps you pick up the natural rhythm and intonation.','跟 native speaker 学语言可以帮助你掌握自然的节奏和语调。','neutral',2,['academic','language']],
['bilingual','word','Education','Reading','双语的','speaking two languages','Growing up bilingual gives children cognitive advantages that last throughout their lives.','bilingual 长大给孩子带来终身的认知优势。','semi-formal',3,['academic','education']],
['immersion','word','Education','Reading','沉浸式','complete exposure','Language immersion programmes are one of the most effective ways to achieve fluency.','language immersion 项目是达到流利的最有效方法之一。','formal',4,['academic','education']],

['counterproductive','word','Argument and Logic','Reading','适得其反的','having the opposite effect','Punishing children for mistakes can be counterproductive to their learning and development.','因犯错而惩罚孩子对他们的学习和发展可能 counterproductive。','formal',4,['academic','education']],
['overlook','word','Argument and Logic','Reading','忽视','fail to notice','Traditional education systems often overlook the importance of creativity and emotional intelligence.','传统教育体系往往 overlook 创造力和情感 intelligence 的重要性。','semi-formal',3,['academic','education']],
['overstate','word','Argument and Logic','Reading','夸大','exaggerate','It is hard to overstate the impact that the internet has had on access to information.','很难 overstate 互联网对信息获取的影响。','formal',4,['academic','writing']],
['oversimplify','word','Argument and Logic','Reading','过于简化','make too simple','It would be a mistake to oversimplify the complex relationship between poverty and crime.','oversimplify 贫困与犯罪之间的复杂关系将是一个错误。','formal',4,['academic','society']],

['water crisis','collocation','Environment and Energy','Reading','水危机','water shortage','Several major cities are facing a water crisis due to prolonged drought and overconsumption.','由于长期干旱和过度消耗几个大城市正面临 water crisis。','semi-formal',3,['academic','environment']],
['deforestation rate','collocation','Environment and Energy','Reading','森林砍伐率','tree loss speed','The deforestation rate in the Amazon has slowed but remains alarmingly high.','亚马逊的 deforestation rate 已经放缓但仍然高得惊人。','formal',4,['academic','environment']],
['species extinction','collocation','Environment and Energy','Reading','物种灭绝','dying out of species','Species extinction is occurring at a rate not seen since the dinosaurs disappeared.','species extinction 正以自恐龙消失以来从未见过的速度发生。','formal',4,['academic','environment']],
['coral bleaching','collocation','Environment and Energy','Reading','珊瑚白化','coral dying','Rising ocean temperatures have caused widespread coral bleaching across the Great Barrier Reef.','海洋温度上升已导致大堡礁大面积的 coral bleaching。','formal',5,['academic','environment']],

['digital inclusion','collocation','Technology and Media','Reading','数字包容','tech access for all','Digital inclusion programmes aim to ensure that elderly and low-income groups are not left behind.','digital inclusion 项目旨在确保老年人和低收入群体不被落下。','formal',4,['academic','technology']],
['surveillance technology','collocation','Technology and Media','Reading','监控技术','watching tech','The widespread use of surveillance technology raises concerns about privacy and civil liberties.','surveillance technology 的广泛使用引发了对隐私和公民自由的担忧。','formal',4,['academic','privacy']],
['alarmist','word','Argument and Logic','Reading','危言耸听的','exaggerating danger','Some scientists argue that media coverage of climate change is too alarmist while others say it is not urgent enough.','一些科学家认为媒体对气候变化的报道过于 alarmist 而另一些人则认为不够紧迫。','formal',4,['academic','media']],
['tabloid','word','Technology and Media','Reading','小报','sensationalist newspaper','The story made headlines in the tabloids but received little attention from serious journalists.','这个故事在 tabloid 上成为头条但几乎没有引起严肃记者的关注。','semi-formal',3,['academic','media']],
['clickbait headline','collocation','Technology and Media','Reading','标题党','misleading title','Clickbait headlines are designed to attract attention rather than accurately describe the article content.','clickbait headline 旨在吸引注意力而不是准确描述文章内容。','semi-formal',3,['academic','media']],

['pension scheme','collocation','Society and Government','Reading','养老金计划','retirement savings plan','The government introduced a new pension scheme to help workers save more for retirement.','政府推出了新的 pension scheme 帮助工人为退休储蓄更多。','formal',3,['academic','economy']],
['welfare system','collocation','Society and Government','Reading','福利体系','social support network','The welfare system provides a safety net for the unemployed elderly and disabled.','welfare system 为失业者老年人和残疾人提供了安全网。','formal',3,['academic','society']],
['universal basic income','collocation','Society and Government','Reading','全民基本收入','money for everyone','Universal basic income has been proposed as a solution to job losses caused by automation.','universal basic income 被提议作为 automation 造成失业的解决方案。','formal',5,['academic','economy']],
['progressive taxation','collocation','Society and Government','Reading','累进税','higher earners pay more','Progressive taxation is designed to reduce inequality by taxing higher incomes at a greater rate.','progressive taxation 旨在通过对高收入征收更高税率来减少 inequality。','formal',5,['academic','economy']],

['conspicuous consumption','collocation','Trend and Comparison','Reading','炫耀性消费','showing off wealth','Critics argue that conspicuous consumption on social media fuels materialism among young people.','批评者认为社交媒体上的 conspicuous consumption 助长了年轻人的物质主义。','academic',5,['academic','society']],
['inflation','word','Trend and Comparison','Reading','通货膨胀','rising prices','Central banks raised interest rates to bring inflation back under control.','央行提高了 interest rate 以将 inflation 重新控制在可控范围内。','formal',3,['academic','economy']],
['recession','word','Trend and Comparison','Reading','经济衰退','economic decline','The country slipped into recession after two consecutive quarters of negative growth.','在连续两个季度负增长后该国陷入了 recession。','formal',3,['academic','economy']],
['GDP','word','Trend and Comparison','Reading','国内生产总值','total economic output','GDP alone is not a reliable measure of a country wellbeing or quality of life.','仅靠 GDP 并不能可靠地衡量一个国家的 wellbeing 或生活质量。','formal',4,['academic','economy']],

// BATCH 8
['demographic shift','collocation','Trend and Comparison','Reading','人口结构变化','population change','The demographic shift towards an older population will have profound implications for healthcare.','向老年人口转变的 demographic shift 将对医疗产生深远影响。','formal',4,['academic','society']],
['birth rate','collocation','Trend and Comparison','Reading','出生率','babies per woman','The birth rate has fallen below replacement level in most developed countries.','大多数发达国家的 birth rate 已降至更替水平以下。','formal',3,['academic','society']],
['mortality rate','collocation','Trend and Comparison','Reading','死亡率','death rate','Improved sanitation and healthcare have dramatically reduced the infant mortality rate.','改善的卫生条件和医疗大幅降低了 infant mortality rate。','formal',4,['academic','health']],
['life span','collocation','Trend and Comparison','Reading','寿命','how long someone lives','The average human life span has nearly doubled over the past two centuries.','过去两个世纪中人类的平均 life span 几乎翻了一番。','semi-formal',3,['academic','health']],
['fertility rate','collocation','Trend and Comparison','Reading','生育率','children per woman','Countries with fertility rates below replacement level face long-term workforce shortages.','fertility rate 低于更替水平的国家面临长期的劳动力 shortage。','formal',4,['academic','society']],

['metropolitan','word','Transport and Urban Life','Reading','大都市的','big city','The metropolitan area has expanded to absorb several surrounding towns and villages.','metropolitan 地区已扩展到吸收了周围几个城镇和村庄。','formal',4,['academic','urban']],
['suburban','word','Transport and Urban Life','Reading','郊区的','outside city centre','Suburban neighbourhoods offer more space but often require longer commutes to work.','suburban 街区提供更多空间但通常需要更长的通勤时间。','semi-formal',3,['academic','urban']],
['rural','word','Transport and Urban Life','Reading','农村的','countryside','Rural communities often lack access to the same services and opportunities as urban areas.','rural 社区通常缺乏与 urban 地区相同的服务和机会。','semi-formal',3,['academic','society']],
['remote area','collocation','Transport and Urban Life','Reading','偏远地区','faraway place','Delivering healthcare to remote areas remains one of the biggest challenges for public services.','向 remote area 提供医疗仍然是 public service 面临的最大挑战之一。','semi-formal',3,['academic','society']],

['a drop in the ocean','phrase','Argument and Logic','Speaking','沧海一粟','very small amount','The money raised so far is a drop in the ocean compared to what is actually needed.','到目前为止筹集的资金与真正需要的相比只是 a drop in the ocean。','neutral',3,['academic','idiom']],
['the tip of the iceberg','phrase','Argument and Logic','Speaking','冰山一角','only a small part','These reported cases are just the tip of the iceberg and the true figure is likely much higher.','这些报告案例只是 the tip of the iceberg 真实数字可能高得多。','neutral',3,['academic','idiom']],
['a step in the right direction','phrase','Argument and Logic','Speaking','正确的一步','positive move','The new policy is a step in the right direction but much more needs to be done.','新政策是 a step in the right direction 但还有很多需要做的。','neutral',2,['academic','idiom']],
['food for thought','phrase','Argument and Logic','Speaking','引人深思','something to think about','The documentary provided plenty of food for thought about our food production systems.','这部纪录片对我们的食品生产系统提供了 plenty of food for thought。','neutral',2,['academic','idiom']],

['come up with','phrase','Argument and Logic','Speaking','想出','think of','We need to come up with a better solution than just increasing the budget.','我们需要 come up with 一个比仅仅增加预算更好的解决方案。','neutral',1,['academic','daily']],
['carry out','phrase','Science and Research','Reading','执行','do or complete','The team carried out a series of experiments to test the new hypothesis.','团队 carry out 了一系列实验来检验新的 hypothesis。','semi-formal',2,['academic','research']],
['draw on','phrase','Argument and Logic','Reading','借鉴','use as a resource','The research draws on data collected from over fifty countries over a twenty-year period.','该研究 draw on 二十年间从五十多个国家收集的数据。','formal',3,['academic','research']],
['point out','phrase','Argument and Logic','Speaking','指出','mention','I should point out that the study only included participants from one region.','我应该 point out 这项研究只包括一个地区的参与者。','neutral',1,['academic','daily']],

// BATCH 9
['glacier retreat','collocation','Environment and Energy','Reading','冰川退缩','ice melting back','Glacier retreat is one of the most visible indicators of global temperature rise.','glacier retreat 是全球气温上升最明显的 indicator 之一。','formal',5,['academic','environment']],
['permafrost','word','Environment and Energy','Reading','永久冻土','permanently frozen ground','The thawing of permafrost in the Arctic is releasing huge amounts of trapped methane.','北极 permafrost 的融化正在释放大量 trapped methane。','academic',5,['academic','environment']],
['heatwave','word','Environment and Energy','Reading','热浪','extreme hot period','The record-breaking heatwave caused hundreds of deaths and strained hospital emergency rooms.','创纪录的 heatwave 导致数百人死亡并使医院急诊室不堪重负。','semi-formal',3,['academic','environment']],
['flash flood','collocation','Environment and Energy','Reading','山洪','sudden flood','Flash floods can occur with very little warning in mountainous areas after heavy rain.','山区大雨后 flash flood 可能在几乎没有预警的情况下发生。','semi-formal',3,['academic','environment']],

['compassion fatigue','collocation','Society and Government','Reading','同情疲劳','emotional exhaustion','Constant exposure to tragic news can lead to compassion fatigue among healthcare workers and journalists.','持续接触悲剧新闻可能导致 healthcare worker 和 journalist 的 compassion fatigue。','formal',5,['academic','psychology']],
['vicarious','word','Society and Government','Reading','间接体验的','experienced through others','Many people gain vicarious enjoyment from watching travel videos of places they may never visit.','许多人通过观看他们可能永远不会去的地方的旅行视频获得 vicarious 享受。','academic',5,['academic','psychology']],
['self-esteem','word','Health and Lifestyle','Reading','自尊','confidence in oneself','Social media use has been linked to lower self-esteem particularly among teenage girls.','社交媒体的使用与较低的 self-esteem 有关尤其是在十几岁的女孩中。','semi-formal',3,['academic','psychology']],
['attention span','collocation','Education','Reading','注意力持续时间','focus duration','The average attention span has reportedly decreased in the age of smartphones and social media.','据报道在智能手机和社交媒体时代 average attention span 已经下降。','semi-formal',3,['academic','psychology']],

['disillusioned','word','Society and Government','Reading','幻灭的','disappointed','Many young voters have become disillusioned with traditional politics and are seeking alternatives.','许多年轻选民对传统 politics 已经 disillusioned 并正在寻找替代方案。','formal',4,['academic','politics']],
['apathetic','word','Society and Government','Reading','冷漠的','not caring','Voter turnout is low partly because many citizens feel apathetic about political issues.','投票率低部分是因为许多公民对政治 issues 感到 apathetic。','formal',5,['academic','politics']],
['accountability','word','Society and Government','Reading','问责制','taking responsibility','There must be greater accountability for public officials who misuse taxpayer money.','滥用 taxpayer money 的公职人员必须有更大的 accountability。','formal',4,['academic','government']],
['transparency','word','Society and Government','Reading','透明度','openness','Transparency in government decision-making is essential for maintaining public trust.','政府决策中的 transparency 对于维护公众 trust 至关重要。','formal',4,['academic','government']],

['at face value','phrase','Argument and Logic','Speaking','表面价值','without questioning','You should not take everything you read on the internet at face value.','你不应该对互联网上读到的一切 at face value。','neutral',2,['academic','daily']],
['cast doubt on','phrase','Argument and Logic','Reading','对……产生怀疑','make people question','The new study casts doubt on the widely held belief that homework improves academic performance.','这项新研究 cast doubt on 家庭作业能提高学业表现的广泛信念。','formal',4,['academic','research']],
['shed light on','phrase','Argument and Logic','Reading','阐明','help explain','The research sheds light on why some students thrive while others struggle in the same environment.','该研究 shed light on 为什么有些学生在同一环境中 thrive 而另一些则 struggle。','formal',4,['academic','research']],
['play devil advocate','phrase','Argument and Logic','Speaking','故意唱反调','argue opposite view','Let me play devil advocate for a moment and ask what would happen if the plan failed.','让我 play devil advocate 一会儿问问如果计划失败会发生什么。','neutral',3,['academic','discussion']],

// BATCH 10: Push to 1000 — high-value 6.5-7.5 terms
['predominantly','word','Trend and Comparison','Writing','主要地','mostly','The workforce in the manufacturing sector is predominantly male though this is slowly changing.','制造业的 workforce predominantly 是男性尽管这种情况正在缓慢改变。','formal',4,['academic','writing']],
['intrinsically','word','Argument and Logic','Reading','本质上','by its nature','Some argue that curiosity is intrinsically human and cannot be replicated by machines.','有人认为好奇心 intrinsically 是人类的无法被机器复制。','academic',5,['academic','philosophy']],
['inherently','word','Argument and Logic','Reading','固有地','as a basic quality','No technology is inherently good or bad it depends entirely on how it is used.','没有技术 inherently 是好是坏完全取决于如何使用。','formal',4,['academic','argument']],
['invariably','word','Trend and Comparison','Reading','总是','always','Rapid urbanisation invariably leads to increased pressure on public infrastructure.','快速 urbanisation invariably 导致对公共 infrastructure 的压力增加。','formal',5,['academic','writing']],
['ostensibly','word','Argument and Logic','Reading','表面上','apparently','The policy was ostensibly designed to help small businesses but critics argue it favoured large corporations.','该政策 ostensibly 旨在帮助小企业但批评者认为它偏向大公司。','academic',5,['academic','reading']],

['prudent','word','Argument and Logic','Reading','审慎的','wise and careful','It would be prudent to set aside emergency savings before making large investments.','在进行大额投资之前 prudent 的做法是先预留 emergency savings。','formal',4,['academic','advice']],
['vigilant','word','Society and Government','Reading','警惕的','watchful','Citizens must remain vigilant about how their personal data is collected and used.','公民必须对个人数据如何被收集和使用保持 vigilant。','formal',4,['academic','privacy']],
['stringent','word','Society and Government','Reading','严格的','very strict','More stringent regulations on industrial waste have significantly reduced river pollution.','对工业废物更 stringent 的法规显著减少了河流污染。','formal',5,['academic','environment']],
['lenient','word','Society and Government','Reading','宽松的','not strict','Critics argue that lenient punishments do little to deter serious crime.','批评者认为 lenient 惩罚对 deter serious crime 几乎无效。','formal',4,['academic','law']],

['discrepancy','word','Trend and Comparison','Reading','差异','difference','There is a significant discrepancy between official statistics and the reality on the ground.','官方统计数据与实际情况之间存在显著 discrepancy。','academic',5,['academic','data']],
['anomaly','word','Trend and Comparison','Reading','异常','unusual result','The unusually high figure for March appears to be an anomaly rather than a trend.','三月份异常高的数字似乎是一个 anomaly 而不是 trend。','academic',5,['academic','data']],
['aberration','word','Trend and Comparison','Reading','反常','departure from normal','The sudden drop in sales was an aberration caused by a temporary supply chain disruption.','销售额的突然下降是由临时 supply chain disruption 引起的 aberration。','academic',5,['academic','data']],

['fallacy','word','Argument and Logic','Reading','谬误','false belief','The idea that we only use ten percent of our brains is a widely believed fallacy.','我们只使用大脑百分之十的想法是一个广为流传的 fallacy。','academic',5,['academic','logic']],
['rebuttal','word','Argument and Logic','Reading','反驳','counter-argument','The author provides a strong rebuttal to the claim that technology makes us less social.','作者对技术让我们变得不那么社交的说法提供了有力的 rebuttal。','academic',5,['academic','argument']],
['rhetoric','word','Argument and Logic','Reading','修辞','persuasive language','Despite the inspiring rhetoric there has been little concrete action on the issue.','尽管 rhetoric 鼓舞人心但在这个问题上几乎没有具体行动。','academic',5,['academic','politics']],

['pervasive','word','Trend and Comparison','Reading','普遍的','spreading everywhere','The pervasive influence of social media on public opinion cannot be underestimated.','social media 对公众舆论的 pervasive 影响不可低估。','academic',5,['academic','society']],
['ubiquitous','word','Technology and Media','Reading','无处不在的','everywhere','Smartphones have become so ubiquitous that it is hard to remember life without them.','smartphone 已经变得如此 ubiquitous 以至于很难想象没有它们的生活。','academic',5,['academic','technology']],
['omnipresent','word','Technology and Media','Reading','无所不在的','always present','Digital screens are now omnipresent in the lives of children growing up in developed countries.','在发达国家成长的儿童生活中 digital screen 现在 omnipresent。','academic',5,['academic','technology']],

['extrapolate','word','Science and Research','Reading','推断','predict from data','It would be unwise to extrapolate the results of a small pilot study to the entire population.','将小型 pilot study 的结果 extrapolate 到整个人口是不明智的。','academic',5,['academic','research']],
['substantiate','word','Science and Research','Reading','证实','provide evidence for','The journalist failed to substantiate the claims made in the article with any verifiable sources.','记者未能用任何可验证的来源 substantiate article 中的说法。','academic',5,['academic','research']],
['replicate','word','Science and Research','Reading','复制','repeat and confirm','Other research teams have been unable to replicate the original findings raising doubts about their validity.','其他研究团队一直无法 replicate 原始发现这让其有效性受到质疑。','academic',5,['academic','research']],

['urban dweller','collocation','Transport and Urban Life','Reading','城市居民','city resident','Urban dwellers tend to have a smaller carbon footprint per person than those in rural areas.','urban dweller 的人均 carbon footprint 往往比农村地区的人更小。','semi-formal',3,['academic','urban']],
['horticulture','word','Transport and Urban Life','Reading','园艺','garden cultivation','Community horticulture projects have transformed neglected spaces into productive green areas.','社区 horticulture 项目将被忽视的空间变成了 productive green area。','formal',4,['academic','environment']],
['urban farming','collocation','Transport and Urban Life','Reading','城市农业','city agriculture','Urban farming initiatives are helping to improve food access in low-income neighbourhoods.','urban farming 倡议正在帮助改善低收入社区的 food access。','semi-formal',3,['academic','urban']],

['discourse','word','Argument and Logic','Reading','论述','discussion','The public discourse around climate change has shifted significantly in the past five years.','围绕气候变化的 public discourse 在过去五年中发生了显著变化。','academic',5,['academic','society']],
['polarisation','word','Society and Government','Reading','两极分化','extreme division','Political polarisation has made it increasingly difficult to find common ground on key issues.','political polarisation 使得在关键问题上找到 common ground 变得越来越困难。','academic',5,['academic','politics']],
['echo chamber','collocation','Technology and Media','Reading','信息茧房','repeating same views','Social media algorithms can create echo chambers where users only see opinions they already agree with.','社交媒体 algorithm 可以制造 echo chamber 让用户只看到他们已经同意的观点。','semi-formal',4,['academic','technology']],

['discern','word','Argument and Logic','Reading','辨别','see clearly','It can be difficult to discern fact from opinion in some online news sources.','在某些在线新闻来源中 discern 事实和观点可能很困难。','academic',5,['academic','reading']],
['ascertain','word','Science and Research','Reading','查明','find out for certain','Further investigation is needed to ascertain the long-term effects of the treatment.','需要进一步调查以 ascertain 治疗的长期效果。','academic',5,['academic','research']],
['elucidate','word','Science and Research','Reading','阐明','make clear','The study aims to elucidate the complex relationship between diet and mental health.','该研究旨在 elucidate 饮食与 mental health 之间的复杂关系。','academic',5,['academic','research']],

['socioeconomic status','collocation','Society and Government','Reading','社会经济地位','class level','A child socioeconomic status remains one of the strongest predictors of educational attainment.','孩子的 socioeconomic status 仍然是教育成就最有力的 predictor 之一。','academic',5,['academic','society']],
['perpetuate','word','Society and Government','Reading','延续','keep going','Inadequate funding for schools in poor areas helps perpetuate the cycle of poverty.','贫困地区学校资金不足助 perpetuate 贫困的循环。','academic',5,['academic','society']],
['entrenched','word','Society and Government','Reading','根深蒂固的','deeply established','Entrenched social attitudes can be the hardest barrier to overcome when introducing reforms.','entrenched 的社会态度可能是推行改革时最难克服的障碍。','academic',5,['academic','society']],

['a necessary evil','phrase','Argument and Logic','Speaking','必要的恶','bad but needed','Many people see taxation as a necessary evil rather than a positive contribution to society.','许多人将 taxation 视为 a necessary evil 而不是对社会的积极贡献。','neutral',3,['academic','idiom']],
['by the same token','phrase','Argument and Logic','Speaking','同理','for the same reason','By the same token if we expect honesty from politicians we must demand it from the media too.','by the same token 如果我们期望 politician 诚实我们也必须对媒体提出同样的要求。','semi-formal',4,['academic','argument']],
['on the one hand','phrase','Argument and Logic','Speaking','一方面','from one perspective','On the one hand technology connects us but on the other it can make us feel more isolated.','on the one hand 技术连接了我们但另一方面它可能让我们感到更加孤立。','neutral',2,['academic','discussion']],

['a means to an end','phrase','Argument and Logic','Speaking','达到目的的手段','way to achieve goal','For many people work is simply a means to an end rather than a source of fulfilment.','对许多人来说工作只是 a means to an end 而不是 fulfilment 的来源。','neutral',3,['academic','idiom']],
['go the extra mile','phrase','Argument and Logic','Speaking','加倍努力','make extra effort','The best employees are those who are willing to go the extra mile when the situation demands it.','最好的员工是那些在情况需要时愿意 go the extra mile 的人。','neutral',2,['academic','idiom']],
['keep an open mind','phrase','Argument and Logic','Speaking','保持开放心态','consider different views','It is important to keep an open mind when discussing controversial topics with others.','在与他人讨论 controversial topic 时 keep an open mind 是很重要的。','neutral',2,['academic','discussion']],

['fend for oneself','phrase','Health and Lifestyle','Speaking','自谋生路','take care of oneself','Learning to cook is an essential skill if you plan to fend for yourself at university.','如果你打算在大学 fend for yourself 学做饭是一项 essential skill。','neutral',2,['academic','daily']],
['live from hand to mouth','phrase','Trend and Comparison','Reading','勉强糊口','barely survive financially','Many gig economy workers live from hand to mouth with no savings for emergencies.','许多 gig economy worker live from hand to mouth 没有应急 savings。','semi-formal',3,['academic','society']],
['make ends meet','phrase','Trend and Comparison','Speaking','收支平衡','cover basic costs','With the rising cost of living many families are struggling to make ends meet each month.','随着 living cost 的上升许多家庭每月都难以 make ends meet。','neutral',2,['academic','daily']],

['a wake-up call','phrase','Argument and Logic','Speaking','警钟','urgent warning','The extreme weather events of recent years should serve as a wake-up call for policymakers.','近年来的 extreme weather event 应当成为 policymaker 的 a wake-up call。','neutral',2,['academic','environment']],
['take for granted','phrase','Argument and Logic','Speaking','视为理所当然','assume will always exist','Most of us take clean drinking water for granted until there is a shortage.','我们大多数人 take clean drinking water for granted 直到出现短缺。','neutral',2,['academic','daily']],
['bear in mind','phrase','Argument and Logic','Speaking','记住','remember','Bear in mind that the data only covers the period before the new policy was introduced.','bear in mind 数据只涵盖新 policy 引入之前的时期。','neutral',2,['academic','daily']],

// BATCH 11
['embrace change','phrase','Argument and Logic','Writing','拥抱变化','accept new things','Organisations that fail to embrace change risk being left behind in a rapidly evolving market.','未能 embrace change 的组织有被快速发展的 market 甩在后面的风险。','semi-formal',3,['academic','business']],
['think outside the box','phrase','Argument and Logic','Speaking','跳出框框','be creative','The best solutions often come when people are encouraged to think outside the box.','最好的解决方案往往出现在鼓励人们 think outside the box 的时候。','neutral',2,['academic','idiom']],
['pave the way for','phrase','Argument and Logic','Writing','为……铺平道路','prepare for','The initial research paved the way for the development of life-saving treatments.','最初的研究 pave the way for 了挽救生命的治疗方法的开发。','formal',4,['academic','science']],
['bring about change','phrase','Argument and Logic','Writing','带来变革','cause transformation','Grassroots movements can bring about change more effectively than top-down government programmes.','grassroots movement 比自上而下的 government programme 更能 bring about change。','semi-formal',3,['academic','society']],
['gain a deeper insight into','phrase','Argument and Logic','Writing','深入了解','understand more deeply','Travelling allows people to gain a deeper insight into cultures different from their own.','旅行让人们 gain a deeper insight into 与自己不同的 culture。','semi-formal',3,['academic','writing']],

['accountability','word','Society and Government','Reading','问责','answerability','Without proper accountability public funds can be misused with few consequences.','没有适当的 accountability 公共资金可能被滥用而几乎不承担后果。','formal',4,['academic','government']],
['whistleblower','word','Society and Government','Reading','举报人','person reporting wrongdoing','The whistleblower revealed evidence of corruption that led to several high-profile resignations.','whistleblower 揭露了腐败的证据导致了几起高调辞职。','formal',4,['academic','law']],
['defendant','word','Society and Government','Reading','被告','accused person','The defendant was found not guilty after the jury deliberated for less than two hours.','陪审团商议不到两小时后就裁定 defendant 无罪。','formal',3,['academic','law']],

['provisional','word','Trend and Comparison','Reading','临时的','temporary','The data is provisional and may be revised when more complete information becomes available.','这些数据是 provisional 的当更完整的信息可用时可能会修订。','formal',4,['academic','data']],
['tentative','word','Trend and Comparison','Reading','初步的','not final','The researchers reached a tentative conclusion but stressed that more work is needed.','研究人员得出了一个 tentative 结论但强调还需要更多工作。','academic',5,['academic','research']],
['consolidate','word','Trend and Comparison','Reading','巩固','strengthen','The company is looking to consolidate its position in the Asian market before expanding further.','该公司希望在进一步扩张之前 consolidate 其在亚洲市场的地位。','formal',4,['academic','business']],

['incongruous','word','Argument and Logic','Reading','不协调的','out of place','The modern glass building looked incongruous among the historic stone houses.','这座现代玻璃建筑在 historic stone house 中显得 incongruous。','academic',5,['academic','writing']],
['extraneous','word','Argument and Logic','Reading','无关的','irrelevant','The report contains too much extraneous detail that distracts from the main argument.','该报告包含了太多 extraneous 细节分散了对主要 argument 的注意力。','academic',5,['academic','writing']],
['cumbersome','word','Argument and Logic','Reading','繁琐的','awkwardly complex','The current application process is too cumbersome and needs to be streamlined for users.','目前的申请流程过于 cumbersome 需要为用户简化。','formal',4,['academic','business']],

['neglect','word','Society and Government','Reading','忽视','fail to care for','Years of neglect have left the public transport system in desperate need of investment.','多年的 neglect 使 public transport system 急需 investment。','semi-formal',3,['academic','society']],
['deteriorate','word','Trend and Comparison','Reading','恶化','get worse','Air quality in the city has deteriorated sharply over the past five years.','该市的 air quality 在过去五年中 sharply deteriorated。','formal',4,['academic','environment']],
['dwindle','word','Trend and Comparison','Reading','逐渐减少','shrink gradually','The population of the village has dwindled to fewer than 200 as young people move to cities.','随着年轻人迁往城市该村的 population 已经 dwindle 到不到 200 人。','formal',5,['academic','society']],

['infrastructure overhaul','collocation','Society and Government','Reading','基础设施翻新','major rebuild','The city is planning a massive infrastructure overhaul to prepare for the growing population.','该市正在计划大规模 infrastructure overhaul 为不断增长的人口做准备。','formal',4,['academic','urban']],
['call for','phrase','Argument and Logic','Writing','呼吁','demand','Environmental groups are calling for stricter limits on industrial carbon emissions.','environmental group 正在 call for 更严格的 industrial carbon emission 限制。','semi-formal',2,['academic','society']],
['offset','word','Argument and Logic','Reading','抵消','counterbalance','The environmental benefits of the project help offset the initial construction costs.','该项目的 environmental benefit 有助于 offset 最初的 construction cost。','formal',4,['academic','environment']],

// BATCH 12: Abbreviation-heavy batch (auto-get fullForm)
['CO2 emission','collocation','Environment and Energy','Reading','二氧化碳排放','carbon gas output','CO2 emissions from transport account for roughly a quarter of the global total.','交通运输的 CO2 emission 约占全球总量的四分之一。','formal',3,['academic','environment']],
['STEM field','collocation','Education','Reading','STEM领域','science tech subjects','Women remain underrepresented in many STEM fields despite decades of outreach efforts.','尽管有数十年的 outreach effort 女性在许多 STEM field 中仍然代表性不足。','formal',4,['academic','education']],
['ICT skill','collocation','Technology and Media','Reading','ICT技能','tech ability','Basic ICT skills are now a minimum requirement for most office-based jobs.','基本的 ICT skill 现在是大多数办公室工作的最低要求。','semi-formal',2,['academic','technology']],

// More advanced terms
['proliferation','word','Technology and Media','Reading','激增','rapid increase','The proliferation of smartphones has fundamentally changed how people consume media.','smartphone 的 proliferation 从根本上改变了人们消费媒体的方式。','academic',5,['academic','technology']],
['unprecedented','word','Trend and Comparison','Writing','前所未有的','never seen before','The pandemic caused an unprecedented disruption to global supply chains and travel.','疫情对全球 supply chain 和旅行造成了 unprecedented 的破坏。','formal',4,['academic','writing']],
['profound','word','Argument and Logic','Writing','深远的','deep and significant','The internet has had a profound impact on the way we work learn and communicate.','互联网对我们工作学习和沟通的方式产生了 profound 影响。','formal',4,['academic','writing']],
['intricate','word','Argument and Logic','Reading','错综复杂的','very detailed','The intricate relationship between diet gut bacteria and mental health is still being explored.','饮食肠道细菌和 mental health 之间 intricate 的关系仍在探索中。','academic',5,['academic','science']],

['convergence','word','Technology and Media','Reading','融合','coming together','The convergence of AI robotics and big data is creating entirely new industries.','AI robotics 和 big data 的 convergence 正在创造全新的行业。','academic',5,['academic','technology']],
['divergence','word','Trend and Comparison','Reading','分歧','growing apart','There is a growing divergence between the educational outcomes of wealthy and poor students.','富裕和贫困学生的 educational outcome 之间存在 growing divergence。','academic',5,['academic','education']],
['cohesion','word','Society and Government','Reading','凝聚力','unity','Sport can play an important role in building social cohesion in multicultural communities.','体育在 multicultural community 中 building social cohesion 方面可以发挥重要作用。','formal',4,['academic','society']],

['conducive','word','Argument and Logic','Reading','有利于','helpful for','A quiet and well-lit environment is conducive to effective studying.','安静且光线充足的环境 conducive to effective studying。','formal',5,['academic','education']],
['detrimental','word','Argument and Logic','Reading','有害的','harmful','Excessive screen time before bed is detrimental to sleep quality.','睡前过多的 screen time detrimental to sleep quality。','formal',4,['academic','health']],
['indispensable','word','Argument and Logic','Reading','不可或缺的','absolutely necessary','The internet has become an indispensable tool for research and communication.','互联网已成为研究和 communication 的 indispensable 工具。','formal',4,['academic','technology']],

['foreseeable','word','Trend and Comparison','Reading','可预见的','predictable','Electric vehicles are likely to dominate new car sales in the foreseeable future.','在 foreseeable future electric vehicle 可能主导新车销售。','formal',4,['academic','environment']],
['implausible','word','Argument and Logic','Reading','难以置信的','hard to believe','The idea that technology will solve all our problems without any drawbacks is implausible.','技术可以毫无缺点地解决所有问题的想法是 implausible 的。','academic',5,['academic','argument']],
['irrefutable','word','Argument and Logic','Reading','无可辩驳的','impossible to deny','The evidence linking smoking to lung cancer is now considered irrefutable.','将吸烟与 lung cancer 联系起来的证据现在被认为是 irrefutable 的。','academic',5,['academic','science']],

['a far cry from','phrase','Argument and Logic','Speaking','远非','very different from','The reality of living in the city is a far cry from the image portrayed in tourist brochures.','在城市生活的现实 a far cry from 旅游手册中描绘的形象。','neutral',3,['academic','idiom']],
['in the grand scheme of things','phrase','Argument and Logic','Speaking','从大局看','considering everything','In the grand scheme of things a few bad days do not define your entire career.','in the grand scheme of things 几天的糟糕并不能定义你的整个 career。','neutral',3,['academic','idiom']],
['the best of both worlds','phrase','Argument and Logic','Speaking','两全其美','ideal combination','Working from home a few days a week gives you the best of both worlds.','每周几天在家工作给你 the best of both worlds。','neutral',2,['academic','idiom']],

['conducive environment','collocation','Education','Reading','有利环境','helpful conditions','Schools should create a conducive environment where students feel safe to express their ideas.','学校应创造一个 conducive environment 让学生敢于表达自己的想法。','formal',4,['academic','education']],
['constructive feedback','collocation','Education','Reading','建设性反馈','helpful criticism','Constructive feedback helps students understand their weaknesses without feeling discouraged.','constructive feedback 帮助学生了解自己的不足而不会感到气馁。','semi-formal',3,['academic','education']],
['hands-on experience','collocation','Education','Speaking','实践经验','practical learning','Internships provide valuable hands-on experience that cannot be gained in a classroom.','internship 提供宝贵的 hands-on experience 这是在课堂上无法获得的。','neutral',2,['academic','education']],

['all walks of life','phrase','Society and Government','Speaking','各行各业','all types of people','The programme attracts volunteers from all walks of life including students retirees and professionals.','该 programme 吸引了 all walks of life 的 volunteer 包括学生退休人员和 professionals。','neutral',2,['academic','society']],
['on a daily basis','phrase','Trend and Comparison','Speaking','每天','every day','Millions of people use public transport on a daily basis to get to work or school.','数百万人 on a daily basis 使用 public transport 去上班或上学。','neutral',1,['academic','daily']],

// BATCH 13: Push to 1000
['compliance','word','Society and Government','Reading','合规','following rules','Companies face heavy fines for non-compliance with data protection regulations.','公司因不 compliance 数据保护法规而面临巨额罚款。','formal',4,['academic','business']],
['jurisdiction','word','Society and Government','Reading','管辖权','legal authority','The case falls under the jurisdiction of the international court rather than national courts.','该案件属于 international court 的 jurisdiction 而非 national court。','academic',5,['academic','law']],
['precedent','word','Society and Government','Reading','先例','previous case','The court ruling set an important precedent for future environmental protection cases.','该法院裁决为未来的 environmental protection case 树立了重要的 precedent。','academic',5,['academic','law']],

['discretion','word','Society and Government','Reading','自由裁量权','personal judgment','Judges have a certain amount of discretion when deciding the length of a prison sentence.','法官在决定 prison sentence 的长度时有一定程度的 discretion。','academic',5,['academic','law']],
['confidentiality','word','Society and Government','Reading','保密性','privacy','Doctors have a legal obligation to maintain patient confidentiality at all times.','医生有法律义务始终保持 patient confidentiality。','formal',4,['academic','health']],
['consent','word','Society and Government','Reading','同意','permission','Researchers must obtain informed consent from all participants before the study begins.','研究人员必须在研究开始前获得所有参与者的 informed consent。','formal',4,['academic','research']],

['ambivalent','word','Argument and Logic','Reading','矛盾的','mixed feelings','Public opinion on the issue remains ambivalent with nearly equal numbers for and against.','公众对这个问题的看法仍然 ambivalent 支持与反对的人数几乎相等。','academic',5,['academic','society']],
['sceptical','word','Argument and Logic','Reading','怀疑的','doubtful','Many consumers remain sceptical about claims that the product is environmentally friendly.','许多消费者对该产品 environmentally friendly 的说法仍然 sceptical。','semi-formal',4,['academic','society']],
['cynical','word','Argument and Logic','Reading','愤世嫉俗的','distrustful','Young voters have become increasingly cynical about political promises that never materialise.','年轻选民对从未实现的 political promise 变得越来越 cynical。','semi-formal',4,['academic','politics']],

['commence','word','Trend and Comparison','Reading','开始','begin formally','The construction work is scheduled to commence in early spring and finish by the end of the year.','construction work 计划于早春 commence 并在年底前完成。','formal',3,['academic','business']],
['cease','word','Trend and Comparison','Reading','停止','stop','The factory will cease operations at the end of the month after more than fifty years.','该工厂将在月底 cease 运营结束了五十多年的历史。','formal',3,['academic','business']],
['terminate','word','Trend and Comparison','Reading','终止','end officially','The contract can be terminated by either party with thirty days written notice.','合同可由任何一方以三十天书面通知 terminate。','formal',4,['academic','business']],

['reiterate','word','Argument and Logic','Reading','重申','say again','The minister reiterated the government commitment to reducing carbon emissions by 2030.','部长 reiterated 政府在 2030 年前减少 carbon emission 的承诺。','formal',4,['academic','politics']],
['reinforce','word','Argument and Logic','Reading','加强','strengthen','The findings reinforce the view that early intervention is key to improving outcomes.','这些发现 reinforce 了早期干预是改善 outcomes 的关键这一观点。','formal',3,['academic','research']],
['undermine','word','Argument and Logic','Reading','损害','weaken','Constant criticism can undermine a child confidence and willingness to try new things.','持续的批评会 undermine 孩子的 confidence 和尝试新事物的意愿。','formal',4,['academic','education']],

['at the mercy of','phrase','Argument and Logic','Reading','受……支配','controlled by','Without savings many families are at the mercy of unexpected expenses that can push them into debt.','没有 savings 许多家庭 at the mercy of unexpected expense 可能将他们推入债务。','semi-formal',3,['academic','society']],
['set in motion','phrase','Argument and Logic','Writing','启动','start happening','The policy change set in motion a series of reforms that reshaped the education system.','policy change set in motion 了一系列重塑 education system 的改革。','formal',4,['academic','writing']],
['lay the groundwork','phrase','Argument and Logic','Writing','奠定基础','prepare the foundation','The initial research laid the groundwork for the development of the vaccine.','最初的 research 为 vaccine 的开发 lay the groundwork。','formal',4,['academic','science']],

['cumulative effect','collocation','Trend and Comparison','Reading','累积效应','growing impact','The cumulative effect of small daily habits can be more powerful than occasional big changes.','日常小习惯的 cumulative effect 可能比偶尔的大改变更强大。','formal',4,['academic','health']],
['knock-on effect','collocation','Trend and Comparison','Reading','连锁效应','indirect result','The closure of the factory had a knock-on effect on suppliers and local businesses.','工厂的关闭对 supplier 和 local business 产生了 knock-on effect。','semi-formal',3,['academic','economy']],
['snowball effect','collocation','Trend and Comparison','Speaking','滚雪球效应','growing momentum','Small acts of kindness can create a snowball effect that spreads throughout a community.','小小的善举可以产生 snowball effect 在整个 community 中传播。','neutral',2,['academic','society']],

['deprive of','phrase','Argument and Logic','Reading','剥夺','take away from','No child should be deprived of the opportunity to receive a quality education.','任何孩子都不应被 deprive of 接受 quality education 的机会。','formal',4,['academic','education']],
['resort to','phrase','Argument and Logic','Reading','诉诸','turn to as last option','When peaceful protests failed some groups resorted to more extreme measures.','当 peaceful protest 失败时一些团体 resort to 更极端的 measure。','formal',4,['academic','politics']],
['opt for','phrase','Trend and Comparison','Reading','选择','choose','An increasing number of consumers are opting for plant-based alternatives to meat.','越来越多的消费者 opt for plant-based alternative 替代肉类。','semi-formal',2,['academic','society']],

['on the brink of','phrase','Trend and Comparison','Reading','濒临','about to experience','Several species are on the brink of extinction due to habitat loss and climate change.','由于 habitat loss 和 climate change 几个物种 on the brink of extinction。','semi-formal',4,['academic','environment']],
['at stake','phrase','Argument and Logic','Reading','处于危险中','at risk','With so much at stake governments can no longer afford to delay climate action.','有如此之多 at stake 各国政府再也不能推迟 climate action 了。','semi-formal',3,['academic','environment']],
['hold accountable','phrase','Society and Government','Reading','追究责任','make responsible','Citizens have the right to hold their elected officials accountable for broken promises.','公民有权让 elected official 为 broken promise hold accountable。','formal',4,['academic','politics']],

['put into practice','phrase','Argument and Logic','Writing','付诸实践','actually do','The challenge is not understanding the theory but putting it into practice in real situations.','挑战不在于理解理论而在于在 real situation 中 put into practice。','semi-formal',2,['academic','education']],

// BATCH 14
['acquire','word','Education','Reading','获得','gain','Children acquire language naturally through exposure rather than formal instruction.','儿童通过接触而非正式 instruction 自然地 acquire 语言。','formal',3,['academic','education']],
['retain','word','Education','Reading','保留','keep','Students retain information better when they actively engage with the material.','当学生积极参与 material 时他们更好地 retain 信息。','formal',3,['academic','education']],
['convey','word','Education','Reading','传达','communicate','Graphs and charts can convey complex data more effectively than paragraphs of text.','图表可以比段落文字更有效地 convey complex data。','formal',3,['academic','writing']],
['elaborate','word','Education','Reading','详细说明','explain more','The professor asked the student to elaborate on the point she had raised in class.','教授让学生 elaborate 她在课堂上提出的观点。','formal',3,['academic','education']],
['comprehend','word','Education','Reading','理解','understand fully','The passage was too complex for most readers to comprehend on a first reading.','这段话太 complex 大多数读者第一次阅读时无法 comprehend。','academic',4,['academic','reading']],

['devise','word','Society and Government','Reading','设计','plan','A team of experts was assembled to devise a strategy for reducing urban pollution.','一个专家团队被召集起来 devise 减少 urban pollution 的 strategy。','formal',4,['academic','government']],
['enact','word','Society and Government','Reading','颁布','make into law','The government plans to enact new legislation to protect consumers from online fraud.','政府计划 enact 新的 legislation 以保护消费者免受 online fraud。','formal',5,['academic','law']],
['enforce','word','Society and Government','Reading','执行','make people obey','Laws are only effective if they are properly enforced by the relevant authorities.','法律只有在 relevant authority 妥善 enforce 时才有效。','formal',3,['academic','law']],

['stagnant','word','Trend and Comparison','Reading','停滞的','not growing','Wages have remained stagnant for the past decade while living costs have continued to rise.','过去十年 wages 保持 stagnant 而 living cost 持续上升。','formal',4,['academic','economy']],
['volatile','word','Trend and Comparison','Reading','波动的','unstable','The stock market has been extremely volatile due to political uncertainty in the region.','由于该地区的 political uncertainty stock market 一直 extremely volatile。','formal',5,['academic','finance']],
['erratic','word','Trend and Comparison','Reading','不稳定的','unpredictable','The weather has become increasingly erratic making farming more difficult to plan.','天气变得越来越 erratic 使 farming 更难规划。','formal',4,['academic','environment']],

['distinct','word','Trend and Comparison','Reading','明显的','clearly different','There is a distinct difference between the attitudes of older and younger generations.','老一代和年轻一代的 attitude 之间存在 distinct 差异。','semi-formal',3,['academic','writing']],
['subtle','word','Trend and Comparison','Reading','微妙的','not obvious','There are subtle differences between the two versions that most users would not notice.','两个版本之间存在 subtle 差异大多数用户不会注意到。','semi-formal',3,['academic','writing']],
['nuanced','word','Argument and Logic','Reading','有细微差别的','finely detailed','The issue is more nuanced than news headlines suggest and deserves careful examination.','这个问题比新闻标题所暗示的更 nuanced 值得仔细审视。','academic',5,['academic','reading']],

['trajectory','word','Trend and Comparison','Reading','轨迹','path over time','The current trajectory of carbon emissions is not compatible with international climate goals.','当前的 carbon emission trajectory 不符合 international climate goal。','formal',4,['academic','environment']],
['magnitude','word','Trend and Comparison','Reading','规模','size or extent','The magnitude of the earthquake was measured at 7.2 on the Richter scale.','该 earthquake 的 magnitude 在 Richter scale 上测得为 7.2。','academic',5,['academic','science']],
['scale','word','Trend and Comparison','Reading','规模','size or level','The problem of plastic pollution has reached a scale that demands global cooperation.','plastic pollution 的问题已达到需要 global cooperation 的 scale。','semi-formal',2,['academic','environment']],

['synthesise','word','Science and Research','Reading','综合','combine into a whole','A good literature review synthesises findings from multiple studies to draw broader conclusions.','好的 literature review synthesise 多项研究的发现以得出更广泛的 conclusion。','academic',5,['academic','research']],
['generalise','word','Science and Research','Reading','概括','apply broadly','The sample size was too small to generalise the findings to the wider population.','sample size 太小无法将 findings generalise 到更广泛的人口。','academic',4,['academic','research']],
['isolate','word','Science and Research','Reading','孤立','separate','It is difficult to isolate the effect of diet from other lifestyle factors in health studies.','在 health study 中很难将 diet 的影响从其他 lifestyle factor 中 isolate。','academic',4,['academic','research']],

['migratory pattern','collocation','Science and Research','Reading','迁徙模式','movement over seasons','Climate change is disrupting the migratory patterns of birds and marine animals worldwide.','气候变化正在破坏全球鸟类和海洋动物的 migratory pattern。','academic',5,['academic','science']],
['breeding ground','collocation','Science and Research','Reading','繁殖地','place animals reproduce','Wetlands serve as breeding grounds for numerous species of fish and water birds.','湿地是许多鱼类和水鸟的 breeding ground。','semi-formal',3,['academic','biology']],
['ecosystem service','collocation','Science and Research','Reading','生态系统服务','nature benefit','Forests provide essential ecosystem services including carbon storage and water regulation.','森林提供 essential ecosystem service 包括 carbon storage 和 water regulation。','academic',5,['academic','environment']],

['plausible','word','Argument and Logic','Reading','合理的','believable','The explanation seemed plausible at first but closer examination revealed several flaws.','这个解释起初 seemed plausible 但仔细审查发现了几个 flaws。','academic',5,['academic','reading']],
['coherent','word','Argument and Logic','Reading','连贯的','logically connected','The essay presents a coherent argument supported by relevant examples and evidence.','这篇 essay 提出了一个 coherent argument 并有 relevant example 和 evidence 支持。','academic',4,['academic','writing']],
['pertinent','word','Argument and Logic','Reading','相关的','relevant','The speaker raised several pertinent questions about the long-term viability of the plan.','演讲者提出了几个关于该计划长期 viability 的 pertinent question。','academic',5,['academic','speaking']],

// BATCH 15: Final push to 1000
['shatter','word','Trend and Comparison','Reading','打破','break completely','The new record shattered the previous one by a margin that experts had thought impossible.','新纪录以专家认为不可能的差距 shatter 了之前的纪录。','semi-formal',3,['academic','sport']],
['plummet','word','Trend and Comparison','Reading','骤降','fall sharply','Share prices plummeted after the company issued a warning about lower-than-expected earnings.','在公司发布低于预期 earnings 的警告后股价 plummet。','semi-formal',4,['academic','finance']],
['skyrocket','word','Trend and Comparison','Reading','飙升','rise extremely fast','Property prices have skyrocketed in the city making it unaffordable for most young families.','该市的 property price 已经 skyrocket 使大多数 young family 负担不起。','semi-formal',3,['academic','economy']],
['soar','word','Trend and Comparison','Reading','猛增','fly high','Demand for electric vehicles has soared in response to rising fuel prices and government subsidies.','由于 rising fuel price 和 government subsidy 对 EV 的需求 soar。','semi-formal',3,['academic','environment']],

['adolescent','word','Health and Lifestyle','Reading','青少年','teenager','Adolescent mental health has become a growing public concern in many countries.','adolescent mental health 在许多国家已成为日益增长的 public concern。','formal',4,['academic','health']],
['infant','word','Health and Lifestyle','Reading','婴儿','very young baby','Infant mortality rates have fallen sharply thanks to improved prenatal care and nutrition.','由于 improved prenatal care 和 nutrition infant mortality rate 已大幅下降。','formal',3,['academic','health']],
['toddler','word','Health and Lifestyle','Speaking','学步儿童','young child','Parents of toddlers often struggle to balance childcare with their professional responsibilities.','toddler 的家长经常难以平衡 childcare 和 professional responsibility。','neutral',2,['academic','family']],

['persist','word','Trend and Comparison','Reading','持续','continue despite difficulty','If the symptoms persist for more than a few days you should consult a doctor.','如果症状 persist 超过几天你应该咨询 doctor。','semi-formal',3,['academic','health']],
['withstand','word','Argument and Logic','Reading','承受','resist','The building was designed to withstand earthquakes of up to magnitude eight.','该建筑被设计为 withstand 高达八级的 earthquake。','formal',4,['academic','engineering']],
['endure','word','Argument and Logic','Reading','忍受','suffer patiently','Communities that have endured years of drought are now facing the challenge of rebuilding.','endure 了多年 drought 的 community 现在面临重建的挑战。','formal',4,['academic','environment']],

['turmoil','word','Society and Government','Reading','动荡','great disturbance','The country has experienced years of political turmoil and economic instability.','该国经历了多年的 political turmoil 和 economic instability。','formal',4,['academic','politics']],
['upheaval','word','Society and Government','Reading','剧变','major change','The industrial revolution brought about massive social upheaval as people moved from farms to cities.','industrial revolution 带来了 massive social upheaval 人们从 farm 搬到了 city。','formal',5,['academic','history']],
['strife','word','Society and Government','Reading','冲突','conflict','The region has been plagued by civil strife for much of the past three decades.','该地区在过去三十年的很多时间里一直受到 civil strife 的困扰。','formal',5,['academic','politics']],

['hamper','word','Argument and Logic','Reading','阻碍','hold back','A lack of reliable internet access hampers educational opportunities in remote areas.','缺乏可靠的 internet access hamper remote area 的 educational opportunity。','formal',4,['academic','education']],
['impede','word','Argument and Logic','Reading','妨碍','get in the way','Bureaucratic red tape can impede the implementation of even the best policies.','bureaucratic red tape 甚至可以 impede 最好的 policy 的 implementation。','academic',5,['academic','government']],
['hinder','word','Argument and Logic','Reading','阻碍','make difficult','A fixed mindset can hinder personal growth and limit a person willingness to learn.','fixed mindset 可以 hinder personal growth 并限制一个人学习的意愿。','formal',4,['academic','education']],

['intensify','word','Trend and Comparison','Reading','加剧','become stronger','Competition for university places has intensified as more students apply each year.','随着每年更多学生申请 university place 的 competition 已经 intensify。','formal',3,['academic','education']],
['amplify','word','Technology and Media','Reading','放大','make louder','Social media can amplify both positive messages and harmful misinformation at incredible speed.','social media 可以以惊人的速度 amplify positive message 和 harmful misinformation。','formal',4,['academic','technology']],
['magnify','word','Argument and Logic','Reading','放大','make appear bigger','The media tends to magnify rare events making them seem more common than they actually are.','media 倾向于 magnify rare event 使它们看起来比实际更 common。','formal',4,['academic','media']],

['squander','word','Argument and Logic','Reading','浪费','waste','The country cannot afford to squander its natural resources on short-term economic gains.','该国承担不起为 short-term economic gain 而 squander natural resource 的代价。','formal',5,['academic','environment']],
['conserve','word','Environment and Energy','Reading','节约','save for future','Simple measures like turning off lights can help conserve energy and reduce bills.','简单的 measure 如关灯可以帮助 conserve energy 并减少 bill。','semi-formal',2,['academic','environment']],
['preserve','word','Environment and Energy','Reading','保护','keep safe','National parks were established to preserve areas of natural beauty for future generations.','national park 是为了为 future generation preserve natural beauty 地区而建立的。','semi-formal',2,['academic','environment']],

['symbiotic','word','Science and Research','Reading','共生的','mutually beneficial','The relationship between bees and flowering plants is a classic example of a symbiotic partnership.','bee 和 flowering plant 之间的关系是 symbiotic partnership 的经典例子。','academic',5,['academic','biology']],
['parasitic','word','Science and Research','Reading','寄生的','living off another','Some companies have been accused of having a parasitic relationship with local communities.','一些公司被指控与 local community 有 parasitic 关系。','academic',5,['academic','society']],
['resilient','word','Argument and Logic','Reading','有韧性的','able to recover','Children who grow up in supportive environments tend to be more resilient in adulthood.','在 supportive environment 中长大的孩子在成年后往往更 resilient。','formal',4,['academic','psychology']],

['portray','word','Technology and Media','Reading','描绘','show in a certain way','The documentary portrays the struggles of farmers adapting to climate change.','这部 documentary portray 了适应 climate change 的 farmer 的 struggle。','semi-formal',3,['academic','media']],
['distort','word','Technology and Media','Reading','扭曲','twist out of shape','Selective reporting can distort the public understanding of complex scientific issues.','selective reporting 会 distort 公众对 complex scientific issue 的理解。','formal',4,['academic','media']],
['manipulate','word','Technology and Media','Reading','操纵','control unfairly','The algorithm was designed to manipulate user behaviour and maximise screen time.','该 algorithm 旨在 manipulate user behaviour 并 maximise screen time。','formal',4,['academic','technology']],

['albeit','word','Argument and Logic','Reading','尽管','although','The policy was eventually successful albeit after several years of trial and error.','该 policy 最终取得了成功 albeit 经过了几年的 trial and error。','academic',5,['academic','writing']],
['notwithstanding','word','Argument and Logic','Reading','尽管','in spite of','Notwithstanding the initial cost the long-term benefits of the investment are clear.','notwithstanding 最初的 cost 这笔 investment 的 long-term benefit 是明确的。','academic',5,['academic','writing']],

// BATCH 16
['burden','word','Society and Government','Reading','负担','heavy load','The cost of childcare places a significant financial burden on many working families.','childcare 的成本给许多 working family 带来了 significant financial burden。','semi-formal',3,['academic','society']],
['stigma','word','Society and Government','Reading','污名','social shame','Reducing the stigma around mental health issues is essential for encouraging people to seek help.','减少围绕 mental health issue 的 stigma 对于鼓励人们寻求帮助至关重要。','formal',4,['academic','health']],
['taboo','word','Society and Government','Reading','禁忌','forbidden topic','Discussing personal finances remains something of a taboo in many social circles.','讨论个人 finance 在许多 social circle 中仍然是一种 taboo。','semi-formal',4,['academic','society']],

['equitable','word','Society and Government','Reading','公平的','fair','An equitable distribution of resources is essential for maintaining social harmony.','equitable 的资源 distribution 对于维持 social harmony 至关重要。','formal',4,['academic','society']],
['impartial','word','Society and Government','Reading','公正的','unbiased','Judges must be impartial and base their decisions solely on the evidence presented.','judge 必须 impartial 并仅根据提供的 evidence 做出裁决。','formal',5,['academic','law']],
['arbitrary','word','Society and Government','Reading','武断的','random','Critics argue that the selection process appears arbitrary and lacks transparency.','批评者认为 selection process 显得 arbitrary 且缺乏 transparency。','academic',5,['academic','government']],

['collaborate','word','Education','Reading','合作','work together','Students are encouraged to collaborate on group projects to develop teamwork skills.','鼓励学生 collaborate group project 以培养 teamwork skill。','semi-formal',2,['academic','education']],
['negotiate','word','Society and Government','Reading','谈判','discuss terms','The union is negotiating with management for better working conditions and higher pay.','union 正在与 management negotiate 更好的 working condition 和更高的 pay。','formal',3,['academic','business']],
['mediate','word','Society and Government','Reading','调解','help resolve dispute','A neutral third party was brought in to mediate the dispute between the two companies.','一个 neutral third party 被请来 mediate 两家公司之间的 dispute。','formal',5,['academic','law']],

['predicament','word','Argument and Logic','Reading','困境','difficult situation','Rising costs and falling revenue have left many small businesses in a serious predicament.','rising cost 和 falling revenue 让许多 small business 陷入 serious predicament。','formal',5,['academic','society']],
['dilemma','word','Argument and Logic','Reading','两难','difficult choice','Policymakers face a dilemma between protecting jobs and reducing carbon emissions.','policymaker 面临着保护 jobs 和减少 carbon emission 之间的 dilemma。','semi-formal',4,['academic','government']],
['trade-off','word','Argument and Logic','Reading','权衡','compromise','There is always a trade-off between cost and quality when designing consumer products.','在设计 consumer product 时 cost 和 quality 之间总是存在 trade-off。','semi-formal',3,['academic','business']],

['mitigate','word','Environment and Energy','Reading','缓解','make less severe','Planting more trees in urban areas can help mitigate the effects of heatwaves.','在城市地区种植更多树木可以帮助 mitigate heatwave 的影响。','formal',5,['academic','environment']],
['remedy','word','Society and Government','Reading','补救','fix','There is no quick remedy for deep-rooted social problems such as inequality.','对于 inequality 等 deep-rooted social problem 没有 quick remedy。','formal',4,['academic','society']],
['rectify','word','Society and Government','Reading','纠正','put right','The company has taken steps to rectify the error and ensure it does not happen again.','该公司已采取措施 rectify 该 error 并确保不再发生。','formal',5,['academic','business']],

['affluent','word','Trend and Comparison','Reading','富裕的','wealthy','People in more affluent countries tend to have a larger ecological footprint per person.','更 affluent 国家的人往往人均 ecological footprint 更大。','formal',4,['academic','society']],
['impoverished','word','Trend and Comparison','Reading','贫困的','very poor','Impoverished communities often lack access to basic services such as clean water and healthcare.','impoverished community 通常缺乏清洁水和 healthcare 等 basic service。','formal',4,['academic','society']],
['deprived','word','Trend and Comparison','Reading','贫困的','lacking essentials','Children from deprived backgrounds face greater challenges in accessing higher education.','来自 deprived background 的孩子在获得 higher education 方面面临更大的 challenge。','formal',4,['academic','education']],

['as a rule of thumb','phrase','Argument and Logic','Speaking','一般来说','general guideline','As a rule of thumb you should save at least ten percent of your income for emergencies.','as a rule of thumb 你应将至少百分之十的收入存起来以备 emergency。','neutral',3,['academic','daily']],
['in the long run','phrase','Trend and Comparison','Speaking','从长远看','over time','Eating well and exercising regularly pays off in the long run even if progress feels slow.','健康饮食和定期锻炼 in the long run 会有回报即使进展感觉缓慢。','neutral',2,['academic','daily']],
['on the bright side','phrase','Argument and Logic','Speaking','好的一面','looking at positives','The project was delayed but on the bright side we had more time to test and improve it.','项目被推迟了但 on the bright side 我们有更多时间测试和改进它。','neutral',2,['academic','daily']],
];

let c=0; for(const t of T){if(a(...t))c++}
const updated = data.concat(newItems);
fs.writeFileSync(file, JSON.stringify(updated));
console.log('Added', c, 'items. Total:', updated.length);
