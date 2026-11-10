export type Language = 'en' | 'pt';

export interface Project {
  id: number;
  title: string;
  description: string;
  /** Screenshot of the project; a titled placeholder is shown when unset. */
  imageUrl?: string;
  /** CSS object-position for the cropped thumbnail; defaults to the top. */
  imagePosition?: string;
  tags: string[];
  link?: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter?: string;
  email: string;
  instagram?: string;
  anilist?: string;
  backloggd?: string;
  letterboxd?: string;
  goodreads?: string;
  serializd?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface JobExperience {
  id: number;
  role: string;
  company: string;
  /** Path to the company's logo; its initials are shown when unset. */
  logo?: string;
  period: string;
  description: string;
}

export interface UserProfile {
  name: string;
  title: string;
  about: string;
  avatarUrl: string;
  socials: SocialLinks;
  skills: SkillCategory[];
  experience: JobExperience[];
}

export interface Translations {
  nav: {
    about: string;
    tech: string;
    experience: string;
    projects: string;
    contact: string;
    menu: string;
    close: string;
    language: string;
  };
  hero: {
    viewProjects: string;
    contact: string;
  };
  headers: {
    about: string;
    tech: string;
    experience: string;
    projects: string;
    contact: string;
    contactTitle: string;
    contactText: string;
  };
}

export interface SiteContent {
  profile: UserProfile;
  projects: Project[];
  translations: Translations;
}
