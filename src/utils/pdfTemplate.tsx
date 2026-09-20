import React from 'react';
import * as PdfElements from '@react-pdf/renderer';
import { ResumeData } from '../types/resume';

// Using core Helvetica requires no external URL fetching, making it 100% crash-proof
const styles = PdfElements.StyleSheet.create({
  page: { padding: 40, backgroundColor: '#ffffff', fontFamily: 'Helvetica', color: '#000000' },
  name: { fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 4 },
  headerGrid: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  headerCol: { width: '48%', display: 'flex', flexDirection: 'column', gap: 2 },
  contactItem: { fontSize: 10, color: '#000000' },
  sectionBlock: { marginBottom: 12 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', borderBottomWidth: 1.5, borderBottomColor: '#000000', paddingBottom: 2, marginBottom: 6 },
  profileText: { fontSize: 11, lineHeight: 1.35, textAlign: 'justify' },
  itemTitle: { fontSize: 11, fontWeight: 'bold' },
  itemSubtitle: { fontSize: 10.5, color: '#333333' },
  bulletRow: { display: 'flex', flexDirection: 'row', marginTop: 2, paddingLeft: 6 },
  bulletPoint: { width: 10, fontSize: 11 },
  bulletText: { flex: 1, fontSize: 11, lineHeight: 1.3 },
  techInline: { fontSize: 11, marginTop: 2, paddingLeft: 6 },
  twoColGrid: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
  twoColBox: { width: '48%', display: 'flex', flexDirection: 'column' },
  eduGrid: { display: 'flex', flexDirection: 'row', marginBottom: 8 },
  eduLeft: { width: 120, fontSize: 11, fontWeight: 'normal' },
  eduRight: { flex: 1, borderLeftWidth: 1, borderLeftColor: '#000000', paddingLeft: 8 }
});

// Clear explicit JSX elements typing noise
const Document = PdfElements.Document as any;
const Page = PdfElements.Page as any;
const View = PdfElements.View as any;
const Text = PdfElements.Text as any;

interface PdfTemplateProps {
  resume: ResumeData;
}

export const ResumePdfDocument: any = ({ resume }: PdfTemplateProps) => {
  const { 
    personalInfo = { name: '', email: '', location: '', portfolioUrl: '', phone: '', github: '', linkedin: '' }, 
    profile = '', 
    projects = [], 
    skills = { technical: [], soft: [] }, 
    certificates = [], 
    education = [], 
    workExperience = [] 
  } = resume || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* HEADER SECTION */}
        <View style={{ marginBottom: 10 }}>
          <Text style={[styles.name, { fontWeight: 'bold' }]}>{personalInfo.name || "ALLEN JOHN JOY"}</Text>
          <View style={styles.headerGrid}>
            <View style={styles.headerCol}>
              {personalInfo.email ? <Text style={styles.contactItem}>✉  {personalInfo.email}</Text> : null}
              {personalInfo.location ? <Text style={styles.contactItem}>📍  {personalInfo.location}</Text> : null}
              {personalInfo.portfolioUrl ? <Text style={styles.contactItem}>🔗  {personalInfo.portfolioUrl.replace(/^https?:\/\//, "")}</Text> : null}
            </View>
            <View style={styles.headerCol}>
              {personalInfo.phone ? <Text style={styles.contactItem}>📞  {personalInfo.phone}</Text> : null}
              {personalInfo.github ? <Text style={styles.contactItem}>💻  {personalInfo.github.replace(/^https?:\/\//, "")}</Text> : null}
              {personalInfo.linkedin ? <Text style={styles.contactItem}>👔  {personalInfo.linkedin.replace(/^https?:\/\//, "")}</Text> : null}
            </View>
          </View>
          <View style={{ height: 1.5, backgroundColor: '#000000', width: '100%', marginTop: 2 }} />
        </View>

        {/* PROFILE SUMMARY */}
        {profile && profile.trim() !== "" ? (
          <View style={styles.sectionBlock}>
            <Text style={[styles.sectionTitle, { fontWeight: 'bold' }]}>Profile</Text>
            <Text style={styles.profileText}>{profile}</Text>
          </View>
        ) : null}

        {/* PROJECTS */}
        {projects && projects.length > 0 ? (
          <View style={styles.sectionBlock}>
            <Text style={[styles.sectionTitle, { fontWeight: 'bold' }]}>Projects</Text>
            {projects.map((proj: any, idx: number) => (
              <View key={proj?.id || idx} style={{ marginBottom: 8 }}>
                <Text style={[styles.itemTitle, { fontWeight: 'bold' }]}>{proj?.title || "Project Title"}</Text>
                {proj?.description ? <Text style={styles.itemSubtitle}>{proj.description}</Text> : null}
                {(proj?.points || []).filter((p: string) => p && p.trim() !== "").map((point: string, i: number) => (
                  <View key={i} style={styles.bulletRow}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.bulletText}>{point}</Text>
                  </View>
                ))}
                {proj?.technologies && proj.technologies.filter((t: string) => t && t.trim() !== "").length > 0 ? (
                  <Text style={styles.techInline}>
                    • Tech: {proj.technologies.filter((t: string) => t && t.trim() !== "").join(", ")}.
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* SKILLS */}
        {skills && (skills.technical?.length > 0 || skills.soft?.length > 0) ? (
          <View style={styles.sectionBlock}>
            <Text style={[styles.sectionTitle, { fontWeight: 'bold' }]}>Skills</Text>
            <View style={styles.twoColGrid}>
              <View style={styles.twoColBox}>
                {skills.technical && skills.technical.length > 0 ? (
                  <View>
                    <Text style={[styles.itemTitle, { fontWeight: 'bold' }]}>Technical Skills</Text>
                    <Text style={styles.bulletText}>
                      {skills.technical.filter((sk: string) => sk && sk.trim() !== "").join("  •  ")}
                    </Text>
                  </View>
                ) : null}
              </View>
              <View style={styles.twoColBox}>
                {skills.soft && skills.soft.length > 0 ? (
                  <View>
                    <Text style={[styles.itemTitle, { fontWeight: 'bold' }]}>Soft Skills</Text>
                    {skills.soft.filter((sk: string) => sk && sk.trim() !== "").map((sk: string, i: number) => (
                      <Text key={i} style={styles.bulletText}>• {sk}</Text>
                    ))}
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        ) : null}

        {/* CERTIFICATES */}
        {certificates && certificates.length > 0 ? (
          <View style={styles.sectionBlock}>
            <Text style={[styles.sectionTitle, { fontWeight: 'bold' }]}>Certificates</Text>
            <View style={styles.twoColGrid}>
              {certificates.map((cert: any, i: number) => (
                <View key={cert?.id || i} style={{ width: '48%', marginBottom: 4 }}>
                  <Text style={[styles.itemTitle, { fontWeight: 'bold' }]}>{cert?.title || "Certification"}</Text>
                  <Text style={styles.itemSubtitle}>
                    {cert?.issuer || ""} {cert?.year ? `(${cert.year})` : ""}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {/* EDUCATION */}
        {education && education.length > 0 ? (
          <View style={styles.sectionBlock}>
            <Text style={[styles.sectionTitle, { fontWeight: 'bold' }]}>Education</Text>
            {education.map((edu: any, idx: number) => (
              <View key={edu?.id || idx} style={styles.eduGrid}>
                <Text style={styles.eduLeft}>{edu?.period || "YEARS"}</Text>
                <View style={styles.eduRight}>
                  <Text style={[styles.itemTitle, { textTransform: 'uppercase', fontWeight: 'bold' }]}>{edu?.degree || ""}</Text>
                  <Text style={styles.itemSubtitle}>{edu?.institution || ""}</Text>
                  {edu?.details ? <Text style={styles.itemSubtitle}>{edu.details}</Text> : null}
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {/* WORK EXPERIENCE */}
        {workExperience && workExperience.length > 0 ? (
          <View style={styles.sectionBlock}>
            <Text style={[styles.sectionTitle, { fontWeight: 'bold' }]}>Experience</Text>
            {workExperience.map((exp: any, idx: number) => (
              <View key={exp?.id || idx} style={{ marginBottom: 6 }}>
                <Text style={[styles.itemTitle, { fontWeight: 'bold' }]}>{exp?.position || ""}</Text>
                <Text style={styles.itemSubtitle}>
                  {exp?.company || ""}{exp?.location ? `, ${exp.location}` : ""}
                </Text>
                {(exp?.points || []).filter((p: string) => p && p.trim() !== "").map((point: string, i: number) => (
                  <View key={i} style={styles.bulletRow}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.bulletText}>{point}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ) : null}
        
      </Page>
    </Document>
  );
};