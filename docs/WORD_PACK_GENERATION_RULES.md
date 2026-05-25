# Word Pack Generation Rules

本项目是一个多词包英语抄写学习 PWA。词包是核心资产，软件只是训练容器。以后新增或扩展任何词包时，必须先阅读并遵守本文件。

## 0. Target Size Policy

All word packs are Core packs now. Do not force fixed 1000 or 2000 targets.

**Recommended targets:**
- **IELTS Core**: reasonable size only, no hard 2000 target. Keep and refine existing ~1200 items. Do not generate more.
- **Foreign Trade DTC Core**: around 700 items
- **Robotics R&D Core**: around 500 items
- **AI PM Core**: around 500 items
- **Robotics Maintenance Core**: around 500 items
- **Smart Hardware Channel Sales Core**: around 500 items

**Quality is more important than quantity.**

If a pack reaches the target range, stop generating and mark it as `core_ready`.
If a pack exceeds the target range because of previous generation, mark it as `over_target_pending_cleanup`.
Do not delete immediately unless the user asks for cleanup.
Do not generate more items for over-target packs.

**禁止：**
- 为了凑数量继续机械生成
- 为了达到 1000/2000 硬塞低质量词
- 继续使用已经标记 DEPRECATED 的 fill 生成器
- 在没有明确要求时继续扩 IELTS

### 0.1 Generator Freeze Rules

All fill-to-1000 or bulk fill scripts that previously produced low-quality items must have this header:

```
// DEPRECATED / DO NOT RUN
// This generator may produce low-quality or over-target items.
// Use only with a manually curated candidate pool.
```

Do not delete scripts. Only add the comment to prevent accidental execution.
Do not use DEPRECATED generators for future work.

## 1. 当前词包 ID

当前项目使用这些词包 ID：

```text
ielts-exam-context-2000
ai-product-management-llm-products-1000
robotics-rd-engineering-research-1000
robotics-maintenance-troubleshooting-1000
foreign-trade-crowdfunding-dtc-operations-1000
```

显示名建议：

IELTS Exam Context 2000
AI Product Management LLM Products 1000
Robotics R&D Engineering Research 1000
Robotics Maintenance Troubleshooting 1000
Foreign Trade Crowdfunding DTC Operations 1000

新增词包时必须：

- 在 src/types/wordPack.ts 的 WordPackId 中新增 packId。
- 在 src/data/packs.ts 中新增 meta 和 loader。
- 在 src/data/packs/ 下新增对应 JSON 文件。
- 在 scripts/validate-packs.mjs 中加入校验。
- 运行 npm run validate:packs 和 npm run build。

## 2. 通用数据字段

每条词条必须包含：

- id
- packId
- term
- type
- topic
- shortMeaning
- shortMeaningInSentence
- example
- exampleZh
- difficulty
- sourceType
- sourceTitle
- sourceUrl
- sourceDate
- isRealSourceSentence
- tags

根据词包类型，可以额外包含：

- fullForm
- examSkill
- examUse
- register
- workIntent
- productStage
- businessStage
- researchArea
- usageScene
- scene
- role

## 3. 字段含义

### term

页面主词。可以是单词、短语、搭配、缩写或句型。

示例：

```
access
abandoned cart
RAG
costmap
power cycle
have a significant impact on
```

不要把缩写全称直接写进 term。

正确：

```json
{ "term": "RAG", "fullForm": "Retrieval-Augmented Generation" }
```

错误：

```json
{ "term": "RAG (Retrieval-Augmented Generation)" }
```

### fullForm

如果 term 是缩写，必须添加 fullForm。

fullForm 是英文全称，不包含中文。

示例缩写及其 fullForm：

- GDP -> Gross Domestic Product
- GNP -> Gross National Product
- UN -> United Nations
- WHO -> World Health Organization
- NGO -> Non-Governmental Organization
- OECD -> Organisation for Economic Co-operation and Development
- EU -> European Union
- UK -> United Kingdom / US -> United States / USA -> United States of America
- CO2 -> Carbon Dioxide
- AI -> Artificial Intelligence
- IT -> Information Technology / ICT -> Information and Communication Technology
- STEM -> Science, Technology, Engineering and Mathematics
- R&D -> Research and Development
- VR -> Virtual Reality / AR -> Augmented Reality
- EV -> Electric Vehicle
- GDP per capita -> Gross Domestic Product per person
- CCTV -> Closed-Circuit Television
- IELTS -> International English Language Testing System
- TOEFL -> Test of English as a Foreign Language
- API -> Application Programming Interface
- UI -> User Interface / UX -> User Experience
- LLM -> Large Language Model
- RAG -> Retrieval-Augmented Generation
- PRD -> Product Requirements Document
- MVP -> Minimum Viable Product
- SaaS -> Software as a Service
- CRM -> Customer Relationship Management
- KPI -> Key Performance Indicator
- ROI -> Return on Investment
- CTR -> Click-Through Rate / CPC -> Cost Per Click / CPA -> Cost Per Acquisition
- ROAS -> Return on Ad Spend
- 3PL -> Third-Party Logistics
- MOQ -> Minimum Order Quantity
- PLC -> Programmable Logic Controller
- SLAM -> Simultaneous Localization and Mapping
- IMU -> Inertial Measurement Unit
- QoS -> Quality of Service
- RGB-D -> Red Green Blue Depth

