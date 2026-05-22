// DEPRECATED / DO NOT RUN
// This generator may produce low-quality or over-target items.
// Use only with a manually curated candidate pool.
const fs=require('fs');
const file='src/data/packs/robotics-maintenance-troubleshooting-1000.json';
const data=JSON.parse(fs.readFileSync(file,'utf-8'));
const existing=new Set(data.map(d=>d.term.toLowerCase()));

const FF={PLC:'Programmable Logic Controller','I/O':'Input/Output',IP:'Internet Protocol','E-stop':'Emergency Stop',EtherCAT:'Ethernet for Control Automation Technology',PROFINET:'Process Field Net',DeviceNet:'Device Network',UPS:'Uninterruptible Power Supply',HMI:'Human Machine Interface',SCARA:'Selective Compliance Assembly Robot Arm',DO:'Digital Output',DI:'Digital Input',AI:'Analog Input',AO:'Analog Output',VFD:'Variable Frequency Drive',PCB:'Printed Circuit Board',CPU:'Central Processing Unit'};

const newItems=[];
let id=data.length+1,added=0,skipped=0;
const TARGET=250;

function add(t,sm,sis,topic,work,scene,role,ex,ez,diff,tags,type,reg){
  if(existing.has(t.toLowerCase())){skipped++;return false;}
  existing.add(t.toLowerCase());
  newItems.push({id:'robotics-maintenance-troubleshooting-1000-'+String(id).padStart(4,'0'),packId:'robotics-maintenance-troubleshooting-1000',term:t,type:type||'word',topic,workIntent:work||'',scene:scene||'',role:role||'',shortMeaning:sm,shortMeaningInSentence:sis,example:ex,exampleZh:ez,register:reg||'workplace',difficulty:diff||2,sourceType:'robotics_maintenance_style_original',sourceTitle:'Original robotics maintenance learning sentence',sourceUrl:'',sourceDate:'',isRealSourceSentence:false,tags:tags||['maintenance'],fullForm:FF[t]||undefined});
  id++;added++;return true;
}

