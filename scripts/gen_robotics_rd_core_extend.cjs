const fs=require('fs');
const file='src/data/packs/robotics-rd-engineering-research-1000.json';
const data=JSON.parse(fs.readFileSync(file,'utf-8'));
const existing=new Set(data.map(d=>d.term.toLowerCase()));

const newItems=[];let id=data.length+1,added=0,skipped=0;
function add(t,sm,sis,topic,research,usage,work,ex,ez,diff,tg,type,reg){
  if(existing.has(t.toLowerCase())){skipped++;return false;}
  existing.add(t.toLowerCase());
  newItems.push({id:'robotics-rd-engineering-research-1000-'+String(id).padStart(4,'0'),packId:'robotics-rd-engineering-research-1000',term:t,type:type||'word',topic,researchArea:research||'',usageScene:usage||'',workIntent:work||'',shortMeaning:sm,shortMeaningInSentence:sis,example:ex,exampleZh:ez,register:reg||'technical',difficulty:diff||2,sourceType:'robotics_rd_style_original',sourceTitle:'Original robotics R&D learning sentence',sourceUrl:'',sourceDate:'',isRealSourceSentence:false,tags:tg||['robotics']});id++;added++;return true;
}
const terms=[
['robot','机器人','machine','Research and Evaluation','system architecture','system design','design system','The robot needs to be able to recover from unexpected collisions without human help.','robot 需要能够在没有人类帮助的情况下从意外碰撞中恢复。',1,['robotics','basic']],
['camera','相机','image sensor','Hardware','perception','debugging','capture images','The camera feed drops to about five frames per second when the lighting is too dim.','当光线太暗时 camera 画面降到大约每秒五帧。',1,['hardware','basic']],
['motor','电机','actuator','Hardware','hardware','debugging','drive joints','The motor on joint three is drawing more current than normal which might mean the bearing is going.','三号关节的 motor 电流比正常大可能意味着 bearing 有问题。',1,['hardware','basic']],
['joint','关节','connection point','Hardware','hardware','system design','move robot','Each joint has a hard limit that must never be exceeded in the URDF or the real robot.','每个 joint 都有一个 hard limit 在 URDF 和真实机器人上都绝不能超过。',1,['hardware','basic']],
['map','地图','environment model','Navigation','navigation','system design','represent space','The map needs to be updated every time the furniture layout changes in the test area.','每次测试区的家具布局改变时都需要更新 map。',1,['navigation','basic']],
['path','路径','route','Navigation','planning','debugging','plan movement','The planner generates a path but the controller cannot follow it because of an obstacle near the goal.','planner 生成了一条 path 但 controller 无法跟随因为目标附近有一个 obstacle。',1,['navigation','basic']],
['data','数据','information','Research and Evaluation','evaluation','benchmark analysis','analyse results','We collected over ten hours of data from the real robot to compare with the simulation results.','我们从真实机器人上收集了超过十小时的 data 与仿真结果进行比较。',1,['research','basic']],
['signal','信号','electrical message','Hardware','hardware','debugging','transmit data','The signal from the encoder gets noisy when the robot runs at high speed near the welding station.','当机器人在焊接站附近高速运行时 encoder 的 signal 变得 noisy。',1,['hardware','basic']],
['model','模型','mathematical representation','Simulation','simulation','system design','simulate robot','The model of the robot in Gazebo does not match the real robot mass distribution.','Gazebo 中 robot 的 model 与真实机器人的质量分布不匹配。',1,['simulation','basic']],
['test','测试','experiment','Research and Evaluation','evaluation','benchmark analysis','verify performance','We ran the test five times and the robot succeeded in four out of five attempts.','我们运行了五次 test 机器人在五次尝试中成功了四次。',1,['research','basic']],
['debug','调试','find and fix','Engineering Collaboration and Debugging','system architecture','debugging','fix issues','It took two hours to debug the issue because the error message was not clear about which node failed.','花了两个小时 debug 这个问题因为错误消息没有清楚说明哪个 node 失败了。',2,['engineering','basic']],
['launch','启动','start','ROS2 Core','system architecture','system design','start system','The launch file starts all the nodes in the correct order with the right parameters.','launch 文件按正确顺序启动所有 node 并使用正确的 parameter。',1,['ros2','basic']],
['package','包','software module','ROS2 Core','system architecture','code review','organise code','We created a new package for the perception pipeline so it can be reused across different projects.','我们为 perception pipeline 创建了一个新的 package 以便在不同项目中重复使用。',1,['ros2','basic']],
['script','脚本','executable code','ROS2 Core','system architecture','code review','automate tasks','The bash script sets up all the environment variables before launching the simulation.','bash script 在启动仿真之前设置好所有环境变量。',1,['ros2','basic']],
['topic','话题','message channel','ROS2 Core','system architecture','debugging','pass data','You can check what is being published on a topic using the command line tool.','你可以使用命令行工具检查 topic 上正在发布的内容。',1,['ros2','basic']],
['message','消息','data packet','ROS2 Core','system architecture','debugging','send data','The message type for the odometry data includes both the pose and the velocity of the robot.','odometry 数据的 message type 包含机器人的 pose 和 velocity。',1,['ros2','basic']],
['parameter','参数','config value','ROS2 Core','system architecture','debugging','configure nodes','We changed the parameter for the maximum velocity from 0.5 to 0.8 and the robot navigated much faster.','我们把 maximum velocity 的 parameter 从 0.5 改到 0.8 机器人导航快了很多。',1,['ros2','basic']],
['log','日志','recorded message','ROS2 Core','system architecture','debugging','record events','The log shows that the planner node crashed exactly when the goal was set to an unreachable location.','log 显示 planner node 正好在 goal 被设为不可达位置时崩溃了。',1,['ros2','basic']],
['error','错误','mistake','Engineering Collaboration and Debugging','system architecture','debugging','identify failures','The error appeared after we updated the ROS2 distribution from Humble to Jazzy.','我们在把 ROS2 发行版从 Humble 升级到 Jazzy 后出现了 error。',1,['engineering','basic']],
['warning','警告','caution','Engineering Collaboration and Debugging','system architecture','debugging','monitor issues','The warning about the deprecated parameter appeared in every launch for the past two weeks.','关于 deprecated parameter 的 warning 在过去两周每次启动时都出现。',1,['engineering','basic']],
['delay','延迟','time lag','Kinematics and Control','control','debugging','measure latency','There is a noticeable delay between the joystick command and the robot movement.','joystick 指令和机器人运动之间有 noticeable delay。',1,['control','basic']],
['noise','噪声','unwanted signal','Hardware','perception','debugging','clean data','The noise in the LiDAR data increased after we mounted the sensor on a vibrating platform.','我们把 sensor 装在振动平台上之后 LiDAR 数据中的 noise 增加了。',1,['hardware','basic']],
['filter','滤波器','data cleaner','Hardware','perception','debugging','process signal','The filter removes high-frequency noise but adds about five milliseconds of latency to the signal.','filter 去除了高频 noise 但给 signal 增加了约五毫秒的 latency。',1,['hardware','basic']],
['planner','规划器','path finder','Navigation','planning','debugging','compute paths','The planner works well in open spaces but struggles in narrow corridors with tight turns.','planner 在开阔空间工作良好但在狭窄走廊和急转弯处有困难。',2,['navigation','basic']],
['controller','控制器','motion tracker','Navigation','control','debugging','follow path','The controller needs to be tuned again because the robot is overshooting at every waypoint.','controller 需要重新 tuning 因为机器人在每个 waypoint 都超调。',2,['control','basic']],
['real robot','真实机器人','actual hardware','Research and Evaluation','evaluation','benchmark analysis','test in reality','The simulation results were perfect but the real robot could not replicate the same performance.','仿真结果完美但 real robot 无法复现同样的表现。',2,['research','basic']],
['test run','测试运行','trial','Research and Evaluation','evaluation','benchmark analysis','evaluate performance','The first test run of the day is always the worst because the robot is still cold.','每天的第一个 test run 总是最差的因为机器人还没预热。',2,['research','basic']],
['metric','指标','measurement','Research and Evaluation','evaluation','benchmark analysis','track performance','The main metric we track is the success rate over one hundred navigation attempts.','我们追踪的主要 metric 是一百次导航尝试中的成功率。',2,['research','basic']],
['result','结果','outcome','Research and Evaluation','evaluation','benchmark analysis','report findings','The results show that the new planner outperforms the old one in every category.','result 显示新的 planner 在每个类别中都优于旧的。',1,['research','basic']],
['baseline','基线','comparison point','Research and Evaluation','evaluation','benchmark analysis','compare','We need a strong baseline before we can claim the new method is an improvement.','我们需要一个 strong baseline 才能声称新方法是一种改进。',2,['research','basic']],
];for(const t of terms)add(t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8],t[9],t[10]);
const updated=data.concat(newItems);
fs.writeFileSync(file,JSON.stringify(updated));
console.log('RD Extend: Added',added,'| Skipped:',skipped,'| Total:',updated.length);
