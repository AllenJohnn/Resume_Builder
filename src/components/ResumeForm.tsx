import React from 'react';
import { Collapse } from 'antd';
import { User, Briefcase, GraduationCap, Code, Lightbulb, FileBadge, UserCircle } from 'lucide-react';
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

  const getPanelHeader = (title: string, icon: React.ReactNode) => (
    <div className="flex items-center gap-3 font-semibold text-slate-800 text-base">
      {icon}
      <span>{title}</span>
    </div>
  );

  const items = [
    {
      key: '1',
      label: getPanelHeader('Personal Information', <User size={20} className="text-blue-500" />),
      children: <PersonalInfoForm data={resume.personalInfo} onChange={(data) => updateSection('personalInfo', data)} />
    },
    {
      key: '2',
      label: getPanelHeader('Professional Summary', <UserCircle size={20} className="text-indigo-500" />),
      children: <ProfileForm data={resume.profile} onChange={(data) => updateSection('profile', data)} />
    },
    {
      key: '3',
      label: getPanelHeader('Work Experience', <Briefcase size={20} className="text-emerald-500" />),
      children: <WorkExperienceForm data={resume.workExperience || []} onChange={(data) => updateSection('workExperience', data)} />
    },
    {
      key: '4',
      label: getPanelHeader('Education', <GraduationCap size={20} className="text-amber-500" />),
      children: <EducationForm data={resume.education} onChange={(data) => updateSection('education', data)} />
    },
    {
      key: '5',
      label: getPanelHeader('Projects', <Code size={20} className="text-rose-500" />),
      children: <ProjectsForm data={resume.projects} onChange={(data) => updateSection('projects', data)} />
    },
    {
      key: '6',
      label: getPanelHeader('Skills', <Lightbulb size={20} className="text-cyan-500" />),
      children: <SkillsForm data={resume.skills} onChange={(data) => updateSection('skills', data)} />
    },
    {
      key: '7',
      label: getPanelHeader('Certificates', <FileBadge size={20} className="text-violet-500" />),
      children: <CertificatesForm data={resume.certificates} onChange={(data) => updateSection('certificates', data)} />
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <Collapse 
        items={items} 
        defaultActiveKey={['1']} 
        accordion 
        expandIconPosition="end"
        ghost
        className="w-full [&_.ant-collapse-item]:border-b [&_.ant-collapse-item]:border-slate-100 last:[&_.ant-collapse-item]:border-none"
      />
    </div>
  );
};

export default ResumeForm;