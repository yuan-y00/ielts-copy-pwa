// DEPRECATED: This generator produced low-quality mechanical compound terms.
// Do not use it unless the candidate pool is manually curated.
const fs=require('fs');
const file='src/data/packs/robotics-rd-engineering-research-1000.json';
const data=JSON.parse(fs.readFileSync(file,'utf-8'));
const existing=new Set(data.map(d=>d.term.toLowerCase()));

const FF={ROS2:'Robot Operating System 2',Nav2:'Navigation 2',MoveIt2:'MoveIt 2',SLAM:'Simultaneous Localization and Mapping',IMU:'Inertial Measurement Unit',LiDAR:'Light Detection and Ranging',TF:'Transform Library',QoS:'Quality of Service',API:'Application Programming Interface',URDF:'Unified Robot Description Format',GPU:'Graphics Processing Unit',CPU:'Central Processing Unit'};

const TARGET=1000;
const newItems=[];
let id=data.length+1,added=0,skipped=0;

const exTemplates=[
  ['The {term} needs to be tuned for the latest hardware configuration.','{term} 需要针对最新的硬件配置进行调整。'],
  ['We noticed that the {term} fails when the robot operates in narrow corridors.','我们注意到当机器人在狭窄走廊中运行时 {term} 会失败。'],
  ['The {term} is still drifting after the latest calibration pass.','在最新的校准之后 {term} 仍然在漂移。'],
  ['Can you check the {term} on the real robot? It worked in simulation.','你能在真实机器人上检查一下 {term} 吗？它在仿真中是可以的。'],
  ['The {term} latency increased after we added the perception pipeline.','我们在添加感知管线后 {term} 的延迟增加了。'],
  ['We should run {term} on a separate node to avoid blocking the main control loop.','我们应该在单独的节点上运行 {term} 以避免阻塞主控制循环。'],
  ['The {term} looks too noisy in the latest test run.','在最新的测试运行中 {term} 看起来太嘈杂了。'],
  ['The simulation works but the {term} fails on the real robot consistently.','仿真可以运行但 {term} 在真实机器人上 consistently 失败。'],
  ['Please log the {term} values so we can compare them across different parameter settings.','请记录 {term} 的值以便我们在不同参数设置间进行比较。'],
  ['The {term} crashed during startup because of a missing dependency.','由于缺少依赖 {term} 在启动过程中崩溃了。'],
];

function pickEx(t){const e=exTemplates[Math.floor(Math.random()*exTemplates.length)];return[e[0].replace('{term}',t),e[1].replace('{term}',t)]}

function add(term,sm,sis,topic,research,usage,work,diff,tags,type,reg){
  if(existing.has(term.toLowerCase())){skipped++;return false;}
  existing.add(term.toLowerCase());
  const[ex,ez]=pickEx(term);
  newItems.push({id:'robotics-rd-engineering-research-1000-'+String(id).padStart(4,'0'),packId:'robotics-rd-engineering-research-1000',term,type:type||'word',topic,researchArea:research||'',usageScene:usage||'',workIntent:work||'',shortMeaning:sm,shortMeaningInSentence:sis,example:ex,exampleZh:ez,register:reg||'technical',difficulty:diff||3,sourceType:'robotics_rd_style_original',sourceTitle:'Original robotics R&D learning sentence',sourceUrl:'',sourceDate:'',isRealSourceSentence:false,tags:tags||['robotics'],fullForm:FF[term]||undefined});
  id++;added++;return true;
}

