import React from "react";
import { ResumeData } from "../types/resume";
import { Mail, MapPin, Link2, Phone } from "lucide-react";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";

interface ResumePreviewProps {
  resume: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resume }) => {
  const { personalInfo, profile, workExperience, projects, skills, certificates, education } = resume;

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="mt-8 mb-4">
      <h2 className="text-[13px] font-black text-slate-900 uppercase tracking-[0.2em]">{title}</h2>
      <div className="w-full border-b border-slate-300 mt-2"></div>
    </div>
  );

  return (
    <div 
      className="resume-sheet bg-white mx-auto shadow-sm flex flex-col p-12 text-slate-800" 
      style={{ 
        width: "100%", 
        minHeight: "1056px", 
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif", 
        boxSizing: "border-box",
      }}
    >
      {/* HEADER SECTION (CENTERED) */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase mb-4">
          {personalInfo.name || "YOUR NAME"}
        </h1>
        
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[13px] text-slate-600 font-medium">
          {personalInfo.email && (
            <div className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
              <Mail size={14} className="text-slate-400" />
              <a href={`mailto:${personalInfo.email}`} className="text-inherit no-underline">{personalInfo.email}</a>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1.5">
              <Phone size={14} className="text-slate-400" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-slate-400" />
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[13px] text-slate-600 font-medium mt-2">
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
              <LinkedinOutlined style={{ fontSize: '14px' }} className="text-slate-400" />
              <a href={personalInfo.linkedin} className="text-inherit no-underline">
                {personalInfo.linkedin.replace(/^https?:\/\//, "").replace("www.linkedin.com/in/", "")}
              </a>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
              <GithubOutlined style={{ fontSize: '14px' }} className="text-slate-400" />
              <a href={personalInfo.github} className="text-inherit no-underline">
                {personalInfo.github.replace(/^https?:\/\//, "").replace("github.com/", "")}
              </a>
            </div>
          )}
          {personalInfo.portfolioUrl && (
            <div className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
              <Link2 size={14} className="text-slate-400" />
              <a href={personalInfo.portfolioUrl.startsWith("http") ? personalInfo.portfolioUrl : `https://${personalInfo.portfolioUrl}`} className="text-inherit no-underline">
                {personalInfo.portfolioUrl.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* PROFILE SUMMARY */}
      {profile && (
        <div>
          <SectionHeader title="Profile" />
          <p className="text-[13px] text-slate-700 leading-relaxed text-justify">
            {profile}
          </p>
        </div>
      )}

      {/* PROJECTS SECTION */}
      {projects && projects.length > 0 && (
        <div>
          <SectionHeader title="Projects" />
          <div className="space-y-5">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1.5">
                  <h3 className="text-[14px] font-bold text-slate-900">
                    {proj.title}
                  </h3>
                </div>
                {proj.description && (
                  <p className="text-[13px] italic text-slate-600 mb-2">
                    {proj.description}
                  </p>
                )}
                <ul className="text-[13px] text-slate-700 space-y-1.5 pl-4">
                  {proj.points.filter(p => p.trim() !== "").map((point, idx) => (
                    <li key={idx} className="list-disc leading-relaxed pl-1">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WORK EXPERIENCE */}
      {workExperience && workExperience.length > 0 && (
        <div>
          <SectionHeader title="Experience" />
          <div className="space-y-6">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-[14px] font-bold text-slate-900">
                    {exp.position} <span className="font-medium text-slate-600">{exp.company ? `| ${exp.company}` : ""}</span>
                  </h3>
                  <div className="text-[13px] font-semibold text-slate-500 uppercase tracking-wide">
                    {exp.period}
                  </div>
                </div>
                {exp.points && exp.points.length > 0 && (
                  <ul className="text-[13px] text-slate-700 space-y-1.5 pl-4 mt-2">
                    {exp.points.filter(p => p.trim() !== "").map((point, idx) => (
                      <li key={idx} className="list-disc leading-relaxed pl-1">
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SKILLS SECTION */}
      {skills && (skills.technical?.length > 0 || skills.soft?.length > 0) && (
        <div>
          <SectionHeader title="Skills" />
          <div className="grid grid-cols-2 gap-x-12 text-[13px]">
            {skills.technical?.length > 0 && (
              <div>
                <h3 className="font-bold text-slate-900 mb-2 uppercase text-[11px] tracking-wider text-slate-500">Technical Skills</h3>
                <ul className="text-slate-700 space-y-1.5 pl-4">
                  {skills.technical.map((skill, idx) => (
                    <li key={idx} className="list-disc pl-1">{skill}</li>
                  ))}
                </ul>
              </div>
            )}
            {skills.soft?.length > 0 && (
              <div>
                <h3 className="font-bold text-slate-900 mb-2 uppercase text-[11px] tracking-wider text-slate-500">Soft Skills</h3>
                <ul className="text-slate-700 space-y-1.5 pl-4">
                  {skills.soft.map((skill, idx) => (
                    <li key={idx} className="list-disc pl-1">{skill}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CERTIFICATES SECTION */}
      {certificates && certificates.length > 0 && (
        <div>
          <SectionHeader title="Certificates" />
          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-[13px]">
            {certificates.map((cert) => (
              <div key={cert.id}>
                <div className="font-bold text-slate-900">{cert.title}</div>
                <div className="text-slate-600">
                  {cert.issuer} {cert.year ? <span className="text-slate-400">| {cert.year}</span> : ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EDUCATION SECTION */}
      {education && education.length > 0 && (
        <div>
          <SectionHeader title="Education" />
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="text-[14px] font-bold text-slate-900">{edu.degree}</h3>
                  <div className="text-[13px] text-slate-600 italic mt-0.5">{edu.institution}</div>
                </div>
                <div className="text-[13px] font-semibold text-slate-500 uppercase tracking-wide">
                  {edu.period}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;