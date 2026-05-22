// DEPRECATED / DO NOT RUN
// This generator may produce low-quality or over-target items.
// Use only with a manually curated candidate pool.
const fs = require('fs');
const file = 'src/data/packs/foreign-trade-crowdfunding-dtc-operations-1000.json';
const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
const existing = new Set(data.map(d => d.term.toLowerCase()));

const FF = {ROAS:'Return on Ad Spend',CPC:'Cost Per Click',CTR:'Click-Through Rate',CPA:'Cost Per Acquisition',CPM:'Cost Per Mille',AOV:'Average Order Value',MOQ:'Minimum Order Quantity','3PL':'Third-Party Logistics',CRM:'Customer Relationship Management',KPI:'Key Performance Indicator',ROI:'Return on Investment',EXW:'Ex Works',FOB:'Free On Board',CIF:'Cost Insurance Freight',DDP:'Delivered Duty Paid',FAQ:'Frequently Asked Questions'};

const newItems = [];
let id = data.length + 1, added = 0, skipped = 0;
const TARGET = 1000;

function add(term,sm,sis,topic,bizStage,workIntent,ex,ez,diff,tags,type,reg){
  if(existing.has(term.toLowerCase())){skipped++;return;}
  existing.add(term.toLowerCase());
  newItems.push({
    id:'foreign-trade-crowdfunding-dtc-operations-1000-'+String(id).padStart(4,'0'),
    packId:'foreign-trade-crowdfunding-dtc-operations-1000',term,type:type||'word',topic,
    businessStage:bizStage||'',workIntent:workIntent||'',shortMeaning:sm,shortMeaningInSentence:sis,
    example:ex,exampleZh:ez,register:reg||'neutral',difficulty:diff||2,
    sourceType:'foreign_trade_dtc_style_original',
    sourceTitle:'Original foreign trade DTC learning sentence',
    sourceUrl:'',sourceDate:'',isRealSourceSentence:false,
    tags:tags||['dtc'],fullForm:FF[term]||undefined
  });
  id++;added++;
}

// === 1. Crowdfunding Campaign ===
add('backer','支持者','project supporter','Crowdfunding Campaign','campaign live','communicate with supporters','We need to send an update to all backers before the campaign ends.','我们需要在活动结束前向所有 backer 发送更新。',1,['crowdfunding','community']);
add('pledge','认缴','money promised','Crowdfunding Campaign','campaign live','receive funding','The average pledge on this campaign is about eighty-five dollars.','这个活动的平均 pledge 大约是八十五美元。',1,['crowdfunding','funding']);
add('reward tier','回报档位','benefit level','Crowdfunding Campaign','pre-launch','design campaign structure','We should add an early bird reward tier to incentivise people to back on day one.','我们应该增加一个 early bird reward tier 来激励人们在第一天就支持。',2,['crowdfunding','structure']);
add('add-on','附加项','extra purchase item','Crowdfunding Campaign','campaign live','increase pledge value','Backers can select an add-on like an extra battery pack during the survey.','backer 可以在调查中选择 add-on 比如额外的电池包。',1,['crowdfunding','upsell']);
add('stretch goal','延伸目标','extra funding target','Crowdfunding Campaign','campaign live','boost momentum','We unlocked the stretch goal and now every backer gets a free carrying case.','我们解锁了 stretch goal 现在每个 backer 都能得到一个免费收纳盒。',2,['crowdfunding','momentum']);
add('early bird','早鸟','limited-time discount','Crowdfunding Campaign','pre-launch','drive early pledges','The early bird tier sold out in the first two hours of the campaign.','early bird 档位在活动开始的头两个小时内就售罄了。',1,['crowdfunding','launch']);
add('late pledge','延迟认缴','pledge after campaign','Crowdfunding Campaign','post-campaign fulfillment','capture late demand','We opened a late pledge option for people who missed the original campaign.','我们为错过了原始活动的人开放了 late pledge 选项。',2,['crowdfunding','post-campaign']);
add('pledge manager','认缴管理工具','pledge organisation tool','Crowdfunding Campaign','post-campaign fulfillment','collect backer info','After the campaign ends we will send a pledge manager survey to collect your shipping address.','活动结束后我们会发送 pledge manager 调查来收集你的收货地址。',3,['crowdfunding','tools']);
add('backer survey','支持者调查','questionnaire for backers','Crowdfunding Campaign','post-campaign fulfillment','collect preferences','Please fill out the backer survey so we know which colour you want.','请填写 backer survey 让我们知道你想要的颜​色。',1,['crowdfunding','communication']);
add('campaign update','活动更新','progress announcement','Crowdfunding Campaign','campaign live','keep backers informed','We posted a campaign update about the new shipping timeline.','我们发布了一条关于新 shipping timeline 的 campaign update。',1,['crowdfunding','communication']);
add('shipping estimate','预计发货时间','expected delivery date','Crowdfunding Campaign','post-campaign fulfillment','set expectations','The shipping estimate on the campaign page is November of this year.','活动页面上的 shipping estimate 是今年十一月。',1,['crowdfunding','logistics']);
add('funding goal','筹款目标','money target','Crowdfunding Campaign','pre-launch','set campaign target','We set our funding goal at fifty thousand dollars based on the tooling costs.','我们根据模具成本把 funding goal 定在了五万美元。',1,['crowdfunding','planning']);
add('pre-launch page','预发布页面','page before launch','Crowdfunding Campaign','pre-launch','build email list','The pre-launch page collected over two thousand email sign-ups before we went live.','pre-launch page 在我们上线前收集了超过两千个邮箱注册。',2,['crowdfunding','marketing']);
add('launch day','上线日','first day of campaign','Crowdfunding Campaign','campaign live','maximise opening','Launch day is critical because most campaigns raise the bulk of their funds in the first 48 hours.','launch day 至关重要因为大多数活动都在头 48 小时内筹集大部分资金。',1,['crowdfunding','strategy']);

// === 2. Backer Communication ===
add('shipping timeline','发货时间线','delivery schedule','Backer Communication','post-campaign fulfillment','set delivery expectations','Backers want a clearer shipping timeline with specific dates not just a quarter estimate.','backer 想要更清晰的 shipping timeline 包含具体日期而不仅仅是季度估计。',2,['communication','logistics']);
add('project update','项目更新','progress report','Backer Communication','campaign live','maintain transparency','We send a project update every two weeks with photos from the factory floor.','我们每两周发送一次 project update 附上工厂车间的照片。',1,['communication','transparency']);
add('refund request','退款请求','money back ask','Backer Communication','campaign live','handle complaints','We received three refund requests after the shipping delay was announced.','公布 shipping delay 后我们收到了三起 refund request。',2,['communication','support']);
add('address confirmation','地址确认','verify shipping address','Backer Communication','post-campaign fulfillment','ensure delivery accuracy','Please complete your address confirmation by Friday or your shipment may be delayed.','请在周五前完成 address confirmation 否则你的 shipment 可能会延迟。',1,['communication','logistics']);
add('delayed shipment','延迟发货','late delivery','Backer Communication','post-campaign fulfillment','manage expectations','We apologise for the delayed shipment and are offering a partial refund for affected orders.','我们对 delayed shipment 表示歉意并为受影响的订单提供部分退款。',2,['communication','logistics']);
add('replacement unit','替换产品','replacement item','Backer Communication','post-campaign fulfillment','resolve defects','If your unit arrived damaged we will ship a replacement unit within two weeks.','如果你的产品收到时已损坏我们将在两周内发出 replacement unit。',2,['communication','support']);
add('support ticket','工单','help request','Backer Communication','all stages','track issues','Every support ticket is answered within 24 hours during the campaign period.','活动期间每个 support ticket 都会在 24 小时内回复。',2,['communication','support']);
add('FAQ','常见问题','common questions','Backer Communication','pre-launch','reduce support load','We updated the FAQ section to address the most common questions about shipping.','我们更新了 FAQ 部分来回答关于 shipping 的最常见问题。',1,['communication','support']);
add('backer complaint','支持者投诉','supporter grievance','Backer Communication','post-campaign fulfillment','resolve issues','The main backer complaint right now is about the lack of tracking updates.','目前主要的 backer complaint 是关于缺少追踪更新。',2,['communication','support']);

// === 3. Shopify / DTC Store ===
add('Shopify','Shopify','e-commerce platform','Shopify / DTC Store','dtc store operation','run online store','We migrated our store from WooCommerce to Shopify last quarter.','我们上个季度把店铺从 WooCommerce 迁移到了 Shopify。',1,['dtc','platform'],'word','neutral');
add('product page','产品页','item listing page','Shopify / DTC Store','dtc store operation','convert visitors','The product page needs better images and a clearer value proposition.','product page 需要更好的图片和更清晰的价值主张。',1,['dtc','conversion']);
add('checkout','结账','payment step','Shopify / DTC Store','dtc store operation','complete purchase','The checkout flow drops nearly a third of customers at the shipping cost step.','checkout 流程在运费步骤流失了将近三分之一的客户。',2,['dtc','conversion']);
add('cart','购物车','shopping basket','Shopify / DTC Store','dtc store operation','capture intent','Customers are adding items to the cart but not completing the purchase.','客户正在把商品加入 cart 但没有完成购买。',1,['dtc','conversion']);
add('abandoned cart','弃购车','left without buying','Shopify / DTC Store','dtc store operation','recover lost sales','The abandoned cart flow is not triggering for Shopify orders placed through the quick buy button.','quick buy button 下的 Shopify 订单没有触发 abandoned cart flow。',3,['dtc','email']);
add('conversion rate','转化率','visitor-to-buyer ratio','Shopify / DTC Store','dtc store operation','measure performance','The conversion rate dropped after we changed the product page layout.','我们更改 product page 布局后 conversion rate 下降了。',2,['dtc','metrics']);
add('AOV','客单价','average order value','Shopify / DTC Store','dtc store operation','increase revenue per order','Our AOV increased after we added a free shipping threshold just above the average cart value.','我们在略高于平均 cart value 的地方设置 free shipping threshold 后 AOV 提高了。',2,['dtc','metrics']);
add('bundle','捆绑','product combo','Shopify / DTC Store','dtc store operation','increase AOV','We created a bundle that pairs the main product with its most popular accessory.','我们创建了一个 bundle 将主产品与其最受欢迎的配件组合在一起。',1,['dtc','upsell']);
add('upsell','追加销售','suggest upgrade','Shopify / DTC Store','dtc store operation','increase order value','Can we add this as an upsell on the product page without slowing down the checkout?','我们能否把它作为 product page 上的 upsell 而不拖慢 checkout？',2,['dtc','sales']);
add('cross-sell','交叉销售','suggest related item','Shopify / DTC Store','dtc store operation','increase order breadth','The thank-you page cross-sell has a surprisingly high take rate.','感谢页面的 cross-sell 有出人意料的高接受率。',2,['dtc','sales']);
add('discount code','折扣码','promo code','Shopify / DTC Store','dtc store operation','drive conversion','The discount code for first-time buyers brought in over five hundred orders last month.','针对首次购买者的 discount code 上个月带来了超过五百个订单。',1,['dtc','marketing']);
add('free shipping threshold','包邮门槛','min for free delivery','Shopify / DTC Store','dtc store operation','increase AOV','We set the free shipping threshold at fifty dollars which is ten dollars above our average order.','我们把 free shipping threshold 设在五十美元比平均订单高十美元。',2,['dtc','strategy']);
add('landing page','落地页','entry page','Shopify / DTC Store','paid acquisition','convert ad traffic','The landing page needs a stronger headline that matches the ad creative.','landing page 需要一个与广告创意匹配的更强有力的标题。',2,['dtc','marketing']);
add('returning customer','回头客','repeat buyer','Shopify / DTC Store','dtc store operation','build loyalty','Returning customers spend about thirty percent more than first-time buyers.','returning customer 的消费比首次购买者高出大约百分之三十。',1,['dtc','loyalty']);

console.log('Phase 1: Added',added,'items from crowdfunding + Shopify topics');

// === 4. Ads / Acquisition ===
add('Meta Ads','Meta 广告','Facebook Instagram ads','Ads / Acquisition','paid acquisition','run paid campaigns','We shifted half our budget from Google to Meta Ads after seeing better ROAS on Instagram.','在看到 Instagram 上更好的 ROAS 后我们把一半预算从 Google 转到了 Meta Ads。',2,['ads','platform'],'collocation','neutral');
add('Google Ads','Google 广告','search and display ads','Ads / Acquisition','paid acquisition','acquire customers','Google Ads is still our best channel for high-intent buyers searching for the exact product name.','Google Ads 仍然是我们获取搜索确切产品名称的高意向买家最好的渠道。',2,['ads','platform'],'collocation','neutral');
add('creative','广告素材','ad content','Ads / Acquisition','paid acquisition','capture attention','We need to test a new creative because the current one is showing ad fatigue.','我们需要测试一个新的 creative 因为目前的素材出现了广告疲劳。',2,['ads','content']);
add('hook','吸引力开场','attention grabber','Ads / Acquisition','paid acquisition','stop the scroll','The first three seconds of the video need a stronger hook to stop people from scrolling.','视频的前三秒需要一个更强的 hook 来阻止人们滑动。',2,['ads','content']);
add('angle','切入点','marketing perspective','Ads / Acquisition','paid acquisition','find winning message','We tried five different angles and the social proof angle performed the best.','我们尝试了五个不同的 angle social proof angle 表现最好。',2,['ads','strategy']);
add('campaign','广告活动','advertising campaign','Ads / Acquisition','paid acquisition','organise ads','The campaign targeting backers of similar projects had a ROAS of 3.5.','针对类似项目 backer 的 campaign ROAS 达到了 3.5。',1,['ads','structure']);
add('ad set','广告组','group of ads','Ads / Acquisition','paid acquisition','target audience','We duplicated the winning ad set and increased the budget by fifty percent.','我们复制了 winning ad set 并把预算提高了百分之五十。',2,['ads','structure']);
add('audience','受众','target group','Ads / Acquisition','paid acquisition','define targeting','The lookalike audience based on our top customers is outperforming interest-based targeting.','基于我们 top customer 的 lookalike audience 效果超过了兴趣导向 targeting。',2,['ads','targeting']);
add('retargeting','再营销','remarketing','Ads / Acquisition','paid acquisition','convert warm leads','The retargeting campaign shows the exact product people viewed but did not buy.','retargeting campaign 展示人们看过但没买的确切产品。',2,['ads','strategy']);
add('lookalike audience','相似受众','similar user group','Ads / Acquisition','paid acquisition','find new customers','We built a lookalike audience using our top five percent of customers by lifetime value.','我们用 lifetime value 前百分之五的客户建立了一个 lookalike audience。',3,['ads','targeting']);
add('CPM','千次展示成本','cost per thousand','Ads / Acquisition','paid acquisition','measure ad cost','The CPM on Meta has nearly doubled since the iOS privacy update.','自 iOS 隐私更新以来 Meta 上的 CPM 几乎翻了一番。',2,['ads','metrics']);
add('CPC','单次点击成本','cost per click','Ads / Acquisition','paid acquisition','measure click cost','Our average CPC is under one dollar but the conversion rate makes it worthwhile.','我们的平均 CPC 不到一美元但 conversion rate 使其物有所值。',2,['ads','metrics']);
add('CTR','点击率','click-through rate','Ads / Acquisition','paid acquisition','measure engagement','The CTR on this creative is below one percent so we need to change the hook.','这个 creative 的 CTR 低于百分之一所以我们需要更换 hook。',2,['ads','metrics']);
add('CPA','单次获客成本','cost per acquisition','Ads / Acquisition','paid acquisition','measure acquisition cost','Our target CPA is thirty-five dollars and we are currently hovering around forty.','我们的目标 CPA 是三十五美元目前徘徊在四十左右。',3,['ads','metrics']);
add('ROAS','广告支出回报率','return on ad spend','Ads / Acquisition','paid acquisition','measure profitability','Anything above a 2.0 ROAS is profitable for us given our gross margins.','考虑到我们的毛利率超过 2.0 的 ROAS 对我们来说就是盈利的。',2,['ads','metrics']);
add('pixel','像素','tracking code','Ads / Acquisition','paid acquisition','track conversions','Make sure the pixel is firing on the thank-you page so we can track actual purchases.','确保 pixel 在感谢页面上触发这样我们才能追踪实际购买。',2,['ads','technical']);
add('tracking','追踪','following user actions','Ads / Acquisition','paid acquisition','attribute conversions','The tracking shows that most purchases happen within three days of the first click.','tracking 显示大多数购买发生在首次点击后三天内。',2,['ads','technical']);
add('attribution','归因','assigning credit','Ads / Acquisition','paid acquisition','understand channel value','Attribution is messy because customers often see a Meta ad then search on Google before buying.','attribution 很混乱因为客户经常先看到 Meta ad 然后在 Google 搜索后再购买。',3,['ads','analytics']);

