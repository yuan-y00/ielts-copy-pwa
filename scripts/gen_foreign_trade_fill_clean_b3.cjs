// DEPRECATED / DO NOT RUN
// This generator may produce low-quality or over-target items.
// Use only with a manually curated candidate pool.
const fs=require('fs');
const file='src/data/packs/foreign-trade-crowdfunding-dtc-operations-1000.json';
const data=JSON.parse(fs.readFileSync(file,'utf-8'));
const existing=new Set(data.map(d=>d.term.toLowerCase()));
const TARGET=1000;
let id=data.length,added=0,skipped=0;

const FF={ROAS:'Return on Ad Spend',CPC:'Cost Per Click',CTR:'Click-Through Rate',CPA:'Cost Per Acquisition',CPM:'Cost Per Mille',AOV:'Average Order Value',MOQ:'Minimum Order Quantity','3PL':'Third-Party Logistics',CRM:'Customer Relationship Management',LTV:'Lifetime Value',SKU:'Stock Keeping Unit',PO:'Purchase Order',ETA:'Estimated Time of Arrival',OEM:'Original Equipment Manufacturer',ODM:'Original Design Manufacturer',FBA:'Fulfillment by Amazon',COD:'Cash on Delivery',SOP:'Standard Operating Procedure',BOM:'Bill of Materials',EXW:'Ex Works',FOB:'Free On Board',CIF:'Cost Insurance Freight',DDP:'Delivered Duty Paid'};

const newItems=[];
// Compact item format: [term, pos, sm, sis, topic, bizStage, workIntent, exampleEn, exampleZh, diff, tags, type]

