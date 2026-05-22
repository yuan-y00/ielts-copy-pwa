// DEPRECATED / DO NOT RUN
// This generator may produce low-quality or over-target items.
// Use only with a manually curated candidate pool.
const fs=require('fs');
const file='src/data/packs/foreign-trade-crowdfunding-dtc-operations-1000.json';
const data=JSON.parse(fs.readFileSync(file,'utf-8'));
const existing=new Set(data.map(d=>d.term.toLowerCase()));
let id=data.length,added=0,skipped=0;

const FF={};
function add(term,pos,sm,sis,topic,bizStage,work,ex,ez,diff,tags,type='phrase',reg='neutral'){
  if(existing.has(term.toLowerCase())){skipped++;return;}
  existing.add(term.toLowerCase());id++;
  data.push({id:'foreign-trade-crowdfunding-dtc-operations-1000-'+String(id).padStart(4,'0'),packId:'foreign-trade-crowdfunding-dtc-operations-1000',term,type,partOfSpeech:pos,topic,businessStage:bizStage||'',workIntent:work||'',shortMeaning:sm,shortMeaningInSentence:sis,example:ex,exampleZh:ez,register:reg,difficulty:diff||2,sourceType:'foreign_trade_dtc_style_original',sourceTitle:'Original foreign trade DTC learning sentence',sourceUrl:'',sourceDate:'',isRealSourceSentence:false,tags:tags||['dtc'],fullForm:FF[term]||undefined});
  added++;
}

console.log('Starting from',data.length,'need',1000-data.length,'more');

// Framework: term + natural sentence + clean zh
// Each ZH has ONLY the target term in English (plus allowlist exceptions like platform names)

// === CROWDFUNDING ===
add('crowdfunding platform','noun_phrase','众筹平台','fundraising platform','Crowdfunding Campaign','pre-launch','choose','We chose this crowdfunding platform because its audience matches our product category.','我们选择这个 crowdfunding platform 是因为其受众与我们的产品类别匹配。',1,['crowdfunding','platform']);
add('campaign teaser','noun_phrase','活动预告','campaign teaser','Crowdfunding Campaign','pre-launch','build hype','The campaign teaser video has over 20000 views on social media already.','campaign teaser 视频在社交媒体上已经有超过两万次观看了。',1,['crowdfunding','marketing']);
add('backer referral reward','noun_phrase','支持者推荐奖励','referral incentive','Crowdfunding Campaign','campaign live','incentivise','The backer referral reward gives five dollars credit for every new backer you bring in.','backer referral reward 为你带来的每位新支持者提供五美元积分。',2,['crowdfunding','growth']);
add('live backer count','noun_phrase','实时支持者数','real-time count','Crowdfunding Campaign','campaign live','display','The live backer count on the page updates every few seconds and creates social proof.','页面上的 live backer count 每隔几秒更新一次制造社会证明。',1,['crowdfunding','social']);
add('campaign FAQ','noun_phrase','活动常见问题','campaign questions','Crowdfunding Campaign','pre-launch','inform','The campaign FAQ should answer shipping timeline return policy and product specs clearly.','campaign FAQ 应该清晰回答发货时间线退货政策和产品规格。',1,['crowdfunding','content']);
add('spotlight section','noun_phrase','亮点展示区','featured area','Crowdfunding Campaign','campaign live','highlight','We added a spotlight section showing the best backer reviews and photos.','我们添加了一个 spotlight section 展示最好的支持者评价和照片。',2,['crowdfunding','content']);
add('pledge confirmation page','noun_phrase','认缴确认页','after-pledge page','Crowdfunding Campaign','campaign live','confirm','The pledge confirmation page thanks backers and suggests sharing the campaign.','pledge confirmation page 感谢支持者并建议分享活动。',1,['crowdfunding','ux']);

