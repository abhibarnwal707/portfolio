export const site = {
  name: 'Abhishek Kumar',
  role: 'AI/ML Engineer',
  location: 'Hyderabad, India',
  city: 'Hyderabad',
  timeZone: 'Asia/Kolkata',
  email: 'abhibarnwal707@gmail.com',
  github: 'https://github.com/abhibarnwal707',
  linkedin: 'https://www.linkedin.com/in/abhibarnwal707',
  resume: '/resume.pdf',
  title: 'Abhishek Kumar | AI/ML Engineer',
  description:
    'AI/ML engineer building agentic GraphRAG, fine-tuned LLMs, fraud detection and search ranking systems. Three shipped projects with benchmarks, guardrails and live demos.',
  year: 2026,
} as const;

export const nav = [
  { label: 'Work', href: '/#work' },
  { label: 'Skills', href: '/#skills' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
] as const;

export const hero = {
  // The h1, one entry per line.
  title: ['Abhishek Kumar,', 'AI/ML engineer'],
  tagline: 'I build AI systems that are measured, explained and shipped.',
  subline:
    'Agentic GraphRAG, fine-tuned LLMs, fraud detection and search ranking, each with a benchmark, a guardrail written in code, and something you can click.',
  action: 'See the three cases',
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

/** Real figures from the three projects, shown as a moving band under the hero. */
export const figures = [
  '397K-node knowledge graph',
  '5.08M payments scored',
  '8,956 unseen queries',
  '150-question benchmark',
  '49 point-in-time features',
  '223K users, 77K products',
  '100% schema-valid JSON',
  '26 features under drift watch',
] as const;

export const sections = {
  work: {
    heading: 'Selected cases',
    sub: 'Three projects, built end to end. Each one has a benchmark, an honest comparison, and a way to try it.',
    compareLabel: 'Against the baseline',
  },
  skills: {
    heading: 'Skills, and where they went',
    sub: 'Every tool I use, beside the projects it was used in.',
  },
  about: { heading: 'About' },
  education: { heading: 'Education & certifications' },
  contact: {
    heading: 'Open a case with me',
    prompt: ["I'm open to AI/ML engineering roles.", 'Write a line and it opens in your email.'],
    placeholder: 'Hi Abhishek, I’d like to talk about…',
    note: 'Nothing is sent from this page: your email app opens with the message addressed to me.',
    text: "The fastest way to reach me is email; I'm also on GitHub and LinkedIn.",
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
