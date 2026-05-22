// round1_generate_under_target_core_packs.cjs
// Safe generation for under-target Core packs only.
// Does NOT touch: IELTS, Foreign Trade, Robotics R&D.
// Quality: realistic workplace English, clean exampleZh, POS diverse, no mechanical compounds.

const fs=require('fs');

const PACKS=[
  {
    id:'ai-product-management-llm-products-1000',
    file:'src/data/packs/ai-product-management-llm-products-1000.json',
    target:500,
    desc:'AI PM Core',
    sourceType:'ai_product_style_original',
    sourceTitle:'Original AI product management learning sentence',
    extraFields:['productStage','workIntent']
  },
  {
    id:'robotics-maintenance-troubleshooting-1000',
    file:'src/data/packs/robotics-maintenance-troubleshooting-1000.json',
    target:500,
    desc:'Robotics Maintenance Core',
    sourceType:'robotics_maintenance_style_original',
    sourceTitle:'Original robotics maintenance learning sentence',
    extraFields:['scene','role','workIntent']
  },
  {
    id:'smart-hardware-overseas-channel-sales-core',
    file:'src/data/packs/smart-hardware-overseas-channel-sales-core.json',
    target:500,
    desc:'Smart Hardware Channel Core',
    sourceType:'smart_hardware_channel_style_original',
    sourceTitle:'Original smart hardware channel sales learning sentence',
    extraFields:['salesStage','channelType','workIntent']
  }
];

let totalAdded=0;