// === BACKER COMMUNICATION ===
add('backer announcement','noun_phrase','支持者公告','official update','Backer Communication','post-campaign fulfillment','announce','The backer announcement about the colour delay was posted with a clear apology and new timeline.','关于颜色延迟的 backer announcement 发布了并附有明确道歉和新的时间线。',1,['communication','announcement']);
add('update comment','noun_phrase','更新评论','comment on update','Backer Communication','campaign live','engage','We reply to every update comment because it shows backers we are listening.','我们回复每条 update comment 因为这表明我们在倾听支持者。',1,['communication','engagement']);
add('backer feedback loop','noun_phrase','支持者反馈循环','feedback cycle','Backer Communication','post-campaign fulfillment','improve','The backer feedback loop helped us catch a packaging issue before most units shipped.','backer feedback loop 帮助我们在大多数产品发货前发现了一个包装问题。',2,['communication','process']);
add('community post','noun_phrase','社群帖子','community message','Backer Communication','campaign live','inform','The community post on Friday shared photos from the assembly line and answered top questions.','周五的 community post 分享了装配线的照片并回答了热门问题。',1,['communication','community']);

// === SHOPIFY / DTC ===
add('site navigation','noun_phrase','网站导航','menu structure','Shopify / DTC Store','dtc store operation','improve','The site navigation was confusing so we simplified it to just four main categories.','site navigation 令人困惑所以我们将其简化为仅四个主要类别。',1,['dtc','ux']);
add('mobile store','noun_phrase','移动店铺','phone store','Shopify / DTC Store','dtc store operation','optimise','The mobile store loads in under two seconds which is critical for our social media traffic.','mobile store 在两秒内加载这对我们的社交媒体流量至关重要。',2,['dtc','technical']);
add('store password','noun_phrase','店铺密码','password protection','Shopify / DTC Store','dtc store operation','control','We keep the store password on until the launch day to build anticipation.','我们保持 store password 开启直到上线日以营造期待感。',1,['dtc','operations']);
add('product inventory','noun_phrase','产品库存','item stock','Shopify / DTC Store','dtc store operation','track','Product inventory is synced in real time between Shopify and our warehouse system.','product inventory 在 Shopify 和我们的仓库系统之间实时同步。',2,['dtc','operations']);
add('cart page','noun_phrase','购物车页','cart page','Shopify / DTC Store','dtc store operation','optimise','The cart page should show the estimated shipping cost before the customer goes to checkout.','cart page 应该在客户去结账之前显示预计运费。',1,['dtc','ux']);
add('order note','noun_phrase','订单备注','customer note','Shopify / DTC Store','dtc store operation','collect info','The order note field lets customers add gift messages or special delivery instructions.','order note 字段让客户可以添加礼品留言或特殊配送说明。',1,['dtc','ux']);
add('store currency','noun_phrase','店铺币种','pricing currency','Shopify / DTC Store','dtc store operation','configure','The store currency is set to USD but we show approximate prices in local currency too.','store currency 设为美元但我们也显示当地货币的近似价格。',2,['dtc','technical']);
add('draft order','noun_phrase','草稿订单','manual order','Shopify / DTC Store','dtc store operation','create','We create a draft order for wholesale customers who email us instead of ordering online.','我们为通过邮件下单而非在线下单的批发客户创建 draft order。',2,['dtc','operations']);

// === ADS / ACQUISITION ===
add('ad mockup','noun_phrase','广告样稿','ad draft','Ads / Acquisition','paid acquisition','design','We shared the ad mockup with the team for feedback before sending it to production.','我们把 ad mockup 发给团队征求意见然后再送去制作。',1,['ads','content']);
add('audience size','noun_phrase','受众规模','how many people','Ads / Acquisition','paid acquisition','estimate','The audience size for this targeting is about 2 million which is large enough for testing.','这个定向的 audience size 约为两百万足够进行测试。',1,['ads','targeting']);
add('conversion window','noun_phrase','转化窗口','attribution period','Ads / Acquisition','paid acquisition','configure','The conversion window is set to 7 days after click because most purchases happen within a week.','conversion window 设为点击后七天因为大多数购买发生在一周内。',2,['ads','technical']);
add('ad preview','noun_phrase','广告预览','ad appearance','Ads / Acquisition','paid acquisition','check','The ad preview shows how the creative will look in different placements across devices.','ad preview 展示了素材在不同设备和版位上的样子。',1,['ads','content']);
add('engagement rate','noun_phrase','互动率','interaction percentage','Ads / Acquisition','paid acquisition','measure','The engagement rate on the video ad is four times higher than the image ad.','视频广告的 engagement rate 比图片广告高出四倍。',1,['ads','metrics']);
add('click fraud','noun_phrase','点击欺诈','fake clicks','Ads / Acquisition','paid acquisition','prevent','We monitor for click fraud by checking if clicks come from the same IP in a short time.','我们通过检查短时间内的相同 IP 点击来监控 click fraud。',3,['ads','technical']);
add('ad policy','noun_phrase','广告政策','platform ad rules','Ads / Acquisition','paid acquisition','comply','The ad was rejected because it violated the platform ad policy on health claims.','广告被拒了因为违反了平台关于健康声明的 ad policy。',2,['ads','compliance']);

