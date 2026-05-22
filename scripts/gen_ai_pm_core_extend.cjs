const fs=require('fs');
const file='src/data/packs/ai-product-management-llm-products-1000.json';
const data=JSON.parse(fs.readFileSync(file,'utf-8'));
const existing=new Set(data.map(d=>d.term.toLowerCase()));

const newItems=[];let id=data.length+1,added=0,skipped=0;
function add(t,sm,sis,topic,stage,work,ex,ez,diff,tg,type,reg){
  if(existing.has(t.toLowerCase())){skipped++;return false;}
  existing.add(t.toLowerCase());
  newItems.push({id:'ai-product-management-llm-products-1000-'+String(id).padStart(4,'0'),packId:'ai-product-management-llm-products-1000',term:t,type:type||'word',topic,productStage:stage||'',workIntent:work||'',shortMeaning:sm,shortMeaningInSentence:sis,example:ex,exampleZh:ez,register:reg||'workplace',difficulty:diff||1,sourceType:'ai_product_style_original',sourceTitle:'Original AI product management learning sentence',sourceUrl:'',sourceDate:'',isRealSourceSentence:false,tags:tg||['ai-pm']});id++;added++;return true;
}
const terms=[
['user','用户','product user','AI Product Strategy / Use Case Discovery','discovery','understand','We need to talk to more users before deciding which feature to build next.','在决定下一步构建哪个功能之前我们需要和更多 user 交谈。',1,['ai-pm','basic']],
['feedback','反馈','user response','User Research / Customer Feedback','discovery','learn','The feedback from the beta programme showed that users want faster response times.','来自 beta programme 的 feedback 显示用户想要更快的响应时间。',1,['ai-pm','basic']],
['feature','功能','product capability','PRD / Requirement / Roadmap','requirement','define','Every feature we build needs to be tied to a clear user need not just a cool idea.','我们构建的每个 feature 都需要与明确的用户需求挂钩而不仅仅是一个很酷的想法。',1,['ai-pm','basic']],
['task','任务','unit of work','Agent / Workflow / Automation','design','automate','The agent should be able to complete a multi-step task without asking for confirmation at every turn.','agent 应该能够在每一步都不要求确认的情况下完成多步骤 task。',1,['ai-pm','basic']],
['workflow','工作流','sequence of steps','Agent / Workflow / Automation','design','design','The workflow for handling a customer refund needs a human approval step before the money is returned.','处理客户退款的 workflow 需要在退款之前有一个人工审批步骤。',1,['ai-pm','basic']],
['input','输入','what goes in','LLM Basics / Model Capabilities','design','understand','The input to the model includes the system prompt the conversation history and the latest user message.','模型的 input 包括系统提示对话历史和最新的用户消息。',1,['ai-pm','basic']],
['output','输出','what comes out','LLM Basics / Model Capabilities','evaluation','assess','We log every output so we can run evaluations later and track quality over time.','我们记录每个 output 以便以后运行评估并追踪质量随时间的变化。',1,['ai-pm','basic']],
['prompt','提示','model instruction','Prompt / Context / Instruction Design','design','craft','The prompt is too vague and the model keeps going off topic after the first few exchanges.','prompt 太模糊了模型在头几次交流后一直偏离主题。',1,['ai-pm','basic']],
['answer','回答','model response','UX / Conversation Design','evaluation','assess','The answer should be concise and directly address the question without unnecessary background.','answer 应该简洁直接回答问题没有不必要的背景信息。',1,['ai-pm','basic']],
['response','回复','model reply','UX / Conversation Design','design','craft','The response time is under one second for most simple queries which feels instant to the user.','大多数简单查询的 response 时间不到一秒对用户来说感觉是即时的。',1,['ai-pm','basic']],
['source','来源','origin document','RAG / Knowledge Base / Retrieval','implementation','cite','Each answer should include the source document so the user can verify the information.','每个 answer 都应该包含 source 文档这样用户可以核实信息。',1,['ai-pm','basic']],
['document','文档','file','RAG / Knowledge Base / Retrieval','implementation','process','Users can upload any document and the assistant will be able to answer questions about its content.','用户可以上传任何 document 助手将能够回答关于其内容的问题。',1,['ai-pm','basic']],
['file','文件','digital file','RAG / Knowledge Base / Retrieval','implementation','manage','The file upload should support PDF Word and plain text formats at a minimum.','file 上传至少应该支持 PDF Word 和纯文本格式。',1,['ai-pm','basic']],
['chat','聊天','conversation','UX / Conversation Design','design','design','The chat interface needs a clear distinction between user messages and assistant responses.','chat 界面需要在用户消息和助手 response 之间有清晰的区分。',1,['ai-pm','basic']],
['assistant','助手','AI helper','AI Product Strategy / Use Case Discovery','design','define','The assistant should be helpful honest and know when to say it does not know something.','assistant 应该乐于助人诚实并知道何时说自己不知道。',1,['ai-pm','basic']],
['model','模型','AI model','LLM Basics / Model Capabilities','design','understand','The model selection comes down to a trade-off between quality speed and cost per query.','model 选择归结为质量速度和每次查询成本之间的 trade-off。',1,['ai-pm','basic']],
['cost','成本','expense','Pricing / Token Cost / Monetization','growth','manage','The cost per query needs to stay under half a cent for the free tier to be sustainable.','每次查询的 cost 需要保持在半美分以下这样免费版才能持续。',1,['ai-pm','basic']],
['quality','质量','goodness','Evaluation / Quality / Benchmark','evaluation','measure','We track quality across five dimensions: accuracy relevance tone safety and completeness.','我们追踪五个维度的 quality：准确性相关性语气安全性和完整性。',1,['ai-pm','basic']],
['risk','风险','danger','Safety / Privacy / Compliance','risk review','assess','The main risk with the new feature is that it could generate misleading medical advice.','新 feature 的主要 risk 是它可能生成误导性的医疗建议。',1,['ai-pm','basic']],
['privacy','隐私','data protection','Safety / Privacy / Compliance','risk review','protect','Privacy is not just a legal requirement it is something our users deeply care about.','privacy 不仅是法律要求也是我们用户深切关心的事情。',1,['ai-pm','basic']],
['plan','计划','strategy','PRD / Requirement / Roadmap','requirement','organise','The product plan for Q3 includes improving the RAG pipeline and launching the API.','Q3 的 product plan 包括改进 RAG pipeline 和推出 API。',1,['ai-pm','basic']],
['test','测试','evaluate','Evaluation / Quality / Benchmark','evaluation','verify','We test every model update against a fixed set of 200 questions before rolling it out.','我们在推出之前 test 每个模型更新对照 200 个固定问题。',1,['ai-pm','basic']],
['usage','使用量','consumption','Data / Analytics / Product Metrics','growth','track','The usage data shows that most teams run between ten and fifty queries per day.','usage 数据显示大多数团队每天运行十到五十次查询。',1,['ai-pm','basic']],
['limit','限制','cap','Pricing / Token Cost / Monetization','growth','control','We set a limit of one thousand queries per month for the free tier to manage costs.','我们把免费版的 limit 设为每月一千次查询以管理成本。',1,['ai-pm','basic']],
['team','团队','group','Launch / GTM / Customer Success','customer success','organise','Each enterprise team gets a dedicated onboarding session with a solutions engineer.','每个企业 team 都会获得与解决方案工程师的专属 onboarding session。',1,['ai-pm','basic']],
['role','角色','permission level','UX / Conversation Design','design','manage access','The admin role can manage billing and team members while the user role can only chat.','admin role 可以管理 billing 和 team member 而 user role 只能聊天。',1,['ai-pm','basic']],
['permission','权限','access right','UX / Conversation Design','design','control access','We added permission levels so that managers can see team usage but not individual conversations.','我们添加了 permission level 以便 managers 可以看到团队 usage 但不能看到个人对话。',1,['ai-pm','basic']],
['beta','测试版','pre-release','Launch / GTM / Customer Success','launch','test','The beta version has been stable for two weeks and we are preparing for the public launch.','beta version 已经稳定运行了两周我们正在准备公开发布。',1,['ai-pm','basic']],
['demo','演示','demonstration','Launch / GTM / Customer Success','launch','showcase','The demo shows the assistant answering a complex multi-step question in under ten seconds.','demo 展示了助手在不到十秒内回答一个复杂的多步骤问题。',1,['ai-pm','basic']],
['support','支持','help','Launch / GTM / Customer Success','customer success','help','Our support team answers most questions within two hours during business days.','我们的 support team 在工作日两小时内回答大多数问题。',1,['ai-pm','basic']],
];for(const t of terms)add(t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8],t[9],t[10]);
const updated=data.concat(newItems);
fs.writeFileSync(file,JSON.stringify(updated));
console.log('AI PM Extend: Added',added,'| Skipped:',skipped,'| Total:',updated.length);
