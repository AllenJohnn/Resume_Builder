import React from 'react';
import { ResumeData } from '../types/resume';

interface ResumePreviewProps {
  resume: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resume }) => {
  return (
    <div className="font-sans text-gray-900 max-w-4xl mx-auto bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">{resume.personalInfo.name || "Your Name"}</h1>
        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
          {resume.personalInfo.phone && <span>|</span>}
          {resume.personalInfo.phone && <span>{resume.personalInfo.phone}</span>}
          {resume.personalInfo.location && <span>|</span>}
          {resume.personalInfo.location && <span>{resume.personalInfo.location}</span>}
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mt-1">
          {resume.personalInfo.portfolioUrl && <span>{resume.personalInfo.portfolioUrl}</span>}
          {resume.personalInfo.linkedin && <span>|</span>}
          {resume.personalInfo.linkedin && <span>{resume.personalInfo.linkedin}</span>}
          {resume.personalInfo.github && <span>|</span>}
          {resume.personalInfo.github && <span>{resume.personalInfo.github}</span>}
        </div>
      </div>

      {resume.profile && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3 pb-1 border-b border-gray-300">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{resume.profile || "Add your professional summary..."}</p>
        </section>
      )}

      {resume.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3 pb-1 border-b border-gray-300">
            Education
          </h2>
          {resume.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-sm text-gray-900">{edu.degree || "Degree"}</h3>
                <span className="text-xs text-gray-600">{edu.period || "Period"}</span>
              </div>
              <p className="text-sm text-gray-700 mt-0.5">{edu.institution || "Institution"}</p>
              {edu.details && <p className="text-xs text-gray-600 mt-1">{edu.details}</p>}
            </div>
          ))}
        </section>
      )}

      {resume.workExperience && resume.workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3 pb-1 border-b border-gray-300">
            Work Experience
          </h2>
          {resume.workExperience.map((work) => (
            <div key={work.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-sm text-gray-900">{work.position || "Position"}</h3>
                <span className="text-xs text-gray-600">{work.period || "Period"}</span>
              </div>
              <p className="text-sm text-gray-700 mt-0.5">{work.company || "Company"}{work.location ? ` • ${work.location}` : ''}</p>
              {work.points.length > 0 && (
                <ul className="list-disc pl-5 text-sm text-gray-700 mt-2 space-y-1">
                  {work.points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {resume.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3 pb-1 border-b border-gray-300">
            Projects
          </h2>
          {resume.projects.map((project) => (
            <div key={project.id} className="mb-4">
              <h3 className="font-semibold text-sm text-gray-900">{project.title || "Project Title"}</h3>
              <p className="text-sm text-gray-700 mt-1">{project.description || "Project description..."}</p>
              {project.points.length > 0 && (
                <ul className="list-disc pl-5 text-sm text-gray-700 mt-2 space-y-1">
                  {project.points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              )}
              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {(resume.skills.technical.length > 0 || resume.skills.soft.length > 0) && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3 pb-1 border-b border-gray-300">
            Skills
          </h2>
          
          {resume.skills.technical.length > 0 && (
            <div className="mb-3">
              <h3 className="text-xs font-medium text-gray-700 mb-2">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {resume.skills.technical.map((skill, idx) => (
                  <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {resume.skills.soft.length > 0 && (
            <div>
              <h3 className="text-xs font-medium text-gray-700 mb-2">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {resume.skills.soft.map((skill, idx) => (
                  <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {resume.certificates.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3 pb-1 border-b border-gray-300">
            Certifications
          </h2>
          {resume.certificates.map((cert) => (
            <div key={cert.id} className="mb-3">
              <h3 className="font-semibold text-sm text-gray-900">{cert.title || "Certificate Title"}</h3>
              <p className="text-sm text-gray-700 mt-0.5">{cert.issuer || "Issuer"} • {cert.year || "Year"}</p>
              {cert.credentialId && <p className="text-xs text-gray-600 mt-0.5">ID: {cert.credentialId}</p>}
            </div>
          ))}
        </section>
      )}

      {!resume.profile && resume.education.length === 0 && 
       (!resume.workExperience || resume.workExperience.length === 0) &&
       resume.projects.length === 0 && 
       resume.skills.technical.length === 0 && resume.skills.soft.length === 0 && 
       resume.certificates.length === 0 && (
        <div className="text-center py-16 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
          <div className="text-4xl mb-4">+</div>
          <p className="text-base font-medium text-gray-900">Resume is empty</p>
          <p className="text-sm text-gray-500 mt-1">Start editing to build your professional resume</p>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;