// === EMAIL / CRM ===
add('email nurture','noun_phrase','邮件培育','nurture sequence','Email / CRM','email marketing','build relationship','The email nurture sequence educates new subscribers about the problem before pitching the product.','email nurture 序列在推销产品之前先教育新订阅者了解问题。',2,['email','strategy']);
add('sender name','noun_phrase','发件人名称','from name','Email / CRM','email marketing','personalise','We changed the sender name from the brand to the founder and the open rate increased.','我们把 sender name 从品牌名改为了创始人名字打开率提高了。',1,['email','content']);
add('call to action','noun_phrase','行动号召','action prompt','Email / CRM','email marketing','drive action','The call to action button should say something specific like get your discount not just click here.','call to action 按钮应该说具体的内容比如获取你的优惠而不只是点击这里。',1,['email','content']);
add('unsubscribe link','noun_phrase','退订链接','opt-out link','Email / CRM','email marketing','comply','Every email must have a working unsubscribe link to comply with anti-spam laws.','每封邮件必须有可用的 unsubscribe link 以符合反垃圾邮件法规。',1,['email','legal']);
add('email delay','noun_phrase','邮件延迟','send delay','Email / CRM','email marketing','configure','We set an email delay of one hour between the cart reminder and the discount offer.','我们在购物车提醒和折扣优惠之间设置了一小时的 email delay。',2,['email','automation']);
add('birthday email','noun_phrase','生日邮件','birthday offer','Email / CRM','email marketing','delight','The birthday email gives customers a special discount during their birthday month.','birthday email 在客户生日当月为他们提供特别折扣。',1,['email','loyalty']);

// === CUSTOMER SUPPORT ===
add('support agent','noun_phrase','客服人员','support staff member','Customer Support','customer support','staff','Each support agent handles about forty tickets per day during normal periods.','正常时期每位 support agent 每天处理大约四十个工单。',1,['support','team']);
add('resolution time','noun_phrase','解决时间','time to solve','Customer Support','customer support','measure','The average resolution time dropped after we created the knowledge base for common issues.','我们为常见问题创建知识库后平均 resolution time 下降了。',1,['support','metrics']);
add('customer message','noun_phrase','客户消息','client message','Customer Support','customer support','receive','Every customer message gets an auto-reply confirming receipt and a real reply within hours.','每条 customer message 都会收到自动确认回复并在几小时内收到真实回复。',1,['support','communication']);
add('order issue','noun_phrase','订单问题','purchase problem','Customer Support','customer support','resolve','The most common order issue is a mismatch between what was ordered and what arrived.','最常见的 order issue 是订单内容与实际收到的不符。',1,['support','issues']);
add('warranty period','noun_phrase','保修期','guarantee duration','Customer Support','customer support','define','The warranty period starts from the delivery date not the order date.','warranty period 从送达日期而不是下单日期开始计算。',2,['support','policy']);
add('support portal','noun_phrase','支持门户','help website','Customer Support','customer support','provide','The support portal lets customers track their ticket status and read help articles.','support portal 让客户可以追踪工单状态并阅读帮助文章。',1,['support','tools']);

