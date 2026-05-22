// round3_final_cleanup.cjs
// Round 3: Final Cleanup. Do NOT generate new items.
// Cleans FT 1000->~700, RD 707->~500, light fix on others.
// Requires backup at backups/final-cleanup/

const fs=require('fs'),path=require('path');

// Verify backup
const backupDir='backups/final-cleanup';
if(!fs.existsSync(backupDir)){console.error('BACKUP MISSING. Aborting.');process.exit(1);}
console.log('Backup verified at',backupDir,'\n');

const report=[];
let totalRemoved=0,totalFixed=0;

function log(msg){console.log(msg);report.push(msg);}

// =====================================================
// FOREIGN TRADE DTC: 1000 -> ~700
// =====================================================
log('\n=== FOREIGN TRADE DTC CLEANUP ===');
{
  const file='src/data/packs/foreign-trade-crowdfunding-dtc-operations-1000.json';
  let data=JSON.parse(fs.readFileSync(file,'utf-8'));
  const before=data.length;
  let removed=0;

  // Heuristics to identify low-quality items
  const toRemove=new Set();

  data.forEach((item,i)=>{
    const sm=item.shortMeaning||'';
    const sis=item.shortMeaningInSentence||'';
    const ez=item.exampleZh||'';
    const ex=item.example||'';
    const t=item.term.toLowerCase();

    // 1. Mechanical compound: shortMeaning starts with 业务
    if(/^业务/.test(sm) && sis==='business term'){
      toRemove.add(i);
    }
    // 2. Placeholder sis
    else if(sis==='business term'||sis==='generic term'){
      toRemove.add(i);
    }
    // 3. Detected mechanical compounds by term pattern
    else if(/^(email|payment|warehouse|customs|freight|factory|supplier|order|shipping|delivery)\s+(report|check|note|log|policy|update|review|delay|estimate|tracker|ticket|alert|timeline)$/i.test(t)){
      // Check if this is a known genuine term (keep those)
      const keepers=['shipping timeline','delivery estimate','order tracking','supplier audit','warehouse capacity','payment terms','email automation','shipping policy','delivery update'];
      if(!keepers.some(k=>k.toLowerCase()===t)){
        toRemove.add(i);
      }
    }
    // 4. Items where exampleZh has >10 extra English words (extremely high)
    else if(false){ // Disabled - don't delete based on extraEn alone
    }
    // 5. Term is too generic: single common word with no DTC value
    //    Keep known good single-word terms
    else if(/^(update|report|check|note|log|review|confirm|process|manage|track|monitor|record)$/i.test(t)){
      // Only remove if the example doesn't demonstrate clear DTC context
      if(!/(backer|campaign|pledge|shopify|checkout|customer|fulfillment|supplier|warehouse|ship|import|duty|tax|custom|retail|dealer|channel|ad|email|crm|inventory|logistic|dtc|ecommerce)/i.test(ex)){
        toRemove.add(i);
      }
    }
  });

  log('FT items flagged for removal: '+toRemove.size);
  log('FT items removed: '+[...toRemove].length);

  if(toRemove.size>0){
    // Remove items (highest index first to avoid index shifting)
    const sorted=[...toRemove].sort((a,b)=>b-a);
    const removedItems=[];
    for(const idx of sorted){
      removedItems.push(data[idx].term);
      data.splice(idx,1);
      removed++;
    }
    log('Removed terms: '+removedItems.join(', ').slice(0,500)+'...');

    // After programmatic removal, if still above ~720, remove more based on exampleEn warnings
    // We'll do this by removing items with the highest extraEn count
    if(data.length > 750){
      log('Still over target (750), removing additional low-quality items...');
      // Calculate quality score per item (lower = worse)
      const scored=data.map((item,i)=>{
        let score=0;
        const ez=item.exampleZh||'';
        const ex=item.example||'';
        const sm=item.shortMeaning||'';
        const sis=item.shortMeaningInSentence||'';
        // Penalize long examples
        const wc=ex.trim().split(/\s+/).length;
        if(wc>20) score-=3;
        else if(wc>18) score-=1;
        // Penalize short meaningless sis
        if(sis.length<4) score-=2;
        if(sis===sm) score-=3;
        // Penalize very generic shortMeaning
        if(sm.length<2) score-=2;
        // Reward items with fullForm (abbreviations are valuable)
        if(item.fullForm) score+=2;
        // Reward higher difficulty (more learning value)
        score+=(item.difficulty||2)-2;
        // Reward items with specific tags
        if(item.tags && item.tags.length>2) score+=1;
        return {i,score,term:item.term};
      });
      scored.sort((a,b)=>a.score-b.score);
      // Remove the worst items to get to ~720
      const toRemoveExtra=data.length-720;
      log('Removing '+toRemoveExtra+' lowest-scored items...');
      const extraRemoveSet=new Set();
      for(let j=0;j<toRemoveExtra&&j<scored.length;j++){
        extraRemoveSet.add(scored[j].i);
      }
      const extraSorted=[...extraRemoveSet].sort((a,b)=>b-a);
      for(const idx of extraSorted){
        data.splice(idx,1);
        removed++;
        totalRemoved++;
      }
    }

    fs.writeFileSync(file,JSON.stringify(data));
    log('FT: '+before+' -> '+data.length+' (removed '+removed+')');
  } else {
    log('FT: no obvious low-quality patterns found. Manual review needed.');
  }
}