如果同一个缩写在不同领域有不同全称，以当前词包语境为准。
- KPI -> Key Performance Indicator
- ROI -> Return on Investment
- CTR -> Click-Through Rate
- CPC -> Cost Per Click
- CPA -> Cost Per Acquisition
- ROAS -> Return on Ad Spend
- CRM -> Customer Relationship Management
- 3PL -> Third-Party Logistics
- MOQ -> Minimum Order Quantity
- PLC -> Programmable Logic Controller
- SLAM -> Simultaneous Localization and Mapping
- IMU -> Inertial Measurement Unit
- QoS -> Quality of Service
- RGB-D -> Red Green Blue Depth

### shortMeaning

简短中文翻译，显示在 term 右侧。

示例：

```json
{ "term": "access", "shortMeaning": "获得机会" }
{ "term": "RAG", "shortMeaning": "检索增强生成" }
```

### shortMeaningInSentence

显示在 term 下面的短英文提示。

**必须满足**：

- 英文。
- 简短。
- 口语化。
- 一眼能懂。
- 优先 3 到 8 个英文单词。
- 不能包含中文。
- 不能等于 shortMeaning。
- 不要写词典式长解释。
- 不要写完整复杂句。
- 尽量不要有标点。

**好例子**：

- chance to use something
- answers with outside knowledge
- project supporter
- order waiting for stock
- payment and invoice details
- navigation cost map
- wrong but confident answer
- cart without checkout
- what students study
- effect on something

**坏例子**：

- the complete set of subjects taught in a school
- a method that retrieves external knowledge before generating an answer
- a person who supports or funds a project

### example

英文例句。IELTS 和职业词包的例句风格不同。

#### IELTS 词包

要求：

- IELTS-style 原创学习例句。
- 短、自然、清楚、适合抄写。
- 适合听力、阅读、写作、口语考试语境。
- 不要声称来自真实近三年 IELTS 真题。
- 如果没有提供官方真题原文，isRealSourceSentence 必须是 false。
- sourceType 使用 "ielts_style_original"。
- sourceTitle 使用 "Original IELTS-style learning sentence"。
- 难度面向 IELTS 5.5 到 7.5。
- 不要太简单（good, bad, thing, big, small）。
- 不要太生僻（epistemological, hermeneutic, ontological）。

示例：

```
Students in rural areas often have limited access to high-quality education.
This trend may have a negative impact on young people.
The proportion of people using public transport increased gradually.
```

#### 非 IELTS 职业词包

非 IELTS 词包包括：

- ai-product-management-llm-products-1000
- robotics-rd-engineering-research-1000
- robotics-maintenance-troubleshooting-1000
- foreign-trade-crowdfunding-dtc-operations-1000

这些词包的 example 必须更口语化，更像真实工作沟通。

**要求**：

- 短句。
- 好记。
- 像工作里真的会说的话。
- 不要像说明书。
- 不要像论文。
- 不要像 JD。
- 不要像营销空话。
- 最好 6 到 14 个英文单词。
- 尽量不要超过 18 个英文单词。
- 超过 24 个英文单词必须重写。

**好例子**：

```
Can this AI feature solve a real user pain point?
The prompt fails on long conversations.
RAG should cite the source document.
The token cost is too high.
Can you check the encoder cable?
The fault comes back after reboot.
The sensor keeps dropping out.
The planner fails in narrow passages.
The costmap looks too noisy.
Backers want a clearer shipping timeline.
The abandoned cart flow did not trigger.
```

**坏例子**：

```
Artificial intelligence is revolutionizing the future of productivity.
The proposed localization pipeline demonstrates improved robustness in complex indoor environments.
The technician should inspect the encoder cable according to the manufacturer's troubleshooting procedure.
The merchant reviewed the billing information before modifying the product detail page.
```

