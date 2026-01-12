export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone?: string;
    location: string;
    portfolioUrl: string;
    linkedin?: string;
    github?: string;
  };
  profile: string;
  education: EducationItem[];
  projects: ProjectItem[];
  workExperience?: WorkExperienceItem[];
  skills: {
    technical: string[];
    soft: string[];
    languages?: string[];
  };
  certificates: CertificateItem[];
}

export interface EducationItem {
  id: string;
  period: string;
  degree: string;
  institution: string;
  details?: string;
  gpa?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  points: string[];
  technologies: string[];
  link?: string;
}

export interface WorkExperienceItem {
  id: string;
  period: string;
  position: string;
  company: string;
  location?: string;
  points: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialId?: string;
  link?: string;
}