// === LOGISTICS / FULFILLMENT ===
add('dispatch notice','noun_phrase','发货通知','shipment alert','Fulfillment / Logistics','logistics','inform','The dispatch notice email includes the tracking number carrier name and estimated arrival date.','dispatch notice 邮件包含追踪号承运商名称和预计到达日期。',1,['logistics','communication']);
add('warehouse receipt','noun_phrase','仓库收据','goods receipt','Fulfillment / Logistics','logistics','confirm','The warehouse receipt confirms that the goods arrived in good condition and the count matches.','warehouse receipt 确认货物完好到达且数量相符。',2,['logistics','documentation']);
add('pickup window','noun_phrase','取件时间段','carrier pickup time','Fulfillment / Logistics','logistics','schedule','The pickup window is between 3pm and 5pm so all orders must be packed by 2.','pickup window 在下午三点到五点之间所以所有订单必须在两点前打包完毕。',1,['logistics','operations']);
add('storage fee','noun_phrase','仓储费','warehouse storage cost','Fulfillment / Logistics','logistics','calculate','The storage fee is charged per pallet per month after the first 30 days of free storage.','storage fee 在免费仓储 30 天后按每个托盘每月收费。',2,['logistics','finance']);
add('shipping volume','noun_phrase','发货量','dispatch quantity','Fulfillment / Logistics','logistics','measure','Shipping volume doubled during the holiday season and the 3PL added a second shift.','假日季期间 shipping volume 翻了一番 3PL 增加了第二个班次。',2,['logistics','metrics']);
add('delivery exception','noun_phrase','派送异常','delivery problem','Fulfillment / Logistics','logistics','handle','A delivery exception was flagged when the carrier could not access the building on the first attempt.','当承运商首次尝试无法进入大楼时 delivery exception 被标记了。',2,['logistics','operations']);

// === SUPPLIER / FOREIGN TRADE ===
add('supplier catalogue','noun_phrase','供应商目录','factory product list','Supplier / Foreign Trade','supplier communication','source','We browsed the supplier catalogue and shortlisted three factories that match our requirements.','我们浏览了 supplier catalogue 并初选了符合我们要求的三家工厂。',1,['supplier','sourcing']);
add('quality report','noun_phrase','质量报告','inspection report','Supplier / Foreign Trade','supplier communication','document','The quality report from the third-party inspector showed a defect rate of under one percent.','第三方质检员的 quality report 显示不良率低于百分之一。',2,['supplier','quality']);
add('supplier deadline','noun_phrase','供应商截止日','factory deadline','Supplier / Foreign Trade','supplier communication','track','The supplier deadline for the first batch is next Friday and so far everything is on track.','第一批的 supplier deadline 是下周五目前一切按计划进行。',1,['supplier','planning']);
add('material shortage','noun_phrase','材料短缺','lack of material','Supplier / Foreign Trade','supplier communication','report','A material shortage of the specific plastic resin delayed the production by about ten days.','特定塑料树脂的 material shortage 将生产延迟了大约十天。',2,['supplier','production']);
add('shipping route','noun_phrase','运输路线','delivery route','Supplier / Foreign Trade','supplier communication','plan','The shipping route from the factory to the port takes about two hours by truck.','从工厂到港口的 shipping route 卡车大约需要两小时。',2,['supplier','logistics']);
add('factory output','noun_phrase','工厂产量','production volume','Supplier / Foreign Trade','supplier communication','track','The factory output is about 500 units per day on a single shift.','单班制下的 factory output 约为每天 500 个单位。',1,['supplier','production']);
add('trade agreement','noun_phrase','贸易协定','trade deal','Supplier / Foreign Trade','supplier communication','utilise','The trade agreement between the two countries reduces the tariff from twelve percent to zero.','两国之间的 trade agreement 将关税从百分之十二降为零。',4,['supplier','international']);
add('import clearance','noun_phrase','进口清关','import customs','Supplier / Foreign Trade','supplier communication','process','Import clearance usually takes three to five business days if all paperwork is correct.','如果所有文件正确 import clearance 通常需要三到五个工作日。',3,['supplier','international']);

// === MORE VERBS ===
add('discount','verb','打折','reduce price','Shopify / DTC Store','dtc store operation','drive sales','We discounted the older version by thirty percent when the updated model launched.','我们在更新型号上线时将旧版 discount 了百分之三十。',1,['dtc','verb'],'word');
add('whitelist','verb','加入白名单','add to safe list','Email / CRM','email marketing','ensure delivery','Ask customers to whitelist our sending domain so our emails do not go to spam.','请客户 whitelist 我们的发送域这样邮件就不会进垃圾箱。',2,['email','verb'],'word');
add('pre-stock','verb','预存库存','stock in advance','Fulfillment / Logistics','logistics','prepare','We pre-stocked the US warehouse with 2000 units before the campaign even went live.','我们在活动上线前就向美国仓库 pre-stock 了 2000 个单位。',2,['logistics','verb'],'word');
add('geo-target','verb','地理定向','target by location','Ads / Acquisition','paid acquisition','specify','We geo-targeted the ads to five major cities where our shipping costs are lowest.','我们 geo-targeted 广告到五个运费最低的主要城市。',2,['ads','verb'],'word');
add('hand-check','verb','手动检查','inspect manually','Supplier / Foreign Trade','supplier communication','verify','We hand-checked every unit from the first batch before approving mass production.','在批准量产之前我们 hand-checked 第一批的每个产品。',2,['supplier','verb'],'word');

