// DEPRECATED / DO NOT RUN
// This generator may produce low-quality or over-target items.
// Use only with a manually curated candidate pool.
const fs=require('fs');
const file='src/data/packs/foreign-trade-crowdfunding-dtc-operations-1000.json';
const data=JSON.parse(fs.readFileSync(file,'utf-8'));
const existing=new Set(data.map(d=>d.term.toLowerCase()));
const TARGET=1000;
let id=data.length,added=0,skipped=0;

const FF={ROAS:'Return on Ad Spend',CPC:'Cost Per Click',CTR:'Click-Through Rate',CPA:'Cost Per Acquisition',CPM:'Cost Per Mille',AOV:'Average Order Value',MOQ:'Minimum Order Quantity','3PL':'Third-Party Logistics',CRM:'Customer Relationship Management',KPI:'Key Performance Indicator',ROI:'Return on Investment',EXW:'Ex Works',FOB:'Free On Board',CIF:'Cost Insurance Freight',DDP:'Delivered Duty Paid',FAQ:'Frequently Asked Questions',LTV:'Lifetime Value',SKU:'Stock Keeping Unit',BOM:'Bill of Materials',PO:'Purchase Order',ETA:'Estimated Time of Arrival',OEM:'Original Equipment Manufacturer',ODM:'Original Design Manufacturer',SOP:'Standard Operating Procedure',COD:'Cash on Delivery',FBA:'Fulfillment by Amazon'};

