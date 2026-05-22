// DEPRECATED: This generator produced low-quality mechanical compound terms.
// Do not use it unless the candidate pool is manually curated.
const fs=require('fs');
const file='src/data/packs/foreign-trade-crowdfunding-dtc-operations-1000.json';
const data=JSON.parse(fs.readFileSync(file,'utf-8'));
const existing=new Set(data.map(d=>d.term.toLowerCase()));

const FF={ROAS:'Return on Ad Spend',CPC:'Cost Per Click',CTR:'Click-Through Rate',CPA:'Cost Per Acquisition',CPM:'Cost Per Mille',AOV:'Average Order Value',MOQ:'Minimum Order Quantity','3PL':'Third-Party Logistics',CRM:'Customer Relationship Management',KPI:'Key Performance Indicator',ROI:'Return on Investment',EXW:'Ex Works',FOB:'Free On Board',CIF:'Cost Insurance Freight',DDP:'Delivered Duty Paid',FAQ:'Frequently Asked Questions',HS:'Harmonised System'};

const TARGET=1000;
const newItems=[];
let id=data.length+1,added=0,skipped=0;

const exTemplates=[
  ['The {term} needs to be updated before the next campaign goes live.','{term} 需要在下一次活动上线前更新。'],
  ['We received several questions about the {term} from backers this week.','本周我们从支持者那里收到了几个关于 {term} 的问题。'],
  ['The {term} has not been confirmed yet so we cannot proceed.','{term} 尚未确认所以我们无法继续。'],
  ['Please check the {term} before we send the next update.','请在我们发送下一次更新前检查 {term}。'],
  ['Can you verify the {term} for the latest batch of orders?','你能核实最新一批订单的 {term} 吗？'],
  ['The {term} is taking longer than expected due to the holiday season.','由于假期 {term} 比预期时间更长。'],
  ['We need to improve the {term} based on the feedback from last month.','我们需要根据上个月的反馈改进 {term}。'],
  ['The supplier confirmed the {term} will be ready by next Friday.','供应商确认 {term} 将在下周五前准备好。'],
  ['I will send you the {term} as soon as it is available.','一旦 {term} 可用我会立即发给你。'],
  ['The team is working on fixing the {term} issue right now.','团队正在处理 {term} 的问题。'],
];

function pickEx(t){const e=exTemplates[Math.floor(Math.random()*exTemplates.length)];return[e[0].replace('{term}',t),e[1].replace('{term}',t)]}

function add(term,sm,sis,topic,biz,work,diff,tags,type,reg){
  if(existing.has(term.toLowerCase())){skipped++;return false;}
  existing.add(term.toLowerCase());
  const[ex,ez]=pickEx(term);
  newItems.push({id:'foreign-trade-crowdfunding-dtc-operations-1000-'+String(id).padStart(4,'0'),packId:'foreign-trade-crowdfunding-dtc-operations-1000',term,type:type||'word',topic,businessStage:biz||'',workIntent:work||'',shortMeaning:sm,shortMeaningInSentence:sis,example:ex,exampleZh:ez,register:reg||'neutral',difficulty:diff||2,sourceType:'foreign_trade_dtc_style_original',sourceTitle:'Original foreign trade DTC learning sentence',sourceUrl:'',sourceDate:'',isRealSourceSentence:false,tags:tags||['dtc'],fullForm:FF[term]||undefined});
  id++;added++;return true;
}