// === 5. Email / CRM ===
add('email flow','邮件流程','automated email series','Email / CRM','email marketing','nurture customers','The welcome email flow generates about twenty percent of our total email revenue.','welcome email flow 产生了大约百分之二十的总邮件收入。',2,['email','automation']);
add('welcome flow','欢迎邮件流程','new subscriber series','Email / CRM','email marketing','onboard new contacts','The welcome flow introduces the brand story and offers a first-purchase discount.','welcome flow 介绍品牌故事并提供首次购买折扣。',1,['email','onboarding']);
add('abandoned cart flow','弃购车流程','cart recovery emails','Email / CRM','email marketing','recover lost sales','The abandoned cart flow sends three emails over 48 hours and recovers about eight percent of carts.','abandoned cart flow 在 48 小时内发送三封邮件恢复了约百分之八的购物车。',3,['email','automation']);
add('post-purchase flow','购后流程','after-buy emails','Email / CRM','email marketing','build loyalty','The post-purchase flow includes a thank-you email a product guide and a review request.','post-purchase flow 包括感谢邮件产品指南和评价请求。',2,['email','retention']);
add('win-back flow','召回流程','re-engage inactive','Email / CRM','email marketing','reactivate churned','The win-back flow offers lapsed customers a twenty percent discount on their next order.','win-back flow 为流失客户提供下一单百分之二十的折扣。',2,['email','retention']);
add('subject line','邮件标题','email title','Email / CRM','email marketing','drive opens','The subject line with the customer first name had a five percent higher open rate.','带客户名字的 subject line 打开率高出百分之五。',1,['email','content']);
add('open rate','打开率','percentage opened','Email / CRM','email marketing','measure engagement','Our open rate dropped after we changed the sender name from a person to the brand name.','我们把发件人名字从个人改为品牌名后 open rate 下降了。',1,['email','metrics']);
add('click rate','点击率','percentage clicked','Email / CRM','email marketing','measure action','The click rate on the product recommendation section is three times higher than the rest of the email.','产品推荐部分的 click rate 是邮件其余部分的三倍。',1,['email','metrics']);
add('unsubscribe','退订','opt out','Email / CRM','email marketing','manage list health','The unsubscribe rate spiked after we increased the sending frequency to twice a week.','我们把发送频率提高到每周两次后 unsubscribe rate 激增。',1,['email','metrics']);
add('segment','分群','customer group','Email / CRM','email marketing','target messaging','We created a segment of customers who bought more than twice but have not purchased in 90 days.','我们创建了一个购买超过两次但 90 天未购买的客户 segment。',2,['email','strategy']);
add('trigger','触发条件','automatic start','Email / CRM','email marketing','automate responses','The trigger for the replenishment email is set to 30 days after the last purchase.','补货邮件的 trigger 设置为上次购买后 30 天。',2,['email','automation']);
add('personalization','个性化','custom content','Email / CRM','email marketing','increase relevance','Adding product personalization based on browsing history increased our click rate by forty percent.','基于浏览记录添加 product personalization 使我们的点击率提高了百分之四十。',2,['email','strategy']);
add('Klaviyo','Klaviyo','email platform','Email / CRM','email marketing','send campaigns','We moved from Mailchimp to Klaviyo because the segmentation is much more powerful.','我们从 Mailchimp 转到了 Klaviyo 因为分群功能强大得多。',1,['email','platform'],'word','neutral');
add('Mailchimp','Mailchimp','email platform','Email / CRM','email marketing','send campaigns','Mailchimp is fine for the early stage but we outgrew it once we needed advanced flows.','Mailchimp 在早期阶段还好但一旦需要 advanced flow 就不够用了。',1,['email','platform'],'word','neutral');
add('CRM','客户关系管理','customer database','Email / CRM','email marketing','manage customers','We use our CRM to track every interaction from the first website visit to the fifth purchase.','我们用 CRM 追踪从第一次网站访问到第五次购买的每一次互动。',2,['email','tools']);

console.log('Phase 2: Added',added,'items from ads + email topics');

// === 6. Customer Support ===
add('refund','退款','money back','Customer Support','customer support','resolve payment issues','We processed the refund within two days and the customer left a positive review.','我们在两天内处理了 refund 客户留下了好评。',1,['support','payment']);
add('return','退货','send back','Customer Support','customer support','handle returns','The return rate for this product is under two percent which is well below the industry average.','这个产品的 return rate 不到百分之二远低于行业平均水平。',1,['support','logistics']);
add('chargeback','拒付','credit card dispute','Customer Support','customer support','prevent fraud','We got three chargebacks this month from customers who did not recognise the charge on their statement.','这个月我们收到了三起 chargeback 来自不认得账单上这笔费用的客户。',3,['support','payment']);
add('warranty','保修','product guarantee','Customer Support','customer support','provide assurance','All our products come with a one-year warranty that covers manufacturing defects.','我们所有产品都提供一年 warranty 涵盖制造缺陷。',2,['support','product']);
add('defective unit','瑕疵品','broken item','Customer Support','customer support','resolve quality issues','We received about a dozen reports of a defective unit with the same screen flickering issue.','我们收到了大约十几起 defective unit 的报告都是同样的屏幕闪烁问题。',2,['support','quality']);
add('replacement','替换品','new item sent','Customer Support','customer support','satisfy customers','We shipped a replacement the same day the customer reported the issue.','我们在客户报告问题的当天就发出了 replacement。',1,['support','logistics']);
add('shipping damage','运输损坏','damage during delivery','Customer Support','customer support','handle logistics issues','About three percent of units arrive with some shipping damage mostly to the outer packaging.','大约百分之三的产品到达时有 shipping damage 主要是外包装损坏。',2,['support','logistics']);
add('missing item','缺件','item not included','Customer Support','customer support','resolve packing errors','The customer reported a missing item from their bundle order and we shipped it separately the next day.','客户报告 bundle 订单中有 missing item 我们第二天单独发出了。',2,['support','fulfillment']);
add('wrong address','错误地址','incorrect shipping address','Customer Support','customer support','correct delivery info','The package was returned because of a wrong address so we need to confirm and reship.','包裹因 wrong address 被退回所以我们需要确认并重新发货。',2,['support','logistics']);
add('customer complaint','客户投诉','negative feedback','Customer Support','customer support','address grievances','Every customer complaint gets a personal reply within 12 hours during business days.','每个 customer complaint 在工作日 12 小时内都会得到个人回复。',1,['support','communication']);
add('support reply','支持回复','response to customer','Customer Support','customer support','resolve tickets','The average support reply time is under four hours which our customers really appreciate.','平均 support reply 时间不到四小时客户非常认可这一点。',1,['support','metrics']);
add('response time','响应时间','time to reply','Customer Support','customer support','measure service','We aim for a response time of under two hours during the campaign period.','我们的目标是在活动期间 response time 控制在两小时以内。',1,['support','metrics']);
add('escalation','升级处理','send to higher level','Customer Support','customer support','handle complex cases','If the issue involves a refund over one hundred dollars it requires escalation to a manager.','如果问题涉及超过一百美元的 refund 需要 escalation 给经理。',2,['support','process']);

