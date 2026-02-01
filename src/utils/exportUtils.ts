import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} from 'docx';
import { saveAs } from 'file-saver';
import { ResumeData } from '../types/resume';
import { PDF_CONFIG } from '../constants';
import { sanitizeFilename } from './helpers';

/**
 * Export resume as PDF
 */
export const exportToPDF = async (
  element: HTMLElement,
  filename: string
): Promise<void> => {
  const canvas = await html2canvas(element, {
    scale: PDF_CONFIG.scale,
    useCORS: true,
    logging: false,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: PDF_CONFIG.orientation,
    unit: PDF_CONFIG.unit,
    format: PDF_CONFIG.format,
  });

  const imgHeight = (canvas.height * PDF_CONFIG.imgWidth) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, PDF_CONFIG.imgWidth, imgHeight);
  pdf.save(`${sanitizeFilename(filename)}.pdf`);
};

/**
 * Export resume as DOCX
 */
export const exportToDOCX = async (resume: ResumeData): Promise<void> => {
  const sections: Paragraph[] = [];

  // Header
  sections.push(
    new Paragraph({
      text: resume.personalInfo.name,
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
    })
  );

  // Contact info
  const contactInfo = [
    resume.personalInfo.email,
    resume.personalInfo.phone,
    resume.personalInfo.location,
    resume.personalInfo.portfolioUrl,
    resume.personalInfo.linkedin,
    resume.personalInfo.github,
  ]
    .filter(Boolean)
    .join(' | ');

  sections.push(
    new Paragraph({
      text: contactInfo,
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    })
  );

  // Profile
  if (resume.profile) {
    sections.push(
      new Paragraph({
        text: 'PROFESSIONAL SUMMARY',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      }),
      new Paragraph({
        text: resume.profile,
        spacing: { after: 200 },
      })
    );
  }

  // Work Experience
  if (resume.workExperience?.length) {
    sections.push(
      new Paragraph({
        text: 'WORK EXPERIENCE',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      })
    );

    resume.workExperience.forEach((job) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: job.position, bold: true }),
            new TextRun({ text: ` | ${job.company}` }),
          ],
          spacing: { before: 100 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${job.period} | ${job.location || ''}`,
              italics: true,
            }),
          ],
          spacing: { after: 50 },
        })
      );

      job.points.forEach((point) => {
        sections.push(
          new Paragraph({
            text: `• ${point}`,
            spacing: { after: 50 },
          })
        );
      });
    });
  }

  // Education
  if (resume.education?.length) {
    sections.push(
      new Paragraph({
        text: 'EDUCATION',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      })
    );

    resume.education.forEach((edu) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: edu.degree, bold: true }),
            new TextRun({ text: ` | ${edu.institution}` }),
          ],
          spacing: { before: 100 },
        }),
        new Paragraph({
          text: `${edu.period}${edu.details ? ' | ' + edu.details : ''}`,
          spacing: { after: 100 },
        })
      );
    });
  }

  // Projects
  if (resume.projects?.length) {
    sections.push(
      new Paragraph({
        text: 'PROJECTS',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      })
    );

    resume.projects.forEach((project) => {
      sections.push(
        new Paragraph({
          children: [new TextRun({ text: project.title, bold: true })],
          spacing: { before: 100 },
        }),
        new Paragraph({
          children: [new TextRun({ text: project.description, italics: true })],
          spacing: { after: 50 },
        })
      );

      project.points.forEach((point) => {
        sections.push(
          new Paragraph({
            text: `• ${point}`,
            spacing: { after: 50 },
          })
        );
      });

      if (project.technologies?.length) {
        sections.push(
          new Paragraph({
            text: `Technologies: ${project.technologies.join(', ')}`,
            spacing: { after: 100 },
          })
        );
      }
    });
  }

  // Skills
  if (resume.skills) {
    sections.push(
      new Paragraph({
        text: 'SKILLS',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      })
    );

    if (resume.skills.technical?.length) {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'Technical: ', bold: true }),
            new TextRun({ text: resume.skills.technical.join(', ') }),
          ],
          spacing: { after: 100 },
        })
      );
    }

    if (resume.skills.soft?.length) {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'Soft Skills: ', bold: true }),
            new TextRun({ text: resume.skills.soft.join(', ') }),
          ],
          spacing: { after: 100 },
        })
      );
    }
  }

  // Certificates
  if (resume.certificates?.length) {
    sections.push(
      new Paragraph({
        text: 'CERTIFICATIONS',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      })
    );

    resume.certificates.forEach((cert) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: cert.title, bold: true }),
            new TextRun({ text: ` | ${cert.issuer} | ${cert.year}` }),
          ],
          spacing: { after: 100 },
        })
      );
    });
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: sections,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${sanitizeFilename(resume.personalInfo.name)}.docx`);
};

/**
 * Export resume as HTML
 */
export const exportToHTML = (
  resume: ResumeData,
  previewHTML: string
): void => {
  const resumeJson = JSON.stringify(resume, null, 2);

  const htmlContent = `<!DOCTYPE html>
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
  <div id="resume-root">
  ${previewHTML}
  </div>
  <script type="application/json" id="resume-data">
${resumeJson}
  </script>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  saveAs(blob, `${sanitizeFilename(resume.personalInfo.name)}.html`);
};

/**
 * Import resume from HTML file
 */
export const importFromHTML = (file: File): Promise<ResumeData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const match = text.match(
          /<script[^>]*id=["']resume-data["'][^>]*>([\s\S]*?)<\/script>/
        );

        if (!match || !match[1]) {
          throw new Error('No embedded resume data found');
        }

        const json = match[1].trim();
        const data = JSON.parse(json) as ResumeData;
        resolve(data);
      } catch (error) {
        reject(new Error('Failed to parse resume data from HTML file'));
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};
