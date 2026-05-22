// SAFE GENERATION SCRIPT
// Do not run again unless the user explicitly asks for more items.
// Round 2: Finish generation and lock state.
// Targets: AI PM 450-500, Robotics Maint 450-500, Smart HW 400-450.

const fs=require('fs');

const PACKS=[
  {id:'ai-product-management-llm-products-1000',file:'src/data/packs/ai-product-management-llm-products-1000.json',targetMin:450,targetMax:500,fields:['productStage','workIntent'],st:'ai_product_style_original',tt:'Original AI product management learning sentence'},
  {id:'robotics-maintenance-troubleshooting-1000',file:'src/data/packs/robotics-maintenance-troubleshooting-1000.json',targetMin:450,targetMax:500,fields:['scene','role'],st:'robotics_maintenance_style_original',tt:'Original robotics maintenance learning sentence'},
  {id:'smart-hardware-overseas-channel-sales-core',file:'src/data/packs/smart-hardware-overseas-channel-sales-core.json',targetMin:400,targetMax:450,fields:['salesStage','channelType'],st:'smart_hardware_channel_style_original',tt:'Original smart hardware channel sales learning sentence'}
];

let totalAdded=0;

for(const pack of PACKS){
  const data=JSON.parse(fs.readFileSync(pack.file,'utf-8'));
  const existing=new Set(data.map(d=>d.term.toLowerCase()));
  let id=data.length, added=0, skipped=0;
  const newItems=[];

  function add(term,pos,sm,sis,topic,stage,work,ex,ez,diff,tags,type,reg,fullForm){
    type=type||'phrase'; reg=reg||'workplace'; diff=diff||2; tags=tags||[];
    if(existing.has(term.toLowerCase())){skipped++;return;}
    existing.add(term.toLowerCase()); id++;
    const item={
      id:pack.id+'-'+String(id).padStart(4,'0'),
      packId:pack.id, term, type, partOfSpeech:pos, topic,
      shortMeaning:sm, shortMeaningInSentence:sis,
      example:ex, exampleZh:ez,
      register:reg, difficulty:diff,
      sourceType:pack.st, sourceTitle:pack.tt,
      sourceUrl:'', sourceDate:'', isRealSourceSentence:false, tags
    };
    if(fullForm) item.fullForm=fullForm;
    if(pack.fields.includes('productStage')) item.productStage=stage||'';
    if(pack.fields.includes('workIntent')) item.workIntent=work||'';
    if(pack.fields.includes('scene')) item.scene=stage||'';
    if(pack.fields.includes('role')) item.role=work||'';
    if(pack.fields.includes('salesStage')) item.salesStage=stage||'';
    if(pack.fields.includes('channelType')) item.channelType=work||'';
    newItems.push(item); added++;
  }

  // =====================================================
  // AI PM CORE
  // =====================================================
  if(pack.id==='ai-product-management-llm-products-1000'){

    // Verbs (~20)
    add('triage','verb','分流处理','sort by urgency','Agent / Workflow / Automation','implementation','automate','We triage incoming support tickets by type and route them to the right team.','我们将 incoming support tickets 按类型 triage 并 route 到正确的团队。',2,['agent','verb'],'word');
    add('deprioritize','verb','降优先级','lower priority','PRD / Requirement / Roadmap','requirement','plan','We deprioritized the dark mode feature because only two percent of users asked for it.','我们 deprioritized 了 dark mode 功能因为只有百分之二的用户要求。',2,['pm','verb'],'word');
    add('re-scope','verb','重新划定范围','adjust scope','PRD / Requirement / Roadmap','requirement','plan','We re-scoped the release to just the core workflow after the engineering estimate came in.','在 engineering estimate 出来后我们 re-scope 了发行版只保留核心工作流。',2,['pm','verb'],'word');
    add('relaunch','verb','重新上线','launch again','Launch / GTM / Customer Success','launch','execute','We relaunched the feature with a simpler onboarding flow and the activation rate doubled.','我们用更简单的 onboarding flow relaunch 了该功能 activation rate 翻了一倍。',2,['launch','verb'],'word');
    add('cache','verb','缓存','store temporarily','Engineering Collaboration / Debugging','implementation','optimize','We cache the embedding results so repeated queries do not hit the vector database.','我们 cache embedding 结果这样重复查询不会 hit the vector database。',3,['engineering','verb'],'word');
    add('redact','verb','脱敏','remove sensitive','Safety / Privacy / Compliance','implementation','protect','We redact names emails and phone numbers before sending the prompt to the model.','我们在发送 prompt 到模型之前 redact 姓名邮箱和电话号码。',2,['safety','verb'],'word');
    add('archive','verb','归档','store away','Data / Analytics / Product Metrics','growth','manage','We archive conversations older than 90 days to keep the database size manageable.','我们 archive 超过 90 天的对话以保持数据库大小 manageable。',1,['metrics','verb'],'word');
    add('sunset','verb','退役','stop supporting','Launch / GTM / Customer Success','launch','manage','We sunset the old API version after giving developers a six-month migration window.','我们在给开发者六个月的 migration window 后 sunset 了旧 API 版本。',2,['launch','verb'],'word');
    add('migrate','verb','迁移','move data','Engineering Collaboration / Debugging','implementation','execute','We migrated all enterprise customers to the new model over one weekend.','我们在一个周末内将所有 enterprise customers migrate 到了新模型。',2,['engineering','verb'],'word');
    add('defer','verb','推迟','put off','PRD / Requirement / Roadmap','requirement','plan','We deferred the analytics dashboard to Q3 because the core flow is more urgent.','我们将 analytics dashboard defer 到 Q3 因为核心流程更紧急。',2,['pm','verb'],'word');
    add('split-test','verb','A/B测试','run A/B test','Evaluation / Quality / Benchmark','evaluation','test','We split-tested two system prompts and the shorter one had better accuracy.','我们 split-test 了两个 system prompt 较短的准确率更高。',2,['eval','verb'],'word');
    add('deprecate','verb','弃用','mark as old','Engineering Collaboration / Debugging','implementation','manage','We deprecated the old endpoint and all new integrations use the v2 API.','我们 deprecate 了旧 endpoint 所有新 integration 使用 v2 API。',2,['engineering','verb'],'word');
    add('assign','verb','分配','give to','Agent / Workflow / Automation','implementation','route','The system assigns complex queries to a human agent when confidence is low.','当 confidence 低时系统将 complex queries assign 给 human agent。',1,['agent','verb'],'word');
    add('extract','verb','提取','pull out','RAG / Knowledge Base / Retrieval','implementation','process','We extract key information from the retrieved documents before feeding them to the LLM.','我们在送入 LLM 之前从 retrieved documents 中 extract 关键信息。',2,['rag','verb'],'word');

    // Phrasal verbs (~10)
    add('gate off','phrasal_verb','分离控制','control access','Launch / GTM / Customer Success','launch','control','We gated off the enterprise features from the free tier with a permission check.','我们用 permission check gate off 了 enterprise features 与 free tier。',2,['launch','phrasal_verb'],'phrase');
    add('smooth over','phrasal_verb','消除','make less rough','UX / Conversation Design','design','improve','We smoothed over the awkward transitions between agent steps with a loading message.','我们用 loading message smooth over 了 agent steps 之间的 awkward transitions。',2,['ux','phrasal_verb'],'phrase');
    add('filter out','phrasal_verb','过滤掉','remove','Safety / Privacy / Compliance','implementation','prevent','We filter out toxic language from the user input before it reaches the model.','在到达模型之前我们 filter out 了 user input 中的 toxic language。',2,['safety','phrasal_verb'],'phrase');
    add('build on','phrasal_verb','基于...构建','extend','AI Product Strategy / Use Case Discovery','discovery','plan','We built on the existing RAG pipeline instead of starting from scratch.','我们在 existing RAG pipeline 上 build on 而不是 from scratch。',1,['strategy','phrasal_verb'],'phrase');
    add('pull together','phrasal_verb','汇总','gather','Data / Analytics / Product Metrics','growth','analyse','We pulled together the feedback from all channels into a single report.','我们将所有渠道的反馈 pull together 成一份报告。',1,['metrics','phrasal_verb'],'phrase');
    add('hold off','phrasal_verb','暂缓','wait','Launch / GTM / Customer Success','launch','decide','We held off on the public launch until the safety audit was complete.','我们 hold off 了 public launch 直到 safety audit 完成。',1,['launch','phrasal_verb'],'phrase');
    add('run against','phrasal_verb','用...来测试','test on','Evaluation / Quality / Benchmark','evaluation','test','We ran the new prompt against last month conversation logs to check for regressions.','我们用上个月的对话日志 run against 新 prompt 以检查是否有回退。',2,['eval','phrasal_verb'],'phrase');
    add('spin off','phrasal_verb','拆分出来','separate','Agent / Workflow / Automation','implementation','refactor','We spun off the evaluation module into its own service for easier scaling.','我们将 evaluation module spin off 成自己的 service 以便更容易 scaling。',3,['engineering','phrasal_verb'],'phrase');

    // Adjectives (~12)
    add('enterprise-grade','adjective','企业级的','business quality','Launch / GTM / Customer Success','enterprise deployment','describe','The enterprise-grade version includes audit logs SSO and admin controls.','enterprise-grade 版本包括 audit logs SSO 和 admin controls。',2,['launch','adjective'],'word');
    add('admin-only','adjective','仅管理员的','restricted access','Safety / Privacy / Compliance','implementation','restrict','The admin-only settings page is hidden from regular users in the navigation.','admin-only 设置页在导航中对 regular users 隐藏。',1,['safety','adjective'],'word');
    add('self-serve','adjective','自助的','no human needed','UX / Conversation Design','design','describe','The self-serve onboarding flow lets new users set up without contacting support.','self-serve onboarding flow 让新用户无需联系支持即可设置。',1,['ux','adjective'],'word');
    add('human-reviewed','adjective','人工审核过的','checked by person','Safety / Privacy / Compliance','evaluation','describe','All human-reviewed responses are stored as a quality benchmark for the model.','所有 human-reviewed 回复都被存储为模型的质量基准。',2,['safety','adjective'],'word');
    add('source-grounded','adjective','有来源依据的','based on source','RAG / Knowledge Base / Retrieval','evaluation','describe','A source-grounded answer includes citations that users can click to verify.','source-grounded 答案包括用户可以点击验证的 citations。',3,['rag','adjective'],'word');
    add('audit-ready','adjective','可审计的','prepared for audit','Safety / Privacy / Compliance','implementation','prepare','The audit-ready logs track every model input and output with timestamps.','audit-ready 日志带有 timestamps 追踪每个模型的输入和输出。',3,['safety','adjective'],'word');
    add('tenant-level','adjective','租户级别的','per customer org','Launch / GTM / Customer Success','enterprise deployment','describe','Tenant-level settings allow each enterprise customer to customize the model behaviour.','tenant-level 设置允许每个 enterprise customer 定制模型行为。',3,['launch','adjective'],'word');
    add('role-based','adjective','基于角色的','by user role','Safety / Privacy / Compliance','implementation','describe','Role-based access ensures that only admins can modify the system prompt.','role-based access 确保只有 admins 可以修改 system prompt。',2,['safety','adjective'],'word');
    add('hard-to-debug','adjective','难调试的','difficult to trace','Engineering Collaboration / Debugging','evaluation','diagnose','The hard-to-debug hallucination only happens with very long user inputs.','hard-to-debug hallucination 只发生在非常长的用户输入时。',2,['engineering','adjective'],'word');
    add('safe-by-default','adjective','默认安全的','secure from start','Safety / Privacy / Compliance','design','design','The safe-by-default setting means the model refuses to generate personal advice.','safe-by-default 设置意味着模型拒绝生成个人建议。',2,['safety','adjective'],'word');

    // Collocations (~12)
    add('re-scope the release','collocation','重新划定发布范围','narrow release','PRD / Requirement / Roadmap','requirement','plan','We re-scoped the release to focus on the top three user-requested features.','我们 re-scope the release 专注于前三个用户最需要的功能。',2,['pm','collocation'],'phrase');
    add('triage user feedback','collocation','分流用户反馈','sort feedback','Data / Analytics / Product Metrics','growth','process','We triage user feedback every Friday and tag each item as bug feature or question.','我们每周五 triage user feedback 并将每条标记为 bug feature 或 question。',1,['metrics','collocation'],'phrase');
    add('audit the model output','collocation','审计模型输出','review outputs','Evaluation / Quality / Benchmark','evaluation','verify','We audit the model output on a random sample of 200 conversations each week.','我们每周随机抽样 200 条对话 audit the model output。',2,['eval','collocation'],'phrase');
    add('cache the response','collocation','缓存响应','store answer','Engineering Collaboration / Debugging','implementation','optimize','We cache the response for identical queries to save on token costs.','我们对 identical queries cache the response 以节省 token costs。',2,['engineering','collocation'],'phrase');
    add('redact sensitive data','collocation','脱敏敏感数据','remove PII','Safety / Privacy / Compliance','implementation','protect','We redact sensitive data from the chat logs before storing them for analysis.','在存储用于分析的 chat logs 之前我们 redact sensitive data。',2,['safety','collocation'],'phrase');
    add('set tenant limits','collocation','设置租户限额','configure org cap','Launch / GTM / Customer Success','enterprise deployment','configure','We set tenant limits on API calls per month for each enterprise customer.','我们为每个 enterprise customer set tenant limits 每月 API 调用次数。',2,['launch','collocation'],'phrase');
    add('track feature adoption','collocation','追踪功能采用','measure uptake','Data / Analytics / Product Metrics','growth','measure','We track feature adoption for every new release to see what users actually use.','我们 track feature adoption 每个新发行版以了解用户真正使用的功能。',2,['metrics','collocation'],'phrase');
    add('sunset the old version','collocation','退役旧版本','remove old','Launch / GTM / Customer Success','launch','manage','We sunset the old version of the chat interface after all users migrated.','在所有用户迁移后我们 sunset the old version of the chat interface。',2,['launch','collocation'],'phrase');
    add('assign the ticket','collocation','分配工单','route ticket','Agent / Workflow / Automation','implementation','route','The system assigns the ticket to the best available human agent.','系统 assign the ticket 给最佳可用的人工客服。',1,['agent','collocation'],'phrase');
    add('ground the answer','collocation','为答案提供依据','source the reply','RAG / Knowledge Base / Retrieval','design','ensure','We ground the answer in the top three retrieved documents for accuracy.','我们为答案 ground the answer 在 top three retrieved documents 中以确保准确性。',3,['rag','collocation'],'phrase');

    // Sentence patterns (~12)
    add('Can we re-scope this feature to fit the timeline.','sentence_pattern','这个功能能重新划定以适应时间吗','re-scope proposal','PRD / Requirement / Roadmap','requirement','propose','Can we re-scope this feature to fit the timeline by cutting the admin panel part.','我们能通过砍掉 admin panel 部分来 re-scope this feature to fit the timeline 吗。',1,['pm','sentence_pattern'],'sentence_pattern');
    add('The admin flow is too confusing for new users.','sentence_pattern','管理员流程对新用户太令人困惑','ux issue','UX / Conversation Design','evaluation','report','The admin flow is too confusing for new users and the setup drop-off is over forty percent.','admin flow 对新用户太令人困惑了设置流失率超过百分之四十。',1,['ux','sentence_pattern'],'sentence_pattern');
    add('We should audit the model output before launch.','sentence_pattern','上线前应该审计模型输出','audit proposal','Safety / Privacy / Compliance','evaluation','propose','We should audit the model output before launch to check for any safety issues.','上线前应该 audit the model output 以检查是否有安全问题。',2,['safety','sentence_pattern'],'sentence_pattern');
    add('This feature needs role-based access control.','sentence_pattern','这个功能需要基于角色的访问控制','access control need','Safety / Privacy / Compliance','requirement','propose','This feature needs role-based access control so only team admins can change settings.','这个功能需要 role-based access control 这样只有 team admins 能更改设置。',2,['safety','sentence_pattern'],'sentence_pattern');
    add('The answer is not grounded enough for enterprise use.','sentence_pattern','答案对企业使用来说不够有依据','grounding issue','RAG / Knowledge Base / Retrieval','evaluation','report','The answer is not grounded enough for enterprise use because it lacks source citations.','答案对企业使用来说不够 grounded 因为它缺少 source citations。',3,['rag','sentence_pattern'],'sentence_pattern');
    add('We need to redact PII from the training data.','sentence_pattern','需要从训练数据中脱敏个人信息','redaction need','Safety / Privacy / Compliance','implementation','propose','We need to redact PII from the training data before the next fine-tuning run.','在下次 fine-tuning run 之前需要从 training data 中 redact PII。',3,['safety','sentence_pattern'],'sentence_pattern');
    add('The retry logic is not handling timeouts well.','sentence_pattern','重试逻辑没有处理好超时','retry issue','Engineering Collaboration / Debugging','evaluation','report','The retry logic is not handling timeouts well and the user sees an error after three retries.','retry logic 没有处理好 timeouts 用户在三 retries 后看到 error。',2,['engineering','sentence_pattern'],'sentence_pattern');
    add('Can we cache the response for common queries.','sentence_pattern','常见查询能缓存吗','cache proposal','Engineering Collaboration / Debugging','implementation','propose','Can we cache the response for common queries to reduce the token cost per user.','常见查询能缓存吗以降低每位用户的 token cost。',2,['engineering','sentence_pattern'],'sentence_pattern');
    add('We should deprecate the old prompt format.','sentence_pattern','应该弃用旧的提示格式','deprecate proposal','Prompt / Context / Instruction Design','implementation','propose','We should deprecate the old prompt format because the new one performs much better.','应该 deprecate the old prompt format 因为新的表现好得多。',2,['prompt','sentence_pattern'],'sentence_pattern');
    add('This edge case was not covered in the test suite.','sentence_pattern','这个边缘案例在测试套件里没覆盖到','test gap','Evaluation / Quality / Benchmark','evaluation','report','This edge case was not covered in the test suite and the model failed silently.','这个 edge case 在 test suite 里没覆盖到模型 silently failed。',2,['eval','sentence_pattern'],'sentence_pattern');

    console.log('AI PM:', added, 'added,', skipped, 'skipped, total:', data.length+added);
  }

  // =====================================================
  // ROBOTICS MAINTENANCE CORE
  // =====================================================
  if(pack.id==='robotics-maintenance-troubleshooting-1000'){

    // Verbs (~25)
    add('lock out','verb','锁定隔离','safety block access','Safety / E-Stop / Lockout','safety procedure','secure','Lock out the main power before opening the control cabinet for any work.','在打开 control cabinet 进行任何 work 之前 lock out the main power。',2,['safety','verb'],'phrase');
    add('tag out','verb','挂牌隔离','tag for safety','Safety / E-Stop / Lockout','safety procedure','secure','Tag out the machine with your name and the date before any maintenance work.','在进行任何 maintenance work 之前 tag out the machine 写上你的名字和日期。',2,['safety','verb'],'phrase');
    add('de-energize','verb','断电','remove energy','Safety / E-Stop / Lockout','safety procedure','secure','De-energize the entire cell and verify with a meter before touching any busbar.','在触碰任何 busbar 之前 de-energize the entire cell 并用 meter verify。',2,['safety','verb'],'word');
    add('bleed','verb','泄压','release pressure','Pneumatic / Hydraulic / Vacuum','repair floor','prepare','Bleed the air from the cylinder before disconnecting the fitting.','在断开 fitting 之前 bleed the air from the cylinder。',2,['maintenance','verb'],'word');
    add('vent','verb','排气','release gas','Pneumatic / Hydraulic / Vacuum','repair floor','prepare','Vent the pressure tank slowly and wait until the gauge reads zero.','slowly vent the pressure tank 等到 gauge reads zero。',2,['maintenance','verb'],'word');
    add('drain','verb','排空','empty liquid','Pneumatic / Hydraulic / Vacuum','repair floor','prepare','Drain the hydraulic oil into a clean container before replacing the filter.','在更换 filter 之前 drain the hydraulic oil 到 clean container。',2,['maintenance','verb'],'word');
    add('acknowledge','verb','确认报警','confirm alert','Fault Diagnosis / Troubleshooting','repair floor','respond','Acknowledge the alarm on the HMI before the operator can restart the cycle.','在 operator 可以 restart the cycle 之前 acknowledge the alarm on the HMI。',1,['maintenance','verb'],'word');
    add('silence','verb','消音','mute alarm','Fault Diagnosis / Troubleshooting','repair floor','respond','Silence the buzzer first and then read the fault code from the display.','先 silence the buzzer 然后从 display 读取 fault code。',1,['maintenance','verb'],'word');
    add('flush','verb','冲洗','clean with fluid','Pneumatic / Hydraulic / Vacuum','repair floor','clean','Flush the hydraulic line with clean oil until the old dark oil is completely out.','用 clean oil flush the hydraulic line 直到 old dark oil completely out。',2,['maintenance','verb'],'word');
    add('seal','verb','密封','close tight','Hardware / Component / Wiring','repair floor','fix','Seal the connector with silicone to prevent water from getting into the pins.','用 silicone seal the connector 以防止水进入 pins。',2,['maintenance','verb'],'word');
    add('patch','verb','临时修补','fix temporarily','Fault Diagnosis / Troubleshooting','repair floor','fix','We patched the air hose with tape until the replacement hose arrives tomorrow.','我们用 tape patch the air hose 直到 replacement hose 明天到。',1,['maintenance','verb'],'word');
    add('jumper','verb','跳接','bypass with wire','Hardware / Component / Wiring','repair floor','diagnose','We jumpered the safety relay to test if the fault was in the relay itself.','我们 jumper the safety relay 来测试 fault 是否在 relay itself。',3,['maintenance','verb'],'word');
    add('photograph','verb','拍照','take picture','Remote Support / Documentation','repair floor','document','Photograph the wiring before you disconnect anything so we have a reference.','在你断开任何东西之前 photograph the wiring 这样我们有 reference。',1,['maintenance','verb'],'word');
    add('label','verb','贴标签','mark','Hardware / Component / Wiring','repair floor','organize','Label each cable at both ends before routing it through the cable chain.','在通过 cable chain 之前 label each cable at both ends。',1,['maintenance','verb'],'word');
    add('route','verb','走线','lay cable path','Hardware / Component / Wiring','repair floor','install','Route the encoder cable away from the motor power wires to avoid noise.','将 encoder cable route away from motor power wires 以避免 noise。',2,['maintenance','verb'],'word');
    add('clamp','verb','夹紧','secure with clamp','Hardware / Component / Wiring','repair floor','fix','Clamp the cable every 30 centimetres along the cable chain to prevent sagging.','沿 cable chain 每隔 30 centimetres clamp the cable 以防止下垂。',2,['maintenance','verb'],'word');
    add('fasten','verb','固定','secure','Hardware / Component / Wiring','repair floor','fix','Fasten the cover plate with all six screws not just the four corners.','用全部六个 screws fasten the cover plate 不仅仅是四个角。',1,['maintenance','verb'],'word');
    add('energize','verb','通电','apply power','Safety / E-Stop / Lockout','repair floor','prepare','Energize the system only after everyone has cleared the cell and the gate is closed.','只有在所有人都 cleared the cell 且 gate closed 后才 energize the system。',2,['safety','verb'],'word');

    // Phrasal verbs (~12)
    add('shut off','phrasal_verb','关断','turn off','Safety / E-Stop / Lockout','safety procedure','stop','Shut off the main air supply before working on any pneumatic component.','在处理任何 pneumatic component 之前 shut off the main air supply。',1,['safety','phrasal_verb'],'phrase');
    add('wire up','phrasal_verb','接好线','connect wires','Hardware / Component / Wiring','repair floor','fix','We wired up the new sensor and checked the signal on the oscilloscope.','我们 wire up 了新 sensor 并在 oscilloscope 上 checked the signal。',2,['maintenance','phrasal_verb'],'phrase');
    add('bolt down','phrasal_verb','用螺栓固定','secure with bolts','Hardware / Component / Wiring','repair floor','fix','Bolt down the motor before testing because it will jump when torque is applied.','在测试前 bolt down the motor 因为 torque 施加时会 jump。',1,['maintenance','phrasal_verb'],'phrase');
    add('hook up','phrasal_verb','连接上','connect','Hardware / Component / Wiring','repair floor','connect','We hooked up the laptop to the controller to download the fault history.','我们将 laptop hook up 到 controller 以下载 fault history。',1,['maintenance','phrasal_verb'],'phrase');
    add('blow out','phrasal_verb','吹干净','clean with air','Preventive Maintenance','repair floor','clean','Blow out the dust from the cooling fan with compressed air every month.','每月用 compressed air blow out the dust from the cooling fan。',1,['maintenance','phrasal_verb'],'phrase');
    add('burn up','phrasal_verb','烧毁','overheat badly','Fault Diagnosis / Troubleshooting','repair floor','diagnose','The contactor burned up because the contacts were pitted and the resistance was high.','因为 contacts pitted 且 resistance high contactor burn up 了。',2,['maintenance','phrasal_verb'],'phrase');
    add('feed through','phrasal_verb','穿过','pass through','Hardware / Component / Wiring','repair floor','install','Feed the cable through the conduit carefully so you do not nick the insulation.','carefully feed the cable through the conduit 这样你不会 nick the insulation。',1,['maintenance','phrasal_verb'],'phrase');
    add('pull off','phrasal_verb','拔下','remove by pulling','Hardware / Component / Wiring','repair floor','remove','Pull off the connector by gripping the housing not the cable itself.','通过 gripping the housing 而不是 cable itself 来 pull off the connector。',1,['maintenance','phrasal_verb'],'phrase');
    add('snap back','phrasal_verb','弹回','return suddenly','Fault Diagnosis / Troubleshooting','repair floor','observe','The belt snapped back when we released the tensioner and almost hit my hand.','当我们 release the tensioner 时 belt snapped back 差点 hit my hand。',1,['maintenance','phrasal_verb'],'phrase');
    add('tap on','phrasal_verb','轻敲','hit lightly','Fault Diagnosis / Troubleshooting','repair floor','diagnose','Tap on the relay gently with a screwdriver handle and see if the contact closes.','用 screwdriver handle gently tap on the relay 看看 contact 是否 closes。',2,['maintenance','phrasal_verb'],'phrase');

    // Adjectives (~18)
    add('pinched','adjective','被夹到的','squeezed','Hardware / Component / Wiring','repair floor','diagnose','The pinched cable has a flat spot where it was caught in the door seal.','pinched cable 有一个 flat spot 在那里被 door seal caught。',1,['maintenance','adjective'],'word');
    add('frayed','adjective','磨损的','worn strands','Hardware / Component / Wiring','repair floor','diagnose','The frayed wire strands are touching the metal frame and causing a ground fault.','frayed wire strands 碰到了 metal frame 引起了 ground fault。',2,['maintenance','adjective'],'word');
    add('burnt','adjective','烧焦的','charred','Fault Diagnosis / Troubleshooting','repair floor','diagnose','The burnt smell from the cabinet was the first sign that something was wrong.','cabinet 里的 burnt smell 是 something wrong 的第一个迹象。',1,['maintenance','adjective'],'word');
    add('cracked','adjective','开裂的','split open','Hardware / Component / Wiring','repair floor','diagnose','The cracked housing on the limit switch lets coolant in and shorts the contacts.','limit switch 上的 cracked housing 让 coolant 进入并 shorts the contacts。',2,['maintenance','adjective'],'word');
    add('leaking','adjective','泄漏的','escaping fluid','Pneumatic / Hydraulic / Vacuum','repair floor','diagnose','The leaking fitting makes a hissing sound and the pressure gauge drops steadily.','leaking fitting 发出 hissing sound pressure gauge steadily drops。',1,['maintenance','adjective'],'word');
    add('clogged','adjective','堵塞的','blocked','Pneumatic / Hydraulic / Vacuum','repair floor','diagnose','The clogged filter is restricting airflow and the cylinder moves too slowly.','clogged filter 限制了 airflow cylinder moves too slowly。',1,['maintenance','adjective'],'word');
    add('miswired','adjective','接错线的','wrongly connected','Hardware / Component / Wiring','repair floor','diagnose','The miswired phases made the motor spin backwards which caused a collision.','miswired phases 使 motor spin backwards 导致了 collision。',2,['maintenance','adjective'],'word');
    add('unplugged','adjective','未插好的','not connected','Hardware / Component / Wiring','repair floor','diagnose','The unplugged encoder cable was hidden behind the cable chain and took an hour to find.','unplugged encoder cable 藏在 cable chain 后面花了一个小时才找到。',1,['maintenance','adjective'],'word');
    add('unseated','adjective','未安装到位的','not fully in','Hardware / Component / Wiring','repair floor','diagnose','The unseated connector looked fine from the outside but was not making contact.','unseated connector 从外面看起来 fine 但实际上没有 making contact。',1,['maintenance','adjective'],'word');
    add('blown','adjective','烧断的','burnt open','Fault Diagnosis / Troubleshooting','repair floor','diagnose','The blown fuse has a visible gap in the wire and the glass is darkened.','blown fuse 有一条 visible gap in the wire 玻璃也 darkened。',1,['maintenance','adjective'],'word');
    add('low-pressure','adjective','低压的','insufficient pressure','Pneumatic / Hydraulic / Vacuum','repair floor','diagnose','The low-pressure alarm triggers when the air supply drops below five bar.','当 air supply drops below five bar 时 low-pressure alarm triggers。',2,['maintenance','adjective'],'word');
    add('out-of-tolerance','adjective','超出公差范围的','not within spec','Fault Diagnosis / Troubleshooting','repair floor','diagnose','The out-of-tolerance position reading means the encoder needs recalibration.','out-of-tolerance position reading 意味着 encoder needs recalibration。',3,['maintenance','adjective'],'word');
    add('hard-to-reach','adjective','难以够到的','difficult to access','Fault Diagnosis / Troubleshooting','repair floor','describe','The hard-to-reach connector behind the gearbox takes two hours to access.','gearbox 后面 hard-to-reach connector 要花两个小时才能 access。',1,['maintenance','adjective'],'word');
    add('safe-to-restart','adjective','可安全重启的','ready to run','Safety / E-Stop / Lockout','safety procedure','assess','The machine is safe-to-restart after we replaced the guard and tested the interlock.','在我们 replaced the guard 并 tested the interlock 后 machine 是 safe-to-restart 的。',2,['safety','adjective'],'word');

    // Collocations (~15)
    add('lock out the power','collocation','锁定电源','secure power','Safety / E-Stop / Lockout','safety procedure','secure','Lock out the power at the main disconnect and keep the key in your pocket.','在 main disconnect 处 lock out the power 将 key 放在你的口袋里。',2,['safety','collocation'],'phrase');
    add('bleed the air line','collocation','泄掉气管','release air','Pneumatic / Hydraulic / Vacuum','repair floor','prepare','Bleed the air line before disconnecting the quick-connect fitting.','在断开 quick-connect fitting 之前 bleed the air line。',1,['maintenance','collocation'],'phrase');
    add('trace the cable','collocation','追踪线缆','follow wire','Hardware / Component / Wiring','repair floor','diagnose','Trace the cable from end to end to find where the insulation is damaged.','从一端到另一端 trace the cable 以找到 insulation 在哪里 damaged。',1,['maintenance','collocation'],'phrase');
    add('crimp the connector','collocation','压接连接器','attach terminal','Hardware / Component / Wiring','repair floor','fix','Crimp the connector onto the wire and tug gently to confirm it is secure.','将 connector crimp 到 wire 上轻轻 tug 以确认 secure。',2,['maintenance','collocation'],'phrase');
    add('route the harness','collocation','布置线束','lay harness','Hardware / Component / Wiring','repair floor','install','Route the harness through the cable chain with enough slack for the full range of motion.','通过 cable chain route the harness 留出足够 slack 以适应 full range of motion。',2,['maintenance','collocation'],'phrase');
    add('grease the bearing','collocation','给轴承打润滑脂','lubricate bearing','Preventive Maintenance','repair floor','maintain','Grease the bearing every 500 hours with the specified lithium-based grease.','每 500 小时用指定的 lithium-based grease 给 bearing grease。',2,['maintenance','collocation'],'phrase');
    add('flush the line','collocation','冲洗管路','clean the pipe','Pneumatic / Hydraulic / Vacuum','repair floor','clean','Flush the line with clean fluid until there is no sign of contamination.','用 clean fluid flush the line 直到没有 contamination 的迹象。',2,['maintenance','collocation'],'phrase');
    add('clear the alarm','collocation','清除报警','reset fault','Fault Diagnosis / Troubleshooting','repair floor','fix','Clear the alarm from the HMI and then restart the cycle from the beginning.','从 HMI clear the alarm 然后从头 restart the cycle。',1,['maintenance','collocation'],'phrase');
    add('log the fault','collocation','记录故障','write down issue','Remote Support / Documentation','repair floor','document','Log the fault in the maintenance system with the exact error code and timestamp.','用确切的 error code 和 timestamp 在 maintenance system 中 log the fault。',1,['maintenance','collocation'],'phrase');
    add('label the wire','collocation','给线贴标签','mark cable','Hardware / Component / Wiring','repair floor','organize','Label the wire at both ends so the next technician knows what it connects to.','给线的两端 label the wire 这样下一个 technician 就知道它 connect 到哪里。',1,['maintenance','collocation'],'phrase');
    add('order the spare part','collocation','订购备件','buy replacement','Remote Support / Documentation','repair floor','prepare','We ordered the spare part this morning and it should arrive by Thursday.','我们今早 order the spare part 应在周四前 arrive。',1,['maintenance','collocation'],'phrase');
    add('escalate the issue','collocation','升级问题','raise problem','Remote Support / Documentation','remote support','report','If the fault persists after the second repair escalate the issue to engineering.','如果在第二次 repair 后 fault 仍然存在 escalate the issue to engineering。',2,['maintenance','collocation'],'phrase');
    add('check the fuse','collocation','检查保险丝','inspect fuse','Fault Diagnosis / Troubleshooting','repair floor','diagnose','Check the fuse with a multimeter before assuming the drive is dead.','在假设 drive 已 dead 之前用 multimeter check the fuse。',1,['maintenance','collocation'],'phrase');
    add('test the emergency stop','collocation','测试急停','verify e-stop','Safety / E-Stop / Lockout','safety procedure','verify','Test the emergency stop at the start of every shift to confirm it works.','每班开始时 test the emergency stop 以确认其 work。',1,['safety','collocation'],'phrase');

    // Sentence patterns (~15)
    add('Lock out the power before you open the panel.','sentence_pattern','打开面板前先锁定电源','safety reminder','Safety / E-Stop / Lockout','safety procedure','instruct','Lock out the power before you open the panel because the busbar has 480 volts.','打开面板前先 lock out the power 因为 busbar 有 480 volts。',1,['safety','sentence_pattern'],'sentence_pattern');
    add('The air line is leaking near the fitting.','sentence_pattern','气管接头附近在漏气','air leak report','Pneumatic / Hydraulic / Vacuum','repair floor','report','The air line is leaking near the fitting and you can hear it hissing from across the room.','air line 在 fitting 附近 leaking 你能从房间另一边听到 hissing。',1,['maintenance','sentence_pattern'],'sentence_pattern');
    add('The cable is pinched where it goes through the door.','sentence_pattern','线缆在穿过门的地方被夹了','pinch report','Hardware / Component / Wiring','repair floor','report','The cable is pinched where it goes through the door and the insulation is flattened.','cable 在 through the door 的地方被 pinched insulation 被压扁了。',1,['maintenance','sentence_pattern'],'sentence_pattern');
    add('The connector was not fully seated.','sentence_pattern','连接器没有完全插到位','seating issue','Hardware / Component / Wiring','repair floor','report','The connector was not fully seated and the intermittent contact caused the fault.','connector 没有 fully seated intermittent contact 导致了 fault。',1,['maintenance','sentence_pattern'],'sentence_pattern');
    add('The drive is not enabled after the reboot.','sentence_pattern','重启后驱动器没有使能','drive enable issue','Fault Diagnosis / Troubleshooting','repair floor','report','The drive is not enabled after the reboot and the status LED is blinking red.','reboot 后 drive 没有 enabled status LED 在 blinking red。',2,['maintenance','sentence_pattern'],'sentence_pattern');
    add('The same alarm came back after ten minutes.','sentence_pattern','同样的报警十分钟后又回来了','recurring alarm','Fault Diagnosis / Troubleshooting','repair floor','report','The same alarm came back after ten minutes so the root cause is still there.','同样的 alarm 十分钟后又回来了所以 root cause 仍然存在。',1,['maintenance','sentence_pattern'],'sentence_pattern');
    add('Can you take a photo of the wiring for me.','sentence_pattern','能帮我拍张接线的照片吗','photo request','Remote Support / Documentation','remote support','ask','Can you take a photo of the wiring for me so I can see the terminal markings.','能帮我拍张 wiring 的照片吗这样我能看到 terminal markings。',1,['maintenance','sentence_pattern'],'sentence_pattern');
    add('The emergency stop works normally when tested.','sentence_pattern','急停测试时工作正常','e-stop report','Safety / E-Stop / Lockout','safety procedure','report','The emergency stop works normally when tested and all axes stop within half a second.','当 tested 时 emergency stop works normally 所有 axes 在半秒内 stop。',1,['safety','sentence_pattern'],'sentence_pattern');
    add('The relay is not clicking when the output turns on.','sentence_pattern','输出打开时继电器没有咔嗒声','relay check','Fault Diagnosis / Troubleshooting','repair floor','report','The relay is not clicking when the output turns on and the coil voltage reads zero.','当 output turns on 时 relay 没有 clicking coil voltage reads zero。',2,['maintenance','sentence_pattern'],'sentence_pattern');
    add('We need to reroute this harness away from the motor.','sentence_pattern','得把这束线重新布置离电机远点','reroute need','Hardware / Component / Wiring','repair floor','propose','We need to reroute this harness away from the motor because it is picking up noise.','得把这束 harness reroute 离 motor 远点因为它在 picking up noise。',2,['maintenance','sentence_pattern'],'sentence_pattern');
    add('The pressure drops when the cylinder extends.','sentence_pattern','气缸伸出时压力下降','pressure drop','Pneumatic / Hydraulic / Vacuum','repair floor','report','The pressure drops when the cylinder extends and the movement becomes slow and jerky.','当 cylinder extends 时 pressure drops movement 变得 slow and jerky。',2,['maintenance','sentence_pattern'],'sentence_pattern');
    add('The fuse looks fine but check it with a meter.','sentence_pattern','保险丝看起来没事但用万用表量一下','fuse advice','Fault Diagnosis / Troubleshooting','repair floor','instruct','The fuse looks fine but check it with a meter because it can look good and still be open.','fuse 看起来 fine 但用 meter check it 因为可以 look good 但仍然是 open。',1,['maintenance','sentence_pattern'],'sentence_pattern');

    console.log('Robotics Maint:', added, 'added,', skipped, 'skipped, total:', data.length+added);
  }

  // =====================================================
  // SMART HARDWARE CHANNEL SALES CORE
  // =====================================================
  if(pack.id==='smart-hardware-overseas-channel-sales-core'){

    // Verbs (~25)
    add('prospect','verb','开发潜在客户','find leads','Channel Development / Partner Recruitment','prospecting','find','We prospect new dealers by searching trade directories and LinkedIn for local distributors.','我们通过搜索 trade directories 和 LinkedIn 来 prospect new dealers。',2,['channel','verb'],'word');
    add('demo','verb','演示','show working','Trade Shows / Exhibitions / Demos','trade shows','demonstrate','We demoed the product at three stores and the store managers all wanted to place orders.','我们在三家门店 demo 了产品店长们都想要下单。',1,['channel','verb'],'word');
    add('quote','verb','报价','give price','B2B Sales / Wholesale / Retail','sales','respond','We quoted the dealer a price of 85 dollars per unit for orders over 500 units.','我们为超过 500 台的订单向 dealer quote 了每台 85 美元的价格。',2,['channel','verb'],'word');
    add('appoint','verb','任命','formally assign','Channel Development / Partner Recruitment','partner negotiation','formalize','We appointed them as our exclusive distributor for the Nordic region.','我们 appoint 他们为 Nordic region 的 exclusive distributor。',2,['channel','verb'],'word');
    add('delist','verb','下架','remove from shelf','B2B Sales / Wholesale / Retail','retail','manage','The retailer delisted our product after six months because the margin was too low.','retailer 因为 margin 太低在六个月后 delist 了我们的产品。',2,['channel','verb'],'word');
    add('subsidize','verb','补贴','support financially','Channel Development / Partner Recruitment','partner negotiation','incentivize','We subsidize the first demo unit so the dealer can show it without upfront cost.','我们 subsidize 第一台 demo unit 这样 dealer 可以无 upfront cost 展示。',2,['channel','verb'],'word');
    add('certify','verb','认证','get approval','Certification / Compliance / Market Access','market access','process','We certified the product with CE and FCC which took about three months in total.','我们用 CE 和 FCC certify 了产品总共花了大约三个月。',2,['channel','verb'],'word');
    add('declare','verb','申报','state officially','Certification / Compliance / Market Access','market access','document','We declare the correct HS code on the commercial invoice to avoid customs delays.','我们在 commercial invoice 上 declare 正确的 HS code 以避免海关延误。',3,['channel','verb'],'word');
    add('translate','verb','翻译','put in local language','Certification / Compliance / Market Access','market access','adapt','We translated the user manual into six languages for the European market.','我们将 user manual translate 成了六种语言以面向 European market。',1,['channel','verb'],'word');
    add('localize','verb','本地化','adapt to locale','Certification / Compliance / Market Access','market access','adapt','We localized the packaging with local voltage information and warranty terms.','我们用当地 voltage information 和 warranty terms localize 了包装。',2,['channel','verb'],'word');
    add('service','verb','维修服务','repair and maintain','Channel Development / Partner Recruitment','after-sales','support','The dealer services the product locally which saves customers from shipping back to us.','dealer 在本地 service 产品这为客户省去了 ship 回我们的麻烦。',2,['channel','verb'],'word');
    add('renew','verb','续签','extend contract','Channel Development / Partner Recruitment','partner negotiation','continue','We renewed the distribution agreement for another three years after strong results.','在强劲 results 后我们 renew 了 distribution agreement 再续三年。',2,['channel','verb'],'word');
    add('terminate','verb','终止','end contract','Channel Development / Partner Recruitment','partner negotiation','end','We terminated the agreement because the dealer was not meeting the minimum sales target.','我们 terminate 了 agreement 因为 dealer 没有达到 minimum sales target。',2,['channel','verb'],'word');
    add('co-market','verb','联合营销','market together','Channel Development / Partner Recruitment','partner collaboration','promote','We co-market with our dealers by sharing the cost of local trade show booths.','我们通过分摊当地 trade show booths 的成本来与 dealer co-market。',2,['channel','verb'],'word');
    add('introduce','verb','引荐','make introduction','B2B Sales / Wholesale / Retail','sales','connect','We introduced the dealer to a major retail chain buyer at the trade fair.','我们在 trade fair 上 introduce 了 dealer 给一位 major retail chain buyer。',1,['channel','verb'],'word');
    add('shortlist','verb','列入候选','narrow down','Channel Development / Partner Recruitment','qualifying','select','We shortlisted three distributors based on their market coverage and financial health.','我们根据 market coverage 和 financial health shortlist 了三家 distributor。',2,['channel','verb'],'word');
    add('convert','verb','转化','turn into','B2B Sales / Wholesale / Retail','sales','close','We converted about thirty percent of the leads from the trade show into actual orders.','我们将 trade show 大约百分之三十的 leads convert 为实际 orders。',2,['channel','verb'],'word');
    add('refer','verb','推荐','send referral','Channel Development / Partner Recruitment','partner collaboration','recommend','Our existing dealer referred us to a distributor in a neighbouring country.','我们现有的 dealer refer 了我们给一个邻国的 distributor。',1,['channel','verb'],'word');

    // Phrasal verbs (~12)
    add('hand over','phrasal_verb','移交','give control','Channel Development / Partner Recruitment','partner onboarding','transfer','We handed over the sales leads from the trade show to the local dealer for follow-up.','我们将 trade show 的 sales leads hand over 给当地 dealer 进行跟进。',1,['channel','phrasal_verb'],'phrase');
    add('drop by','phrasal_verb','顺便拜访','visit briefly','B2B Sales / Wholesale / Retail','sales','visit','I will drop by your store next Tuesday to check how the display looks.','我下周二会 drop by 你的门店看看 display 怎么样。',1,['channel','phrasal_verb'],'phrase');
    add('line up','phrasal_verb','安排好','arrange','Channel Development / Partner Recruitment','partner recruitment','organize','We lined up three distributor meetings for the first day of the trade show.','我们为 trade show 的第一天 line up 了三场 distributor meetings。',1,['channel','phrasal_verb'],'phrase');
    add('move forward','phrasal_verb','推进','progress','Channel Development / Partner Recruitment','partner negotiation','advance','We are ready to move forward with the agreement once the legal review is done.','一旦 legal review 完成我们就准备 move forward with the agreement。',1,['channel','phrasal_verb'],'phrase');
    add('turn down','phrasal_verb','拒绝','reject','B2B Sales / Wholesale / Retail','negotiation','refuse','We turned down the offer because the exclusivity clause was too restrictive.','我们 turn down 了 offer 因为 exclusivity clause 太 restrictive。',2,['channel','phrasal_verb'],'phrase');
    add('try out','phrasal_verb','试用','test','Channel Development / Partner Recruitment','partner evaluation','test','We sent them a demo unit to try out in their store for two weeks.','我们发给他们一台 demo unit 在店里 try out 两周。',1,['channel','phrasal_verb'],'phrase');
    add('send over','phrasal_verb','发过去','transmit','B2B Sales / Wholesale / Retail','sales','send','Can you send over the wholesale price list and the product specification sheet.','能 send over the wholesale price list 和 product specification sheet 吗。',1,['channel','phrasal_verb'],'phrase');
    add('check in','phrasal_verb','跟进问候','follow up casually','B2B Sales / Wholesale / Retail','sales','follow-up','I will check in with the dealer next month to see how the sales are going.','我下个月会 check in with the dealer 看看销售情况如何。',1,['channel','phrasal_verb'],'phrase');
    add('run through','phrasal_verb','过一遍','go over quickly','Trade Shows / Exhibitions / Demos','trade shows','present','We ran through the product features with the buyer in under ten minutes.','我们在不到十分钟内 run through the product features with the buyer。',1,['channel','phrasal_verb'],'phrase');

    // Adjectives (~15)
    add('non-exclusive','adjective','非独家的','not exclusive','Channel Development / Partner Recruitment','partner negotiation','describe','The non-exclusive agreement allows us to work with multiple dealers in the same region.','non-exclusive agreement 允许我们在同一区域与多家 dealer 合作。',2,['channel','adjective'],'word');
    add('authorized','adjective','授权的','officially permitted','Channel Development / Partner Recruitment','partner negotiation','describe','Only authorized dealers can sell our products and display our brand name.','只有 authorized dealers 可以 sell our products 并 display our brand name。',2,['channel','adjective'],'word');
    add('retail-ready','adjective','可上架销售的','shelf-ready','B2B Sales / Wholesale / Retail','retail','describe','The retail-ready packaging has a barcode a hanging tab and clear product photos.','retail-ready packaging 有条形码悬挂标签和清晰的产品照片。',2,['channel','adjective'],'word');
    add('demo-ready','adjective','可演示的','set up for demo','Trade Shows / Exhibitions / Demos','trade shows','prepare','The demo-ready unit is fully charged and loaded with the latest software.','demo-ready unit 已充满电并 loaded with the latest software。',1,['channel','adjective'],'word');
    add('channel-friendly','adjective','对渠道友好的','good for partners','Channel Development / Partner Recruitment','partner negotiation','describe','Our channel-friendly pricing leaves enough margin for both the dealer and the retailer.','我们的 channel-friendly pricing 为 dealer 和 retailer 留出了足够 margin。',2,['channel','adjective'],'word');
    add('price-sensitive','adjective','对价格敏感的','cares about cost','B2B Sales / Wholesale / Retail','market research','describe','The price-sensitive market requires a lower-spec version to compete with local brands.','price-sensitive market 需要 lower-spec version 才能与当地品牌 compete。',2,['channel','adjective'],'word');
    add('region-specific','adjective','地区特定的','localized','Certification / Compliance / Market Access','market access','describe','We have region-specific packaging for the EU with CE marking and EU warranty terms.','我们有针对 EU 的 region-specific packaging 带有 CE marking 和 EU warranty terms。',2,['channel','adjective'],'word');
    add('easy-to-install','adjective','易于安装的','simple setup','B2B Sales / Wholesale / Retail','retail','describe','The easy-to-install product takes the customer less than five minutes to set up.','easy-to-install 产品让客户在不到五分钟内完成设置。',1,['channel','adjective'],'word');
    add('serviceable','adjective','可维修的','can be repaired','Channel Development / Partner Recruitment','after-sales','describe','The serviceable design means any local repair shop can replace the main components.','serviceable design 意味着任何当地维修店都可以 replace the main components。',2,['channel','adjective'],'word');
    add('suitable-for-retail','adjective','适合零售的','retail appropriate','B2B Sales / Wholesale / Retail','retail','describe','The suitable-for-retail packaging is compact eye-catching and has all the required labels.','suitable-for-retail packaging 紧凑醒目并有所有 required labels。',2,['channel','adjective'],'word');
    add('market-ready','adjective','可上市的','ready for sale','Certification / Compliance / Market Access','market access','assess','The product is market-ready after passing all required certifications and label checks.','产品在通过所有 required certifications 和 label checks 后是 market-ready 的。',2,['channel','adjective'],'word');
    add('entry-level','adjective','入门级的','basic tier','B2B Sales / Wholesale / Retail','sales','describe','The entry-level model has fewer features but makes it easier for dealers to start selling.','entry-level model 功能更少但使 dealer 更容易开始销售。',1,['channel','adjective'],'word');

    // Collocations (~18)
    add('qualify a distributor','collocation','审查经销商资质','check distributor','Channel Development / Partner Recruitment','qualifying','verify','We qualify a distributor by checking their sales history and existing brand portfolio.','我们通过检查 sales history 和 existing brand portfolio 来 qualify a distributor。',2,['channel','collocation'],'phrase');
    add('demo the device','collocation','演示设备','show product','Trade Shows / Exhibitions / Demos','trade shows','demonstrate','The best way to convince a buyer is to demo the device in person at their store.','convince a buyer 最好的方式是 in person 在店里 demo the device。',1,['channel','collocation'],'phrase');
    add('quote the channel price','collocation','报渠道价','give wholesale price','B2B Sales / Wholesale / Retail','sales','quote','We quoted the channel price based on an annual volume commitment of 3000 units.','我们基于年 commitment 3000 台来 quote the channel price。',2,['channel','collocation'],'phrase');
    add('authorize a reseller','collocation','授权经销商','give permission','Channel Development / Partner Recruitment','partner negotiation','appoint','We authorized a reseller in each major city after a three-month trial period.','在三个月的 trial period 后我们在每个主要城市 authorize a reseller。',2,['channel','collocation'],'phrase');
    add('onboard the partner','collocation','引导合作伙伴上手','welcome partner','Channel Development / Partner Recruitment','partner onboarding','train','We onboard the partner with a training session and a starter kit of marketing materials.','我们用 training session 和 marketing materials starter kit 来 onboard the partner。',1,['channel','collocation'],'phrase');
    add('train the sales team','collocation','培训销售团队','educate staff','Channel Development / Partner Recruitment','partner onboarding','support','We train the sales team on the key product features and the most common objections.','我们 train the sales team 关于关键产品 feature 和最常见 objections。',1,['channel','collocation'],'phrase');
    add('register the device','collocation','注册设备','file device info','Certification / Compliance / Market Access','market access','document','We registered the device with the local wireless authority before importing.','在进口前我们向当地无线管理机构 register the device。',3,['channel','collocation'],'phrase');
    add('clear customs','collocation','清关','pass border','Certification / Compliance / Market Access','market access','process','We cleared customs in three days because all the paperwork was correctly filled out.','因为所有文件 correctly filled out 我们在三天内 clear customs。',3,['channel','collocation'],'phrase');
    add('translate the manual','collocation','翻译手册','localize guide','Certification / Compliance / Market Access','market access','adapt','We translated the manual into the local language and had a native speaker review it.','我们将 manual translate 成当地语言并请 native speaker review。',1,['channel','collocation'],'phrase');
    add('renew the agreement','collocation','续签协议','extend deal','Channel Development / Partner Recruitment','partner negotiation','continue','We renewed the agreement for two more years because both sides are happy with the results.','我们 renew the agreement 再续两年因为双方对 results 都很满意。',2,['channel','collocation'],'phrase');
    add('schedule a follow-up call','collocation','安排跟进电话','book callback','B2B Sales / Wholesale / Retail','sales','arrange','We scheduled a follow-up call for next Tuesday to discuss the wholesale pricing.','我们 schedule a follow-up call 下周二讨论 wholesale pricing。',1,['channel','collocation'],'phrase');
    add('send over the price list','collocation','发价格表过来','share pricing','B2B Sales / Wholesale / Retail','sales','send','Can you send over the price list for all models including the optional accessories.','能 send over the price list 所有型号包括 optional accessories 吗。',1,['channel','collocation'],'phrase');
    add('shortlist a distributor','collocation','候选经销商','narrow choices','Channel Development / Partner Recruitment','qualifying','select','We shortlisted a distributor that already works with two complementary brands.','我们 shortlist a distributor 已经与两个 complementary brands 合作。',2,['channel','collocation'],'phrase');
    add('convert the lead','collocation','转化线索','turn into sale','B2B Sales / Wholesale / Retail','sales','close','We converted the lead from the trade show within two weeks with a quick demo and quote.','我们在两周内通过 quick demo 和 quote convert the lead from the trade show。',2,['channel','collocation'],'phrase');
    add('book a booth meeting','collocation','预约展位会面','reserve meeting','Trade Shows / Exhibitions / Demos','trade shows','schedule','We booked a booth meeting with the retail buyer for the second day of the show.','我们为展会的第二天 book a booth meeting with the retail buyer。',1,['channel','collocation'],'phrase');

    // Sentence patterns (~15)
    add('Can we schedule a follow-up call for next week.','sentence_pattern','能安排下周跟进电话吗','call request','B2B Sales / Wholesale / Retail','sales','ask','Can we schedule a follow-up call for next week to go over the wholesale pricing in detail.','能 schedule a follow-up call 下周详细讨论 wholesale pricing 吗。',1,['channel','sentence_pattern'],'sentence_pattern');
    add('Please send over the product catalog and price list.','sentence_pattern','请发产品目录和价格表过来','catalog request','B2B Sales / Wholesale / Retail','sales','ask','Please send over the product catalog and price list so we can review the full range.','请 send over the product catalog 和 price list 这样我们可以 review the full range。',1,['channel','sentence_pattern'],'sentence_pattern');
    add('We need to qualify this distributor before signing.','sentence_pattern','签约前需要审查这个经销商','qualify need','Channel Development / Partner Recruitment','qualifying','report','We need to qualify this distributor before signing by checking their market reputation.','签约前需要 qualify this distributor 通过检查他们的 market reputation。',2,['channel','sentence_pattern'],'sentence_pattern');
    add('The margin is too low for retail partners.','sentence_pattern','零售合作伙伴的利润空间太低','margin concern','B2B Sales / Wholesale / Retail','negotiation','report','The margin is too low for retail partners because they need at least forty percent to cover costs.','margin 对 retail partners 太低了他们需要至少百分之四十来 cover costs。',2,['channel','sentence_pattern'],'sentence_pattern');
    add('Can you demo the device in our store next week.','sentence_pattern','下周能在我们店里演示设备吗','demo request','Trade Shows / Exhibitions / Demos','trade shows','ask','Can you demo the device in our store next week so our team can see how it works.','下周能在我们店里 demo the device 吗这样我们的团队可以看到它如何 work。',1,['channel','sentence_pattern'],'sentence_pattern');
    add('The partner is asking for exclusive rights in their region.','sentence_pattern','合作方在要求他们地区的独家权','exclusivity request','Channel Development / Partner Recruitment','partner negotiation','report','The partner is asking for exclusive rights in their region and we need to decide soon.','合作方在要求他们地区的 exclusive rights 我们需要尽快 decide。',2,['channel','sentence_pattern'],'sentence_pattern');
    add('We can start with a trial order of 50 units.','sentence_pattern','可以从50台试单开始','trial offer','B2B Sales / Wholesale / Retail','negotiation','propose','We can start with a trial order of 50 units so you can test the market response.','可以从 50 台的 trial order 开始这样你可以 test the market response。',1,['channel','sentence_pattern'],'sentence_pattern');
    add('The retailer asked for a listing fee to put us on the shelf.','sentence_pattern','零售商要了上架费才让我们上架','listing fee issue','B2B Sales / Wholesale / Retail','retail','report','The retailer asked for a listing fee to put us on the shelf and we are negotiating the amount.','retailer 要了 listing fee 才让我们上架我们正在 negotiate the amount。',2,['channel','sentence_pattern'],'sentence_pattern');
    add('Please translate the user manual into the local language.','sentence_pattern','请将用户手册翻译成本地语言','localization request','Certification / Compliance / Market Access','market access','ask','Please translate the user manual into the local language before we ship the first batch.','请在 ship first batch 之前将 user manual translate 成 local language。',1,['channel','sentence_pattern'],'sentence_pattern');
    add('The product needs local certification before import.','sentence_pattern','产品需要当地认证才能进口','certification need','Certification / Compliance / Market Access','market access','report','The product needs local certification before import and the testing lab says it takes six weeks.','产品需要 local certification 才能 import testing lab 说得花六周。',2,['channel','sentence_pattern'],'sentence_pattern');
    add('Can you handle warranty claims locally for your customers.','sentence_pattern','能为你的客户本地处理保修吗','warranty ask','Channel Development / Partner Recruitment','partner negotiation','ask','Can you handle warranty claims locally for your customers so they do not need to ship back.','能为你的客户本地 handle warranty claims 吗这样他们不用 ship back。',2,['channel','sentence_pattern'],'sentence_pattern');
    add('We should train the dealer team before the launch.','sentence_pattern','上线前应该培训经销商团队','training plan','Channel Development / Partner Recruitment','partner onboarding','propose','We should train the dealer team before the launch so they can answer customer questions.','上线前应该 train the dealer team 这样他们能 answer customer questions。',1,['channel','sentence_pattern'],'sentence_pattern');
    add('This market is very price-sensitive for this type of product.','sentence_pattern','这个市场对这类产品非常价格敏感','market insight','B2B Sales / Wholesale / Retail','market research','report','This market is very price-sensitive for this type of product and we may need a lower-spec model.','这个市场对这类产品非常 price-sensitive 我们可能需要 lower-spec model。',2,['channel','sentence_pattern'],'sentence_pattern');
    add('The distributor can cover three neighbouring countries.','sentence_pattern','这个经销商可以覆盖三个邻国','coverage info','Channel Development / Partner Recruitment','qualifying','report','The distributor can cover three neighbouring countries and already has retail partners there.','这个 distributor 可以 cover three neighbouring countries 在那里已有 retail partners。',1,['channel','sentence_pattern'],'sentence_pattern');

    console.log('Smart HW:', added, 'added,', skipped, 'skipped, total:', data.length+added);
  }

  // Write updated pack
  if(newItems.length>0){
    const updated=data.concat(newItems);
    fs.writeFileSync(pack.file,JSON.stringify(updated));
    totalAdded+=added;

    // Update packs.ts
    const packsFile='src/data/packs.ts';
    let pc=fs.readFileSync(packsFile,'utf-8');
    pc=pc.replace(
      new RegExp('(\''+pack.id+'\'[\\s\\S]*?total:\\s*)\\d+'),
      (_,pre)=>pre+updated.length
    );
    fs.writeFileSync(packsFile,pc);
  }
}

// Update status
const stFile='docs/WORD_PACK_GENERATION_STATUS.json';
const st=JSON.parse(fs.readFileSync(stFile,'utf-8'));
for(const pack of PACKS){
  if(st.packs[pack.id]){
    const data=JSON.parse(fs.readFileSync(pack.file,'utf-8'));
    st.packs[pack.id].current=data.length;
    if(data.length >= pack.targetMin){
      st.packs[pack.id].status='core_ready';
    } else {
      st.packs[pack.id].status='core_ready_candidate_exhausted';
    }
  }
}
st.lastAction='Round 2: Finished generation. AI PM, Robotics Maint, Smart HW marked core_ready or candidate_exhausted.';
fs.writeFileSync(stFile,JSON.stringify(st,null,2));

console.log('\n=== ROUND 2 COMPLETE ===');
console.log('Total items added:', totalAdded);