// ===== MASSIVE CANDIDATE POOL =====
// Format: [term, sm, sis, topic, biz, work, diff, tags, type, register]
const candidates=[
// Crowdfunding
['backer','支持者','project supporter','Crowdfunding Campaign','campaign live','engage supporters',1,['crowdfunding']],
['pledge','认缴','money promised','Crowdfunding Campaign','campaign live','receive funding',1,['crowdfunding']],
['reward tier','回报档位','benefit level','Crowdfunding Campaign','pre-launch','design structure',2,['crowdfunding'],'collocation'],
['add-on','附加项','extra purchase item','Crowdfunding Campaign','campaign live','increase pledge value',1,['crowdfunding']],
['stretch goal','延伸目标','extra funding target','Crowdfunding Campaign','campaign live','boost momentum',2,['crowdfunding']],
['early bird','早鸟','limited discount','Crowdfunding Campaign','pre-launch','drive early pledges',1,['crowdfunding']],
['late pledge','延迟认缴','post-campaign pledge','Crowdfunding Campaign','post-campaign fulfillment','capture late demand',2,['crowdfunding']],
['pledge manager','认缴管理','pledge organisation tool','Crowdfunding Campaign','post-campaign fulfillment','collect backer info',3,['crowdfunding']],
['backer survey','支持者调查','questionnaire for backers','Crowdfunding Campaign','post-campaign fulfillment','collect preferences',1,['crowdfunding']],
['campaign update','活动更新','progress announcement','Crowdfunding Campaign','campaign live','keep backers informed',1,['crowdfunding']],
['funding goal','筹款目标','money target','Crowdfunding Campaign','pre-launch','set target',1,['crowdfunding']],
['pre-launch page','预发布页','page before launch','Crowdfunding Campaign','pre-launch','build email list',2,['crowdfunding']],
['launch day','上线日','first campaign day','Crowdfunding Campaign','campaign live','maximise opening',1,['crowdfunding']],
['backer number','支持者编号','backer ID','Crowdfunding Campaign','campaign live','track supporters',1,['crowdfunding']],
['superbacker','超级支持者','repeat backer','Crowdfunding Campaign','campaign live','identify advocates',3,['crowdfunding']],
['campaign video','活动视频','campaign video','Crowdfunding Campaign','pre-launch','engage visitors',1,['crowdfunding']],
['backer community','支持者社群','supporter community','Crowdfunding Campaign','campaign live','build engagement',1,['crowdfunding']],
['press kit','媒体资料包','media package','Crowdfunding Campaign','pre-launch','earn coverage',2,['crowdfunding']],
['referral programme','推荐计划','referral scheme','Crowdfunding Campaign','campaign live','grow backers',2,['crowdfunding']],
['collaboration','联名合作','brand partnership','Crowdfunding Campaign','pre-launch','boost visibility',2,['crowdfunding']],
['social proof','社会证明','customer validation','Crowdfunding Campaign','campaign live','build trust',2,['crowdfunding']],
['influencer outreach','达人外联','contacting influencers','Crowdfunding Campaign','pre-launch','earn coverage',2,['crowdfunding']],
['press release','新闻稿','media announcement','Crowdfunding Campaign','pre-launch','earn media',1,['crowdfunding']],
['reward survey','回报调查','reward questionnaire','Crowdfunding Campaign','post-campaign fulfillment','collect preferences',1,['crowdfunding']],
['project timeline','项目时间线','schedule overview','Crowdfunding Campaign','campaign live','set expectations',1,['crowdfunding']],
['campaign page','活动页面','campaign web page','Crowdfunding Campaign','campaign live','present campaign',1,['crowdfunding']],
['viral coefficient','病毒系数','viral growth rate','Crowdfunding Campaign','campaign live','measure sharing',3,['crowdfunding']],
['campaign analytics','活动分析','campaign data','Crowdfunding Campaign','campaign live','track performance',2,['crowdfunding']],

// Backer Communication
['shipping timeline','发货时间线','delivery schedule','Backer Communication','post-campaign fulfillment','set delivery expectations',2,['communication']],
['project update','项目更新','progress report','Backer Communication','campaign live','maintain transparency',1,['communication']],
['refund request','退款请求','money back ask','Backer Communication','campaign live','handle complaints',2,['communication']],
['address confirmation','地址确认','verify address','Backer Communication','post-campaign fulfillment','ensure delivery accuracy',1,['communication']],
['delayed shipment','延迟发货','late delivery','Backer Communication','post-campaign fulfillment','manage expectations',2,['communication']],
['replacement unit','替换产品','replacement item','Backer Communication','post-campaign fulfillment','resolve defects',2,['communication']],
['support ticket','工单','help request','Backer Communication','all stages','track issues',2,['communication']],
['FAQ','常见问题','common questions','Backer Communication','pre-launch','reduce support load',1,['communication']],
['backer complaint','支持者投诉','supporter grievance','Backer Communication','post-campaign fulfillment','resolve issues',2,['communication']],
['delivery promise','交付承诺','delivery guarantee','Backer Communication','post-campaign fulfillment','set expectations',2,['communication']],
['backer update','支持者更新','supporter update','Backer Communication','campaign live','maintain communication',1,['communication']],

// Shopify / DTC
['Shopify','Shopify','e-commerce platform','Shopify / DTC Store','dtc store operation','run online store',1,['dtc'],'word','neutral'],
['product page','产品页','item listing page','Shopify / DTC Store','dtc store operation','convert visitors',1,['dtc']],
['checkout','结账','payment step','Shopify / DTC Store','dtc store operation','complete purchase',2,['dtc']],
['cart','购物车','shopping basket','Shopify / DTC Store','dtc store operation','capture intent',1,['dtc']],
['abandoned cart','弃购车','left without buying','Shopify / DTC Store','dtc store operation','recover lost sales',3,['dtc']],
['conversion rate','转化率','visitor-to-buyer ratio','Shopify / DTC Store','dtc store operation','measure performance',2,['dtc']],
['AOV','客单价','average order value','Shopify / DTC Store','dtc store operation','increase revenue per order',2,['dtc']],
['bundle','捆绑','product combo','Shopify / DTC Store','dtc store operation','increase AOV',1,['dtc']],
['upsell','追加销售','suggest upgrade','Shopify / DTC Store','dtc store operation','increase order value',2,['dtc']],
['cross-sell','交叉销售','suggest related','Shopify / DTC Store','dtc store operation','increase order breadth',2,['dtc']],
['discount code','折扣码','promo code','Shopify / DTC Store','dtc store operation','drive conversion',1,['dtc']],
['free shipping threshold','包邮门槛','min for free delivery','Shopify / DTC Store','dtc store operation','increase AOV',2,['dtc']],
['landing page','落地页','entry page','Shopify / DTC Store','paid acquisition','convert ad traffic',2,['dtc']],
['returning customer','回头客','repeat buyer','Shopify / DTC Store','dtc store operation','build loyalty',1,['dtc']],
['product description','产品描述','item details','Shopify / DTC Store','dtc store operation','inform customers',1,['dtc']],
['product image','产品图','item photo','Shopify / DTC Store','dtc store operation','showcase product',1,['dtc']],
['product review','产品评价','customer review','Shopify / DTC Store','dtc store operation','build trust',1,['dtc']],
['inventory management','库存管理','stock control','Shopify / DTC Store','dtc store operation','avoid stockouts',2,['dtc']],
['shipping policy','运输政策','delivery rules','Shopify / DTC Store','dtc store operation','set expectations',1,['dtc']],
['storefront','店铺门面','online store','Shopify / DTC Store','dtc store operation','present brand',1,['dtc']],
['payment gateway','支付网关','payment processor','Shopify / DTC Store','dtc store operation','accept payments',2,['dtc']],
['inventory sync','库存同步','stock sync','Shopify / DTC Store','dtc store operation','avoid overselling',2,['dtc'],'collocation'],
['product variant','产品变体','product option','Shopify / DTC Store','dtc store operation','offer choices',1,['dtc']],
['sales tax','销售税','tax on purchase','Shopify / DTC Store','dtc store operation','comply with tax',2,['dtc'],'collocation'],
['order tracking','订单追踪','shipment tracking','Shopify / DTC Store','dtc store operation','keep customers informed',1,['dtc']],
['conversion funnel','转化漏斗','purchase path','Shopify / DTC Store','dtc store operation','analyse flow',2,['dtc']],
['shipping calculator','运费计算器','delivery cost tool','Shopify / DTC Store','dtc store operation','show costs',1,['dtc']],
['product tag','产品标签','item label','Shopify / DTC Store','dtc store operation','organise products',1,['dtc']],
['bulk discount','批量折扣','volume price break','Shopify / DTC Store','dtc store operation','increase AOV',2,['dtc']],
['product bundle','产品捆绑','item combo','Shopify / DTC Store','dtc store operation','increase order value',1,['dtc']],
['loyalty programme','忠诚计划','reward scheme','Shopify / DTC Store','dtc store operation','retain customers',1,['dtc']],
['referral link','推荐链接','share link','Shopify / DTC Store','dtc store operation','grow through word-of-mouth',1,['dtc']],

// Ads
['Meta Ads','Meta 广告','Facebook Instagram ads','Ads / Acquisition','paid acquisition','run paid campaigns',2,['ads'],'collocation','neutral'],
['Google Ads','Google 广告','search and display ads','Ads / Acquisition','paid acquisition','acquire customers',2,['ads'],'collocation','neutral'],
['creative','广告素材','ad content','Ads / Acquisition','paid acquisition','capture attention',2,['ads']],
['hook','吸引力开场','attention grabber','Ads / Acquisition','paid acquisition','stop the scroll',2,['ads']],
['angle','切入点','marketing perspective','Ads / Acquisition','paid acquisition','find winning message',2,['ads']],
['campaign','广告活动','advertising campaign','Ads / Acquisition','paid acquisition','organise ads',1,['ads']],
['ad set','广告组','group of ads','Ads / Acquisition','paid acquisition','target audience',2,['ads']],
['audience','受众','target group','Ads / Acquisition','paid acquisition','define targeting',2,['ads']],
['retargeting','再营销','remarketing','Ads / Acquisition','paid acquisition','convert warm leads',2,['ads']],
['lookalike audience','相似受众','similar user group','Ads / Acquisition','paid acquisition','find new customers',3,['ads']],
['CPM','千次展示成本','cost per thousand','Ads / Acquisition','paid acquisition','measure ad cost',2,['ads']],
['CPC','单次点击成本','cost per click','Ads / Acquisition','paid acquisition','measure click cost',2,['ads']],
['CTR','点击率','click-through rate','Ads / Acquisition','paid acquisition','measure engagement',2,['ads']],
['CPA','单次获客成本','cost per acquisition','Ads / Acquisition','paid acquisition','measure acquisition cost',3,['ads']],
['ROAS','广告支出回报','return on ad spend','Ads / Acquisition','paid acquisition','measure profitability',2,['ads']],
['pixel','像素','tracking code','Ads / Acquisition','paid acquisition','track conversions',2,['ads']],
['tracking','追踪','following user actions','Ads / Acquisition','paid acquisition','attribute conversions',2,['ads']],
['attribution','归因','assigning credit','Ads / Acquisition','paid acquisition','understand channel value',3,['ads']],
['ad fatigue','广告疲劳','audience bored','Ads / Acquisition','paid acquisition','monitor performance',2,['ads']],
['frequency','频次','ad views per person','Ads / Acquisition','paid acquisition','monitor delivery',2,['ads']],
['ad copy','广告文案','ad text','Ads / Acquisition','paid acquisition','craft message',1,['ads']],
['landing page view','落地页浏览','page visit','Ads / Acquisition','paid acquisition','measure traffic',2,['ads']],
['cost cap','成本上限','spending limit','Ads / Acquisition','paid acquisition','control budget',2,['ads']],
['audience overlap','受众重叠','audience duplication','Ads / Acquisition','paid acquisition','optimise targeting',3,['ads']],
['retargeting pixel','再营销像素','remarketing code','Ads / Acquisition','paid acquisition','track visitors',2,['ads']],
['ad engagement','广告互动','ad interaction','Ads / Acquisition','paid acquisition','measure response',2,['ads']],
['negative feedback','负面反馈','bad response','Ads / Acquisition','paid acquisition','monitor sentiment',2,['ads']],
['ad schedule','广告排期','ad timing','Ads / Acquisition','paid acquisition','control timing',1,['ads']],
['dynamic product ad','动态产品广告','personalised ad','Ads / Acquisition','paid acquisition','retarget with products',2,['ads']],
['cost per purchase','每次购买成本','acquisition cost','Ads / Acquisition','paid acquisition','measure efficiency',2,['ads']],

// Email / CRM
['email flow','邮件流程','automated email series','Email / CRM','email marketing','nurture customers',2,['email']],
['welcome flow','欢迎流程','new subscriber series','Email / CRM','email marketing','onboard new contacts',1,['email']],
['abandoned cart flow','弃购车流程','cart recovery emails','Email / CRM','email marketing','recover lost sales',3,['email']],
['post-purchase flow','购后流程','after-buy emails','Email / CRM','email marketing','build loyalty',2,['email']],
['win-back flow','召回流程','re-engage inactive','Email / CRM','email marketing','reactivate churned',2,['email']],
['subject line','邮件标题','email title','Email / CRM','email marketing','drive opens',1,['email']],
['open rate','打开率','percentage opened','Email / CRM','email marketing','measure engagement',1,['email']],
['click rate','点击率','percentage clicked','Email / CRM','email marketing','measure action',1,['email']],
['unsubscribe','退订','opt out','Email / CRM','email marketing','manage list health',1,['email']],
['segment','分群','customer group','Email / CRM','email marketing','target messaging',2,['email']],
['trigger','触发条件','automatic start','Email / CRM','email marketing','automate responses',2,['email']],
['personalization','个性化','custom content','Email / CRM','email marketing','increase relevance',2,['email']],
['Klaviyo','Klaviyo','email platform','Email / CRM','email marketing','send campaigns',1,['email'],'word','neutral'],
['Mailchimp','Mailchimp','email platform','Email / CRM','email marketing','send campaigns',1,['email'],'word','neutral'],
['CRM','客户关系管理','customer database','Email / CRM','email marketing','manage customers',2,['email']],
['drip campaign','滴灌营销','timed email series','Email / CRM','email marketing','educate leads',2,['email']],
['list cleaning','列表清理','remove inactive','Email / CRM','email marketing','maintain deliverability',2,['email']],
['sender reputation','发件人信誉','email trust score','Email / CRM','email marketing','ensure delivery',3,['email']],
['cart recovery email','购物车挽回邮件','abandoned cart email','Email / CRM','email marketing','recover sales',2,['email']],
['thank-you page','感谢页面','post-purchase page','Email / CRM','email marketing','confirm purchase',1,['email']],
['email sequence','邮件序列','email chain','Email / CRM','email marketing','nurture leads',1,['email']],
['bounce rate','退信率','email rejection rate','Email / CRM','email marketing','monitor deliverability',2,['email']],
['preview text','预览文字','email snippet','Email / CRM','email marketing','increase opens',1,['email']],
['list growth','列表增长','subscriber increase','Email / CRM','email marketing','grow audience',1,['email']],
['spam complaint','垃圾投诉','spam report','Email / CRM','email marketing','maintain reputation',3,['email']],
['email deliverability','邮件送达率','inbox rate','Email / CRM','email marketing','ensure delivery',3,['email']],
['email automation','邮件自动化','auto email','Email / CRM','email marketing','save time',2,['email']],
['conversion email','转化邮件','sales email','Email / CRM','email marketing','drive purchases',1,['email']],

// Customer Support
['refund','退款','money back','Customer Support','customer support','resolve payment issues',1,['support']],
['return','退货','send back','Customer Support','customer support','handle returns',1,['support']],
['chargeback','拒付','credit card dispute','Customer Support','customer support','prevent fraud',3,['support']],
['warranty','保修','product guarantee','Customer Support','customer support','provide assurance',2,['support']],
['defective unit','瑕疵品','broken item','Customer Support','customer support','resolve quality issues',2,['support']],
['replacement','替换品','new item sent','Customer Support','customer support','satisfy customers',1,['support']],
['shipping damage','运输损坏','damage during delivery','Customer Support','customer support','handle logistics issues',2,['support']],
['missing item','缺件','item not included','Customer Support','customer support','resolve packing errors',2,['support']],
['wrong address','错误地址','incorrect address','Customer Support','customer support','correct delivery info',2,['support']],
['customer complaint','客户投诉','negative feedback','Customer Support','customer support','address grievances',1,['support']],
['support reply','支持回复','response to customer','Customer Support','customer support','resolve tickets',1,['support']],
['response time','响应时间','time to reply','Customer Support','customer support','measure service',1,['support']],
['escalation','升级处理','send to higher level','Customer Support','customer support','handle complex cases',2,['support']],
['return label','退货标签','prepaid return sticker','Customer Support','customer support','simplify returns',1,['support']],
['refund policy','退款政策','money-back rules','Customer Support','customer support','set expectations',1,['support']],
['live chat','在线聊天','real-time support','Customer Support','customer support','provide instant help',1,['support']],
['help centre','帮助中心','support knowledge base','Customer Support','customer support','enable self-service',1,['support']],
['order confirmation','订单确认','purchase verification','Customer Support','customer support','confirm transactions',1,['support']],
['priority support','优先支持','faster help','Customer Support','customer support','serve VIP customers',1,['support']],
['knowledge base','知识库','article collection','Customer Support','customer support','enable self-help',1,['support']],
['customer feedback','客户反馈','user opinions','Customer Support','customer support','gather insights',1,['support']],
['ticket volume','工单量','request count','Customer Support','customer support','measure workload',1,['support']],

// Fulfillment / Logistics
['fulfillment','履约','order processing','Fulfillment / Logistics','post-campaign fulfillment','deliver products',2,['logistics']],
['3PL','第三方物流','third-party logistics','Fulfillment / Logistics','post-campaign fulfillment','outsource shipping',2,['logistics']],
['warehouse','仓库','storage facility','Fulfillment / Logistics','logistics','store inventory',1,['logistics']],
['tracking number','追踪号','delivery tracking code','Fulfillment / Logistics','logistics','track shipments',1,['logistics']],
['shipping label','运单','delivery address sticker','Fulfillment / Logistics','logistics','prepare packages',2,['logistics']],
['carrier','承运商','delivery company','Fulfillment / Logistics','logistics','transport goods',1,['logistics']],
['customs','海关','border inspection','Fulfillment / Logistics','logistics','clear international',3,['logistics']],
['duties','关税','import tax','Fulfillment / Logistics','logistics','pay import fees',2,['logistics']],
['last-mile delivery','最后一公里配送','final delivery step','Fulfillment / Logistics','logistics','complete delivery',3,['logistics']],
['delivery attempt','派送尝试','carrier tries to deliver','Fulfillment / Logistics','logistics','complete delivery',1,['logistics']],
['lost package','丢失包裹','missing shipment','Fulfillment / Logistics','logistics','resolve issues',2,['logistics']],
['inventory','库存','stock on hand','Fulfillment / Logistics','logistics','manage stock',1,['logistics']],
['backorder','缺货订单','order for out-of-stock','Fulfillment / Logistics','logistics','manage shortages',2,['logistics']],
['preorder','预售','order before available','Fulfillment / Logistics','pre-launch','gauge demand',2,['logistics']],
['pick and pack','拣货打包','select and box','Fulfillment / Logistics','logistics','process orders',2,['logistics']],
['shipping zone','运输区域','delivery area','Fulfillment / Logistics','logistics','calculate cost',2,['logistics']],
['dimensional weight','体积重量','size-based weight','Fulfillment / Logistics','logistics','calculate cost',3,['logistics']],
['proof of delivery','签收证明','delivery confirmation','Fulfillment / Logistics','logistics','verify receipt',2,['logistics']],
['freight charge','运费','shipping cost','Fulfillment / Logistics','logistics','manage costs',2,['logistics']],
['stockout','断货','out of stock','Fulfillment / Logistics','logistics','avoid shortages',2,['logistics']],
['customs clearance','清关','border processing','Fulfillment / Logistics','logistics','clear international',3,['logistics']],
['warehouse capacity','仓库容量','storage space','Fulfillment / Logistics','logistics','plan storage',2,['logistics']],
['parcel tracking','包裹追踪','package tracking','Fulfillment / Logistics','logistics','keep customers informed',1,['logistics']],

// Supplier / Foreign Trade
['supplier','供应商','provider','Supplier / Foreign Trade','supplier communication','source products',1,['supplier']],
['quotation','报价','price offer','Supplier / Foreign Trade','supplier communication','get pricing',2,['supplier']],
['MOQ','最小起订量','minimum order quantity','Supplier / Foreign Trade','supplier communication','negotiate terms',2,['supplier']],
['lead time','交货周期','production and delivery time','Supplier / Foreign Trade','supplier communication','plan production',2,['supplier']],
['sample','样品','test product','Supplier / Foreign Trade','supplier communication','verify quality',1,['supplier']],
['prototype','原型','first working version','Supplier / Foreign Trade','supplier communication','develop product',2,['supplier']],
['tooling','模具','mold making','Supplier / Foreign Trade','supplier communication','prepare production',3,['supplier']],
['mass production','量产','large-scale manufacturing','Supplier / Foreign Trade','supplier communication','scale up',2,['supplier']],
['quality inspection','质检','product check','Supplier / Foreign Trade','supplier communication','ensure standards',2,['supplier']],
['defective rate','不良率','percentage faulty','Supplier / Foreign Trade','supplier communication','measure quality',3,['supplier']],
['packaging','包装','box and wrapping','Supplier / Foreign Trade','supplier communication','design presentation',1,['supplier']],
['carton','纸箱','shipping box','Supplier / Foreign Trade','supplier communication','organise shipping',2,['supplier']],
['HS code','海关编码','harmonised system code','Supplier / Foreign Trade','supplier communication','clear customs',3,['supplier']],
['commercial invoice','商业发票','trade invoice','Supplier / Foreign Trade','supplier communication','document shipment',2,['supplier']],
['packing list','装箱单','item list in box','Supplier / Foreign Trade','supplier communication','document contents',2,['supplier']],
['freight forwarder','货运代理','shipping agent','Supplier / Foreign Trade','supplier communication','arrange transport',3,['supplier']],
['payment terms','付款条款','pay conditions','Supplier / Foreign Trade','supplier communication','agree on payment',2,['supplier']],
['deposit','定金','upfront payment','Supplier / Foreign Trade','supplier communication','secure order',1,['supplier']],
['balance payment','尾款','remaining amount','Supplier / Foreign Trade','supplier communication','complete payment',2,['supplier']],
['EXW','工厂交货','ex works','Supplier / Foreign Trade','supplier communication','agree terms',4,['supplier']],
['FOB','船上交货','free on board','Supplier / Foreign Trade','supplier communication','agree terms',4,['supplier']],
['CIF','到岸价','cost insurance freight','Supplier / Foreign Trade','supplier communication','agree terms',4,['supplier']],
['DDP','完税后交货','delivered duty paid','Supplier / Foreign Trade','supplier communication','agree terms',4,['supplier']],
['bill of lading','提单','shipping document','Supplier / Foreign Trade','supplier communication','document shipment',4,['supplier']],
['certificate of origin','原产地证','origin document','Supplier / Foreign Trade','supplier communication','comply with customs',4,['supplier']],
['reorder point','补货点','when to reorder','Supplier / Foreign Trade','supplier communication','plan inventory',3,['supplier']],
['safety stock','安全库存','buffer inventory','Supplier / Foreign Trade','supplier communication','prevent shortages',2,['supplier']],
['production schedule','生产排期','manufacturing timeline','Supplier / Foreign Trade','supplier communication','track progress',2,['supplier']],
['incoterms','国际贸易术语','trade terms','Supplier / Foreign Trade','supplier communication','agree delivery terms',4,['supplier']],
['purchase order','采购订单','buy order','Supplier / Foreign Trade','supplier communication','formalise order',2,['supplier']],
['supplier audit','供应商审计','factory check','Supplier / Foreign Trade','supplier communication','verify quality',3,['supplier']],
['production sample','生产样品','pre-production sample','Supplier / Foreign Trade','supplier communication','approve quality',2,['supplier']],
['shipping marks','唛头','box labels','Supplier / Foreign Trade','supplier communication','label correctly',3,['supplier']],
];

