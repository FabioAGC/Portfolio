export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
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