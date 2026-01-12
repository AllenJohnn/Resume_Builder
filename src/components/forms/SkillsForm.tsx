import React, { useState } from 'react';

interface SkillsFormProps {
  data: {
    technical: string[];
    soft: string[];
    languages?: string[];
  };
  onChange: (data: any) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, onChange }) => {
  const [newTechSkill, setNewTechSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  const addTechSkill = () => {
    if (newTechSkill.trim()) {
      onChange({
        ...data,
        technical: [...data.technical, newTechSkill.trim()]
      });
      setNewTechSkill('');
    }
  };

  const addSoftSkill = () => {
    if (newSoftSkill.trim()) {
      onChange({
        ...data,
        soft: [...data.soft, newSoftSkill.trim()]
      });
      setNewSoftSkill('');
    }
  };

  const addLanguage = () => {
    if (newLanguage.trim()) {
      const languages = data.languages || [];
      onChange({
        ...data,
        languages: [...languages, newLanguage.trim()]
      });
      setNewLanguage('');
    }
  };

  const removeTechSkill = (index: number) => {
    const newTechSkills = [...data.technical];
    newTechSkills.splice(index, 1);
    onChange({
      ...data,
      technical: newTechSkills
    });
  };

  const removeSoftSkill = (index: number) => {
    const newSoftSkills = [...data.soft];
    newSoftSkills.splice(index, 1);
    onChange({
      ...data,
      soft: newSoftSkills
    });
  };

  const removeLanguage = (index: number) => {
    const languages = data.languages || [];
    const newLanguages = [...languages];
    newLanguages.splice(index, 1);
    onChange({
      ...data,
      languages: newLanguages
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent, type: 'tech' | 'soft' | 'language') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'tech') addTechSkill();
      else if (type === 'soft') addSoftSkill();
      else if (type === 'language') addLanguage();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow border">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills</h3>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Technical Skills
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newTechSkill}
            onChange={(e) => setNewTechSkill(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, 'tech')}
            className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., React, Python, SQL"
          />
          <button
            onClick={addTechSkill}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {data.technical.map((skill, index) => (
            <div
              key={index}
              className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded"
            >
              <span>{skill}</span>
              <button
                onClick={() => removeTechSkill(index)}
                className="ml-2 text-blue-600 hover:text-blue-900"
              >
                ×
              </button>
            </div>
          ))}
          {data.technical.length === 0 && (
            <p className="text-gray-500 text-sm">No technical skills added yet</p>
          )}
        </div>
      </div>


      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Soft Skills
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newSoftSkill}
            onChange={(e) => setNewSoftSkill(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, 'soft')}
            className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Communication, Teamwork"
          />
          <button
            onClick={addSoftSkill}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {data.soft.map((skill, index) => (
            <div
              key={index}
              className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded"
            >
              <span>{skill}</span>
              <button
                onClick={() => removeSoftSkill(index)}
                className="ml-2 text-green-600 hover:text-green-900"
              >
                ×
              </button>
            </div>
          ))}
          {data.soft.length === 0 && (
            <p className="text-gray-500 text-sm">No soft skills added yet</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Languages (Optional)
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, 'language')}
            className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., English, Spanish"
          />
          <button
            onClick={addLanguage}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Add
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {(data.languages || []).map((language, index) => (
            <div
              key={index}
              className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded"
            >
              <span>{language}</span>
              <button
                onClick={() => removeLanguage(index)}
                className="ml-2 text-purple-600 hover:text-purple-900"
              >
                ×
              </button>
            </div>
          ))}
          {(data.languages || []).length === 0 && (
            <p className="text-gray-500 text-sm">No languages added yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;