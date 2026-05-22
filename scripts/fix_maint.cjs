const fs=require('fs');
const d=JSON.parse(fs.readFileSync('src/data/packs/robotics-maintenance-troubleshooting-1000.json','utf-8'));
const fixes={overheating:'一轴的 motor overheating 这表明 cooling fan 可能已经坏了。',calibration:'更换 encoder 后机器人需要 calibration 因为 zero position 已经偏移了。'};
for(const item of d){if(fixes[item.term]){item.exampleZh=fixes[item.term];console.log('Fixed',item.term)}}
fs.writeFileSync('src/data/packs/robotics-maintenance-troubleshooting-1000.json',JSON.stringify(d));