### exampleZh

exampleZh 是英文 example 的中文译文。

**硬性规则**：

1. 必须逐句翻译 example。
2. 不能根据 term 自己编中文。
3. 不能只翻译大概主题。
4. 不能漏掉 example 的关键信息。
5. 不能添加 example 没有的信息。
6. 中文必须自然、清楚、像人话。
7. 目标 term 必须保持英文，不翻译成中文。
8. 如果 term 是短语，尽量完整保留短语。
9. 如果 term 是缩写，保留缩写。
10. **除当前目标 term 外，example 中其他普通英文词应翻译成中文**（品牌名、平台名、专有名词可保留英文）。例如：term 为 burden 时，"The cost of childcare places a significant financial burden on many working families." → "儿童保育的成本给许多工薪家庭带来了 significant financial burden"（burden 保留，childcare/working families 翻译）
11. 不允许多个 item 套同一个不相关中文模板。

**正确示例**：

```json
{ "term": "access", "example": "Students in rural areas often have limited access to high-quality education.", "exampleZh": "农村地区的学生通常获得高质量教育的 access 有限" }
{ "term": "hallucination", "example": "The hallucination rate is too high.", "exampleZh": "hallucination 率太高了" }
{ "term": "costmap", "example": "The costmap looks too noisy.", "exampleZh": "costmap 看起来太乱了" }
{ "term": "backer", "example": "Backers want a clearer shipping timeline.", "exampleZh": "backers 想要更清楚的发货时间线" }
```

**错误示例**：

```json
{ "term": "backer", "example": "A delayed campaign created more questions about the backer.", "exampleZh": "商家在更改产品页之前审查了 backer。" }
```

## 4. type 取值

type 可选：

- word
- phrase
- collocation
- sentence_pattern

不要只生成单词。很多高价值内容是短语、搭配和句型。

## 5. difficulty

difficulty 取值：1, 2, 3, 4, 5

建议分布：

- 1 = 基础但有用
- 2 = 常见核心词
- 3 = 中等难度，高频实用
- 4 = 稍难，高价值
- 5 = 较难，但仍然值得学

不要大量生成 difficulty 1 的简单词，也不要大量生成 difficulty 5 的冷门词。

## 6. source 规则

如果 example 不是从真实公开来源逐句抽取，必须：

```json
{ "isRealSourceSentence": false }
```

不要伪装成真实语料。

原创学习例句 sourceType 建议：

- IELTS → "ielts_style_original"
- AI 产品经理 → "ai_product_style_original"
- 机器人研发 → "robotics_rd_style_original"
- 机器人维修 → "robotics_maintenance_style_original"
- 外贸众筹 DTC → "foreign_trade_dtc_style_original"

如果使用真实公开来源，必须保留完整 source 信息并以 isRealSourceSentence: true 标注。

## 7. 词包专属规则

### 7.1 IELTS Exam Context Core

- **packId**: ielts-exam-context-2000
- **定位**: 雅思考试语境核心词包，覆盖 Listening、Reading、Writing、Speaking
- **策略**: 不再追 2000 条。只保留和少量扩充高频、实用、可迁移词汇。目标约 1200-1300 条。
- **额外字段**: examSkill, examUse, register
- **examSkill**: Listening, Reading, Writing, Speaking
- **register**: spoken, neutral, semi-formal, formal, academic

IELTS 词包最重要，质量优先。不要一次生成太多。每批最多 100 条。

### 7.2 AI Product Management LLM Products 1000

- **packId**: ai-product-management-llm-products-1000
- **目标**: 500 条左右
- **定位**: 面向 AI 产品经理、LLM 产品、AI Agent、RAG、模型评估、商业化、安全隐私和客户成功的实用工作英语词包
- **额外字段**: productStage, workIntent, register, fullForm
- **productStage**: discovery, requirement, design, implementation, evaluation, launch, growth, enterprise deployment, customer success, risk review

example 风格：
```
Can we test this use case with real users?
The model output is too long.
RAG should cite the source document.
The token cost is too high.
We need a fallback response here.
```

### 7.3 Robotics R&D Engineering Sourced Core

- **packId**: robotics-rd-engineering-research-1000
- **状态**: Sourced Core — 所有 item 必须有高质量来源支撑
- **定位**: 面向机器人研发、ROS2、Nav2、MoveIt2、ros2_control、Gazebo、SLAM、感知、控制、仿真和实验调试的来源驱动核心英语词包
- **额外字段**: researchArea, usageScene, workIntent, fullForm, sourceQuality, sourceEvidence, exampleSourceMode, sourceChecked
- **数量**: 来源驱动，不设硬性 target。当前 ~110 条高质量 sourced items。

