export type Project = {
  title: string;
  period: string;
  summary: string;
  problem: string;
  solution: string;
  tech: string[];
  outcomes: string[];
};

export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  bullets: string[];
  tech?: string[];
};

export type SkillCategory = {
  label: string;
  items: string[];
};

export type Profile = {
  name: string;
  headline: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCommand: string;
  location: string;
  email: string;
  shortBio: string;
  aboutDetail: string;
  highlights: string[];
  projects: Project[];
  experience: Experience[];
  certifications: string[];
  clearance: string;
  skills: SkillCategory[];
  socials: {
    label: string;
    href: string;
  }[];
};

export const profile: Profile = {
  name: 'Dominic Rohan',
  headline: 'Software Developer (AWS / GovCloud)',
  heroTitle: 'Dominic Rohan — secure cloud engineer for GovCloud missions.',
  heroSubtitle:
    'I architect CAC/mTLS authorization, event-driven AWS services, and developer tooling that keeps mission teams fast, compliant, and confident.',
  heroCommand: '> pnpm deploy --env govcloud --with-secure-auth',
  location: 'Centreville, VA',
  email: 'dominic.rohan@icloud.com',
  shortBio:
    'Builder of secure, cloud-native systems across AWS and AWS GovCloud. I architect authorization workflows, event-driven services, and developer experiences that keep mission teams moving while meeting security demands.',
  aboutDetail:
    'Currently delivering secure workflows for the Navy with Strategic Business Systems. I translate customer needs into resilient solutions, guide technical direction, and keep teams aligned through clear communication and hands-on code reviews.',
  highlights: ['GovCloud', 'tRPC', 'AWS CDK', 'Postgres', 'Security Workflows'],
  projects: [
    {
      title: 'Automated Readiness Review (ARR) Pipeline',
      period: '2024 – Present',
      summary: 'Automates security and readiness checks before releases to GovCloud workloads.',
      problem:
        'Manual readiness reviews were slowing delivery and left room for missed security/control gates before deploying sensitive workloads.',
      solution:
        'Built an automated readiness pipeline with codified checklists, evidence capture, and release gates that surface blockers early and keep audits traceable.',
      tech: ['TypeScript', 'AWS', 'CDK', 'tRPC', 'GitLab CI', 'PostgreSQL'],
      outcomes: [
        'Standardized readiness criteria with repeatable, auditable checks for GovCloud deployments.',
        'Reduced manual review cycles by surfacing required evidence and gating releases automatically.',
        'Improved compliance confidence with persisted artifacts and clear approver workflows.'
      ]
    },
    {
      title: 'COSMOS Just-In-Time Access System',
      period: '2024 – Present',
      summary:
        'Secure, cloud-native authorization workflow enabling temporary privileged access across AWS GovCloud.',
      problem:
        'Teams needed auditable, time-bound privileged access without compromising CAC-based identity assurance across GovCloud.',
      solution:
        'Built mTLS-backed API flows with CAC validation, request/approval workflows, automated controls, and end-to-end auditing over tRPC services.',
      tech: ['TypeScript', 'Node.js', 'tRPC', 'AWS GovCloud', 'RDS/Aurora PostgreSQL', 'Kysely', 'mTLS', 'CAC'],
      outcomes: [
        'Delivered just-in-time access that aligns with security and compliance controls.',
        'Reduced manual approvals by orchestrating automated guardrails and notifications.',
        'Improved operator confidence with complete auditing for requests, approvals, and automation.'
      ]
    },
    {
      title: 'COSMOS Commercial Billing Microservice',
      period: '2024 – Present',
      summary: 'Event-driven billing pipeline for cost ingestion, surplus allocation, and reporting.',
      problem:
        'Needed reliable visibility into daily commercial cloud spend with automated reconciliation across teams and services.',
      solution:
        'Designed event-driven Lambda workflows with SQS, API Gateway, and Aurora PostgreSQL repositories to calculate, allocate, and surface costs.',
      tech: ['AWS Lambda', 'SQS', 'API Gateway', 'Aurora PostgreSQL', 'TypeScript', 'Docker', 'Serverless'],
      outcomes: [
        'Enabled daily cost ingestion and reconciliation without manual intervention.',
        'Supported accurate allocation with deterministic calculation logic and reporting endpoints.',
        'Increased reliability with resilient queues and observability in CloudWatch/X-Ray.'
      ]
    }
  ],
  experience: [
    {
      company: 'Strategic Business Systems',
      role: 'Software Developer & Navy Contractor',
      location: 'Centreville, VA',
      period: 'May 2023 – Present',
      bullets: [
        'Lead developer for COSMOS R&D initiatives across AWS and AWS GovCloud.',
        'Translate stakeholder requirements into actionable, well-scoped tickets with clear acceptance criteria.',
        'Guide code reviews, backlog refinement, and sprint ceremonies; mentor and onboard new engineers.',
        'Elevate performance, security, and reliability across the COSMOS ecosystem with cloud-native patterns.'
      ],
      tech: ['TypeScript', 'React', 'Node.js', 'AWS GovCloud', 'tRPC', 'PostgreSQL', 'AWS CDK', 'GitLab']
    },
    {
      company: 'Virtual Service Operations',
      role: 'Junior Software Developer Intern',
      location: 'Remote',
      period: 'Dec 2021 – Feb 2023',
      bullets: [
        'Built and shipped UI components and APIs alongside senior engineers, pairing on code reviews and testing.',
        'Implemented small features and fixes in TypeScript/React services, improving frontend reliability and polish.',
        'Helped move legacy workflows toward cloud-ready patterns with better developer tooling and git hygiene.'
      ],
      tech: ['TypeScript', 'React', 'Node.js', 'AWS', 'GitHub', 'Jest', 'Docker']
    }
  ],
  certifications: ['AWS Certified Cloud Practitioner — April 2025'],
  clearance: 'Top Secret (Active), U.S. Citizen',
  skills: [
    {
      label: 'Languages',
      items: ['TypeScript', 'JavaScript', 'SQL', 'Bash']
    },
    {
      label: 'Cloud / Platforms',
      items: ['AWS', 'AWS GovCloud', 'Azure Entra ID']
    },
    {
      label: 'Databases',
      items: ['Aurora PostgreSQL', 'RDS', 'PostgreSQL', 'MongoDB', 'DynamoDB']
    },
    {
      label: 'Tooling',
      items: ['AWS CDK', 'React', 'Node.js', 'Tailwind CSS', 'Docker', 'Linux']
    },
    {
      label: 'Practices',
      items: ['Agile / Scrum', 'CI/CD (GitLab CI, GitHub Actions, CodePipeline)', 'Testing (Vitest, Jest, Postman)', 'Observability (CloudWatch, X-Ray)', 'Version Control (Git)']
    }
  ],
  socials: [
    { label: 'Email', href: 'mailto:dominic.rohan@icloud.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com' },
    { label: 'GitHub', href: 'https://github.com' }
  ]
};
