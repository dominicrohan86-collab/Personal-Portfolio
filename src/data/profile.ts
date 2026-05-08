export type Project = {
  title: string;
  period: string;
  summary: string;
  problem: string;
  screenImage: string;
  solution: string;
  role: string;
  highlight: string;
  access: string;
  tech: string[];
  outcomes: string[];
  links?: {
    label: string;
    href: string;
  }[];
};

export type FeaturedCaseStudy = {
  title: string;
  company: string;
  period: string;
  summary: string;
  problem: string;
  solution: string;
  outcomes: string[];
  tech: string[];
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
  featuredCaseStudy: FeaturedCaseStudy;
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
  headline: 'Full-stack Developer',
  heroTitle:
    'Building secure cloud tools that make complex workflows feel simple.',
  heroSubtitle:
    'I turn AWS, GovCloud, and automation-heavy processes into clean interfaces, reliable services, and software teams can trust.',
  heroCommand: '> pnpm build --secure --workflow=govcloud-automation',
  location: 'Centreville, VA',
  email: 'dominic.rohan@icloud.com',
  shortBio:
    'I build full-stack web applications with clean interfaces, practical automation, and reliable backend systems for teams operating in complex cloud environments.',
  aboutDetail:
    'Currently delivering secure workflows for the Navy with Strategic Business Systems. I translate customer needs into usable software, guide technical direction, and focus on turning operational friction into simple, repeatable workflows.',
  highlights: [
    'Strategic Business Systems',
    'AWS GovCloud',
    'Azure',
    'Automation',
    'Secure UX'
  ],
  featuredCaseStudy: {
    title: 'Government Cloud Onboarding Automation',
    company: 'Strategic Business Systems',
    period: '2023 - Present',
    summary:
      'Built internal automation tooling to streamline onboarding across AWS, Azure, Wiz, and related cloud and security platforms.',
    problem:
      'Government technology teams needed a cleaner way to coordinate platform onboarding without relying on repetitive manual steps, scattered context, and high-friction handoffs.',
    solution:
      'Designed full-stack workflow experiences that translate onboarding requirements into reusable tickets, cloud-connected actions, and clearer status visibility for technical and non-technical stakeholders.',
    outcomes: [
      'Reduced repetitive onboarding work through reusable workflow automation.',
      'Improved clarity across AWS, Azure, Wiz, and related platform requests.',
      'Helped teams move faster while preserving security, review, and audit expectations.'
    ],
    tech: ['AWS', 'Azure', 'Wiz', 'Automation', 'GovTech', 'Full-stack']
  },
  projects: [
    {
      title: 'Automated Readiness Review (ARR) Pipeline',
      period: '2024 - Present',
      summary:
        'Automates security and readiness checks before releases to GovCloud workloads.',
      screenImage: '/arr-preview.png',
      problem:
        'Manual readiness reviews were slowing delivery and left room for missed security/control gates before deploying sensitive workloads.',
      solution:
        'Built an automated readiness pipeline with codified checklists, evidence capture, and release gates that surface blockers early and keep audits traceable.',
      role: 'Full-stack / cloud developer',
      highlight:
        'Turned release readiness into repeatable workflow automation with clear evidence capture and approval paths.',
      access: 'Internal government project',
      tech: [
        'TypeScript',
        'GitLab CI/CD',
        'DynamoDB',
        'Lambda',
        'Step Functions',
        'PostgreSQL',
        'Api Gateway',
        'AWS GovCloud',
        'CDK',
        'tRPC',
        'Node.js'
      ],
      outcomes: [
        'Standardized readiness criteria with repeatable, auditable checks for GovCloud deployments.',
        'Reduced manual review cycles by surfacing required evidence and gating releases automatically.',
        'Improved compliance confidence with persisted artifacts and clear approver workflows.'
      ]
    },
    {
      title: 'COSMOS Just-In-Time Access System',
      period: '2024 - Present',
      summary:
        'Secure, cloud-native authorization workflow enabling temporary privileged access across AWS GovCloud.',
      screenImage: '/jit-access-preview.png',
      problem:
        'Teams needed auditable, time-bound privileged access without compromising CAC-based identity assurance across GovCloud.',
      solution:
        'Built mTLS-backed API flows with CAC validation, request/approval workflows, automated controls, and end-to-end auditing over tRPC services.',
      role: 'Full-stack / cloud developer',
      highlight:
        'Built CAC and mTLS-backed request flows so privileged access could stay temporary, reviewable, and auditable.',
      access: 'Internal government project',
      tech: [
        'TypeScript',
        'Node.js',
        'Lambda',
        'Step Functions',
        'PostgreSQL',
        'Api Gateway',
        'AWS GovCloud',
        'RDS/Aurora PostgreSQL',
        'tRPC',
        'Kysely',
        'mTLS',
        'CAC'
      ],
      outcomes: [
        'Delivered just-in-time access that aligns with security and compliance controls.',
        'Reduced manual approvals by orchestrating automated guardrails and notifications.',
        'Improved operator confidence with complete auditing for requests, approvals, and automation.'
      ]
    },
    {
      title: 'COSMOS Commercial Billing Microservice',
      period: '2024 - Present',
      summary:
        'Event-driven billing pipeline for cost ingestion, surplus allocation, and reporting.',
      screenImage: '/billing-microservice-preview.png',
      problem:
        'Needed reliable visibility into daily commercial cloud spend with automated reconciliation across teams and services.',
      solution:
        'Designed event-driven Lambda workflows with SQS, API Gateway, and Aurora PostgreSQL repositories to calculate, allocate, and surface costs.',
      role: 'Backend / cloud developer',
      highlight:
        'Built a resilient event-driven pipeline for daily cost ingestion, surplus allocation, and reporting.',
      access: 'Internal government project',
      tech: [
        'AWS Lambda',
        'SQS',
        'API Gateway',
        'Aurora PostgreSQL',
        'TypeScript',
        'Docker',
        'Serverless'
      ],
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
      period: 'May 2023 - Present',
      bullets: [
        'Lead developer for COSMOS R&D initiatives across AWS, AWS GovCloud, and secure onboarding workflows.',
        'Build automation tooling that helps teams coordinate onboarding across AWS, Azure, Wiz, and related platforms.',
        'Translate stakeholder requirements into actionable, well-scoped tickets with clear acceptance criteria.',
        'Guide code reviews, backlog refinement, and sprint ceremonies; mentor and onboard new engineers.',
        'Elevate performance, security, and reliability across the COSMOS ecosystem with cloud-native patterns.'
      ],
      tech: [
        'TypeScript',
        'React',
        'Node.js',
        'AWS GovCloud',
        'Azure',
        'Wiz',
        'tRPC',
        'PostgreSQL',
        'AWS CDK',
        'GitLab'
      ]
    },
    {
      company: 'Virtual Service Operations',
      role: 'Junior Software Developer Intern',
      location: 'Remote',
      period: 'Dec 2021 - Feb 2023',
      bullets: [
        'Built and shipped UI components and APIs alongside senior engineers, pairing on code reviews and testing.',
        'Implemented small features and fixes in TypeScript/React services, improving frontend reliability and polish.',
        'Helped move legacy workflows toward cloud-ready patterns with better developer tooling and git hygiene.'
      ],
      tech: [
        'TypeScript',
        'React',
        'Node.js',
        'AWS',
        'GitHub',
        'Jest',
        'Docker'
      ]
    }
  ],
  certifications: ['AWS Certified Cloud Practitioner - April 2025'],
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
      items: [
        'Agile / Scrum',
        'CI/CD (GitLab CI, GitHub Actions, CodePipeline)',
        'Testing (Vitest, Jest, Postman)',
        'Observability (CloudWatch, X-Ray)',
        'Version Control (Git)'
      ]
    }
  ],
  socials: [
    { label: 'Email', href: 'mailto:dominic.rohan@icloud.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com' },
    { label: 'GitHub', href: 'https://github.com' }
  ]
};
