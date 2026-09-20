import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, BorderStyle } from "docx";
import { saveAs } from "file-saver";
import { ResumeData } from "../types/resume";

// 1. PDF EXPORT: Using the stable, isolated iframe print stream method
export const exportToPDF = async (element: HTMLDivElement | null, fileName: string, resumeData: ResumeData) => {
  if (!element) return;
  const resumeSheet = element.querySelector(".resume-sheet");
  if (!resumeSheet) return;

  const iframe = document.createElement("iframe");
  iframe.style.position = "absolute";
  iframe.style.left = "-9999px";
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document || iframe.contentDocument;
  if (!doc) return;

  doc.open();
  doc.write(`
    <html>
      <head>
        <style>
          @page { size: A4; margin: 15mm !important; }
          body { font-family: Calibri, Arial, sans-serif; font-size: 10.5pt; line-height: 1.25; color: #000; }
          .resume-sheet { width: 100% !important; }
          .grid { display: grid !important; }
          .grid-cols-2 { grid-template-columns: 1fr 1fr !important; }
          .grid-cols-\\[130px_1fr\\] { grid-template-columns: 130px 1fr !important; }
          h2 { font-size: 12pt; border-bottom: 2px solid #000; }
        </style>
      </head>
      <body>
        <div class="resume-sheet">${resumeSheet.innerHTML}</div>
        <script>window.onload = () => setTimeout(window.print, 150);</script>
      </body>
    </html>
  `);
  doc.close();
  setTimeout(() => document.body.removeChild(iframe), 2500);
};

// 2. WORD EXPORT
export const exportToDOCX = async (resume: ResumeData) => {
  const { personalInfo, profile, projects, skills, certificates, education, workExperience } = resume;
  const doc = new Document({
    sections: [{
      children: [
        new Paragraph({ children: [new TextRun({ text: personalInfo?.name || "NAME", bold: true, size: 28 })] }),
        ...(profile ? [new Paragraph({ text: "Profile", heading: HeadingLevel.HEADING_2 }), new Paragraph({ text: profile })] : []),
        // ... (rest of your existing DOCX logic here)
      ]
    }]
  });
  const blob = await Packer.toBlob(doc);
  saveAs(blob, "resume.docx");
};

// 3. HTML BACKUP EXPORT
export const exportToHTML = (resume: ResumeData, htmlContent: string) => {
  const dataStr = "data:text/html;charset=utf-8," + encodeURIComponent(JSON.stringify(resume));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "resume_backup.html");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

// 4. IMPORT FROM HTML BACKUP
export const importFromHTML = (file: File): Promise<ResumeData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try { resolve(JSON.parse(e.target?.result as string)); } catch (err) { reject(err); }
    };
    reader.readAsText(file);
  });
};