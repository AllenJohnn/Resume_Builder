import React from 'react';
import { ResumeData } from '../types/resume';

interface SvgIconProps {
  className?: string;
}

const MailIcon: React.FC<SvgIconProps> = ({ className }) => (
  <svg viewBox="0 0 512 512" fill="currentColor" className={className}>
    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 196V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V196L294.4 359.2c-22.8 17.1-54 17.1-76.8 0L0 196z" />
  </svg>
);

const MapPinIcon: React.FC<SvgIconProps> = ({ className }) => (
  <svg viewBox="0 0 384 512" fill="currentColor" className={className}>
    <path d="M192 0C86 0 0 86 0 192c0 77.4 27.3 99.8 172.3 289.2c9.6 12.5 28.5 12.5 38.1 0C356.7 291.8 384 269.4 384 192C384 86 298 0 192 0zm0 272c-44.2 0-80-35.8-80-80s35.8-80 80-80s80 35.8 80 80s-35.8 80-80 80z" />
  </svg>
);

const LinkIcon: React.FC<SvgIconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className={className}>
    <path d="M10 14l-2 2a3 3 0 01-4-4l3-3a3 3 0 014 0" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 10l2-2a3 3 0 114 4l-3 3a3 3 0 01-4 0" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 15l6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PhoneIcon: React.FC<SvgIconProps> = ({ className }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M3.654 1.328a.678.678 0 0 1 .737-.103l2.224.981a.678.678 0 0 1 .397.651l-.143 2.246a.678.678 0 0 1-.184.41l-1.05 1.05a11.72 11.72 0 0 0 4.47 4.47l1.05-1.05a.678.678 0 0 1 .41-.184l2.246-.143a.678.678 0 0 1 .651.397l.981 2.224a.678.678 0 0 1-.103.737l-1.2 1.2a1.745 1.745 0 0 1-1.821.427A17.57 17.57 0 0 1 .56 3.149a1.745 1.745 0 0 1 .427-1.821l1.2-1.2z" />
  </svg>
);

const GithubIcon: React.FC<SvgIconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon: React.FC<SvgIconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

interface ResumePreviewProps {
  resume: ResumeData;
  density?: 'compact' | 'comfortable';
}

