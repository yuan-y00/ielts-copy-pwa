const fs=require('fs');
const file='src/data/packs/robotics-maintenance-troubleshooting-1000.json';
const data=JSON.parse(fs.readFileSync(file,'utf-8'));
const existing=new Set(data.map(d=>d.term.toLowerCase()));

const newItems=[];let id=data.length+1,added=0,skipped=0;
function add(t,sm,sis,topic,work,scene,role,ex,ez,diff,tg,type,reg){
  if(existing.has(t.toLowerCase())){skipped++;return false;}
  existing.add(t.toLowerCase());
  newItems.push({id:'robotics-maintenance-troubleshooting-1000-'+String(id).padStart(4,'0'),packId:'robotics-maintenance-troubleshooting-1000',term:t,type:type||'word',topic,workIntent:work||'',scene:scene||'',role:role||'',shortMeaning:sm,shortMeaningInSentence:sis,example:ex,exampleZh:ez,register:reg||'workplace',difficulty:diff||1,sourceType:'robotics_maintenance_style_original',sourceTitle:'Original robotics maintenance learning sentence',sourceUrl:'',sourceDate:'',isRealSourceSentence:false,tags:tg||['maintenance']});id++;added++;return true;
}
const terms=[
['machine','机器','equipment','Fault Diagnosis','diagnose','onsite visit','service engineer','The machine has been running without issues for over 8000 hours since the last major service.','自上次大修以来 machine 已经无故障运行了超过 8000 小时。',1,['maintenance','basic']],
['wire','电线','cable','Electrical and Wiring','diagnose','onsite visit','maintenance technician','Check if the wire is damaged where it passes through the cable chain because that is a common failure point.','检查 wire 在经过 cable chain 的地方是否损坏因为那是一个常见的故障点。',1,['electrical','basic']],
['switch','开关','toggle','Electrical and Wiring','diagnose','onsite visit','maintenance technician','The switch on the control panel is not responding so we may need to replace the entire button assembly.','控制面板上的 switch 没有响应所以我们可能需要更换整个按钮组件。',1,['electrical','basic']],
['button','按钮','push button','Electrical and Wiring','diagnose','onsite visit','maintenance technician','The emergency stop button was pressed during the night shift and nobody recorded it in the log.','夜班期间有人按了紧急停止 button 但没人在 log 中记录。',1,['electrical','basic']],
['power','电源','electricity','Power and Electrical','diagnose','onsite visit','service engineer','The power to the robot cell was interrupted for about two seconds during the thunderstorm.','雷暴期间 robot cell 的 power 中断了大约两秒。',1,['electrical','basic']],
['battery','电池','power cell','Power and Electrical','diagnose','onsite visit','service engineer','The battery in the robot controller needs to be replaced every two years to avoid losing the mastering data.','robot controller 中的 battery 需要每两年更换以避免丢失 mastering 数据。',1,['electrical','basic']],
['fan','风扇','cooling fan','Sensors and Actuators','diagnose','onsite visit','maintenance technician','The cooling fan on the control cabinet is making a grinding noise and needs to be replaced soon.','控制柜上的 cooling fan 发出摩擦噪音需要尽快更换。',1,['maintenance','basic']],
['cabinet','控制柜','enclosure','Electrical and Wiring','diagnose','onsite visit','service engineer','Keep the cabinet door closed when the robot is running to prevent dust from getting inside.','机器人运行时保持 cabinet 门关闭以防止灰尘进入。',1,['electrical','basic']],
['controller','控制器','robot controller','Communication and Network','diagnose','onsite visit','service engineer','The robot controller shows a green status light which means all systems are operating normally.','robot controller 显示绿色 status light 这意味着所有 systems 运行正常。',1,['hardware','basic']],
['screen','屏幕','display','Electrical and Wiring','diagnose','onsite visit','maintenance technician','The teach pendant screen is flickering which might be a loose connection or a failing backlight.','teach pendant screen 在闪烁可能是 loose connection 或 backlight 故障。',1,['electrical','basic']],
['light','灯','indicator','Electrical and Wiring','diagnose','onsite visit','maintenance technician','The red light on the safety relay means the circuit is open and the robot cannot move.','safety relay 上的 red light 意味着 circuit open 机器人不能移动。',1,['electrical','basic']],
['stop','停止','halt','Safety','respond','onsite visit','operator','The robot made an unexpected movement so I hit the stop button and called the technician.','机器人做了一个意外动作所以我按了 stop button 并叫了技术员。',1,['safety','basic']],
['start','启动','begin','Commissioning and Calibration','commission','onsite visit','maintenance technician','The robot will not start until the safety gate is closed and the reset button is pressed.','在 safety gate 关闭并按下 reset button 之前机器人不会 start。',1,['safety','basic']],
['replace','更换','swap out','Mechanical Repair','replace','onsite visit','service engineer','We need to replace the gearbox on axis three because the backlash is now out of tolerance.','我们需要 replace 三轴的 gearbox 因为 backlash 现在已经超出了 tolerance。',1,['mechanical','basic']],
['tighten','拧紧','make tight','Mechanical Repair','adjust','onsite visit','maintenance technician','Tighten all the bolts on the robot base every six months because vibration can loosen them over time.','每六个月 tighten 机器人底座上的所有 bolts 因为 vibration 会随时间使其松动。',1,['mechanical','basic']],
['loose','松动的','not tight','Mechanical Repair','diagnose','onsite visit','maintenance technician','The loose bolt on the gripper mounting plate caused the entire tool to wobble during high-speed moves.','gripper mounting plate 上的 loose bolt 导致整个 tool 在高速移动时晃动。',1,['mechanical','basic']],
['broken','损坏的','not working','Mechanical Repair','diagnose','onsite visit','service engineer','The broken bearing was found during the routine inspection and replaced before it caused a production stop.','broken bearing 在 routine inspection 中被发现并在导致 production stop 之前更换了。',1,['mechanical','basic']],
['dirty','脏的','contaminated','Preventive Maintenance','inspect','onsite visit','maintenance technician','The encoder is reading incorrectly because the optical disc inside is dirty from dust ingress.','encoder 读数不正确因为里面的 optical disc 因灰尘进入而 dirty。',1,['maintenance','basic']],
['blocked','堵塞的','obstructed','Sensors and Actuators','diagnose','onsite visit','maintenance technician','The air line to the gripper is blocked which is why the vacuum level is lower than normal.','到 gripper 的 air line blocked 了这就是为什么真空水平低于正常值。',1,['maintenance','basic']],
['tool','工具','instrument','End Effector and Tooling','replace','onsite visit','maintenance technician','Always use the correct tool when adjusting the robot to avoid damaging the bolts or the frame.','在调整机器人时总是使用正确的 tool 以避免损坏 bolts 或 frame。',1,['maintenance','basic']],
['manual','手册','instruction book','Service Communication','reference','onsite visit','maintenance technician','The manual says the gearbox oil should be changed every 4000 hours of operation.','manual 说 gearbox oil 应该每运行 4000 小时更换一次。',1,['service','basic']],
];for(const t of terms)add(t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8],t[9],t[10]);
const updated=data.concat(newItems);
fs.writeFileSync(file,JSON.stringify(updated));
console.log('Maint Extend: Added',added,'| Skipped:',skipped,'| Total:',updated.length);
