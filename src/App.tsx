import React, { useState, useEffect, useRef } from "react";
import { Layout, Button, Dropdown, MenuProps, Tooltip, ConfigProvider, message, Popconfirm, Tabs } from 'antd';
import { Download, Upload, FileText, FileDown, Globe, Sparkles, RefreshCcw, Save, LayoutTemplate, ScanSearch } from 'lucide-react';
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

const { Header, Content } = Layout;

type TabType = "edit" | "preview" | "ats";

function App() {
  const [resume, setResume] = useState<ResumeData>(() => {
    const saved = localStorage.getItem("cv_builder_draft");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return EMPTY_RESUME;
      }
    }
    return EMPTY_RESUME;
  });

  const [activeTab, setActiveTab] = useState<TabType>("edit");
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    localStorage.setItem("cv_builder_draft", JSON.stringify(resume));
  }, [resume]);

  const handleExportPDF = async () => {
    if (!previewRef.current) return;
    setIsExporting(true);
    messageApi.loading({ content: 'Generating PDF...', key: 'export' });
    try {
      await exportToPDF(previewRef.current, resume.personalInfo?.name || "resume", resume);
      messageApi.success({ content: 'PDF Exported Successfully!', key: 'export', duration: 2 });
    } catch (error) {
      messageApi.error({ content: 'Failed to export PDF.', key: 'export', duration: 2 });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportDOCX = async () => {
    setIsExporting(true);
    messageApi.loading({ content: 'Generating DOCX...', key: 'export' });
    try {
      await exportToDOCX(resume);
      messageApi.success({ content: 'DOCX Exported Successfully!', key: 'export', duration: 2 });
    } catch (error) {
      messageApi.error({ content: 'Failed to export DOCX.', key: 'export', duration: 2 });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportHTML = () => {
    if (!previewRef.current) return;
    exportToHTML(resume, previewRef.current.innerHTML);
    messageApi.success('HTML Backup Exported!');
  };

  const handleImportFromHTML = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".html,text/html";
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        const data = await importFromHTML(file);
        setResume(data);
        messageApi.success("Resume imported successfully.");
      } catch (error) {
        messageApi.error("Failed to read layout file. Please choose a valid HTML backup.");
      }
    };
    input.click();
  };

  const handleReset = () => {
    setResume(EMPTY_RESUME);
    messageApi.info("All sections cleared.");
  };

  const handleLoadExample = () => {
    setResume(initialResume);
    messageApi.success("Demo profile loaded.");
  };

  const exportMenuItems: MenuProps['items'] = [
    {
      key: '1',
      label: 'Export as PDF',
      icon: <FileText size={16} />,
      onClick: handleExportPDF,
    },
    {
      key: '2',
      label: 'Export as Word (DOCX)',
      icon: <FileDown size={16} />,
      onClick: handleExportDOCX,
    },
    {
      key: '3',
      label: 'Export as HTML Backup',
      icon: <Globe size={16} />,
      onClick: handleExportHTML,
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0f172a',
          borderRadius: 8,
          fontFamily: 'Inter, sans-serif',
        },
      }}
    >
      {contextHolder}
      <Layout className="min-h-screen bg-slate-50">
        <Header className="sticky top-0 z-50 flex items-center justify-between px-6 bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-md">
              <span className="text-sm font-bold tracking-wider">CV</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-tight m-0">Resume Builder Pro</h1>
              <p className="text-xs text-slate-500 font-medium m-0 leading-tight">Powered by ATS Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Tooltip title="Import Backup">
              <Button 
                icon={<Upload size={16} />} 
                onClick={handleImportFromHTML}
                className="flex items-center"
              >
                <span className="hidden sm:inline">Import</span>
              </Button>
            </Tooltip>

            <Dropdown menu={{ items: exportMenuItems }} placement="bottomRight">
              <Button type="primary" icon={<Download size={16} />} loading={isExporting} className="flex items-center bg-slate-900 hover:bg-slate-800">
                <span className="hidden sm:inline">{isExporting ? 'Exporting...' : 'Download'}</span>
              </Button>
            </Dropdown>
          </div>
        </Header>

        <Content className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <div className="xl:col-span-6 2xl:col-span-5 flex flex-col gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <Tabs
                  activeKey={activeTab}
                  onChange={(key) => setActiveTab(key as TabType)}
                  className="mb-4"
                  items={[
                    {
                      key: 'edit',
                      label: (
                        <span className="flex items-center gap-2">
                          <LayoutTemplate size={16} />
                          Editor
                        </span>
                      ),
                    },
                    {
                      key: 'ats',
                      label: (
                        <span className="flex items-center gap-2">
                          <ScanSearch size={16} />
                          ATS Score
                        </span>
                      ),
                    }
                  ]}
                />

                {activeTab === "edit" && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-bold text-slate-900 m-0">Sections</h2>
                      <div className="flex gap-2">
                        <Popconfirm
                          title="Clear all data?"
                          description="This action cannot be undone."
                          onConfirm={handleReset}
                          okText="Yes, Clear"
                          cancelText="Cancel"
                          okButtonProps={{ danger: true }}
                        >
                          <Button size="small" icon={<RefreshCcw size={14} />} danger>Reset</Button>
                        </Popconfirm>
                        <Popconfirm
                          title="Load demo data?"
                          description="This will overwrite your current progress."
                          onConfirm={handleLoadExample}
                          okText="Yes, Load"
                          cancelText="Cancel"
                        >
                          <Button size="small" icon={<Sparkles size={14} />}>Demo</Button>
                        </Popconfirm>
                      </div>
                    </div>
                    <ResumeForm resume={resume} setResume={setResume} />
                  </div>
                )}

                {activeTab === "ats" && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <ATSAnalyzer resume={resume} />
                  </div>
                )}
              </div>
            </div>

            <div className="xl:col-span-6 2xl:col-span-7 relative">
              <div className="xl:sticky xl:top-24 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full xl:h-[calc(100vh-8rem)]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-slate-900 m-0 flex items-center gap-2">
                    Live Preview
                  </h2>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold border border-emerald-100">
                    <Save size={12} /> Auto-saved
                  </span>
                </div>
                
                <div className="flex-1 overflow-auto bg-slate-100 rounded-xl p-6 border border-slate-200 flex justify-center">
                  <div ref={previewRef} className="bg-white shadow-md transition-all duration-300 hover:shadow-lg w-full max-w-[800px] h-fit">
                    <ResumePreview resume={resume} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;