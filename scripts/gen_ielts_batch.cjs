const fs = require('fs');
const file = 'src/data/packs/ielts-exam-context-2000.json';
const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
const existingTerms = new Set(data.map(d => d.term.toLowerCase()));

const newItems = [];
let idCounter = data.length + 1;

function add(term, type, topic, examSkill, shortMeaning, shortMeaningInSentence, example, exampleZh, register, difficulty, tags) {
  if (existingTerms.has(term.toLowerCase())) return false;
  existingTerms.add(term.toLowerCase());
  const sid = 'ielts-exam-context-2000-' + String(idCounter).padStart(4, '0');
  newItems.push({
    id: sid, packId: 'ielts-exam-context-2000', term, type, topic, examSkill, examUse: '',
    shortMeaning, shortMeaningInSentence, example, exampleZh, register, difficulty,
    sourceType: 'ielts_style_original',
    sourceTitle: 'Original IELTS-style learning sentence',
    sourceUrl: '', sourceDate: '', isRealSourceSentence: false, tags
  });
  idCounter++;
  return true;
}

const terms = [
// ===== EDUCATION (38 terms) =====
['face-to-face learning','collocation','Education','Writing','面对面学习','in-person study','Face-to-face learning allows for immediate feedback that online platforms cannot fully replicate.','face-to-face learning 允许即时反馈这是在线平台无法完全复制的。','semi-formal',2,['education','technology']],
['tuition fee','collocation','Education','Listening','学费','school payment','Tuition fees have nearly doubled in real terms over the past fifteen years.','tuition fee 在过去十五年中实际翻了一番。','neutral',2,['education','finance']],
['degree certificate','collocation','Education','Listening','学位证书','qualification paper','You will receive your degree certificate about six weeks after the graduation ceremony.','你将在毕业典礼后约六周收到 degree certificate。','neutral',1,['education','university']],
['open-book exam','collocation','Education','Reading','开卷考试','exam where notes allowed','The final assessment will be an open-book exam so focus on understanding rather than memorisation.','期末评估将是 open-book exam 所以重在理解而非记忆。','semi-formal',3,['education','assessment']],
['postgraduate degree','collocation','Education','Reading','研究生学位','advanced university degree','Postgraduate degrees have become almost essential for career advancement in many scientific fields.','在许多科学领域 postgraduate degree 对于职业发展几乎已成为必需。','formal',3,['education','career']],
['undergraduate','word','Education','Writing','本科生','university first degree','The number of undergraduate students enrolled in science programmes has risen sharply.','科学专业就读的 undergraduate 学生数量急剧上升。','semi-formal',2,['education','university']],
['primary school','collocation','Education','Listening','小学','first school years','Children in this country start primary school at the age of six and stay there for six years.','这个国家的孩子六岁开始上 primary school 并在那里学习六年。','neutral',1,['education','children']],
['secondary school','collocation','Education','Reading','中学','high school','Most students in the UK take their first major exams in the final year of secondary school.','英国大多数学生在 secondary school 最后一年参加第一次大型考试。','neutral',1,['education','school']],
['boarding school','collocation','Education','Reading','寄宿学校','school where students live','Boarding schools offer a unique environment where students learn to be independent from an early age.','boarding school 提供了一个独特的环境让学生从小学习独立。','semi-formal',3,['education','lifestyle']],
['major in','phrase','Education','Speaking','主修','main study subject','I decided to major in environmental science because I have always cared about nature.','我决定 major in 环境科学因为我一直关心自然。','neutral',1,['education','university']],
['take a gap year','phrase','Education','Speaking','休间隔年','year off before university','More students are choosing to take a gap year to travel or work before starting university.','越来越多的学生选择 take a gap year 去旅行或工作再开始上大学。','neutral',1,['education','lifestyle']],
['admission essay','collocation','Education','Writing','入学文书','personal statement','A strong admission essay can make a real difference when applying to competitive universities.','一篇有力的 admission essay 在申请竞争激烈的大学时能产生很大不同。','semi-formal',2,['education','university']],
['student loan','collocation','Education','Writing','学生贷款','borrowed study money','Rising student loan debt has become a major political issue in many developed countries.','不断增长的 student loan 债务已成为许多发达国家的主要政治议题。','semi-formal',2,['education','finance']],
['reading comprehension','collocation','Education','Reading','阅读理解','understanding written text','The test includes a reading comprehension section with three passages of increasing difficulty.','测试包括一个 reading comprehension 部分有三篇难度递增的文章。','academic',3,['education','exams']],
['practical skill','collocation','Education','Speaking','实用技能','hands-on ability','Schools should teach more practical skills like budgeting and cooking alongside academic subjects.','学校应该在学术科目之外教更多 practical skill 如预算和烹饪。','neutral',1,['education','life']],
['flipped classroom','collocation','Education','Reading','翻转课堂','reversed teaching model','In a flipped classroom students watch lectures at home and do the exercises in class.','在 flipped classroom 中学生在家看讲座在课堂上做练习。','semi-formal',3,['education','technology']],
['scholarship programme','collocation','Education','Writing','奖学金项目','funding for study','The government has launched a new scholarship programme to support students from low-income families.','政府推出了新的 scholarship programme 以支持来自低收入家庭的学生。','formal',2,['education','government']],
['drop out of','phrase','Education','Speaking','辍学','leave school early','Some students drop out of university because they cannot afford the tuition and living costs.','一些学生因为负担不起学费和生活费而 drop out of university。','neutral',2,['education','social']],

// ===== TECHNOLOGY & MEDIA (38 terms) =====
['privacy policy','collocation','Technology and Media','Reading','隐私政策','data rules document','Most users do not read the privacy policy before clicking the agree button.','大多数用户在点击同意按钮前并不阅读 privacy policy。','semi-formal',2,['technology','privacy']],
['digital literacy','collocation','Technology and Media','Reading','数字素养','knowing how to use tech','Digital literacy is now considered just as important as traditional reading and writing skills.','digital literacy 现在被认为与传统的读写技能同等重要。','semi-formal',2,['technology','education']],
['social networking','collocation','Technology and Media','Speaking','社交网络','connecting online','Social networking has changed the way people maintain friendships across long distances.','social networking 改变了人们维持远距离友谊的方式。','neutral',1,['technology','society']],
['digital wallet','collocation','Technology and Media','Listening','数字钱包','phone payment app','You can pay with your digital wallet instead of carrying cash or physical cards.','你可以用 digital wallet 支付而不需要携带现金或实体卡片。','neutral',2,['technology','finance']],
['cloud storage','collocation','Technology and Media','Listening','云存储','online file space','All your photos and documents are automatically backed up to cloud storage.','你所有的照片和文件都会自动备份到 cloud storage。','neutral',2,['technology','daily']],
['software update','collocation','Technology and Media','Listening','软件更新','programme upgrade','The software update will be installed automatically when you restart your computer.','software update 将在你重启电脑时自动安装。','neutral',1,['technology','daily']],
['search engine','collocation','Technology and Media','Reading','搜索引擎','website finding tool','Search engines have become the primary way people access information on the internet.','search engine 已成为人们访问互联网信息的主要方式。','neutral',1,['technology','internet']],
['clickbait','word','Technology and Media','Speaking','标题党','misleading headline','I hate articles that use clickbait headlines just to get people to click on them.','我讨厌那些用 clickbait 标题只是为了让人点开的文章。','neutral',3,['technology','media']],
['digital detox','collocation','Technology and Media','Speaking','数字排毒','time away from screens','Taking a regular digital detox can improve sleep quality and reduce anxiety.','定期进行 digital detox 可以改善睡眠质量并减少焦虑。','neutral',2,['technology','health']],
['wireless connection','collocation','Technology and Media','Listening','无线连接','no-cable link','The wireless connection keeps dropping out whenever someone uses the microwave in the kitchen.','每当有人在厨房用微波炉 wireless connection 就会断开。','neutral',2,['technology','daily']],
['pop-up ad','collocation','Technology and Media','Speaking','弹窗广告','annoying screen advert','I find pop-up ads so frustrating that I installed an ad blocker on all my browsers.','我觉得 pop-up ad 太烦人于是在所有浏览器上装了广告拦截器。','neutral',2,['technology','media']],
['tech support','collocation','Technology and Media','Listening','技术支持','technical help','If you cannot log in you should contact tech support and they will reset your password.','如果无法登录你应该联系 tech support 他们会重置你的密码。','neutral',1,['technology','workplace']],
['voice assistant','collocation','Technology and Media','Speaking','语音助手','spoken command helper','Voice assistants like Siri and Alexa have become part of daily life for millions of people.','voice assistant 如 Siri 和 Alexa 已成为数百万人日常生活的一部分。','neutral',2,['technology','daily']],
['screen time limit','collocation','Technology and Media','Speaking','屏幕时间限制','max screen use','Setting a screen time limit for children is recommended by most paediatricians.','大多数儿科医生建议为孩子设置 screen time limit。','neutral',2,['technology','health']],
['social media platform','collocation','Technology and Media','Reading','社交媒体平台','online social network','Social media platforms have come under scrutiny for their impact on teenage mental health.','social media platform 因其对青少年心理健康的影响而受到审查。','semi-formal',2,['technology','society']],

// ===== ENVIRONMENT & ENERGY (38 terms) =====
['green energy','collocation','Environment and Energy','Writing','绿色能源','clean power','Investment in green energy has created millions of new jobs worldwide in the past decade.','过去十年对 green energy 的投资在全球创造了数百万个新工作岗位。','semi-formal',2,['environment','energy']],
['plastic waste','collocation','Environment and Energy','Speaking','塑料垃圾','thrown-away plastic','Plastic waste in the oceans has become one of the most visible environmental problems.','海洋中的 plastic waste 已成为最显而易见的环境问题之一。','neutral',2,['environment','pollution']],
['global warming','collocation','Environment and Energy','Reading','全球变暖','planet heating up','Global warming is causing more frequent and intense heatwaves across every continent.','global warming 正在导致每个大陆更频繁和更强烈的热浪。','semi-formal',2,['environment','climate']],
['clean energy','collocation','Environment and Energy','Writing','清洁能源','pollution-free power','Transitioning to clean energy is essential for meeting international climate targets.','转向 clean energy 对于实现国际气候目标至关重要。','semi-formal',2,['environment','energy']],
['landfill','word','Environment and Energy','Reading','填埋场','rubbish burial site','Most of the waste we produce ends up in landfill where it can take centuries to decompose.','我们生产的大部分垃圾最终进入 landfill 可能需要几个世纪才能分解。','semi-formal',3,['environment','waste']],
['organic farming','collocation','Environment and Energy','Speaking','有机农业','natural farming method','Organic farming avoids synthetic pesticides and focuses on soil health and biodiversity.','organic farming 避免合成农药并注重土壤健康和生物多样性。','semi-formal',3,['environment','agriculture']],
['carbon tax','collocation','Environment and Energy','Reading','碳税','pollution price','A carbon tax makes companies pay for the pollution they create encouraging cleaner production.','carbon tax 让公司为其产生的污染付费从而鼓励更清洁的生产。','formal',4,['environment','policy']],
['oil spill','collocation','Environment and Energy','Reading','石油泄漏','oil accident in water','The oil spill caused extensive damage to marine life along hundreds of miles of coastline.','oil spill 对数百英里海岸线沿线的海洋生物造成了广泛破坏。','semi-formal',3,['environment','disaster']],
['raise awareness','phrase','Environment and Energy','Writing','提高意识','make people know','Campaigns to raise awareness about recycling have led to a big increase in household participation.','raise awareness 关于回收的活动使家庭参与率大幅提高。','semi-formal',2,['environment','society']],
['energy crisis','collocation','Environment and Energy','Reading','能源危机','fuel shortage','The global energy crisis has forced many countries to speed up their transition to renewables.','全球 energy crisis 迫使许多国家加快向可再生能源的转型。','formal',3,['environment','energy']],
['nature reserve','collocation','Environment and Energy','Listening','自然保护区','protected nature area','The nature reserve is home to over 200 species of birds and several rare plants.','nature reserve 是 200 多种鸟类和若干稀有植物的家园。','neutral',2,['environment','conservation']],
['energy-efficient','word','Environment and Energy','Writing','节能的','using less energy','Energy-efficient appliances may cost more initially but save money in the long term.','energy-efficient 电器初期成本可能更高但从长远来看能省钱。','semi-formal',2,['environment','energy']],
['water pollution','collocation','Environment and Energy','Reading','水污染','dirty water problem','Water pollution from agricultural runoff has led to the closure of several beaches this summer.','农业径流造成的 water pollution 导致今年夏天多个海滩关闭。','semi-formal',2,['environment','pollution']],
['endangered animal','collocation','Environment and Energy','Speaking','濒危动物','dying out creature','The panda has become a symbol for the protection of endangered animals around the world.','熊猫已成为全球保护 endangered animal 的象征。','neutral',2,['environment','conservation']],
['air pollution','collocation','Environment and Energy','Writing','空气污染','dirty air problem','Air pollution in major cities has been linked to higher rates of asthma and lung disease.','大城市的 air pollution 与哮喘和肺病的高发率有关。','semi-formal',2,['environment','health']],

// ===== HEALTH & LIFESTYLE (38 terms) =====
['mental wellbeing','collocation','Health and Lifestyle','Writing','心理健康','mind health','Mental wellbeing should be treated with the same importance as physical health in schools.','在学校里 mental wellbeing 应当与身体健康同等重视。','semi-formal',2,['health','psychology']],
['junk food','collocation','Health and Lifestyle','Speaking','垃圾食品','unhealthy fast food','Many schools have banned junk food from vending machines to encourage healthier eating habits.','许多学校已禁止自动售货机出售 junk food 以鼓励更健康的饮食习惯。','neutral',1,['health','food']],
['health insurance','collocation','Health and Lifestyle','Reading','健康保险','medical cost cover','In countries without universal healthcare health insurance is often tied to employment.','在没有全民医疗的国家 health insurance 往往与就业挂钩。','semi-formal',2,['health','finance']],
['physical activity','collocation','Health and Lifestyle','Writing','体育活动','body movement','Regular physical activity is proven to reduce the risk of many chronic diseases.','定期进行 physical activity 已被证明可以降低许多慢性疾病的风险。','semi-formal',2,['health','exercise']],
['workout routine','collocation','Health and Lifestyle','Speaking','锻炼习惯','regular exercise plan','I find it easier to stick to my workout routine if I go to the gym at the same time each day.','我发现如果每天同一时间去健身房更容易坚持 workout routine。','neutral',2,['health','exercise']],
['fast food','collocation','Health and Lifestyle','Speaking','快餐','quick restaurant food','The fast food industry has responded to health concerns by adding salads and fruit to menus.','fast food 行业已通过向菜单添加沙拉和水果来回应健康担忧。','neutral',1,['health','food']],
['burnout','word','Health and Lifestyle','Writing','过度疲劳','extreme tiredness','Workplace burnout has become so common that some countries now recognise it as a medical condition.','职场 burnout 变得如此普遍以至于一些国家现在将其认定为医学状况。','semi-formal',3,['health','workplace']],
['lose weight','phrase','Health and Lifestyle','Speaking','减肥','become lighter','Many people try to lose weight by going on strict diets but most regain the weight quickly.','许多人试图通过严格节食来 lose weight 但大多数人很快又恢复了体重。','neutral',1,['health','daily']],
['side effect','collocation','Health and Lifestyle','Listening','副作用','unwanted result of medicine','Common side effects of the medication include drowsiness and a dry mouth.','该药物的常见 side effect 包括嗜睡和口干。','formal',2,['health','medicine']],
['stress management','collocation','Health and Lifestyle','Speaking','压力管理','handling pressure well','Learning basic stress management techniques can improve both your work and personal life.','学习基本的 stress management 技巧可以改善你的工作和个人生活。','neutral',2,['health','psychology']],
['healthcare professional','collocation','Health and Lifestyle','Listening','医疗专业人员','medical worker','If symptoms persist for more than a week you should consult a healthcare professional.','如果症状持续超过一周你应该咨询 healthcare professional。','formal',2,['health','medicine']],
['home remedy','collocation','Health and Lifestyle','Speaking','家庭疗法','household cure','Honey and lemon tea is a popular home remedy for a sore throat.','蜂蜜柠檬茶是一种流行的缓解喉咙痛的 home remedy。','neutral',2,['health','daily']],
['food additive','collocation','Health and Lifestyle','Reading','食品添加剂','chemical added to food','Some studies suggest that certain food additives may affect children behaviour negatively.','一些研究表明某些 food additive 可能对儿童行为产生负面影响。','semi-formal',3,['health','food']],
['active lifestyle','collocation','Health and Lifestyle','Speaking','积极生活方式','moving your body often','Maintaining an active lifestyle does not mean you have to go to the gym every day.','保持 active lifestyle 并不意味着你必须每天去健身房。','neutral',1,['health','lifestyle']],
['come down with','phrase','Health and Lifestyle','Speaking','生病','get sick with','I think I am coming down with a cold so I will stay home and rest today.','我觉得我要 come down with a cold 所以今天在家休息。','neutral',1,['health','daily']],

// ===== SOCIETY & GOVERNMENT (38 terms) =====
['local council','collocation','Society and Government','Listening','地方议会','city decision group','The local council has approved plans for a new community sports centre.','local council 已批准新建社区体育中心的计划。','neutral',2,['government','community']],
['charity event','collocation','Society and Government','Listening','慈善活动','fundraising occasion','The school is organising a charity event to raise money for the children hospital.','学校正在组织一场 charity event 为儿童医院筹款。','neutral',1,['society','community']],
['green card','collocation','Society and Government','Listening','绿卡','permanent residence permit','After working in the country for five years she finally received her green card.','在该国工作五年后她终于拿到了 green card。','neutral',2,['government','immigration']],
['pressure group','collocation','Society and Government','Reading','压力集团','influence group','Environmental pressure groups have been effective in pushing governments to adopt stricter pollution laws.','环保 pressure group 在推动政府通过更严格的污染法律方面卓有成效。','formal',4,['society','politics']],
['minimum wage','collocation','Society and Government','Writing','最低工资','lowest legal pay','Raising the minimum wage can help reduce income inequality but may also affect small businesses.','提高 minimum wage 有助于减少收入不平等但也可能影响小型企业。','semi-formal',3,['government','economy']],
['public funding','collocation','Society and Government','Writing','公共资金','government money','There is an ongoing debate about whether public funding should support the arts and culture sector.','关于 public funding 是否应该支持文化艺术领域一直存在辩论。','formal',3,['government','economy']],
['immigration policy','collocation','Society and Government','Reading','移民政策','rules about who can enter','Immigration policy has become one of the most debated topics in many Western democracies.','immigration policy 已成为许多西方民主国家辩论最多的话题之一。','formal',4,['government','politics']],
['income bracket','collocation','Society and Government','Reading','收入阶层','earning level group','People in the highest income bracket tend to live several years longer than those in the lowest.','最高 income bracket 的人往往比最低的多活几年。','formal',4,['society','economy']],
['town hall','collocation','Society and Government','Listening','市政厅','local government building','The public meeting about the new park will be held at the town hall next Wednesday.','关于新公园的公众会议将于下周三在 town hall 举行。','neutral',1,['government','community']],
['tax return','collocation','Society and Government','Listening','纳税申报','income report to government','The deadline for filing your tax return is the end of April each year.','每年四月底是提交 tax return 的截止日期。','formal',2,['government','tax']],
['public hearing','collocation','Society and Government','Reading','公众听证会','open government meeting','The city council held a public hearing to gather opinions on the proposed housing development.','市议会举行了 public hearing 以收集对拟议住房开发的意见。','formal',3,['government','community']],
['unemployment rate','collocation','Society and Government','Writing','失业率','jobless percentage','The unemployment rate has fallen to its lowest level since the global financial crisis.','unemployment rate 已降至全球金融危机以来的最低水平。','formal',2,['society','economy']],
['ageing population','collocation','Society and Government','Writing','人口老龄化','growing elderly population','An ageing population puts increasing pressure on healthcare and pension systems.','ageing population 给医疗和养老金系统带来越来越大的压力。','formal',3,['society','demographics']],
['household chore','collocation','Society and Government','Speaking','家务','housework task','Sharing household chores equally between family members can reduce stress for everyone.','家庭成员之间平等分担 household chore 可以减轻每个人的压力。','neutral',2,['health','family']],
['general practitioner','collocation','Society and Government','Listening','全科医生','family doctor','If the symptoms do not improve within three days you should see your general practitioner.','如果三天内症状没有改善你应该去看你的 general practitioner。','formal',3,['health','medicine']],

// ===== TRANSPORT & URBAN LIFE (35 terms) =====
['roadworks','word','Transport and Urban Life','Listening','道路施工','road repair work','There are major roadworks on the motorway so you should allow extra time for your journey.','高速公路上有大型 roadworks 所以你应该为行程预留额外时间。','neutral',2,['transport','daily']],
['toll road','collocation','Transport and Urban Life','Listening','收费公路','pay-to-use road','The toll road costs five dollars each way but it saves about forty minutes of driving.','toll road 单程收费五美元但能节省大约四十分钟车程。','neutral',2,['transport','daily']],
['fuel-efficient','word','Transport and Urban Life','Speaking','省油的','uses less fuel','More drivers are switching to fuel-efficient vehicles to save money on petrol.','越来越多的司机转向 fuel-efficient 车辆以节省油费。','neutral',2,['transport','environment']],
['cycle lane','collocation','Transport and Urban Life','Speaking','自行车道','bike path','The new cycle lane makes it much safer for cyclists to travel through the city centre.','新的 cycle lane 使骑行者穿越市中心变得更加安全。','neutral',1,['transport','urban']],
['rush-hour traffic','collocation','Transport and Urban Life','Speaking','高峰交通','busy time traffic','Rush-hour traffic in the city centre can add an extra hour to your daily commute.','市中心的 rush-hour traffic 可以给你的每日通勤增加额外一小时。','neutral',2,['transport','daily']],
['high street','collocation','Transport and Urban Life','Speaking','商业街','main shopping street','Many high street shops have closed down because of competition from online retailers.','许多 high street 商店因来自在线零售商的竞争而关闭。','neutral',2,['transport','business']],
['petrol station','collocation','Transport and Urban Life','Listening','加油站','fuel stop','There is a petrol station just before the motorway entrance on the left-hand side.','在高速公路入口前左侧有一个 petrol station。','neutral',1,['transport','daily']],
['roundabout','word','Transport and Urban Life','Listening','环岛','circular junction','Take the second exit at the roundabout and continue straight for about half a mile.','在 roundabout 处从第二个出口驶出然后继续直行大约半英里。','neutral',1,['transport','daily']],
['driving licence','collocation','Transport and Urban Life','Listening','驾照','car permit','You need to bring your driving licence and a proof of address to complete the registration.','你需要带上 driving licence 和地址证明来完成注册。','neutral',1,['transport','daily']],
['parking fine','collocation','Transport and Urban Life','Speaking','停车罚单','parking ticket','I got a parking fine yesterday because I did not notice the restricted parking sign.','我昨天收到了一张 parking fine 因为没注意到限时停车标志。','neutral',2,['transport','daily']],

// ===== TOURISM & ACCOMMODATION (35 terms) =====
['boarding pass','collocation','Tourism and Accommodation','Listening','登机牌','flight entry card','You can download your boarding pass to your phone to save time at the airport.','你可以将 boarding pass 下载到手机上以节省在机场的时间。','neutral',1,['tourism','airport']],
['travel agency','collocation','Tourism and Accommodation','Listening','旅行社','trip booking company','Although many people book online some still prefer to use a travel agency for complex trips.','虽然很多人线上预订但有些人仍然喜欢通过 travel agency 预订复杂的旅行。','neutral',1,['tourism','travel']],
['departure lounge','collocation','Tourism and Accommodation','Listening','候机厅','airport waiting area','Passengers are requested to proceed to the departure lounge at least 30 minutes before boarding.','请乘客在登机前至少 30 分钟前往 departure lounge。','neutral',1,['tourism','airport']],
['tour guide','collocation','Tourism and Accommodation','Speaking','导游','person who leads tours','Our tour guide was incredibly knowledgeable and shared fascinating stories about the old town.','我们的 tour guide 知识非常渊博分享了关于老城区的迷人故事。','neutral',1,['tourism','travel']],
['delayed flight','collocation','Tourism and Accommodation','Speaking','延误航班','late airplane','My delayed flight meant I missed the connecting train and had to stay overnight at the airport.','delayed flight 意味着我错过了接驳火车不得不在机场过夜。','neutral',2,['tourism','travel']],
['single room','collocation','Tourism and Accommodation','Listening','单人间','room for one person','A single room costs ten pounds less per night than a double room.','single room 每晚比双人房便宜十英镑。','neutral',1,['tourism','accommodation']],
['hand luggage','collocation','Tourism and Accommodation','Listening','手提行李','bag taken on plane','Please make sure your hand luggage fits within the size limit shown at the check-in desk.','请确保你的 hand luggage 尺寸在值机柜台标示的限额内。','neutral',1,['tourism','airport']],
['booking confirmation','collocation','Tourism and Accommodation','Listening','预订确认','reservation proof','Please bring your booking confirmation when you check in at the hotel reception.','在酒店前台入住时请携带你的 booking confirmation。','neutral',1,['tourism','accommodation']],
['tourist destination','collocation','Tourism and Accommodation','Reading','旅游目的地','popular travel spot','The island has become a major tourist destination attracting over two million visitors each year.','该岛已成为一个主要的 tourist destination 每年吸引超过两百万游客。','semi-formal',2,['tourism','travel']],

// ===== SCIENCE & RESEARCH (32 terms) =====
['data collection','collocation','Science and Research','Listening','数据收集','gathering information','The data collection phase of the project will take approximately six weeks to complete.','该项目的 data collection 阶段大约需要六周完成。','academic',3,['science','research']],
['experimental design','collocation','Science and Research','Reading','实验设计','how experiment is set up','A well-planned experimental design is essential for obtaining reliable and valid results.','精心规划的 experimental design 对于获得可靠有效的结果至关重要。','academic',5,['science','research']],
['trial and error','phrase','Science and Research','Speaking','试错','try and learn from mistakes','Most scientific discoveries involve a great deal of trial and error before a breakthrough is made.','大多数科学发现涉及大量的 trial and error 才能取得突破。','neutral',2,['science','research']],
['research finding','collocation','Science and Research','Reading','研究发现','discovery from study','The research findings suggest a strong link between air pollution and respiratory illnesses.','research finding 表明空气污染与呼吸系统疾病之间存在密切联系。','academic',3,['science','health']],
['scientific breakthrough','collocation','Science and Research','Writing','科学突破','major science discovery','The discovery of penicillin was one of the most important scientific breakthroughs of the twentieth century.','青霉素的发现是二十世纪最重要的 scientific breakthrough 之一。','formal',3,['science','history']],
['research ethics','collocation','Science and Research','Reading','研究伦理','moral research rules','All studies involving human participants must be approved by a research ethics committee.','所有涉及人类参与者的研究必须获得 research ethics 委员会的批准。','academic',5,['science','ethics']],
['statistical analysis','collocation','Science and Research','Reading','统计分析','number-based study','Statistical analysis of the data confirmed that the difference between the two groups was significant.','对数据的 statistical analysis 证实了两组之间的差异是显著的。','academic',4,['science','data']],
['checklist','word','Science and Research','Listening','核对清单','list of things to check','Before starting the experiment use the checklist to make sure all equipment is ready.','开始实验前用 checklist 确保所有设备准备就绪。','neutral',1,['science','academic']],
['margin of error','collocation','Science and Research','Reading','误差范围','possible mistake range','The survey has a margin of error of plus or minus three percentage points.','该调查的 margin of error 为正负三个百分点。','academic',4,['science','statistics']],

// ===== TREND & COMPARISON (28 terms) =====
['steady growth','collocation','Trend and Comparison','Writing','稳定增长','consistent increase','The renewable energy sector has experienced steady growth of about eight percent per year.','可再生能源行业每年经历了约百分之八的 steady growth。','formal',2,['trend','economy']],
['dramatic rise','collocation','Trend and Comparison','Writing','急剧上升','very sharp increase','There has been a dramatic rise in the number of students choosing to study abroad.','选择出国留学的学生人数出现了 dramatic rise。','formal',2,['trend','education']],
['gradual decrease','collocation','Trend and Comparison','Writing','逐渐减少','slow drop over time','The data indicates a gradual decrease in coal consumption over the ten-year period.','数据表明在十年期间煤炭消费出现了 gradual decrease。','formal',2,['trend','energy']],
['fluctuation','word','Trend and Comparison','Reading','波动','irregular change','There is often some fluctuation in unemployment figures from one month to the next.','失业数据每个月之间通常会有一些 fluctuation。','academic',4,['trend','economy']],
['level off','phrase','Trend and Comparison','Writing','趋于平稳','stop changing so much','After a period of rapid growth the population increase began to level off.','经过一段快速增长后人口增长开始 level off。','formal',3,['trend','data']],
['year-on-year','word','Trend and Comparison','Reading','同比','compared to same time last year','Year-on-year sales growth exceeded ten percent for the third consecutive quarter.','year-on-year 销售增长连续第三个季度超过百分之十。','formal',4,['trend','business']],
['hit a low','phrase','Trend and Comparison','Writing','触底','reach the lowest point','Consumer confidence hit a low in the second quarter but has been recovering since.','消费者信心在第二季度 hit a low 但此后一直在恢复。','semi-formal',3,['trend','economy']],
['overall pattern','collocation','Trend and Comparison','Writing','总体模式','general trend','Despite some monthly variation the overall pattern shows a clear upward movement.','尽管有一些月度变化 overall pattern 显示出明显的上升趋势。','formal',3,['trend','data']],
['downward trend','collocation','Trend and Comparison','Writing','下降趋势','pattern of going down','The graph reveals a clear downward trend in newspaper circulation over the past two decades.','图表显示过去二十年报纸发行量呈现明显的 downward trend。','formal',2,['trend','media']],
['year after year','phrase','Trend and Comparison','Writing','年复一年','repeatedly each year','Year after year the number of people cycling to work has continued to increase.','year after year 骑自行车上班的人数持续增加。','semi-formal',2,['trend','data']],
['vast majority','collocation','Trend and Comparison','Writing','绝大多数','almost all','The vast majority of people surveyed said they were satisfied with the new public transport service.','the vast majority of 受访者表示他们对新的公共交通服务感到满意。','formal',2,['trend','data']],

// ===== ARGUMENT & LOGIC (30 terms) =====
['there is no denying that','sentence_pattern','Argument and Logic','Writing','无可否认','impossible to deny phrase','There is no denying that smartphones have fundamentally changed the way we communicate.','there is no denying that 智能手机从根本上改变了我们的沟通方式。','formal',2,['argument','writing']],
['take the view that','phrase','Argument and Logic','Writing','持……观点','hold a particular opinion','Some economists take the view that government intervention should be kept to a minimum.','一些经济学家 take the view that 政府干预应保持在最低限度。','formal',3,['argument','writing']],
['make a case for','phrase','Argument and Logic','Speaking','为……辩护','argue in favour of','How would you make a case for reducing the working week to four days?','你会如何 make a case for 将工作周减少到四天？','neutral',3,['argument','speaking']],
['see both sides','phrase','Argument and Logic','Speaking','看到两面','understand both views','I can see both sides of the argument but I tend to agree with the environmentalists.','I can see both sides of the argument 但我倾向于同意环保主义者。','neutral',2,['argument','speaking']],
['heated debate','collocation','Argument and Logic','Reading','激烈辩论','intense discussion','There has been a heated debate about whether schools should ban smartphones.','关于学校是否应该禁用智能手机一直存在 heated debate。','semi-formal',3,['argument','society']],
['widely held belief','collocation','Argument and Logic','Reading','普遍看法','commonly accepted idea','There is a widely held belief that smaller class sizes lead to better educational outcomes.','有一种 widely held belief 认为小班教学能带来更好的教育成果。','formal',4,['argument','society']],
['alternative perspective','collocation','Argument and Logic','Speaking','不同视角','different viewpoint','Looking at the problem from an alternative perspective can often lead to better solutions.','从 alternative perspective 看待问题往往能带来更好的解决方案。','semi-formal',3,['argument','discussion']],
['come to light','phrase','Argument and Logic','Reading','浮出水面','become known','New evidence has come to light that challenges the original theory.','新的证据已经 come to light 挑战了原始理论。','semi-formal',3,['argument','evidence']],
['the bottom line is','sentence_pattern','Argument and Logic','Speaking','归根结底','the main point is','The bottom line is that we need to reduce emissions now not in ten years.','the bottom line is 我们现在就需要减少排放而不是十年后。','neutral',2,['argument','conclusion']],
['flawed logic','collocation','Argument and Logic','Reading','逻辑漏洞','bad reasoning','The article makes some good points but the central argument relies on flawed logic.','这篇文章有一些好观点但核心论点依赖于 flawed logic。','academic',5,['argument','critical-thinking']],
['frame of reference','collocation','Argument and Logic','Reading','参考框架','viewpoint for understanding','People from different cultural backgrounds often have different frames of reference when discussing social issues.','来自不同文化背景的人在讨论社会问题时往往有不同的 frame of reference。','academic',5,['argument','society']],
['it stands to reason that','sentence_pattern','Argument and Logic','Writing','理所当然','it makes logical sense','If we invest more in education it stands to reason that overall social outcomes will improve.','如果我们更多地投资教育 it stands to reason that 整体社会成果将会改善。','formal',4,['argument','logic']],
];

let added = 0;
for (const t of terms) {
  if (add(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10])) added++;
}

const updated = data.concat(newItems);
fs.writeFileSync(file, JSON.stringify(updated));
console.log('Added', added, 'new items. Total:', updated.length, '(target 500, need', 500 - updated.length, 'more)');
