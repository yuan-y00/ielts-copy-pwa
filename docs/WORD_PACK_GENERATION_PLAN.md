# Word Pack Generation Plan

Before generating any word pack items, read docs/WORD_PACK_GENERATION_RULES.md first.

## Overview

Multi-pack vocabulary data generation plan for IELTS Copy PWA.

## Total Targets

| Pack | Target | Current | Remaining |
|---|---|---|---|
| ielts-exam-context-2000 | 2000 | 100 | 1900 |
| ai-product-management-llm-products-1000 | 1000 | 20 | 980 |
| robotics-rd-engineering-research-1000 | 1000 | 3 | 997 |
| robotics-maintenance-troubleshooting-1000 | 1000 | 3 | 997 |
| foreign-trade-crowdfunding-dtc-operations-1000 | 1000 | 3 | 997 |

## Priority Order

1. **ielts-exam-context-2000** — highest priority, must finish first
2. ai-product-management-llm-products-1000
3. robotics-rd-engineering-research-1000
4. robotics-maintenance-troubleshooting-1000
5. foreign-trade-crowdfunding-dtc-operations-1000

## Batch Rules

- One pack at a time
- Max 100 new items per batch
- After each batch: `npm run validate:packs`
- After validation: `npm run build`
- If validate or build fails: fix before continuing
- Every 500 items: mandatory quality review
- No skipping quality reviews
- No batch larger than 100

## Data Quality Rules

- **exampleZh**: Must translate `example` sentence-by-sentence. The target term MUST remain in English. Never invent content from term/topic alone.
- **shortMeaning**: Chinese short meaning, shown right of term.
- **shortMeaningInSentence**: English short explanation. Must not contain Chinese. Must not equal shortMeaning.
- **fullForm**: If term is an abbreviation (e.g. RAG, PRD), must include English full form.
- **example**: Short, natural, suitable for mobile copy practice.
- **isRealSourceSentence**: Must be `false` unless sentences are extracted from real public sources.
- Avoid: overly simple words (good, bad, thing), overly obscure words (epistemological).
- Target difficulty: IELTS 5.5-7.5 range.

## IELTS Pack Specific Rules

- sourceType: "ielts_style_original"
- sourceTitle: "Original IELTS-style learning sentence"
- sourceUrl: ""
- sourceDate: ""
- isRealSourceSentence: false
- Not claimed from real IELTS tests of any recent years.
- examSkill distribution per batch: Writing 35, Reading 25, Listening 20, Speaking 20.
- Topic coverage: rotate through all 10 IELTS topics.

## Final Cleanup Pass

After all IELTS items are generated, run a final cleanup pass to fix:
- missing fullForm warnings
- shortMeaningInSentence too long
- exampleZh mistranslations
- duplicate terms
- overly simple words
- overly obscure words
