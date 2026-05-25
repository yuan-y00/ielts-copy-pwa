# Robotics R&D Sourced Core — Collocations & Patterns Extension Report

Generated: 2026-05-25T05:39:39.757Z

## Summary

| Metric | Value |
|--------|-------|
| Items before extension | 293 |
| New items added | 146 |
| Duplicates skipped | 0 |
| Total after extension | 439 |

## New Items by Part of Speech

| collocation | 90 |
| sentence_pattern | 56 |

## New Items by Topic

| ROS2 Core | 34 |
| Navigation | 22 |
| Perception | 14 |
| Manipulation | 13 |
| Robot Control | 13 |
| SLAM | 13 |
| Development Tools | 13 |
| Simulation | 10 |
| Coordinate Transforms | 8 |
| Research & Experiment | 6 |

## New Items by Source Quality

| official_doc | 129 |
| official_github | 11 |
| paper | 6 |

## New Items by Difficulty

| 1 | 27 |
| 2 | 88 |
| 3 | 31 |

## Verification Checklist

| Check | Status |
|-------|--------|
| All 146 new items have sourceUrl | ✅ |
| All 146 new items have sourceTitle | ✅ |
| All 146 new items have sourceQuality | ✅ |
| All 146 new items have sourceEvidence | ✅ |
| All 146 new items have sourceChecked: true | ✅ |
| All new items use source_grounded_rewrite | ✅ |
| All isRealSourceSentence are false | ✅ |
| Zero items use robotics_rd_style_original | ✅ |
| Zero existing items modified | ✅ |
| Zero existing items deleted | ✅ |
| All IDs are new (no reuse) | ✅ |

## Complete New Items List

