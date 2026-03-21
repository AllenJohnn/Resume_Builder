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
  const hasText = (value?: string) => !!value && value.trim().length > 0;
  const cleanText = (value?: string) => (value || '').trim();

  const education = (resume.education || []).filter(
    (item) =>
      hasText(item.period) ||
      hasText(item.degree) ||
      hasText(item.institution) ||
      hasText(item.details) ||
      hasText(item.gpa)
  );

  const workExperience = (resume.workExperience || []).filter(
    (item) =>
      hasText(item.period) ||
      hasText(item.position) ||
      hasText(item.company) ||
      hasText(item.location) ||
      item.points.some((point) => hasText(point))
  );

  const projects = (resume.projects || []).filter(
    (item) =>
      hasText(item.title) ||
      hasText(item.description) ||
      item.points.some((point) => hasText(point)) ||
      item.technologies.some((tech) => hasText(tech)) ||
      hasText(item.link)
  );

  const certificates = (resume.certificates || []).filter(
    (item) => hasText(item.title) || hasText(item.issuer) || hasText(item.year)
  );

  const technicalSkills = (resume.skills?.technical || []).filter(hasText);
  const softSkills = (resume.skills?.soft || []).filter(hasText);
  const languages = (resume.skills?.languages || []).filter(hasText);

  const sections: Paragraph[] = [];

  // Header
  sections.push(
    new Paragraph({
      text: cleanText(resume.personalInfo.name),
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.LEFT,
      spacing: { after: 120 },
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
    .filter((value) => hasText(value))
    .join(' | ');

  if (hasText(contactInfo)) {
    sections.push(
      new Paragraph({
        text: contactInfo,
        alignment: AlignmentType.LEFT,
        spacing: { after: 220 },
      })
    );
  }

  // Profile
  if (hasText(resume.profile)) {
    sections.push(
      new Paragraph({
        text: 'PROFILE',
        heading: HeadingLevel.HEADING_2,
        thematicBreak: true,
        spacing: { before: 150, after: 90 },
      }),
      new Paragraph({
        text: cleanText(resume.profile),
        spacing: { after: 180 },
      })
    );
  }

  // Work Experience
  if (workExperience.length) {
    sections.push(
      new Paragraph({
        text: 'WORK EXPERIENCE',
        heading: HeadingLevel.HEADING_2,
        thematicBreak: true,
        spacing: { before: 150, after: 90 },
      })
    );

    workExperience.forEach((job) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: cleanText(job.period), bold: false }),
            new TextRun({ text: '   ' }),
            new TextRun({ text: cleanText(job.position), bold: true }),
          ],
          spacing: { before: 100, after: 30 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${cleanText(job.company)}${hasText(job.company) && hasText(job.location) ? ' | ' : ''}${cleanText(job.location)}`,
              italics: true,
            }),
          ],
          spacing: { after: 50 },
        })
      );

      job.points.filter(hasText).forEach((point) => {
        sections.push(
          new Paragraph({
            text: `• ${cleanText(point)}`,
            spacing: { after: 50 },
          })
        );
      });

      sections.push(new Paragraph({ text: '', spacing: { after: 80 } }));
    });
  }

  // Education
  if (education.length) {
    sections.push(
      new Paragraph({
        text: 'EDUCATION',
        heading: HeadingLevel.HEADING_2,
        thematicBreak: true,
        spacing: { before: 150, after: 90 },
      })
    );

    education.forEach((edu) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: cleanText(edu.period), bold: false }),
            new TextRun({ text: '   ' }),
            new TextRun({ text: cleanText(edu.degree).toUpperCase(), bold: true }),
          ],
          spacing: { before: 100, after: 30 },
        }),
        new Paragraph({
          children: [new TextRun({ text: cleanText(edu.institution), italics: true })],
          spacing: { after: 30 },
        })
      );

      if (hasText(edu.details)) {
        sections.push(
          new Paragraph({
            text: cleanText(edu.details),
            spacing: { after: 50 },
          })
        );
      }

      if (hasText(edu.gpa)) {
        sections.push(
          new Paragraph({
            text: `GPA: ${cleanText(edu.gpa)}`,
            spacing: { after: 100 },
          })
        );
      }
      sections.push(new Paragraph({ text: '', spacing: { after: 40 } }));
    });
  }

  // Projects
  if (projects.length) {
    sections.push(
      new Paragraph({
        text: 'PROJECTS',
        heading: HeadingLevel.HEADING_2,
        thematicBreak: true,
        spacing: { before: 150, after: 90 },
      })
    );

    projects.forEach((project) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: cleanText(project.title), bold: true }),
            hasText(project.description)
              ? new TextRun({ text: ` - ${cleanText(project.description)}` })
              : new TextRun({ text: '' }),
          ],
          spacing: { before: 100, after: 40 },
        })
      );

      project.points.filter(hasText).forEach((point) => {
        sections.push(
          new Paragraph({
            text: `• ${cleanText(point)}`,
            spacing: { after: 50 },
          })
        );
      });

      if (project.technologies.filter(hasText).length) {
        sections.push(
          new Paragraph({
            text: `Tech: ${project.technologies.filter(hasText).join(', ')}`,
            spacing: { after: 100 },
          })
        );
      }
    });
  }

  // Skills
  if (technicalSkills.length || softSkills.length || languages.length) {
    sections.push(
      new Paragraph({
        text: 'SKILLS',
        heading: HeadingLevel.HEADING_2,
        thematicBreak: true,
        spacing: { before: 150, after: 90 },
      })
    );

    if (technicalSkills.length) {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'Technical Skills: ', bold: true }),
            new TextRun({ text: technicalSkills.join(', ') }),
          ],
          spacing: { after: 70 },
        })
      );
    }

    if (softSkills.length) {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'Soft Skills: ', bold: true }),
            new TextRun({ text: softSkills.join(', ') }),
          ],
          spacing: { after: 70 },
        })
      );
    }

    if (languages.length) {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'Languages: ', bold: true }),
            new TextRun({ text: languages.join(', ') }),
          ],
          spacing: { after: 70 },
        })
      );
    }
  }

  // Certificates
  if (certificates.length) {
    sections.push(
      new Paragraph({
        text: 'CERTIFICATIONS',
        heading: HeadingLevel.HEADING_2,
        thematicBreak: true,
        spacing: { before: 150, after: 90 },
      })
    );

    certificates.forEach((cert) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: cleanText(cert.title), bold: true }),
            new TextRun({
              text: `${hasText(cert.issuer) ? ` | ${cleanText(cert.issuer)}` : ''}${hasText(cert.year) ? ` (${cleanText(cert.year)})` : ''}`,
            }),
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