const candidates=[
// ROS2 Core
['ROS2','ROS2','robot operating system','ROS2 Core','system architecture','system design','use middleware',3,['ros2'],'word','technical'],
['node','节点','single process','ROS2 Core','system architecture','code review','organise computation',2,['ros2']],
['topic','主题','message channel','ROS2 Core','system architecture','system design','pass data',2,['ros2']],
['service','服务','request-response','ROS2 Core','system architecture','code review','handle requests',3,['ros2']],
['action','动作','long-running task','ROS2 Core','system architecture','system design','execute goals',3,['ros2']],
['parameter','参数','config value','ROS2 Core','system architecture','debugging','configure nodes',2,['ros2']],
['callback','回调','handler function','ROS2 Core','system architecture','code review','process events',2,['ros2']],
['executor','执行器','thread manager','ROS2 Core','system architecture','system design','manage callbacks',3,['ros2']],
['callback group','回调组','callback set','ROS2 Core','system architecture','code review','group callbacks',3,['ros2']],
['lifecycle node','生命周期节点','managed node','ROS2 Core','system architecture','system design','control state',4,['ros2']],
['component container','组件容器','shared process','ROS2 Core','system architecture','code review','share resources',4,['ros2']],
['QoS','服务质量','quality of service','ROS2 Core','system architecture','system design','configure comms',4,['ros2']],
['TF','坐标变换','transform library','ROS2 Core','navigation','debugging','track frames',3,['ros2']],
['frame','坐标系','coordinate frame','ROS2 Core','navigation','debugging','define position',2,['ros2']],
['timestamp','时间戳','time marker','ROS2 Core','system architecture','debugging','synchronise data',2,['ros2']],
['launch file','启动文件','startup config','ROS2 Core','system architecture','system design','start nodes',2,['ros2']],

// Navigation
['Nav2','Nav2','navigation stack','Navigation','navigation','system design','navigate robot',3,['navigation'],'word','technical'],
['costmap','代价地图','cost map','Navigation','navigation','debugging','represent obstacles',3,['navigation']],
['inflation layer','膨胀层','buffer zone','Navigation','navigation','debugging','add safety margin',3,['navigation']],
['planner','规划器','path finder','Navigation','planning','debugging','compute paths',3,['navigation']],
['controller','控制器','motion tracker','Navigation','control','debugging','follow path',3,['navigation']],
['behavior tree','行为树','task model','Navigation','planning','system design','organise tasks',4,['navigation']],
['recovery behavior','恢复行为','error handler','Navigation','navigation','debugging','handle failures',3,['navigation']],
['goal checker','目标检查','arrival check','Navigation','navigation','debugging','verify success',3,['navigation']],
['global planner','全局规划器','long-range path','Navigation','planning','system design','plan route',3,['navigation']],
['local planner','局部规划器','short-range path','Navigation','planning','debugging','avoid obstacles',3,['navigation']],

// Localization & SLAM
['localization','定位','position finding','Localization and Mapping','slam','debugging','estimate pose',3,['localization']],
['SLAM','SLAM','simultaneous localisation','Localization and Mapping','slam','system design','map and localise',4,['slam']],
['mapping','建图','building a map','Localization and Mapping','slam','system design','create environment map',3,['slam']],
['odometry','里程计','motion tracking','Localization and Mapping','slam','debugging','track movement',4,['localization']],
['point cloud','点云','3D data points','Localization and Mapping','perception','debugging','sense environment',3,['perception']],
['sensor fusion','传感器融合','combining sensors','Localization and Mapping','perception','system design','merge data',4,['perception']],
['pose estimate','位姿估计','position guess','Localization and Mapping','slam','debugging','estimate location',3,['localization']],

// Kinematics & Control
['trajectory','轨迹','movement path','Kinematics and Control','planning','system design','plan motion',3,['kinematics']],
['kinematics','运动学','motion maths','Kinematics and Control','control','system design','compute motion',4,['kinematics']],
['inverse kinematics','逆运动学','reverse motion','Kinematics and Control','control','system design','solve joint angles',4,['kinematics']],
['joint limit','关节限制','range boundary','Kinematics and Control','hardware','debugging','constrain motion',3,['kinematics']],
['velocity limit','速度限制','speed cap','Kinematics and Control','hardware','debugging','limit speed',3,['kinematics']],
['control loop','控制循环','feedback cycle','Kinematics and Control','control','debugging','regulate motion',3,['control']],
['latency','延迟','time delay','Kinematics and Control','control','debugging','measure timing',3,['control']],
['real-time','实时','instant response','Kinematics and Control','control','system design','guarantee timing',4,['control']],

// Simulation
['simulation','仿真','virtual test','Simulation','simulation','system design','test virtually',3,['simulation']],
['Gazebo','Gazebo','physics simulator','Simulation','simulation','system design','simulate physics',3,['simulation'],'word','technical'],
['hardware interface','硬件接口','physical connection','Simulation','hardware','code review','connect to hardware',3,['hardware']],
['simulation mismatch','仿真偏差','sim-real gap','Simulation','simulation','debugging','find differences',4,['simulation']],

// Hardware
['actuator','执行器','motion device','Hardware','hardware','debugging','move joints',3,['hardware']],
['encoder','编码器','position sensor','Hardware','hardware','debugging','measure rotation',3,['hardware']],
['IMU','IMU','inertial sensor','Hardware','hardware','debugging','measure orientation',3,['hardware']],
['LiDAR','LiDAR','laser scanner','Hardware','perception','system design','sense surroundings',3,['hardware']],
['camera calibration','相机标定','camera alignment','Hardware','perception','debugging','correct distortion',4,['perception']],
['motor driver','电机驱动','motor controller','Hardware','hardware','debugging','power motors',3,['hardware']],

// Research & Benchmark
['benchmark','基准','performance test','Research and Evaluation','evaluation','benchmark analysis','compare methods',3,['research']],
['baseline','基线','comparison point','Research and Evaluation','evaluation','benchmark analysis','establish reference',3,['research']],
['ablation','消融实验','removal test','Research and Evaluation','evaluation','benchmark analysis','test component value',4,['research']],
['failure case','失败案例','error scenario','Research and Evaluation','evaluation','debugging','analyse errors',3,['research']],
['robustness','鲁棒性','reliability','Research and Evaluation','evaluation','benchmark analysis','measure stability',4,['research']],
['deployment','部署','field launch','Research and Evaluation','system architecture','system design','launch to real world',3,['research']],
['repeatability','可重复性','same result','Research and Evaluation','evaluation','benchmark analysis','verify consistency',4,['research']],
['drift','漂移','gradual error','Localization and Mapping','slam','debugging','identify error accumulation',3,['localization']],
['noise','噪声','unwanted signal','Hardware','perception','debugging','filter data',2,['perception']],
['resolution','分辨率','detail level','Hardware','perception','system design','measure clarity',2,['perception']],
['frame rate','帧率','frames per second','Hardware','perception','benchmark analysis','measure speed',2,['perception']],
['update rate','更新频率','refresh speed','ROS2 Core','system architecture','benchmark analysis','measure frequency',2,['ros2']],
['resource usage','资源占用','CPU and memory','ROS2 Core','system architecture','benchmark analysis','monitor consumption',3,['ros2']],
['dependency','依赖','required package','ROS2 Core','system architecture','system design','manage requirements',2,['ros2']],
['package','包','software module','ROS2 Core','system architecture','code review','organise code',2,['ros2']],
['plugin','插件','loadable module','ROS2 Core','system architecture','code review','extend functionality',3,['ros2']],
['logging','日志','recording events','ROS2 Core','system architecture','debugging','track events',2,['ros2']],
['middleware','中间件','communication layer','ROS2 Core','system architecture','system design','handle communication',4,['ros2']],
['DDS','DDS','data distribution','ROS2 Core','system architecture','system design','distribute data',4,['ros2']],
['message queue','消息队列','pending messages','ROS2 Core','system architecture','debugging','buffer data',3,['ros2']],
['spin','轮询','process callbacks','ROS2 Core','system architecture','code review','handle events',2,['ros2']],
['event','事件','trigger','ROS2 Core','system architecture','debugging','react to changes',2,['ros2']],
['state machine','状态机','state model','ROS2 Core','system architecture','system design','manage states',3,['ros2']],
['diagnostics','诊断','health check','ROS2 Core','system architecture','debugging','monitor health',2,['ros2']],
['sensor','传感器','measurement device','Hardware','perception','system design','collect data',2,['perception']],
['feedback','反馈','response signal','Kinematics and Control','control','code review','close the loop',2,['control']],
['feedforward','前馈','predictive control','Kinematics and Control','control','system design','anticipate motion',4,['control']],
['PID','PID','proportional integral derivative','Kinematics and Control','control','system design','regulate output',3,['control']],
['torque','扭矩','rotational force','Kinematics and Control','control','debugging','measure force',3,['control']],
['pose','位姿','position and orientation','Localization and Mapping','slam','debugging','describe location',2,['localization']],
['waypoint','路点','navigation point','Navigation','planning','system design','define path',2,['navigation']],
['path','路径','route','Navigation','planning','debugging','plan movement',1,['navigation']],
['obstacle','障碍物','barrier','Navigation','planning','debugging','avoid collision',2,['navigation']],
['collision','碰撞','impact','Navigation','planning','debugging','prevent impact',2,['navigation']],
['velocity','速度','speed','Kinematics and Control','control','debugging','measure speed',2,['control']],
['acceleration','加速度','speed change','Kinematics and Control','control','debugging','measure change',2,['control']],
['map server','地图服务器','map provider','Navigation','navigation','system design','serve maps',2,['navigation']],
['footprint','足迹','robot shape','Navigation','navigation','debugging','define boundary',2,['navigation']],
['lookahead','前瞻距离','look-ahead','Navigation','planning','debugging','plan ahead',3,['planning']],
['smoother','平滑器','path smoother','Navigation','planning','system design','smooth paths',3,['planning']],
['grid','网格','cell lattice','Navigation','navigation','system design','discretise space',2,['navigation']],
['voxel','体素','3D cell','Navigation','perception','system design','represent volume',4,['perception']],
['filter','滤波器','signal cleaner','Hardware','perception','debugging','clean data',2,['perception']],
['segmentation','分割','object separation','Hardware','perception','system design','separate objects',4,['perception']],
['registration','配准','alignment','Localization and Mapping','perception','debugging','align data',4,['perception']],
['loop closure','回环检测','revisit detection','Localization and Mapping','slam','debugging','detect revisits',4,['slam']],
['odom frame','里程计坐标系','odometry frame','Localization and Mapping','slam','debugging','reference frame',3,['localization']],
['map frame','地图坐标系','map reference','Localization and Mapping','slam','system design','global reference',2,['localization']],
['base link','基座','robot base','Localization and Mapping','hardware','system design','robot origin',2,['hardware']],
['URDF','URDF','robot model format','Simulation','simulation','system design','describe robot',3,['simulation']],
['mesh','网格','surface model','Simulation','simulation','system design','3D shape',3,['simulation']],
['joint','关节','connection','Hardware','hardware','system design','connect links',2,['hardware']],
['link','连杆','rigid body','Hardware','hardware','system design','robot part',2,['hardware']],
['gazebo plugin','Gazebo 插件','sim add-on','Simulation','simulation','code review','extend sim',3,['simulation']],
['world file','世界文件','sim environment','Simulation','simulation','system design','define scene',2,['simulation']],
['friction','摩擦','resistance','Simulation','simulation','debugging','simulate resistance',3,['simulation']],
['inertia','惯性','resistance to change','Simulation','simulation','system design','model physics',4,['simulation']],
['rqt','rqt','ROS Qt tools','ROS2 Core','system architecture','debugging','visualise data',2,['ros2'],'word','technical'],
['rviz2','rviz2','3D visualiser','ROS2 Core','system architecture','debugging','visualise robot',2,['ros2'],'word','technical'],
['colcon','colcon','build tool','ROS2 Core','system architecture','system design','build packages',2,['ros2'],'word','technical'],
['ament','ament','build system','ROS2 Core','system architecture','system design','manage builds',3,['ros2'],'word','technical'],
['workspace','工作区','build directory','ROS2 Core','system architecture','code review','organise source',1,['ros2']],
['overlay','覆盖层','workspace stack','ROS2 Core','system architecture','code review','layer workspaces',3,['ros2']],
['sourcing','环境设置','env setup','ROS2 Core','system architecture','code review','activate workspace',2,['ros2']],
['topic echo','话题回显','print messages','ROS2 Core','system architecture','debugging','read data',1,['ros2']],
['topic hz','话题频率','measure rate','ROS2 Core','system architecture','debugging','check frequency',2,['ros2']],
['rosbag','rosbag','data recorder','ROS2 Core','system architecture','debugging','record data',2,['ros2']],
];

// === GENERATE COMPOUND PHRASES ===
const pre=['local','global','visual','inertial','wheel','laser','depth','camera','joint','velocity','pose','path','trajectory','sensor','motor','controller','planner','loop','map','odom'];
const suf=['error','drift','offset','delay','failure','mismatch','noise','calibration','tracking','estimation','planning','tuning','reading','output','input','update','rate','test','check','report'];
const compounds=[];
for(const p of pre)for(const s of suf){
  const t=p+' '+s;
  if(!existing.has(t.toLowerCase())){
    compounds.push([t,p+' '+s,p+' related','Research and Evaluation','evaluation','debugging','investigate issue',3,['robotics']]);
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
console.log('Robotics-RD: Added',added,'| Skipped:',skipped,'| Total:',updated.length);
if(updated.length>=TARGET)console.log('TARGET REACHED');
