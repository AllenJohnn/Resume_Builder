import React from 'react';
import { ResumeData } from '../types/resume';
import mailIcon from '../assets/icons/mail.png';
import locIcon from '../assets/icons/loc.png';
import linkIcon from '../assets/icons/link.png';
import phoneIcon from '../assets/icons/call.png';
import githubIcon from '../assets/icons/github.png';
import linkedinIcon from '../assets/icons/linkedin.png';

interface ResumePreviewProps {
  resume: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resume }) => {
  return (
    <div className="font-sans text-gray-900 max-w-4xl mx-auto bg-white p-8">
      {/* Header Section */}
      <div className="mb-6 border-b-2 border-gray-900 pb-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">{resume.personalInfo.name || "Your Name"}</h1>
        
        {/* Contact Info - Left and Right Layout */}
        <div className="flex justify-between items-start text-xs">
          <div className="space-y-2">
            {resume.personalInfo.email && (
              <div className="flex items-center gap-2">
                <img src={mailIcon} alt="email" className="w-4 h-4" />
                <span className="text-gray-700">{resume.personalInfo.email}</span>
              </div>
            )}
            {resume.personalInfo.location && (
              <div className="flex items-center gap-2">
                <img src={locIcon} alt="location" className="w-4 h-4" />
                <span className="text-gray-700">{resume.personalInfo.location}</span>
              </div>
            )}
            {resume.personalInfo.portfolioUrl && (
              <div className="flex items-center gap-2">
                <img src={linkIcon} alt="portfolio" className="w-4 h-4" />
                <span className="text-gray-700">{resume.personalInfo.portfolioUrl}</span>
              </div>
            )}
          </div>
          
          <div className="space-y-2 text-right">
            {resume.personalInfo.phone && (
              <div className="flex items-center justify-end gap-2">
                <span className="text-gray-700">{resume.personalInfo.phone}</span>
                <img src={phoneIcon} alt="phone" className="w-4 h-4" />
              </div>
            )}
            {resume.personalInfo.github && (
              <div className="flex items-center justify-end gap-2">
                <span className="text-gray-700">{resume.personalInfo.github}</span>
                <img src={githubIcon} alt="github" className="w-4 h-4" />
              </div>
            )}
            {resume.personalInfo.linkedin && (
              <div className="flex items-center justify-end gap-2">
                <span className="text-gray-700">{resume.personalInfo.linkedin}</span>
                <img src={linkedinIcon} alt="linkedin" className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Section */}
      {resume.profile && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2 border-b border-gray-400 pb-1">
            Profile
          </h2>
          <p className="text-xs text-gray-700 leading-relaxed">{resume.profile || "Add your professional summary..."}</p>
        </section>
      )}

      {/* Projects Section */}
      {resume.projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2 border-b border-gray-400 pb-1">
            Projects
          </h2>
          {resume.projects.map((project) => (
            <div key={project.id} className="mb-3">
              <h3 className="font-bold text-xs text-gray-900">
                {project.title || "Project Title"}
                {project.description && <span className="font-normal ml-1">— {project.description}</span>}
              </h3>
              {project.points.length > 0 && (
                <ul className="list-disc pl-5 text-xs text-gray-700 mt-1 space-y-0.5">
                  {project.points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills Section */}
      {(resume.skills.technical.length > 0 || resume.skills.soft.length > 0) && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2 border-b border-gray-400 pb-1">
            Skills
          </h2>
          
          <div className="grid grid-cols-2 gap-4 text-xs">
            {resume.skills.technical.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Technical Skills</h3>
                <div className="space-y-0.5">
                  {resume.skills.technical.map((skill, idx) => (
                    <div key={idx} className="text-gray-700">• {skill}</div>
                  ))}
                </div>
              </div>
            )}

            {resume.skills.soft.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Soft Skills</h3>
                <div className="space-y-0.5">
                  {resume.skills.soft.map((skill, idx) => (
                    <div key={idx} className="text-gray-700">• {skill}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Certificates Section */}
      {resume.certificates.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2 border-b border-gray-400 pb-1">
            Certificates
          </h2>
          <div className="grid grid-cols-2 gap-4 text-xs">
            {resume.certificates.map((cert) => (
              <div key={cert.id}>
                <p className="font-semibold text-gray-900">{cert.title || "Certificate Title"}</p>
                <p className="text-gray-700">{cert.issuer || "Issuer"} ({cert.year || "Year"})</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {resume.education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2 border-b border-gray-400 pb-1">
            Education
          </h2>
          {resume.education.map((edu) => (
            <div key={edu.id} className="mb-2 text-xs">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-gray-900">{edu.period || "Period"}</h3>
                <span className="text-gray-900 font-semibold">{edu.degree || "Degree"}</span>
              </div>
              <p className="text-gray-700 font-semibold">{edu.institution || "Institution"}</p>
              {edu.details && <p className="text-gray-700">{edu.details}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Work Experience Section - Hidden by default to match template */}
      {resume.workExperience && resume.workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2 border-b border-gray-400 pb-1">
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