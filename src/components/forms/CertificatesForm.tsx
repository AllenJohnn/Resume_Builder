import React from 'react';
import { CertificateItem } from '../../types/resume';

interface CertificatesFormProps {
  data: CertificateItem[];
  onChange: (data: CertificateItem[]) => void;
}

const CertificatesForm: React.FC<CertificatesFormProps> = ({ data, onChange }) => {
  const addCertificate = () => {
    const newCertificate: CertificateItem = {
      id: Date.now().toString(),
      title: '',
      issuer: '',
      year: new Date().getFullYear().toString()
    };
    onChange([...data, newCertificate]);
  };

  const updateCertificate = (id: string, field: keyof CertificateItem, value: string) => {
    onChange(
      data.map(cert => 
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    );
  };

  const removeCertificate = (id: string) => {
    onChange(data.filter(cert => cert.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Certifications</h3>
          <p className="text-xs text-slate-400 font-medium">Add licenses, credentials, and achievements</p>
        </div>
        <button
          onClick={addCertificate}
          className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-800 transition hover:bg-slate-200"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Certificate
        </button>
      </div>

      <div className="space-y-4">
        {data.map((cert, index) => (
          <div key={cert.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50/40 relative group transition-all hover:border-slate-300">
            <div className="flex justify-between items-center mb-4">
              <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                Certificate #{index + 1}
              </span>
              <button
                onClick={() => removeCertificate(cert.id)}
                className="text-xs font-medium text-slate-400 hover:text-red-500 transition"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Certificate Title *</label>
                <input
                  type="text"
                  value={cert.title}
                  onChange={(e) => updateCertificate(cert.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
                  placeholder="e.g., AWS Certified Solutions Architect"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Issuing Organization *</label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => updateCertificate(cert.id, 'issuer', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
                  placeholder="e.g., Amazon Web Services"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Year Obtained *</label>
                <input
                  type="text"
                  value={cert.year}
                  onChange={(e) => updateCertificate(cert.id, 'year', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
                  placeholder="e.g., 2023"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Credential ID (Optional)</label>
                <input
                  type="text"
                  value={cert.credentialId || ''}
                  onChange={(e) => updateCertificate(cert.id, 'credentialId', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
                  placeholder="e.g., ABC123XYZ"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Certificate URL (Optional)</label>
                <input
                  type="url"
                  value={cert.link || ''}
                  onChange={(e) => updateCertificate(cert.id, 'link', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
                  placeholder="https://credential.net/verify/abc123"
                />
              </div>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="text-center py-10 border border-dashed border-slate-200 rounded-xl bg-slate-50/30">
            <span className="text-2xl block mb-2">📜</span>
            <p className="text-sm font-semibold text-slate-700">No credentials tracked yet</p>
            <p className="text-xs text-slate-400 mt-0.5">Click add above to append active certifications</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificatesForm;