export const education = [
  {
    credential: 'B.Tech',
    school: 'Indian Institute of Technology (BHU), Varanasi',
    years: '2021 – 2025',
    grade: 'CGPA 8.95 / 10',
  },
] as const;

export interface Certification {
  title: string;
  issuer?: string;
  /** Add a credential URL here later; the card links only when present. */
  url?: string;
}

export const certifications: Certification[] = [
  {
    title: 'AWS Certified AI Practitioner',
    issuer: 'AWS',
    url: 'https://www.credly.com/badges/ad055e91-63a2-40af-910a-2f7b8dd64536',
  },
  {
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'AWS',
    url: 'https://www.credly.com/badges/fb9dab9c-7835-4d8a-866f-f39ee041f57b',
  },
  {
    title: 'Claude Certified Architect - Professional',
    issuer: 'Anthropic',
    url: 'https://www.credly.com/badges/f79be9f0-661a-41fc-9105-b60515043135',
  },
];
