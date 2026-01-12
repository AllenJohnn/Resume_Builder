import React, { useState, useEffect, useRef } from "react";
import { initialResume } from "./data/initialResume";
import { ResumeData } from "./types/resume";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import ATSAnalyzer from "./components/ATSAnalyzer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import { saveAs } from "file-saver";

const STORAGE_KEY = 'cv-builder-resume-data';

function App() {
  const [resume, setResume] = useState<ResumeData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved resume:', e);
      }
    }
    return initialResume;
  });
  const [activeTab, setActiveTab] = useState<"edit" | "preview" | "ats">("edit");
  const [isExporting, setIsExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
  }, [resume]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setShowExportMenu(false);
      }
    };

    if (showExportMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showExportMenu]);

  const handleExportPDF = async () => {
    if (!previewRef.current) return;
    
    setShowExportMenu(false);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${resume.personalInfo.name || 'resume'}.pdf`);
    } catch (error) {
      console.error('Failed to export PDF:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportDOCX = async () => {
    setIsExporting(true);
    setShowExportMenu(false);
    try {
      const sections: any[] = [];

      sections.push(
        new Paragraph({
          text: resume.personalInfo.name,
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 }
        })
      );

      const contactInfo = [
        resume.personalInfo.email,
        resume.personalInfo.phone,
        resume.personalInfo.location,
        resume.personalInfo.portfolioUrl,
        resume.personalInfo.linkedin,
        resume.personalInfo.github
      ].filter(Boolean).join(' | ');

      sections.push(
        new Paragraph({
          text: contactInfo,
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 }
        })
      );

      if (resume.profile) {
        sections.push(
          new Paragraph({
            text: "PROFESSIONAL SUMMARY",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 }
          })
        );
        sections.push(
          new Paragraph({
            text: resume.profile,
            spacing: { after: 200 }
          })
        );
      }

      if (resume.workExperience && resume.workExperience.length > 0) {
        sections.push(
          new Paragraph({
            text: "WORK EXPERIENCE",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 }
          })
        );

        resume.workExperience.forEach(job => {
          sections.push(
            new Paragraph({
              children: [
                new TextRun({ text: job.position, bold: true }),
                new TextRun({ text: ` | ${job.company}` })
              ],
              spacing: { before: 100 }
            })
          );
          sections.push(
            new Paragraph({
              children: [
                new TextRun({ text: `${job.period} | ${job.location || ''}`, italics: true })
              ],
              spacing: { after: 50 }
            })
          );

          job.points.forEach(point => {
            sections.push(
              new Paragraph({
                text: `• ${point}`,
                spacing: { after: 50 }
              })
            );
          });
        });
      }

      if (resume.education && resume.education.length > 0) {
        sections.push(
          new Paragraph({
            text: "EDUCATION",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 }
          })
        );

        resume.education.forEach(edu => {
          sections.push(
            new Paragraph({
              children: [
                new TextRun({ text: edu.degree, bold: true }),
                new TextRun({ text: ` | ${edu.institution}` })
              ],
              spacing: { before: 100 }
            })
          );
          sections.push(
            new Paragraph({
              text: `${edu.period}${edu.details ? ' | ' + edu.details : ''}`,
              spacing: { after: 100 }
            })
          );
        });
      }

      if (resume.projects && resume.projects.length > 0) {
        sections.push(
          new Paragraph({
            text: "PROJECTS",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 }
          })
        );

        resume.projects.forEach(project => {
          sections.push(
            new Paragraph({
              children: [
                new TextRun({ text: project.title, bold: true })
              ],
              spacing: { before: 100 }
            })
          );
          sections.push(
            new Paragraph({
              children: [
                new TextRun({ text: project.description, italics: true })
              ],
              spacing: { after: 50 }
            })
          );

          project.points.forEach(point => {
            sections.push(
              new Paragraph({
                text: `• ${point}`,
                spacing: { after: 50 }
              })
            );
          });

          if (project.technologies && project.technologies.length > 0) {
            sections.push(
              new Paragraph({
                text: `Technologies: ${project.technologies.join(', ')}`,
                spacing: { after: 100 }
              })
            );
          }
        });
      }

      if (resume.skills) {
        sections.push(
          new Paragraph({
            text: "SKILLS",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 }
          })
        );

        if (resume.skills.technical && resume.skills.technical.length > 0) {
          sections.push(
            new Paragraph({
              children: [
                new TextRun({ text: "Technical: ", bold: true }),
                new TextRun({ text: resume.skills.technical.join(', ') })
              ],
              spacing: { after: 100 }
            })
          );
        }

        if (resume.skills.soft && resume.skills.soft.length > 0) {
          sections.push(
            new Paragraph({
              children: [
                new TextRun({ text: "Soft Skills: ", bold: true }),
                new TextRun({ text: resume.skills.soft.join(', ') })
              ],
              spacing: { after: 100 }
            })
          );
        }
      }

      if (resume.certificates && resume.certificates.length > 0) {
        sections.push(
          new Paragraph({
            text: "CERTIFICATIONS",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 }
          })
        );

        resume.certificates.forEach(cert => {
          sections.push(
            new Paragraph({
              children: [
                new TextRun({ text: cert.title, bold: true }),
                new TextRun({ text: ` | ${cert.issuer} | ${cert.year}` })
              ],
              spacing: { after: 100 }
            })
          );
        });
      }

      const doc = new Document({
        sections: [{
          properties: {},
          children: sections
        }]
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${resume.personalInfo.name || 'resume'}.docx`);
    } catch (error) {
      console.error('Failed to export DOCX:', error);
      alert('Failed to export DOCX. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportHTML = () => {
    setShowExportMenu(false);
    if (!previewRef.current) return;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${resume.personalInfo.name} - Resume</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; }
    h1 { text-align: center; margin-bottom: 10px; }
    .contact { text-align: center; margin-bottom: 30px; color: #666; }
    h2 { border-bottom: 2px solid #333; padding-bottom: 5px; margin-top: 30px; }
    .section { margin-bottom: 20px; }
    .item { margin-bottom: 15px; }
    .title { font-weight: bold; }
    .subtitle { color: #666; font-style: italic; }
    ul { margin: 5px 0; }
  </style>
</head>
<body>
  ${previewRef.current.innerHTML}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    saveAs(blob, `${resume.personalInfo.name || 'resume'}.html`);
  };

  const handleExportTXT = () => {
    setShowExportMenu(false);
    let txtContent = '';

    txtContent += `${resume.personalInfo.name}\n`;
    txtContent += `${[resume.personalInfo.email, resume.personalInfo.phone, resume.personalInfo.location].filter(Boolean).join(' | ')}\n`;
    if (resume.personalInfo.portfolioUrl) txtContent += `Portfolio: ${resume.personalInfo.portfolioUrl}\n`;
    if (resume.personalInfo.linkedin) txtContent += `LinkedIn: ${resume.personalInfo.linkedin}\n`;
    if (resume.personalInfo.github) txtContent += `GitHub: ${resume.personalInfo.github}\n`;
    txtContent += '\n';

    if (resume.profile) {
      txtContent += '='.repeat(60) + '\n';
      txtContent += 'PROFESSIONAL SUMMARY\n';
      txtContent += '='.repeat(60) + '\n';
      txtContent += `${resume.profile}\n\n`;
    }

    if (resume.workExperience && resume.workExperience.length > 0) {
      txtContent += '='.repeat(60) + '\n';
      txtContent += 'WORK EXPERIENCE\n';
      txtContent += '='.repeat(60) + '\n';
      resume.workExperience.forEach(job => {
        txtContent += `\n${job.position} | ${job.company}\n`;
        txtContent += `${job.period} | ${job.location || ''}\n`;
        job.points.forEach(point => {
        });
      });
      txtContent += '\n';
    }

    if (resume.education && resume.education.length > 0) {
      txtContent += '='.repeat(60) + '\n';
      txtContent += 'EDUCATION\n';
      txtContent += '='.repeat(60) + '\n';
      resume.education.forEach(edu => {
        txtContent += `\n${edu.degree} | ${edu.institution}\n`;
        txtContent += `${edu.period}${edu.details ? ' | ' + edu.details : ''}\n`;
      });
      txtContent += '\n';
    }

    if (resume.projects && resume.projects.length > 0) {
      txtContent += '='.repeat(60) + '\n';
      txtContent += 'PROJECTS\n';
      txtContent += '='.repeat(60) + '\n';
      resume.projects.forEach(project => {
        txtContent += `\n${project.title}\n`;
        txtContent += `${project.description}\n`;
        project.points.forEach(point => {
          txtContent += `  • ${point}\n`;
        });
        if (project.technologies && project.technologies.length > 0) {
          txtContent += `Technologies: ${project.technologies.join(', ')}\n`;
        }
      });
      txtContent += '\n';
    }

    if (resume.skills) {
      txtContent += '='.repeat(60) + '\n';
      txtContent += 'SKILLS\n';
      txtContent += '='.repeat(60) + '\n';
      if (resume.skills.technical && resume.skills.technical.length > 0) {
        txtContent += `\nTechnical: ${resume.skills.technical.join(', ')}\n`;
      }
      if (resume.skills.soft && resume.skills.soft.length > 0) {
        txtContent += `Soft Skills: ${resume.skills.soft.join(', ')}\n`;
      }
      txtContent += '\n';
    }

    if (resume.certificates && resume.certificates.length > 0) {
      txtContent += '='.repeat(60) + '\n';
      txtContent += 'CERTIFICATIONS\n';
      txtContent += '='.repeat(60) + '\n';
      resume.certificates.forEach(cert => {
        txtContent += `\n${cert.title} | ${cert.issuer} | ${cert.year}\n`;
      });
    }

    const blob = new Blob([txtContent], { type: 'text/plain' });
    saveAs(blob, `${resume.personalInfo.name || 'resume'}.txt`);
  };

  const handleReset = () => {
    if (window.confirm("Reset to empty template?")) {
      setResume({
        personalInfo: {
          name: "",
          email: "",
          location: "",
          portfolioUrl: ""
        },
        profile: "",
        education: [],
        projects: [],
        skills: {
          technical: [],
          soft: []
        },
        certificates: []
      });
    }
  };

  const handleLoadExample = () => {
    if (window.confirm("Load example resume?")) {
      setResume(initialResume);
    }
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(resume, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resume.personalInfo.name || 'resume'}_data.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          setResume(data);
          alert('Resume imported successfully!');
        } catch (error) {
          alert('Failed to import resume. Please check the file format.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center py-4 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-900 rounded"></div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Resume Builder</h1>
                <p className="text-xs text-gray-500">Professional & ATS-Optimized</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-end gap-2 w-full lg:w-auto">
              <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
                <button
                  onClick={() => setActiveTab("edit")}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    activeTab === "edit" 
                      ? "bg-white text-gray-900 shadow-sm" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    activeTab === "preview" 
                      ? "bg-white text-gray-900 shadow-sm" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setActiveTab("ats")}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    activeTab === "ats" 
                      ? "bg-white text-gray-900 shadow-sm" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  ATS Score
                </button>
              </div>
              
              <div className="flex gap-2">
                <div className="relative" ref={exportMenuRef}>
                  <button
                    onClick={() => setShowExportMenu(!showExportMenu)}
                    disabled={isExporting}
                    className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    {isExporting ? 'Exporting...' : 'Export Resume'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showExportMenu && !isExporting && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      <button
                        onClick={handleExportPDF}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Export as PDF
                      </button>
                      <button
                        onClick={handleExportDOCX}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Export as DOCX
                      </button>
                      <button
                        onClick={handleExportHTML}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Export as HTML
                      </button>
                      <button
                        onClick={handleExportTXT}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Export as TXT
                      </button>
                      <div className="border-t border-gray-200 my-1"></div>
                      <button
                        onClick={handleExportJSON}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                        </svg>
                        Export Data (JSON)
                      </button>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleImportJSON}
                  className="px-4 py-2 bg-white text-gray-900 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Import Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 order-2 xl:order-1">
            {activeTab === "edit" ? (
              <>
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Edit Resume</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={handleReset}
                      className="px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={handleLoadExample}
                      className="px-3 py-1.5 text-sm text-gray-900 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Load Sample
                    </button>
                  </div>
                </div>
                <ResumeForm resume={resume} setResume={setResume} />
              </>
            ) : activeTab === "ats" ? (
              <>
                <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200">ATS Compatibility Analysis</h2>
                <ATSAnalyzer resume={resume} />
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p className="text-sm">Switch to Edit tab to modify your resume</p>
              </div>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 order-1 xl:order-2">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                Auto-save enabled
              </span>
            </div>
            <div ref={previewRef} className="overflow-auto">
              <ResumePreview resume={resume} />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-900 font-medium mb-3">Resume Builder</p>
            <div className="flex justify-center items-center gap-4 mb-4">
              <a
                href="https://github.com/AllenJohnn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                title="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/allenjohnjoy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                title="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://allenjohn-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                title="Portfolio Website"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </a>
            </div>
            <p className="text-xs text-gray-500">
              © 2026 AllenJohn. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