// =====================================================
// ROBOTICS R&D: 707 -> ~500
// =====================================================
log('\n=== ROBOTICS R&D CLEANUP ===');
{
  const file='src/data/packs/robotics-rd-engineering-research-1000.json';
  let data=JSON.parse(fs.readFileSync(file,'utf-8'));
  const before=data.length;
  let removed=0;
  const toRemove=new Set();

  data.forEach((item,i)=>{
    const sm=item.shortMeaning||'';
    const sis=item.shortMeaningInSentence||'';
    const ez=item.exampleZh||'';
    const ex=item.example||'';
    const t=item.term.toLowerCase();

    // 1. Mechanical compounds: shortMeaning starts with 业务
    if(/^业务/.test(sm) && sis==='business term'){
      toRemove.add(i);
    }
    // 2. Placeholder sis
    else if(sis==='business term'||sis==='generic term'||/ (related|term)$/.test(sis)){
      toRemove.add(i);
    }
    // 3. Generated mechanical compound patterns for robotics
    else if(/^(loop|map|path|node|sensor|planner|controller|trajectory|pose|scan|cloud|filter|frame|joint|motor|drive|encoder|imu|lidar|camera)\s+(report|check|note|log|policy|update|review|error|delay|offset|tracker|ticket|alert|timeline|schedule|estimate|summary)$/i.test(t)){
      // Keep known genuine terms
      const keepers=['loop closure','path smoothing','sensor fusion','joint limit','joint trajectory','motor driver','encoder resolution','frame rate','pose estimate','pose array','scan matching','filter chain','point cloud','cloud map','imu frame','camera info','controller update','planner delay','map frame','map server','trajectory rollout','drive system'];
      if(!keepers.some(k=>k.toLowerCase()===t)){
        toRemove.add(i);
      }
    }
    // 4. Very short example that provides no learning value
    else if(ex.trim().split(/\s+/).length<4 && item.difficulty===1 && !item.fullForm){
      toRemove.add(i);
    }
  });

  log('RD items flagged for removal: '+toRemove.size);

  if(toRemove.size>0){
    const sorted=[...toRemove].sort((a,b)=>b-a);
    const removedTerms=[];
    for(const idx of sorted){
      removedTerms.push(data[idx].term);
      data.splice(idx,1);
      removed++;
    }

    // If still above 550, remove additional low-quality items
    if(data.length>550){
      log('Still above 550, removing extra items...');
      const scored=data.map((item,i)=>{
        let score=0;
        const ez=item.exampleZh||'';
        const ex=item.example||'';
        const sm=item.shortMeaning||'';
        const sis=item.shortMeaningInSentence||'';
        const wc=ex.trim().split(/\s+/).length;
        if(wc>22) score-=3;
        else if(wc>18) score-=1;
        if(sis.length<4) score-=2;
        if(sis===sm) score-=3;
        if(sm.length<2) score-=2;
        if(item.fullForm) score+=2;
        if(item.partOfSpeech && !['noun','noun_phrase'].includes(item.partOfSpeech)) score+=1; // value POS diversity
        if(item.tags && item.tags.length>2) score+=1;
        return {i,score,term:item.term};
      });
      scored.sort((a,b)=>a.score-b.score);
      const toRemoveExtra=data.length-520;
      const extraSet=new Set();
      for(let j=0;j<toRemoveExtra&&j<scored.length;j++) extraSet.add(scored[j].i);
      const extraSorted=[...extraSet].sort((a,b)=>b-a);
      for(const idx of extraSorted){
        data.splice(idx,1);
        removed++;
        totalRemoved++;
      }
    }

    log('RD removed terms: '+removedTerms.join(', ').slice(0,500)+'...');
    fs.writeFileSync(file,JSON.stringify(data));
    log('RD: '+before+' -> '+data.length+' (removed '+removed+')');
  } else {
    log('RD: no obvious low-quality patterns found.');
  }
}

// =====================================================
// IELTS: Light quality review only (no deletions)
// =====================================================
log('\n=== IELTS CORE LIGHT REVIEW ===');
{
  const file='src/data/packs/ielts-exam-context-2000.json';
  let data=JSON.parse(fs.readFileSync(file,'utf-8'));
  let fixed=0;

  // Fix: missing fullForm for known abbreviations
  const knownFullForms={
    'GDP':'Gross Domestic Product','GNP':'Gross National Product','UN':'United Nations',
    'WHO':'World Health Organization','NGO':'Non-Governmental Organization',
    'EU':'European Union','CO2':'Carbon Dioxide','AI':'Artificial Intelligence',
    'IT':'Information Technology','ICT':'Information and Communication Technology',
    'VR':'Virtual Reality','AR':'Augmented Reality','EV':'Electric Vehicle',
    'CCTV':'Closed-Circuit Television','R&D':'Research and Development',
    'IELTS':'International English Language Testing System',
    'TOEFL':'Test of English as a Foreign Language',
    'STEM':'Science, Technology, Engineering and Mathematics'
  };

  data.forEach(item=>{
    if(!item.fullForm&&item.term&&knownFullForms[item.term]){
      item.fullForm=knownFullForms[item.term];
      fixed++;
    }
  });

  if(fixed>0){
    fs.writeFileSync(file,JSON.stringify(data));
    log('IELTS: fixed '+fixed+' missing fullForms. No deletions.');
  } else {
    log('IELTS: no changes needed.');
  }
}

// =====================================================
// AI PM: Light fix only
// =====================================================
log('\n=== AI PM CORE LIGHT FIX ===');
{
  const file='src/data/packs/ai-product-management-llm-products-1000.json';
  const data=JSON.parse(fs.readFileSync(file,'utf-8'));
  let fixed=0;

  // Fix shortMeaningInSentence that's too long (>12 words)
  data.forEach(item=>{
    if(item.shortMeaningInSentence&&item.shortMeaningInSentence.trim().split(/\s+/).length>12){
      // Truncate to first 8 words
      item.shortMeaningInSentence=item.shortMeaningInSentence.trim().split(/\s+/).slice(0,8).join(' ');
      fixed++;
    }
  });

  // Fix missing fullForm
  const ff={'RLHF':'Reinforcement Learning from Human Feedback','SLA':'Service Level Agreement','SOC 2':'System and Organization Controls 2','GDPR':'General Data Protection Regulation'};
  data.forEach(item=>{
    if(!item.fullForm&&item.term&&ff[item.term]){
      item.fullForm=ff[item.term];
      fixed++;
    }
  });

  fs.writeFileSync(file,JSON.stringify(data));
  log('AI PM: fixed '+fixed+' items (no deletions).');
}

