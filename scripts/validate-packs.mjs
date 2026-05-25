import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = resolve(__dirname, '..', 'src', 'data', 'packs');

const VALID_TYPES = new Set([
  'word',
  'phrase',
  'collocation',
  'sentence_pattern',
  'verb',
  'phrasal_verb',
]);

const PACKS = [
  { file: 'ielts-exam-context-2000.json', packId: 'ielts-exam-context-2000' },
  { file: 'robotics-maintenance-troubleshooting-1000.json', packId: 'robotics-maintenance-troubleshooting-1000' },
  { file: 'foreign-trade-crowdfunding-dtc-operations-1000.json', packId: 'foreign-trade-crowdfunding-dtc-operations-1000' },
  { file: 'robotics-rd-engineering-research-1000.json', packId: 'robotics-rd-engineering-research-1000' },
  { file: 'ai-product-management-llm-products-1000.json', packId: 'ai-product-management-llm-products-1000' },
  { file: 'smart-hardware-overseas-channel-sales-core.json', packId: 'smart-hardware-overseas-channel-sales-core' },
];

const REQUIRED = [
  'id', 'packId', 'term', 'type', 'topic',
  'shortMeaning', 'shortMeaningInSentence',
  'example', 'exampleZh', 'difficulty', 'tags',
];

const CN_RE = /[一-鿿]/;

/**
 * @param {string} term
 * @param {string} exampleZh
 */
