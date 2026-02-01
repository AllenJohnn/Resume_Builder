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
    <div className="bg-white p-6 rounded-lg shadow border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Certifications</h3>
        <button
          onClick={addCertificate}
          className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          + Add
        </button>
      </div>

      <div className="space-y-4">
        {data.map((cert, index) => (
          <div key={cert.id} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-700">Certificate #{index + 1}</h4>
              <button
                onClick={() => removeCertificate(cert.id)}
                className="text-gray-600 hover:text-gray-900"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Title *</label>
                <input
                  type="text"
                  value={cert.title}
                  onChange={(e) => updateCertificate(cert.id, 'title', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="e.g., AWS Certified Solutions Architect"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization *</label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => updateCertificate(cert.id, 'issuer', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="e.g., Amazon Web Services"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year Obtained *</label>
                <input
                  type="text"
                  value={cert.year}
                  onChange={(e) => updateCertificate(cert.id, 'year', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="e.g., 2023"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Credential ID (Optional)</label>
                <input
                  type="text"
                  value={cert.credentialId || ''}
                  onChange={(e) => updateCertificate(cert.id, 'credentialId', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="e.g., ABC123XYZ"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Certificate URL (Optional)</label>
                <input
                  type="url"
                  value={cert.link || ''}
                  onChange={(e) => updateCertificate(cert.id, 'link', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="https://credential.net/verify/abc123"
                />
              </div>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-4xl mb-4">📜</div>
            <p className="text-gray-600">No certificates added yet</p>
            <p className="text-gray-500 text-sm mt-1">Add certifications to showcase your qualifications</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificatesForm;
