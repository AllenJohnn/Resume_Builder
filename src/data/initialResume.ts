import { ResumeData } from '../types/resume';

export const initialResume: ResumeData = {
  personalInfo: {
    name: "Your Name",
    email: "your.email@example.com",
    phone: "+1 (555) 123-4567",
    location: "City, State",
    portfolioUrl: "yourportfolio.com",
    linkedin: "linkedin.com/in/yourprofile",
    github: "github.com/yourprofile"
  },
  profile: "Results-driven software engineer with hands-on experience in full-stack development using modern technologies. Strong foundation in web development, cloud services, and software architecture with a proven track record of delivering high-quality solutions.",
  education: [
    {
      id: "1",
      period: "2020 - 2024",
      degree: "Bachelor of Science in Computer Science",
      institution: "University Name",
      details: "Relevant coursework and achievements"
    },
    {
      id: "2",
      period: "2018 - 2020",
      degree: "High School Diploma",
      institution: "High School Name",
      details: ""
    }
  ],
  workExperience: [],
  projects: [
    {
      id: "1",
      title: "Project Title One",
      description: "Brief description of your first project",
      points: [
        "Key achievement or responsibility one",
        "Key achievement or responsibility two",
        "Key achievement or responsibility three"
      ],
      technologies: ["Tech1", "Tech2", "Tech3"],
      link: ""
    },
    {
      id: "2",
      title: "Project Title Two",
      description: "Brief description of your second project",
      points: [
        "Key achievement or responsibility one",
        "Key achievement or responsibility two"
      ],
      technologies: ["Tech1", "Tech2"],
      link: ""
    }
  ],
  skills: {
    technical: [
      "Programming Languages: Python, Java",
      "Frontend: React, Angular",
      "Backend: Node.js",
    ],
    soft: [
      "Problem Solving",
      "Team Collaboration",
      "Communication",
      "Adaptability"
    ]
  },
  certificates: [
    {
      id: "1",
      title: "Certification Name One",
      issuer: "Issuing Organization",
      year: "2023",
      credentialId: ""
    },
    {
      id: "2",
      title: "Certification Name Two",
      issuer: "Issuing Organization",
      year: "2022",
      credentialId: ""
    }
  ]
};
