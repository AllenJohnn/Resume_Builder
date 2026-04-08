import React, { useState, useEffect, useRef } from "react";
import { initialResume } from "./data/initialResume";
import { ResumeData } from "./types/resume";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import ATSAnalyzer from "./components/ATSAnalyzer";
import { EMPTY_RESUME } from "./constants";
import {
  exportToPDF,
  exportToDOCX,
  exportToHTML,
  importFromHTML,
} from "./utils/exportUtils";

type TabType = "edit" | "preview" | "ats";

function App() {
  const [resume, setResume] = useState<ResumeData>(EMPTY_RESUME);
  const [activeTab, setActiveTab] = useState<TabType>("edit");
  const [isExporting, setIsExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showImportMenu, setShowImportMenu] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const exportMenuRef = useRef<HTMLDivElement>(null);
  const importMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setShowExportMenu(false);
      }
      if (importMenuRef.current && !importMenuRef.current.contains(event.target as Node)) {
        setShowImportMenu(false);
      }
    };

    if (showExportMenu || showImportMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showExportMenu, showImportMenu]);


  const handleExportPDF = async () => {
    if (!previewRef.current) return;

    setIsExporting(true);
    setShowExportMenu(false);
    try {
      await exportToPDF(previewRef.current, resume.personalInfo.name || 'resume');
    } catch (error) {
      // Error handled via user alert
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportDOCX = async () => {
    setIsExporting(true);
    setShowExportMenu(false);
    try {
      await exportToDOCX(resume);
    } catch (error) {
      // Error handled via user alert
      alert('Failed to export DOCX. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportHTML = () => {
    setShowExportMenu(false);
    if (!previewRef.current) return;

    exportToHTML(resume, previewRef.current.innerHTML);
  };

  const handleImportFromHTML = () => {
    setShowImportMenu(false);
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.html,text/html';
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        const data = await importFromHTML(file);
        setResume(data);
        alert('Resume imported successfully from HTML file.');
      } catch (error) {
        // Error handled via user alert
        alert('Failed to import from HTML. Please use an HTML file exported from this tool.');
      }
    };
    input.click();
  };

  const handleImportFromPDF = () => {
    setShowImportMenu(false);
    alert('Import from PDF is not supported. Please use an HTML file exported from this tool to import your resume.');
  };

  const handleImportFromDOCX = () => {
    setShowImportMenu(false);
    alert('Import from Word (DOCX) is not supported. Please use an HTML file exported from this tool to import your resume.');
  };

  const handleReset = () => {
    if (window.confirm("Reset to empty template?")) {
      setResume(EMPTY_RESUME);
    }
  };

  const handleLoadExample = () => {
    if (window.confirm("Load example resume?")) {
      setResume(initialResume);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)] text-gray-900 selection:bg-gray-900 selection:text-white">
      <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 py-4 lg:flex-row">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white shadow-sm">
                <span className="text-sm font-bold">RB</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Resume Builder</h1>
                <p className="text-xs text-gray-500">Professional, ATS-friendly, export-ready</p>
              </div>
            </div>
            
            <div className="flex w-full flex-wrap justify-center gap-2 lg:w-auto lg:justify-end">
              <div className="flex gap-1 rounded-full border border-gray-200 bg-gray-100 p-1 shadow-sm">
                <button
                  onClick={() => setActiveTab("edit")}
                  className={`btn-ui-tab rounded-full px-4 py-2 ${
                    activeTab === "edit" 
                      ? "border-gray-900 bg-gray-900 text-white shadow-sm" 
                      : "border-transparent text-gray-600 hover:bg-white hover:text-gray-900"
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`btn-ui-tab rounded-full px-4 py-2 ${
                    activeTab === "preview" 
                      ? "border-gray-900 bg-gray-900 text-white shadow-sm" 
                      : "border-transparent text-gray-600 hover:bg-white hover:text-gray-900"
                  }`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setActiveTab("ats")}
                  className={`btn-ui-tab rounded-full px-4 py-2 ${
                    activeTab === "ats" 
                      ? "border-gray-900 bg-gray-900 text-white shadow-sm" 
                      : "border-transparent text-gray-600 hover:bg-white hover:text-gray-900"
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
                    className="btn-ui-primary gap-2 rounded-full px-4 py-2.5 disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-400"
                  >
                    {isExporting ? 'Exporting...' : 'Export Resume'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showExportMenu && !isExporting && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-200 bg-white py-1 shadow-xl shadow-gray-200/70 z-50">
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
                      <div className="border-t border-gray-200 my-1"></div>
                    </div>
                  )}
                </div>
                <div className="relative" ref={importMenuRef}>
                  <button
                    onClick={() => setShowImportMenu(!showImportMenu)}
                    className="btn-ui-secondary gap-2 rounded-full px-4 py-2.5"
                  >
                    Import Resume
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showImportMenu && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white py-1 shadow-xl shadow-gray-200/70 z-50">
                      <button
                        onClick={handleImportFromPDF}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Import from PDF
                      </button>
                      <button
                        onClick={handleImportFromDOCX}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Import from Word (DOCX)
                      </button>
                      <button
                        onClick={handleImportFromHTML}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Import from HTML
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="order-2 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm shadow-gray-200/60 xl:order-1">
            {activeTab === "edit" ? (
              <>
                <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Edit Resume</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={handleReset}
                      className="btn-ui-secondary rounded-full px-3 py-1.5"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={handleLoadExample}
                      className="btn-ui-primary rounded-full px-3 py-1.5"
                    >
                      Load Sample
                    </button>
                  </div>
                </div>
                <ResumeForm resume={resume} setResume={setResume} />
              </>
            ) : activeTab === "ats" ? (
              <>
                <h2 className="mb-6 border-b border-gray-200 pb-4 text-lg font-semibold text-gray-900">ATS Compatibility Analysis</h2>
                <ATSAnalyzer resume={resume} />
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p className="text-sm">Switch to Edit tab to modify your resume</p>
              </div>
            )}
          </div>

          <div className="order-1 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm shadow-gray-200/60 xl:sticky xl:top-24 xl:order-2 xl:self-start">
            <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
              <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
            </div>
            <div ref={previewRef} className="overflow-auto rounded-xl bg-gray-50/60 p-2">
              <ResumePreview resume={resume} />
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-12 border-t border-gray-200 bg-white/80 backdrop-blur">
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
                href="https://allenjohnnportfolio.vercel.app/"
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
              © AllenJohn.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