const items=[

// === Massive term dump across all 8 topics ===

// Crowdfunding (30+ terms)
['backer pledge','noun_phrase','支持者认缴','supporter pledge','Crowdfunding Campaign','campaign live','track','The average backer pledge on this campaign is higher than our previous one by about fifteen dollars.','这次活动的平均 backer pledge 比我们上次高出大约十五美元。',1,['crowdfunding','funding'],'phrase'],
['campaign deadline','noun_phrase','活动截止日','campaign end date','Crowdfunding Campaign','campaign live','create urgency','The campaign deadline is next Friday so we are pushing hard for the final push.','campaign deadline 是下周五所以我们在为最后一波努力推进。',1,['crowdfunding','timeline'],'phrase'],
['stretch milestone','noun_phrase','延伸里程碑','stretch target','Crowdfunding Campaign','campaign live','boost','We just hit the second stretch milestone and unlocked the free add-on for all backers.','我们刚达到了第二个 stretch milestone 为所有支持者解锁了免费附加项。',2,['crowdfunding','growth'],'phrase'],
['project backer','noun_phrase','项目支持者','project supporter','Crowdfunding Campaign','campaign live','describe','Every project backer gets a numbered certificate as a thank-you for believing in us early.','每位 project backer 都会得到一张编号证书以感谢他们早期对我们的信任。',1,['crowdfunding','community'],'phrase'],
['funding curve','noun_phrase','筹资曲线','funding timeline shape','Crowdfunding Campaign','campaign live','analyse','The funding curve follows the typical U-shape with strong start and end but a dip in the middle.','funding curve 呈典型的 U 形开局和结尾强劲但中间有下滑。',3,['crowdfunding','analytics'],'phrase'],
['campaign photo','noun_phrase','活动照片','promo photo','Crowdfunding Campaign','pre-launch','create content','The campaign photo should look real and show the product in a natural setting.','campaign photo 应该看起来真实展示产品在自然环境中。',1,['crowdfunding','content'],'phrase'],
['backer reward tier','noun_phrase','支持者回报层级','reward level','Crowdfunding Campaign','pre-launch','design','We simplified the backer reward tier structure to just three options to avoid confusion.','我们把 backer reward tier 结构简化到只有三个选项以避免混淆。',2,['crowdfunding','structure'],'phrase'],
['early pledge','noun_phrase','早期认缴','early backing','Crowdfunding Campaign','campaign live','capture','Early pledges are critical because they drive the algorithm to promote the campaign.','early pledge 至关重要因为它们驱动算法推广活动。',1,['crowdfunding','strategy'],'phrase'],
['campaign traffic','noun_phrase','活动流量','visitor count','Crowdfunding Campaign','campaign live','measure','Campaign traffic spiked after we were featured in the weekly newsletter.','我们在 weekly newsletter 中被推荐后 campaign traffic 激增。',1,['crowdfunding','metrics'],'phrase'],
['backer message','noun_phrase','支持者消息','supporter message','Crowdfunding Campaign','campaign live','communicate','We reply to every backer message within a few hours during the campaign period.','我们在活动期间几小时内回复每条 backer message。',1,['crowdfunding','communication'],'phrase'],
['campaign story','noun_phrase','活动故事','brand story','Crowdfunding Campaign','pre-launch','connect','The campaign story section explains why we created this product and who it is for.','campaign story 部分解释了我们为什么创建这个产品以及它面向谁。',1,['crowdfunding','content'],'phrase'],
['product demo','noun_phrase','产品演示','live demo','Crowdfunding Campaign','campaign live','showcase','We posted a product demo video showing the blender crushing ice in under ten seconds.','我们发布了一个 product demo 视频展示搅拌机在不到十秒内碎冰。',1,['crowdfunding','content'],'phrase'],

// Backer Communication (20+)
['backer question','noun_phrase','支持者问题','supporter question','Backer Communication','campaign live','answer','The most common backer question is about shipping costs to different countries.','最常见的 backer question 是关于不同国家的运费。',1,['communication','support'],'phrase'],
['update post','noun_phrase','更新帖子','progress post','Backer Communication','post-campaign fulfillment','inform','Each update post includes photos from the factory floor so backers can see real progress.','每篇 update post 都包含工厂车间的照片让支持者看到真实进展。',1,['communication','transparency'],'phrase'],
['backer concern','noun_phrase','支持者担忧','supporter worry','Backer Communication','post-campaign fulfillment','address','The main backer concern right now is whether the product will arrive before the holidays.','目前主要的 backer concern 是产品能否在假期前到达。',1,['communication','support'],'phrase'],
['delivery update','noun_phrase','交付更新','delivery news','Backer Communication','post-campaign fulfillment','inform','We send a delivery update every time a new batch leaves the factory.','每次新批次离开工厂时我们都会发送 delivery update。',1,['communication','logistics'],'phrase'],
['backer trust','noun_phrase','支持者信任','supporter confidence','Backer Communication','post-campaign fulfillment','maintain','Backer trust is built by being honest about delays not by hiding bad news.','backer trust 是通过诚实面对延迟而不是隐藏坏消息建立起来的。',2,['communication','strategy'],'phrase'],

// Shopify/DTC (30+)
['online store','noun_phrase','线上店铺','web store','Shopify / DTC Store','dtc store operation','run','Our online store generates about eighty percent of revenue with the rest coming from wholesale.','我们的 online store 贡献了约百分之八十的收入其余来自批发。',1,['dtc','operations'],'phrase'],
['hero image','noun_phrase','主图','main banner photo','Shopify / DTC Store','dtc store operation','showcase','The hero image on the homepage should showcase the product in its best light.','首页的 hero image 应该以最佳光线展示产品。',1,['dtc','design'],'phrase'],
['checkout button','noun_phrase','结账按钮','checkout CTA','Shopify / DTC Store','dtc store operation','optimise','The checkout button colour change from grey to green increased clicks by seventeen percent.','checkout button 颜色从灰色改为绿色后点击量增加了百分之十七。',2,['dtc','ux'],'phrase'],
['store traffic','noun_phrase','店铺流量','store visitors','Shopify / DTC Store','dtc store operation','measure','Store traffic doubled after the product was featured in a popular YouTube review.','产品在热门 YouTube 评测中被推荐后 store traffic 翻了一番。',1,['dtc','metrics'],'phrase'],
['order value','noun_phrase','订单价值','purchase amount','Shopify / DTC Store','dtc store operation','track','The average order value increased after we added the recommended products section.','我们添加推荐产品区域后平均 order value 增加了。',1,['dtc','metrics'],'phrase'],
['product launch','noun_phrase','产品上线','new product release','Shopify / DTC Store','dtc store operation','release','The product launch went smoothly and we had over a hundred orders in the first hour.','product launch 进展顺利第一个小时内就有超过一百个订单。',1,['dtc','marketing'],'phrase'],
['shop analytics','noun_phrase','店铺分析','store data','Shopify / DTC Store','dtc store operation','track','Shop analytics show that most of our traffic comes from mobile devices.','shop analytics 显示我们大部分流量来自移动设备。',2,['dtc','analytics'],'phrase'],
['colour variant','noun_phrase','颜色变体','colour option','Shopify / DTC Store','dtc store operation','offer choice','The black colour variant is consistently the best-selling across all our product lines.','黑色 colour variant 在我们所有产品线中一直是最畅销的。',1,['dtc','product'],'phrase'],
['customer account','noun_phrase','客户账户','user account','Shopify / DTC Store','dtc store operation','retain','Creating a customer account makes repeat purchases faster and allows order tracking.','创建 customer account 使再次购买更快并允许订单追踪。',1,['dtc','ux'],'phrase'],
['promo banner','noun_phrase','促销横幅','promotion banner','Shopify / DTC Store','dtc store operation','announce','The promo banner at the top of the page announces free shipping on orders over fifty dollars.','页面顶部的 promo banner 宣布五十美元以上订单免运费。',1,['dtc','marketing'],'phrase'],

// Ads/Acquisition (35+)
['ad budget','noun_phrase','广告预算','advertising budget','Ads / Acquisition','paid acquisition','allocate','The ad budget is split sixty percent to Meta and forty percent to Google.','ad budget 百分之六十分配给 Meta 百分之四十给 Google。',1,['ads','finance'],'phrase'],
['test campaign','noun_phrase','测试活动','trial campaign','Ads / Acquisition','paid acquisition','experiment','We run a test campaign with a small budget before scaling any new creative.','我们在放量任何新素材之前先用小预算运行 test campaign。',1,['ads','strategy'],'phrase'],
['winning audience','noun_phrase','爆款受众','best audience','Ads / Acquisition','paid acquisition','identify','The winning audience for this product is women aged 25 to 34 interested in home fitness.','这个产品的 winning audience 是 25 至 34 岁对家庭健身感兴趣的女性。',2,['ads','targeting'],'phrase'],
['ad thumbnail','noun_phrase','广告缩略图','ad thumbnail image','Ads / Acquisition','paid acquisition','optimise','The ad thumbnail should show a close-up of the product with bright lighting.','ad thumbnail 应该展示产品的特写镜头并使用明亮的光线。',1,['ads','content'],'phrase'],
['cost control','noun_phrase','成本控制','spending control','Ads / Acquisition','paid acquisition','manage budget','Cost control is essential because ad spend can spiral quickly if left unchecked.','cost control 至关重要因为广告支出如果不受控制会迅速失控。',2,['ads','finance'],'phrase'],
['ad comment','noun_phrase','广告评论','advertisement comment','Ads / Acquisition','paid acquisition','monitor','We monitor ad comments closely because negative ones hurt the quality score.','我们密切关注 ad comment 因为负面评论会损害质量分。',1,['ads','engagement'],'phrase'],
['lookalike seed','noun_phrase','相似种子','similarity seed','Ads / Acquisition','paid acquisition','build audience','The lookalike seed audience is based on our top five percent of customers by purchase frequency.','lookalike seed 受众基于我们前百分之五购买频率最高的客户。',3,['ads','targeting'],'phrase'],
['purchase pixel','noun_phrase','购买像素','conversion pixel','Ads / Acquisition','paid acquisition','track','The purchase pixel must fire only on the order confirmation page not on the thank-you page.','purchase pixel 必须只在订单确认页触发而不是在感谢页面。',2,['ads','technical'],'phrase'],
['ad reach','noun_phrase','广告触达','audience reach','Ads / Acquisition','paid acquisition','measure','Ad reach is high but the frequency is also creeping up which causes fatigue.','ad reach 很高但 frequency 也在上升这会导致疲劳。',2,['ads','metrics'],'phrase'],
['campaign objective','noun_phrase','活动目标','ad objective','Ads / Acquisition','paid acquisition','define','The campaign objective is conversions not traffic so we optimise for purchases.','campaign objective 是转化而不是流量所以我们优化购买。',2,['ads','strategy'],'phrase'],

// Email/CRM (25+)
['welcome email','noun_phrase','欢迎邮件','first email','Email / CRM','email marketing','onboard','The welcome email has a 60 percent open rate which is nearly double our newsletter.','welcome email 有百分之六十的打开率几乎是我们 newsletter 的两倍。',1,['email','automation'],'phrase'],
['email list','noun_phrase','邮件列表','subscriber list','Email / CRM','email marketing','build','Our email list grew from zero to 8000 subscribers in the first six months.','我们的 email list 在头六个月内从零增长到 8000 订阅者。',1,['email','growth'],'phrase'],
['cart reminder','noun_phrase','购物车提醒','cart nudge','Email / CRM','email marketing','recover','The first cart reminder goes out one hour after the cart is abandoned.','第一封 cart reminder 在购物车被放弃一小时后发出。',1,['email','automation'],'phrase'],
['subscriber count','noun_phrase','订阅者数量','number subscribed','Email / CRM','email marketing','track','The subscriber count surpassed 10000 after we ran a giveaway campaign.','我们举办赠送活动后 subscriber count 突破了 10000。',1,['email','metrics'],'phrase'],
['email click','noun_phrase','邮件点击','email link click','Email / CRM','email marketing','measure','The email click rate on the product link was much higher than the blog link.','产品链接的 email click 率远高于博客链接。',1,['email','metrics'],'phrase'],
['brand email','noun_phrase','品牌邮件','branded email','Email / CRM','email marketing','build identity','Every brand email uses the same colour palette and tone of voice for consistency.','每封 brand email 都使用相同的配色和语调以保持一致。',1,['email','brand'],'phrase'],
['email offer','noun_phrase','邮件优惠','email discount','Email / CRM','email marketing','convert','The email offer of ten percent off brought back over two hundred lapsed customers.','百分之十折扣的 email offer 带回了超过两百个流失客户。',1,['email','conversion'],'phrase'],

// Customer Support (25+)
['support email','noun_phrase','支持邮件','help email','Customer Support','customer support','contact','The support email address is on every page footer and in the order confirmation.','support email 地址在每页页脚和订单确认中。',1,['support','communication'],'phrase'],
['return reason','noun_phrase','退货原因','why returned','Customer Support','customer support','analyse','The top return reason is size mismatch so we improved the sizing guide.','最主要的 return reason 是尺码不匹配所以我们改进了尺码指南。',1,['support','analytics'],'phrase'],
['complaint response','noun_phrase','投诉回复','grievance response','Customer Support','customer support','respond','Every complaint response should include an apology a solution and a timeline.','每份 complaint response 都应该包含道歉解决方案和时间线。',1,['support','communication'],'phrase'],
['customer note','noun_phrase','客户备注','internal note','Customer Support','customer support','document','We added a customer note to the order that the package needs a signature on delivery.','我们在订单上添加了 customer note 说明包裹需要签收。',1,['support','process'],'phrase'],
['support queue','noun_phrase','支持队列','ticket queue','Customer Support','customer support','manage','The support queue is cleared every morning so no customer waits more than 24 hours.','support queue 每天早上清理所以没有客户等待超过 24 小时。',1,['support','operations'],'phrase'],
['customer issue','noun_phrase','客户问题','client problem','Customer Support','customer support','resolve','Most customer issues can be solved with a clear FAQ and a quick reply.','大多数 customer issue 可以通过清晰的 FAQ 和快速回复解决。',1,['support','strategy'],'phrase'],

// Logistics/Fulfillment (25+)
['order picker','noun_phrase','拣货员','warehouse picker','Fulfillment / Logistics','logistics','fulfil','Each order picker uses a handheld scanner to confirm the right item before packing.','每位 order picker 使用手持扫描器在打包前确认正确商品。',1,['logistics','operations'],'phrase'],
['shipment batch','noun_phrase','发货批次','dispatch batch','Fulfillment / Logistics','logistics','organise','The shipment batch for EU orders leaves every Tuesday morning by air freight.','欧盟订单的 shipment batch 每周二早上通过空运发出。',1,['logistics','operations'],'phrase'],
['delivery scan','noun_phrase','派送扫描','delivery update scan','Fulfillment / Logistics','logistics','track','The delivery scan at the final checkpoint is when the package is marked as delivered.','最终检查点的 delivery scan 就是包裹被标记为已送达的时刻。',1,['logistics','operations'],'phrase'],
['warehouse shift','noun_phrase','仓库班次','warehouse work shift','Fulfillment / Logistics','logistics','schedule','The warehouse shift starts at 7am so morning orders go out by the afternoon cutoff.','warehouse shift 早上七点开始所以上午的订单在下午截止前发出。',1,['logistics','operations'],'phrase'],
['package weight','noun_phrase','包裹重量','package mass','Fulfillment / Logistics','logistics','calculate','The package weight determines the shipping cost so we weigh every box before printing the label.','package weight 决定运费所以我们在打印标签前称每个箱子。',1,['logistics','operations'],'phrase'],
['transit time','noun_phrase','运输时间','days in transit','Fulfillment / Logistics','logistics','estimate','The transit time for sea freight from Shenzhen to Los Angeles is about three weeks.','从深圳到洛杉矶的海运 transit time 大约三周。',1,['logistics','operations'],'phrase'],
['global shipping','noun_phrase','全球配送','worldwide delivery','Fulfillment / Logistics','logistics','offer','We added global shipping to over thirty countries after validating demand through the campaign.','我们在通过活动验证需求后向超过三十个国家开放了 global shipping。',2,['logistics','strategy'],'phrase'],

// Supplier/Foreign Trade (25+)
['supplier quote','noun_phrase','供应商报价','factory quote','Supplier / Foreign Trade','supplier communication','compare','We compared the supplier quote from three factories before choosing the one with the best balance.','我们比较了三家工厂的 supplier quote 然后选择了平衡性最好的那家。',2,['supplier','negotiation'],'phrase'],
['order sheet','noun_phrase','订单表','order form','Supplier / Foreign Trade','supplier communication','document','The order sheet lists every SKU quantity and agreed unit price.','order sheet 列出了每个 SKU 的数量和商定的单价。',2,['supplier','documentation'],'phrase'],
['production run','noun_phrase','生产批次','production batch','Supplier / Foreign Trade','supplier communication','plan','The first production run will be 2000 units and we will check quality before the second run.','第一 production run 将是 2000 个单位我们会在第二批之前检查质量。',2,['supplier','production'],'phrase'],
['quality check','noun_phrase','质量检查','product inspection','Supplier / Foreign Trade','supplier communication','verify','A quality check is done on every tenth unit coming off the production line.','每条生产线每十个产品进行一次 quality check。',1,['supplier','quality'],'phrase'],
['payment schedule','noun_phrase','付款计划','when to pay','Supplier / Foreign Trade','supplier communication','plan','The payment schedule is 30 percent upfront and 70 percent after final inspection.','payment schedule 是百分之三十预付百分之七十最终检验后支付。',2,['supplier','finance'],'phrase'],
['defect notice','noun_phrase','缺陷通知','quality alert','Supplier / Foreign Trade','supplier communication','report','We sent a defect notice to the factory after finding inconsistent stitching on about five percent of units.','我们发现约百分之五的产品针脚不一致后向工厂发送了 defect notice。',3,['supplier','quality'],'phrase'],

// MORE VERBS (15)
['restructure','verb','重组','reorganise','Crowdfunding Campaign','pre-launch','improve','We restructured the reward tiers to make the middle option the obvious best choice.','我们 restructure 了回报层级使中间选项成为明显的最佳选择。',2,['crowdfunding','verb'],'word'],
['personalise','verb','个性化','tailor','Email / CRM','email marketing','increase relevance','We personalise every email with the customer name and product recommendations.','我们用客户姓名和产品推荐来 personalise 每封邮件。',2,['email','verb'],'word'],
['automate','verb','自动化','set automatic','Email / CRM','email marketing','save time','We automated the entire post-purchase sequence so it runs without anyone touching it.','我们 automate 了整个购后序列让它在无人干预的情况下运行。',2,['email','verb'],'word'],
['migrate','verb','迁移','move platform','Shopify / DTC Store','dtc store operation','move','We migrated our store from WooCommerce to Shopify over one weekend.','我们在一个周末内把店铺从 WooCommerce migrate 到了 Shopify。',2,['dtc','verb'],'word'],
['warehouse-ship','verb','仓库发货','ship from storage','Fulfillment / Logistics','logistics','dispatch','We warehouse-ship all domestic orders within 24 hours using a 3PL on each coast.','我们通过每个海岸的 3PL 在 24 小时内 warehouse-ship 所有国内订单。',2,['logistics','verb'],'word'],
['remarket-to','verb','再触达','target again to','Ads / Acquisition','paid acquisition','reach','We remarket to people who viewed the product page but did not initiate checkout.','我们 remarket to 浏览了产品页但未开始结账的人。',2,['ads','verb'],'word'],
['pre-launch-test','verb','上线前测试','test before launch','Crowdfunding Campaign','pre-launch','verify','We pre-launch-test the campaign page with a small group of past backers for feedback.','我们与一小群之前的支持者 pre-launch-test 活动页面以获取反馈。',2,['crowdfunding','verb'],'word'],

// MORE PHRASAL VERBS (10)
['write off','phrasal_verb','核销','accept as loss','Fulfillment / Logistics','logistics','account','We wrote off the damaged inventory as a loss and claimed it on insurance.','我们把损坏的库存 write off 作为损失并向保险索赔。',2,['logistics','phrasal_verb'],'phrase'],
['pack up','phrasal_verb','打包','box goods','Fulfillment / Logistics','logistics','prepare','The team packs up all orders before the 3pm pickup deadline.','团队在下午三点取件截止前 pack up 所有订单。',1,['logistics','phrasal_verb'],'phrase'],
['sell up','phrasal_verb','向上销售','upsell','Shopify / DTC Store','dtc store operation','increase value','We sell up from the basic version to the premium bundle by showing the value difference clearly.','我们通过清晰地展示价值差异从基础版 sell up 到高级套装。',2,['dtc','phrasal_verb'],'phrase'],
['hold back','phrasal_verb','保留','keep in reserve','Fulfillment / Logistics','logistics','plan','We held back ten percent of the inventory for replacements and warranty claims.','我们 hold back 了百分之十的库存用于更换和保修索赔。',2,['logistics','phrasal_verb'],'phrase'],
['drop off','phrasal_verb','交付转运','deliver to carrier','Fulfillment / Logistics','logistics','ship','We drop off the packages at the carrier facility every day at 4pm.','我们每天下午四点把包裹 drop off 到承运商站点。',1,['logistics','phrasal_verb'],'phrase'],
['pull back','phrasal_verb','撤回','retract','Ads / Acquisition','paid acquisition','stop','We pulled back the ad spend after the CPA spiked above our profitability threshold.','在 CPA 飙升超过我们的盈利能力阈值后我们 pull back 了广告支出。',2,['ads','phrasal_verb'],'phrase'],
['roll in','phrasal_verb','涌入','arrive continuously','Crowdfunding Campaign','campaign live','describe','Pledges started rolling in as soon as we sent the email blast to our list.','我们向列表群发邮件后 pledges 就开始 roll in 了。',1,['crowdfunding','phrasal_verb'],'phrase'],

// MORE ADJECTIVES (10)
['fast-selling','adjective','热销的','selling quickly','Shopify / DTC Store','dtc store operation','describe','The fast-selling black variant needs to be reordered immediately or we will stock out.','fast-selling 黑色款需要立即补货否则我们会断货。',1,['dtc','adjective'],'word'],
['backer-friendly','adjective','支持者友好的','supporter-friendly','Crowdfunding Campaign','campaign live','design','We keep all our policies backer-friendly even when it means a higher cost for us.','我们保持所有政策 backer-friendly 即使这意味着我们成本更高。',1,['crowdfunding','adjective'],'word'],
['cross-border','adjective','跨境的','international','Fulfillment / Logistics','logistics','describe','Cross-border shipping is more complex but it triples our addressable market.','cross-border 运输更复杂但使我们的可触达市场扩大了三倍。',2,['logistics','adjective'],'word'],
['profit-positive','adjective','盈利的','making money','Ads / Acquisition','paid acquisition','measure','The campaign is profit-positive after day five when we factor in the AOV and repeat rate.','在考虑到 AOV 和复购率后活动在第五天是 profit-positive 的。',2,['ads','adjective'],'word'],
['easy-to-return','adjective','便于退货的','simple to return','Customer Support','customer support','design','Our easy-to-return policy is a big reason customers choose us over bigger brands.','我们的 easy-to-return 政策是客户选择我们而非大品牌的重要原因。',1,['support','adjective'],'word'],

// MORE COLLOCATIONS (15)
['push the launch','collocation','推迟上线','delay launch','Crowdfunding Campaign','pre-launch','decide','We pushed the launch by two weeks because the campaign video was not ready yet.','我们 push the launch 了两周因为活动视频还没准备好。',2,['crowdfunding','collocation'],'phrase'],
['hit a milestone','collocation','达成里程碑','reach a goal','Crowdfunding Campaign','campaign live','achieve','We hit a milestone of 1000 backers on day three and celebrated with a live stream.','我们在第三天 hit a milestone 达到 1000 支持者并用直播庆祝。',1,['crowdfunding','collocation'],'phrase'],
['close the campaign','collocation','结束活动','end campaign','Crowdfunding Campaign','campaign live','finish','We closed the campaign after raising nearly three times the original goal.','我们在筹集到近三倍原定目标后 close the campaign。',1,['crowdfunding','collocation'],'phrase'],
['capture an email','collocation','获取邮箱','collect email','Email / CRM','email marketing','grow','We captured an email from every visitor who clicked through the ad to our landing page.','我们从每位通过广告点击进入落地页的访客那里 capture an email。',1,['email','collocation'],'phrase'],
['boost the post','collocation','推广帖子','amplify post','Ads / Acquisition','paid acquisition','promote','We boosted the post that had the most organic engagement to reach a wider audience.','我们 boost the post 了有机互动最多的那篇帖子以触达更广泛的受众。',1,['ads','collocation'],'phrase'],
['run a giveaway','collocation','举办抽奖','run a contest','Email / CRM','email marketing','grow list','We ran a giveaway that required email signup and collected over 2000 new subscribers.','我们 run a giveaway 要求邮箱注册并收集了超过 2000 个新订阅者。',1,['email','collocation'],'phrase'],
['check the stock','collocation','查库存','verify inventory','Fulfillment / Logistics','logistics','confirm','Before promising delivery dates we check the stock in the warehouse system.','在承诺交付日期之前我们 check the stock 在仓库系统中。',1,['logistics','collocation'],'phrase'],
['pack the order','collocation','打包订单','box the order','Fulfillment / Logistics','logistics','prepare','The team packs the order within two hours of it being placed on a business day.','团队在工作日下单后两小时内 pack the order。',1,['logistics','collocation'],'phrase'],
['send the invoice','collocation','发发票','send bill','Supplier / Foreign Trade','supplier communication','document','We send the invoice to the supplier after the goods pass the quality inspection.','货物通过质量检验后我们 send the invoice 给供应商。',1,['supplier','collocation'],'phrase'],
['resolve the dispute','collocation','解决争议','settle disagreement','Customer Support','customer support','fix','We resolved the dispute by offering a full refund and a discount on the next purchase.','我们通过提供全额退款和下次购买折扣来 resolve the dispute。',2,['support','collocation'],'phrase'],

// MORE SENTENCE PATTERNS (20)
['We need more stock for the promotion.','sentence_pattern','促销需要更多库存','stock concern','Fulfillment / Logistics','logistics','report','We need more stock for the promotion next week or we will sell out by day two.','下周的促销我们需要更多库存否则第二天就会卖光。',1,['logistics','sentence_pattern'],'sentence_pattern'],
['The customer wants to change the address.','sentence_pattern','客户要改地址','address change','Customer Support','customer support','report','The customer wants to change the address but the package has already been dispatched.','客户要改地址但包裹已经发出了。',1,['support','sentence_pattern'],'sentence_pattern'],
['The discount code is not working.','sentence_pattern','折扣码无效','code issue','Shopify / DTC Store','dtc store operation','report','The discount code is not working at checkout and customers are complaining in the chat.','discount code 在结账时无效客户在聊天中抱怨。',1,['dtc','sentence_pattern'],'sentence_pattern'],
['The campaign needs more backer engagement.','sentence_pattern','活动需要更多支持者互动','engagement need','Crowdfunding Campaign','campaign live','report','The campaign needs more backer engagement in the comments to stay visible in the algorithm.','活动需要更多 backer engagement 在评论区以保持算法中的可见度。',2,['crowdfunding','sentence_pattern'],'sentence_pattern'],
['We should test a higher price point.','sentence_pattern','应该测试更高价位','price idea','Shopify / DTC Store','dtc store operation','propose','We should test a higher price point because customers keep saying the product is undervalued.','我们应该测试更高的 price point 因为客户一直说产品被低估了。',1,['dtc','sentence_pattern'],'sentence_pattern'],
['The email went to the spam folder.','sentence_pattern','邮件进垃圾箱了','deliverability issue','Email / CRM','email marketing','report','The email went to the spam folder and we need to check the sender reputation score.','邮件进了 spam folder 我们需要检查发件人信誉分。',2,['email','sentence_pattern'],'sentence_pattern'],
['Can we get a faster shipping option.','sentence_pattern','能选更快派送方式吗','speed request','Fulfillment / Logistics','logistics','ask','Can we get a faster shipping option for this customer because the order is already late.','能为这位客户选更快的配送方式吗因为订单已经迟了。',1,['logistics','sentence_pattern'],'sentence_pattern'],
['The product arrived damaged.','sentence_pattern','产品到货时就坏了','damage report','Customer Support','customer support','report','The product arrived damaged and the customer sent photos of the crushed box corner.','产品到货时就坏了客户发来了箱子一角被压碎的照片。',1,['support','sentence_pattern'],'sentence_pattern'],
['We should launch the product in phases.','sentence_pattern','应该分阶段发布','phased launch','Crowdfunding Campaign','pre-launch','propose','We should launch the product in phases starting with the core version and adding features later.','我们应该分阶段发布产品先从核心版本开始后续再添加功能。',2,['crowdfunding','sentence_pattern'],'sentence_pattern'],
['The supplier needs to improve the packaging.','sentence_pattern','供应商得改进包装','packaging request','Supplier / Foreign Trade','supplier communication','instruct','The supplier needs to improve the packaging because the current box does not survive international shipping.','supplier 需要改进包装因为目前的包装箱无法在国际运输中完好无损。',2,['supplier','sentence_pattern'],'sentence_pattern'],
];