// === 7. Fulfillment / Logistics ===
add('fulfillment','履约','order processing and shipping','Fulfillment / Logistics','post-campaign fulfillment','deliver products','We use a 3PL for fulfillment so we never touch the inventory ourselves.','我们使用 3PL 进行 fulfillment 所以我们自己从不接触库存。',2,['logistics','operations']);
add('3PL','第三方物流','third-party logistics','Fulfillment / Logistics','post-campaign fulfillment','outsource shipping','Our 3PL handles everything from receiving inventory to last-mile delivery.','我们的 3PL 处理从接收库存到 last-mile delivery 的一切。',2,['logistics','operations']);
add('warehouse','仓库','storage facility','Fulfillment / Logistics','logistics','store inventory','The warehouse needs at least three days notice before a large shipment arrives.','仓库在大量货物到达前至少需要三天的通知。',1,['logistics','storage']);
add('tracking number','追踪号','delivery tracking code','Fulfillment / Logistics','logistics','track shipments','Once the order ships we will email you the tracking number within 24 hours.','订单发货后我们会在 24 小时内通过邮件发送 tracking number。',1,['logistics','communication']);
add('shipping label','运单','delivery address sticker','Fulfillment / Logistics','logistics','prepare packages','The shipping label was printed but the carrier never scanned it at pickup.','shipping label 已经打印但承运商在取件时没有扫描它。',2,['logistics','operations']);
add('carrier','承运商','delivery company','Fulfillment / Logistics','logistics','transport goods','We switched carriers after the previous one lost five packages in a single month.','在上一个承运商一个月丢失了五个包裹后我们更换了 carrier。',1,['logistics','operations']);
add('customs','海关','border inspection','Fulfillment / Logistics','logistics','clear international','The shipment is stuck in customs because the commercial invoice was missing a product description.','这批货卡在 customs 因为 commercial invoice 缺少产品描述。',3,['logistics','international']);
add('duties','关税','import tax','Fulfillment / Logistics','logistics','pay import fees','Backers in the EU will need to pay duties before the package can be delivered.','欧盟的 backer 需要支付 duties 才能派送包裹。',2,['logistics','international']);
add('last-mile delivery','最后一公里配送','final delivery step','Fulfillment / Logistics','logistics','complete delivery','Last-mile delivery is the most expensive and least reliable part of the entire shipping process.','last-mile delivery 是整个运输过程中最昂贵和最不可靠的部分。',3,['logistics','operations']);
add('delivery attempt','派送尝试','carrier tries to deliver','Fulfillment / Logistics','logistics','complete delivery','The carrier made one delivery attempt but no one was home to sign for the package.','承运商进行了一次 delivery attempt 但没人在家签收包裹。',1,['logistics','operations']);
add('lost package','丢失包裹','missing shipment','Fulfillment / Logistics','logistics','resolve issues','We filed a claim with the carrier after the tracking showed no movement for ten days on a lost package.','追踪显示一个 lost package 十天无动态后我们向承运商提出了索赔。',2,['logistics','support']);
add('inventory','库存','stock on hand','Fulfillment / Logistics','logistics','manage stock','Our inventory is running low on the black variant so we need to reorder soon.','我们黑色款的 inventory 快见底了所以需要尽快补货。',1,['logistics','operations']);
add('backorder','缺货订单','order for out-of-stock','Fulfillment / Logistics','logistics','manage shortages','The most popular colour is on backorder and will ship about three weeks late.','最受欢迎的颜色处于 backorder 状态将延迟大约三周发货。',2,['logistics','operations']);
add('preorder','预售','order before available','Fulfillment / Logistics','pre-launch','gauge demand','We opened preorders to gauge demand before committing to a full production run.','我们开放了 preorder 以在承诺全面生产之前衡量需求。',2,['logistics','planning']);

console.log('Phase 3: Added',added,'items from support + fulfillment topics');

// === 8. Supplier / Foreign Trade ===
add('supplier','供应商','provider','Supplier / Foreign Trade','supplier communication','source products','The supplier needs at least four weeks to produce the next batch so we cannot run out of stock.','supplier 需要至少四周才能生产下一批所以我们不能断货。',1,['supplier','sourcing']);
add('quotation','报价','price offer','Supplier / Foreign Trade','supplier communication','get pricing','We received three quotations and the middle one offers the best balance of price and lead time.','我们收到了三份 quotation 中间那份在价格和 lead time 之间提供了最好的平衡。',2,['supplier','negotiation']);
add('MOQ','最小起订量','minimum order quantity','Supplier / Foreign Trade','supplier communication','negotiate terms','The MOQ is too high for this test order so we are asking if they can do a smaller trial run.','MOQ 对这次 test order 来说太高了所以我们在问他们能否做更小的 trial run。',2,['supplier','negotiation']);
add('lead time','交货周期','production and delivery time','Supplier / Foreign Trade','supplier communication','plan production','Please confirm the lead time before we pay the deposit because the last order took two weeks longer than promised.','请在我们支付 deposit 之前确认 lead time 因为上一批比承诺的时间多花了两周。',2,['supplier','planning']);
add('sample','样品','test product','Supplier / Foreign Trade','supplier communication','verify quality','We received the sample and the stitching quality is good but the colour is slightly off.','我们收到了 sample 缝制质量不错但颜色略有偏差。',1,['supplier','quality']);
add('prototype','原型','first working version','Supplier / Foreign Trade','supplier communication','develop product','The prototype looks promising but we need to reinforce the hinge before moving to tooling.','prototype 看起来很有希望但我们需要在进入 tooling 之前加固铰链。',2,['supplier','development']);
add('tooling','模具','mold making','Supplier / Foreign Trade','supplier communication','prepare production','Tooling usually takes four to six weeks and costs about five thousand dollars for a simple injection mold.','tooling 通常需要四到六周一个简单的 injection mold 成本约五千美元。',3,['supplier','production']);
add('mass production','量产','large-scale manufacturing','Supplier / Foreign Trade','supplier communication','scale up','We are ready to move from sampling to mass production once the final colour is approved.','一旦最终颜色确认我们就可以从 sampling 进入 mass production。',2,['supplier','production']);
add('quality inspection','质检','product check','Supplier / Foreign Trade','supplier communication','ensure standards','We hired a third-party quality inspection company to check every unit before shipment.','我们聘请了第三方 quality inspection 公司在发货前检查每个产品。',2,['supplier','quality']);
add('defective rate','不良率','percentage faulty','Supplier / Foreign Trade','supplier communication','measure quality','The defective rate on the first batch was nearly five percent which is above our acceptable threshold.','第一批的 defective rate 接近百分之五高于我们可接受的阈值。',3,['supplier','quality']);
add('packaging','包装','box and wrapping','Supplier / Foreign Trade','supplier communication','design presentation','The packaging needs to survive a drop test because international shipping is rough.','packaging 需要能通过跌落测试因为国际运输很粗暴。',1,['supplier','product']);
add('carton','纸箱','shipping box','Supplier / Foreign Trade','supplier communication','organise shipping','Each carton holds 12 units and weighs about eight kilograms when fully packed.','每个 carton 装 12 个单位装满时重约八公斤。',2,['supplier','logistics']);
add('HS code','海关编码','harmonised system code','Supplier / Foreign Trade','supplier communication','clear customs','We need the correct HS code for this product category to avoid customs delays.','我们需要这个产品类别的正确 HS code 以避免海关延误。',3,['supplier','international']);
add('commercial invoice','商业发票','trade invoice','Supplier / Foreign Trade','supplier communication','document shipment','The commercial invoice must include the unit price total value and country of origin.','commercial invoice 必须包含单价总价和原产国。',2,['supplier','documentation']);
add('packing list','装箱单','item list in box','Supplier / Foreign Trade','supplier communication','document contents','The packing list should match exactly what is inside each carton for customs inspection.','packing list 应该与每个 carton 内的实际内容完全一致以备海关检查。',2,['supplier','documentation']);
add('freight forwarder','货运代理','shipping agent','Supplier / Foreign Trade','supplier communication','arrange transport','Our freight forwarder handles everything from the factory door to our warehouse including customs clearance.','我们的 freight forwarder 处理从工厂门口到我们仓库的一切包括清关。',3,['supplier','logistics']);
add('payment terms','付款条款','pay conditions','Supplier / Foreign Trade','supplier communication','agree on payment','The payment terms are 30 percent deposit and 70 percent before shipment.','payment terms 是百分之三十 deposit 百分之七十发货前付清。',2,['supplier','finance']);
add('deposit','定金','upfront payment','Supplier / Foreign Trade','supplier communication','secure order','We paid the deposit after signing the contract and the balance is due before shipping.','我们在签合同后支付了 deposit balance 在发货前到期。',1,['supplier','finance']);
add('balance payment','尾款','remaining amount','Supplier / Foreign Trade','supplier communication','complete payment','The balance payment is due once the goods pass the final quality inspection.','一旦货物通过最终的 quality inspection balance payment 就到期了。',2,['supplier','finance']);
add('EXW','工厂交货','ex works','Supplier / Foreign Trade','supplier communication','agree terms','Under EXW terms the buyer is responsible for all shipping costs from the factory gate onwards.','在 EXW 条款下买方负责从工厂门口起的所有运输费用。',4,['supplier','incoterms']);
add('FOB','船上交货','free on board','Supplier / Foreign Trade','supplier communication','agree terms','FOB means the supplier covers costs until the goods are loaded onto the vessel at the port.','FOB 意味着 supplier 负责货物在港口装船之前的费用。',4,['supplier','incoterms']);
add('CIF','到岸价','cost insurance freight','Supplier / Foreign Trade','supplier communication','agree terms','CIF includes the cost of the goods insurance and freight to the destination port.','CIF 包括货物成本保险和到目的港的运费。',4,['supplier','incoterms']);
add('DDP','完税后交货','delivered duty paid','Supplier / Foreign Trade','supplier communication','agree terms','DDP is the easiest for the buyer because the supplier handles everything including import duties.','DDP 对买方来说最简单因为 supplier 处理一切包括进口关税。',4,['supplier','incoterms']);

// === EXECUTION ===
if (newItems.length > 0) {
  const updated = data.concat(newItems);
  fs.writeFileSync(file, JSON.stringify(updated));
}
console.log('Phase 4: Added',added,'| Skipped:',skipped,'| Total items:', data.length + added);
if (data.length + added < TARGET) console.log('Need', TARGET - (data.length + added), 'more items');

// === BATCH 2: More terms across all topics ===
// Crowdfunding extras
add('campaign page','活动页面','campaign web page','Crowdfunding Campaign','campaign live','present campaign','The campaign page needs a stronger video that explains the product in the first 30 seconds.','campaign page 需要一个更强的视频在头 30 秒内解释产品。',1,['crowdfunding','marketing']);
add('backer number','支持者编号','backer ID','Crowdfunding Campaign','campaign live','track supporters','Your backer number is on the confirmation email you received after pledging.','你的 backer number 在你 pledging 后收到的确认邮件中。',1,['crowdfunding','communication']);
add('referral programme','推荐计划','referral scheme','Crowdfunding Campaign','campaign live','grow backers','The referral programme gives backers a five-dollar credit for each friend who also pledges.','referral programme 为每位也 pledging 的朋友提供五美元积分。',2,['crowdfunding','growth']);
add('superbacker','超级支持者','repeat backer','Crowdfunding Campaign','campaign live','identify advocates','Superbackers have backed over fifty projects and tend to pledge early and share widely.','superbacker 已经支持了超过五十个项目倾向于早早 pledging 并广泛分享。',3,['crowdfunding','community']);
add('collaboration','联名合作','brand partnership','Crowdfunding Campaign','pre-launch','boost visibility','The collaboration with a known YouTuber brought in about thirty percent of our backers.','与知名 YouTuber 的 collaboration 带来了大约百分之三十的 backer。',2,['crowdfunding','marketing']);

// Shopify/DTC extras
add('product description','产品描述','item details','Shopify / DTC Store','dtc store operation','inform customers','The product description should focus on benefits not just listing features.','product description 应该聚焦于好处而不仅仅是列出 features。',1,['dtc','content']);
add('product image','产品图','item photo','Shopify / DTC Store','dtc store operation','showcase product','We need lifestyle product images that show the item being used not just white-background shots.','我们需要 lifestyle product image 展示产品被使用的场景而不仅仅是白底图。',1,['dtc','content']);
add('product review','产品评价','customer review','Shopify / DTC Store','dtc store operation','build trust','The product reviews with photos convert much better than text-only reviews.','带照片的 product review 转化率比纯文字 review 高得多。',1,['dtc','social-proof']);
add('inventory management','库存管理','stock control','Shopify / DTC Store','dtc store operation','avoid stockouts','Good inventory management means we never run out of the best-selling variant during a promotion.','好的 inventory management 意味着我们在促销期间不会断货最畅销的 variant。',2,['dtc','operations']);
add('shipping policy','运输政策','delivery rules','Shopify / DTC Store','dtc store operation','set expectations','Our shipping policy clearly states that international orders may take up to three weeks.','我们的 shipping policy 明确说明国际订单可能需要长达三周。',1,['dtc','policy']);

// Ads extras
add('ad fatigue','广告疲劳','audience bored','Ads / Acquisition','paid acquisition','monitor performance','The ad fatigue is showing because frequency is above four and CTR is dropping.','ad fatigue 正在显现因为 frequency 超过四而 CTR 在下降。',2,['ads','optimisation']);
add('frequency','频次','ad views per person','Ads / Acquisition','paid acquisition','monitor delivery','The frequency is too high and people are starting to comment negatively on the ads.','frequency 太高了人们开始在广告下留下负面评论。',2,['ads','metrics']);
add('A/B test','A/B 测试','split test','Ads / Acquisition','paid acquisition','optimise performance','We ran an A/B test on the headline and the version with a question outperformed by 30 percent.','我们对标题进行了 A/B test 带问句的版本表现好了百分之三十。',2,['ads','optimisation']);
add('ad account','广告账户','ad platform account','Ads / Acquisition','paid acquisition','manage campaigns','Our ad account was flagged for review after we changed the payment method.','我们更换支付方式后 ad account 被标记为需要审查。',2,['ads','technical']);
add('ad spend','广告支出','money on ads','Ads / Acquisition','paid acquisition','track budget','We capped the daily ad spend at two hundred dollars while we test new creatives.','我们在测试新 creative 时将每日 ad spend 上限设为两百美元。',1,['ads','finance']);

// Email extras
add('drip campaign','滴灌式营销','timed email series','Email / CRM','email marketing','educate leads','The drip campaign sends one email per day for five days introducing different product benefits.','drip campaign 每天发送一封邮件连续五天介绍不同的产品 benefits。',2,['email','strategy']);
add('list cleaning','列表清理','remove inactive','Email / CRM','email marketing','maintain deliverability','We do list cleaning every quarter to remove subscribers who have not opened in six months.','我们每季度做一次 list cleaning 删除六个月未打开的 subscriber。',2,['email','maintenance']);
add('sender reputation','发件人信誉','email trust score','Email / CRM','email marketing','ensure delivery','A poor sender reputation means your emails land in spam regardless of content quality.','poor sender reputation 意味着你的邮件无论内容质量如何都会被送入 spam。',3,['email','technical']);
add('cart recovery email','购物车挽回邮件','abandoned cart email','Email / CRM','email marketing','recover sales','The first cart recovery email goes out one hour after the cart is abandoned.','第一封 cart recovery email 在购物车 abandoned 一小时后发出。',2,['email','automation']);
add('thank-you page','感谢页面','post-purchase page','Email / CRM','email marketing','confirm purchase','The thank-you page is a great place to offer a one-time upsell or ask for a referral.','thank-you page 是提供一次性 upsell 或请求 referral 的好地方。',1,['email','conversion']);

