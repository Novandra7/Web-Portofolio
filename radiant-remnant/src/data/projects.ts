export interface Project {
  title: string;
  description: string;
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
  thumbnail?: string;
  year: number;
}

export const createSlug = (title: string): string =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export const projects: Project[] = [
  {
    title: 'Brutalist Commerce',
    description:
      'A conversion-driven storefront with editorial product storytelling and lightning-fast checkout flows.',
    techStack: ['Astro', 'Stripe', 'Tailwind'],
    demoUrl: 'https://example.com/commerce',
    repoUrl: 'https://github.com/yourname/brutalist-commerce',
    year: 2024,
  },
  {
    title: 'Studio Launchpad',
    description:
      'A bold agency website featuring scroll-triggered typography, layered motion, and case study storytelling.',
    techStack: ['Astro', 'GSAP', 'Contentful'],
    demoUrl: 'https://example.com/studio',
    repoUrl: 'https://github.com/yourname/studio-launchpad',
    year: 2024,
  },
  {
    title: 'Pulse Analytics',
    description:
      'A dashboard experience with real-time data cards, clean hierarchy, and accessible interaction patterns.',
    techStack: ['React', 'Node.js', 'PostgreSQL'],
    demoUrl: 'https://example.com/pulse',
    repoUrl: 'https://github.com/yourname/pulse-analytics',
    year: 2023,
  },
  {
    title: 'Founders Log',
    description:
      'A minimal product journaling app with thoughtful onboarding and a rapid note-to-share workflow.',
    techStack: ['Next.js', 'Supabase', 'Tailwind'],
    demoUrl: 'https://example.com/founders',
    repoUrl: 'https://github.com/yourname/founders-log',
    year: 2023,
  },
];

export type ProjectWithSlug = Project & { slug: string };

export const projectsWithSlug: ProjectWithSlug[] = projects.map((project) => ({
  ...project,
  slug: createSlug(project.title),
}));

export const getProjectBySlug = (slug: string): ProjectWithSlug | undefined =>
  projectsWithSlug.find((project) => project.slug === slug);
