import React from 'react';
import { EducationItem } from '../../types/resume';

interface EducationFormProps {
  data: EducationItem[];
  onChange: (data: EducationItem[]) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ data, onChange }) => {
  const addEducation = () => {
    const newEducation: EducationItem = {
      id: Date.now().toString(),
      period: '',
      degree: '',
      institution: '',
      details: ''
    };
    onChange([...data, newEducation]);
  };

  const updateEducation = (id: string, field: keyof EducationItem, value: string) => {
    onChange(
      data.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  const removeEducation = (id: string) => {
    onChange(data.filter(edu => edu.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">🎓 Education</h3>
        <button
          onClick={addEducation}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add Education
        </button>
      </div>

      <div className="space-y-4">
        {data.map((edu, index) => (
          <div key={edu.id} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-700">Education #{index + 1}</h4>
              <button
                onClick={() => removeEducation(edu.id)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Period *</label>
                <input
                  type="text"
                  value={edu.period}
                  onChange={(e) => updateEducation(edu.id, 'period', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="2020 – 2024"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Degree *</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Bachelor of Computer Applications"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Institution *</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="University Name"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Details (Optional)</label>
                <textarea
                  value={edu.details || ''}
                  onChange={(e) => updateEducation(edu.id, 'details', e.target.value)}
                  rows={2}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Relevant coursework, achievements, GPA..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationForm;