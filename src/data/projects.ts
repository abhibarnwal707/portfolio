export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: 'redstring' | 'papertrail' | 'cartrank';
  number: string;
  name: string;
  title: string;
  oneLiner: string;
  tags: string[];
  links: ProjectLink[];
  /** Headline metrics: big value + caption. */
  metrics: { value: string; label: string }[];
  problem: string;
  built: { title: string; text: string }[];
  results: { measure: string; result: string }[];
  decisions: string[];
  stack: string[];
  /** Two or three disciplines for the work index. */
  disciplines: string[];
  /** Real result pairs: this project's number against the one it was measured against. */
  compare: {
    label: string;
    mine: { name: string; value: number; text: string };
    base: { name: string; value: number; text: string };
  }[];
  /** Diagram boxes, in reading order. `side` boxes render on a branch/loop. */
  diagram: { main: string[]; side: string[]; sideLabel: string };
}

export const projects: Project[] = [
  {
    slug: 'redstring',
    number: '001',
    name: 'RedString',
    title: 'RedString: Agentic GraphRAG & Fine-Tuned LLM for Threat Intelligence',
    oneLiner:
      'A cyber-threat-intelligence assistant that extracts structure from threat reports, stores it in a knowledge graph, and answers questions only from evidence it can cite.',
    tags: ['GraphRAG', 'QLoRA', 'LangGraph', 'MCP', 'Neo4j'],
    links: [
      { label: 'GitHub', href: 'https://github.com/abhibarnwal707/redstring' },
      { label: 'Demo video', href: 'https://youtu.be/rbSVaTp80yI' },
    ],
    metrics: [
      { value: '79.8% vs 13.8%', label: 'Text2Cypher retrieval accuracy vs vector-only RAG' },
      { value: '0.61 vs 0.32', label: 'entity F1, fine-tuned 1.7B model vs zero-shot 120B model' },
      { value: '100%', label: 'schema-valid JSON from the fine-tuned extractor' },
    ],
    problem:
      'Threat reports are long, unstructured and full of identifiers (techniques, vulnerabilities, weaknesses). Analysts need answers that are correct and traceable, but plain vector search over report text mixes up related-sounding identifiers and has no way to follow relationships such as which techniques a vulnerability enables. A language model that confidently cites an identifier that does not exist is worse than no answer.',
    built: [
      {
        title: 'A fine-tuned extractor.',
        text: 'I fine-tuned Qwen3-1.7B with QLoRA to pull entities and MITRE ATT&CK techniques out of threat reports as structured JSON.',
      },
      {
        title: 'A knowledge graph.',
        text: 'A Neo4j graph of 397K nodes assembled from 5 public security sources (including MITRE ATT&CK, CVE, CWE and CAPEC), linking techniques, weaknesses, vulnerabilities and attack patterns.',
      },
      {
        title: 'A benchmark.',
        text: '150 questions whose correct answers are derived from the graph itself, so retrieval can be scored objectively.',
      },
      {
        title: 'An agent.',
        text: 'A LangGraph agent that plans, retrieves, answers and self-checks. It reaches the graph only through a read-only MCP server exposing 8 tools.',
      },
      {
        title: 'A code-level citation guard.',
        text: 'Any identifier cited in an answer that was not in the retrieved evidence is dropped by code before the answer is returned.',
      },
    ],
    results: [
      { measure: 'Entity extraction F1', result: '0.61 (fine-tuned 1.7B) vs 0.32 (zero-shot gpt-oss-120b, about 70x larger)' },
      { measure: 'Technique extraction F1', result: '0.60 vs 0.45' },
      { measure: 'Schema-valid JSON output', result: '100%' },
      { measure: 'Graph retrieval (Text2Cypher) accuracy', result: '79.8% vs 13.8% for vector-only RAG' },
      { measure: 'Knowledge graph size', result: '397K nodes, 5 sources' },
      { measure: 'Evaluation set', result: '150 questions with graph-derived answers' },
    ],
    decisions: [
      'Small model, tuned for the task, instead of calling a far larger general model: better scores and structured output you can validate.',
      "The agent can only read the graph, through a read-only MCP server, so it can't change data.",
      'Trust is enforced in code, not in the prompt: the citation guard removes any identifier not present in retrieved evidence.',
      'The benchmark is built from the graph, so every score can be reproduced.',
    ],
    stack: ['Python', 'Qwen3-1.7B', 'QLoRA', 'LangGraph', 'Model Context Protocol (MCP)', 'Neo4j', 'Cypher'],
    disciplines: ['GraphRAG', 'QLoRA', 'MCP'],
    compare: [
      {
        label: 'Retrieval accuracy',
        mine: { name: 'Text2Cypher on the graph', value: 79.8, text: '79.8%' },
        base: { name: 'Vector-only RAG', value: 13.8, text: '13.8%' },
      },
      {
        label: 'Entity F1',
        mine: { name: 'Fine-tuned Qwen3-1.7B', value: 0.61, text: '0.61' },
        base: { name: 'Zero-shot gpt-oss-120b, about 70x larger', value: 0.32, text: '0.32' },
      },
      {
        label: 'Technique F1',
        mine: { name: 'Fine-tuned Qwen3-1.7B', value: 0.6, text: '0.60' },
        base: { name: 'Zero-shot gpt-oss-120b', value: 0.45, text: '0.45' },
      },
    ],
    diagram: {
      main: [
        'Threat report',
        'Fine-tuned extractor (QLoRA)',
        'Entities and techniques',
        'Neo4j knowledge graph (397K nodes)',
        'Read-only MCP server (8 tools)',
        'LangGraph agent (plan, retrieve, answer, self-check)',
        'Citation guard',
        'Answer',
      ],
      side: [],
      sideLabel: '',
    },
  },
  {
    slug: 'papertrail',
    number: '002',
    name: 'PaperTrail',
    title: 'PaperTrail: AML Detection, Graph ML & LLM Agent',
    oneLiner:
      "An anti-money-laundering system that scores transactions, explains every alert, monitors its own drift, and has an investigator agent that is not allowed to quote a number it can't cite.",
    tags: ['Graph ML', 'XGBoost', 'PyTorch', 'LangGraph', 'MLOps'],
    links: [
      { label: 'GitHub', href: 'https://github.com/abhibarnwal707/PaperTrail' },
      { label: 'Live demo', href: 'https://papertrail-aml.streamlit.app/' },
    ],
    metrics: [
      { value: '72%', label: 'recall at 1% false-positive rate' },
      { value: '0.50', label: 'PR-AUC on a 0.1% positive rate' },
      { value: '6.7x', label: 'PR-AUC lift from account-history features' },
    ],
    problem:
      'Money laundering is rare (here about 0.1% of payments) and hidden in patterns spread across many accounts, so accuracy is meaningless and single-transaction models miss the structure. Compliance teams also need each alert explained and need to know when the model has stopped being reliable.',
    built: [
      {
        title: 'Data and features.',
        text: '5.08M payments across 515K accounts. I engineered 49 point-in-time account-history features, computed so no future information leaks into the past.',
      },
      {
        title: 'A blended model.',
        text: 'XGBoost on those features blended with an edge-level graph neural network (GINE, written in plain PyTorch) that learns from who pays whom.',
      },
      { title: 'Explainability.', text: 'SHAP drivers attached to every alert.' },
      {
        title: 'Experiment tracking.',
        text: 'MLflow runs across 3 random seeds, so the reported numbers are not a single lucky run.',
      },
      {
        title: 'Drift monitoring.',
        text: 'PSI monitoring on 26 features with an automated retraining rule: retrain when PSI exceeds 0.2 on 3 or more of the top features.',
      },
      {
        title: 'An investigator agent.',
        text: 'A LangGraph agent with 4 data tools to look into an alert. A code-level guardrail rejects any answer containing a number it has not cited from a tool result.',
      },
      {
        title: 'Serving.',
        text: 'FastAPI service, Docker image, and a Streamlit app for the live demo.',
      },
    ],
    results: [
      { measure: 'Dataset', result: '5.08M payments, 515K accounts, 0.1% laundering' },
      { measure: 'PR-AUC (blended model)', result: '0.50' },
      { measure: 'Recall at 1% false-positive rate', result: '72%' },
      { measure: 'Effect of 49 account-history features', result: 'XGBoost PR-AUC up 6.7x' },
      { measure: 'Effect of the graph model', result: 'Recall up from 66% to 72% across 8 laundering typologies' },
      { measure: 'Drift monitoring', result: '26 features, retrain when PSI > 0.2 on 3+ top features' },
    ],
    decisions: [
      'Point-in-time features: the most common silent failure in fraud models is leaking the future, so features are built only from history available at each transaction.',
      'Precision-recall metrics, not accuracy, because the positive rate is 0.1%.',
      'Seeds and tracking: results averaged across 3 seeds and logged in MLflow.',
      "The agent's guardrail is code, not a prompt: uncited numbers are rejected.",
      'Drift has a rule, not a dashboard: a threshold that triggers retraining.',
    ],
    stack: ['Python', 'PyTorch', 'XGBoost', 'SHAP', 'MLflow', 'LangGraph', 'FastAPI', 'Docker', 'Streamlit'],
    disciplines: ['Graph ML', 'XGBoost', 'MLOps'],
    compare: [
      {
        label: 'Recall at 1% false-positive rate',
        mine: { name: 'Blend with the graph model', value: 72, text: '72%' },
        base: { name: 'Without the graph model', value: 66, text: '66%' },
      },
      {
        label: 'XGBoost PR-AUC',
        mine: { name: 'With 49 account-history features', value: 6.7, text: '6.7x' },
        base: { name: 'Without them', value: 1, text: '1x' },
      },
    ],
    diagram: {
      main: [
        'Transactions',
        'Point-in-time feature builder (49 features)',
        'XGBoost + GINE edge GNN (blend)',
        'Alert score + SHAP explanation',
        'LangGraph investigator (4 tools, citation guardrail)',
        'FastAPI / Streamlit',
      ],
      side: ['PSI drift monitor (26 features)', 'Retraining rule'],
      sideLabel: 'Side loop',
    },
  },
  {
    slug: 'cartrank',
    number: '003',
    name: 'CartRank',
    title: 'CartRank: AI Product Search & Recommendation Engine',
    oneLiner:
      'A shopping search and recommendation engine that understands plain-English queries, ranks results with a re-ranker, and recommends items with a two-tower model.',
    tags: ['Search', 'Ranking', 'RecSys', 'PyTorch', 'FAISS'],
    links: [
      { label: 'GitHub', href: 'https://github.com/abhibarnwal707/CartRank' },
      { label: 'Live demo', href: 'https://cartrank.streamlit.app/' },
    ],
    metrics: [
      { value: '+28%', label: 'NDCG@10 on 8,956 unseen queries' },
      { value: '+67%', label: 'top-10 hit rate vs the best baseline recommender' },
      { value: '42% → 92%', label: 'correct query parsing after prompt tuning' },
    ],
    problem:
      'Keyword search misses what shoppers mean, and the first page decides whether they buy. Good e-commerce search needs three things working together: finding the right candidates, ordering them well, and turning a sentence like "waterproof running shoes under 3000" into filters the system can apply.',
    built: [
      {
        title: 'Hybrid retrieval.',
        text: 'Keyword search combined with a fine-tuned embedding model over FAISS to find candidates.',
      },
      {
        title: 'Cross-encoder re-ranking.',
        text: 'A cross-encoder reorders the top candidates for precision.',
      },
      {
        title: 'A two-tower recommender.',
        text: 'Trained on 223K users and 77K products and compared against ItemKNN, BPR and a popularity baseline.',
      },
      {
        title: 'An LLM query parser.',
        text: 'Turns plain-English searches into structured filters. The prompt was tuned on held-out queries, which raised correct parsing from 42% to 92%.',
      },
      { title: 'A live app.', text: 'Streamlit interface to try search and recommendations.' },
    ],
    results: [
      { measure: 'Search quality (NDCG@10)', result: '+28% on 8,956 unseen Amazon queries' },
      {
        measure: 'Recommender top-10 hits',
        result: '67% more than the best baseline (ItemKNN, BPR, popularity compared)',
      },
      { measure: 'Recommender data', result: '77K products, 223K users' },
      { measure: 'Query parsing correctness', result: '42% → 92% after prompt tuning on held-out queries' },
    ],
    decisions: [
      'Evaluated on queries the system had not seen, with standard ranking metrics.',
      'Baselines first: the recommender is only credible because it beats ItemKNN, BPR and popularity.',
      'Re-ranking as a second stage: cheap retrieval for recall, an expensive cross-encoder only for the short list.',
      'Prompt changes were judged on held-out queries, not on the examples used to write them.',
    ],
    stack: [
      'Python',
      'PyTorch',
      'FAISS',
      'sentence embeddings',
      'cross-encoder re-ranking',
      'two-tower retrieval',
      'LLM query parsing',
      'Streamlit',
    ],
    disciplines: ['Search', 'Ranking', 'RecSys'],
    compare: [
      {
        label: 'NDCG@10, 8,956 unseen queries',
        mine: { name: 'CartRank search', value: 1.28, text: '+28%' },
        base: { name: 'Baseline', value: 1, text: 'baseline' },
      },
      {
        label: 'Top-10 hit rate',
        mine: { name: 'Two-tower recommender', value: 1.67, text: '+67%' },
        base: { name: 'Best baseline of ItemKNN, BPR, popularity', value: 1, text: 'baseline' },
      },
      {
        label: 'Correct query parsing',
        mine: { name: 'After prompt tuning', value: 92, text: '92%' },
        base: { name: 'Before', value: 42, text: '42%' },
      },
    ],
    diagram: {
      main: [
        'Query (plain English)',
        'LLM query parser (filters)',
        'Keyword + embedding retrieval (FAISS)',
        'Cross-encoder re-ranker',
        'Ranked results',
      ],
      side: ['User history', 'Two-tower recommender', '"You may also like"'],
      sideLabel: 'Side branch',
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
