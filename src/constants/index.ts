import { ResumeData } from '../types/resume';

export const APP_NAME = 'Resume Builder';
export const APP_DESCRIPTION = 'Professional & ATS-Optimized';

export const EMPTY_RESUME: ResumeData = {
  personalInfo: {
    name: '',
    email: '',
    location: '',
    portfolioUrl: '',
    phone: '',
    linkedin: '',
    github: '',
  },
  profile: '',
  education: [],
  projects: [],
  workExperience: [],
  skills: {
    technical: [],
    soft: [],
    languages: [],
  },
  certificates: [],
};

export const SOCIAL_LINKS = {
  github: 'https://github.com/AllenJohnn',
  linkedin: 'https://www.linkedin.com/in/allenjohnjoy/',
  portfolio: 'https://allenjohn-portfolio.vercel.app/',
} as const;

export const EXPORT_FORMATS = {
  PDF: 'pdf',
  DOCX: 'docx',
  HTML: 'html',
} as const;

export const PDF_CONFIG = {
  scale: 2,
  format: 'a4' as const,
  orientation: 'portrait' as const,
  unit: 'mm' as const,
  imgWidth: 210,
};