const newItems=[];
const items=[

// ===== MORE CROWDFUNDING =====
['backer discount','noun_phrase','支持者折扣','supporter price cut','Crowdfunding Campaign','campaign live','reward loyalty','Backers get a backer discount on future purchases from our online store.','支持者在我们的在线商店中获得 backer discount。',1,['crowdfunding','loyalty'],'phrase'],
['live campaign','noun_phrase','进行中的活动','active campaign','Crowdfunding Campaign','campaign live','describe','During the live campaign we post daily in the comments to keep momentum up.','在 live campaign 期间我们每天在评论区发帖以保持势头。',1,['crowdfunding','status'],'phrase'],
['funding percentage','noun_phrase','筹资比例','percent funded','Crowdfunding Campaign','campaign live','track','The funding percentage crossed 500 percent in the final week of the campaign.','funding percentage 在活动的最后一周突破了百分之五百。',1,['crowdfunding','metrics'],'phrase'],
['project creator','noun_phrase','项目发起人','campaign owner','Crowdfunding Campaign','campaign live','describe role','The project creator posts weekly updates with photos from the factory line.','project creator 每周发布更新附有工厂生产线的照片。',1,['crowdfunding','role'],'phrase'],
['crowd demand','noun_phrase','众筹需求','public interest','Crowdfunding Campaign','pre-launch','validate','The campaign proved there is real crowd demand for a compact portable blender.','这次活动证明了市场对紧凑型便携搅拌机的 real crowd demand。',2,['crowdfunding','validation'],'phrase'],
['backer reward','noun_phrase','支持者回报','reward item','Crowdfunding Campaign','post-campaign fulfillment','deliver','The backer reward includes the main product plus an exclusive colour variant.','backer reward 包括主产品加上一个独家颜色变体。',1,['crowdfunding','product'],'phrase'],
['campaign goal','noun_phrase','活动目标','funding target','Crowdfunding Campaign','pre-launch','plan','Our campaign goal of fifty thousand dollars was based on the tooling and first batch costs.','我们五万美元的 campaign goal 是基于模具和第一批成本设定的。',1,['crowdfunding','planning'],'phrase'],
['pledge total','noun_phrase','认缴总额','pledge sum','Crowdfunding Campaign','campaign live','track','The pledge total updates every few seconds on the campaign dashboard.','pledge total 在活动仪表盘上每隔几秒更新一次。',1,['crowdfunding','metrics'],'phrase'],

// ===== MORE DTC/SHOPIFY =====
['lifetime value','noun_phrase','生命周期价值','long-term worth','Shopify / DTC Store','dtc store operation','measure','Our LTV of repeat customers is nearly double that of one-time buyers.','回头客的 LTV 几乎是一次性买家的两倍。',2,['dtc','metrics'],'phrase'],
['purchase frequency','noun_phrase','购买频率','how often buy','Shopify / DTC Store','dtc store operation','analyse','Purchase frequency increased after we launched the subscription option.','我们推出订阅选项后 purchase frequency 增加了。',2,['dtc','metrics'],'phrase'],
['seasonal promotion','noun_phrase','季节性促销','seasonal sale','Shopify / DTC Store','dtc store operation','drive sales','The seasonal promotion over the holiday weekend brought in twenty percent of our quarterly revenue.','假日周末的 seasonal promotion 带来了我们季度收入的百分之二十。',1,['dtc','marketing'],'phrase'],
['minimum order','noun_phrase','最低订单','min order','Shopify / DTC Store','dtc store operation','set policy','The minimum order for B2B wholesale is fifty units per SKU.','B2B 批发的 minimum order 是每个 SKU 五十个单位。',1,['dtc','policy'],'phrase'],
['order threshold','noun_phrase','订单门槛','order trigger point','Shopify / DTC Store','dtc store operation','incentivise','We set the free shipping order threshold just above the average cart value.','我们把包邮的 order threshold 设在略高于平均购物车金额。',1,['dtc','strategy'],'phrase'],
['shop policy','noun_phrase','店铺政策','store rule','Shopify / DTC Store','dtc store operation','inform','The shop policy page should clearly state shipping times return rules and warranty details.','shop policy 页面应该清楚地说明发货时间退货规则和保修细节。',1,['dtc','policy'],'phrase'],
['theme update','noun_phrase','主题更新','design refresh','Shopify / DTC Store','dtc store operation','improve','The theme update improved the mobile navigation and increased the conversion rate slightly.','theme update 改善了移动端导航并略微提高了转化率。',2,['dtc','design'],'phrase'],
['page builder','noun_phrase','页面构建器','drag-drop editor','Shopify / DTC Store','dtc store operation','build pages','We use the page builder to create custom landing pages without touching code.','我们使用 page builder 在不碰代码的情况下创建自定义落地页。',2,['dtc','tools'],'phrase'],
['quick view','noun_phrase','快速预览','fast product look','Shopify / DTC Store','dtc store operation','improve browsing','The quick view option lets customers see details without leaving the collection page.','quick view 选项让客户可以在不离开系列页面的情况下查看详情。',1,['dtc','ux'],'phrase'],
['stock alert','noun_phrase','库存提醒','back-in-stock alert','Shopify / DTC Store','dtc store operation','capture demand','We collected 300 emails through the stock alert for the sold-out colour.','我们通过售罄颜色的 stock alert 收集了 300 个邮箱。',1,['dtc','tools'],'phrase'],
['upsell bundle','noun_phrase','加购套餐','upgrade combo','Shopify / DTC Store','dtc store operation','increase AOV','The upsell bundle shows after the customer adds to cart and offers a matching accessory.','upsell bundle 在客户加入购物车后出现提供匹配的配件。',2,['dtc','sales'],'phrase'],
['impulse buy','noun_phrase','冲动购买','spontaneous purchase','Shopify / DTC Store','dtc store operation','capitalise','The price point under twenty dollars makes this an easy impulse buy for most visitors.','不到二十美元的价格使得这对大多数访客来说是一个容易的 impulse buy。',1,['dtc','sales'],'phrase'],
['checkout step','noun_phrase','结账步骤','payment form step','Shopify / DTC Store','dtc store operation','optimise','Each checkout step adds friction so we reduced the flow from four steps to two.','每个 checkout step 都会增加阻力所以我们把流程从四步减少到两步。',2,['dtc','ux'],'phrase'],
['variant selector','noun_phrase','变体选择器','option picker','Shopify / DTC Store','dtc store operation','improve UI','The variant selector should show available options clearly with sold-out ones greyed out.','variant selector 应该清晰地显示可用选项并将售罄的灰掉。',1,['dtc','ux'],'phrase'],
['domain name','noun_phrase','域名','web address','Shopify / DTC Store','dtc store operation','set up','We bought a dot-com domain name that matches our brand name exactly.','我们购买了一个完全匹配品牌名称的 dot-com domain name。',1,['dtc','technical'],'phrase'],

// ===== MORE ADS =====
['ad relevance','noun_phrase','广告相关性','ad quality score','Ads / Acquisition','paid acquisition','measure quality','Ad relevance affects both the cost per click and the delivery volume.','ad relevance 影响每次点击成本和投放量。',2,['ads','metrics'],'phrase'],
['bidding strategy','noun_phrase','出价策略','bid approach','Ads / Acquisition','paid acquisition','optimise spend','We switched the bidding strategy from lowest cost to cost cap to stabilise the CPA.','我们把 bidding strategy 从最低成本切换为成本上限以稳定 CPA。',3,['ads','strategy'],'phrase'],
['social proof ad','noun_phrase','社会证明广告','review-based ad','Ads / Acquisition','paid acquisition','build trust','The social proof ad using a real customer quote outperformed the polished brand video.','使用真实客户引语的 social proof ad 表现超过了精修的品牌视频。',2,['ads','content'],'phrase'],
['ad rotation','noun_phrase','广告轮换','creative rotation','Ads / Acquisition','paid acquisition','prevent fatigue','We set an ad rotation every three days to keep the audience from getting bored.','我们每三天进行一次 ad rotation 以防止受众感到厌倦。',2,['ads','strategy'],'phrase'],
['video view','noun_phrase','视频观看量','video watch','Ads / Acquisition','paid acquisition','measure reach','Video views are cheap but we care more about the click-through rate to the store.','video view 很便宜但我们更关心到店铺的点击率。',1,['ads','metrics'],'phrase'],
['ads manager','noun_phrase','广告管理器','ads dashboard','Ads / Acquisition','paid acquisition','manage','The ads manager shows all campaigns in one place with real-time performance data.','ads manager 在一个地方显示所有活动并带有实时表现数据。',1,['ads','tools'],'phrase'],
['target audience','noun_phrase','目标受众','who to reach','Ads / Acquisition','paid acquisition','define','The target audience for this product is 25-to-40-year-old outdoor enthusiasts.','这个产品的 target audience 是 25 到 40 岁的户外爱好者。',1,['ads','strategy'],'phrase'],
['daily spend','noun_phrase','日消耗','per-day ad spend','Ads / Acquisition','paid acquisition','track budget','The daily spend is capped at two hundred dollars for the testing phase.','在测试阶段 daily spend 的上限是两百美元。',1,['ads','metrics'],'phrase'],
['carousel ad','noun_phrase','轮播广告','multi-image ad','Ads / Acquisition','paid acquisition','showcase product','The carousel ad shows each product feature on a separate card that users can swipe.','carousel ad 在用户可以滑动的独立卡片上展示每个产品功能。',1,['ads','format'],'phrase'],
['story ad','noun_phrase','故事广告','vertical story ad','Ads / Acquisition','paid acquisition','run ads','The story ad format works well for showing quick demos of the product in action.','story ad 格式非常适合展示产品的快速实际使用演示。',1,['ads','format'],'phrase'],

// ===== MORE EMAIL =====
['newsletter','noun','通讯邮件','regular email','Email / CRM','email marketing','maintain connection','Our weekly newsletter shares product tips and customer stories not just promotions.','我们的每周 newsletter 分享产品技巧和客户故事而不仅仅是促销。',1,['email','content'],'word'],
['replenishment email','noun_phrase','补货提醒邮件','reorder reminder','Email / CRM','email marketing','drive repeat','The replenishment email goes out 30 days after purchase when the product is likely running low.','replenishment email 在购买后 30 天发出当时产品可能快用完了。',2,['email','automation'],'phrase'],
['email signup','noun_phrase','邮箱注册','email subscription','Email / CRM','email marketing','grow list','Email signup from the homepage pop-up accounts for about half of our new subscribers.','首页弹窗的 email signup 约占我们新订阅者的一半。',1,['email','growth'],'phrase'],
['promo email','noun_phrase','促销邮件','promotional email','Email / CRM','email marketing','drive sales','The promo email for the flash sale went out at 9am and the first orders came in minutes later.','闪购的 promo email 在早上九点发出几分钟后首批订单就来了。',1,['email','marketing'],'phrase'],
['brand story','noun_phrase','品牌故事','origin story','Email / CRM','email marketing','connect emotionally','The welcome email tells our brand story and explains why we started the company.','欢迎邮件讲述我们的 brand story 并解释我们为什么创办这家公司。',1,['email','content'],'phrase'],

// ===== MORE SUPPORT =====
['ticket status','noun_phrase','工单状态','request status','Customer Support','customer support','track','Customers can check their ticket status through the self-service portal.','客户可以通过自助门户查看他们的 ticket status。',1,['support','tools'],'phrase'],
['support channel','noun_phrase','支持渠道','contact method','Customer Support','customer support','provide access','Our main support channels are live chat email and the help centre.','我们的主要 support channel 是即时聊天邮件和帮助中心。',1,['support','strategy'],'phrase'],
['case resolution','noun_phrase','案件解决','issue resolved','Customer Support','customer support','measure','The average case resolution time is under four hours which is above our target.','平均 case resolution 时间不到四小时这高于我们的目标。',1,['support','metrics'],'phrase'],
['warranty claim','noun_phrase','保修索赔','warranty request','Customer Support','customer support','process','The warranty claim requires a photo of the defect and the original order number.','warranty claim 需要缺陷照片和原始订单号。',2,['support','policy'],'phrase'],
['shipping dispute','noun_phrase','运输争议','delivery disagreement','Customer Support','customer support','resolve','The shipping dispute was resolved when the carrier confirmed the package was damaged in transit.','当承运商确认包裹在运输中损坏后 shipping dispute 得到解决。',2,['support','logistics'],'phrase'],
['exchange request','noun_phrase','换货请求','swap request','Customer Support','customer support','handle','The customer submitted an exchange request because they ordered the wrong colour.','客户因为订错了颜色提交了 exchange request。',1,['support','process'],'phrase'],
['customer record','noun_phrase','客户记录','account record','Customer Support','customer support','track history','The customer record shows three previous purchases and no prior complaints.','customer record 显示之前三次购买且无投诉记录。',1,['support','data'],'phrase'],

// ===== MORE LOGISTICS =====
['shipment status','noun_phrase','货运状态','delivery state','Fulfillment / Logistics','logistics','track','The shipment status changes from processing to in transit once the carrier scans the package.','一旦承运商扫描包裹 shipment status 就会从处理中变为运输中。',1,['logistics','operations'],'phrase'],
['warehouse team','noun_phrase','仓库团队','warehouse staff','Fulfillment / Logistics','logistics','manage','The warehouse team works in two shifts to keep orders moving during peak season.','warehouse team 分两班工作以在旺季保持订单流转。',1,['logistics','team'],'phrase'],
['pallet label','noun_phrase','托盘标签','pallet sticker','Fulfillment / Logistics','logistics','label','Each pallet label has a barcode that the warehouse scanner reads at the loading dock.','每个 pallet label 有一个条码 warehouse scanner 在装货台读取。',2,['logistics','operations'],'phrase'],
['shipment split','noun_phrase','分批发货','split delivery','Fulfillment / Logistics','logistics','handle partial','We did a shipment split because half the order was ready and the rest needed another week.','我们做了 shipment split 因为一半的订单已准备好其余需要再等一周。',2,['logistics','operations'],'phrase'],
['transit damage','noun_phrase','运输损坏','damage in transit','Fulfillment / Logistics','logistics','document','The transit damage rate has been under one percent since we switched to reinforced packaging.','自从我们改用加固包装以来 transit damage 率一直低于百分之一。',2,['logistics','quality'],'phrase'],
['logistics partner','noun_phrase','物流合作伙伴','shipping partner','Fulfillment / Logistics','logistics','collaborate','Our logistics partner handles everything from warehousing to last-mile delivery.','我们的 logistics partner 处理从仓储到最后一公里配送的一切。',1,['logistics','partner'],'phrase'],
['order cutoff','noun_phrase','订单截止时间','daily order deadline','Fulfillment / Logistics','logistics','set rule','The order cutoff for same-day dispatch is 2pm on business days.','当天发货的 order cutoff 是工作日下午两点。',1,['logistics','operations'],'phrase'],
['packing station','noun_phrase','打包台','packing work area','Fulfillment / Logistics','logistics','organise','Each packing station has a scale a label printer and a barcode scanner.','每个 packing station 有一台秤一台标签打印机和一个条码扫描器。',2,['logistics','operations'],'phrase'],

// ===== MORE SUPPLIER / FOREIGN TRADE =====
['supplier contract','noun_phrase','供应商合同','factory contract','Supplier / Foreign Trade','supplier communication','formalise','The supplier contract includes clauses for quality standards late penalties and IP protection.','supplier contract 包括质量标准逾期罚款和知识产权保护条款。',3,['supplier','documentation'],'phrase'],
['factory audit','noun_phrase','工厂审计','on-site audit','Supplier / Foreign Trade','supplier communication','verify','We do a factory audit before signing any long-term production agreement.','在签署任何长期生产协议之前我们会做 factory audit。',3,['supplier','quality'],'phrase'],
['landed cost','noun_phrase','到岸成本','total landed price','Supplier / Foreign Trade','supplier communication','calculate','The landed cost includes the unit price shipping duties and insurance to the destination.','landed cost 包括单价运费关税和到目的地的保险。',3,['supplier','finance'],'phrase'],
['supplier list','noun_phrase','供应商名单','factory list','Supplier / Foreign Trade','supplier communication','source','We built a supplier list of five factories that can produce this type of product.','我们建立了一个可以生产这类产品的五个工厂的 supplier list。',1,['supplier','sourcing'],'phrase'],
['quality benchmark','noun_phrase','质量基准','quality standard','Supplier / Foreign Trade','supplier communication','measure','We set a quality benchmark of less than one percent defect rate for mass production.','我们为量产设定了低于百分之一不良率的 quality benchmark。',2,['supplier','quality'],'phrase'],
['purchase contract','noun_phrase','采购合同','purchase agreement','Supplier / Foreign Trade','supplier communication','formalise','The purchase contract specifies the quantity unit price delivery date and payment terms.','purchase contract 规定了数量单价交货日期和付款条件。',2,['supplier','documentation'],'phrase'],
['supplier visit','noun_phrase','访问供应商','factory visit','Supplier / Foreign Trade','supplier communication','inspect','A supplier visit is the best way to assess whether the factory can deliver on time.','supplier visit 是评估工厂是否能按时交货的最佳方式。',2,['supplier','quality'],'phrase'],
['price negotiation','noun_phrase','价格谈判','price discussion','Supplier / Foreign Trade','supplier communication','negotiate','The price negotiation took about a week but we settled on a fair rate for both sides.','price negotiation 花了大约一周但我们在对双方都公平的价格上达成了协议。',2,['supplier','negotiation'],'phrase'],
['shipping document','noun_phrase','运输单证','transport document','Supplier / Foreign Trade','supplier communication','prepare','The full set of shipping documents includes invoice packing list and bill of lading.','全套 shipping document 包括发票装箱单和提单。',2,['supplier','documentation'],'phrase'],
['commissioning date','noun_phrase','投产日期','start date','Supplier / Foreign Trade','supplier communication','schedule','The commissioning date for mass production is set for the first Monday of next month.','量产的 commissioning date 定在下个月第一个周一。',3,['supplier','planning'],'phrase'],
['customs broker','noun_phrase','报关行','customs agent','Supplier / Foreign Trade','supplier communication','arrange clearance','Our customs broker handles all the import paperwork and clears shipments in about two days.','我们的 customs broker 处理所有进口文件并在大约两天内清关。',3,['supplier','international'],'phrase'],
['trade term','noun_phrase','贸易术语','incoterm','Supplier / Foreign Trade','supplier communication','agree','We agreed on FOB trade terms so the supplier covers costs until the goods are on the vessel.','我们同意 FOB trade term 所以供应商负责货物装船前的费用。',3,['supplier','international'],'phrase'],

// ===== MORE VERBS =====
['bundle','verb','捆绑销售','sell together','Shopify / DTC Store','dtc store operation','increase AOV','We bundled the main product with the most popular accessory to lift the average order value.','我们把主产品与最受欢迎的配件 bundle 在一起以提高平均订单价值。',1,['dtc','verb'],'word'],
['warehouse','verb','入库存储','store in warehouse','Fulfillment / Logistics','logistics','store','We warehouse the inventory in a 3PL facility on the East Coast for faster delivery.','我们在东海岸的 3PL 设施中 warehouse 库存以加快派送。',2,['logistics','verb'],'word'],
['cold-email','verb','冷发邮件','send unsolicited','Email / CRM','email marketing','reach out','We cold-emailed about fifty influencers before launch but only five replied.','我们在上线前 cold-email 了大约五十位达人但只有五位回复了。',2,['email','verb'],'word'],
['split-test','verb','拆分测试','A/B test','Ads / Acquisition','paid acquisition','optimise','We split-test every headline before committing to the main ad campaign.','我们在承诺主广告活动之前 split-test 每个标题。',2,['ads','verb'],'word'],
['back-order','verb','缺货预订','take backorder','Fulfillment / Logistics','logistics','manage shortage','We back-ordered the most popular variant because the demand far exceeded our forecast.','我们 back-order 了最受欢迎的变体因为需求远超我们的预测。',2,['logistics','verb'],'word'],
['drop-ship','verb','代发','ship directly','Fulfillment / Logistics','logistics','fulfil','We drop-ship orders directly from the factory to customers without ever touching inventory.','我们直接从工厂 drop-ship 订单给客户从不接触库存。',2,['logistics','verb'],'word'],

// ===== MORE PHRASAL VERBS =====
['check out','phrasal_verb','结账','complete purchase','Shopify / DTC Store','dtc store operation','purchase','About sixty percent of visitors who start the checkout actually check out.','大约百分之六十开始结账的访客最终 check out。',1,['dtc','phrasal_verb'],'phrase'],
['sign off','phrasal_verb','签批','approve','Supplier / Foreign Trade','supplier communication','authorise','We need the quality manager to sign off on the production sample before mass production.','我们需要质量经理 sign off 生产样品才能开始量产。',2,['supplier','phrasal_verb'],'phrase'],
['bulk up','phrasal_verb','增大量','increase size','Fulfillment / Logistics','logistics','plan','We bulk up the inventory in October to prepare for the November sales surge.','我们在十月 bulk up 库存以应对十一月的销售激增。',1,['logistics','phrasal_verb'],'phrase'],
['launch into','phrasal_verb','投入','begin','Crowdfunding Campaign','pre-launch','start','We launched into the campaign with a strong first-day push from our pre-launch list.','我们依靠 pre-launch list 的强大首日推动 launch into 了活动。',2,['crowdfunding','phrasal_verb'],'phrase'],
['sell through','phrasal_verb','售完','sell everything','Shopify / DTC Store','dtc store operation','complete','We sold through the initial batch in ten days which was much faster than expected.','我们在十天内 sell through 了首批产品这比预期快得多。',1,['dtc','phrasal_verb'],'phrase'],

// ===== MORE ADJECTIVES =====
['ready-to-ship','adjective','可发货的','can ship now','Fulfillment / Logistics','logistics','assess','All orders placed before noon are ready-to-ship by the end of the same business day.','中午前下的所有订单在同一工作日结束前都是 ready-to-ship 的。',1,['logistics','adjective'],'word'],
['crowdfunded','adjective','众筹的','backer-funded','Crowdfunding Campaign','campaign live','describe','This is a crowdfunded product so every decision involves the backer community.','这是一个 crowdfunded 产品所以每个决策都涉及支持者社群。',1,['crowdfunding','adjective'],'word'],
['mobile-optimised','adjective','移动端优化的','works on phone','Shopify / DTC Store','dtc store operation','optimise','The mobile-optimised checkout reduced the cart abandonment rate by over fifteen percent.','mobile-optimised 结账将购物车放弃率降低了超过百分之十五。',2,['dtc','adjective'],'word'],
['ship-ready','adjective','发货就绪的','ready to dispatch','Fulfillment / Logistics','logistics','confirm','The batch is ship-ready and will leave the warehouse tomorrow morning.','这批货是 ship-ready 的将在明早离开仓库。',1,['logistics','adjective'],'word'],
['low-stock','adjective','库存低的','nearly out','Fulfillment / Logistics','logistics','warn','We mark low-stock items on the product page to create urgency without being misleading.','我们在产品页上标记 low-stock 商品以营造紧迫感而不误导。',1,['logistics','adjective'],'word'],

// ===== MORE COLLOCATIONS =====
['process an order','collocation','处理订单','handle order','Fulfillment / Logistics','logistics','fulfil','The warehouse can process an order within four hours on a normal business day.','仓库在正常工作日可以在四小时内 process an order。',1,['logistics','collocation'],'phrase'],
['cancel an order','collocation','取消订单','stop order','Customer Support','customer support','resolve','We can only cancel an order before it moves to the picking stage in the warehouse.','我们只能在订单进入仓库拣货阶段之前 cancel an order。',1,['support','collocation'],'phrase'],
['run a promotion','collocation','进行促销','do a sale','Shopify / DTC Store','dtc store operation','drive sales','We run a promotion every quarter to clear slow-moving inventory and make room for new stock.','我们每季度 run a promotion 清理滞销库存为新货腾出空间。',1,['dtc','collocation'],'phrase'],
['grow the email list','collocation','增长邮件列表','build subscriber count','Email / CRM','email marketing','grow audience','We grew the email list from zero to five thousand in under three months.','我们在不到三个月内把 email list grow 从零到五千。',1,['email','collocation'],'phrase'],
['analyse the data','collocation','分析数据','study data','Ads / Acquisition','paid acquisition','understand','We analysed the data from the last three campaigns to find what creatives work best.','我们 analyse the data 从最近三个活动中找出效果最好的素材。',1,['ads','collocation'],'phrase'],
['send a replacement','collocation','发出替换品','ship replacement','Customer Support','customer support','resolve','We sent a replacement the same day the customer reported the defect with photos.','我们在客户附照片报告缺陷的同一天 send a replacement。',1,['support','collocation'],'phrase'],
['increase the budget','collocation','增加预算','raise spend','Ads / Acquisition','paid acquisition','scale','We increased the budget by fifty percent on the winning ad set after three days of stable results.','在三天稳定结果后我们将 winning ad set 的预算 increase the budget 了百分之五十。',2,['ads','collocation'],'phrase'],
['update the inventory','collocation','更新库存','refresh stock','Fulfillment / Logistics','logistics','maintain','We update the inventory in Shopify every time a sale goes through or a return is processed.','每次销售完成或退货处理时我们都会在 Shopify update the inventory。',1,['logistics','collocation'],'phrase'],
['request a quote','collocation','请求报价','ask for price','Supplier / Foreign Trade','supplier communication','source','We requested a quote from three different factories for the same spec sheet.','我们向三家不同工厂 request a quote 使用相同的规格表。',1,['supplier','collocation'],'phrase'],
['confirm the order','collocation','确认订单','verify order','Customer Support','customer support','process','We confirm the order by email within minutes of the payment going through.','我们在付款完成后的几分钟内通过邮件 confirm the order。',1,['support','collocation'],'phrase'],

// ===== MORE SENTENCE PATTERNS =====
['Can we ship this sooner?','sentence_pattern','能早点发吗','speed ask','Fulfillment / Logistics','logistics','propose','Can we ship this sooner because the customer has been waiting over three weeks already.','能早点 ship 这个吗因为客户已经等了超过三周了。',1,['logistics','sentence_pattern'],'sentence_pattern'],
['The ad is not converting.','sentence_pattern','广告不转化','ad problem','Ads / Acquisition','paid acquisition','report','The ad is not converting even though the CTR and CPC look reasonable.','尽管 CTR 和 CPC 看起来合理但 ad 不转化。',1,['ads','sentence_pattern'],'sentence_pattern'],
['The supplier raised the price.','sentence_pattern','供应商涨价了','price hike','Supplier / Foreign Trade','supplier communication','report','The supplier raised the price by eight percent citing higher material costs this quarter.','supplier 涨价了百分之八理由是原材料成本本季度上涨。',2,['supplier','sentence_pattern'],'sentence_pattern'],
['The checkout page is too slow.','sentence_pattern','结账页太慢了','speed issue','Shopify / DTC Store','dtc store operation','report','The checkout page is too slow on mobile and we are losing customers during payment.','结账页在移动端太慢了我们在支付环节流失客户。',2,['dtc','sentence_pattern'],'sentence_pattern'],
['We need more product images.','sentence_pattern','我们需要更多产品图','image need','Shopify / DTC Store','dtc store operation','propose','We need more product images showing the item in different contexts not just studio shots.','我们需要更多 product image 展示产品在不同场景中的使用而不仅仅是棚拍。',1,['dtc','sentence_pattern'],'sentence_pattern'],
['The return rate is climbing.','sentence_pattern','退货率在攀升','return trend','Customer Support','customer support','report','The return rate is climbing and we need to find out if it is a quality or description issue.','return rate 在攀升我们需要查明是质量问题还是描述问题。',2,['support','sentence_pattern'],'sentence_pattern'],
['Backers want a clearer timeline.','sentence_pattern','支持者要更清晰的时间线','clearer schedule','Backer Communication','post-campaign fulfillment','report','Backers want a clearer timeline with specific months not just a quarter estimate.','backer 想要更清晰的时间线包含具体月份而不仅仅是季度估计。',1,['communication','sentence_pattern'],'sentence_pattern'],
['The open rate dropped again.','sentence_pattern','打开率又降了','email metric drop','Email / CRM','email marketing','report','The open rate dropped again this week so we need to test new subject lines.','open rate 这周又降了所以我们需要测试新的标题。',1,['email','sentence_pattern'],'sentence_pattern'],
['The pixel is not firing.','sentence_pattern','像素没有触发','tracking issue','Ads / Acquisition','paid acquisition','report','The pixel is not firing on the thank-you page so we cannot track actual purchases.','pixel 没有在感谢页面上触发所以我们无法追踪实际购买。',2,['ads','sentence_pattern'],'sentence_pattern'],
['Can we add this as a stretch goal?','sentence_pattern','能加这个做延伸目标吗','stretch goal proposal','Crowdfunding Campaign','campaign live','propose','Can we add this as a stretch goal to keep momentum going in the middle of the campaign.','我们能把这个加为 stretch goal 以保持活动中期的势头吗。',1,['crowdfunding','sentence_pattern'],'sentence_pattern'],
];

// Process
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
console.log('Batch 2: Added',batchCount,'| Skipped:',skipped,'| New total:',data.length+added);
if(data.length+added<TARGET) console.log('Need',TARGET-(data.length+added),'more');

if(newItems.length>0){
  const updated=data.concat(newItems);
  fs.writeFileSync(file,JSON.stringify(updated));
  // Update packs.ts
  const packsFile='src/data/packs.ts';
  let pc=fs.readFileSync(packsFile,'utf-8');
  pc=pc.replace(/('foreign-trade-crowdfunding-dtc-operations-1000'[\s\S]*?total:\s*)\d+/,(_,pre)=>pre+updated.length);
  fs.writeFileSync(packsFile,pc);
  // Update status
  const stFile='docs/WORD_PACK_GENERATION_STATUS.json';
  const st=JSON.parse(fs.readFileSync(stFile,'utf-8'));
  if(st.packs['foreign-trade-crowdfunding-dtc-operations-1000']) st.packs['foreign-trade-crowdfunding-dtc-operations-1000'].current=updated.length;
  fs.writeFileSync(stFile,JSON.stringify(st,null,2));
  console.log('Total now:',updated.length);
}

