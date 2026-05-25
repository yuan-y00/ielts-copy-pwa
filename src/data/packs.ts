import type { WordPackId, WordPackMeta, DisplayWordData } from '../types/wordPack';
import { normalizeAnyWordItem } from './normalizeWordPack';

export const DEFAULT_PACK_ID: WordPackId = 'ielts-exam-context-2000';

const PACK_META_MAP: Record<WordPackId, WordPackMeta> = {
  'ielts-exam-context-2000': {
    id: 'ielts-exam-context-2000',
    title: 'IELTS Exam Context Core',
    shortTitle: 'IELTS Core',
    description: '面向 IELTS 听力、阅读、写作和口语的核心考试语境词包，覆盖高频实用词、搭配和句型',
    total: 1185,
    fileName: 'ielts-exam-context-2000.json',
  },
  'robotics-maintenance-troubleshooting-1000': {
    id: 'robotics-maintenance-troubleshooting-1000',
    title: 'Robotics Maintenance Troubleshooting Core',
    shortTitle: '机器人维修 Core',
    description:
      '面向机器人维修、维护、故障排查、远程技术支持和现场沟通的核心英语词包',
    total: 393,
    fileName: 'robotics-maintenance-troubleshooting-1000.json',
  },
  'foreign-trade-crowdfunding-dtc-operations-1000': {
    id: 'foreign-trade-crowdfunding-dtc-operations-1000',
    title: 'Foreign Trade Crowdfunding DTC Core',
    shortTitle: '外贸 DTC Core',
    description:
      '面向跨境 DTC、众筹、独立站、海外客服、广告、物流和供应链的核心工作英语词包',
    total: 720,
    fileName: 'foreign-trade-crowdfunding-dtc-operations-1000.json',
  },
  'robotics-rd-engineering-research-1000': {
    id: 'robotics-rd-engineering-research-1000',
    title: 'Robotics R&D Engineering Sourced Core',
    shortTitle: '机器人研发 Sourced',
    description:
      '面向机器人研发、ROS2、Nav2、MoveIt2、ros2_control、Gazebo、SLAM、感知、控制、仿真和实验调试的来源驱动核心英语词包',
    total: 216,
    fileName: 'robotics-rd-engineering-research-1000.json',
  },
  'ai-product-management-llm-products-1000': {
    id: 'ai-product-management-llm-products-1000',
    title: 'AI Product Management LLM Products Core',
    shortTitle: 'AI PM Core',
    description:
      '面向 AI 产品经理、LLM 产品、AI Agent、RAG、模型评估、商业化、安全隐私和客户成功的核心工作英语词包',
    total: 433,
    fileName: 'ai-product-management-llm-products-1000.json',
  },
  'smart-hardware-overseas-channel-sales-core': {
    id: 'smart-hardware-overseas-channel-sales-core',
    title: 'Smart Hardware Overseas Channel Sales Core',
    shortTitle: '智能硬件渠道 Core',
    description:
      '面向智能硬件产品出海、海外渠道开发、代理商招募、B2B销售、展会推销、零售和准入合规沟通的核心英语词包',
    total: 301,
    fileName: 'smart-hardware-overseas-channel-sales-core.json',
  },
};

export function getWordPackMeta(packId: WordPackId): WordPackMeta {
  return PACK_META_MAP[packId];
}

const packLoaders: Record<WordPackId, () => Promise<{ default: unknown[] }>> = {
  'ielts-exam-context-2000': () => import('../data/packs/ielts-exam-context-2000.json'),
  'robotics-maintenance-troubleshooting-1000': () =>
    import('../data/packs/robotics-maintenance-troubleshooting-1000.json'),
  'foreign-trade-crowdfunding-dtc-operations-1000': () =>
    import('../data/packs/foreign-trade-crowdfunding-dtc-operations-1000.json'),
  'robotics-rd-engineering-research-1000': () =>
    import('../data/packs/robotics-rd-engineering-research-1000.json'),
  'ai-product-management-llm-products-1000': () =>
    import('../data/packs/ai-product-management-llm-products-1000.json'),
  'smart-hardware-overseas-channel-sales-core': () =>
    import('../data/packs/smart-hardware-overseas-channel-sales-core.json'),
};

export async function loadWordPack(
  packId: WordPackId,
): Promise<DisplayWordData[]> {
  try {
    const loader = packLoaders[packId];
    if (!loader) {
      console.error(`Unknown packId: ${packId}`);
      return [];
    }
    const module = await loader();
    const raw = module.default as unknown[];
    return raw.map((item) => normalizeAnyWordItem(item, packId));
  } catch (err) {
    console.error(`Failed to load word pack "${packId}":`, err);
    return [];
  }
}
