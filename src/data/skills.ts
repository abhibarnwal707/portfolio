export type SkillGroup =
  | 'Languages'
  | 'Machine Learning'
  | 'GenAI & Agents'
  | 'Search & Ranking'
  | 'Data & Serving';

export type ProjectSlug = 'redstring' | 'papertrail' | 'cartrank';

export const projectNodes: { id: ProjectSlug; name: string }[] = [
  { id: 'redstring', name: 'RedString' },
  { id: 'papertrail', name: 'PaperTrail' },
  { id: 'cartrank', name: 'CartRank' },
];

export interface Skill {
  name: string;
  group: SkillGroup;
  /** Projects that use this skill; empty means a standalone node. */
  projects: ProjectSlug[];
}

const all: ProjectSlug[] = ['redstring', 'papertrail', 'cartrank'];

export const skills: Skill[] = [
  { name: 'Python', group: 'Languages', projects: all },
  { name: 'SQL', group: 'Languages', projects: [] },
  { name: 'C++', group: 'Languages', projects: [] },
  { name: 'Cypher', group: 'Languages', projects: ['redstring'] },

  { name: 'PyTorch', group: 'Machine Learning', projects: ['papertrail', 'cartrank', 'redstring'] },
  { name: 'XGBoost', group: 'Machine Learning', projects: ['papertrail'] },
  { name: 'Graph Neural Networks / GINE', group: 'Machine Learning', projects: ['papertrail'] },
  { name: 'SHAP', group: 'Machine Learning', projects: ['papertrail'] },
  { name: 'MLflow', group: 'Machine Learning', projects: ['papertrail'] },
  { name: 'PSI drift monitoring', group: 'Machine Learning', projects: ['papertrail'] },

  { name: 'QLoRA fine-tuning', group: 'GenAI & Agents', projects: ['redstring'] },
  { name: 'LangGraph', group: 'GenAI & Agents', projects: ['redstring', 'papertrail'] },
  { name: 'Model Context Protocol', group: 'GenAI & Agents', projects: ['redstring'] },
  { name: 'GraphRAG', group: 'GenAI & Agents', projects: ['redstring'] },
  { name: 'Text2Cypher', group: 'GenAI & Agents', projects: ['redstring'] },
  { name: 'LLM query parsing', group: 'GenAI & Agents', projects: ['cartrank'] },

  { name: 'FAISS', group: 'Search & Ranking', projects: ['cartrank'] },
  { name: 'Embedding fine-tuning', group: 'Search & Ranking', projects: ['cartrank'] },
  { name: 'Cross-encoder re-ranking', group: 'Search & Ranking', projects: ['cartrank'] },
  { name: 'Two-tower recommenders', group: 'Search & Ranking', projects: ['cartrank'] },
  { name: 'NDCG / PR-AUC evaluation', group: 'Search & Ranking', projects: all },

  { name: 'Neo4j', group: 'Data & Serving', projects: ['redstring'] },
  { name: 'FastAPI', group: 'Data & Serving', projects: ['papertrail'] },
  { name: 'Docker', group: 'Data & Serving', projects: ['papertrail'] },
  { name: 'Streamlit', group: 'Data & Serving', projects: ['papertrail', 'cartrank'] },
];

export const groups: SkillGroup[] = [
  'Languages',
  'Machine Learning',
  'GenAI & Agents',
  'Search & Ranking',
  'Data & Serving',
];
