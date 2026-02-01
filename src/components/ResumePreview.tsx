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
  const hasText = (value?: string) => !!value && value.trim().length > 0;

  const hasName = hasText(resume.personalInfo.name);
  const hasContact = [
    resume.personalInfo.email,
    resume.personalInfo.phone,
    resume.personalInfo.location,
    resume.personalInfo.portfolioUrl,
    resume.personalInfo.linkedin,
    resume.personalInfo.github
  ].some(hasText);

  const hasHeader = hasName || hasContact;

  const filteredProjects = resume.projects.filter((project) =>
    hasText(project.title) ||
    hasText(project.description) ||
    project.points.some((point) => hasText(point)) ||
    project.technologies.some((tech) => hasText(tech)) ||
    hasText(project.link)
  );

  const filteredEducation = resume.education.filter((edu) =>
    hasText(edu.period) ||
    hasText(edu.degree) ||
    hasText(edu.institution) ||
    hasText(edu.details) ||
    hasText(edu.gpa)
  );

  const filteredCertificates = resume.certificates.filter((cert) =>
    hasText(cert.title) ||
    hasText(cert.issuer) ||
    hasText(cert.year) ||
    hasText(cert.credentialId) ||
    hasText(cert.link)
  );

  const filteredWorkExperience = (resume.workExperience || []).filter((work) =>
    hasText(work.position) ||
    hasText(work.company) ||
    hasText(work.period) ||
    hasText(work.location) ||
    work.points.some((point) => hasText(point))
  );

  const filteredTechnicalSkills = (resume.skills.technical || []).filter(hasText);
  const filteredSoftSkills = (resume.skills.soft || []).filter(hasText);
  const filteredLanguageSkills = (resume.skills.languages || []).filter(hasText);

  const hasSkills =
    filteredTechnicalSkills.length > 0 ||
    filteredSoftSkills.length > 0 ||
    filteredLanguageSkills.length > 0;

  const isResumeEmpty =
    !hasHeader &&
    !hasText(resume.profile) &&
    filteredProjects.length === 0 &&
    filteredEducation.length === 0 &&
    filteredCertificates.length === 0 &&
    filteredWorkExperience.length === 0 &&
    !hasSkills;

  return (
    <div className="font-sans text-gray-900 max-w-4xl mx-auto bg-white p-8">
      {/* Header Section */}
      {hasHeader && (
        <div className="mb-6 border-b-2 border-gray-900 pb-4">
          {hasName && (
            <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              {resume.personalInfo.name}
            </h1>
          )}
          
          {/* Contact Info - Left and Right Layout */}
          {hasContact && (
            <div className="flex justify-between items-start text-xs">
              <div className="space-y-2">
                {hasText(resume.personalInfo.email) && (
                  <div className="flex items-center gap-2">
                    <img src={mailIcon} alt="email" className="w-4 h-4" />
                    <span className="text-gray-700">{resume.personalInfo.email}</span>
                  </div>
                )}
                {hasText(resume.personalInfo.location) && (
                  <div className="flex items-center gap-2">
                    <img src={locIcon} alt="location" className="w-4 h-4" />
                    <span className="text-gray-700">{resume.personalInfo.location}</span>
                  </div>
                )}
                {hasText(resume.personalInfo.portfolioUrl) && (
                  <div className="flex items-center gap-2">
                    <img src={linkIcon} alt="portfolio" className="w-4 h-4" />
                    <span className="text-gray-700">{resume.personalInfo.portfolioUrl}</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2 text-right">
                {hasText(resume.personalInfo.phone) && (
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-gray-700">{resume.personalInfo.phone}</span>
                    <img src={phoneIcon} alt="phone" className="w-4 h-4" />
                  </div>
                )}
                {hasText(resume.personalInfo.github) && (
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-gray-700">{resume.personalInfo.github}</span>
                    <img src={githubIcon} alt="github" className="w-4 h-4" />
                  </div>
                )}
                {hasText(resume.personalInfo.linkedin) && (
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-gray-700">{resume.personalInfo.linkedin}</span>
                    <img src={linkedinIcon} alt="linkedin" className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Profile Section */}
      {hasText(resume.profile) && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2 border-b border-gray-400 pb-1">
            Profile
          </h2>
          <p className="text-xs text-gray-700 leading-relaxed">{resume.profile}</p>
        </section>
      )}

      {/* Projects Section */}
      {filteredProjects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2 border-b border-gray-400 pb-1">
            Projects
          </h2>
          {filteredProjects.map((project) => (
            <div key={project.id} className="mb-3">
              <h3 className="font-bold text-xs text-gray-900">
                {project.title}
                {hasText(project.description) && <span className="font-normal ml-1">— {project.description}</span>}
              </h3>
              {project.points.filter(hasText).length > 0 && (
                <ul className="list-disc pl-5 text-xs text-gray-700 mt-1 space-y-0.5">
                  {project.points.filter(hasText).map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills Section */}
      {hasSkills && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2 border-b border-gray-400 pb-1">
            Skills
          </h2>
          
          <div className="grid grid-cols-2 gap-4 text-xs">
            {filteredTechnicalSkills.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Technical Skills</h3>
                <div className="space-y-0.5">
                  {filteredTechnicalSkills.map((skill, idx) => (
                    <div key={idx} className="text-gray-700">• {skill}</div>
                  ))}
                </div>
              </div>
            )}

            {filteredSoftSkills.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Soft Skills</h3>
                <div className="space-y-0.5">
                  {filteredSoftSkills.map((skill, idx) => (
                    <div key={idx} className="text-gray-700">• {skill}</div>
                  ))}
                </div>
              </div>
            )}

            {filteredLanguageSkills.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Languages</h3>
                <div className="space-y-0.5">
                  {filteredLanguageSkills.map((language, idx) => (
                    <div key={idx} className="text-gray-700">• {language}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Certificates Section */}
      {filteredCertificates.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2 border-b border-gray-400 pb-1">
            Certificates
          </h2>
          <div className="grid grid-cols-2 gap-4 text-xs">
            {filteredCertificates.map((cert) => (
              <div key={cert.id}>
                {hasText(cert.title) && (
                  <p className="font-semibold text-gray-900">{cert.title}</p>
                )}
                {(hasText(cert.issuer) || hasText(cert.year)) && (
                  <p className="text-gray-700">
                    {cert.issuer}{hasText(cert.issuer) && hasText(cert.year) ? " " : ""}
                    {hasText(cert.year) ? `(${cert.year})` : ""}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {filteredEducation.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2 border-b border-gray-400 pb-1">
            Education
          </h2>
          {filteredEducation.map((edu) => (
            <div key={edu.id} className="mb-2 text-xs">
              <div className="flex justify-between items-baseline">
                {hasText(edu.period) && <h3 className="font-bold text-gray-900">{edu.period}</h3>}
                {hasText(edu.degree) && <span className="text-gray-900 font-semibold">{edu.degree}</span>}
              </div>
              {hasText(edu.institution) && (
                <p className="text-gray-700 font-semibold">{edu.institution}</p>
              )}
              {hasText(edu.details) && <p className="text-gray-700">{edu.details}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Work Experience Section - Hidden by default to match template */}
      {filteredWorkExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2 border-b border-gray-400 pb-1">
            Work Experience
          </h2>
          {filteredWorkExperience.map((work) => (
            <div key={work.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                {hasText(work.position) && (
                  <h3 className="font-semibold text-sm text-gray-900">{work.position}</h3>
                )}
                {hasText(work.period) && (
                  <span className="text-xs text-gray-600">{work.period}</span>
                )}
              </div>
              {(hasText(work.company) || hasText(work.location)) && (
                <p className="text-sm text-gray-700 mt-0.5">
                  {work.company}{hasText(work.company) && hasText(work.location) ? " • " : ""}{work.location}
                </p>
              )}
              {work.points.filter(hasText).length > 0 && (
                <ul className="list-disc pl-5 text-sm text-gray-700 mt-2 space-y-1">
                  {work.points.filter(hasText).map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {isResumeEmpty && (
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