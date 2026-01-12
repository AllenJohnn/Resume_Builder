import React from 'react';
import { ResumeData } from '../types/resume';

interface ATSAnalyzerProps {
  resume: ResumeData;
}

const ATSAnalyzer: React.FC<ATSAnalyzerProps> = ({ resume }) => {
  const checks = [
    {
      id: 1,
      name: 'Contact Information',
      passed: !!resume.personalInfo.name && !!resume.personalInfo.email && !!resume.personalInfo.location,
      tip: 'Include name, email, and location'
    },
    {
      id: 2,
      name: 'Professional Summary',
      passed: resume.profile.length > 50,
      tip: 'Write a compelling summary (50-200 words)'
    },
    {
      id: 3,
      name: 'Education Section',
      passed: resume.education.length >= 1,
      tip: 'List at least one educational qualification'
    },
    {
      id: 4,
      name: 'Work Experience',
      passed: (resume.workExperience && resume.workExperience.length >= 1) || resume.projects.length >= 2,
      tip: 'Include work experience or substantial projects'
    },
    {
      id: 5,
      name: 'Projects/Portfolio',
      passed: resume.projects.length >= 1,
      tip: 'Showcase at least one project with details'
    },
    {
      id: 6,
      name: 'Skills Listed',
      passed: resume.skills.technical.length >= 3,
      tip: 'List at least 3 relevant technical skills'
    },
    {
      id: 7,
      name: 'Action-Oriented Content',
      passed: resume.projects.some(p => p.points.length > 0) || 
              (resume.workExperience && resume.workExperience.some(w => w.points.length > 0)),
      tip: 'Use bullet points with action verbs'
    },
    {
      id: 8,
      name: 'ATS-Friendly Format',
      passed: true,
      tip: 'This template is ATS-friendly (no complex formatting)'
    }
  ];

  const score = checks.filter(c => c.passed).length;
  const total = checks.length;
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Compatibility Score</h3>
            <p className="text-sm text-gray-600 mt-1">Applicant Tracking System readiness</p>
          </div>
          <div className="text-center">
            <div className={`text-4xl font-bold ${percentage >= 80 ? 'text-gray-900' : percentage >= 60 ? 'text-gray-700' : 'text-gray-600'}`}>
              {percentage}%
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {score} of {total} checks
            </div>
          </div>
        </div>
        
        <div className="bg-gray-200 rounded-full h-2">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${percentage >= 80 ? 'bg-gray-900' : percentage >= 60 ? 'bg-gray-700' : 'bg-gray-500'}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>


      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-900">Analysis Details</h4>
        {checks.map((check) => (
          <div key={check.id} className="flex items-start p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
            <div className="mr-3 mt-0.5">
              {check.passed ? (
                <div className="w-5 h-5 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs">✓</div>
              ) : (
                <div className="w-5 h-5 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-xs">×</div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-900">{check.name}</span>
                <span className={`text-xs font-medium ${check.passed ? 'text-gray-900' : 'text-gray-500'}`}>
                  {check.passed ? 'PASS' : 'NEEDS WORK'}
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-1">{check.tip}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ATSAnalyzer;