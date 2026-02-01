/**
 * Personal information section of the resume
 */
export interface PersonalInfo {
  name: string;
  email: string;
  phone?: string;
  location: string;
  portfolioUrl: string;
  linkedin?: string;
  github?: string;
}

/**
 * Skills categorized by type
 */
export interface Skills {
  technical: string[];
  soft: string[];
  languages?: string[];
}

/**
 * Complete resume data structure
 */
export interface ResumeData {
  personalInfo: PersonalInfo;
  profile: string;
  education: EducationItem[];
  projects: ProjectItem[];
  workExperience?: WorkExperienceItem[];
  skills: Skills;
  certificates: CertificateItem[];
}

/**
 * Education entry in the resume
 */
export interface EducationItem {
  id: string;
  period: string;
  degree: string;
  institution: string;
  details?: string;
  gpa?: string;
}

/**
 * Project entry in the resume
 */
export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  points: string[];
  technologies: string[];
  link?: string;
}

/**
 * Work experience entry in the resume
 */
export interface WorkExperienceItem {
  id: string;
  period: string;
  position: string;
  company: string;
  location?: string;
  points: string[];
}

/**
 * Certificate/certification entry in the resume
 */
export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialId?: string;
  link?: string;
}