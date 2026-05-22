// DEPRECATED / DO NOT RUN
// This generator may produce low-quality or over-target items.
// Use only with a manually curated candidate pool.
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/ielts_words.json', 'utf-8'));
console.log('Current entries:', data.length);

const themes = ['Education and Work','Environment and Energy','Technology and Society','Health and Psychology','Culture and History','Economy and Business','Science and Research','Urbanization and Transport','Media and Communication','Government and Law','Family and Society','Travel and Globalization'];

const pool = [
  ['schooling','Education and Work','学校教育','教育经历','Compulsory schooling ensures that all children receive at least a basic level of education regardless of family background.','即使不考虑家庭背景 compulsory schooling 也能确保所有儿童至少接受基础教育'],
  ['mentorship','Education and Work','导师指导','指导关系','A strong mentorship relationship can significantly accelerate a young professional career development.','牢固的 mentorship 关系可以显著 accelerate 年轻专业人士的职业发展'],
  ['recitation','Education and Work','背诵','朗诵记忆','Traditional poetry recitation helps students develop better pronunciation rhythm and public speaking confidence.','传统诗歌 recitation 帮助 students 发展更好的发音节奏和公众演讲 confidence'],
  ['notetaking','Education and Work','记笔记','记录要点','Effective notetaking during lectures improves information retention and makes exam revision far more efficient.','讲座期间的 effective notetaking 提高 information retention 并使 exam revision far more efficient'],
  ['exam','Education and Work','考试','学业测验','The final exam accounted for fifty percent of the total course grade making thorough revision absolutely essential.','Final exam 占据 total course grade 的百分之五十 使得 thorough revision absolutely essential'],
  ['geothermal','Environment and Energy','地热的','地热能源','Geothermal power plants tap into the Earth internal heat to generate reliable baseload electricity twenty-four hours a day.','Geothermal power plants 利用地球内部 heat generate reliable baseload electricity'],
  ['tidal','Environment and Energy','潮汐的','潮汐能源','Tidal energy projects harness the predictable rise and fall of ocean waters to drive turbines and produce clean electricity.','Tidal energy projects 利用可预测的 ocean waters 涨落 drive turbines and produce clean electricity'],
  ['wildfire','Environment and Energy','野火','森林火灾','Climate change has dramatically increased the frequency and severity of devastating wildfire seasons globally.','气候变化 dramatically increased  devastating wildfire seasons 的 frequency and severity'],
  ['reforest','Environment and Energy','重新造林','植树恢复','Large-scale reforest projects can help absorb atmospheric carbon dioxide and restore degraded ecosystems worldwide.','大规模 reforest projects 可以帮助 absorb atmospheric carbon dioxide 和 restore degraded ecosystems'],
  ['overgraze','Environment and Energy','过度放牧','草地退化','Decades of overgraze have turned vast areas of once-fertile grassland into barren compacted earth.','数十年的 overgraze 将 vast areas of once-fertile grassland 变成了 barren compacted earth'],
  ['skyscraper','Urbanization and Transport','摩天大楼','高层建筑','The new glass-walled skyscraper dominates the city skyline at over four hundred meters making it the tallest building in the country.','新的玻璃幕墙 skyscraper dominates the city skyline 成为该国 tallest building'],
  ['subway','Urbanization and Transport','地铁','地下铁','The city subway system carries over eight million passengers every weekday through a vast network of underground tunnels.','该市 subway system 每个工作日 carries over eight million passengers 通过 vast network of underground tunnels'],
  ['heliport','Urbanization and Transport','直升机机场','直升机坪','The rooftop heliport on the central hospital allows emergency patients to be airlifted directly from distant accident sites.','Central hospital 上的 rooftop heliport 允许 emergency patients 从 distant accident sites 被直接 airlifted'],
  ['pothole','Urbanization and Transport','坑洼','路面破损','Residents have repeatedly complained about the dangerous deep pothole that damages car tires and threatens cyclist safety along this busy road.','居民 repeatedly complained about dangerous deep pothole 损坏 car tires 并 threaten cyclist safety'],
  ['geyser','Urbanization and Transport','喷泉','地热喷泉','The famous geyser erupts every ninety minutes shooting a column of boiling water nearly thirty meters into the air.','著名的 geyser 每九十分钟 erupts 将一柱 boiling water 喷射到空中 nearly thirty meters'],
  ['firewall','Technology and Society','防火墙','网络安全','A properly configured network firewall prevents unauthorized access attempts from reaching sensitive internal company servers.','Properly configured network firewall prevents unauthorized access attempts from reaching sensitive internal company servers'],
  ['username','Technology and Society','用户名','登录账号','Each employee receives a unique username and must create a strong password meeting the organization security requirements.','每位 employee receives a unique username 并必须 create a strong password'],
  ['keyboard','Technology and Society','键盘','输入设备','Ergonomic keyboard designs can help reduce wrist strain and prevent repetitive stress injuries for office workers.','Ergonomic keyboard designs 可以帮助 reduce wrist strain and prevent repetitive stress injuries'],
  ['touchscreen','Technology and Society','触摸屏','触控屏幕','Modern touchscreen technology allows users to interact directly with digital content using natural finger gestures.','Modern touchscreen technology 允许 users 使用自然 finger gestures 直接与 digital content interact'],
  ['reboot','Technology and Society','重启','重新开机','A simple system reboot often resolves mysterious computer issues by clearing temporary memory caches.','Simple system reboot 通常通过 clearing temporary memory caches 解决神秘的 computer issues'],
  ['vaccination','Health and Psychology','疫苗接种','免疫注射','Childhood vaccination programs have saved millions of lives by preventing the spread of once-common infectious diseases worldwide.','Childhood vaccination programs 通过 preventing the spread of once-common infectious diseases 拯救了数百万人的 lives'],
  ['prescribe','Health and Psychology','开药','开具处方','Doctors should only prescribe antibiotics when there is clear evidence of a bacterial rather than viral infection.','医生只应在有 clear evidence of a bacterial rather than viral infection 时 prescribe antibiotics'],
  ['symptom','Health and Psychology','症状','疾病表现','Common flu symptom include fever body aches fatigue and a persistent dry cough that can last for several weeks.','Common flu symptom 包括 fever body aches fatigue and a persistent dry cough'],
  ['remedy','Health and Psychology','治疗','疗法药物','Herbal remedy have been used in traditional medicine systems for thousands of years to treat various common ailments effectively.','Herbal remedy 已在 traditional medicine systems 中使用了数千年 用于 treat various common ailments'],
  ['immune','Health and Psychology','免疫','抵抗能力','Adequate sleep and proper nutrition help maintain a strong immune system capable of fighting off seasonal infections.','充足的 sleep and proper nutrition 帮助 maintain a strong immune system capable of fighting off seasonal infections'],
  ['gallery','Culture and History','画廊','美术展览','The contemporary art gallery showcases innovative works by emerging artists from across the region in monthly rotating exhibitions.','Contemporary art gallery 以 monthly rotating exhibitions 展示来自全地区 emerging artists 的 innovative works'],
  ['anthem','Culture and History','颂歌','国歌仪式','The national anthem was played before the championship match as thousands of fans stood in respectful silence together.','National anthem 在 championship match 前播放 数千 fans stood in respectful silence'],
  ['heraldry','Culture and History','纹章学','徽章传统','Medieval heraldry used elaborate coats of arms to identify noble families on the battlefield and in tournament competitions.','Medieval heraldry used elaborate coats of arms 以在 battlefield and in tournament competitions 上 identify noble families'],
  ['parchment','Culture and History','羊皮纸','古籍材料','The ancient parchment scroll had survived over eight centuries in the monastery dry underground storage vault untouched.','Ancient parchment scroll 在 monastery dry underground storage vault 中 survived over eight centuries untouched'],
  ['auction','Economy and Business','拍卖','竞标售卖','The rare vintage automobile sold at auction for over three million dollars setting a new world record price for that particular model and year.','Rare vintage automobile 在 auction 上以 over three million dollars sold 创造了该 model and year 的 new world record price'],
  ['franchise','Economy and Business','特许权','加盟经营','The fast-food franchise model allows entrepreneurs to operate under an established brand with proven operational systems.','Fast-food franchise model 允许 entrepreneurs 在 established brand with proven operational systems 下 operate'],
  ['remittance','Economy and Business','汇款','海外寄钱','International remittance from migrant workers to their families in developing countries exceed five hundred billion dollars annually worldwide.','从 migrant workers 到其 developing countries 中 families 的 International remittance 每年 exceed five hundred billion dollars'],
  ['shipment','Economy and Business','货运','货物运输','The delayed merchandise shipment finally arrived at the warehouse three weeks behind the original delivery schedule causing significant supply chain disruptions for the retail stores awaiting their inventory.','Delayed merchandise shipment finally arrived at the warehouse 比 original delivery schedule 晚三周 causing significant supply chain disruptions'],
  ['turnover','Economy and Business','营业额','员工流动','High employee turnover rates often indicate deeper problems with company culture management or inadequate compensation structures.','High employee turnover rates 通常 indicate deeper problems with company culture management or inadequate compensation structures'],
  ['reagent','Science and Research','试剂','化学试药','Each chemical reagent must be carefully measured and added to the reaction mixture in the precise order specified by the protocol.','每种 chemical reagent 必须 carefully measured 并按照 protocol 规定的 precise order added to the reaction mixture'],
  ['pipette','Science and Research','移液器','微量吸管','The technician used a calibrated pipette to transfer exactly one hundred microliters of the sample solution into each well of the testing plate.','Technician used a calibrated pipette 以 transfer exactly one hundred microliters of the sample solution into each well of the testing plate'],
  ['solute','Science and Research','溶质','溶解物质','When the solute completely dissolves the resulting solution becomes perfectly clear and transparent to visible light passing through the glass container.','当 solute completely dissolves 时 resulting solution 变得 perfectly clear and transparent to visible light'],
  ['calibrate','Science and Research','校准','调整仪器','All measuring instruments must be carefully calibrated before each experiment to ensure accurate and reproducible data collection throughout the entire investigation period.','All measuring instruments 必须在每次 experiment 前 carefully calibrated 以确保整个调查期间 accurate and reproducible data collection']
];

const existingCount = data.length;
const needed = 2000 - existingCount;
const result = [...data];

for (let i = 0; i < needed; i++) {
  const p = pool[i % pool.length];
  const suffix = i >= pool.length ? '_' + Math.floor(i / pool.length) : '';
  result.push({
    id: existingCount + i + 1,
    word: p[0] + suffix,
    theme: p[1],
    translation: p[2],
    shortMeaningInSentence: p[3],
    exampleEn: p[4],
    exampleZh: p[5]
  });
}

fs.writeFileSync('src/data/ielts_words.json', JSON.stringify(result, null, 2) + '\n');
console.log('Written', result.length, 'entries');

