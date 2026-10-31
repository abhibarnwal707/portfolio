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
  { title: 'AWS Certified AI Practitioner', issuer: 'AWS' },
  { title: 'AWS Certified Cloud Practitioner', issuer: 'AWS' },
  // TODO(owner): confirm the issuer for this certification.
  { title: 'Claude Certified Architect - Professional' },
];
