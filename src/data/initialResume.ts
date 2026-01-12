import { ResumeData } from '../types/resume';

export const initialResume: ResumeData = {
  personalInfo: {
    name: "Alexander Mitchell",
    email: "alex.mitchell@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    portfolioUrl: "alexandermitchell.dev",
    linkedin: "linkedin.com/in/alexandermitchell",
    github: "github.com/alexmitchell"
  },
  profile: "Results-driven software engineer with 5+ years of experience in full-stack development. Specialized in building scalable web applications using modern frameworks and cloud technologies. Proven track record of delivering high-quality solutions that improve user experience and drive business growth.",
  education: [
    {
      id: "1",
      period: "2016 - 2020",
      degree: "Bachelor of Science in Computer Science",
      institution: "Stanford University",
      details: "GPA: 3.8/4.0 | Dean's List | Focus: Software Engineering & AI",
      gpa: "3.8"
    },
    {
      id: "2",
      period: "2014 - 2016",
      degree: "Associate Degree in Information Technology",
      institution: "Community College of San Francisco",
      details: "Honors Graduate | GPA: 3.9/4.0"
    }
  ],
  workExperience: [
    {
      id: "1",
      period: "2022 - Present",
      position: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      points: [
        "Led development of microservices architecture serving 2M+ daily active users",
        "Reduced application load time by 40% through code optimization and caching strategies",
        "Mentored team of 5 junior developers and conducted code reviews",
        "Implemented CI/CD pipeline reducing deployment time by 60%"
      ]
    },
    {
      id: "2",
      period: "2020 - 2022",
      position: "Full Stack Developer",
      company: "StartupVenture LLC",
      location: "Palo Alto, CA",
      points: [
        "Built responsive web applications using React, Node.js, and PostgreSQL",
        "Collaborated with UX team to implement intuitive user interfaces",
        "Integrated third-party APIs and payment processing systems",
        "Participated in agile development process and sprint planning"
      ]
    }
  ],
  projects: [
    {
      id: "1",
      title: "E-Commerce Analytics Platform",
      description: "Real-time analytics dashboard for e-commerce businesses with advanced data visualization.",
      points: [
        "Architected scalable backend using Node.js and MongoDB",
        "Implemented real-time data processing with WebSocket connections",
        "Created interactive dashboards using D3.js and Chart.js",
        "Achieved 99.9% uptime with automated monitoring and alerts"
      ],
      technologies: ["React", "Node.js", "MongoDB", "WebSocket", "D3.js", "AWS"],
      link: "github.com/alexmitchell/ecommerce-analytics"
    },
    {
      id: "2",
      title: "Task Management System",
      description: "Collaborative project management tool with real-time updates and team communication features.",
      points: [
        "Designed RESTful API with authentication and authorization",
        "Implemented real-time collaboration using Socket.io",
        "Built responsive UI with Material-UI components"
      ],
      technologies: ["TypeScript", "Express", "PostgreSQL", "Socket.io", "Docker"],
      link: "github.com/alexmitchell/task-manager"
    }
  ],
  skills: {
    technical: [
      "JavaScript", "TypeScript", "Python", "Java",
      "React", "Node.js", "Express", "Next.js",
      "PostgreSQL", "MongoDB", "Redis",
      "AWS", "Docker", "Kubernetes", "Git"
    ],
    soft: [
      "Leadership", "Problem Solving", "Communication",
      "Agile Methodology", "Team Collaboration", "Critical Thinking"
    ]
  },
  certificates: [
    {
      id: "1",
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      year: "2023",
      credentialId: "AWS-CSA-2023-12345"
    },
    {
      id: "2",
      title: "Professional Scrum Master I",
      issuer: "Scrum.org",
      year: "2022",
      credentialId: "PSM-I-987654"
    },
    {
      id: "3",
      title: "MongoDB Certified Developer",
      issuer: "MongoDB University",
      year: "2021"
    }
  ]
};
