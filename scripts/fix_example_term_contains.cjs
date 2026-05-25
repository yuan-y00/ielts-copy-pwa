// fix_example_term_contains.cjs
// Ensures all robotics-rd items have example and exampleZh containing the term
const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '..', 'src', 'data', 'packs', 'robotics-rd-engineering-research-1000.json');
let items = JSON.parse(fs.readFileSync(file, 'utf-8'));

let fixes = 0;

// Specific fixes for known article mismatches
const fixes_map = {
  'subscribe to a topic': {
    ex: 'Subscribe to a topic like the local costmap to receive updates.',
    zh: 'subscribe to a topic 比如 local costmap 来接收更新。'
  },
  'cancel an action goal': {
    ex: 'Cancel an action goal if the robot detects a new obstacle.',
    zh: '如果检测到新 obstacle 就 cancel an action goal。'
  },
  'use a callback group': {
    ex: 'Use a callback group to handle concurrent sensor callbacks safely.',
    zh: 'use a callback group 来安全处理并发的 sensor callback。'
  },
  'remap a topic': {
    ex: 'Remap a topic in the launch file to match the sensor output name.',
    zh: '在 launch file 里 remap a topic 以匹配 sensor 输出的名字。'
  },
  'set a parameter': {
    ex: 'Set a parameter at runtime to change the controller gain dynamically.',
    zh: '在运行时 set a parameter 来动态修改 controller gain。'
  },
  'load the component': {
    ex: 'Load the component dynamically without restarting the process.',
    zh: '动态 load the component 无需重启进程。'
  },
  'compose the node': {
    ex: 'Compose the node with the camera driver to reduce latency.',
    zh: 'compose the node 与 camera driver 以降低 latency。'
  },
  'transform a point cloud': {
    ex: 'Transform a point cloud from the sensor frame to the map frame.',
    zh: 'transform a point cloud 从 sensor frame 到 map frame。'
  },
  'enable recovery behavior': {
    ex: 'Enable recovery behavior so the robot can escape when stuck.',
    zh: 'enable recovery behavior 让机器人卡住时能逃出来。'
  },
  'the behavior tree gets stuck.': {
    ex: 'The behavior tree gets stuck. It never proceeds past planning.',
    zh: 'The behavior tree gets stuck. 在 planning 后就不继续了。'
  },
  'the inverse kinematics solver fails.': {
    ex: 'The inverse kinematics solver fails. The target may be unreachable.',
    zh: 'The inverse kinematics solver fails. 目标可能不可达。'
  },
  'the pose target is not reachable.': {
    ex: 'The pose target is not reachable. It lies outside the workspace.',
    zh: 'The pose target is not reachable. 在 workspace 之外。'
  },
  'load the controller': {
    ex: 'Load the controller before switching to trajectory execution mode.',
    zh: 'load the controller 在切换到 trajectory execution 模式前。'
  },
  'register the point cloud': {
    ex: 'Register the point cloud to the reference map using ICP alignment.',
    zh: 'register the point cloud 用 ICP 对齐到 reference map。'
  },
  'the registration result is unstable.': {
    ex: 'The registration result is unstable. It varies across frames.',
    zh: 'The registration result is unstable. 逐帧变化很大。'
  },
  'the depth image is missing data.': {
    ex: 'The depth image is missing data. Reflective surfaces cause holes.',
    zh: 'The depth image is missing data. 反射面造成了空洞。'
  },
  'estimate the pose': {
    ex: 'Estimate the pose by fusing wheel odometry with IMU readings.',
    zh: '用 wheel odometry 和 IMU estimate the pose。'
  },
  'match the scan': {
    ex: 'Match the scan against the reference map for localization.',
    zh: 'match the scan 对照 reference map 来进行 localization。'
  },
  'load the world': {
    ex: 'Load the world file before spawning any robot models.',
    zh: '在 spawn robot model 前 load the world。'
  },
  'bridge the topic': {
    ex: 'Bridge the topic between Gazebo Transport and ROS2 middleware.',
    zh: 'bridge the topic 在 Gazebo Transport 和 ROS2 之间。'
  },
  'deploy to the real robot': {
    ex: 'Deploy to the real robot after all simulation tests pass.',
    zh: 'simulation 全部通过后 deploy to the real robot。'
  },
  'compare the baseline': {
    ex: 'Compare the baseline planner against the proposed method.',
    zh: 'compare the baseline planner 和提出的新方法。'
  },
  'validate the result': {
    ex: 'Validate the result by comparing with ground truth measurements.',
    zh: 'validate the result 通过与 ground truth 对比。'
  },
  'test on the real robot': {
    ex: 'Test on the real robot to confirm the simulation results.',
    zh: 'test on the real robot 来确认 simulation 的结果。'
  },
  'can you reproduce the issue?': {
    ex: 'Can you reproduce the issue with the latest commit on main?',
    zh: 'Can you reproduce the issue? 用 main 分支最新的 commit。'
  },
  'the latency is too high.': {
    ex: 'The latency is too high. The control loop misses its deadline.',
    zh: 'The latency is too high. control loop 错过了 deadline。'
  },
  'the baseline fails in this scene.': {
    ex: 'The baseline fails in this scene. The corridors are too narrow.',
    zh: 'The baseline fails in this scene. 走廊太窄了。'
  },
};

// Apply specific fixes
for (let i = 0; i < items.length; i++) {
  const item = items[i];
  const t = item.term.toLowerCase();
  if (fixes_map[t]) {
    item.example = fixes_map[t].ex;
    item.exampleZh = fixes_map[t].zh;
    fixes++;
  }
}

// Fix all sentence patterns: ensure term appears in exampleZh
for (let i = 0; i < items.length; i++) {
  const item = items[i];
  if (item.partOfSpeech === 'sentence_pattern') {
    const t = item.term.toLowerCase();
    const zhLower = (item.exampleZh || '').toLowerCase();
    if (!zhLower.includes(t)) {
      item.exampleZh = item.term + ' ' + item.exampleZh.trim();
      fixes++;
    }
  }
}

// Fix all remaining collocations: ensure term in both example and exampleZh
for (let i = 0; i < items.length; i++) {
  const item = items[i];
  const t = item.term.toLowerCase();
  const exLower = (item.example || '').toLowerCase();
  const zhLower = (item.exampleZh || '').toLowerCase();

  if ((t.includes(' ') || t.includes('-')) && !fixes_map[t]) {
    if (!exLower.includes(t) && item.partOfSpeech === 'collocation') {
      // Prepend term as standalone sentence
      if (!item.example.toLowerCase().startsWith(t)) {
        item.example = item.term.charAt(0).toUpperCase() + item.term.slice(1) + '. ' + item.example;
        fixes++;
      }
    }
    if (!zhLower.includes(t)) {
      if (!item.exampleZh.toLowerCase().startsWith(t)) {
        item.exampleZh = item.term + ' ' + item.exampleZh.trim();
        fixes++;
      }
    }
  }
}

fs.writeFileSync(file, JSON.stringify(items, null, 2), 'utf-8');
console.log('Total fixes applied:', fixes);