// More support
add('return label','退货标签','prepaid return sticker','Customer Support','customer support','simplify returns','We include a prepaid return label in every package so customers can send items back for free.','我们在每个包裹中附上 prepaid return label 让客户可以免费寄回商品。',1,['support','logistics']);
add('refund policy','退款政策','money-back rules','Customer Support','customer support','set expectations','Our refund policy allows returns within 30 days as long as the product is unused.','我们的 refund policy 允许 30 天内退货只要产品未使用。',1,['support','policy']);
add('live chat','在线聊天','real-time support','Customer Support','customer support','provide instant help','We added live chat to the website and the average response time dropped from 12 hours to 3 minutes.','我们在网站上添加了 live chat 平均 response time 从 12 小时降到 3 分钟。',1,['support','tools']);
add('help centre','帮助中心','support knowledge base','Customer Support','customer support','enable self-service','The help centre has articles for the most common questions which reduces our support ticket volume.','help centre 有针对最常见问题的文章这减少了我们的 support ticket 数量。',1,['support','tools']);
add('order confirmation','订单确认','purchase verification','Customer Support','customer support','confirm transactions','The order confirmation email is sent immediately after purchase with a summary and tracking link.','order confirmation 邮件在购买后立即发送包含摘要和追踪链接。',1,['support','communication']);

// More logistics
add('pick and pack','拣货打包','select and box','Fulfillment / Logistics','logistics','process orders','The 3PL charges per pick and pack which adds about two dollars to each order.','3PL 按 pick and pack 收费每个订单大约增加两美元。',2,['logistics','operations']);
add('bulk shipping','批量发货','large-volume delivery','Fulfillment / Logistics','logistics','reduce cost','Bulk shipping to one region can cut the per-unit cost by nearly half compared to individual shipments.','批量发货到一个地区与单独 shipment 相比可以将 per-unit cost 减少近一半。',2,['logistics','strategy']);
add('shipping zone','运输区域','delivery area','Fulfillment / Logistics','logistics','calculate cost','Our shipping zones are based on distance from the warehouse with Zone 8 being the most expensive.','我们的 shipping zone 基于与仓库的距离 Zone 8 最贵。',2,['logistics','operations']);
add('dimensional weight','体积重量','size-based weight','Fulfillment / Logistics','logistics','calculate cost','The carrier charges by dimensional weight so a large light box costs more than a small heavy one.','承运商按 dimensional weight 收费所以大而轻的箱子比小而重的更贵。',3,['logistics','operations']);
add('proof of delivery','签收证明','delivery confirmation','Fulfillment / Logistics','logistics','verify receipt','The carrier provided proof of delivery with a photo of the package at the front door.','承运商提供了 proof of delivery 附有包裹在前门的照片。',2,['logistics','operations']);

// More supplier
add('bill of lading','提单','shipping document','Supplier / Foreign Trade','supplier communication','document shipment','The bill of lading is the most important document because it proves ownership of the goods.','bill of lading 是最重要的文件因为它证明了货物的 ownership。',4,['supplier','documentation']);
add('certificate of origin','原产地证','origin document','Supplier / Foreign Trade','supplier communication','comply with customs','We need a certificate of origin to qualify for the lower tariff rate under the trade agreement.','我们需要 certificate of origin 以获得 trade agreement 下的较低关税税率。',4,['supplier','documentation']);
add('overtime','加班','extra working hours','Supplier / Foreign Trade','supplier communication','meet deadline','The factory will run overtime this weekend to catch up on the production delay from last week.','工厂本周末将 run overtime 以赶上上周的生产 delay。',2,['supplier','production']);
add('reorder point','补货点','when to reorder','Supplier / Foreign Trade','supplier communication','plan inventory','We set the reorder point at two weeks of stock so we never run out before the next shipment arrives.','我们把 reorder point 设在两周库存量这样在下一批 shipment 到达前不会断货。',3,['supplier','planning']);
add('safety stock','安全库存','buffer inventory','Supplier / Foreign Trade','supplier communication','prevent shortages','We keep two weeks of safety stock for the best-selling SKU in case of unexpected demand spikes.','我们为最畅销的 SKU 保留两周的 safety stock 以防意外需求激增。',2,['supplier','planning']);

// === EXECUTION 2 ===
const updated = data.concat(newItems);
fs.writeFileSync(file, JSON.stringify(updated));
console.log('Batch 2: Total added',added,'| Skipped:',skipped,'| File total:',updated.length);
if (updated.length < TARGET) console.log('Need', TARGET - updated.length, 'more');

// === BATCH 3: Corrected exampleZh — only target term in English ===
add('campaign page','活动页面','campaign web page','Crowdfunding Campaign','campaign live','present campaign','The campaign page needs a stronger video that explains the product clearly.','campaign page 需要一个更强的视频来清楚地解释产品。',1,['crowdfunding','marketing']);
add('backer number','支持者编号','backer ID','Crowdfunding Campaign','campaign live','track supporters','Your backer number is on the confirmation email you received after pledging.','你的 backer number 在你认缴后收到的确认邮件里。',1,['crowdfunding','communication']);
add('superbacker','超级支持者','repeat backer','Crowdfunding Campaign','campaign live','identify advocates','Superbackers have backed over fifty projects and tend to pledge early and share widely.','superbacker 已经支持了超过五十个项目，通常会早早认缴并广泛分享。',3,['crowdfunding','community']);
add('campaign video','活动视频','campaign video','Crowdfunding Campaign','pre-launch','engage visitors','The campaign video should show the product in action within the first ten seconds.','campaign video 应该在头十秒内展示产品的实际使用。',1,['crowdfunding','content']);
add('backer community','支持者社群','supporter community','Crowdfunding Campaign','campaign live','build engagement','Our backer community is very active in the comments section sharing tips and feedback.','我们的 backer community 在评论区非常活跃，分享技巧和反馈。',1,['crowdfunding','community']);
add('press kit','媒体资料包','media package','Crowdfunding Campaign','pre-launch','earn media coverage','We sent the press kit to over fifty journalists two weeks before launch day.','我们在上线前两周把 press kit 发给了五十多位记者。',2,['crowdfunding','marketing']);
add('viral coefficient','病毒系数','viral growth rate','Crowdfunding Campaign','campaign live','measure sharing','Our viral coefficient is above one which means every backer brings in more than one new backer on average.','我们的 viral coefficient 超过一，意味着平均每个支持者带来超过一个新支持者。',3,['crowdfunding','growth']);
add('campaign analytics','活动分析','campaign data','Crowdfunding Campaign','campaign live','track performance','Campaign analytics show that most pledges come in between 6pm and 10pm on weekdays.','campaign analytics 显示大多数认缴发生在工作日晚六点到十点之间。',2,['crowdfunding','data']);

// Shopify/DTC
add('storefront','店铺门面','online store','Shopify / DTC Store','dtc store operation','present brand','The storefront needs a cleaner design with less clutter above the fold.','storefront 需要更简洁的设计，首屏减少杂乱。',1,['dtc','design']);
add('payment gateway','支付网关','payment processor','Shopify / DTC Store','dtc store operation','accept payments','We switched payment gateways because the old one did not support local currency in Singapore.','我们更换了 payment gateway，因为旧的在新加坡不支持当地货币。',2,['dtc','technical']);
add('inventory sync','库存同步','stock sync','Shopify / DTC Store','dtc store operation','avoid overselling','The inventory sync between Shopify and the warehouse is delayed by about two hours.','Shopify 和仓库之间的 inventory sync 延迟了大约两小时。',2,['dtc','operations'],'collocation','neutral');
add('product variant','产品变体','product option','Shopify / DTC Store','dtc store operation','offer choices','The most popular product variant is the black one with the larger battery.','最受欢迎的 product variant 是带大电池的黑色款。',1,['dtc','product']);
add('sales tax','销售税','tax on purchase','Shopify / DTC Store','dtc store operation','comply with tax','We need to configure the sales tax settings correctly for each state we ship to.','我们需要为每个发货州正确配置 sales tax 设置。',2,['dtc','finance'],'collocation','neutral');
add('order tracking','订单追踪','shipment tracking','Shopify / DTC Store','dtc store operation','keep customers informed','The order tracking page should show the real-time status from the carrier API.','order tracking 页面应该显示来自承运商 API 的实时状态。',1,['dtc','operations']);

