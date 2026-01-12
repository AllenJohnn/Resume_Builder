import React from 'react';
import { ResumeData } from '../types/resume';
import PersonalInfoForm from './forms/PersonalInfoForm';
import ProfileForm from './forms/ProfileForm';
import EducationForm from './forms/EducationForm';
import WorkExperienceForm from './forms/WorkExperienceForm';
import ProjectsForm from './forms/ProjectsForm';
import SkillsForm from './forms/SkillsForm';
import CertificatesForm from './forms/CertificatesForm';

interface ResumeFormProps {
  resume: ResumeData;
  setResume: (resume: ResumeData) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ resume, setResume }) => {
  const updateSection = (section: keyof ResumeData, value: any) => {
    setResume({
      ...resume,
      [section]: value
    });
  };

  return (
    <div className="space-y-6">
      <PersonalInfoForm 
        data={resume.personalInfo} 
        onChange={(data) => updateSection('personalInfo', data)} 
      />
      
      <ProfileForm 
        data={resume.profile} 
        onChange={(data) => updateSection('profile', data)} 
      />
      
      <EducationForm 
        data={resume.education} 
        onChange={(data) => updateSection('education', data)} 
      />
      
      <WorkExperienceForm 
        data={resume.workExperience || []} 
        onChange={(data) => updateSection('workExperience', data)} 
      />
      
      <ProjectsForm 
        data={resume.projects} 
        onChange={(data) => updateSection('projects', data)} 
      />
      
      <SkillsForm 
        data={resume.skills} 
        onChange={(data) => updateSection('skills', data)} 
      />
      
      <CertificatesForm 
        data={resume.certificates} 
        onChange={(data) => updateSection('certificates', data)} 
      />
      

    </div>
  );
};

export default ResumeForm;