// === MORE PHRASAL VERBS ===
add('push through','phrasal_verb','推进','force through','Supplier / Foreign Trade','supplier communication','expedite','We pushed through the order despite the holiday closure by paying a rush fee.','我们通过支付加急费 push through 了订单尽管正值假期关闭。',2,['supplier','phrasal_verb'],'phrase');
add('stock up','phrasal_verb','备货','accumulate stock','Fulfillment / Logistics','logistics','prepare','We stock up on packaging materials every quarter to get a better bulk price.','我们每季度 stock up 包装材料以获得更好的批量价格。',1,['logistics','phrasal_verb'],'phrase');
add('tick off','phrasal_verb','勾选完成','mark complete','Supplier / Foreign Trade','supplier communication','confirm','We tick off each item on the spec sheet after the quality inspector confirms it passes.','质量检查员确认通过后我们 tick off 规格表上的每一项。',1,['supplier','phrasal_verb'],'phrase');
add('close out','phrasal_verb','清仓结束','sell remaining','Shopify / DTC Store','dtc store operation','finish','We closed out the old inventory at a deep discount before the new collection arrived.','我们在新系列到货前以大幅折扣 close out 了旧库存。',2,['dtc','phrasal_verb'],'phrase');
add('trial run','phrasal_verb','试运行','test run','Supplier / Foreign Trade','supplier communication','test','We asked the factory to do a trial run of 100 units before we commit to a larger order.','我们要求工厂进行 100 个单位的 trial run 然后再承诺更大订单。',2,['supplier','phrasal_verb'],'phrase');

// === MORE ADJECTIVES ===
add('conversion-optimised','adjective','转化优化过的','built for conversion','Shopify / DTC Store','dtc store operation','describe','The conversion-optimised product page has all the elements that build trust and reduce friction.','conversion-optimised 产品页有所有建立信任和减少阻力的元素。',2,['dtc','adjective'],'word');
add('subscription-ready','adjective','可订阅的','subscription capable','Shopify / DTC Store','dtc store operation','design','The product is subscription-ready so customers can receive a refill every month automatically.','该产品是 subscription-ready 的客户可以每月自动收到补充装。',2,['dtc','adjective'],'word');
add('handmade','adjective','手工制作的','crafted by hand','Crowdfunding Campaign','campaign live','describe','The handmade aspect of the product is a big part of the story we tell backers.','产品 handmade 的特点是我们向支持者讲述的故事的重要部分。',1,['crowdfunding','adjective'],'word');
add('limited-run','adjective','限量版的','produced in small qty','Crowdfunding Campaign','campaign live','create scarcity','This is a limited-run colour that will not be available after the campaign ends.','这是一种 limited-run 颜色活动结束后将不再提供。',1,['crowdfunding','adjective'],'word');
add('duty-paid','adjective','关税已付的','tax included','Supplier / Foreign Trade','supplier communication','clarify','The DDP shipment is duty-paid so the customer receives the package without any extra charges.','DDP 货物是 duty-paid 的所以客户收到包裹时无需任何额外费用。',3,['supplier','adjective'],'word');