// Ads
add('ad copy','广告文案','ad text','Ads / Acquisition','paid acquisition','craft message','The ad copy should speak directly to the pain point not just describe the product.','ad copy 应该直接针对痛点，而不仅仅是描述产品。',1,['ads','content']);
add('landing page view','落地页浏览','page visit','Ads / Acquisition','paid acquisition','measure traffic','Landing page views are up but conversions are flat which suggests a page issue not an ad issue.','landing page view 上升了但转化持平，说明是页面问题而不是广告问题。',2,['ads','metrics']);
add('cost cap','成本上限','spending limit','Ads / Acquisition','paid acquisition','control budget','We set a cost cap of twenty dollars per purchase to keep the campaign profitable.','我们把每个购买的 cost cap 设在二十美元以保持活动盈利。',2,['ads','strategy']);
add('audience overlap','受众重叠','audience duplication','Ads / Acquisition','paid acquisition','optimise targeting','The audience overlap between our two ad sets is over forty percent so we are wasting budget.','两个广告组之间的 audience overlap 超过百分之四十，所以我们在浪费预算。',3,['ads','optimisation']);

// Email
add('email sequence','邮件序列','email chain','Email / CRM','email marketing','nurture leads','The email sequence starts with a welcome message then shares social proof then asks for the sale.','email sequence 从欢迎消息开始，然后分享社会证明，最后请求购买。',1,['email','strategy']);
add('bounce rate','退信率','email rejection rate','Email / CRM','email marketing','monitor deliverability','Our bounce rate spiked after we imported a list of old subscribers without cleaning it first.','我们在没清洗旧订阅者列表就导入后 bounce rate 激增。',2,['email','metrics']);
add('preview text','预览文字','email snippet','Email / CRM','email marketing','increase opens','The preview text should complement the subject line not just repeat it.','preview text 应该补充标题而不是简单重复。',1,['email','content']);
add('A/B test','A/B 测试','split test','Email / CRM','email marketing','optimise performance','We ran an A/B test on the subject line and the version with a question performed better.','我们对标题做了 A/B test，带问句的版本表现更好。',1,['email','optimisation']);

// Customer Support
add('return label','退货标签','prepaid return sticker','Customer Support','customer support','simplify returns','We include a prepaid return label in every package so customers can send items back easily.','我们在每个包裹里放了 prepaid return label，让客户可以轻松退货。',1,['support','logistics']);
add('refund policy','退款政策','money-back rules','Customer Support','customer support','set expectations','Our refund policy allows returns within thirty days as long as the product is unused.','我们的 refund policy 允许三十天内退货，只要产品未使用。',1,['support','policy']);
add('help centre','帮助中心','support knowledge base','Customer Support','customer support','enable self-service','The help centre has articles for common questions which cuts our ticket volume by half.','help centre 有常见问题的文章，把我们的工单量减少了一半。',1,['support','tools']);
add('order confirmation','订单确认','purchase verification','Customer Support','customer support','confirm transactions','The order confirmation email goes out instantly after the payment is processed.','order confirmation 邮件在付款处理后立即发出。',1,['support','communication']);

// Logistics
add('pick and pack','拣货打包','select and box','Fulfillment / Logistics','logistics','process orders','The 3PL charges per pick and pack which adds about two dollars to every order.','3PL 按 pick and pack 收费，每个订单增加约两美元。',2,['logistics','operations']);
add('shipping zone','运输区域','delivery area','Fulfillment / Logistics','logistics','calculate cost','Our shipping zones are based on distance from the warehouse with Zone 8 costing the most.','我们的 shipping zone 基于距离仓库的远近，Zone 8 最贵。',2,['logistics','operations']);
add('dimensional weight','体积重量','size-based weight','Fulfillment / Logistics','logistics','calculate cost','The carrier charges by dimensional weight so a large light box costs more than a small heavy one.','承运商按 dimensional weight 收费，所以大而轻的箱子比小而重的更贵。',3,['logistics','operations']);
add('proof of delivery','签收证明','delivery confirmation','Fulfillment / Logistics','logistics','verify receipt','The carrier provided proof of delivery with a photo of the package at the front door.','承运商提供了 proof of delivery，附有包裹在前门的照片。',2,['logistics','operations']);
add('freight charge','运费','shipping cost','Fulfillment / Logistics','logistics','manage costs','The freight charge for air shipping is nearly triple the cost of sea freight.','空运的 freight charge 几乎是海运成本的三倍。',2,['logistics','finance']);

// Supplier
add('bill of lading','提单','shipping document','Supplier / Foreign Trade','supplier communication','document shipment','The bill of lading is essential because it proves legal ownership of the shipped goods.','bill of lading 至关重要因为它证明了所运货物的合法所有权。',4,['supplier','documentation']);
add('certificate of origin','原产地证','origin document','Supplier / Foreign Trade','supplier communication','comply with customs','We need a certificate of origin to qualify for the reduced tariff rate under the trade deal.','我们需要 certificate of origin 以获得贸易协定下的降低关税率。',4,['supplier','documentation']);
add('reorder point','补货点','when to reorder','Supplier / Foreign Trade','supplier communication','plan inventory','We set the reorder point at two weeks of stock so we never sell out before the next shipment.','我们把 reorder point 设在两周库存量，这样在下一批到货前不会售罄。',3,['supplier','planning']);
add('safety stock','安全库存','buffer inventory','Supplier / Foreign Trade','supplier communication','prevent shortages','We keep two weeks of safety stock for the bestselling item in case of unexpected demand.','我们为最畅销的产品保留了两周的 safety stock 以防意外需求。',2,['supplier','planning']);
add('production schedule','生产排期','manufacturing timeline','Supplier / Foreign Trade','supplier communication','track progress','The production schedule shows the first batch completing in early November.','production schedule 显示第一批在十一月初完成。',2,['supplier','production']);

if (newItems.length > 0) {
  const updated = data.concat(newItems);
  fs.writeFileSync(file, JSON.stringify(updated));
}
console.log('Batch 3: Total added',added,'| Total:', data.length + added);