**来源规则（硬性）**:
1. 所有 item 必须有 sourceUrl、sourceTitle、sourceQuality、sourceEvidence。
2. sourceChecked 必须是 true。
3. exampleSourceMode 必须是 verbatim_short_excerpt 或 source_grounded_rewrite。
4. 禁止使用 robotics_rd_style_original。
5. 来源必须是官方文档、官方 GitHub、ROS Discourse、StackExchange、高质量论文。
6. 找不到来源的 term 不能保留在词包中。

**优先来源**:
- ROS2 / Nav2 / MoveIt2 / ros2_control / Gazebo 官方文档
- PCL / OpenCV / Open3D 官方文档
- 高质量论文 (arXiv, IEEE, RSS, ICRA, IROS)
- ROS Discourse, Robotics StackExchange
- 官方 GitHub README / issue

example 风格（必须来源驱动）：
```
The node is not publishing to the topic.
(来源: ROS2 Understanding Topics, https://docs.ros.org/...)

The local costmap is not updating fast enough.
(来源: Nav2 Configuring Costmaps, https://docs.nav2.org/...)

The kinematics solver fails when the target is out of the workspace.
(来源: MoveIt2 Kinematics, https://moveit.picknik.ai/...)
```

**新增词条要求**:
1. 确认来源真实可访问。
2. sourceEvidence 必须能证明 term 和 example 不是瞎编的。
3. 优先 source_grounded_rewrite（句子短，适合抄写，又保留准确信息）。
4. sourceUrl 不能为空，不能是假链接。

**词性覆盖要求**:
机器人研发 Sourced Core 不应只包含名词/术语。必须包含常用研发动词、短语动词、调试动作、控制动作、感知动作、仿真动作和实验动作。这些动词也必须来源驱动，不能无来源编写 example。

### 7.4 Robotics Maintenance Troubleshooting 1000

- **packId**: robotics-maintenance-troubleshooting-1000
- **目标**: 500 条左右
- **定位**: 面向机器人维修、维护、故障排查、远程技术支持和现场沟通
- **额外字段**: workIntent, scene, role, fullForm

example 风格：
```
Can you check the encoder cable?
The fault comes back after reboot.
The sensor keeps dropping out.
We replaced the drive yesterday.
```

### 7.5 Foreign Trade Crowdfunding DTC Operations 1000

- **packId**: foreign-trade-crowdfunding-dtc-operations-1000
- **目标**: 700 条左右
- **定位**: 面向跨境 DTC、众筹首发、独立站运营、海外客服、广告投放和物流履约
- **额外字段**: businessStage, workIntent, fullForm

example 风格：
```
Backers want a clearer shipping timeline.
Please check the billing first.
The supplier needs two more weeks.
The checkout conversion dropped yesterday.
```

### 7.6 Smart Hardware Overseas Channel Sales Core

- **packId**: smart-hardware-overseas-channel-sales-core
- **目标**: 500 条左右
- **定位**: 面向智能硬件产品出海、海外渠道开发、代理商招募、B2B销售、展会推销、零售和准入合规沟通
- **额外字段**: salesStage, channelType, workIntent, fullForm

example 风格：
```
We need to onboard this distributor before the trade show.
The channel partner is asking for exclusive rights.
Can we offer a better margin for the first batch.
The certification process takes about six weeks.
```

词性分布是参考指引，不是硬性配额。

新增词条数量和词性分布应取决于考试或工作口语中的重要性和使用频率。

推荐参考比例（非强制）：
- noun / noun_phrase: 35%–45%
- verb / phrasal_verb: 20%–30%
- adjective: 10%–15%
- adverb: 5%–10%
- collocation: 10%–15%
- sentence_pattern: 5%–10%

Part of speech distribution is a guide, not a fixed quota.
New items should be selected based on practical value.
For IELTS, prioritize exam usefulness.
For professional packs, prioritize spoken workplace usefulness.
Do not add low-value words just to satisfy a part-of-speech ratio.
Do not mechanically generate nouns, verbs, or phrases from templates.

## 8. 批次生成规则

- 每次只处理一个词包。
- 每批最多新增 100 条。
- IELTS 优先完成。
- 每批结束必须运行 `npm run validate:packs` 和 `npm run build`。
- validate 或 build 失败，必须修复后再继续。
- 不允许一次生成 500 或 1000 条。
- 不允许同时扩展多个词包。
- 每完成 500 条，必须做一次质量审查。
- 不允许跳过质量审查。

