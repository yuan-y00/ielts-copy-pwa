const fs=require('fs');
const d=JSON.parse(fs.readFileSync('src/data/packs/ai-product-management-llm-products-1000.json','utf-8'));
const i=d.find(x=>x.term==='model fine-tuning');
if(i){i.exampleZh='我们正在用客户支持对话记录 model fine-tuning 以提高特定领域的准确性。';console.log('Fixed')}
else console.log('Not found');
fs.writeFileSync('src/data/packs/ai-product-management-llm-products-1000.json',JSON.stringify(d));