// === MORE COLLOCATIONS ===
add('manage the budget','collocation','管理预算','control spending','Ads / Acquisition','paid acquisition','control','We manage the budget daily to catch any overspend before the end of the billing cycle.','我们每天 manage the budget 以在结算周期结束前发现任何超支。',1,['ads','collocation'],'phrase');
add('source a supplier','collocation','寻找供应商','find factory','Supplier / Foreign Trade','supplier communication','source','We sourced a supplier that specialises in small-batch production for our first order.','我们 source a supplier 专门从事小批量生产以应对第一笔订单。',2,['supplier','collocation'],'phrase');
add('repair the unit','collocation','维修产品','fix the item','Customer Support','customer support','resolve','We repaired the unit and shipped it back within a week with a detailed repair note.','我们 repair the unit 并在一周内寄回附有详细维修说明。',2,['support','collocation'],'phrase');
add('write a subject line','collocation','写邮件标题','craft email subject','Email / CRM','email marketing','create','We wrote a subject line that uses the customer name and a specific benefit.','我们 write a subject line 使用客户姓名和具体的好处。',1,['email','collocation'],'phrase');
add('calculate the duty','collocation','计算关税','compute import tax','Supplier / Foreign Trade','supplier communication','calculate','We calculated the duty based on the HS code and the declared value of the shipment.','我们根据 HS 编码和货物申报价值 calculate the duty。',3,['supplier','collocation'],'phrase');
add('book a shipment','collocation','预定运输','reserve shipping','Fulfillment / Logistics','logistics','arrange','We booked a shipment for the pallet of goods going to the UK warehouse next Tuesday.','我们为下周二发往英国仓库的整托货物 book a shipment。',1,['logistics','collocation'],'phrase');
add('design a banner','collocation','设计横幅','create banner','Shopify / DTC Store','dtc store operation','create','We designed a banner for the homepage that promotes the free shipping offer clearly.','我们 design a banner 用于首页清晰展示免运费优惠。',1,['dtc','collocation'],'phrase');
add('post an update','collocation','发布更新','share progress','Backer Communication','campaign live','communicate','We post an update every Friday with factory photos and a short video message.','我们每周五 post an update 附有工厂照片和简短视频消息。',1,['communication','collocation'],'phrase');

// === MORE SENTENCE PATTERNS ===
add('The shipping cost is too high for this market.','sentence_pattern','运费对这个市场太高','cost concern','Fulfillment / Logistics','logistics','report','The shipping cost is too high for this market and we need to find a local warehouse.','shipping cost 对这个市场太高了我们需要找一个当地仓库。',1,['logistics','sentence_pattern'],'sentence_pattern');
add('We should increase the ad budget this week.','sentence_pattern','本周应加广告预算','budget proposal','Ads / Acquisition','paid acquisition','propose','We should increase the ad budget this week because the conversion rate is unusually high.','本周应该增加 ad budget 因为转化率异常地高。',1,['ads','sentence_pattern'],'sentence_pattern');
add('The price is too high for new customers.','sentence_pattern','对新客户价格太高','price concern','Shopify / DTC Store','dtc store operation','report','The price is too high for new customers and we need a lower-cost entry product.','对新客户来说价格太高了我们需要一个更低价的入门产品。',1,['dtc','sentence_pattern'],'sentence_pattern');
add('Can we get the supplier to lower the MOQ.','sentence_pattern','能让供应商降低 MOQ 吗','moq request','Supplier / Foreign Trade','supplier communication','ask','Can we get the supplier to lower the MOQ because we only need 500 units for the test order.','能让 supplier 降低 MOQ 吗因为我们测试订单只需要 500 个单位。',2,['supplier','sentence_pattern'],'sentence_pattern');
add('The order has been stuck for a week.','sentence_pattern','订单卡了一周','stuck order','Fulfillment / Logistics','logistics','report','The order has been stuck for a week at a sorting centre and nobody can tell us why.','订单在一个分拣中心卡了一周没人能告诉我们原因。',1,['logistics','sentence_pattern'],'sentence_pattern');
add('Backers are unhappy about the delay.','sentence_pattern','支持者对延迟不满','backer discontent','Backer Communication','post-campaign fulfillment','report','Backers are unhappy about the delay and we need to offer something to make up for it.','backer 对延迟不满我们需要提供一些补偿。',2,['communication','sentence_pattern'],'sentence_pattern');
add('The campaign video needs a stronger hook.','sentence_pattern','活动视频需要更强钩子','hook need','Crowdfunding Campaign','pre-launch','report','The campaign video needs a stronger hook in the first three seconds to grab attention.','campaign video 需要在头三秒内有更强的 hook 来抓住注意力。',1,['crowdfunding','sentence_pattern'],'sentence_pattern');
add('We need to improve the return process.','sentence_pattern','得改进退货流程','process need','Customer Support','customer support','propose','We need to improve the return process because customers are complaining about how slow it is.','需要改进退货流程因为客户在抱怨速度太慢。',1,['support','sentence_pattern'],'sentence_pattern');
add('The email list is not growing fast enough.','sentence_pattern','邮件列表增长太慢','growth concern','Email / CRM','email marketing','report','The email list is not growing fast enough and we need more lead magnets on the site.','email list 增长不够快我们需要在网站上放更多引流磁石。',1,['email','sentence_pattern'],'sentence_pattern');
add('Can we run a flash sale this weekend.','sentence_pattern','周末能做闪购吗','sale proposal','Shopify / DTC Store','dtc store operation','propose','Can we run a flash sale this weekend to clear the remaining stock of the previous version.','周末能做一次 flash sale 吗以清理前版本的剩余库存。',1,['dtc','sentence_pattern'],'sentence_pattern');

