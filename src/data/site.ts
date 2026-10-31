export const site = {
  name: 'Abhishek Kumar',
  role: 'AI/ML Engineer',
  location: 'Hyderabad, India',
  email: 'abhibarnwal707@gmail.com',
  github: 'https://github.com/abhibarnwal707',
  linkedin: 'https://www.linkedin.com/in/abhibarnwal707',
  resume: '/resume.pdf',
  title: 'Abhishek Kumar | AI/ML Engineer',
  description:
    'AI/ML engineer building agentic GraphRAG, fine-tuned LLMs, fraud detection and search ranking systems. Three shipped projects with benchmarks, guardrails and live demos.',
  year: 2026,
} as const;

export const hero = {
  eyebrow: 'CASE FILE · ABHISHEK KUMAR',
  tagline: 'I build AI systems that are measured, explained and shipped.',
  subline:
    'Agentic GraphRAG, fine-tuned LLMs, fraud detection and search ranking, each with a benchmark, a guardrail written in code, and something you can click.',
  metrics: [
    {
      value: '79.8%',
      label: 'graph-based Text2Cypher retrieval accuracy vs 13.8% for vector-only RAG',
      project: 'RedString',
    },
    {
      value: '+28%',
      label: 'NDCG@10 on 8,956 unseen product-search queries',
      project: 'CartRank',
    },
    {
      value: '72%',
      label: 'laundering recall at 1% false-positive rate',
      project: 'PaperTrail',
    },
  ],
} as const;

export const sections = {
  work: {
    heading: 'Selected cases',
    sub: 'Three projects, built end to end. Each one has a benchmark, an honest comparison, and a way to try it.',
  },
  skills: {
    heading: 'Connection map',
    sub: "How the tools I use connect to the things I've built. Hover or tap a node to see the links.",
  },
  about: { heading: 'About' },
  education: { heading: 'Education & certifications' },
  contact: {
    heading: 'Open a case with me',
    text: "I'm open to AI/ML engineering roles. The fastest way to reach me is email; I'm also on GitHub and LinkedIn.",
  },
} as const;

export const about = {
  paragraphs: [
    "I'm an AI/ML engineer who likes problems where the answer can be checked. Every project here starts with a benchmark and an honest baseline, so a claim like \"better\" comes with a number and a comparison.",
    "I care about the unglamorous parts that make AI usable: features that don't leak the future, explanations on every alert, drift rules that trigger retraining, and guardrails written in code instead of hoped-for in a prompt. I like building the whole path from data to a demo someone can click.",
    "I'm based in Hyderabad, India, and I'm looking for AI/ML engineering roles where I can build and ship systems like these.",
  ],
  notes: [
    { key: 'Focus', value: 'GenAI, agents, applied ML, ranking' },
    { key: 'Approach', value: 'benchmark first, guardrails in code' },
    { key: 'Based in', value: 'Hyderabad, India' },
    { key: 'Open to', value: 'AI/ML engineering roles' },
  ],
} as const;
