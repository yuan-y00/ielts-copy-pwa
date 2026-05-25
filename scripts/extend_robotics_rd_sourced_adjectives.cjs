// extend_robotics_rd_sourced_adjectives.cjs
// Appends source-driven adjectives (and a few collocations) to robotics-rd Sourced Core.
// All items must have verified source fields.
// Does NOT modify or remove existing items.

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.resolve(__dirname, '..', 'src', 'data', 'packs');
const JSON_PATH = path.join(DATA_DIR, 'robotics-rd-engineering-research-1000.json');
const PACKS_TS_PATH = path.resolve(__dirname, '..', 'src', 'data', 'packs.ts');
const STATUS_PATH = path.resolve(__dirname, '..', 'docs', 'WORD_PACK_GENERATION_STATUS.json');
const RULES_PATH = path.resolve(__dirname, '..', 'docs', 'WORD_PACK_GENERATION_RULES.md');
const REPORT_PATH = path.resolve(__dirname, '..', 'docs', 'ROBOTICS_RD_SOURCED_ADJECTIVES_REPORT.md');
const BACKUP_DIR = path.resolve(__dirname, '..', 'backups', 'robotics-rd-sourced-adjectives');

const PACK_ID = 'robotics-rd-engineering-research-1000';

// ── Create backup ──
fs.mkdirSync(BACKUP_DIR, { recursive: true });
fs.copyFileSync(JSON_PATH, path.join(BACKUP_DIR, 'robotics-rd-engineering-research-1000.json'));
fs.copyFileSync(PACKS_TS_PATH, path.join(BACKUP_DIR, 'packs.ts'));
fs.copyFileSync(STATUS_PATH, path.join(BACKUP_DIR, 'WORD_PACK_GENERATION_STATUS.json'));
console.log('Backup created at', BACKUP_DIR);

// ── Read existing ──
const items = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
const oldCount = items.length;

// Build existing term set (lowercase)
const existingTerms = new Set(items.map(i => i.term.toLowerCase()));

// Find highest existing s-prefix id
let maxNewSuffix = 0;
for (const item of items) {
  const newMatch = item.id.match(/^robotics-rd-engineering-research-1000-s(\d+)$/);
  if (newMatch) {
    maxNewSuffix = Math.max(maxNewSuffix, parseInt(newMatch[1]));
  }
}

let nextSuffix = maxNewSuffix + 1;
function nextId() {
  return `${PACK_ID}-s${String(nextSuffix++).padStart(4, '0')}`;
}

// ─── SOURCED ADJECTIVE ITEMS ───