interface HeaderItem {
  key: string;
  value: string;
  icon: React.ReactNode;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  resume,
  density = 'compact',
}) => {
  const hasText = (value?: string) => !!value && value.trim().length > 0;

  const cleanText = (value?: string) => (value || '').trim();

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

  const headerItemsLeft: HeaderItem[] = [
    {
      key: 'email',
      value: cleanText(resume.personalInfo.email),
      icon: <MailIcon className="h-[12px] w-[12px] shrink-0 text-gray-900" />,
    },
    {
      key: 'location',
      value: cleanText(resume.personalInfo.location),
      icon: <MapPinIcon className="h-[12px] w-[12px] shrink-0 text-gray-900" />,
    },
    {
      key: 'portfolio',
      value: cleanText(resume.personalInfo.portfolioUrl),
      icon: <LinkIcon className="h-[12px] w-[12px] shrink-0 text-gray-900" />,
    },
  ].filter((item) => hasText(item.value));

  const headerItemsRight: HeaderItem[] = [
    {
      key: 'phone',
      value: cleanText(resume.personalInfo.phone),
      icon: <PhoneIcon className="h-[12px] w-[12px] shrink-0 text-gray-900 md:order-2" />,
    },
    {
      key: 'github',
      value: cleanText(resume.personalInfo.github),
      icon: <GithubIcon className="h-[12px] w-[12px] shrink-0 text-gray-900 md:order-2" />,
    },
    {
      key: 'linkedin',
      value: cleanText(resume.personalInfo.linkedin),
      icon: <LinkedInIcon className="h-[12px] w-[12px] shrink-0 text-gray-900 md:order-2" />,
    },
  ].filter((item) => hasText(item.value));

  return (
    <div className={`resume-sheet resume-density-${density} mx-auto bg-white text-gray-900`}>
      {/* Header Section */}
      {hasHeader && (
        <header className="resume-block pb-4">
          {hasName && (
            <h1 className="resume-name mb-4 uppercase tracking-[0.02em] text-gray-900">
              {resume.personalInfo.name}
            </h1>
          )}

          {/* Contact Info - Left and Right Layout */}
          {hasContact && (
            <div className="grid grid-cols-1 gap-2 text-[13px] leading-[1.25] text-gray-900 md:grid-cols-2 md:gap-4">
              <div className="space-y-1.5">
                {headerItemsLeft.map((item) => {
                  return (
                    <div key={item.key} className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.value}</span>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-1.5 md:text-right">
                {headerItemsRight.map((item) => {
                  return (
                    <div key={item.key} className="flex items-center gap-2 md:justify-end">
                      {item.icon}
                      <span className="md:order-1">{item.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </header>
      )}

      {/* Profile Section */}
      {hasText(resume.profile) && (
        <section className="resume-block">
          <h2 className="resume-section-title">Profile</h2>
          <p className="resume-text leading-[1.45] text-gray-900">{resume.profile}</p>
        </section>
      )}

      {/* Projects Section */}
      {filteredProjects.length > 0 && (
        <section className="resume-block">
          <h2 className="resume-section-title">Projects</h2>
          {filteredProjects.map((project) => (
            <article key={project.id} className="mb-3 last:mb-0">
              <h3 className="resume-subtitle text-gray-900">
                {project.title}
                {hasText(project.description) && (
                  <span className="ml-1 font-normal">- {project.description}</span>
                )}
              </h3>

              {project.points.filter(hasText).length > 0 && (
                <ul className="resume-list mt-1 text-gray-900">
                  {project.points.filter(hasText).map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              )}

              {project.technologies.filter(hasText).length > 0 && (
                <p className="resume-text mt-1 text-gray-900">
                  <span className="font-semibold">Tech:</span>{' '}
                  {project.technologies.filter(hasText).join(', ')}
                </p>
              )}
            </article>
          ))}
        </section>
      )}

      {/* Skills Section */}
      {hasSkills && (
        <section className="resume-block">
          <h2 className="resume-section-title">Skills</h2>

          <div className="grid grid-cols-1 gap-3 text-gray-900 md:grid-cols-2 md:gap-4">
            {filteredTechnicalSkills.length > 0 && (
              <div>
                <h3 className="resume-subtitle mb-1">Technical Skills</h3>
                <ul className="resume-list-tight">
                  {filteredTechnicalSkills.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}

            {filteredSoftSkills.length > 0 && (
              <div>
                <h3 className="resume-subtitle mb-1">Soft Skills</h3>
                <ul className="resume-list-tight">
                  {filteredSoftSkills.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}

            {filteredLanguageSkills.length > 0 && (
              <div>
                <h3 className="resume-subtitle mb-1">Languages</h3>
                <ul className="resume-list-tight">
                  {filteredLanguageSkills.map((language, idx) => (
                    <li key={idx}>{language}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Certificates Section */}
      {filteredCertificates.length > 0 && (
        <section className="resume-block">
          <h2 className="resume-section-title">Certificates</h2>
          <div className="grid grid-cols-1 gap-3 text-gray-900 md:grid-cols-2 md:gap-4">
            {filteredCertificates.map((cert) => (
              <article key={cert.id}>
                {hasText(cert.title) && <p className="resume-subtitle">{cert.title}</p>}
                {(hasText(cert.issuer) || hasText(cert.year)) && (
                  <p className="resume-text text-gray-900">
                    {cert.issuer}
                    {hasText(cert.issuer) && hasText(cert.year) ? ' ' : ''}
                    {hasText(cert.year) ? `(${cert.year})` : ''}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {filteredEducation.length > 0 && (
        <section className="resume-block">
          <h2 className="resume-section-title">Education</h2>
          {filteredEducation.map((edu) => (
            <article key={edu.id} className="mb-2 last:mb-0">
              <div className="grid grid-cols-1 gap-1 md:grid-cols-[130px_1fr] md:gap-3">
                {hasText(edu.period) && <p className="resume-text text-gray-900">{edu.period}</p>}
                <div>
                  {hasText(edu.degree) && <h3 className="resume-subtitle uppercase">{edu.degree}</h3>}
                  {hasText(edu.institution) && (
                    <p className="resume-text italic text-gray-900">{edu.institution}</p>
                  )}
                  {hasText(edu.details) && <p className="resume-text text-gray-900">{edu.details}</p>}
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      {/* Work Experience Section */}
      {filteredWorkExperience.length > 0 && (
        <section className="resume-block">
          <h2 className="resume-section-title">Work Experience</h2>
          {filteredWorkExperience.map((work) => (
            <article key={work.id} className="mb-3 last:mb-0">
              <div className="grid grid-cols-1 gap-1 md:grid-cols-[130px_1fr] md:gap-3">
                {hasText(work.period) && <p className="resume-text text-gray-900">{work.period}</p>}
                <div>
                  {hasText(work.position) && <h3 className="resume-subtitle uppercase">{work.position}</h3>}
                  {(hasText(work.company) || hasText(work.location)) && (
                    <p className="resume-text italic text-gray-900">
                      {work.company}
                      {hasText(work.company) && hasText(work.location) ? ' | ' : ''}
                      {work.location}
                    </p>
                  )}
                  {work.points.filter(hasText).length > 0 && (
                    <ul className="resume-list mt-1 text-gray-900">
                      {work.points.filter(hasText).map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      {isResumeEmpty && (
        <div className="rounded border border-dashed border-gray-300 px-4 py-12 text-center text-gray-500">
          <p className="text-base font-semibold text-gray-900">Resume is empty</p>
          <p className="mt-1 text-sm">Start editing to build your professional resume</p>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;