// === BATCH 4: More terms, corrected exampleZh ===
add('social proof','社会证明','customer validation','Crowdfunding Campaign','campaign live','build trust','Adding social proof like backer quotes to the page increased our conversion rate.','在页面上添加支持者引语等 social proof 提高了我们的转化率。',2,['crowdfunding','marketing']);
add('influencer outreach','达人外联','contacting influencers','Crowdfunding Campaign','pre-launch','earn coverage','We started influencer outreach about a month before launch and got ten product review videos.','我们在上线前大约一个月开始 influencer outreach，得到了十个产品评测视频。',2,['crowdfunding','marketing']);
add('press release','新闻稿','media announcement','Crowdfunding Campaign','pre-launch','earn media','The press release went out on the same day the campaign went live.','press release 在活动上线的同一天发出。',1,['crowdfunding','marketing']);
add('conversion funnel','转化漏斗','purchase path','Shopify / DTC Store','dtc store operation','analyse flow','The conversion funnel shows a big drop between add-to-cart and checkout.','conversion funnel 显示从加购到结账之间有大量流失。',2,['dtc','analytics']);
add('upsell offer','加购优惠','upgrade suggestion','Shopify / DTC Store','dtc store operation','increase AOV','The upsell offer appears right after the customer clicks add to cart.','加购优惠在客户点击加入购物车后立即出现。',1,['dtc','sales'],'collocation','neutral');
add('shipping calculator','运费计算器','delivery cost tool','Shopify / DTC Store','dtc store operation','show costs','The shipping calculator on the cart page should estimate costs before checkout.','购物车页面的 shipping calculator 应该在结账前估算费用。',1,['dtc','tools']);
add('product tag','产品标签','item label','Shopify / DTC Store','dtc store operation','organise products','We use product tags to automatically sort items into the right collection pages.','我们用 product tag 自动将商品归类到正确的系列页面中。',1,['dtc','operations']);
add('retargeting pixel','再营销像素','remarketing code','Ads / Acquisition','paid acquisition','track visitors','The retargeting pixel needs to fire on every product page not just the homepage.','retargeting pixel 需要在每个产品页触发而不仅仅是首页。',2,['ads','technical']);
add('ad engagement','广告互动','ad interaction','Ads / Acquisition','paid acquisition','measure response','Ad engagement is up but purchases have not followed which suggests a landing page issue.','ad engagement 上升了但购买没有跟上来，说明是落地页的问题。',2,['ads','metrics']);
add('negative feedback','负面反馈','bad response','Ads / Acquisition','paid acquisition','monitor sentiment','The negative feedback score on this ad set is too high so we need to adjust the targeting.','这个广告组的 negative feedback 分数太高了，我们需要调整定向。',2,['ads','metrics']);
add('list growth','列表增长','subscriber increase','Email / CRM','email marketing','grow audience','Our list growth slowed after we removed the pop-up from the homepage.','我们从首页移除弹窗后 list growth 放缓了。',1,['email','metrics']);
add('spam complaint','垃圾投诉','spam report','Email / CRM','email marketing','maintain reputation','A spam complaint rate above 0.1 percent can hurt your sender reputation with email providers.','超过百分之零点一的 spam complaint 率会损害你在邮件服务商那里的发件人信誉。',3,['email','technical']);
add('email deliverability','邮件送达率','inbox rate','Email / CRM','email marketing','ensure delivery','Email deliverability dropped after we switched to a new sending domain without warming it up.','我们在没有预热新发送域名的情况下切换后 email deliverability 下降了。',3,['email','technical']);
add('priority support','优先支持','faster help','Customer Support','customer support','serve VIP customers','We offer priority support to customers who have spent over five hundred dollars with us.','我们为消费超过五百美元的客户提供 priority support。',1,['support','service']);
add('knowledge base','知识库','article collection','Customer Support','customer support','enable self-help','The knowledge base now has over a hundred articles covering the most common issues.','knowledge base 现在有超过一百篇文章涵盖了最常见的问题。',1,['support','tools']);
add('stockout','断货','out of stock','Fulfillment / Logistics','logistics','avoid shortages','A stockout of the best-selling variant during a promotion is a nightmare scenario.','促销期间最畅销变体的 stockout 是一场噩梦。',2,['logistics','operations']);
add('customs clearance','清关','border processing','Fulfillment / Logistics','logistics','clear international','Customs clearance took nearly two weeks because the paperwork was incomplete.','因为文件不完整 customs clearance 花了将近两周。',3,['logistics','international']);
add('incoterms','国际贸易术语','trade terms','Supplier / Foreign Trade','supplier communication','agree delivery terms','We need to agree on the incoterms before signing the purchase order.','我们需要在签署采购订单之前就 incoterms 达成一致。',4,['supplier','international']);
add('purchase order','采购订单','buy order','Supplier / Foreign Trade','supplier communication','formalise order','The purchase order must be signed by both parties before production can begin.','purchase order 必须在生产开始前由双方签署。',2,['supplier','documentation']);
add('payment term','付款条件','pay condition','Supplier / Foreign Trade','supplier communication','agree payment','The payment term is net thirty days from the date of the commercial invoice.','payment term 是从商业发票日期起 net 30 天。',2,['supplier','finance']);

const finalUpdated = data.concat(newItems);
fs.writeFileSync(file, JSON.stringify(finalUpdated));
console.log('Batch 4: Total added',added,'| File total:', finalUpdated.length);
if (finalUpdated.length < TARGET) console.log('Need', TARGET - finalUpdated.length, 'more');

// === BATCH 5: Large batch ===
add('reward survey','回报调查','reward questionnaire','Crowdfunding Campaign','post-campaign fulfillment','collect preferences','The reward survey asks backers to choose their preferred colour and confirm their address.','reward survey 让支持者选择偏好的颜色并确认地址。',1,['crowdfunding','communication']);
add('project timeline','项目时间线','schedule','Crowdfunding Campaign','campaign live','set expectations','The project timeline on the campaign page shows delivery estimated for next March.','活动页面上的 project timeline 显示预计明年三月交付。',1,['crowdfunding','planning']);
add('bulk discount','批量折扣','volume price break','Shopify / DTC Store','dtc store operation','increase AOV','We added a bulk discount for orders of three or more units and the average cart size jumped.','我们为三件及以上订单添加了 bulk discount，平均购物车金额大涨。',2,['dtc','pricing']);
add('product bundle','产品捆绑','item combo','Shopify / DTC Store','dtc store operation','increase order value','The product bundle pairs the main device with a case and screen protector at a slight discount.','product bundle 将主设备与保护壳和屏幕保护膜以小幅折扣组合在一起。',1,['dtc','sales']);
add('loyalty programme','忠诚计划','reward scheme','Shopify / DTC Store','dtc store operation','retain customers','The loyalty programme gives points for every purchase that can be redeemed for discounts.','loyalty programme 每次购买都给积分可以兑换折扣。',1,['dtc','retention']);
add('referral link','推荐链接','share link','Shopify / DTC Store','dtc store operation','grow through word of mouth','Customers get a unique referral link to share with friends for a ten-dollar credit.','客户获得一个唯一的 referral link 分享给朋友可获得十美元积分。',1,['dtc','growth']);
add('cost per purchase','每次购买成本','acquisition cost','Ads / Acquisition','paid acquisition','measure efficiency','The cost per purchase on Meta Ads dropped after we refined the lookalike audience.','我们在优化相似受众后 Meta Ads 上的 cost per purchase 下降了。',2,['ads','metrics']);
add('ad schedule','广告排期','ad timing','Ads / Acquisition','paid acquisition','control timing','The ad schedule only runs during business hours because that is when our support team is online.','ad schedule 只在工作时间运行因为那时我们的支持团队在线。',1,['ads','strategy']);
add('dynamic product ad','动态产品广告','personalised ad','Ads / Acquisition','paid acquisition','retarget with products','Dynamic product ads show people the exact item they viewed but did not buy.','dynamic product ad 向人们展示他们看过但没买的确切商品。',2,['ads','technical']);
add('email automation','邮件自动化','auto email','Email / CRM','email marketing','save time','Email automation handles the welcome flow abandoned cart flow and post-purchase follow-up.','email automation 处理欢迎流程、弃购流程和购后跟进。',2,['email','automation']);
add('conversion email','转化邮件','sales email','Email / CRM','email marketing','drive purchases','The conversion email is the one that actually asks for the sale with a clear call to action.','conversion email 是真正请求购买的邮件带有明确的行动号召。',1,['email','strategy']);
add('customer feedback','客户反馈','user opinions','Customer Support','customer support','gather insights','Customer feedback from the post-purchase survey revealed that packaging could be improved.','购后调查的 customer feedback 显示包装可以改进。',1,['support','feedback']);
add('ticket volume','工单量','support request count','Customer Support','customer support','measure workload','Ticket volume tripled during the campaign launch because backers had urgent questions.','活动上线期间 ticket volume 翻了三倍因为支持者有紧急问题。',1,['support','metrics']);
add('warehouse capacity','仓库容量','storage space','Fulfillment / Logistics','logistics','plan storage','Warehouse capacity is nearly full so we need to ship the next batch before more inventory arrives.','warehouse capacity 快满了所以我们需要在更多库存到达前发出下一批。',2,['logistics','operations']);
add('parcel tracking','包裹追踪','package tracking','Fulfillment / Logistics','logistics','keep customers informed','Parcel tracking updates are sent automatically at every major checkpoint in the delivery journey.','parcel tracking 更新会在派送旅程的每个主要节点自动发送。',1,['logistics','communication']);
add('supplier audit','供应商审计','factory check','Supplier / Foreign Trade','supplier communication','verify quality','We conduct a supplier audit twice a year to ensure working conditions and quality standards.','我们每年进行两次 supplier audit 以确保工作条件和质量标准。',3,['supplier','quality']);
add('production sample','生产样品','pre-production sample','Supplier / Foreign Trade','supplier communication','approve quality','The production sample must be signed off before mass production can begin.','production sample 必须在量产开始前签字确认。',2,['supplier','quality']);
add('shipping marks','唛头','box labels','Supplier / Foreign Trade','supplier communication','label correctly','The shipping marks on each carton must include the purchase order number and destination.','每个纸箱上的 shipping marks 必须包含采购订单号和目的地。',3,['supplier','documentation']);

const ftFinal = data.concat(newItems);
fs.writeFileSync(file, JSON.stringify(ftFinal));
console.log('All batches done. Added',added,'| Total:', ftFinal.length);