// =====================================================
// ROBOTICS MAINTENANCE: Light fix only
// =====================================================
log('\n=== ROBOTICS MAINTENANCE LIGHT FIX ===');
{
  const file='src/data/packs/robotics-maintenance-troubleshooting-1000.json';
  const data=JSON.parse(fs.readFileSync(file,'utf-8'));
  let fixed=0;

  data.forEach(item=>{
    if(item.shortMeaningInSentence&&item.shortMeaningInSentence.trim().split(/\s+/).length>12){
      item.shortMeaningInSentence=item.shortMeaningInSentence.trim().split(/\s+/).slice(0,8).join(' ');
      fixed++;
    }
  });

  fs.writeFileSync(file,JSON.stringify(data));
  log('Robotics Maint: fixed '+fixed+' items (no deletions).');
}

// =====================================================
// SMART HW: Light fix only
// =====================================================
log('\n=== SMART HW LIGHT FIX ===');
{
  const file='src/data/packs/smart-hardware-overseas-channel-sales-core.json';
  const data=JSON.parse(fs.readFileSync(file,'utf-8'));
  let fixed=0;

  data.forEach(item=>{
    if(item.shortMeaningInSentence&&item.shortMeaningInSentence.trim().split(/\s+/).length>12){
      item.shortMeaningInSentence=item.shortMeaningInSentence.trim().split(/\s+/).slice(0,8).join(' ');
      fixed++;
    }
  });

  fs.writeFileSync(file,JSON.stringify(data));
  log('Smart HW: fixed '+fixed+' items (no deletions).');
}

// =====================================================
// UPDATE METADATA
// =====================================================
log('\n=== UPDATING METADATA ===');

// Update packs.ts
const packsFile='src/data/packs.ts';
let pc=fs.readFileSync(packsFile,'utf-8');
const packIds=[
  'foreign-trade-crowdfunding-dtc-operations-1000',
  'robotics-rd-engineering-research-1000',
  'ielts-exam-context-2000',
  'ai-product-management-llm-products-1000',
  'robotics-maintenance-troubleshooting-1000',
  'smart-hardware-overseas-channel-sales-core'
];
for(const pid of packIds){
  const data=JSON.parse(fs.readFileSync('src/data/packs/'+pid+'.json','utf-8'));
  pc=pc.replace(new RegExp('(\''+pid+'\'[\\s\\S]*?total:\\s*)\\d+'),(_,pre)=>pre+data.length);
}
fs.writeFileSync(packsFile,pc);
log('packs.ts updated.');

// Update status
const stFile='docs/WORD_PACK_GENERATION_STATUS.json';
const st=JSON.parse(fs.readFileSync(stFile,'utf-8'));
for(const pid of packIds){
  if(st.packs[pid]){
    const data=JSON.parse(fs.readFileSync('src/data/packs/'+pid+'.json','utf-8'));
    st.packs[pid].current=data.length;
  }
}
// Mark cleaned packs
if(st.packs['foreign-trade-crowdfunding-dtc-operations-1000']) st.packs['foreign-trade-crowdfunding-dtc-operations-1000'].status='core_ready';
if(st.packs['robotics-rd-engineering-research-1000']) st.packs['robotics-rd-engineering-research-1000'].status='core_ready';
st.lastAction='Round 3 cleanup complete.';
st.lastValidatePassed=null; // will update after validation
st.lastBuildPassed=null;
fs.writeFileSync(stFile,JSON.stringify(st,null,2));
log('Status file updated.');

// Generate report file
const reportContent=['# Round 3 Cleanup Report\n',...report].join('\n');
fs.writeFileSync('docs/ROUND3_CLEANUP_REPORT.md',reportContent);
log('\nReport saved to docs/ROUND3_CLEANUP_REPORT.md');

log('\n=== ROUND 3 CLEANUP COMPLETE ===');
log('Run: npm run validate:packs && npm run build');