## 9. 质量审查规则

每完成 500 条，必须检查：

- 是否有重复 id
- 是否有重复 term
- 是否有 exampleZh 和 example 明显不对应
- 是否有 shortMeaningInSentence 包含中文
- 是否有 shortMeaningInSentence 等于 shortMeaning
- 是否有 shortMeaningInSentence 过长
- 是否有 fullForm 缺失
- 是否有太简单、低价值词
- 是否有太生僻、低频词
- 是否有 example 太长不适合手机抄写
- 是否有 exampleZh 没有保留 term
- 是否有 sourceType 或 isRealSourceSentence 填错
- **是否有机械拼接凑数词**：禁止将业务前缀（email、payment、warehouse 等）与通用后缀（report、schedule、check、log、timeline 等）机械拼接。禁止将技术前缀（loop、map、path 等）与通用后缀（error、offset、update、report 等）机械拼接。禁止 shortMeaning 使用"业务XXX"、"XXX related"、"business term"等占位符。

只修复发现的问题，不要重写整个文件。

## 10. 不要随便修改软件代码

在词包生成阶段，除非明确要求，否则不要修改：

- App.tsx
- WordCard.tsx
- ProgressHeader.tsx
- ThemeTabs.tsx
- PackSelector.tsx
- styles.css
- vite.config.ts
- PWA 配置
- storage 逻辑
- 音频逻辑
- 证书逻辑

通常只允许修改：

- src/data/packs/*.json
- docs/WORD_PACK_GENERATION_STATUS.json
- docs/WORD_PACK_GENERATION_PLAN.md
- docs/WORD_PACK_GENERATION_RULES.md

## 11. validate-packs 检查内容

scripts/validate-packs.mjs 必须检查：

- 必填字段
- id 不能重复
- packId 必须和文件名对应
- difficulty 必须是 1 到 5
- tags 必须是数组
- exampleZh 必须包含 term
- shortMeaningInSentence 不能包含中文
- shortMeaningInSentence 不能等于 shortMeaning
- shortMeaningInSentence 超过 8 个英文单词 → warning
- shortMeaningInSentence 超过 12 个英文单词 → error
- fullForm 如果存在，不能包含中文，不能等于 term
- 缩写 term 缺少 fullForm → warning
- 非 IELTS 职业词包 example 超过 18 个英文单词 → warning
- 非 IELTS 职业词包 example 超过 24 个英文单词 → error
- 明显错译模板检测
- 重复 exampleZh 模板 warning

## 12. 新增词包前必须做的事

新增任何新词包前，必须先回答：

1. packId 是什么
2. 显示名是什么
3. 目标条数是多少
4. 使用场景是什么
5. 是否是 IELTS 类型还是职业场景类型
6. 需要哪些专属字段
7. topic 如何划分
8. example 风格是什么
9. 是否需要 fullForm
10. sourceType 如何填写
11. 是否使用真实来源
12. 是否需要新增 validate 规则

然后再改代码和创建 JSON。

## 14. Progress Compatibility Rules

The app stores learning progress in localStorage keyed by `packId` and item `id`. To prevent data loss and broken progress when word packs are updated, the following rules must never be violated.

### Immutable Identity Rules

- **Never change packId** after a pack is published. The packId is the storage namespace for all progress data.
- **Never renumber existing item ids.** An item's id is its permanent identity. Changing an id orphans the user's progress for that item.
- **Never reuse an existing id for a different term.** If an item is removed, its id must be retired permanently.
- **New items must use new ids.** Do not insert new items with an existing id, even if the old item was deleted.

### Orphan Handling

- **Deleted items may create orphaned progress ids.** The app safely ignores orphaned ids during progress import and load. Orphans are counted and reported but do not cause errors or affect progress percentages.
- **Display title can change**, but `packId` must remain stable.
- **topic names can change**, as they are derived from the word pack data and do not affect stored progress.

## 13. 继续执行计划时的默认行为

当用户说"继续执行词包计划"时，默认行为：

1. 阅读 docs/WORD_PACK_GENERATION_PLAN.md
2. 阅读 docs/WORD_PACK_GENERATION_STATUS.json
3. 阅读本文件 docs/WORD_PACK_GENERATION_RULES.md
4. 找到当前最高优先级未完成词包
5. 只处理下一批，最多 100 条
6. 处理后运行 npm run validate:packs
7. 再运行 npm run build
8. 更新状态文件
9. 报告本批结果和下一批任务