function exampleContainsTerm(term, exampleZh) {
  const termLower = term.toLowerCase();
  const zhLower = exampleZh.toLowerCase();
  if (term.includes(' ') || term.includes('-')) {
    return zhLower.includes(termLower);
  }
  const escaped = termLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|[^a-z])${escaped}($|[^a-z])`, 'i').test(exampleZh);
}

/**
 * Normalize exampleZh by replacing the term with __TERM__ for template detection.
 */
function normalizeExampleZh(exampleZh, term) {
  if (!term || !exampleZh) return exampleZh;
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return exampleZh.replace(new RegExp(escaped, 'gi'), '__TERM__');
}

/**
 * Check if a term looks like an abbreviation that might need a fullForm.
 * Simple heuristic: 2-8 chars, contains uppercase, mostly uppercase/digits/hyphens.
 */
function looksLikeAbbreviation(term) {
  if (!term || term.length < 2 || term.length > 16) return false;
  // All-uppercase with optional digits/hyphens/slashes/ampersands/spaces: GDP, CO2, R&D, RGB-D, 3PL, GDP per capita
  if (/^[A-Z0-9\-\/&\.\s]+$/.test(term) && /[A-Z]/.test(term)) return true;
  // Mixed case tech abbreviations: QoS, iOS (one uppercase, then lowercase, then uppercase)
  if (/^[A-Z][a-z]+[A-Z]/.test(term)) return true;
  // Contains & as abbreviation marker: R&D
  if (term.includes('&')) return true;
  return false;
}

let totalErrors = 0;
let totalWarnings = 0;

for (const { file, packId } of PACKS) {
  const filePath = resolve(DATA_DIR, file);
  let raw;
  try {
    raw = readFileSync(filePath, 'utf-8');
  } catch {
    console.log(`${file}: FILE NOT FOUND — skipped`);
    totalErrors++;
    continue;
  }

  /** @type {any[]} */
  let items;
  try {
    items = JSON.parse(raw);
  } catch {
    console.log(`${file}: INVALID JSON`);
    totalErrors++;
    continue;
  }

  if (!Array.isArray(items)) {
    console.log(`${file}: root must be an array`);
    totalErrors++;
    continue;
  }

  const ids = new Set();
  const topics = new Set();
  let errors = 0;
  let cnSisErrors = 0;
  let sisEqualsMeaning = 0;
  let missingTermErrors = 0;
  let fullFormErrors = 0;
  let missingFullFormWarnings = 0;
  let longExampleWarnings = 0;
  let tooLongExampleErrors = 0;
  let longSISWarnings = 0;
  let tooLongSISErrors = 0;
  let extraEnglishInZhWarnings = 0;
  let mechanicalCompoundWarnings = 0;
  let posImbalanceWarnings = 0;
  const templateMap = new Map(); // normalizedZh -> [ids]
  let nounCount = 0, totalPosItems = 0;

  const isIelts = packId.includes('ielts');

  // Allowlist for English in exampleZh
  const EN_ALLOWLIST = new Set([
    'shopify','kickstarter','indiegogo','meta ads','google ads','klaviyo','mailchimp',
    'amazon','paypal','stripe','crm','3pl','moq','roas','cpc','ctr','cpa','aov',
    'ddp','fob','cif','exw','hs code','ros2','nav2','moveit2','gazebo',
    'ros2_control','tf','qos','slam','lidar','imu','github',
    'woocommerce','shopify','facebook','instagram','tiktok','youtube',
    'sku','bom','po','eta','oem','odm','fda','iso','rohs','ce','ul','fcc',
    'ups','fedex','dhl','usps','d2c','dtc','btob','btoc',
    'cpf','cpl','cpm','cps','ltv','roi','kpi','npv','irr',
    'zendesk','gorgias','recharge','shipstation','afterpay',
    'ios','android','api','sdk','ux','ui','seo','sem',
    'ai','llm','gpt','rag','api','saas','prd','mvp',
    'mppi','ekf','icp','rms','pid','imu','tof','fov',
    'rviz','rviz2','urdf','xacro','sdf',
  ]);

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const prefix = `  [${i}]`;

    // Check required fields
    for (const key of REQUIRED) {
      if (item[key] === undefined || item[key] === null) {
        console.log(`${file}${prefix}: missing required field "${key}"`);
        errors++;
      }
    }

    // id must be unique
    if (typeof item.id === 'string' && item.id) {
      if (ids.has(item.id)) {
        console.log(`${file}${prefix}: duplicate id "${item.id}"`);
        errors++;
      }
      ids.add(item.id);
    }

    // packId must match
    if (item.packId !== packId) {
      console.log(`${file}${prefix}: packId "${item.packId}" !== expected "${packId}"`);
      errors++;
    }

    // type validation
    if (typeof item.type === 'string' && !VALID_TYPES.has(item.type)) {
      console.log(`${file}${prefix}: invalid type "${item.type}", must be one of ${[...VALID_TYPES].join(', ')}`);
      errors++;
    }

    // difficulty must be 1-5
    if (
      typeof item.difficulty !== 'number' ||
      item.difficulty < 1 || item.difficulty > 5 ||
      !Number.isInteger(item.difficulty)
    ) {
      console.log(`${file}${prefix}: difficulty must be integer 1-5, got "${item.difficulty}"`);
      errors++;
    }

    // tags must be array
    if (!Array.isArray(item.tags)) {
      console.log(`${file}${prefix}: tags must be an array`);
      errors++;
    }

    // === fullForm validation ===
    if (item.fullForm !== undefined && item.fullForm !== null) {
      if (typeof item.fullForm !== 'string') {
        console.log(`${file}${prefix}: fullForm must be a string`);
        errors++;
        fullFormErrors++;
      } else {
        if (item.fullForm.trim() === '') {
          console.log(`${file}${prefix}: fullForm must not be empty`);
          errors++;
          fullFormErrors++;
        }
        if (CN_RE.test(item.fullForm)) {
          console.log(`${file}${prefix}: fullForm contains Chinese: "${item.fullForm}"`);
          errors++;
          fullFormErrors++;
        }
        if (item.fullForm === item.term) {
          console.log(`${file}${prefix}: fullForm equals term ("${item.term}")`);
          errors++;
          fullFormErrors++;
        }
        if (item.fullForm === item.shortMeaning) {
          console.log(`${file}${prefix}: fullForm equals shortMeaning ("${item.shortMeaning}")`);
          errors++;
          fullFormErrors++;
        }
        if (item.fullForm === item.shortMeaningInSentence) {
          console.log(`${file}${prefix}: fullForm equals shortMeaningInSentence`);
          errors++;
          fullFormErrors++;
        }
      }
    } else if (typeof item.term === 'string' && looksLikeAbbreviation(item.term)) {
      console.log(`  ⚠ ${file}${prefix}: term "${item.term}" looks like an abbreviation but has no fullForm`);
      missingFullFormWarnings++;
      totalWarnings++;
    }

    // === NEW: shortMeaningInSentence must NOT contain Chinese ===
    if (typeof item.shortMeaningInSentence === 'string') {
      if (CN_RE.test(item.shortMeaningInSentence)) {
        console.log(`${file}${prefix}: shortMeaningInSentence contains Chinese: "${item.shortMeaningInSentence}"`);
        errors++;
        cnSisErrors++;
      }
      // Must not equal shortMeaning
      if (item.shortMeaningInSentence === item.shortMeaning) {
        console.log(`${file}${prefix}: shortMeaningInSentence equals shortMeaning ("${item.shortMeaning}")`);
        errors++;
        sisEqualsMeaning++;
      }
      // Must not equal fullForm
      if (typeof item.fullForm === 'string' && item.shortMeaningInSentence === item.fullForm) {
        console.log(`${file}${prefix}: shortMeaningInSentence equals fullForm ("${item.fullForm}")`);
        errors++;
        sisEqualsMeaning++;
      }
      // Word count checks
      const sisWordCount = item.shortMeaningInSentence.trim().split(/\s+/).filter(w => w.length > 0).length;
      if (sisWordCount > 12) {
        console.log(`${file}${prefix}: shortMeaningInSentence too long (${sisWordCount} words, max 12)`);
        errors++;
        tooLongSISErrors++;
      } else if (sisWordCount > 8) {
        console.log(`  ⚠ ${file}${prefix}: shortMeaningInSentence is long (${sisWordCount} words, aim under 8)`);
        longSISWarnings++;
        totalWarnings++;
      }
    }

    // === example length check (strict for non-IELTS) ===
    if (typeof item.example === 'string') {
      const wordCount = item.example.trim().split(/\s+/).filter(w => w.length > 0).length;
      if (!isIelts) {
        if (wordCount > 24) {
          console.log(`${file}${prefix}: example is too long (${wordCount} words, max 24)`);
          errors++;
          tooLongExampleErrors++;
        } else if (wordCount > 18) {
          console.log(`  ⚠ ${file}${prefix}: example is long (${wordCount} words, aim under 18)`);
          longExampleWarnings++;
          totalWarnings++;
        }
      }
    }

    // === exampleZh extra English check (non-IELTS only, warning) ===
    if (!isIelts && typeof item.exampleZh === 'string' && typeof item.term === 'string') {
      const termWords = new Set(item.term.toLowerCase().split(/\s+/));
      const fullFormWords = item.fullForm ? new Set(item.fullForm.toLowerCase().split(/\s+/)) : new Set();
      const zhWords = item.exampleZh.split(/[\s,，。、；！？：（）\(\)\[\]【】""''\-\/]+/);
      let extra = 0;
      for (const w of zhWords) {
        if (!w || /[一-鿿]/.test(w)) continue;
        const lw = w.toLowerCase();
        if (termWords.has(lw)) continue;
        if (fullFormWords.has(lw)) continue;
        if (EN_ALLOWLIST.has(lw)) continue;
        extra++;
      }
      if (extra > 3) {
        console.log(`  ⚠ ${file}${prefix}: exampleZh has ${extra} extra English words (only term + allowlist expected)`);
        extraEnglishInZhWarnings++;
        totalWarnings++;
      }
    }

    // === Mechanical compound detection ===
    const sm=item.shortMeaning||'';
    const sis=item.shortMeaningInSentence||'';
    if(/^业务/.test(sm)&&sis==='business term'){console.log(`  ⚠ ${file}${prefix}: mechanical placeholder (shortMeaning="${sm}", sis="business term")`);mechanicalCompoundWarnings++;totalWarnings++}
    else if(/^业务[A-Za-z]/.test(sm)){console.log(`  ⚠ ${file}${prefix}: likely mechanical compound (shortMeaning="${sm}")`);mechanicalCompoundWarnings++;totalWarnings++}
    else if(sis==='business term'||sis==='generic term'||/ (related|term)$/.test(sis)){console.log(`  ⚠ ${file}${prefix}: placeholder shortMeaningInSentence ("${sis}")`);mechanicalCompoundWarnings++;totalWarnings++}

    // === partOfSpeech validation ===
    const VALID_POS=['noun','noun_phrase','verb','phrasal_verb','adjective','adverb','collocation','sentence_pattern','abbreviation','technical_term'];
    if(item.partOfSpeech!==undefined&&item.partOfSpeech!==null){
      if(!VALID_POS.includes(item.partOfSpeech)){console.log(`${file}${prefix}: invalid partOfSpeech "${item.partOfSpeech}"`);errors++}
    }

    // === exampleZh must contain term ===
    if (typeof item.term === 'string' && typeof item.exampleZh === 'string') {
      if (!exampleContainsTerm(item.term, item.exampleZh)) {
        console.log(`${file}${prefix}: exampleZh does not contain term "${item.term}"`);
        errors++;
        missingTermErrors++;
      }
      // Build template map
      const normalized = normalizeExampleZh(item.exampleZh, item.term);
      if (!templateMap.has(normalized)) templateMap.set(normalized, []);
      templateMap.get(normalized).push(item.id);
    }

    // Collect topics
    if (typeof item.topic === 'string') {
      topics.add(item.topic);
    }

    // Track POS
    if (typeof item.partOfSpeech === 'string') {
      totalPosItems++;
      if (['noun','noun_phrase','technical_term','abbreviation'].includes(item.partOfSpeech)) nounCount++;
    }
  }
  if (totalPosItems > 10 && nounCount / totalPosItems > 0.7) {
    console.log(`  ⚠ ${file}: POS imbalance — ${nounCount}/${totalPosItems} (${Math.round(nounCount/totalPosItems*100)}%) are noun types`);
    posImbalanceWarnings++;
    totalWarnings++;
  }

  // === robotics-rd strict source checks (Sourced Core) ===
  const isRd = packId === 'robotics-rd-engineering-research-1000';
  if (isRd) {
    let rdSourceErrors = 0;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const prefix = `  [${i}]`;

      if (!item.sourceUrl || item.sourceUrl.trim() === '') {
        console.log(`${file}${prefix}: MISSING sourceUrl (required for robotics-rd Sourced Core)`);
        errors++;
        rdSourceErrors++;
      }
      if (!item.sourceTitle || item.sourceTitle.trim() === '') {
        console.log(`${file}${prefix}: MISSING sourceTitle (required for robotics-rd Sourced Core)`);
        errors++;
        rdSourceErrors++;
      }
      if (!item.sourceQuality) {
        console.log(`${file}${prefix}: MISSING sourceQuality (required for robotics-rd Sourced Core)`);
        errors++;
        rdSourceErrors++;
      }
      if (item.sourceChecked !== true) {
        console.log(`${file}${prefix}: sourceChecked must be true (required for robotics-rd Sourced Core)`);
        errors++;
        rdSourceErrors++;
      }
      if (!item.sourceEvidence || item.sourceEvidence.trim() === '') {
        console.log(`${file}${prefix}: MISSING sourceEvidence (required for robotics-rd Sourced Core)`);
        errors++;
        rdSourceErrors++;
      }
      if (!item.exampleSourceMode || !['verbatim_short_excerpt', 'source_grounded_rewrite'].includes(item.exampleSourceMode)) {
        console.log(`${file}${prefix}: exampleSourceMode must be verbatim_short_excerpt or source_grounded_rewrite, got "${item.exampleSourceMode}"`);
        errors++;
        rdSourceErrors++;
      }
      if (item.exampleSourceMode === 'verbatim_short_excerpt' && item.isRealSourceSentence !== true) {
        console.log(`${file}${prefix}: exampleSourceMode is verbatim_short_excerpt but isRealSourceSentence is not true`);
        errors++;
        rdSourceErrors++;
      }
      if (item.exampleSourceMode === 'source_grounded_rewrite' && item.isRealSourceSentence !== false) {
        console.log(`${file}${prefix}: exampleSourceMode is source_grounded_rewrite but isRealSourceSentence is not false`);
        errors++;
        rdSourceErrors++;
      }
      if (item.sourceType === 'robotics_rd_style_original') {
        console.log(`${file}${prefix}: sourceType is robotics_rd_style_original (banned for robotics-rd Sourced Core)`);
        errors++;
        rdSourceErrors++;
      }
      // example must contain the term or core of the term
      if (typeof item.example === 'string' && typeof item.term === 'string') {
        if (!exampleContainsTerm(item.term, item.example)) {
          console.log(`${file}${prefix}: example does not contain term "${item.term}"`);
          errors++;
          rdSourceErrors++;
        }
      }
    }
    if (rdSourceErrors > 0) {
      console.log(`\n  robotics-rd source check: ${rdSourceErrors} errors found`);
    }
  }

  // === Template duplication warnings ===
  let dupWarnings = 0;
  for (const [template, dupIds] of templateMap) {
    if (dupIds.length >= 3) {
      console.log(`\n  ⚠ WARNING: ${dupIds.length} items share the same exampleZh template:`);
      console.log(`    Template: "${template}"`);
      console.log(`    IDs: ${dupIds.join(', ')}`);
      dupWarnings++;
      totalWarnings++;
    }
  }

  const catSummary = [
    `cnSIS=${cnSisErrors}`,
    `sisEqMean=${sisEqualsMeaning}`,
    `missTerm=${missingTermErrors}`,
    `templates=${dupWarnings}`,
    `fullFormErr=${fullFormErrors}`,
    `missFF=${missingFullFormWarnings}`,
    `longExWarn=${longExampleWarnings}`,
    `longExErr=${tooLongExampleErrors}`,
    `longSISWarn=${longSISWarnings}`,
    `longSISErr=${tooLongSISErrors}`,
    `extraEn=${extraEnglishInZhWarnings}`,
    `mechCmp=${mechanicalCompoundWarnings}`,
    `posBal=${posImbalanceWarnings}`,
  ].join(', ');

  if (errors > 0) {
    totalErrors += errors;
    console.log(`\n${file}: ${items.length} items, ${topics.size} topics, ${errors} errors (${catSummary})`);
  } else {
    console.log(`${file}: ${items.length} items, ${topics.size} topics, 0 errors (${catSummary})`);
  }
}

if (totalWarnings > 0) {
  console.log(`\n${totalWarnings} total warning(s)`);
}

if (totalErrors > 0) {
  console.log(`\n${totalErrors} total error(s)`);
  process.exit(1);
}

console.log('\n✅ validation passed');