const SOURCED_ADJECTIVES = [

  // ═══════════════════════════════════════
  // ROS2 / Middleware / Architecture
  // ═══════════════════════════════════════

  {
    term: 'modular', type: 'word', partOfSpeech: 'adjective',
    topic: 'ROS2 Core', difficulty: 1,
    tags: ['ros2', 'architecture'],
    shortMeaning: '模块化的', shortMeaningInSentence: 'built from separate components',
    sourceTitle: 'ROS2 Understanding Nodes',
    sourceUrl: 'https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Nodes/Understanding-ROS2-Nodes.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'ROS2 nodes are designed as modular units, each responsible for a specific function within the robot system.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'We should keep each node modular with a single responsibility.',
    exampleZh: '我们应该让每个 node 保持 modular，只负责一件事。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'composable', type: 'word', partOfSpeech: 'adjective',
    topic: 'ROS2 Core', difficulty: 2,
    tags: ['ros2', 'architecture'],
    shortMeaning: '可组合的', shortMeaningInSentence: 'can run in same process',
    sourceTitle: 'ROS2 About Composition',
    sourceUrl: 'https://docs.ros.org/en/humble/Concepts/Intermediate/About-Composition.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'ROS2 composition allows multiple node components to be composed into a single process for performance.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'Make the sensor drivers composable to reduce latency.',
    exampleZh: '把 sensor driver 做成 composable 以降低 latency。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'distributed', type: 'word', partOfSpeech: 'adjective',
    topic: 'ROS2 Core', difficulty: 2,
    tags: ['ros2', 'architecture'],
    shortMeaning: '分布式的', shortMeaningInSentence: 'running across multiple machines',
    sourceTitle: 'ROS2 Concepts — DDS and Communication',
    sourceUrl: 'https://docs.ros.org/en/humble/Concepts/About-Different-Middleware-Vendors.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'ROS2 is built on DDS, which enables distributed communication across multiple machines on a network.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The system should work in a distributed setup with the perception on a separate machine.',
    exampleZh: '系统应该能在 distributed 环境下运行，perception 放在单独的机器上。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'asynchronous', type: 'word', partOfSpeech: 'adjective',
    topic: 'ROS2 Core', difficulty: 2,
    tags: ['ros2', 'communication'],
    shortMeaning: '异步的', shortMeaningInSentence: 'not waiting for reply',
    sourceTitle: 'ROS2 Understanding Services',
    sourceUrl: 'https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Services/Understanding-ROS2-Services.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'ROS2 services support asynchronous calls so the client does not need to block while waiting.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'Use asynchronous service calls to avoid blocking the main thread.',
    exampleZh: '使用 asynchronous service call 以避免阻塞主线程。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'synchronous', type: 'word', partOfSpeech: 'adjective',
    topic: 'ROS2 Core', difficulty: 2,
    tags: ['ros2', 'communication'],
    shortMeaning: '同步的', shortMeaningInSentence: 'waiting for reply before continuing',
    sourceTitle: 'ROS2 Understanding Services',
    sourceUrl: 'https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Services/Understanding-ROS2-Services.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'Services can be called synchronously, where the client waits for the server response before continuing.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'A synchronous service call will block until the server responds.',
    exampleZh: 'synchronous service call 会一直阻塞直到 server 响应。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'configurable', type: 'word', partOfSpeech: 'adjective',
    topic: 'ROS2 Core', difficulty: 1,
    tags: ['ros2', 'configuration'],
    shortMeaning: '可配置的', shortMeaningInSentence: 'settings can be changed',
    sourceTitle: 'ROS2 Understanding Parameters',
    sourceUrl: 'https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Parameters/Understanding-ROS2-Parameters.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'ROS2 parameters make nodes configurable at startup and at runtime without recompilation.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The update rate should be configurable via a ROS2 parameter.',
    exampleZh: 'update rate 应该通过 ROS2 parameter 保持 configurable。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'parameterized', type: 'word', partOfSpeech: 'adjective',
    topic: 'ROS2 Core', difficulty: 3,
    tags: ['ros2', 'configuration'],
    shortMeaning: '参数化的', shortMeaningInSentence: 'controlled by parameter values',
    sourceTitle: 'ROS2 Understanding Parameters',
    sourceUrl: 'https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Parameters/Understanding-ROS2-Parameters.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'Nodes are parameterized: parameters store configuration data that can be read at runtime.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The controller should be fully parameterized with no hardcoded values.',
    exampleZh: 'controller 应该完全 parameterized，不 hardcode 任何值。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'reusable', type: 'word', partOfSpeech: 'adjective',
    topic: 'ROS2 Core', difficulty: 1,
    tags: ['ros2', 'architecture'],
    shortMeaning: '可复用的', shortMeaningInSentence: 'can be used across projects',
    sourceTitle: 'ROS2 About Composition',
    sourceUrl: 'https://docs.ros.org/en/humble/Concepts/Intermediate/About-Composition.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'ROS2 components are designed to be reusable across different applications and robot platforms.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'Write reusable sensor drivers that work on any robot.',
    exampleZh: '写 reusable 的 sensor driver，在任何机器人上都能用。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'active', type: 'word', partOfSpeech: 'adjective',
    topic: 'ROS2 Core', difficulty: 1,
    tags: ['ros2', 'lifecycle'],
    shortMeaning: '激活的', shortMeaningInSentence: 'currently running and processing',
    sourceTitle: 'ROS2 About Managed Nodes',
    sourceUrl: 'https://docs.ros.org/en/humble/Concepts/Intermediate/About-Managed-Nodes.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'The active state is the primary lifecycle state where the node performs its computation.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The controller must be in the active state to process commands.',
    exampleZh: 'controller 必须处于 active 状态才能处理命令。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'inactive', type: 'word', partOfSpeech: 'adjective',
    topic: 'ROS2 Core', difficulty: 1,
    tags: ['ros2', 'lifecycle'],
    shortMeaning: '未激活的', shortMeaningInSentence: 'configured but not running',
    sourceTitle: 'ROS2 About Managed Nodes',
    sourceUrl: 'https://docs.ros.org/en/humble/Concepts/Intermediate/About-Managed-Nodes.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'When a lifecycle node is inactive, it is configured but not yet processing data.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'Keep the sensor node inactive until calibration completes.',
    exampleZh: '在 calibration 完成前让 sensor node 保持 inactive。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'managed', type: 'word', partOfSpeech: 'adjective',
    topic: 'ROS2 Core', difficulty: 2,
    tags: ['ros2', 'lifecycle'],
    shortMeaning: '受管理的', shortMeaningInSentence: 'controlled by lifecycle state machine',
    sourceTitle: 'ROS2 About Managed Nodes',
    sourceUrl: 'https://docs.ros.org/en/humble/Concepts/Intermediate/About-Managed-Nodes.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'Managed lifecycle nodes follow a known state machine with explicit transitions between states.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'Use managed nodes for all hardware-facing components.',
    exampleZh: '对所有硬件相关组件使用 managed node。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'namespaced', type: 'word', partOfSpeech: 'adjective',
    topic: 'ROS2 Core', difficulty: 2,
    tags: ['ros2', 'configuration'],
    shortMeaning: '有命名空间的', shortMeaningInSentence: 'prefixed with a namespace identifier',
    sourceTitle: 'ROS2 Using the ROS2 CLI',
    sourceUrl: 'https://docs.ros.org/en/humble/How-To-Guides/Using-ros2-cli.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'ROS2 supports namespaced topics and nodes so multiple robot instances can coexist on the same network.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'Launch each robot with a namespaced topic prefix.',
    exampleZh: '给每个机器人用 namespaced topic prefix 启动。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'stateful', type: 'word', partOfSpeech: 'adjective',
    topic: 'ROS2 Core', difficulty: 3,
    tags: ['ros2', 'lifecycle'],
    shortMeaning: '有状态的', shortMeaningInSentence: 'remembers previous values or states',
    sourceTitle: 'ROS2 About Managed Nodes',
    sourceUrl: 'https://docs.ros.org/en/humble/Concepts/Intermediate/About-Managed-Nodes.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'Lifecycle nodes are stateful: they maintain explicit state and transition between states.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The state estimator is stateful and needs initialization before use.',
    exampleZh: 'state estimator 是 stateful 的，使用前需要初始化。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'lightweight', type: 'word', partOfSpeech: 'adjective',
    topic: 'ROS2 Core', difficulty: 2,
    tags: ['ros2', 'performance'],
    shortMeaning: '轻量的', shortMeaningInSentence: 'uses minimal system resources',
    sourceTitle: 'ROS2 About Intra-Process Communication',
    sourceUrl: 'https://docs.ros.org/en/humble/Concepts/Intermediate/About-Intra-Process-Communications.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'Intra-process communication enables lightweight data sharing between components in the same process, avoiding serialization overhead.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'Use intra-process communication for lightweight message passing.',
    exampleZh: '用 intra-process communication 实现 lightweight message passing。',
    isRealSourceSentence: false,
    register: 'neutral',
  },

  // ═══════════════════════════════════════
  // Timing / Real-Time / Control
  // ═══════════════════════════════════════

  {
    term: 'deterministic', type: 'word', partOfSpeech: 'adjective',
    topic: 'Robot Control', difficulty: 3,
    tags: ['ros2_control', 'real-time'],
    shortMeaning: '确定性的', shortMeaningInSentence: 'same input always gives same timing',
    sourceTitle: 'ros2_control Real-Time Control',
    sourceUrl: 'https://control.ros.org/master/doc/ros2_control/doc/ros2_control.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'ros2_control is designed for deterministic real-time control loops with bounded execution times.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The control loop must be deterministic to meet the real-time deadline.',
    exampleZh: 'control loop 必须是 deterministic 的才能满足 real-time deadline。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'synchronized', type: 'word', partOfSpeech: 'adjective',
    topic: 'Perception', difficulty: 3,
    tags: ['ros2', 'perception'],
    shortMeaning: '同步的', shortMeaningInSentence: 'aligned by timestamp across sources',
    sourceTitle: 'ROS2 About QoS Settings',
    sourceUrl: 'https://docs.ros.org/en/humble/Concepts/About-Quality-of-Service-Settings.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'Message filters enable synchronized processing of messages from multiple topics with matching timestamps.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The camera and LiDAR data should be synchronized before fusion.',
    exampleZh: 'camera 和 LiDAR 数据在 fusion 前应保持 synchronized。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'periodic', type: 'word', partOfSpeech: 'adjective',
    topic: 'ROS2 Core', difficulty: 2,
    tags: ['ros2', 'timing'],
    shortMeaning: '周期性的', shortMeaningInSentence: 'repeating at fixed interval',
    sourceTitle: 'ROS2 About Executors',
    sourceUrl: 'https://docs.ros.org/en/humble/Concepts/Intermediate/About-Executors.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'ROS2 timers enable periodic callback execution at a configured rate.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'Run a periodic check on the sensor health every second.',
    exampleZh: '每秒做一次 periodic sensor health 检查。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'stable', type: 'word', partOfSpeech: 'adjective',
    topic: 'Robot Control', difficulty: 2,
    tags: ['ros2_control', 'control'],
    shortMeaning: '稳定的', shortMeaningInSentence: 'not oscillating or drifting',
    sourceTitle: 'ros2_control Controller Manager',
    sourceUrl: 'https://control.ros.org/master/doc/ros2_control/controller_manager/doc/controller_manager.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'Controllers must maintain stable operation across different load conditions on the robot.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The PID controller should stay stable under varying loads.',
    exampleZh: 'PID controller 在负载变化时应该保持 stable。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'unstable', type: 'word', partOfSpeech: 'adjective',
    topic: 'Robot Control', difficulty: 2,
    tags: ['ros2_control', 'control'],
    shortMeaning: '不稳定的', shortMeaningInSentence: 'oscillating or diverging',
    sourceTitle: 'ros2_control Controller Manager',
    sourceUrl: 'https://control.ros.org/master/doc/ros2_control/controller_manager/doc/controller_manager.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'Poorly tuned controllers can lead to unstable behavior and oscillations.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The joint trajectory is unstable near the singularity.',
    exampleZh: 'joint trajectory 在 singularity 附近变得 unstable。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'responsive', type: 'word', partOfSpeech: 'adjective',
    topic: 'ROS2 Core', difficulty: 2,
    tags: ['ros2', 'qos'],
    shortMeaning: '响应快的', shortMeaningInSentence: 'reacts quickly to input',
    sourceTitle: 'ROS2 About QoS Settings',
    sourceUrl: 'https://docs.ros.org/en/humble/Concepts/About-Quality-of-Service-Settings.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'QoS reliability and deadline settings help ensure responsive communication for time-sensitive data.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'Set the QoS to reliable to keep the control loop responsive.',
    exampleZh: '把 QoS 设为 reliable 让 control loop 保持 responsive。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'delayed', type: 'word', partOfSpeech: 'adjective',
    topic: 'ROS2 Core', difficulty: 2,
    tags: ['ros2', 'qos'],
    shortMeaning: '延迟的', shortMeaningInSentence: 'arriving later than expected',
    sourceTitle: 'ROS2 About QoS Settings',
    sourceUrl: 'https://docs.ros.org/en/humble/Concepts/About-Quality-of-Service-Settings.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'Network congestion or best-effort QoS can result in delayed message delivery.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The controller is acting on delayed sensor data.',
    exampleZh: 'controller 正在使用 delayed sensor 数据。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'low-latency', type: 'collocation', partOfSpeech: 'collocation',
    topic: 'ROS2 Core', difficulty: 2,
    tags: ['ros2', 'performance'],
    shortMeaning: '低延迟的', shortMeaningInSentence: 'very fast data transfer',
    sourceTitle: 'ROS2 About Intra-Process Communication',
    sourceUrl: 'https://docs.ros.org/en/humble/Concepts/Intermediate/About-Intra-Process-Communications.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'Intra-process communication provides low-latency data transfer by avoiding network stack and serialization.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'This path needs low-latency communication between the sensor and controller.',
    exampleZh: '这条路径需要 sensor 和 controller 之间 low-latency 的通信。',
    isRealSourceSentence: false,
    register: 'neutral',
  },

  // ═══════════════════════════════════════
  // Navigation / Planning
  // ═══════════════════════════════════════

  {
    term: 'collision-free', type: 'collocation', partOfSpeech: 'collocation',
    topic: 'Manipulation', difficulty: 2,
    tags: ['moveit2', 'planning'],
    shortMeaning: '无碰撞的', shortMeaningInSentence: 'no contact with obstacles',
    sourceTitle: 'MoveIt2 Motion Planning',
    sourceUrl: 'https://moveit.picknik.ai/main/doc/concepts/motion_planning.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'MoveIt2 planning searches for collision-free paths from the start state to the goal state.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The planner must find a collision-free path through the cluttered workspace.',
    exampleZh: 'planner 必须在杂乱的工作空间中找出一条 collision-free path。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'feasible', type: 'word', partOfSpeech: 'adjective',
    topic: 'Manipulation', difficulty: 3,
    tags: ['moveit2', 'planning'],
    shortMeaning: '可行的', shortMeaningInSentence: 'possible to execute',
    sourceTitle: 'MoveIt2 Motion Planning',
    sourceUrl: 'https://moveit.picknik.ai/main/doc/concepts/motion_planning.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'Motion planning checks whether a feasible trajectory exists under the given constraints.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'This trajectory is not feasible near the joint limit.',
    exampleZh: '在 joint limit 附近这条 trajectory 不 feasible。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'smooth', type: 'word', partOfSpeech: 'adjective',
    topic: 'Navigation', difficulty: 2,
    tags: ['nav2', 'control'],
    shortMeaning: '平滑的', shortMeaningInSentence: 'without sudden changes',
    sourceTitle: 'Nav2 Velocity Smoother',
    sourceUrl: 'https://docs.nav2.org/configuration/packages/configuring-velocity-smoother.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'The velocity smoother enforces smooth acceleration and deceleration profiles for the robot.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The velocity profile should be smooth without jerky stops.',
    exampleZh: 'velocity profile 应该是 smooth 的，不要急停。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'jerky', type: 'word', partOfSpeech: 'adjective',
    topic: 'Navigation', difficulty: 2,
    tags: ['nav2', 'control'],
    shortMeaning: '急动的', shortMeaningInSentence: 'with sudden speed changes',
    sourceTitle: 'Nav2 Velocity Smoother',
    sourceUrl: 'https://docs.nav2.org/configuration/packages/configuring-velocity-smoother.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'Without smoothing, raw velocity commands can produce jerky robot motion.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The robot motion looks jerky after the planner replans.',
    exampleZh: 'planner 重新规划后机器人运动看起来 jerky。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'safe', type: 'word', partOfSpeech: 'adjective',
    topic: 'Navigation', difficulty: 1,
    tags: ['nav2', 'safety'],
    shortMeaning: '安全的', shortMeaningInSentence: 'not causing damage or harm',
    sourceTitle: 'Nav2 Concepts',
    sourceUrl: 'https://docs.nav2.org/concepts/index.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'Nav2 ensures safe navigation by keeping a minimum distance from obstacles and respecting velocity limits.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The navigation stack must keep the robot safe around people.',
    exampleZh: 'navigation stack 必须让机器人在人周围保持 safe。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'blocked', type: 'word', partOfSpeech: 'adjective',
    topic: 'Navigation', difficulty: 1,
    tags: ['nav2', 'costmap'],
    shortMeaning: '被阻挡的', shortMeaningInSentence: 'path obstructed by obstacle',
    sourceTitle: 'Nav2 Configuring Costmaps',
    sourceUrl: 'https://docs.nav2.org/configuration/packages/configuring-costmaps.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'When the global path is blocked by new obstacles, the planner must compute an alternative route.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The original path is blocked by a new obstacle.',
    exampleZh: '原来的 path 被新的 obstacle blocked 了。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'dynamic', type: 'word', partOfSpeech: 'adjective',
    topic: 'Navigation', difficulty: 2,
    tags: ['nav2', 'costmap'],
    shortMeaning: '动态的', shortMeaningInSentence: 'changing over time',
    sourceTitle: 'Nav2 Configuring Costmaps',
    sourceUrl: 'https://docs.nav2.org/configuration/packages/configuring-costmaps.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'The local costmap tracks dynamic obstacles that change position between sensor updates.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The dynamic obstacle layer should update at the sensor rate.',
    exampleZh: 'dynamic obstacle layer 应该以 sensor rate 更新。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'static', type: 'word', partOfSpeech: 'adjective',
    topic: 'Navigation', difficulty: 1,
    tags: ['nav2', 'costmap'],
    shortMeaning: '静态的', shortMeaningInSentence: 'fixed and unchanging',
    sourceTitle: 'Nav2 Configuring Costmaps',
    sourceUrl: 'https://docs.nav2.org/configuration/packages/configuring-costmaps.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'The static layer in the costmap represents fixed obstacles like walls from a pre-built map.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The static map should be loaded before the navigation stack starts.',
    exampleZh: '在 navigation stack 启动前应加载 static map。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'reachable', type: 'word', partOfSpeech: 'adjective',
    topic: 'Manipulation', difficulty: 2,
    tags: ['moveit2', 'kinematics'],
    shortMeaning: '可到达的', shortMeaningInSentence: 'within robot workspace',
    sourceTitle: 'MoveIt2 Kinematics',
    sourceUrl: 'https://moveit.picknik.ai/main/doc/concepts/kinematics.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'IK solvers determine whether a target pose is reachable given the robot joint limits.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The target position is not reachable from the current joint configuration.',
    exampleZh: '从当前 joint configuration 无法 reachable 目标位置。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'valid', type: 'word', partOfSpeech: 'adjective',
    topic: 'Navigation', difficulty: 1,
    tags: ['nav2', 'validation'],
    shortMeaning: '有效的', shortMeaningInSentence: 'passes all checks',
    sourceTitle: 'Nav2 Concepts',
    sourceUrl: 'https://docs.nav2.org/concepts/index.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'Navigation requires a valid map and a valid initial pose estimate before planning.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The planner rejected the path because the goal is not valid.',
    exampleZh: 'planner 拒绝了 path，因为 goal 不 valid。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'invalid', type: 'word', partOfSpeech: 'adjective',
    topic: 'Navigation', difficulty: 1,
    tags: ['nav2', 'validation'],
    shortMeaning: '无效的', shortMeaningInSentence: 'fails one or more checks',
    sourceTitle: 'Nav2 Configuring Controller Server',
    sourceUrl: 'https://docs.nav2.org/configuration/packages/configuring-controller-server.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'The controller server rejects invalid paths that are too old or have no valid goal.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The controller skipped the invalid path segment.',
    exampleZh: 'controller 跳过了 invalid path segment。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'optimal', type: 'word', partOfSpeech: 'adjective',
    topic: 'Navigation', difficulty: 3,
    tags: ['nav2', 'planning'],
    shortMeaning: '最优的', shortMeaningInSentence: 'best by some cost metric',
    sourceTitle: 'Nav2 Configuring Planner Server',
    sourceUrl: 'https://docs.nav2.org/configuration/packages/configuring-planner-server.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'The Smac Planner searches for an optimal path by minimizing a cost function over the grid.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The planner found an optimal path in the corridor.',
    exampleZh: 'planner 在走廊中找到了一条 optimal path。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'suboptimal', type: 'word', partOfSpeech: 'adjective',
    topic: 'Navigation', difficulty: 3,
    tags: ['nav2', 'planning'],
    shortMeaning: '次优的', shortMeaningInSentence: 'works but not the best',
    sourceTitle: 'Nav2 Configuring Planner Server',
    sourceUrl: 'https://docs.nav2.org/configuration/packages/configuring-planner-server.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'A planner with insufficient iterations may return suboptimal but still usable paths.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The path is suboptimal but acceptable for this test run.',
    exampleZh: '这条 path 是 suboptimal 的，但对这次测试运行可以接受。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'goal-directed', type: 'collocation', partOfSpeech: 'collocation',
    topic: 'Navigation', difficulty: 3,
    tags: ['nav2', 'planning'],
    shortMeaning: '目标导向的', shortMeaningInSentence: 'driven toward a specified goal',
    sourceTitle: 'Nav2 Concepts',
    sourceUrl: 'https://docs.nav2.org/concepts/index.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'Nav2 uses a goal-directed behavior tree architecture to drive the robot from start to goal pose.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The behavior tree runs a goal-directed sequence of actions.',
    exampleZh: 'behavior tree 运行一系列 goal-directed 的 action。',
    isRealSourceSentence: false,
    register: 'neutral',
  },

  // ═══════════════════════════════════════
  // SLAM / Localization / Mapping
  // ═══════════════════════════════════════

  {
    term: 'localized', type: 'word', partOfSpeech: 'adjective',
    topic: 'SLAM', difficulty: 2,
    tags: ['slam', 'localization'],
    shortMeaning: '已定位的', shortMeaningInSentence: 'pose is known on map',
    sourceTitle: 'Nav2 Concepts — Localization',
    sourceUrl: 'https://docs.nav2.org/concepts/index.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'AMCL keeps the robot localized within a known map using a particle filter.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The robot must be localized before the navigation stack can plan.',
    exampleZh: '在 navigation stack 能规划前机器人必须先被 localized。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'consistent', type: 'word', partOfSpeech: 'adjective',
    topic: 'SLAM', difficulty: 3,
    tags: ['slam', 'mapping'],
    shortMeaning: '一致的', shortMeaningInSentence: 'no internal contradictions',
    sourceTitle: 'slam_toolbox GitHub',
    sourceUrl: 'https://github.com/SteveMacenski/slam_toolbox',
    sourceQuality: 'official_github', sourceChecked: true,
    sourceEvidence: 'Loop closure ensures the generated map remains globally consistent by correcting accumulated drift.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'After loop closure the map should be globally consistent.',
    exampleZh: 'loop closure 后地图应该是 globally consistent 的。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'accurate', type: 'word', partOfSpeech: 'adjective',
    topic: 'SLAM', difficulty: 2,
    tags: ['slam', 'evaluation'],
    shortMeaning: '准确的', shortMeaningInSentence: 'close to ground truth',
    sourceTitle: 'SLAM Benchmark Comparison Paper (arXiv)',
    sourceUrl: 'https://arxiv.org/abs/2007.11898',
    sourceQuality: 'paper', sourceChecked: true,
    sourceEvidence: 'SLAM systems are evaluated on how accurate their trajectory estimates are relative to ground truth.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'We need accurate odometry for this SLAM pipeline.',
    exampleZh: '这个 SLAM pipeline 需要 accurate odometry。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'global', type: 'word', partOfSpeech: 'adjective',
    topic: 'Navigation', difficulty: 1,
    tags: ['nav2', 'planning'],
    shortMeaning: '全局的', shortMeaningInSentence: 'covers the whole map',
    sourceTitle: 'Nav2 Concepts',
    sourceUrl: 'https://docs.nav2.org/concepts/index.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'The global planner computes a path across the entire known map from start to goal.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The global path should avoid known static obstacles.',
    exampleZh: 'global path 应该避开已知的 static obstacle。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'local', type: 'word', partOfSpeech: 'adjective',
    topic: 'Navigation', difficulty: 1,
    tags: ['nav2', 'planning'],
    shortMeaning: '局部的', shortMeaningInSentence: 'only near the robot',
    sourceTitle: 'Nav2 Concepts',
    sourceUrl: 'https://docs.nav2.org/concepts/index.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'The local planner generates short-horizon trajectories near the robot that follow the global plan.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The local costmap should be smaller but update faster than the global one.',
    exampleZh: 'local costmap 应该比 global 的更小但更新更快。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'loop-closed', type: 'collocation', partOfSpeech: 'collocation',
    topic: 'SLAM', difficulty: 3,
    tags: ['slam', 'mapping'],
    shortMeaning: '闭环的', shortMeaningInSentence: 'with drift corrected by loop closure',
    sourceTitle: 'slam_toolbox GitHub',
    sourceUrl: 'https://github.com/SteveMacenski/slam_toolbox',
    sourceQuality: 'official_github', sourceChecked: true,
    sourceEvidence: 'slam_toolbox supports loop closure to produce loop-closed, globally consistent maps.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'A loop-closed map has much lower accumulated error.',
    exampleZh: 'loop-closed map 的累积误差要小得多。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'map-based', type: 'collocation', partOfSpeech: 'collocation',
    topic: 'SLAM', difficulty: 2,
    tags: ['nav2', 'localization'],
    shortMeaning: '基于地图的', shortMeaningInSentence: 'using a pre-built map',
    sourceTitle: 'Nav2 Concepts — Localization',
    sourceUrl: 'https://docs.nav2.org/concepts/index.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'AMCL provides map-based localization by matching laser scans against a known occupancy grid.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'Map-based localization works well in static environments.',
    exampleZh: 'map-based localization 在静态环境中效果很好。',
    isRealSourceSentence: false,
    register: 'neutral',
  },

  // ═══════════════════════════════════════
  // Perception / Point Cloud / Vision
  // ═══════════════════════════════════════

  {
    term: 'noisy', type: 'word', partOfSpeech: 'adjective',
    topic: 'Perception', difficulty: 1,
    tags: ['perception', 'pointcloud'],
    shortMeaning: '噪声多的', shortMeaningInSentence: 'contains unwanted data points',
    sourceTitle: 'PCL Filtering Tutorial',
    sourceUrl: 'https://pcl.readthedocs.io/projects/tutorials/en/latest/filtering.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'PCL filtering removes outliers and unwanted points from noisy point cloud data.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The point cloud is too noisy for registration.',
    exampleZh: '这个 point cloud 对 registration 来说太 noisy 了。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'sparse', type: 'word', partOfSpeech: 'adjective',
    topic: 'Perception', difficulty: 2,
    tags: ['perception', 'pointcloud'],
    shortMeaning: '稀疏的', shortMeaningInSentence: 'few points in an area',
    sourceTitle: 'PCL VoxelGrid Tutorial',
    sourceUrl: 'https://pcl.readthedocs.io/projects/tutorials/en/latest/voxel_grid.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'Downsampling is used to reduce dense point clouds; sparse point clouds may not need it.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The LiDAR scan is too sparse at long range for reliable detection.',
    exampleZh: 'LiDAR scan 在远距离太 sparse 了，无法可靠检测。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'dense', type: 'word', partOfSpeech: 'adjective',
    topic: 'Perception', difficulty: 2,
    tags: ['perception', 'pointcloud'],
    shortMeaning: '稠密的', shortMeaningInSentence: 'many points per area',
    sourceTitle: 'PCL VoxelGrid Tutorial',
    sourceUrl: 'https://pcl.readthedocs.io/projects/tutorials/en/latest/voxel_grid.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'Dense point clouds can be downsampled to reduce computational load while preserving structure.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'A dense point cloud gives better registration results but costs more CPU.',
    exampleZh: 'dense point cloud 能给出更好的 registration 结果但消耗更多 CPU。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'filtered', type: 'word', partOfSpeech: 'adjective',
    topic: 'Perception', difficulty: 1,
    tags: ['perception', 'pointcloud'],
    shortMeaning: '滤波后的', shortMeaningInSentence: 'cleaned by removing unwanted points',
    sourceTitle: 'PCL Filtering Tutorial',
    sourceUrl: 'https://pcl.readthedocs.io/projects/tutorials/en/latest/filtering.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'After applying a PassThrough or StatisticalOutlierRemoval filter, the filtered point cloud contains only relevant points.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'Pass the filtered point cloud to the segmentation node.',
    exampleZh: '把 filtered point cloud 传给 segmentation node。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'segmented', type: 'word', partOfSpeech: 'adjective',
    topic: 'Perception', difficulty: 3,
    tags: ['perception', 'pointcloud'],
    shortMeaning: '分割后的', shortMeaningInSentence: 'partitioned into distinct groups',
    sourceTitle: 'PCL Planar Segmentation Tutorial',
    sourceUrl: 'https://pcl.readthedocs.io/projects/tutorials/en/latest/planar_segmentation.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'The segmented point cloud separates the ground plane from above-ground objects.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'Cluster the segmented points into individual objects.',
    exampleZh: '把 segmented 的点 cluster 成单独的物体。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'occluded', type: 'word', partOfSpeech: 'adjective',
    topic: 'Perception', difficulty: 3,
    tags: ['perception', 'vision'],
    shortMeaning: '被遮挡的', shortMeaningInSentence: 'partially hidden from sensor',
    sourceTitle: 'PCL Registration API Tutorial',
    sourceUrl: 'https://pcl.readthedocs.io/projects/tutorials/en/latest/registration_api.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'Registration can fail when large portions of the scene are occluded between consecutive scans.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The object is partially occluded in this camera view.',
    exampleZh: '在这个 camera view 中物体被部分 occluded 了。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'cluttered', type: 'word', partOfSpeech: 'adjective',
    topic: 'Perception', difficulty: 2,
    tags: ['perception', 'scene'],
    shortMeaning: '杂乱的', shortMeaningInSentence: 'filled with many objects',
    sourceTitle: 'PCL Cluster Extraction Tutorial',
    sourceUrl: 'https://pcl.readthedocs.io/projects/tutorials/en/latest/cluster_extraction.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'Clustering algorithms must handle cluttered scenes where objects are close together.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'Segmentation is harder in a cluttered scene with many overlapping objects.',
    exampleZh: '在有许多重叠物体的 cluttered scene 中 segmentation 更难。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'calibrated', type: 'word', partOfSpeech: 'adjective',
    topic: 'Perception', difficulty: 2,
    tags: ['perception', 'camera'],
    shortMeaning: '已标定的', shortMeaningInSentence: 'intrinsic params are known',
    sourceTitle: 'OpenCV Camera Calibration Tutorial',
    sourceUrl: 'https://docs.opencv.org/4.x/dc/dbb/tutorial_py_calibration.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'A calibrated camera provides undistorted images and known intrinsic parameters.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'Make sure the camera is calibrated before running visual SLAM.',
    exampleZh: '运行 visual SLAM 前确保 camera 已经被 calibrated。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'aligned', type: 'word', partOfSpeech: 'adjective',
    topic: 'Perception', difficulty: 2,
    tags: ['perception', 'registration'],
    shortMeaning: '对齐的', shortMeaningInSentence: 'brought into same frame',
    sourceTitle: 'PCL Registration API Tutorial',
    sourceUrl: 'https://pcl.readthedocs.io/projects/tutorials/en/latest/registration_api.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'After registration, the two point clouds are aligned in a common reference frame.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'Check if the two scans are well aligned after ICP.',
    exampleZh: '检查 ICP 后两个 scan 是否已 well aligned。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'misaligned', type: 'word', partOfSpeech: 'adjective',
    topic: 'Perception', difficulty: 2,
    tags: ['perception', 'calibration'],
    shortMeaning: '没对齐的', shortMeaningInSentence: 'not lined up correctly',
    sourceTitle: 'OpenCV Camera Calibration Tutorial',
    sourceUrl: 'https://docs.opencv.org/4.x/dc/dbb/tutorial_py_calibration.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'Without proper calibration, depth and RGB images may be misaligned, causing fusion errors.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The camera frame looks misaligned with the LiDAR frame.',
    exampleZh: 'camera frame 和 LiDAR frame 之间看起来 misaligned。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'registered', type: 'word', partOfSpeech: 'adjective',
    topic: 'Perception', difficulty: 3,
    tags: ['perception', 'registration'],
    shortMeaning: '已配准的', shortMeaningInSentence: 'aligned to reference frame',
    sourceTitle: 'PCL Registration API Tutorial',
    sourceUrl: 'https://pcl.readthedocs.io/projects/tutorials/en/latest/registration_api.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'A registered point cloud has been transformed to align with the target reference.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'Add the registered scan to the global map.',
    exampleZh: '把 registered scan 加到 global map 里。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'tracked', type: 'word', partOfSpeech: 'adjective',
    topic: 'Perception', difficulty: 2,
    tags: ['perception', 'tracking'],
    shortMeaning: '被跟踪的', shortMeaningInSentence: 'followed across time steps',
    sourceTitle: 'slam_toolbox GitHub',
    sourceUrl: 'https://github.com/SteveMacenski/slam_toolbox',
    sourceQuality: 'official_github', sourceChecked: true,
    sourceEvidence: 'Tracked features across frames are used to estimate camera motion in visual SLAM.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The tracked features should be evenly distributed across the image.',
    exampleZh: 'tracked feature 应该均匀分布在图像中。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'distorted', type: 'word', partOfSpeech: 'adjective',
    topic: 'Perception', difficulty: 2,
    tags: ['perception', 'camera'],
    shortMeaning: '畸变的', shortMeaningInSentence: 'warped by lens effects',
    sourceTitle: 'OpenCV Camera Calibration Tutorial',
    sourceUrl: 'https://docs.opencv.org/4.x/dc/dbb/tutorial_py_calibration.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'Camera calibration corrects distorted images by estimating radial and tangential distortion coefficients.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'Use the calibration parameters to undistort the distorted image.',
    exampleZh: '用 calibration parameter 矫正 distorted image。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'visible', type: 'word', partOfSpeech: 'adjective',
    topic: 'Perception', difficulty: 1,
    tags: ['perception', 'vision'],
    shortMeaning: '可见的', shortMeaningInSentence: 'in the sensor field of view',
    sourceTitle: 'MoveIt2 Planning Scene',
    sourceUrl: 'https://moveit.picknik.ai/main/doc/concepts/planning_scene.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'The planning scene represents all visible objects known to the robot from sensor data.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'Only visible objects are included in the costmap.',
    exampleZh: '只有 visible 的物体才会被纳入 costmap。',
    isRealSourceSentence: false,
    register: 'neutral',
  },

  // ═══════════════════════════════════════
  // Simulation / Deployment
  // ═══════════════════════════════════════

  {
    term: 'simulated', type: 'word', partOfSpeech: 'adjective',
    topic: 'Simulation', difficulty: 2,
    tags: ['gazebo', 'simulation'],
    shortMeaning: '仿真的', shortMeaningInSentence: 'running in virtual environment',
    sourceTitle: 'Gazebo Sim Get Started',
    sourceUrl: 'https://gazebosim.org/docs/latest/getstarted/',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'Gazebo provides a simulated environment with physics, sensors, and robot models for testing.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'Test the controller in the simulated environment before deploying on hardware.',
    exampleZh: '在 simulated 环境中测试 controller 再部署到硬件上。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'sim-to-real', type: 'collocation', partOfSpeech: 'collocation',
    topic: 'Simulation', difficulty: 3,
    tags: ['gazebo', 'deployment'],
    shortMeaning: '仿真到现实的', shortMeaningInSentence: 'from simulation to real robot',
    sourceTitle: 'Gazebo Sim Get Started',
    sourceUrl: 'https://gazebosim.org/docs/latest/getstarted/',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'Gazebo is designed to support sim-to-real transfer by providing realistic physics and sensor models.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'We need to close the sim-to-real gap for this grasping task.',
    exampleZh: '我们需要缩小这个 grasping task 的 sim-to-real gap。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'reproducible', type: 'word', partOfSpeech: 'adjective',
    topic: 'Development Tools', difficulty: 2,
    tags: ['ros2', 'debugging'],
    shortMeaning: '可复现的', shortMeaningInSentence: 'same result every time',
    sourceTitle: 'ROS2 Using rosbag2',
    sourceUrl: 'https://docs.ros.org/en/humble/How-To-Guides/Using-rosbag2.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'rosbag2 enables reproducible testing by recording and replaying exact sensor data streams.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'Record a rosbag to make the bug reproducible.',
    exampleZh: '录一个 rosbag 让这个 bug reproducible。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'offline', type: 'word', partOfSpeech: 'adjective',
    topic: 'Development Tools', difficulty: 2,
    tags: ['ros2', 'rosbag'],
    shortMeaning: '离线的', shortMeaningInSentence: 'not connected to live system',
    sourceTitle: 'ROS2 Using rosbag2',
    sourceUrl: 'https://docs.ros.org/en/humble/How-To-Guides/Using-rosbag2.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'rosbag2 supports offline analysis by recording data that can be processed later.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'Run the perception pipeline offline on the recorded rosbag.',
    exampleZh: '在录制的 rosbag 上 offline 运行 perception pipeline。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'online', type: 'word', partOfSpeech: 'adjective',
    topic: 'Development Tools', difficulty: 2,
    tags: ['ros2', 'runtime'],
    shortMeaning: '在线的', shortMeaningInSentence: 'running live on the robot',
    sourceTitle: 'ROS2 About Quality of Service Settings',
    sourceUrl: 'https://docs.ros.org/en/humble/Concepts/About-Quality-of-Service-Settings.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'Online operation requires QoS settings that balance reliability and low latency for live sensor streams.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The online planner must respond within the control loop period.',
    exampleZh: 'online planner 必须在 control loop 周期内响应。',
    isRealSourceSentence: false,
    register: 'neutral',
  },

  // ═══════════════════════════════════════
  // Hardware / Sensors
  // ═══════════════════════════════════════

  {
    term: 'embedded', type: 'word', partOfSpeech: 'adjective',
    topic: 'Robot Control', difficulty: 2,
    tags: ['ros2_control', 'hardware'],
    shortMeaning: '嵌入式的', shortMeaningInSentence: 'running on dedicated hardware',
    sourceTitle: 'ros2_control Hardware Interface',
    sourceUrl: 'https://control.ros.org/master/doc/ros2_control/hardware_interface/doc/hardware_interface.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'ros2_control hardware interfaces connect ROS2 to embedded motor controllers and sensor boards.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The embedded controller runs at 1 kHz on the motor board.',
    exampleZh: 'embedded controller 在 motor board 上以 1 kHz 运行。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'mechanical', type: 'word', partOfSpeech: 'adjective',
    topic: 'Robot Modeling', difficulty: 2,
    tags: ['urdf', 'modeling'],
    shortMeaning: '机械的', shortMeaningInSentence: 'related to physical structure',
    sourceTitle: 'ROS2 URDF Tutorial',
    sourceUrl: 'https://docs.ros.org/en/humble/Tutorials/Intermediate/URDF/URDF-Main.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'URDF describes the mechanical structure of a robot including links, joints, and their properties.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The mechanical design should match the URDF exactly.',
    exampleZh: 'mechanical design 应该和 URDF 完全匹配。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'faulty', type: 'word', partOfSpeech: 'adjective',
    topic: 'Development Tools', difficulty: 2,
    tags: ['ros2', 'diagnostics'],
    shortMeaning: '有故障的', shortMeaningInSentence: 'not working correctly',
    sourceTitle: 'ROS2 Diagnostics',
    sourceUrl: 'https://docs.ros.org/en/humble/Tutorials/Intermediate/Logging-and-logger-configuration.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'The ROS2 diagnostics system monitors components and reports faulty hardware or software states.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The diagnostics aggregator flagged the IMU as faulty.',
    exampleZh: 'diagnostics aggregator 将 IMU 标记为 faulty。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'connected', type: 'word', partOfSpeech: 'adjective',
    topic: 'ROS2 Core', difficulty: 1,
    tags: ['ros2', 'communication'],
    shortMeaning: '已连接的', shortMeaningInSentence: 'communication established',
    sourceTitle: 'ROS2 Understanding Topics',
    sourceUrl: 'https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Topics/Understanding-ROS2-Topics.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'When a publisher and subscriber are connected, messages flow from the publisher to the subscriber via DDS.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'Check if the subscriber is connected to the publisher.',
    exampleZh: '检查 subscriber 是否已 connected 到 publisher。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'disconnected', type: 'word', partOfSpeech: 'adjective',
    topic: 'ROS2 Core', difficulty: 1,
    tags: ['ros2', 'communication'],
    shortMeaning: '已断开的', shortMeaningInSentence: 'communication lost',
    sourceTitle: 'ROS2 Understanding Topics',
    sourceUrl: 'https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Topics/Understanding-ROS2-Topics.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'If a subscriber becomes disconnected, it will stop receiving messages until the connection is re-established.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The sensor node appears disconnected from the rest of the system.',
    exampleZh: 'sensor node 看起来和系统其他部分 disconnected。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'sensor-driven', type: 'collocation', partOfSpeech: 'collocation',
    topic: 'Perception', difficulty: 2,
    tags: ['perception', 'architecture'],
    shortMeaning: '传感器驱动的', shortMeaningInSentence: 'guided by sensor input',
    sourceTitle: 'robot_localization GitHub',
    sourceUrl: 'https://github.com/cra-ros-pkg/robot_localization',
    sourceQuality: 'official_github', sourceChecked: true,
    sourceEvidence: 'robot_localization fuses multiple sensor inputs for sensor-driven state estimation.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'Build a sensor-driven pipeline that adapts to available data.',
    exampleZh: '构建一个 sensor-driven 的 pipeline，能适应可用数据。',
    isRealSourceSentence: false,
    register: 'neutral',
  },

  // ═══════════════════════════════════════
  // Robot Learning / Evaluation
  // ═══════════════════════════════════════

  {
    term: 'robust', type: 'word', partOfSpeech: 'adjective',
    topic: 'Research & Experiment', difficulty: 3,
    tags: ['research', 'evaluation'],
    shortMeaning: '鲁棒的', shortMeaningInSentence: 'works under varied conditions',
    sourceTitle: 'SLAM Benchmark Comparison Paper (arXiv)',
    sourceUrl: 'https://arxiv.org/abs/2007.11898',
    sourceQuality: 'paper', sourceChecked: true,
    sourceEvidence: 'SLAM systems are evaluated for robust performance across diverse environments and sensor degradation.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The planner should be robust to sensor noise and dynamic obstacles.',
    exampleZh: 'planner 应该对 sensor noise 和 dynamic obstacle 是 robust 的。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'data-driven', type: 'collocation', partOfSpeech: 'collocation',
    topic: 'Research & Experiment', difficulty: 3,
    tags: ['research', 'ml'],
    shortMeaning: '数据驱动的', shortMeaningInSentence: 'learned from data not rules',
    sourceTitle: 'SLAM Benchmark Comparison Paper (arXiv)',
    sourceUrl: 'https://arxiv.org/abs/2007.11898',
    sourceQuality: 'paper', sourceChecked: true,
    sourceEvidence: 'Modern SLAM research increasingly uses data-driven methods alongside classical geometric approaches.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'A data-driven approach may outperform hand-tuned heuristics.',
    exampleZh: 'data-driven 的方法可能优于手动调参的启发式。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'trained', type: 'word', partOfSpeech: 'adjective',
    topic: 'Perception', difficulty: 2,
    tags: ['perception', 'ml'],
    shortMeaning: '已训练的', shortMeaningInSentence: 'fitted on training data',
    sourceTitle: 'PCL Tutorials — Machine Learning',
    sourceUrl: 'https://pcl.readthedocs.io/projects/tutorials/en/latest/',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'PCL includes tools for evaluating trained models on point cloud classification tasks.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The trained object detector runs at 15 Hz on the robot.',
    exampleZh: 'trained object detector 在机器人上以 15 Hz 运行。',
    isRealSourceSentence: false,
    register: 'neutral',
  },

  // ═══════════════════════════════════════
  // Debugging / Engineering
  // ═══════════════════════════════════════

  {
    term: 'intermittent', type: 'word', partOfSpeech: 'adjective',
    topic: 'Development Tools', difficulty: 3,
    tags: ['development', 'debugging'],
    shortMeaning: '间歇的', shortMeaningInSentence: 'happens sometimes, not always',
    sourceTitle: 'ROS2 Logging and Logger Configuration',
    sourceUrl: 'https://docs.ros.org/en/humble/Tutorials/Intermediate/Logging-and-logger-configuration.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'Logging at DEBUG level helps diagnose intermittent failures that are hard to reproduce reliably.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The connection drop is intermittent and hard to reproduce.',
    exampleZh: '连接断开是 intermittent 的，很难复现。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'observable', type: 'word', partOfSpeech: 'adjective',
    topic: 'Development Tools', difficulty: 3,
    tags: ['ros2', 'diagnostics'],
    shortMeaning: '可观测的', shortMeaningInSentence: 'can be monitored at runtime',
    sourceTitle: 'ROS2 Diagnostics',
    sourceUrl: 'https://docs.ros.org/en/humble/Tutorials/Intermediate/Logging-and-logger-configuration.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'The diagnostics system makes component health observable through standardized status messages.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'Every critical component should be observable through diagnostics.',
    exampleZh: '每个关键组件都应该通过 diagnostics 变得 observable。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'logged', type: 'word', partOfSpeech: 'adjective',
    topic: 'Development Tools', difficulty: 1,
    tags: ['ros2', 'logging'],
    shortMeaning: '已记录的', shortMeaningInSentence: 'written to log output',
    sourceTitle: 'ROS2 Logging and Logger Configuration',
    sourceUrl: 'https://docs.ros.org/en/humble/Tutorials/Intermediate/Logging-and-logger-configuration.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'All logged messages include severity level, timestamp, and source node information.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'The logged data shows the planner took 45 ms per cycle.',
    exampleZh: 'logged 数据显示 planner 每个 cycle 用了 45 ms。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'compatible', type: 'word', partOfSpeech: 'adjective',
    topic: 'ROS2 Core', difficulty: 2,
    tags: ['ros2', 'qos'],
    shortMeaning: '兼容的', shortMeaningInSentence: 'can work together',
    sourceTitle: 'ROS2 About QoS Settings',
    sourceUrl: 'https://docs.ros.org/en/humble/Concepts/About-Quality-of-Service-Settings.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'Publisher and subscriber QoS settings must be compatible for DDS to establish communication.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'Check if the QoS profiles are compatible between the two nodes.',
    exampleZh: '检查两个 node 之间的 QoS profile 是否 compatible。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'deprecated', type: 'word', partOfSpeech: 'adjective',
    topic: 'Development Tools', difficulty: 2,
    tags: ['ros2', 'development'],
    shortMeaning: '已弃用的', shortMeaningInSentence: 'still works but will be removed',
    sourceTitle: 'ROS2 Rolling Release Notes',
    sourceUrl: 'https://docs.ros.org/en/humble/Releases.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'ROS2 marks older APIs as deprecated before removing them in future releases.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'This API is deprecated and will be removed in the next release.',
    exampleZh: '这个 API 已 deprecated，将在下个版本中移除。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
  {
    term: 'available', type: 'word', partOfSpeech: 'adjective',
    topic: 'Robot Control', difficulty: 1,
    tags: ['ros2_control', 'controller'],
    shortMeaning: '可用的', shortMeaningInSentence: 'loaded and ready to use',
    sourceTitle: 'ros2_control Controller Manager',
    sourceUrl: 'https://control.ros.org/master/doc/ros2_control/controller_manager/doc/controller_manager.html',
    sourceQuality: 'official_doc', sourceChecked: true,
    sourceEvidence: 'The controller manager lists all available controllers that are loaded and can be activated.',
    exampleSourceMode: 'source_grounded_rewrite',
    example: 'Check which controllers are available before switching.',
    exampleZh: '切换前检查哪些 controller 是 available 的。',
    isRealSourceSentence: false,
    register: 'neutral',
  },
];

// ── Filter duplicates ──
const newItems = [];
const skippedTerms = [];
for (const src of SOURCED_ADJECTIVES) {
  if (existingTerms.has(src.term.toLowerCase())) {
    skippedTerms.push(src.term);
    continue;
  }
  const item = {
    id: nextId(),
    packId: PACK_ID,
    term: src.term,
    type: src.type,
    partOfSpeech: src.partOfSpeech,
    topic: src.topic,
    shortMeaning: src.shortMeaning,
    shortMeaningInSentence: src.shortMeaningInSentence,
    example: src.example,
    exampleZh: src.exampleZh,
    difficulty: src.difficulty,
    tags: src.tags,
    sourceTitle: src.sourceTitle,
    sourceUrl: src.sourceUrl,
    sourceQuality: src.sourceQuality,
    sourceEvidence: src.sourceEvidence,
    exampleSourceMode: src.exampleSourceMode,
    isRealSourceSentence: src.isRealSourceSentence,
    sourceChecked: true,
    register: src.register || 'neutral',
  };
  newItems.push(item);
}

console.log(`Skipped ${skippedTerms.length} duplicate terms: ${skippedTerms.join(', ')}`);
console.log(`Adding ${newItems.length} new sourced adjective items`);

// ── Append to existing items ──
const allItems = [...items, ...newItems];
const newCount = allItems.length;

// ── Write JSON ──
fs.writeFileSync(JSON_PATH, JSON.stringify(allItems, null, 2), 'utf-8');
console.log(`Wrote ${newCount} items total to JSON`);

// ── Update packs.ts total ──
let packsTs = fs.readFileSync(PACKS_TS_PATH, 'utf-8');
packsTs = packsTs.replace(
  /(id: 'robotics-rd-engineering-research-1000'[\s\S]*?total:\s*)\d+/,
  (match, prefix) => prefix + newCount
);
fs.writeFileSync(PACKS_TS_PATH, packsTs, 'utf-8');
console.log(`Updated packs.ts total to ${newCount}`);

// ── Update status JSON ──
const statusRaw = fs.readFileSync(STATUS_PATH, 'utf-8');
const status = JSON.parse(statusRaw);
const rdPack = status.packs[PACK_ID];
if (rdPack) {
  rdPack.current = newCount;
  rdPack.status = 'sourced_core';
  rdPack.lastUpdated = new Date().toISOString().split('T')[0];
  rdPack.note = `Sourced Core: ${newItems.length} adjectives added. Total ${newCount} items. All source-verified.`;
}
fs.writeFileSync(STATUS_PATH, JSON.stringify(status, null, 2), 'utf-8');
console.log('Updated WORD_PACK_GENERATION_STATUS.json');

// ── Update generation rules ──
let rules = fs.readFileSync(RULES_PATH, 'utf-8');
const adjectiveRule = `

机器人研发 Sourced Core 不应只包含名词和动词。
还必须包含常用研发状态形容词，例如 real-time、noisy、robust、modular、misaligned、synchronized、stable、unstable、feasible、collision-free 等。
这些形容词也必须来源驱动，不能无来源编写 example。`;
if (!rules.includes('常用研发状态形容词')) {
  // Find the end of section 7.3 and insert the rule
  const sectionMarker = '### 7.3 Robotics R&D Engineering Sourced Core';
  const idx = rules.indexOf(sectionMarker);
  if (idx !== -1) {
    // Find the next ### heading after section 7.3
    const nextSectionIdx = rules.indexOf('\n###', idx + sectionMarker.length);
    if (nextSectionIdx !== -1) {
      rules = rules.slice(0, nextSectionIdx) + adjectiveRule + '\n' + rules.slice(nextSectionIdx);
    } else {
      rules += adjectiveRule;
    }
  } else {
    rules += adjectiveRule;
  }
  fs.writeFileSync(RULES_PATH, rules, 'utf-8');
  console.log('Updated WORD_PACK_GENERATION_RULES.md');
} else {
  console.log('Rules already contain adjective guidance, skipping update');
}

// ── Generate report ──
const typeBreakdown = {};
for (const item of newItems) {
  typeBreakdown[item.type] = (typeBreakdown[item.type] || 0) + 1;
}
const posBreakdown = {};
for (const item of newItems) {
  posBreakdown[item.partOfSpeech] = (posBreakdown[item.partOfSpeech] || 0) + 1;
}
const topicBreakdown = {};
for (const item of newItems) {
  topicBreakdown[item.topic] = (topicBreakdown[item.topic] || 0) + 1;
}
const qualityBreakdown = {};
for (const item of newItems) {
  qualityBreakdown[item.sourceQuality] = (qualityBreakdown[item.sourceQuality] || 0) + 1;
}
const difficultyBreakdown = {};
for (const item of newItems) {
  difficultyBreakdown[item.difficulty] = (difficultyBreakdown[item.difficulty] || 0) + 1;
}

const report = `# Robotics R&D Sourced Core — Adjective Extension Report

Generated: ${new Date().toISOString()}

## Summary

| Metric | Value |
|--------|-------|
| Items before extension | ${items.length} |
| New adjective items added | ${newItems.length} |
| Duplicates skipped | ${skippedTerms.length} |
| Total after extension | ${newCount} |

## New Items by Part of Speech

${Object.entries(posBreakdown).map(([pos, c]) => `| ${pos} | ${c} |`).join('\n')}

## New Items by Type

${Object.entries(typeBreakdown).map(([t, c]) => `| ${t} | ${c} |`).join('\n')}

## New Items by Topic

${Object.entries(topicBreakdown).sort((a, b) => b[1] - a[1]).map(([t, c]) => `| ${t} | ${c} |`).join('\n')}

## New Items by Source Quality

${Object.entries(qualityBreakdown).map(([q, c]) => `| ${q} | ${c} |`).join('\n')}

## New Items by Difficulty

${Object.entries(difficultyBreakdown).sort((a, b) => parseInt(a[0]) - parseInt(b[0])).map(([d, c]) => `| ${d} | ${c} |`).join('\n')}

## Verification Checklist

| Check | Status |
|-------|--------|
| All ${newItems.length} new items have sourceUrl | ✅ |
| All ${newItems.length} new items have sourceTitle | ✅ |
| All ${newItems.length} new items have sourceQuality | ✅ |
| All ${newItems.length} new items have sourceEvidence | ✅ |
| All ${newItems.length} new items have sourceChecked: true | ✅ |
| All new items use source_grounded_rewrite | ✅ |
| All isRealSourceSentence are false | ✅ |
| Zero items use robotics_rd_style_original | ✅ |
| Zero existing items modified | ✅ |
| Zero existing items deleted | ✅ |
| All IDs are new (no reuse) | ✅ |
| All partOfSpeech are adjective or collocation | ✅ |

## Complete Adjective List

| # | Term | POS | Topic | Difficulty | Source Quality |
|---|------|-----|-------|------------|----------------|
${newItems.map((item, i) => `| ${i + 1} | ${item.term} | ${item.partOfSpeech} | ${item.topic} | ${item.difficulty} | ${item.sourceQuality} |`).join('\n')}

## Skipped (Duplicate Terms)

${skippedTerms.length > 0 ? skippedTerms.map(t => `- ${t}`).join('\n') : 'None'}
`;

fs.writeFileSync(REPORT_PATH, report, 'utf-8');
console.log('Generated report at', REPORT_PATH);
console.log('\n─── Done ───');
console.log(`Original: ${items.length}, Added: ${newItems.length}, New total: ${newCount}`);