// === MORE NOUNS ACROSS TOPICS ===
add('feature list','noun_phrase','功能列表','list of features','Crowdfunding Campaign','pre-launch','inform','The feature list on the campaign page should be scannable with clear icons for each point.','活动页面上的 feature list 应该一目了然每个要点都有清晰的图标。',1,['crowdfunding','content']);
add('backer address','noun_phrase','支持者地址','supporter address','Backer Communication','post-campaign fulfillment','collect','We need every backer address confirmed before we can lock the shipping plan.','我们需要确认每个 backer address 才能确定运输计划。',1,['communication','logistics']);
add('store layout','noun_phrase','店铺布局','shop design','Shopify / DTC Store','dtc store operation','design','The store layout puts the best-selling products at the top and social proof right below.','store layout 将畅销产品放在顶部社会证明紧随其下。',1,['dtc','design']);
add('ad image','noun_phrase','广告图片','ad photo','Ads / Acquisition','paid acquisition','design','The ad image for the carousel should show the product from different angles.','轮播广告的 ad image 应该从不同角度展示产品。',1,['ads','content']);
add('email header','noun_phrase','邮件头部','email top section','Email / CRM','email marketing','design','The email header image should match the brand colours and not be too heavy to load.','email header 图片应该匹配品牌颜色且不要太大影响加载。',1,['email','design']);
add('ticket reply','noun_phrase','工单回复','support response','Customer Support','customer support','respond','The ticket reply template saves time but we always personalise the first sentence.','ticket reply 模板节省时间但我们总是将第一句话个性化。',1,['support','process']);
add('stock level','noun_phrase','库存水平','inventory quantity','Fulfillment / Logistics','logistics','track','The stock level for the accessory kit is running critically low so we need to reorder.','配件套装的 stock level 快见底了所以我们需要补货。',1,['logistics','operations']);
add('supplier invoice','noun_phrase','供应商发票','factory bill','Supplier / Foreign Trade','supplier communication','pay','The supplier invoice must match the purchase order before we release the payment.','supplier invoice 必须与采购订单一致我们才能放款。',2,['supplier','documentation']);