const terms=[
// Fault Diagnosis
['fault','故障','problem or failure','Fault Diagnosis','diagnose issue','onsite visit','service engineer','The fault only appears when the robot runs at full speed for more than ten minutes.','fault 只在机器人全速运行超过十分钟时才出现。',2,['diagnosis','troubleshooting']],
['alarm','报警','warning signal','Fault Diagnosis','diagnose issue','remote support','service engineer','The alarm history shows an overcurrent event on axis three at 9:42 this morning.','alarm 记录显示今早 9:42 在三轴上有一个过流事件。',2,['diagnosis','monitoring']],
['error code','错误代码','fault identifier','Fault Diagnosis','diagnose issue','remote support','service engineer','The error code on the teach pendant is SRVO-062 which points to a brake issue.','示教器上的 error code 是 SRVO-062 指向一个制动器问题。',3,['diagnosis','troubleshooting']],
['alarm history','报警记录','past alarms','Fault Diagnosis','diagnose issue','remote support','service engineer','Please send the alarm history from the last 48 hours so we can see the sequence of events.','请发送过去 48 小时的 alarm history 让我们能看到事件顺序。',2,['diagnosis','data']],
['intermittent fault','间歇性故障','comes and goes','Fault Diagnosis','diagnose issue','onsite visit','service engineer','Intermittent faults are the hardest to troubleshoot because the problem disappears when you try to measure it.','intermittent fault 最难排查因为当你试图测量时问题就消失了。',3,['diagnosis','troubleshooting']],
['communication fault','通信故障','network issue','Fault Diagnosis','diagnose issue','remote support','service engineer','The communication fault comes and goes which suggests a loose cable or a damaged connector.','communication fault 时有时无这暗示可能是线缆松动或接头损坏。',3,['diagnosis','network']],
['encoder fault','编码器故障','position sensor error','Fault Diagnosis','diagnose issue','onsite visit','service engineer','The encoder fault on axis two keeps appearing after the robot warms up for about twenty minutes.','二轴的 encoder fault 在机器人热身约二十分钟后持续出现。',3,['diagnosis','sensor']],
['servo fault','伺服故障','motor drive error','Fault Diagnosis','diagnose issue','onsite visit','service engineer','A servo fault on the wrist axis suggests we need to check the cable harness first.','手腕轴的 servo fault 表明我们需要先检查 cable harness。',3,['diagnosis','motor']],

// Troubleshooting
['troubleshooting','故障排查','finding the problem','Fault Diagnosis','troubleshoot','onsite visit','service engineer','Start the troubleshooting by checking the simplest things first: power cables connectors and fuses.','从最简单的东西开始 troubleshooting：电源线、接头和保险丝。',2,['diagnosis','method']],
['root cause','根本原因','real reason','Fault Diagnosis','diagnose issue','onsite visit','service engineer','We replaced the drive twice but never found the root cause of the overcurrent events.','我们换了两次驱动器但从未找到过流事件的 root cause。',3,['diagnosis','method']],
['workaround','临时方案','temporary fix','Fault Diagnosis','troubleshoot','onsite visit','service engineer','There is a workaround that keeps the line running while we wait for the replacement part to arrive.','有一个 workaround 可以在我们等待替换件到达期间保持产线运行。',2,['diagnosis','operations']],
['dropout','信号中断','signal loss','Fault Diagnosis','diagnose issue','remote support','service engineer','The sensor keeps dropping out for a few milliseconds which is enough to trigger a stop.','传感器持续 dropout 几毫秒这足以触发停机。',2,['diagnosis','sensor']],
['timeout','超时','no response','Fault Diagnosis','diagnose issue','remote support','service engineer','The timeout on the safety signal suggests the safety PLC is not getting a response from the robot controller.','安全信号的 timeout 表明安全 PLC 没有收到 robot controller 的响应。',3,['diagnosis','safety']],

// Preventive Maintenance
['preventive maintenance','预防性维护','regular upkeep','Preventive Maintenance','prevent failure','onsite visit','service engineer','The preventive maintenance schedule says we need to replace the gearbox oil every 4000 hours.','preventive maintenance 计划表显示我们需要每 4000 小时更换齿轮箱油。',2,['maintenance','planning']],
['inspection','检查','visual check','Preventive Maintenance','prevent failure','onsite visit','maintenance technician','The weekly inspection includes checking all cable connections and listening for unusual noises.','每周 inspection 包括检查所有线缆连接和听是否有异常噪音。',1,['maintenance','routine']],
['spare part','备件','replacement component','Preventive Maintenance','prevent failure','onsite visit','maintenance technician','We keep critical spare parts like drives and encoders in stock to minimise downtime.','我们在库存中保留关键 spare part 如驱动器和编码器以最大限度地减少停机时间。',2,['maintenance','inventory']],
['worn part','磨损件','used-up component','Preventive Maintenance','prevent failure','onsite visit','maintenance technician','The gripper fingers are a worn part that needs replacement roughly every six months.','gripper finger 是一种 worn part 大约每六个月需要更换。',2,['maintenance','wear']],
['lubrication','润滑','grease or oil','Preventive Maintenance','prevent failure','onsite visit','maintenance technician','Check the lubrication on all six axes and top up if the grease looks dry.','检查所有六个轴的 lubrication 如果 grease 看起来干了就补充。',2,['maintenance','routine']],
['backlash','间隙','mechanical play','Preventive Maintenance','inspect wear','onsite visit','service engineer','Excessive backlash in the joint usually means the gearbox needs to be replaced soon.','joint 中 excessive backlash 通常意味着 gearbox 需要尽快更换。',3,['maintenance','mechanical']],

// Electrical & Wiring
['loose connection','松动连接','not tight','Electrical and Wiring','diagnose issue','onsite visit','service engineer','A loose connection on the encoder cable can cause intermittent faults that are very hard to reproduce.','encoder cable 上的 loose connection 可能导致间歇性故障非常难以重现。',2,['electrical','wiring']],
['cable harness','线束','bundle of wires','Electrical and Wiring','diagnose issue','onsite visit','service engineer','The cable harness on axis three shows signs of rubbing against the robot frame.','三轴的 cable harness 显示出与机器人框架摩擦的迹象。',2,['electrical','wiring']],
['connector','接头','plug','Electrical and Wiring','diagnose issue','onsite visit','service engineer','Try reseating the connector before ordering a replacement cable because the pins might just be dirty.','在订购更换线缆之前尝试重新插拔 connector 因为针脚可能只是脏了。',2,['electrical','wiring']],
['terminal','端子','screw terminal','Electrical and Wiring','diagnose issue','onsite visit','service engineer','Check that the terminals on the motor drive are torqued to the specification on the label.','检查 motor drive 上的 terminal 是否按标签上的规格拧紧了。',2,['electrical','wiring']],
['grounding','接地','earth connection','Electrical and Wiring','prevent failure','onsite visit','service engineer','Poor grounding can cause noise on the encoder signals leading to erratic robot behaviour.','poor grounding 可能导致 encoder signal 上的 noise 引起 erratic robot behaviour。',3,['electrical','safety']],
['shielding','屏蔽','noise protection','Electrical and Wiring','diagnose issue','onsite visit','service engineer','If the shielding on the signal cable is damaged the encoder feedback will pick up noise from the motor power cables.','如果 signal cable 的 shielding 损坏 encoder feedback 就会从 motor power cable 中拾取 noise。',3,['electrical','wiring']],
['fuse','保险丝','safety fuse','Electrical and Wiring','diagnose issue','onsite visit','maintenance technician','The fuse on the control cabinet blew and needs to be replaced with the same rating.','控制柜里的 fuse 烧了需要用同样额定值的更换。',1,['electrical','component']],
['relay','继电器','switch','Electrical and Wiring','diagnose issue','onsite visit','maintenance technician','The relay that controls the gripper is not clicking so it may need to be replaced.','控制 gripper 的 relay 没有咔嗒声所以可能需要更换。',2,['electrical','component']],
['contactor','接触器','heavy-duty relay','Electrical and Wiring','diagnose issue','onsite visit','service engineer','The main contactor is chattering which usually means the coil voltage is too low.','主 contactor 在震颤通常意味着线圈电压太低。',3,['electrical','component']],

// Safety
['emergency stop','急停','E-stop','Safety','respond to emergency','onsite visit','operator','Someone hit the emergency stop during the shift change and the robot needs to be re-homed.','有人在换班时按了 emergency stop 机器人需要重新回零。',1,['safety','operation']],
['safety gate','安全门','protective barrier','Safety','prevent access','onsite visit','safety engineer','The robot stops instantly when the safety gate opens which is normal behaviour.','safety gate 打开时机器人立即停止这是正常行为。',1,['safety','hardware']],
['interlock','互锁','safety lock','Safety','prevent access','onsite visit','safety engineer','The interlock on the welding cell door must not be bypassed even for testing.','焊接间的 interlock 即使为测试也不得被 bypass。',3,['safety','hardware']],
['light curtain','光幕','safety beam','Safety','prevent access','onsite visit','safety engineer','If the light curtain is triggered during automatic mode the robot must come to an immediate stop.','如果在自动模式下触发 light curtain 机器人必须立即停止。',2,['safety','hardware']],

// Sensors & Actuators
['encoder','编码器','position sensor','Sensors and Actuators','diagnose issue','onsite visit','service engineer','Can you check the encoder cable on axis four? The position reading jumps when the arm moves fast.','你能检查一下四轴的 encoder cable 吗？当机械臂快速移动时位置读数会跳变。',2,['sensor','diagnosis']],
['proximity sensor','接近传感器','nearness detector','Sensors and Actuators','diagnose issue','onsite visit','maintenance technician','The proximity sensor is not detecting the part which means either the sensor is dirty or the gap is too large.','proximity sensor 没有检测到工件这意味着要么传感器脏了要么间隙太大。',2,['sensor','diagnosis']],
['limit switch','限位开关','end stop','Sensors and Actuators','diagnose issue','onsite visit','maintenance technician','The limit switch at the end of the linear rail is stuck and needs to be freed or replaced.','linear rail 末端的 limit switch 卡住了需要松开或更换。',2,['sensor','diagnosis']],
['photoelectric sensor','光电传感器','light beam sensor','Sensors and Actuators','diagnose issue','onsite visit','maintenance technician','The photoelectric sensor is giving a false reading because the reflector is covered in dust.','photoelectric sensor 给出了错误读数因为反射镜被灰尘覆盖了。',2,['sensor','diagnosis']],
['overheating','过热','too hot','Sensors and Actuators','diagnose issue','onsite visit','service engineer','The motor on axis one is overheating which suggests the cooling fan might have failed.','一轴的 motor 过热这表明 cooling fan 可能已经坏了。',2,['diagnosis','motor']],
['vibration','振动','shaking','Sensors and Actuators','diagnose issue','onsite visit','service engineer','Excessive vibration during high-speed moves usually means a bearing or gearbox issue.','高速运动时的 excessive vibration 通常意味着 bearing 或 gearbox 的问题。',2,['diagnosis','mechanical']],

// Mechanical Repair
['bearing','轴承','support ring','Mechanical Repair','replace part','onsite visit','service engineer','The bearing on axis two has been making noise for weeks and needs replacement before it seizes.','二轴的 bearing 已经响了几个星期需要在卡死之前更换。',2,['mechanical','component']],
['gearbox','齿轮箱','speed reducer','Mechanical Repair','replace part','onsite visit','service engineer','We replaced the gearbox on axis three last month and the robot has been running smoothly since.','我们上个月更换了三轴的 gearbox 此后 robot 一直平稳运行。',3,['mechanical','component']],
['brake','制动器','stopping device','Mechanical Repair','diagnose issue','onsite visit','service engineer','The brake on axis five is not releasing properly which is why the joint cannot move freely.','五轴的 brake 没有正常释放这就是为什么 joint 不能自由移动。',3,['mechanical','component']],
['jam','卡死','stuck','Mechanical Repair','troubleshoot','onsite visit','service engineer','The gripper is jammed and will not open even when we send the manual release command.','gripper jam 了即使我们发送手动释放命令也无法打开。',2,['mechanical','troubleshooting']],
['alignment','对中','position adjustment','Mechanical Repair','adjust','onsite visit','service engineer','After replacing the motor we need to check the alignment between the motor shaft and the gearbox input.','更换 motor 后我们需要检查 motor shaft 和 gearbox input 之间的 alignment。',3,['mechanical','precision']],

// End Effector / Tooling
['gripper','夹爪','robot hand','End Effector and Tooling','diagnose issue','onsite visit','service engineer','The gripper loses vacuum after a few cycles so there might be a leak in the air line.','gripper 运行几个循环后就失去真空所以可能是 air line 有泄漏。',2,['end-effector','diagnosis']],
['vacuum','真空','suction','End Effector and Tooling','diagnose issue','onsite visit','service engineer','The vacuum level drops during the pick which means the suction cup might be worn or cracked.','pick 过程中 vacuum level 下降这意味着 suction cup 可能已磨损或开裂。',2,['end-effector','diagnosis']],
['vacuum leak','真空泄漏','air escaping','End Effector and Tooling','diagnose issue','onsite visit','service engineer','A small vacuum leak in the hose can cause the part to drop mid-cycle.','hose 中的 small vacuum leak 可能导致工件在 cycle 中间掉落。',2,['end-effector','diagnosis']],
['air pressure','气压','pneumatic pressure','End Effector and Tooling','diagnose issue','onsite visit','service engineer','The air pressure at the gripper is below spec so check the regulator at the valve bank.','gripper 处的 air pressure 低于规格所以检查 valve bank 的 regulator。',2,['end-effector','pneumatic']],
['tooling','工装','end tool','End Effector and Tooling','replace part','onsite visit','maintenance technician','The tooling needs to be inspected after every 10000 cycles for signs of wear on the contact surfaces.','tooling 需要每 10000 个 cycle 检查接触面的磨损迹象。',2,['end-effector','maintenance']],

// Commissioning & Calibration
['commissioning','调试','setting up','Commissioning and Calibration','commission','onsite visit','service engineer','The commissioning of the new robot took about three days including safety validation and first test runs.','新机器人的 commissioning 花了大约三天包括安全验证和首次试运行。',3,['commissioning','setup']],
['calibration','校准','accuracy setting','Commissioning and Calibration','calibrate','onsite visit','service engineer','The robot needs recalibration after we replaced the encoder because the zero position has shifted.','更换 encoder 后机器人需要 recalibration 因为 zero position 已经偏移了。',3,['calibration','precision']],
['mastering','回零','home position','Commissioning and Calibration','calibrate','onsite visit','service engineer','After a battery failure the robot lost its mastering and needs to be re-taught the zero position on each axis.','电池失效后机器人丢失了 mastering 需要重新示教每个轴的 zero position。',3,['calibration','setup']],
['zero position','零点','home reference','Commissioning and Calibration','calibrate','onsite visit','service engineer','If the zero position is off by even half a degree the entire programme will run with an offset.','如果 zero position 偏移了哪怕半度整个程序都会带着 offset 运行。',3,['calibration','precision']],

// Communication & Network
['I/O','输入输出','input output','Communication and Network','diagnose issue','remote support','service engineer','The I/O module on the gripper is not responding so the robot cannot confirm the part is held.','gripper 上的 I/O 模块没有响应所以机器人无法确认工件被夹持。',2,['network','diagnosis']],
['PLC','PLC','programmable controller','Communication and Network','diagnose issue','remote support','control engineer','The safety PLC is not receiving the E-stop status from the robot controller.','安全 PLC 没有从 robot controller 收到 E-stop 状态。',3,['network','safety']],
['fieldbus','现场总线','industrial network','Communication and Network','diagnose issue','remote support','control engineer','The fieldbus connection dropped for about 200 milliseconds which was enough to trigger a network timeout.','fieldbus 连接断了约 200 毫秒足以触发 network timeout。',4,['network','diagnosis']],
['network cable','网线','Ethernet cable','Communication and Network','diagnose issue','onsite visit','maintenance technician','The network cable between the robot controller and the switch was pinched under a cable tray cover.','robot controller 和 switch 之间的 network cable 被压在 cable tray cover 下。',1,['network','wiring']],
['IP address','IP 地址','network address','Communication and Network','diagnose issue','remote support','control engineer','The robot controller has a static IP address so make sure the laptop is on the same subnet.','robot controller 有一个 static IP address 所以确保 laptop 在同一 subnet 上。',2,['network','configuration']],

// Power & Electrical
['overcurrent','过流','too much current','Power and Electrical','diagnose issue','onsite visit','service engineer','The overcurrent alarm on axis one suggests either a mechanical bind or a failing motor drive.','一轴的 overcurrent alarm 表明要么是 mechanical bind 要么是 motor drive 即将失效。',3,['electrical','diagnosis']],
['overload','过载','too much load','Power and Electrical','diagnose issue','onsite visit','service engineer','The overload warning appears when the robot tries to lift a part heavier than the rated payload.','当机器人试图举起超过 rated payload 的工件时会出现 overload warning。',2,['electrical','diagnosis']],
['undervoltage','欠压','low voltage','Power and Electrical','diagnose issue','onsite visit','service engineer','An undervoltage condition can cause the drives to shut down to protect themselves from damage.','undervoltage 状况可能导致驱动器关闭以保护自身免受损坏。',3,['electrical','diagnosis']],
['power cycle','断电重启','turn off and on','Power and Electrical','troubleshoot','remote support','service engineer','Try to power cycle the controller first before attempting any hardware replacement.','在尝试任何硬件更换之前先试着 power cycle 控制器。',1,['electrical','troubleshooting']],
['reset','复位','clear fault','Power and Electrical','troubleshoot','onsite visit','maintenance technician','A simple reset cleared the fault and the robot has been running fine for the past two hours.','一个简单的 reset 清除了 fault 机器人过去两小时一直正常运行。',1,['electrical','troubleshooting']],
['reboot','重启','restart system','Power and Electrical','troubleshoot','remote support','service engineer','The reboot takes about three minutes and the robot should come back to its home position automatically.','reboot 大约需要三分钟机器人应该自动回到 home position。',1,['electrical','troubleshooting']],
['breaker','断路器','circuit breaker','Power and Electrical','diagnose issue','onsite visit','maintenance technician','The breaker for the robot cell tripped during the storm so check if anything else in the panel is affected.','机器人工作间的 breaker 在暴风雨中跳闸了所以检查一下 panel 中是否还有其他设备受影响。',1,['electrical','component']],

// Service Communication
['service report','服务报告','visit document','Service Communication','document','onsite visit','service engineer','The service report should include all error codes found the actions taken and the parts replaced.','service report 应该包括发现的所有 error code 采取的措施和更换的 parts。',2,['service','documentation']],
['onsite visit','现场访问','in-person trip','Service Communication','diagnose issue','onsite visit','service engineer','The onsite visit is scheduled for Tuesday morning and the customer has cleared access to the robot cell.','onsite visit 安排在周二上午客户已经清除了 robot cell 的通道。',2,['service','planning']],
['remote support','远程支持','distance help','Service Communication','diagnose issue','remote support','service engineer','We provided remote support via VPN and were able to clear the fault without sending a technician.','我们通过 VPN 提供了 remote support 能够在不派出技术员的情况下清除 fault。',2,['service','remote']],
['backup','备份','copy settings','Service Communication','prevent failure','remote support','service engineer','Always take a backup of the robot parameters before making any changes to the configuration.','在对配置做任何更改之前总是 backup 机器人参数。',1,['service','procedure']],
['restore','恢复','load backup','Service Communication','troubleshoot','remote support','service engineer','We restored the previous backup and the robot started working normally again.','我们 restore 了之前的 backup 机器人又开始正常工作了。',2,['service','procedure']],
];

for(const t of terms)add(t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8],t[9],t[10],t[11]);
const updated=data.concat(newItems);
fs.writeFileSync(file,JSON.stringify(updated));
console.log('Maintenance: Added',added,'| Skipped:',skipped,'| Total:',updated.length);
