# Next Steps: 3-Round Plan

## Overview

| Round | Name | Action |
|-------|------|--------|
| 1 | Generate under-target packs | Bring AI PM, Robotics Maint, Smart HW to ~450-500 |
| 2 | Finish generation & lock | Final assessment, lock all generation state |
| 3 | Cleanup & quality review | Remove low-quality items from over-target packs, fix warnings |

## Current State (2026-05-21)

| Pack | Current | Target | Status |
|------|---------|--------|--------|
| IELTS Core | 1185 | no hard target | paused_for_quality_review |
| Foreign Trade DTC Core | 1000 | ~700 | over_target_pending_cleanup |
| Robotics R&D Core | 707 | ~500 | over_target_pending_cleanup |
| AI PM Core | 278 | ~500 | generating_round1 |
| Robotics Maintenance Core | 237 | ~500 | generating_round1 |
| Smart Hardware Channel Sales Core | 143 | ~500 | generating_round1 |

## Round 1 Strategy

- **Do not touch**: IELTS, Foreign Trade, Robotics R&D
- **Generate only**: AI PM, Robotics Maintenance, Smart Hardware
- **Target**: 450-500 each, do not exceed 520
- **Quality over quantity**: stop early if candidate pool exhausted
- **No deprecated generators**: use only `scripts/round1_generate_under_target_core_packs.cjs`

## Round 2 (Future)

- Assess whether all packs are in target range
- Lock generation state
- Mark `core_ready` on all packs
- No more generation without explicit decision

## Round 3 (Future)

- Final cleanup pass
- Fix warnings where possible
- Remove low-quality items from over-target packs
- Final validate and build
- Mark all packs as `core_complete`