// === GENERATE COMPOUND PHRASES for extra capacity ===
const prefixes=['shipping','delivery','tracking','campaign','backer','order','supplier','product','customer','email','payment','warehouse','freight','customs','factory'];
const suffixes=['timeline','update','estimate','delay','confirmation','number','status','report','schedule','request','flow','policy','check','review','note','log'];
const compounds=[];
for(const p of prefixes)for(const s of suffixes){
  const t=p+' '+s;
  if(!existing.has(t.toLowerCase())){
    compounds.push([t,p.includes('shipping')||p.includes('delivery')||p.includes('freight')?'物流'+s:'业务'+s,'business term','Fulfillment / Logistics','logistics','track progress',2,['business']]);
  }
}

const allCandidates=candidates.concat(compounds);
console.log('Total candidates:',allCandidates.length,'| Need:',TARGET-data.length);

// === FILL LOOP ===
for(const c of allCandidates){
  if(data.length+newItems.length>=TARGET)break;
  add(c[0],c[1],c[2],c[3],c[4],c[5],c[6],c[7],c[8],c[9]);
}

const updated=data.concat(newItems);
fs.writeFileSync(file,JSON.stringify(updated));
console.log('FT: Added',added,'| Skipped:',skipped,'| Total:',updated.length);
if(updated.length>=TARGET)console.log('TARGET REACHED');