for(const pack of PACKS){
  const data=JSON.parse(fs.readFileSync(pack.file,'utf-8'));
  const existing=new Set(data.map(d=>d.term.toLowerCase()));
  let id=data.length, added=0, skipped=0;
  const newItems=[];

  function add(term,pos,sm,sis,topic,stage,work,ex,ez,diff,tags,type,reg){
    type=type||'phrase'; reg=reg||'workplace'; diff=diff||2; tags=tags||[];
    if(existing.has(term.toLowerCase())){skipped++;return;}
    existing.add(term.toLowerCase()); id++;
    const item={
      id:pack.id+'-'+String(id).padStart(4,'0'),
      packId:pack.id, term, type, partOfSpeech:pos, topic,
      shortMeaning:sm, shortMeaningInSentence:sis,
      example:ex, exampleZh:ez,
      register:reg, difficulty:diff,
      sourceType:pack.sourceType, sourceTitle:pack.sourceTitle,
      sourceUrl:'', sourceDate:'', isRealSourceSentence:false, tags
    };
    // Add pack-specific fields
    if(pack.extraFields.includes('productStage')) item.productStage=stage||'';
    if(pack.extraFields.includes('workIntent')) item.workIntent=work||'';
    if(pack.extraFields.includes('scene')) item.scene=stage||'';
    if(pack.extraFields.includes('role')) item.role=work||'';
    if(pack.extraFields.includes('salesStage')) item.salesStage=stage||'';
    if(pack.extraFields.includes('channelType')) item.channelType=work||'';
    newItems.push(item); added++;
  }

  const TARGET=pack.target;

  // =====================================================
  // AI PM CORE ITEMS
  // =====================================================
  if(pack.id==='ai-product-management-llm-products-1000'){

    // Verbs (25+)
    add('hallucinate','verb','产生幻觉','make up facts','LLM Basics / Model Capabilities','implementation','identify','The model hallucinates when asked about events after its training cutoff date.','当被问及训练截止日期之后的事件时模型会 hallucinate。',3,['llm','verb'],'word');
    add('prompt','verb','编写提示','write prompt','Prompt / Context / Instruction Design','design','create','We prompted the model with a system message that sets clear boundaries for its responses.','我们用一个设定清晰回复边界的 system message 来 prompt 模型。',2,['prompt','verb'],'word');
    add('fine-tune','verb','微调','adjust model weights','LLM Basics / Model Capabilities','implementation','improve','We fine-tuned the base model on our customer support transcripts for better tone.','我们在客服对话记录上 fine-tune 了基础模型以改善语气。',3,['llm','verb'],'word');
    add('chain','verb','串联','link together','Agent / Workflow / Automation','implementation','design','We chained three prompts together so the output of one feeds into the next.','我们把三个 prompt chain 在一起让一个的输出进入下一个。',3,['agent','verb'],'word');
    add('embed','verb','嵌入','convert to vector','RAG / Knowledge Base / Retrieval','implementation','process','We embed each document chunk into a 1536-dimension vector before storing it.','我们在存储前将每个文档块 embed 为 1536 维向量。',3,['rag','verb'],'word');
    add('chunk','verb','分块','split into parts','RAG / Knowledge Base / Retrieval','implementation','process','We chunk the documentation into 500-token segments with 50-token overlap.','我们将文档 chunk 为 500 token 的片段有 50 token 重叠。',3,['rag','verb'],'word');
    add('rerank','verb','重排序','reorder by relevance','RAG / Knowledge Base / Retrieval','evaluation','improve','We rerank the retrieved documents with a cross-encoder before sending them to the LLM.','在发送给 LLM 之前我们用 cross-encoder rerank 检索到的文档。',4,['rag','verb'],'word');
    add('guardrail','verb','加护栏','add safety rules','Safety / Privacy / Compliance','implementation','prevent','We guardrail the output with a second model that checks for harmful content.','我们用第二个检查 harmful content 的模型 guardrail 输出。',3,['safety','verb'],'word');
    add('red-team','verb','红队测试','adversarial test','Safety / Privacy / Compliance','evaluation','test','We red-teamed the model before launch by trying to make it produce unsafe outputs.','我们在上线前通过尝试让它产生不安全输出来 red-team 模型。',4,['safety','verb'],'word');
    add('instrument','verb','埋点','add monitoring','Data / Analytics / Product Metrics','implementation','track','We instrumented every step of the pipeline to measure latency and token usage.','我们 instrumented 了管线的每一步以测量延迟和 token 使用。',3,['metrics','verb'],'word');
    add('version','verb','版本控制','track changes','Engineering Collaboration / Debugging','implementation','manage','We version every prompt template so we can roll back if quality drops.','我们 version 每个 prompt template 这样如果质量下降可以回滚。',2,['engineering','verb'],'word');
    add('stage','verb','分阶段','release gradually','Launch / GTM / Customer Success','launch','plan','We staged the rollout to power users first then to all users over two weeks.','我们将发布 stage 为先面向 power user 再在两周内面向所有用户。',2,['launch','verb'],'word');
    add('sandbox','verb','沙箱隔离','isolate','Safety / Privacy / Compliance','implementation','protect','We sandbox the code execution environment so the model cannot access the file system.','我们 sandbox 了代码执行环境使模型无法访问文件系统。',3,['safety','verb'],'word');
    add('tokenize','verb','分词','split into tokens','LLM Basics / Model Capabilities','implementation','process','The system tokenizes the input before feeding it into the embedding model.','系统在送入 embedding model 之前 tokenize 输入。',3,['llm','verb'],'word');
    add('deduplicate','verb','去重','remove duplicates','RAG / Knowledge Base / Retrieval','implementation','clean','We deduplicate the knowledge base weekly to remove near-identical documents.','我们每周 deduplicate 知识库以删除近乎相同的文档。',2,['rag','verb'],'word');

    // Phrasal verbs (12+)
    add('turn on','phrasal_verb','开启','enable','Launch / GTM / Customer Success','launch','enable','We turned on the new model for five percent of users to compare against the baseline.','我们为百分之五的用户 turn on 了新模型以与 baseline 比较。',1,['launch','phrasal_verb'],'phrase');
    add('turn off','phrasal_verb','关闭','disable','Safety / Privacy / Compliance','implementation','control','We turned off the feature after detecting a spike in harmful outputs.','在检测到 harmful outputs 激增后我们 turn off 了该功能。',1,['safety','phrasal_verb'],'phrase');
    add('tune out','phrasal_verb','调掉','adjust away','Evaluation / Quality / Benchmark','evaluation','improve','We tuned out the overly formal tone in the responses by adjusting the system prompt.','我们通过调整 system prompt tune out 了回复中过于正式的语气。',2,['eval','phrasal_verb'],'phrase');
    add('back-test','phrasal_verb','回溯测试','test on old data','Evaluation / Quality / Benchmark','evaluation','verify','We back-tested the new prompt on last month queries to check for regressions.','我们在上个月的查询上 back-test 了新 prompt 以检查是否有回退。',3,['eval','phrasal_verb'],'phrase');
    add('load in','phrasal_verb','加载','ingest','RAG / Knowledge Base / Retrieval','implementation','add','We loaded in all the product documentation before running the first RAG test.','我们在运行第一个 RAG test 之前 load in 了所有产品文档。',1,['rag','phrasal_verb'],'phrase');
    add('strip out','phrasal_verb','移除','remove','Prompt / Context / Instruction Design','design','clean','We stripped out the personal information from the prompt before sending it to the API.','在发送到 API 之前我们 strip out 了 prompt 中的个人信息。',2,['safety','phrasal_verb'],'phrase');
    add('wrap up','phrasal_verb','收尾','finish','UX / Conversation Design','design','design','The assistant wraps up the conversation politely when the user stops engaging.','当用户停止互动时助手礼貌地 wrap up 对话。',1,['ux','phrasal_verb'],'phrase');
    add('single out','phrasal_verb','单独指出','identify one','Evaluation / Quality / Benchmark','evaluation','analyse','We singled out the worst-performing prompt variant to understand what went wrong.','我们 single out 了表现最差的 prompt variant 以了解哪里出了问题。',2,['eval','phrasal_verb'],'phrase');
    add('iron out','phrasal_verb','解决','fix','Engineering Collaboration / Debugging','implementation','fix','We ironed out the remaining latency spikes by optimising the embedding step.','我们通过优化 embedding 步骤 iron out 了剩余的延迟 spikes。',2,['engineering','phrasal_verb'],'phrase');
    add('hook up','phrasal_verb','连接','connect','Agent / Workflow / Automation','implementation','integrate','We hooked up the agent to the internal ticket system so it can create tickets automatically.','我们将 agent hook up 到内部工单系统使其可以自动创建工单。',2,['agent','phrasal_verb'],'phrase');
    add('dial down','phrasal_verb','调低','reduce','UX / Conversation Design','design','adjust','We dialled down the verbosity because users said the answers were too long.','我们 dial down 了 verbosity 因为用户说答案太长了。',1,['ux','phrasal_verb'],'phrase');
    add('flag for review','phrasal_verb','标记审查','mark for check','Safety / Privacy / Compliance','implementation','identify','The system flags for review any response that contains medical or legal advice.','系统 flag for review 任何包含医疗或法律建议的回复。',2,['safety','phrasal_verb'],'phrase');

    // Adjectives (15+)
    add('verbose','adjective','冗长的','too wordy','UX / Conversation Design','evaluation','diagnose','The verbose output frustrates users who just want a quick answer.','verbose 的输出让只想快速得到答案的用户感到沮丧。',2,['ux','adjective'],'word');
    add('hallucination-prone','adjective','易产生幻觉的','often wrong','LLM Basics / Model Capabilities','evaluation','diagnose','The hallucination-prone model should not be used for factual customer-facing answers.','hallucination-prone 模型不应用于面向客户的事实性回答。',3,['quality','adjective'],'word');
    add('prompt-sensitive','adjective','对提示敏感的','depends on prompt','Prompt / Context / Instruction Design','evaluation','describe','The prompt-sensitive output changes dramatically when we rephrase the same question.','当我们改写同一个问题时 prompt-sensitive 的输出会发生剧变。',3,['prompt','adjective'],'word');
    add('traceable','adjective','可追溯的','can be tracked','RAG / Knowledge Base / Retrieval','design','plan','Every answer should be traceable back to a source document chunk.','每个答案都应该 traceable 回到一个源文档块。',2,['rag','adjective'],'word');
    add('self-contained','adjective','自包含的','complete on its own','Prompt / Context / Instruction Design','design','plan','Each prompt should be self-contained with all the context the model needs.','每个 prompt 应该是 self-contained 的包含模型需要的所有上下文。',2,['prompt','adjective'],'word');
    add('mission-critical','adjective','任务关键的','cannot fail','AI Product Strategy / Use Case Discovery','discovery','assess','We avoid using LLMs for mission-critical decisions without human review.','在没有 human review 的情况下我们避免将 LLM 用于 mission-critical 决策。',2,['strategy','adjective'],'word');
    add('well-structured','adjective','结构良好的','clearly organized','Prompt / Context / Instruction Design','design','describe','A well-structured prompt with clear sections produces much better responses.','具有清晰分区的 well-structured prompt 会产生好得多的回复。',1,['prompt','adjective'],'word');
    add('few-shot','adjective','少样本的','with examples','Prompt / Context / Instruction Design','design','describe','A few-shot prompt includes two or three examples of the desired output format.','few-shot prompt 包含两三个所需输出格式的示例。',3,['prompt','adjective'],'word');
    add('zero-shot','adjective','零样本的','no examples','Prompt / Context / Instruction Design','design','describe','The zero-shot approach works surprisingly well for simple classification tasks.','zero-shot 方法对于简单分类任务出人意料地有效。',3,['prompt','adjective'],'word');
    add('latency-critical','adjective','延迟敏感的','needs low delay','Engineering Collaboration / Debugging','implementation','describe','The latency-critical chat endpoint must respond in under two seconds.','latency-critical 聊天端点必须在两秒内响应。',3,['engineering','adjective'],'word');
    add('token-heavy','adjective','token消耗大的','uses many tokens','Pricing / Token Cost / Monetization','evaluation','measure','The token-heavy prompt is costing us about three cents per query on average.','token-heavy prompt 平均每次查询花费我们大约三美分。',2,['cost','adjective'],'word');
    add('low-stakes','adjective','低风险的','safe to try','AI Product Strategy / Use Case Discovery','discovery','assess','We test new features in low-stakes use cases before deploying to critical ones.','我们在 low-stakes 用例中测试新功能然后再部署到关键用例。',2,['strategy','adjective'],'word');

    // Collocations (15+)
    add('run an eval','collocation','运行评估','test performance','Evaluation / Quality / Benchmark','evaluation','test','We run an eval every Friday on the latest model checkpoint to track progress.','我们每周五对最新 model checkpoint run an eval 以追踪进展。',2,['eval','collocation'],'phrase');
    add('write a prompt','collocation','写提示','craft instruction','Prompt / Context / Instruction Design','design','create','We wrote a prompt that instructs the model to think step by step.','我们 write a prompt 指示模型逐步思考。',1,['prompt','collocation'],'phrase');
    add('index a document','collocation','索引文档','add to index','RAG / Knowledge Base / Retrieval','implementation','add','We index a document by chunking it embedding it and storing it in the vector database.','我们通过分块嵌入并存储到向量数据库来 index a document。',3,['rag','collocation'],'phrase');
    add('search the knowledge base','collocation','搜索知识库','query KB','RAG / Knowledge Base / Retrieval','implementation','retrieve','The system searches the knowledge base for relevant documents before generating.','系统在生成前 search the knowledge base 查找相关文档。',2,['rag','collocation'],'phrase');
    add('log a bug','collocation','记录bug','record issue','Engineering Collaboration / Debugging','implementation','report','We logged a bug where the model repeats the same phrase in a loop.','我们 log a bug 模型会循环重复相同的短语。',1,['engineering','collocation'],'phrase');
    add('fix a regression','collocation','修回退','repair drop','Evaluation / Quality / Benchmark','evaluation','fix','We fixed a regression where the new prompt caused a ten percent accuracy drop.','我们 fix a regression 新 prompt 导致准确率下降了百分之十。',3,['eval','collocation'],'phrase');
    add('set a threshold','collocation','设阈值','configure limit','Evaluation / Quality / Benchmark','evaluation','configure','We set a threshold of 0.8 confidence for auto-approved responses.','我们为自动批准回复 set a threshold 为 0.8 置信度。',2,['eval','collocation'],'phrase');
    add('audit the logs','collocation','审计日志','check records','Safety / Privacy / Compliance','evaluation','verify','We audit the logs weekly to ensure no PII was sent to the model.','我们每周 audit the logs 以确保没有 PII 被发送到模型。',2,['safety','collocation'],'phrase');
    add('release a feature','collocation','发布功能','ship feature','Launch / GTM / Customer Success','launch','release','We released the feature behind a flag to five percent of users for testing.','我们用 flag 向百分之五的用户 release a feature 进行测试。',1,['launch','collocation'],'phrase');
    add('gate the rollout','collocation','控制发布','control release','Launch / GTM / Customer Success','launch','control','We gated the rollout by region starting with the US market first.','我们从美国市场开始按地区 gate the rollout。',2,['launch','collocation'],'phrase');
    add('track user behaviour','collocation','追踪用户行为','follow user actions','Data / Analytics / Product Metrics','growth','measure','We track user behaviour to see which features are actually used and which are ignored.','我们 track user behaviour 以了解哪些功能被实际使用哪些被忽略。',2,['metrics','collocation'],'phrase');
    add('sample the data','collocation','采样数据','take data subset','Evaluation / Quality / Benchmark','evaluation','analyse','We sampled the data from the last 10000 conversations to find common failure patterns.','我们从最近 10000 次对话中 sample the data 以找出常见的 failure patterns。',2,['eval','collocation'],'phrase');

    // Sentence patterns (15+)
    add('Can we make the output shorter.','sentence_pattern','能让输出更短吗','shorten request','UX / Conversation Design','design','propose','Can we make the output shorter because users are scrolling past long answers.','能让输出更短吗因为用户会滑过很长的答案。',1,['ux','sentence_pattern'],'sentence_pattern');
    add('The model is not following the instructions.','sentence_pattern','模型没按指令来','instruction failure','Prompt / Context / Instruction Design','evaluation','report','The model is not following the instructions and keeps answering in the wrong format.','模型没有 following the instructions 一直用错误的格式回答。',2,['prompt','sentence_pattern'],'sentence_pattern');
    add('We need to add more guardrails.','sentence_pattern','需要加更多护栏','safety need','Safety / Privacy / Compliance','implementation','propose','We need to add more guardrails because the model gave unsafe advice twice this week.','需要加更多 guardrails 因为模型这周已经给出了两次不安全建议。',2,['safety','sentence_pattern'],'sentence_pattern');
    add('The retrieval is pulling wrong documents.','sentence_pattern','检索拉到了错误的文档','retrieval error','RAG / Knowledge Base / Retrieval','evaluation','report','The retrieval is pulling wrong documents that have the keyword but not the meaning.','retrieval 拉到了错误文档这些文档有关键词但没有正确的含义。',2,['rag','sentence_pattern'],'sentence_pattern');
    add('How do we measure if this is better.','sentence_pattern','怎么衡量这个更好','eval question','Evaluation / Quality / Benchmark','evaluation','ask','How do we measure if this is better than the current production version.','怎么衡量这个比当前 production 版本更好。',1,['eval','sentence_pattern'],'sentence_pattern');
    add('The latency is too high for real-time use.','sentence_pattern','延迟太高无法实时使用','latency issue','Engineering Collaboration / Debugging','evaluation','report','The latency is too high for real-time use and we need to optimise the pipeline.','latency 太高了无法实时使用我们需要优化管线。',2,['engineering','sentence_pattern'],'sentence_pattern');
    add('We should log this failure case.','sentence_pattern','应该记录这个失败案例','logging proposal','Evaluation / Quality / Benchmark','evaluation','propose','We should log this failure case so the team can review it in the weekly meeting.','应该 log 这个 failure case 这样团队可以在周会上审查。',1,['eval','sentence_pattern'],'sentence_pattern');
    add('The prompt is too long for the context window.','sentence_pattern','提示太长超出上下文窗口','context limit','Prompt / Context / Instruction Design','evaluation','report','The prompt is too long for the context window and the model is truncating the middle.','prompt 太长了超出了 context window 模型正在截断中间部分。',3,['prompt','sentence_pattern'],'sentence_pattern');
    add('This response needs a confidence score.','sentence_pattern','这个回复需要置信度分数','confidence need','Evaluation / Quality / Benchmark','design','propose','This response needs a confidence score so we can decide whether to show it or escalate.','这个回复需要 confidence score 这样我们可以决定是显示还是升级。',2,['eval','sentence_pattern'],'sentence_pattern');
    add('The agent should ask clarifying questions.','sentence_pattern','agent应该问澄清问题','clarify need','Agent / Workflow / Automation','design','propose','The agent should ask clarifying questions when the user request is too vague.','当用户请求太模糊时 agent 应该 ask clarifying questions。',1,['agent','sentence_pattern'],'sentence_pattern');
    add('We need a better way to compare these two prompts.','sentence_pattern','需要更好的方式来比较这两个prompt','compare need','Prompt / Context / Instruction Design','evaluation','propose','We need a better way to compare these two prompts than just eyeballing the outputs.','需要比 eyeballing outputs 更好的方式 to compare these two prompts。',2,['prompt','sentence_pattern'],'sentence_pattern');
    add('The user is trying to jailbreak the system.','sentence_pattern','用户在尝试越狱系统','jailbreak alert','Safety / Privacy / Compliance','implementation','report','The user is trying to jailbreak the system by asking it to ignore previous instructions.','用户在尝试 jailbreak 系统让它忽略之前的指令。',2,['safety','sentence_pattern'],'sentence_pattern');
    add('Can we use a smaller model for this task.','sentence_pattern','这个任务能用更小模型吗','model size question','Pricing / Token Cost / Monetization','growth','propose','Can we use a smaller model for this task to reduce the cost per query.','这个任务能用更小模型吗以降低每次查询的成本。',2,['cost','sentence_pattern'],'sentence_pattern');

    // Extra nouns/terms
    add('evals framework','noun_phrase','评估框架','testing framework','Evaluation / Quality / Benchmark','evaluation','build','We built an evals framework that runs 200 test cases on every model update.','我们构建了一个 evals framework 在每次模型更新时运行 200 个测试用例。',3,['eval','noun_phrase'],'phrase');
    add('system prompt','noun_phrase','系统提示','core instruction','Prompt / Context / Instruction Design','design','write','The system prompt sets the tone and boundaries for the entire conversation.','system prompt 为整个对话设定语气和边界。',2,['prompt','noun_phrase'],'phrase');
    add('vector database','noun_phrase','向量数据库','embedding store','RAG / Knowledge Base / Retrieval','implementation','choose','We use a vector database to store and search document embeddings in milliseconds.','我们使用 vector database 在毫秒内存储和搜索文档嵌入。',3,['rag','noun_phrase'],'phrase');
    add('human eval','noun_phrase','人工评估','manual review','Evaluation / Quality / Benchmark','evaluation','measure','Human eval is still the gold standard for measuring output quality.','human eval 仍然是衡量输出质量的 gold standard。',2,['eval','noun_phrase'],'phrase');
    add('adversarial test','noun_phrase','对抗测试','attack simulation','Safety / Privacy / Compliance','evaluation','test','The adversarial test tries to make the model produce harmful or biased content.','adversarial test 试图让模型产生 harmful 或 biased 的内容。',4,['safety','noun_phrase'],'phrase');
    add('feature flag','noun_phrase','功能开关','toggle control','Launch / GTM / Customer Success','launch','control','We put the new feature behind a feature flag to test it with internal users first.','我们把新功能放在 feature flag 后先与内部用户测试。',2,['launch','noun_phrase'],'phrase');

    console.log('AI PM:', added, 'added,', skipped, 'skipped, total:', data.length+added);
  }

  // =====================================================
  // ROBOTICS MAINTENANCE CORE ITEMS
  // =====================================================
  if(pack.id==='robotics-maintenance-troubleshooting-1000'){

    // Verbs (25+)
    add('power cycle','verb','断电重启','turn off and on','Fault Diagnosis / Troubleshooting','repair floor','troubleshoot','Power cycle the controller first before replacing any hardware.','在更换任何硬件之前先 power cycle 控制器。',1,['maintenance','verb'],'phrase');
    add('reseat','verb','重新插拔','remove and insert','Hardware / Component / Wiring','repair floor','fix','Reseat the Ethernet cable in the controller port and check if the link light comes on.','重新插拔控制器端口的 Ethernet cable 检查 link light 是否亮起。',2,['maintenance','verb'],'word');
    add('retighten','verb','重新拧紧','tighten again','Hardware / Component / Wiring','repair floor','maintain','Retighten the mounting bolts every three months because vibration loosens them.','每三个月 retighten 安装螺栓因为振动会让它们松动。',2,['maintenance','verb'],'word');
    add('recalibrate','verb','重新标定','calibrate again','Fault Diagnosis / Troubleshooting','repair floor','fix','We had to recalibrate the arm after replacing the encoder on joint three.','更换 joint three 的 encoder 后我们不得不 recalibrate 手臂。',3,['maintenance','verb'],'word');
    add('bypass','verb','旁路','skip around','Fault Diagnosis / Troubleshooting','repair floor','diagnose','We bypassed the safety relay temporarily to isolate whether it was causing the fault.','我们暂时 bypass 了 safety relay 以隔离它是否是故障的原因。',3,['maintenance','verb'],'word');
    add('rewire','verb','重新接线','change wiring','Hardware / Component / Wiring','repair floor','fix','We rewired the motor phases because the original wiring was picking up noise.','我们 rewire 了 motor phases 因为原来的接线引入了 noise。',3,['maintenance','verb'],'word');
    add('swap out','verb','换掉','replace','Hardware / Component / Wiring','repair floor','fix','We swapped out the faulty drive and the fault cleared immediately.','我们 swap out 了 faulty drive 故障 immediately 消失了。',1,['maintenance','verb'],'word');
    add('torque down','verb','拧紧到指定扭矩','tighten to spec','Hardware / Component / Wiring','repair floor','maintain','Torque down the joint bolts to 25 Newton metres exactly as the manual specifies.','按手册规定将 joint bolts torque down 到精确 25 牛顿米。',3,['maintenance','verb'],'word');
    add('flash','verb','刷固件','update firmware','Hardware / Component / Wiring','repair floor','update','We flashed the latest firmware to the motor driver and the communication error went away.','我们 flash 了 motor driver 的最新固件 communication error 消失了。',2,['maintenance','verb'],'word');
    add('ping','verb','ping测试','test connectivity','Fault Diagnosis / Troubleshooting','repair floor','diagnose','Ping the controller from the main computer to check if the network link is up.','从主计算机 ping 控制器检查 network link 是否 up。',1,['maintenance','verb'],'word');
    add('air-blow','verb','吹气清洁','clean with air','Preventive Maintenance','repair floor','maintain','Air-blow the inside of the control cabinet every six months to remove dust.','每六个月 air-blow 控制柜内部以清除灰尘。',1,['maintenance','verb'],'word');
    add('grease','verb','打润滑脂','apply lubricant','Preventive Maintenance','repair floor','maintain','Grease the linear rails every 500 hours of operation according to the schedule.','根据计划每 500 运行小时 grease 线性导轨。',1,['maintenance','verb'],'word');
    add('backdrive','verb','反向驱动','move manually','Fault Diagnosis / Troubleshooting','repair floor','test','We backdrove the joint by hand to feel if there was unusual friction or grinding.','我们用手 backdrive joint 来感受是否有 unusual friction 或 grinding。',3,['maintenance','verb'],'word');
    add('scope','verb','用示波器检查','check with oscilloscope','Fault Diagnosis / Troubleshooting','repair floor','diagnose','We scoped the encoder signal and found that one channel was missing pulses.','我们 scope 了 encoder signal 发现一个通道 missing pulses。',3,['maintenance','verb'],'word');
    add('megger','verb','用兆欧表测试','insulation test','Hardware / Component / Wiring','repair floor','test','We meggered the motor windings to check the insulation resistance after the short.','在短路后我们 megger 了 motor windings 检查 insulation resistance。',4,['maintenance','verb'],'word');
    add('jog','verb','点动','move incrementally','Fault Diagnosis / Troubleshooting','repair floor','test','Jog the axis forward and backward slowly to see if it moves smoothly.','缓慢地 jog the axis 前后移动看它是否平稳。',1,['maintenance','verb'],'word');
    add('reset','verb','复位','clear fault','Fault Diagnosis / Troubleshooting','repair floor','fix','Reset the emergency stop and clear all faults before restarting the system.','在重启系统之前 reset the emergency stop 并 clear all faults。',1,['maintenance','verb'],'word');

    // Phrasal verbs (12+)
    add('go down','phrasal_verb','停机','stop working','Fault Diagnosis / Troubleshooting','repair floor','report','The robot went down again last night and the log shows the same encoder fault.','robot 昨晚又 go down 了 log 显示了同样的 encoder fault。',1,['maintenance','phrasal_verb'],'phrase');
    add('act up','phrasal_verb','出毛病','misbehave','Fault Diagnosis / Troubleshooting','repair floor','report','The gripper started acting up after about three hours of continuous operation.','gripper 在连续运行大约三小时后 start acting up。',1,['maintenance','phrasal_verb'],'phrase');
    add('burn out','phrasal_verb','烧坏','overheat and fail','Hardware / Component / Wiring','repair floor','diagnose','The motor driver burned out because the cooling fan had stopped working.','因为 cooling fan 停止工作 motor driver burn out 了。',2,['maintenance','phrasal_verb'],'phrase');
    add('wear down','phrasal_verb','磨损','erode over time','Preventive Maintenance','repair floor','observe','The gripper pads wear down after about 10000 cycles and need replacing.','gripper pads 在大约 10000 次循环后 wear down 需要更换。',2,['maintenance','phrasal_verb'],'phrase');
    add('tighten up','phrasal_verb','拧紧','make tighter','Hardware / Component / Wiring','repair floor','fix','We tightened up all the terminal screws and the intermittent connection stopped.','我们 tighten up 了所有 terminal screws intermittent connection 停止了。',1,['maintenance','phrasal_verb'],'phrase');
    add('log in','phrasal_verb','登录','access system','Remote Support / Documentation','remote support','access','Log in to the robot controller remotely and check the fault history.','远程 log in 到 robot controller 查看 fault history。',1,['maintenance','phrasal_verb'],'phrase');
    add('run through','phrasal_verb','过一遍','go through','Fault Diagnosis / Troubleshooting','repair floor','test','We ran through the full test sequence and everything passed except the gripper test.','我们 run through 了整个 test sequence 除了 gripper test 外一切通过。',1,['maintenance','phrasal_verb'],'phrase');
    add('pull up','phrasal_verb','调出','display','Fault Diagnosis / Troubleshooting','remote support','diagnose','Pull up the error log from last night and check if there were any overcurrent faults.','pull up 昨晚的 error log 检查是否有任何 overcurrent faults。',1,['maintenance','phrasal_verb'],'phrase');
    add('swap in','phrasal_verb','换入','install replacement','Hardware / Component / Wiring','repair floor','fix','We swapped in a spare motor driver and the axis moved normally again.','我们 swap in 了一个 spare motor driver axis 又正常移动了。',1,['maintenance','phrasal_verb'],'phrase');
    add('back up','phrasal_verb','备份','save copy','Remote Support / Documentation','remote support','maintain','Back up the controller parameters before doing any firmware update.','在进行任何 firmware update 之前 back up the controller parameters。',2,['maintenance','phrasal_verb'],'phrase');
    add('call up','phrasal_verb','呼叫','contact','Remote Support / Documentation','remote support','communicate','We called up the manufacturer support line and they walked us through the reset.','我们 call up 了 manufacturer support line 他们引导我们完成了 reset。',1,['maintenance','phrasal_verb'],'phrase');

    // Adjectives (15+)
    add('intermittent','adjective','间歇性的','comes and goes','Fault Diagnosis / Troubleshooting','repair floor','diagnose','The intermittent fault is the hardest to find because it never happens during testing.','intermittent fault 最难找因为它在测试时从不出现。',2,['maintenance','adjective'],'word');
    add('overloaded','adjective','过载的','too much load','Fault Diagnosis / Troubleshooting','repair floor','diagnose','The overloaded motor tripped the breaker after about ten seconds of peak torque.','overloaded motor 在 peak torque 约十秒后 tripped the breaker。',2,['maintenance','adjective'],'word');
    add('grounded','adjective','接地的','connected to earth','Hardware / Component / Wiring','repair floor','verify','Make sure the cabinet is properly grounded before powering it on.','在通电前确保 cabinet 正确 grounded。',2,['maintenance','adjective'],'word');
    add('shorted','adjective','短路的','electrical short','Hardware / Component / Wiring','repair floor','diagnose','The shorted winding was causing the drive to trip immediately on power-up.','shorted winding 导致 drive 在通电后 immediately trip。',3,['maintenance','adjective'],'word');
    add('fried','adjective','烧毁的','burnt out','Hardware / Component / Wiring','repair floor','diagnose','The fried capacitor on the board is visible with a brown burn mark around it.','board 上 fried capacitor 可见周围有 brown burn mark。',1,['maintenance','adjective'],'word');
    add('jammed','adjective','卡住的','stuck','Fault Diagnosis / Troubleshooting','repair floor','diagnose','The jammed gripper would not release the part even with the manual release valve.','jammed gripper 即使使用 manual release valve 也无法 release the part。',1,['maintenance','adjective'],'word');
    add('tripped','adjective','跳闸的','breaker open','Fault Diagnosis / Troubleshooting','repair floor','diagnose','The tripped breaker took down the entire cell and all robots stopped.','tripped breaker 使整个 cell down 了所有 robot 都停了。',1,['maintenance','adjective'],'word');
    add('dusty','adjective','积灰的','covered in dust','Preventive Maintenance','repair floor','observe','The dusty fan filter was blocking airflow and the controller temperature was rising.','dusty fan filter 阻塞了 airflow controller temperature 在上升。',1,['maintenance','adjective'],'word');
    add('loose','adjective','松动的','not tight','Hardware / Component / Wiring','repair floor','check','The loose connector was causing the signal to drop out every few seconds.','loose connector 导致 signal 每隔几秒就 drop out。',1,['maintenance','adjective'],'word');
    add('corroded','adjective','腐蚀的','damaged by rust','Hardware / Component / Wiring','repair floor','diagnose','The corroded terminal was adding resistance and the sensor reading was drifting.','corroded terminal 增加了 resistance sensor reading 在 drifting。',2,['maintenance','adjective'],'word');
    add('miswired','adjective','接错线的','incorrectly wired','Hardware / Component / Wiring','repair floor','diagnose','The miswired phases caused the motor to spin in the wrong direction.','miswired phases 导致 motor 向 wrong direction spin。',2,['maintenance','adjective'],'word');
    add('out-of-alignment','adjective','未对准的','not aligned','Hardware / Component / Wiring','repair floor','diagnose','The out-of-alignment coupling was causing vibration and premature bearing wear.','out-of-alignment coupling 引起了 vibration 和 premature bearing wear。',2,['maintenance','adjective'],'word');

    // Collocations (12+)
    add('clear the fault','collocation','清除故障','reset error','Fault Diagnosis / Troubleshooting','repair floor','fix','Clear the fault from the controller and then try to home the axis again.','从 controller clear the fault 然后再次尝试 home the axis。',1,['maintenance','collocation'],'phrase');
    add('pull the logs','collocation','拉取日志','download logs','Fault Diagnosis / Troubleshooting','remote support','diagnose','Pull the logs from the last 24 hours and email them to the support engineer.','pull the logs 从最近 24 小时并通过 email 发给 support engineer。',1,['maintenance','collocation'],'phrase');
    add('check the wiring','collocation','检查接线','inspect cables','Hardware / Component / Wiring','repair floor','diagnose','Check the wiring from the encoder to the drive because the signal looks noisy.','check the wiring 从 encoder 到 drive 因为 signal 看起来 noisy。',1,['maintenance','collocation'],'phrase');
    add('replace the part','collocation','更换零件','install new part','Hardware / Component / Wiring','repair floor','fix','We replaced the part under warranty and the machine was back up in two hours.','我们在 warranty 内 replace the part machine 在两小时内恢复运行。',1,['maintenance','collocation'],'phrase');
    add('run a diagnostic','collocation','运行诊断','execute test','Fault Diagnosis / Troubleshooting','repair floor','test','Run a diagnostic on the servo drive to check for any hidden fault codes.','在 servo drive 上 run a diagnostic 检查任何 hidden fault codes。',2,['maintenance','collocation'],'phrase');
    add('tighten the bolts','collocation','拧紧螺栓','secure fasteners','Preventive Maintenance','repair floor','maintain','Tighten the bolts on the base plate because vibration loosens them over time.','tighten the bolts 在 base plate 上因为 vibration 会随时间松动它们。',1,['maintenance','collocation'],'phrase');
    add('test the sensor','collocation','测试传感器','verify sensor','Fault Diagnosis / Troubleshooting','repair floor','test','Test the sensor by placing an object in front of it and watching the signal.','通过将一个物体放在它前面并观察 signal 来 test the sensor。',1,['maintenance','collocation'],'phrase');
    add('order a spare','collocation','订购备件','buy replacement','Preventive Maintenance','repair floor','prepare','We ordered a spare motor driver to keep on the shelf for quick replacement.','我们 order a spare motor driver 放在架子上以备 quick replacement。',1,['maintenance','collocation'],'phrase');
    add('update the firmware','collocation','更新固件','flash new version','Hardware / Component / Wiring','repair floor','update','We updated the firmware on all six drives to fix a known communication bug.','我们在所有六个 drive 上 update the firmware 以修复已知的 communication bug。',2,['maintenance','collocation'],'phrase');
    add('check the manual','collocation','查手册','look up docs','Remote Support / Documentation','remote support','reference','Check the manual for the correct torque setting before tightening the bolt.','在 tightening the bolt 之前 check the manual 查看 correct torque setting。',1,['maintenance','collocation'],'phrase');
    add('reboot the controller','collocation','重启控制器','restart PLC','Fault Diagnosis / Troubleshooting','repair floor','fix','Reboot the controller after the firmware update and verify all axes respond.','在 firmware update 后 reboot the controller 并 verify all axes respond。',1,['maintenance','collocation'],'phrase');
    add('isolate the problem','collocation','隔离问题','narrow down issue','Fault Diagnosis / Troubleshooting','repair floor','diagnose','We isolated the problem to the third axis by swapping drives between joints.','我们通过交换 joints 之间的 drives 来 isolate the problem 到第三 axis。',2,['maintenance','collocation'],'phrase');

    // Sentence patterns (12+)
    add('The fault comes back after a few hours.','sentence_pattern','故障几小时后又回来了','recurring fault','Fault Diagnosis / Troubleshooting','repair floor','report','The fault comes back after a few hours which suggests a thermal issue.','故障几小时后又回来了这说明是 thermal issue。',2,['maintenance','sentence_pattern'],'sentence_pattern');
    add('Have you tried power cycling it.','sentence_pattern','你试过断电重启吗','power cycle ask','Fault Diagnosis / Troubleshooting','remote support','suggest','Have you tried power cycling it because that fixes most communication errors.','你试过 power cycling 它吗因为这能解决大部分 communication errors。',1,['maintenance','sentence_pattern'],'sentence_pattern');
    add('Can you send a photo of the error screen.','sentence_pattern','能发张错误屏幕的照片吗','photo request','Remote Support / Documentation','remote support','ask','Can you send a photo of the error screen so I can see the exact fault code.','能发张 error screen 的照片吗这样我能看到确切的 fault code。',1,['maintenance','sentence_pattern'],'sentence_pattern');
    add('The motor is making a grinding noise.','sentence_pattern','电机发出研磨异响','grinding sound','Fault Diagnosis / Troubleshooting','repair floor','report','The motor is making a grinding noise and the current draw is higher than normal.','motor 发出 grinding noise current draw 比 normal 高。',1,['maintenance','sentence_pattern'],'sentence_pattern');
    add('We need to order a replacement part.','sentence_pattern','得订替换零件','order need','Hardware / Component / Wiring','repair floor','report','We need to order a replacement part because the current one is worn beyond the limit.','得订 replacement part 因为当前的已经磨损超过了 limit。',1,['maintenance','sentence_pattern'],'sentence_pattern');
    add('The error code points to a communication loss.','sentence_pattern','错误码指向通信丢失','comm loss diagnosis','Fault Diagnosis / Troubleshooting','repair floor','analyse','The error code points to a communication loss between the controller and the drive.','error code 指向 controller 和 drive 之间的 communication loss。',2,['maintenance','sentence_pattern'],'sentence_pattern');
    add('Can you measure the voltage at the terminal.','sentence_pattern','能量一下端子电压吗','voltage check','Hardware / Component / Wiring','remote support','ask','Can you measure the voltage at the terminal and tell me what reading you get.','能量一下 terminal 的 voltage 告诉我读数是多少。',2,['maintenance','sentence_pattern'],'sentence_pattern');
    add('The sensor reading is jumping around.','sentence_pattern','传感器读数乱跳','unstable reading','Fault Diagnosis / Troubleshooting','repair floor','report','The sensor reading is jumping around wildly and the controller cannot lock on.','sensor reading 疯狂 jumping around controller 无法 lock on。',1,['maintenance','sentence_pattern'],'sentence_pattern');
    add('Let me check the service history.','sentence_pattern','让我查一下维修记录','history check','Remote Support / Documentation','remote support','reference','Let me check the service history to see if this fault was reported before.','让我查一下 service history 看看这个 fault 之前是否报告过。',1,['maintenance','sentence_pattern'],'sentence_pattern');
    add('The replacement will take about a week.','sentence_pattern','更换大约需要一周','timeline info','Hardware / Component / Wiring','remote support','inform','The replacement will take about a week because the part ships from the overseas warehouse.','更换大约需要一周因为部件要从海外仓库 ship。',1,['maintenance','sentence_pattern'],'sentence_pattern');
    add('Is the emergency stop released.','sentence_pattern','急停释放了吗','e-stop check','Fault Diagnosis / Troubleshooting','remote support','ask','Is the emergency stop released because the controller will not start if any e-stop is pressed.','急停释放了吗因为任何 e-stop 被按下 controller 都不会 start。',1,['maintenance','sentence_pattern'],'sentence_pattern');
    add('The fault cleared after the reboot.','sentence_pattern','重启后故障消除了','fault cleared','Fault Diagnosis / Troubleshooting','repair floor','report','The fault cleared after the reboot and the robot has been running fine for an hour.','reboot 后 fault cleared robot 已经正常运行了一个小时。',1,['maintenance','sentence_pattern'],'sentence_pattern');

    console.log('Robotics Maint:', added, 'added,', skipped, 'skipped, total:', data.length+added);
  }

  // =====================================================
  // SMART HARDWARE CHANNEL SALES CORE ITEMS
  // =====================================================
  if(pack.id==='smart-hardware-overseas-channel-sales-core'){

    // Verbs (25+)
    add('onboard','verb','引入','bring on','Channel Development / Partner Recruitment','partner recruitment','recruit','We onboarded three new dealers in Southeast Asia this quarter.','我们本季度在东南亚 onboard 了三家新 dealer。',2,['channel','verb'],'word');
    add('cold-call','verb','电话陌拜','make unsolicited call','Channel Development / Partner Recruitment','prospecting','reach','We cold-called about fifty distributors before finding two serious candidates.','我们 cold-call 了大约五十家 distributor 才找到两个认真的 candidate。',2,['channel','verb'],'word');
    add('qualify','verb','资格审查','check suitability','Channel Development / Partner Recruitment','qualifying','assess','We qualify every lead by checking their market coverage and financial status.','我们通过检查 market coverage 和 financial status 来 qualify 每条 lead。',2,['channel','verb'],'word');
    add('pitch','verb','推销演示','present','Trade Shows / Exhibitions / Demos','trade shows','present','We pitched the product to over twenty buyers at the CES booth last week.','上周我们在 CES booth 向超过二十位 buyer pitch 了产品。',2,['channel','verb'],'word');
    add('showcase','verb','展示','display','Trade Shows / Exhibitions / Demos','trade shows','demonstrate','We showcased the new model at the IFA trade fair and got very positive feedback.','我们在 IFA trade fair 上 showcase 了新款得到了非常积极的反馈。',1,['channel','verb'],'word');
    add('co-brand','verb','联合品牌','brand together','Channel Development / Partner Recruitment','partner negotiation','collaborate','We co-branded the packaging with our largest distributor for their local market.','我们与最大的 distributor 为其本地市场 co-brand 了包装。',2,['channel','verb'],'word');
    add('authorize','verb','授权','grant rights','Channel Development / Partner Recruitment','partner negotiation','formalize','We authorized them as the exclusive repair centre for the Benelux region.','我们 authorize 他们成为 Benelux 地区的 exclusive repair centre。',2,['channel','verb'],'word');
    add('push','verb','力推','promote heavily','B2B Sales / Wholesale / Retail','sales','sell','We are pushing the premium model because the margin is better for both sides.','我们在 push 高级型号因为 margin 对双方都更好。',1,['channel','verb'],'word');
    add('stock','verb','备货','hold inventory','B2B Sales / Wholesale / Retail','distribution','supply','The dealer stocked 200 units of our best-selling model for the holiday season.','dealer 为假日季 stock 了 200 台我们的畅销型号。',2,['channel','verb'],'word');
    add('bundled','verb','捆绑销售','sell together','B2B Sales / Wholesale / Retail','sales','package','We bundled the device with a carrying case and screen protector for a holiday deal.','我们为假日促销将 device 与 carrying case 和 screen protector bundle 在一起。',2,['channel','verb'],'word');
    add('cross-promote','verb','交叉推广','promote together','Channel Development / Partner Recruitment','partner collaboration','market','We cross-promote with our dealers by featuring their stores on our website.','我们通过在网站上展示他们的门店来与 dealer cross-promote。',2,['channel','verb'],'word');
    add('forecast','verb','预测销量','predict demand','B2B Sales / Wholesale / Retail','sales planning','plan','The dealer forecasted 500 units for Q3 which is about twenty percent above last year.','dealer forecast 了 Q3 500 台比去年高约百分之二十。',2,['channel','verb'],'word');
    add('unbox','verb','开箱展示','open and show','Trade Shows / Exhibitions / Demos','trade shows','demonstrate','We unboxed the product live at the booth and people crowded around to watch.','我们在 booth live unbox 了产品人们围过来观看。',1,['channel','verb'],'word');
    add('sample','verb','发样品','send sample','Channel Development / Partner Recruitment','qualifying','provide','We sampled the product to ten potential dealers and seven placed orders.','我们向十家 potential dealer sample 了产品其中七家下了订单。',1,['channel','verb'],'word');
    add('territory-map','verb','区域划分','assign territory','Channel Development / Partner Recruitment','partner negotiation','assign','We territory-mapped Europe into five regions with one exclusive dealer each.','我们将欧洲 territory-map 为五个区域每个区域一家 exclusive dealer。',3,['channel','verb'],'word');

    // Phrasal verbs (12+)
    add('reach out','phrasal_verb','主动联系','contact first','Channel Development / Partner Recruitment','prospecting','contact','We reached out to the top ten electronics distributors in each target country.','我们 reach out 到每个 target country 的前十大 electronics distributors。',1,['channel','phrasal_verb'],'phrase');
    add('sign on','phrasal_verb','签约','contract','Channel Development / Partner Recruitment','partner negotiation','close','We signed on three new dealers after the trade show in Berlin.','在柏林 trade show 后我们 sign on 了三家新 dealer。',1,['channel','phrasal_verb'],'phrase');
    add('roll in','phrasal_verb','涌入','arrive steadily','B2B Sales / Wholesale / Retail','sales','observe','Orders started rolling in after the product was featured in a tech magazine.','产品被 tech magazine 推荐后 orders start rolling in。',1,['channel','phrasal_verb'],'phrase');
    add('push back','phrasal_verb','推迟','delay','B2B Sales / Wholesale / Retail','negotiation','report','The buyer pushed back the delivery date by two weeks because their warehouse is full.','buyer 因为 warehouse 满了将 delivery date push back 了两周。',2,['channel','phrasal_verb'],'phrase');
    add('walk through','phrasal_verb','过一遍演示','demo step by step','Trade Shows / Exhibitions / Demos','trade shows','present','We walked the buyer through every feature of the device at the booth.','我们在 booth walk the buyer through 了设备的每个功能。',1,['channel','phrasal_verb'],'phrase');
    add('ship out','phrasal_verb','发出','dispatch','B2B Sales / Wholesale / Retail','fulfillment','deliver','We shipped out the first container to the US distributor last Monday.','上周一我们向美国 distributor ship out 了第一个 container。',1,['channel','phrasal_verb'],'phrase');
    add('price in','phrasal_verb','计入价格','include in price','B2B Sales / Wholesale / Retail','negotiation','calculate','We priced in the certification cost so the dealer price went up by about two dollars.','我们将 certification cost price in 了所以 dealer price 上涨了大约两美元。',2,['channel','phrasal_verb'],'phrase');
    add('test out','phrasal_verb','试投放','trial','Channel Development / Partner Recruitment','partner evaluation','evaluate','We tested out the product in a few retail stores before committing to a full launch.','在承诺全面 launch 之前我们 test out 了产品在几家 retail stores。',1,['channel','phrasal_verb'],'phrase');
    add('draw up','phrasal_verb','起草','draft','Channel Development / Partner Recruitment','partner negotiation','prepare','We drew up a distribution agreement with clear sales targets and territory boundaries.','我们 draw up 了一份 distribution agreement 有清晰的 sales targets 和 territory boundaries。',2,['channel','phrasal_verb'],'phrase');
    add('break into','phrasal_verb','打入','enter','Channel Development / Partner Recruitment','market entry','plan','We are trying to break into the Japanese market through a local distributor.','我们正尝试通过 local distributor break into 日本市场。',2,['channel','phrasal_verb'],'phrase');
    add('follow through','phrasal_verb','跟进到底','complete','B2B Sales / Wholesale / Retail','sales','persist','The dealer followed through on every lead we sent them and closed over half.','dealer 对我们发给他们的每条 lead follow through 成交了超过一半。',2,['channel','phrasal_verb'],'phrase');

    // Adjectives (15+)
    add('exclusive','adjective','独家的','only one','Channel Development / Partner Recruitment','partner negotiation','offer','We offer exclusive rights to the first dealer in each country for two years.','我们为每个国家的第一家 dealer 提供两年的 exclusive rights。',2,['channel','adjective'],'word');
    add('regional','adjective','区域的','area-based','Channel Development / Partner Recruitment','partner negotiation','define','The regional dealer covers three neighbouring countries in Southeast Asia.','regional dealer 覆盖东南亚三个邻国。',1,['channel','adjective'],'word');
    add('wholesale','adjective','批发的','bulk selling','B2B Sales / Wholesale / Retail','sales','describe','The wholesale price is forty percent below the suggested retail price.','wholesale price 比 suggested retail price 低百分之四十。',2,['channel','adjective'],'word');
    add('sellable','adjective','可销售的','ready to sell','Certification / Compliance / Market Access','market access','prepare','The product is sellable in the EU now that we have the CE marking.','产品现在有了 CE marking 在欧盟是 sellable 的了。',2,['channel','adjective'],'word');
    add('price-sensitive','adjective','价格敏感的','cares about price','Channel Development / Partner Recruitment','market research','describe','The price-sensitive market in this region means we need a lower-cost variant.','这个地区的 price-sensitive market 意味着我们需要一个 lower-cost variant。',2,['channel','adjective'],'word');
    add('established','adjective','成熟的','well-known','Channel Development / Partner Recruitment','partner evaluation','assess','We prefer working with established distributors who already have retail relationships.','我们更愿意与已有 retail relationships 的 established distributors 合作。',1,['channel','adjective'],'word');
    add('portable','adjective','便携的','easy to move','Trade Shows / Exhibitions / Demos','trade shows','describe','The portable demo kit fits in a backpack and sets up in under five minutes.','portable demo kit 可以放入 backpack 并在五分钟内 setup。',1,['channel','adjective'],'word');
    add('compliant','adjective','合规的','meets regulations','Certification / Compliance / Market Access','market access','verify','The product is fully compliant with EU safety and EMC standards.','该产品完全 compliant 符合 EU safety 和 EMC standards。',2,['channel','adjective'],'word');
    add('branded','adjective','品牌化的','with brand identity','Channel Development / Partner Recruitment','marketing','design','We provide branded display stands and marketing materials to all dealers.','我们为所有 dealer 提供 branded display stands 和 marketing materials。',1,['channel','adjective'],'word');
    add('competitive','adjective','有竞争力的','good vs others','B2B Sales / Wholesale / Retail','sales','position','Our price is competitive with similar products but we offer a longer warranty.','我们的价格与类似产品 competitive 但我们提供更长的 warranty。',1,['channel','adjective'],'word');
    add('in-demand','adjective','需求旺盛的','wanted','B2B Sales / Wholesale / Retail','sales','describe','The in-demand model is on backorder and dealers are asking for faster delivery.','in-demand 型号处于 backorder 状态 dealer 在要求 faster delivery。',1,['channel','adjective'],'word');
    add('certified','adjective','认证过的','officially approved','Certification / Compliance / Market Access','market access','verify','The certified version ships with the CE and FCC logos on the packaging.','certified 版本附带包装上的 CE 和 FCC logos ship。',2,['channel','adjective'],'word');

    // Collocations (15+)
    add('sign a dealer','collocation','签经销商','recruit dealer','Channel Development / Partner Recruitment','partner recruitment','close','We signed a dealer in Germany who already sells to our target customer segment.','我们在德国 sign a dealer 已经在向我们的 target customer segment 销售。',2,['channel','collocation'],'phrase');
    add('set the margin','collocation','定利润空间','define margin','B2B Sales / Wholesale / Retail','negotiation','agree','We set the margin at thirty percent for the dealer and fifty percent for the retailer.','我们将 margin set 为 dealer 百分之三十 retailer 百分之五十。',2,['channel','collocation'],'phrase');
    add('offer a discount','collocation','提供折扣','give price cut','B2B Sales / Wholesale / Retail','sales','incentivize','We offered a discount on the first order to help the dealer get started.','我们在 first order 上 offer a discount 以帮助 dealer 起步。',1,['channel','collocation'],'phrase');
    add('attend a trade show','collocation','参加展会','go to exhibition','Trade Shows / Exhibitions / Demos','trade shows','participate','We attend a trade show every quarter to meet new buyers and showcase products.','我们每季度 attend a trade show 以结识新 buyer 并 showcase products。',1,['channel','collocation'],'phrase');
    add('set up a booth','collocation','搭建展位','build stand','Trade Shows / Exhibitions / Demos','trade shows','prepare','We set up a booth at IFA with live demos and product samples for visitors.','我们在 IFA set up a booth 有 live demos 和 product samples 供访客。',1,['channel','collocation'],'phrase');
    add('close a deal','collocation','成交','finalize sale','B2B Sales / Wholesale / Retail','sales','close','We closed a deal with a chain store for 1000 units to be delivered over three months.','我们与一家 chain store close a deal 1000 台分三个月交付。',2,['channel','collocation'],'phrase');
    add('negotiate the terms','collocation','谈判条款','discuss conditions','Channel Development / Partner Recruitment','partner negotiation','bargain','We negotiated the terms for three weeks before both sides were happy with the agreement.','我们 negotiate the terms 了三周双方才对 agreement 满意。',2,['channel','collocation'],'phrase');
    add('set a sales target','collocation','设定销售目标','define quota','B2B Sales / Wholesale / Retail','sales planning','plan','We set a sales target of 200 units per month for the first year of the agreement.','我们为 agreement 第一年 set a sales target 每月 200 台。',2,['channel','collocation'],'phrase');
    add('check the certification','collocation','检查认证','verify compliance','Certification / Compliance / Market Access','market access','verify','Check the certification requirements for each country before shipping the product there.','在向每个国家 ship 产品之前 check the certification requirements。',2,['channel','collocation'],'phrase');
    add('train the dealer','collocation','培训经销商','educate partner','Channel Development / Partner Recruitment','partner onboarding','support','We train the dealer on product features and common customer questions.','我们 train the dealer 关于产品功能和常见客户问题。',1,['channel','collocation'],'phrase');
    add('send a sample','collocation','寄样品','ship demo unit','Channel Development / Partner Recruitment','partner evaluation','provide','We sent a sample to the buyer and they placed an order within a week.','我们 send a sample 给 buyer 他们在一周内就下了订单。',1,['channel','collocation'],'phrase');
    add('quote a price','collocation','报价格','give price','B2B Sales / Wholesale / Retail','sales','respond','We quoted a price based on an annual volume of 5000 units with quarterly shipments.','我们基于年量 5000 台按季度 shipment quote a price。',2,['channel','collocation'],'phrase');
    add('set up distribution','collocation','建立分销','build channel','Channel Development / Partner Recruitment','market entry','build','We set up distribution in three European countries through local partners.','我们通过 local partners 在三个欧洲国家 set up distribution。',2,['channel','collocation'],'phrase');

    // Sentence patterns (15+)
    add('We are looking for local dealers in your country.','sentence_pattern','我们在贵国寻找本地经销商','dealer search','Channel Development / Partner Recruitment','prospecting','inquire','We are looking for local dealers in your country who already have retail channels.','我们在贵国寻找已有 retail channels 的 local dealers。',1,['channel','sentence_pattern'],'sentence_pattern');
    add('Can we start with a trial order first.','sentence_pattern','能先试单吗','trial proposal','B2B Sales / Wholesale / Retail','negotiation','propose','Can we start with a trial order first before committing to a larger minimum quantity.','在承诺更大的 minimum quantity 之前能先 start with a trial order 吗。',1,['channel','sentence_pattern'],'sentence_pattern');
    add('The dealer margin needs to be higher.','sentence_pattern','经销商利润率得更高','margin request','B2B Sales / Wholesale / Retail','negotiation','demand','The dealer margin needs to be higher or they cannot cover their marketing costs.','dealer margin 得更高否则他们无法 cover 其 marketing costs。',2,['channel','sentence_pattern'],'sentence_pattern');
    add('Do you need exclusive rights for your region.','sentence_pattern','贵区需要独家权吗','exclusivity ask','Channel Development / Partner Recruitment','partner negotiation','ask','Do you need exclusive rights for your region because that changes the minimum order.','贵区需要 exclusive rights 吗因为那会改变 minimum order。',2,['channel','sentence_pattern'],'sentence_pattern');
    add('We need local certification before we can sell there.','sentence_pattern','得先取得当地认证才能销售','certification need','Certification / Compliance / Market Access','market access','report','We need local certification before we can sell there and the process takes about two months.','我们需要 local certification 才能在那里销售这个过程大约需要两个月。',2,['channel','sentence_pattern'],'sentence_pattern');
    add('Can we get a better price for a larger order.','sentence_pattern','更大订单能有更好价格吗','price ask','B2B Sales / Wholesale / Retail','negotiation','ask','Can we get a better price for a larger order of five thousand units instead of one thousand.','五千台而不是一千台的更大订单能有 better price 吗。',1,['channel','sentence_pattern'],'sentence_pattern');
    add('How soon can you ship after we place an order.','sentence_pattern','下单后多久能发货','shipping ask','B2B Sales / Wholesale / Retail','negotiation','ask','How soon can you ship after we place an order because our retail season starts soon.','我们下单后多久能 ship 因为我们的 retail season 很快就要开始了。',1,['channel','sentence_pattern'],'sentence_pattern');
    add('The packaging needs to be in the local language.','sentence_pattern','包装需要本地语言','localization need','Certification / Compliance / Market Access','market access','report','The packaging needs to be in the local language or customs will not clear the shipment.','packaging 需要是 local language 否则海关不会 clear the shipment。',2,['channel','sentence_pattern'],'sentence_pattern');
    add('We can offer a display stand for your store.','sentence_pattern','可以给你的店提供展示架','display offer','B2B Sales / Wholesale / Retail','sales','offer','We can offer a display stand for your store to help customers find the product easily.','可以给你的店提供 display stand 以帮助客户轻松找到产品。',1,['channel','sentence_pattern'],'sentence_pattern');
    add('The shipping cost needs to be included in the quote.','sentence_pattern','运费需要包含在报价里','shipping inclusion','B2B Sales / Wholesale / Retail','negotiation','request','The shipping cost needs to be included in the quote so we know the total landed price.','shipping cost 需要包含在 quote 里这样我们才知道 total landed price。',1,['channel','sentence_pattern'],'sentence_pattern');
    add('What is your warranty policy for overseas dealers.','sentence_pattern','海外经销商的保修政策是什么','warranty ask','Channel Development / Partner Recruitment','partner negotiation','ask','What is your warranty policy for overseas dealers and how do you handle returns.','overseas dealers 的 warranty policy 是什么以及如何处理 returns。',2,['channel','sentence_pattern'],'sentence_pattern');
    add('We need a demo unit for the trade show next month.','sentence_pattern','下月展会的展示机','demo request','Trade Shows / Exhibitions / Demos','trade shows','request','We need a demo unit for the trade show next month to show to potential buyers.','我们需要下月 trade show 的 demo unit 以展示给 potential buyers。',1,['channel','sentence_pattern'],'sentence_pattern');

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
    if(data.length>=pack.target-50) st.packs[pack.id].status='core_ready';
  }
}
st.lastAction='Round 1: Generated items for AI PM, Robotics Maintenance, and Smart Hardware Core packs.';
fs.writeFileSync(stFile,JSON.stringify(st,null,2));

console.log('\n=== ROUND 1 COMPLETE ===');
console.log('Total items added across all packs:', totalAdded);