| # | Term | POS | Topic | Difficulty | Source Quality |
|---|------|-----|-------|------------|----------------|
| 1 | publish a message | collocation | ROS2 Core | 1 | official_doc |
| 2 | subscribe to a topic | collocation | ROS2 Core | 1 | official_doc |
| 3 | call a service | collocation | ROS2 Core | 1 | official_doc |
| 4 | send a request | collocation | ROS2 Core | 1 | official_doc |
| 5 | receive a response | collocation | ROS2 Core | 1 | official_doc |
| 6 | send an action goal | collocation | ROS2 Core | 2 | official_doc |
| 7 | cancel an action goal | collocation | ROS2 Core | 2 | official_doc |
| 8 | check the message type | collocation | ROS2 Core | 1 | official_doc |
| 9 | inspect the topic list | collocation | ROS2 Core | 1 | official_doc |
| 10 | spin the node | collocation | ROS2 Core | 1 | official_doc |
| 11 | use a callback group | collocation | ROS2 Core | 3 | official_doc |
| 12 | remap a topic | collocation | ROS2 Core | 2 | official_doc |
| 13 | load a launch file | collocation | ROS2 Core | 1 | official_doc |
| 14 | run a launch file | collocation | ROS2 Core | 1 | official_doc |
| 15 | declare a parameter | collocation | ROS2 Core | 2 | official_doc |
| 16 | set a parameter | collocation | ROS2 Core | 1 | official_doc |
| 17 | configure the lifecycle node | collocation | ROS2 Core | 2 | official_doc |
| 18 | activate the lifecycle node | collocation | ROS2 Core | 2 | official_doc |
| 19 | deactivate the lifecycle node | collocation | ROS2 Core | 2 | official_doc |
| 20 | log a warning | collocation | ROS2 Core | 1 | official_doc |
| 21 | record a bag file | collocation | ROS2 Core | 1 | official_doc |
| 22 | replay a bag file | collocation | ROS2 Core | 1 | official_doc |
| 23 | load the component | collocation | ROS2 Core | 3 | official_doc |
| 24 | compose the node | collocation | ROS2 Core | 3 | official_doc |
| 25 | The node is not publishing messages. | sentence_pattern | ROS2 Core | 1 | official_doc |
| 26 | The topic has the wrong message type. | sentence_pattern | ROS2 Core | 1 | official_doc |
| 27 | The service never returns a response. | sentence_pattern | ROS2 Core | 2 | official_doc |
| 28 | The action goal does not finish. | sentence_pattern | ROS2 Core | 2 | official_doc |
| 29 | The parameter is not declared. | sentence_pattern | ROS2 Core | 2 | official_doc |
| 30 | The launch file cannot find the package. | sentence_pattern | ROS2 Core | 2 | official_doc |
| 31 | The bag file is missing this topic. | sentence_pattern | ROS2 Core | 2 | official_doc |
| 32 | The callback is not being called. | sentence_pattern | ROS2 Core | 2 | official_doc |
| 33 | The lifecycle node is not active. | sentence_pattern | ROS2 Core | 2 | official_doc |
| 34 | The publisher and subscriber are not connected. | sentence_pattern | ROS2 Core | 2 | official_doc |
| 35 | broadcast a transform | collocation | Coordinate Transforms | 2 | official_doc |
| 36 | lookup a transform | collocation | Coordinate Transforms | 2 | official_doc |
| 37 | transform a point cloud | collocation | Coordinate Transforms | 2 | official_doc |
| 38 | set the frame id | collocation | Coordinate Transforms | 1 | official_doc |
| 39 | check the frame tree | collocation | Coordinate Transforms | 2 | official_doc |
| 40 | The transform is not available yet. | sentence_pattern | Coordinate Transforms | 2 | official_doc |
| 41 | The frame id is wrong. | sentence_pattern | Coordinate Transforms | 1 | official_doc |
| 42 | The timestamp is too old. | sentence_pattern | Coordinate Transforms | 2 | official_doc |
| 43 | update the costmap | collocation | Navigation | 2 | official_doc |
| 44 | clear the costmap | collocation | Navigation | 2 | official_doc |
| 45 | inflate the obstacle | collocation | Navigation | 2 | official_doc |
| 46 | compute a path | collocation | Navigation | 2 | official_doc |
| 47 | follow the path | collocation | Navigation | 2 | official_doc |
| 48 | send a navigation goal | collocation | Navigation | 1 | official_doc |
| 49 | cancel the navigation goal | collocation | Navigation | 2 | official_doc |
| 50 | check the goal tolerance | collocation | Navigation | 3 | official_doc |
| 51 | tune the controller | collocation | Navigation | 2 | official_doc |
| 52 | enable recovery behavior | collocation | Navigation | 2 | official_doc |
| 53 | run a behavior tree | collocation | Navigation | 3 | official_doc |
| 54 | dock the robot | collocation | Navigation | 2 | official_doc |
| 55 | The local costmap is not updating. | sentence_pattern | Navigation | 2 | official_doc |
| 56 | The global planner returns an empty path. | sentence_pattern | Navigation | 2 | official_doc |
| 57 | The controller cannot follow the path. | sentence_pattern | Navigation | 2 | official_doc |
| 58 | The robot stops near the obstacle. | sentence_pattern | Navigation | 2 | official_doc |
| 59 | The goal tolerance is too strict. | sentence_pattern | Navigation | 3 | official_doc |
| 60 | The recovery behavior does not start. | sentence_pattern | Navigation | 2 | official_doc |
| 61 | The behavior tree gets stuck. | sentence_pattern | Navigation | 3 | official_doc |
| 62 | The path is not smooth enough. | sentence_pattern | Navigation | 2 | official_doc |
| 63 | The planner fails in narrow spaces. | sentence_pattern | Navigation | 2 | official_doc |
| 64 | The robot replans too often. | sentence_pattern | Navigation | 3 | official_doc |
| 65 | plan a motion | collocation | Manipulation | 2 | official_doc |
| 66 | execute the trajectory | collocation | Manipulation | 2 | official_doc |
| 67 | check for collisions | collocation | Manipulation | 2 | official_doc |
| 68 | update the planning scene | collocation | Manipulation | 2 | official_doc |
| 69 | solve inverse kinematics | collocation | Manipulation | 3 | official_doc |
| 70 | set a pose target | collocation | Manipulation | 2 | official_doc |
| 71 | attach the object | collocation | Manipulation | 2 | official_doc |
| 72 | detach the object | collocation | Manipulation | 2 | official_doc |
| 73 | MoveIt cannot find a valid plan. | sentence_pattern | Manipulation | 2 | official_doc |
| 74 | The trajectory violates the joint limit. | sentence_pattern | Manipulation | 3 | official_doc |
| 75 | The planning scene is not updated. | sentence_pattern | Manipulation | 2 | official_doc |
| 76 | The inverse kinematics solver fails. | sentence_pattern | Manipulation | 3 | official_doc |
| 77 | The pose target is not reachable. | sentence_pattern | Manipulation | 3 | official_doc |
| 78 | load the controller | collocation | Robot Control | 2 | official_doc |
| 79 | switch the controller | collocation | Robot Control | 2 | official_doc |
| 80 | start the controller | collocation | Robot Control | 2 | official_doc |
| 81 | stop the controller | collocation | Robot Control | 2 | official_doc |
| 82 | read the state interface | collocation | Robot Control | 2 | official_doc |
| 83 | write the command interface | collocation | Robot Control | 2 | official_doc |
| 84 | send position commands | collocation | Robot Control | 1 | official_doc |
| 85 | configure the hardware | collocation | Robot Control | 2 | official_doc |
| 86 | The controller cannot claim the interface. | sentence_pattern | Robot Control | 3 | official_doc |
| 87 | The hardware interface is not ready. | sentence_pattern | Robot Control | 2 | official_doc |
| 88 | The command interface is missing. | sentence_pattern | Robot Control | 2 | official_doc |
| 89 | The state interface returns stale data. | sentence_pattern | Robot Control | 2 | official_doc |
| 90 | The control loop is too slow. | sentence_pattern | Robot Control | 3 | official_doc |
| 91 | filter the point cloud | collocation | Perception | 1 | official_doc |
| 92 | downsample the point cloud | collocation | Perception | 2 | official_doc |
| 93 | segment the object | collocation | Perception | 3 | official_doc |
| 94 | cluster the points | collocation | Perception | 2 | official_doc |
| 95 | register the point cloud | collocation | Perception | 3 | official_doc |
| 96 | extract features | collocation | Perception | 2 | official_doc |
| 97 | calibrate the camera | collocation | Perception | 2 | official_doc |
| 98 | remove outliers | collocation | Perception | 1 | official_doc |
| 99 | The point cloud is too noisy. | sentence_pattern | Perception | 1 | official_doc |
| 100 | The object is not segmented correctly. | sentence_pattern | Perception | 3 | official_doc |
| 101 | The camera calibration is off. | sentence_pattern | Perception | 2 | official_doc |
| 102 | The registration result is unstable. | sentence_pattern | Perception | 3 | official_doc |
| 103 | The depth image is missing data. | sentence_pattern | Perception | 2 | official_doc |
| 104 | The tracking fails in low light. | sentence_pattern | Perception | 2 | official_github |
| 105 | estimate the pose | collocation | SLAM | 2 | official_github |
| 106 | match the scan | collocation | SLAM | 2 | official_github |
| 107 | close the loop | collocation | SLAM | 3 | official_github |
| 108 | optimize the pose graph | collocation | SLAM | 3 | official_github |
| 109 | build the map | collocation | SLAM | 2 | official_github |
| 110 | localize the robot | collocation | SLAM | 2 | official_doc |
| 111 | save the map | collocation | SLAM | 1 | official_github |
| 112 | load the map | collocation | SLAM | 1 | official_doc |
| 113 | The pose estimate keeps drifting. | sentence_pattern | SLAM | 3 | official_github |
| 114 | The scan matching fails here. | sentence_pattern | SLAM | 2 | official_github |
| 115 | The loop closure is not detected. | sentence_pattern | SLAM | 3 | official_github |
| 116 | The pose graph is not optimized. | sentence_pattern | SLAM | 3 | official_github |
| 117 | The robot cannot localize itself. | sentence_pattern | SLAM | 2 | official_doc |
| 118 | spawn the robot | collocation | Simulation | 2 | official_doc |
| 119 | load the world | collocation | Simulation | 2 | official_doc |
| 120 | bridge the topic | collocation | Simulation | 3 | official_doc |
| 121 | reset the simulation | collocation | Simulation | 1 | official_doc |
| 122 | step the simulation | collocation | Simulation | 2 | official_doc |
| 123 | deploy to the real robot | collocation | Simulation | 2 | official_doc |
| 124 | The simulation works but the real robot fails. | sentence_pattern | Simulation | 3 | official_doc |
| 125 | Gazebo does not load the model. | sentence_pattern | Simulation | 2 | official_doc |
| 126 | The plugin is not loaded. | sentence_pattern | Simulation | 2 | official_doc |
| 127 | The simulated sensor data looks wrong. | sentence_pattern | Simulation | 2 | official_doc |
| 128 | reproduce the issue | collocation | Development Tools | 2 | official_doc |
| 129 | profile the latency | collocation | Development Tools | 3 | official_doc |
| 130 | measure the success rate | collocation | Research & Experiment | 2 | paper |
| 131 | compare the baseline | collocation | Research & Experiment | 3 | paper |
| 132 | run the benchmark | collocation | Research & Experiment | 2 | paper |
| 133 | evaluate the model | collocation | Research & Experiment | 3 | paper |
| 134 | validate the result | collocation | Development Tools | 2 | official_doc |
| 135 | record the failure case | collocation | Development Tools | 2 | official_doc |
| 136 | analyze the log | collocation | Development Tools | 1 | official_doc |
| 137 | replay the dataset | collocation | Development Tools | 2 | official_doc |
| 138 | test on the real robot | collocation | Development Tools | 2 | official_doc |
| 139 | Can you reproduce the issue? | sentence_pattern | Development Tools | 2 | official_doc |
| 140 | The log shows a timing problem. | sentence_pattern | Development Tools | 2 | official_doc |
| 141 | The latency is too high. | sentence_pattern | Development Tools | 2 | official_doc |
| 142 | The benchmark result is unstable. | sentence_pattern | Research & Experiment | 3 | paper |
| 143 | The baseline fails in this scene. | sentence_pattern | Research & Experiment | 3 | paper |
| 144 | The failure case happens near obstacles. | sentence_pattern | Development Tools | 2 | official_doc |
| 145 | The result is not reproducible. | sentence_pattern | Development Tools | 3 | official_doc |
| 146 | We should test this on the real robot. | sentence_pattern | Development Tools | 2 | official_doc |

## Skipped (Duplicate Terms)

None
