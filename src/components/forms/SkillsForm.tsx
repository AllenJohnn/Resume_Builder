import React, { useState, KeyboardEvent } from 'react';

interface SkillsData {
  technical: string[];
  soft: string[];
  languages?: string[];
}

interface SkillsFormProps {
  data: SkillsData;
  onChange: (data: SkillsData) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, onChange }) => {
  const [newTechSkill, setNewTechSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  const addSkill = (
    type: 'technical' | 'soft' | 'languages',
    value: string,
    setValue: (val: string) => void
  ) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    const currentList = type === 'languages' ? data.languages || [] : data[type];
    onChange({
      ...data,
      [type]: [...currentList, trimmed],
    });
    setValue('');
  };

  const removeSkill = (type: 'technical' | 'soft' | 'languages', index: number) => {
    const currentList = type === 'languages' ? [...(data.languages || [])] : [...data[type]];
    currentList.splice(index, 1);
    onChange({
      ...data,
      [type]: currentList,
    });
  };

  const handleKeyPress = (
    e: KeyboardEvent<HTMLInputElement>,
    type: 'technical' | 'soft' | 'languages',
    value: string,
    setValue: (val: string) => void
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(type, value, setValue);
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
            onKeyPress={(e) => handleKeyPress(e, 'technical', newTechSkill, setNewTechSkill)}
            className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="e.g., React, Python, SQL"
          />
          <button
            type="button"
            onClick={() => addSkill('technical', newTechSkill, setNewTechSkill)}
            className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Add
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {data.technical.map((skill, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded"
            >
              <span>{skill}</span>
              <button
                onClick={() => removeSkill('technical', index)}
                className="ml-2 text-gray-500 hover:text-gray-700"
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
            onKeyPress={(e) => handleKeyPress(e, 'soft', newSoftSkill, setNewSoftSkill)}
            className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="e.g., Communication, Teamwork"
          />
          <button
            type="button"
            onClick={() => addSkill('soft', newSoftSkill, setNewSoftSkill)}
            className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Add
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {data.soft.map((skill, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded"
            >
              <span>{skill}</span>
              <button
                onClick={() => removeSkill('soft', index)}
                className="ml-2 text-gray-500 hover:text-gray-700"
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
          Languages <span className="text-gray-400 font-normal">(Optional)</span>
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, 'languages', newLanguage, setNewLanguage)}
            className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="e.g., English, Spanish"
          />
          <button
            type="button"
            onClick={() => addSkill('languages', newLanguage, setNewLanguage)}
            className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Add
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {(data.languages || []).map((language, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded"
            >
              <span>{language}</span>
              <button
                onClick={() => removeSkill('languages', index)}
                className="ml-2 text-gray-500 hover:text-gray-700"
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