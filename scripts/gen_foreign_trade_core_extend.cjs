const fs=require('fs');
const file='src/data/packs/foreign-trade-crowdfunding-dtc-operations-1000.json';
const data=JSON.parse(fs.readFileSync(file,'utf-8'));
const existing=new Set(data.map(d=>d.term.toLowerCase()));

const newItems=[];let id=data.length+1,added=0,skipped=0;
function add(t,sm,sis,topic,stage,work,ex,ez,diff,tg,type,reg){
  if(existing.has(t.toLowerCase())){skipped++;return false;}
  existing.add(t.toLowerCase());
  newItems.push({id:'foreign-trade-crowdfunding-dtc-operations-1000-'+String(id).padStart(4,'0'),packId:'foreign-trade-crowdfunding-dtc-operations-1000',term:t,type:type||'word',topic,businessStage:stage||'',workIntent:work||'',shortMeaning:sm,shortMeaningInSentence:sis,example:ex,exampleZh:ez,register:reg||'neutral',difficulty:diff||1,sourceType:'foreign_trade_dtc_style_original',sourceTitle:'Original foreign trade DTC learning sentence',sourceUrl:'',sourceDate:'',isRealSourceSentence:false,tags:tg||['dtc']});id++;added++;return true;
}
const terms=[
['order','订单','purchase','Shopify / DTC Store','dtc store operation','process purchases','We received over two hundred orders in the first hour of the sale.','我们在促销的第一个小时收到了超过两百个 order。',1,['dtc','basic']],
['customer','客户','buyer','Shopify / DTC Store','dtc store operation','serve buyers','A happy customer is more likely to leave a positive review and recommend the product to friends.','一个满意的 customer 更有可能留下好评并向朋友推荐产品。',1,['dtc','basic']],
['price','价格','cost','Shopify / DTC Store','dtc store operation','set pricing','The price needs to be competitive but still leave enough margin for ads and fulfillment.','price 需要有竞争力但仍要留出足够的 margin 用于 ads 和 fulfillment。',1,['dtc','basic']],
['discount','折扣','reduction','Shopify / DTC Store','dtc store operation','drive sales','We offered a ten percent discount to customers who signed up for the newsletter.','我们为注册 newsletter 的客户提供了百分之十的 discount。',1,['dtc','basic']],
['coupon','优惠券','voucher','Shopify / DTC Store','dtc store operation','incentivise purchase','The coupon code for first-time buyers brought in nearly three hundred new orders last month.','首次购买者的 coupon code 上个月带来了近三百个新订单。',1,['dtc','basic']],
['stock','库存','inventory','Fulfillment / Logistics','logistics','manage supply','We ran out of stock on the blue variant during the holiday rush and had to pause the listing.','我们在节日促销期间蓝色款的 stock 卖光了不得不暂停 listing。',1,['logistics','basic']],
['delivery','配送','transport to customer','Fulfillment / Logistics','logistics','complete order','The delivery took three days longer than estimated because of bad weather at the distribution centre.','由于配送中心的恶劣天气 delivery 比预计多花了三天。',1,['logistics','basic']],
['shipment','发货','sent goods','Fulfillment / Logistics','logistics','send products','The second shipment of inventory arrived at the warehouse on Thursday morning.','第二批 inventory shipment 周四早上到达了 warehouse。',1,['logistics','basic']],
['package','包裹','parcel','Fulfillment / Logistics','logistics','send items','Please double-check the package weight before printing the shipping label.','请在打印 shipping label 之前仔细检查 package 重量。',1,['logistics','basic']],
['address','地址','delivery location','Fulfillment / Logistics','logistics','deliver correctly','The customer entered the wrong address so the package was returned to our warehouse.','客户输入了错误的 address 所以 package 被退回了我们的 warehouse。',1,['logistics','basic']],
['invoice','发票','bill','Supplier / Foreign Trade','supplier communication','document payment','The supplier sent the invoice after the goods left the factory and we have thirty days to pay.','supplier 在货物离开工厂后发送了 invoice 我们有三十天付款时间。',1,['supplier','basic']],
['receipt','收据','proof of purchase','Customer Support','customer support','confirm payment','The customer asked for a receipt because they needed it for their expense report.','客户要求一份 receipt 因为他们需要用于报销。',1,['support','basic']],
['payment','付款','money transfer','Supplier / Foreign Trade','supplier communication','complete transaction','We made the payment via bank transfer and the supplier confirmed it arrived within two hours.','我们通过银行转账进行了 payment supplier 确认两小时内到账。',1,['supplier','basic']],
['exchange','换货','swap','Customer Support','customer support','resolve issues','The customer wanted an exchange for a different size because the original one was too big.','客户想要 exchange 不同尺码因为原来的太大了。',1,['support','basic']],
['tracking','追踪','following shipment','Fulfillment / Logistics','logistics','monitor delivery','The tracking shows the package arrived at the local distribution centre this morning.','tracking 显示包裹今早到达了本地配送中心。',1,['logistics','basic']],
['quantity','数量','amount','Supplier / Foreign Trade','supplier communication','specify order','We need to confirm the quantity before the factory starts production because there is an MOQ.','我们需要在工厂开始生产前确认 quantity 因为有 MOQ。',1,['supplier','basic']],
['unit price','单价','price per item','Supplier / Foreign Trade','supplier communication','negotiate cost','The unit price drops significantly when the order quantity exceeds one thousand pieces.','当订单 quantity 超过一千件时 unit price 显著下降。',2,['supplier','basic']],
['review','评价','customer feedback','Shopify / DTC Store','dtc store operation','build trust','We send an automated email asking for a review about a week after the product is delivered.','我们在产品送达大约一周后自动发送邮件索要 review。',1,['dtc','basic']],
['rating','评分','star score','Shopify / DTC Store','dtc store operation','measure satisfaction','The average rating on our product page is 4.7 stars which helps with the conversion rate.','我们产品页上的平均 rating 是 4.7 星这有助于 conversion rate。',1,['dtc','basic']],
['complaint','投诉','grievance','Customer Support','customer support','handle issues','Every customer complaint gets a personal response within four hours during business days.','每个 customer complaint 在工作日四小时内都会得到个人回复。',1,['support','basic']],
['message','消息','communication','Customer Support','customer support','reply to customers','The customer sent a message asking about the shipping status of their order.','客户发来 message 询问他们订单的 shipping status。',1,['support','basic']],
['promotion','促销','sales event','Shopify / DTC Store','dtc store operation','boost sales','The Black Friday promotion brought in more orders in one day than we usually get in a month.','Black Friday promotion 一天带来的订单比我们通常一个月还多。',1,['dtc','basic']],
];for(const t of terms)add(t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8],t[9],t[10]);
const updated=data.concat(newItems);
fs.writeFileSync(file,JSON.stringify(updated));
console.log('FT Extend: Added',added,'| Skipped:',skipped,'| Total:',updated.length);