// Process all
let batchCount=0;
for(const item of items){
  const [term,pos,sm,sis,topic,bizStage,work,ex,ez,diff,tags,type,reg]=item;
  if(existing.has(term.toLowerCase())){skipped++;continue;}
  existing.add(term.toLowerCase());
  id++;
  newItems.push({
    id:'foreign-trade-crowdfunding-dtc-operations-1000-'+String(id).padStart(4,'0'),
    packId:'foreign-trade-crowdfunding-dtc-operations-1000',term,
    type:type||'word',partOfSpeech:pos||'noun_phrase',topic,
    businessStage:bizStage||'',workIntent:work||'',
    shortMeaning:sm,shortMeaningInSentence:sis,
    example:ex,exampleZh:ez,
    register:reg||'neutral',difficulty:diff||2,
    sourceType:'foreign_trade_dtc_style_original',
    sourceTitle:'Original foreign trade DTC learning sentence',
    sourceUrl:'',sourceDate:'',isRealSourceSentence:false,
    tags:tags||['dtc'],fullForm:FF[term]||undefined
  });
  added++;batchCount++;
}
console.log('Batch 3: Added',batchCount,'| Skipped:',skipped,'| New total:',data.length+added);
if(data.length+added<TARGET) console.log('Still need',TARGET-(data.length+added),'more');

if(newItems.length>0){
  const updated=data.concat(newItems);
  fs.writeFileSync(file,JSON.stringify(updated));
  const packsFile='src/data/packs.ts';
  let pc=fs.readFileSync(packsFile,'utf-8');
  pc=pc.replace(/('foreign-trade-crowdfunding-dtc-operations-1000'[\s\S]*?total:\s*)\d+/,(_,pre)=>pre+updated.length);
  fs.writeFileSync(packsFile,pc);
  const stFile='docs/WORD_PACK_GENERATION_STATUS.json';
  const st=JSON.parse(fs.readFileSync(stFile,'utf-8'));
  if(st.packs['foreign-trade-crowdfunding-dtc-operations-1000']) st.packs['foreign-trade-crowdfunding-dtc-operations-1000'].current=updated.length;
  fs.writeFileSync(stFile,JSON.stringify(st,null,2));
  console.log('File saved. Total:',updated.length);
}