// === EXTRA PUSH: MORE ITEMS ===
add('landing page copy','noun_phrase','落地页文案','landing text','Ads / Acquisition','paid acquisition','write','The landing page copy should match the ad promise exactly or visitors bounce.','landing page copy 应该与广告承诺完全一致否则访客会跳出。',2,['ads','content']);
add('checkout offer','noun_phrase','结账优惠','checkout upsell','Shopify / DTC Store','dtc store operation','increase','The checkout offer for the extended warranty converts at about eight percent.','延长保修的 checkout offer 转化率大约为百分之八。',2,['dtc','sales']);
add('bundle deal','noun_phrase','套装优惠','combo discount','Shopify / DTC Store','dtc store operation','upsell','The bundle deal on the website saves customers about fifteen percent compared to buying separately.','网站上的 bundle deal 与单独购买相比为客户节省了大约百分之十五。',1,['dtc','sales']);
add('campaign backer count','noun_phrase','活动支持者数','backer total','Crowdfunding Campaign','campaign live','display','The campaign backer count crossed 5000 on the final day of funding.','campaign backer count 在筹资的最后一天突破了 5000。',1,['crowdfunding','metrics']);
add('return shipping','noun_phrase','退货运费','return postage','Customer Support','customer support','handle','We cover return shipping for defective items but not for change-of-mind returns.','我们承担瑕疵品的 return shipping 但不承担改变主意的退货。',2,['support','logistics']);
add('ad frequency cap','noun_phrase','广告频次上限','max ad views','Ads / Acquisition','paid acquisition','prevent fatigue','We set an ad frequency cap of three per person per week to avoid annoying people.','我们将 ad frequency cap 设为每人每周三次以避免惹人烦。',2,['ads','strategy']);
add('shipment origin','noun_phrase','发货地','where from','Fulfillment / Logistics','logistics','specify','The shipment origin is Shenzhen and the destination port is Rotterdam.','shipment origin 是深圳目的港是鹿特丹。',2,['logistics','international']);
add('email schedule','noun_phrase','邮件排期','send timetable','Email / CRM','email marketing','plan','The email schedule goes out at 10am local time on Tuesdays and Fridays.','email schedule 在周二和周五当地时间上午十点发出。',1,['email','planning']);
add('factory quote','noun_phrase','工厂报价','factory price','Supplier / Foreign Trade','supplier communication','compare','The factory quote includes the unit price tooling amortisation and estimated shipping.','factory quote 包括单价模具摊销和预估运费。',2,['supplier','negotiation']);
add('order minimum','noun_phrase','最低起订','minimum to order','Supplier / Foreign Trade','supplier communication','negotiate','The order minimum for this factory is higher than we need for the first batch.','这家工厂的 order minimum 比我们第一批需要的高。',1,['supplier','negotiation']);

// Even more...
['ad targeting test','noun_phrase','广告定向测试','targeting trial','Ads / Acquisition','paid acquisition','test','We ran an ad targeting test comparing broad audience against interest-based targeting.','我们进行了一项 ad targeting test 比较广泛受众和兴趣定向。',2,['ads','testing']],
['product description rewrite','noun_phrase','产品描述重写','description update','Shopify / DTC Store','dtc store operation','improve','The product description rewrite focused on benefits not features and the conversion rate improved.','product description rewrite 专注于好处而不是功能转化率提高了。',2,['dtc','content']],
['backer gift','noun_phrase','支持者礼物','free gift','Crowdfunding Campaign','post-campaign fulfillment','delight','We included a backer gift in every package as a surprise thank-you for the long wait.','我们在每个包裹中放入了一个 backer gift 作为对漫长等待的惊喜感谢。',1,['crowdfunding','loyalty']],
['email engagement','noun_phrase','邮件互动','email response','Email / CRM','email marketing','measure','Email engagement is measured by opens clicks and replies not just delivery rate.','email engagement 通过打开点击和回复来衡量而不仅仅是送达率。',2,['email','metrics']],
['warehouse stock','noun_phrase','仓库存货','warehouse inventory','Fulfillment / Logistics','logistics','count','The warehouse stock count is done at the end of every month to catch any discrepancies.','warehouse stock 盘点在每月底进行以发现任何差异。',2,['logistics','operations']],
['priority ticket','noun_phrase','优先工单','urgent case','Customer Support','customer support','escalate','A priority ticket is created when the order value is over two hundred dollars.','当订单价值超过两百美元时创建 priority ticket。',2,['support','process']],

];

// Process ALL items
for(const item of items){
  if(added>=1000-data.length) break; // Stop when we hit target
  add(...item);
}
console.log('Final batch: Added',added,'| Skipped:',skipped,'| Total:',data.length);
if(data.length<1000) console.log('Still short by',1000-data.length);

fs.writeFileSync(file,JSON.stringify(data));
// Update packs.ts
const packsFile='src/data/packs.ts';
let pc=fs.readFileSync(packsFile,'utf-8');
pc=pc.replace(/('foreign-trade-crowdfunding-dtc-operations-1000'[\s\S]*?total:\s*)\d+/,(_,pre)=>pre+data.length);
fs.writeFileSync(packsFile,pc);
// Update status
const stFile='docs/WORD_PACK_GENERATION_STATUS.json';
const st=JSON.parse(fs.readFileSync(stFile,'utf-8'));
if(st.packs['foreign-trade-crowdfunding-dtc-operations-1000']) st.packs['foreign-trade-crowdfunding-dtc-operations-1000'].current=data.length;
fs.writeFileSync(stFile,JSON.stringify(st,null,2));
console.log('Done. Final total:',data.length);

