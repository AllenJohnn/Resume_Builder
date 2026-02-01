import React from 'react';
import { WorkExperienceItem } from '../../types/resume';

interface WorkExperienceFormProps {
  data: WorkExperienceItem[];
  onChange: (data: WorkExperienceItem[]) => void;
}

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({ data, onChange }) => {
  const addItem = () => {
    const newItem: WorkExperienceItem = {
      id: Date.now().toString(),
      period: '',
      position: '',
      company: '',
      location: '',
      points: ['']
    };
    onChange([...data, newItem]);
  };

  const updateItem = (id: string, field: keyof WorkExperienceItem, value: any) => {
    onChange(data.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeItem = (id: string) => {
    onChange(data.filter(item => item.id !== id));
  };

  const updatePoint = (itemId: string, pointIndex: number, value: string) => {
    onChange(data.map(item => {
      if (item.id === itemId) {
        const newPoints = [...item.points];
        newPoints[pointIndex] = value;
        return { ...item, points: newPoints };
      }
      return item;
    }));
  };

  const addPoint = (itemId: string) => {
    onChange(data.map(item => {
      if (item.id === itemId) {
        return { ...item, points: [...item.points, ''] };
      }
      return item;
    }));
  };

  const removePoint = (itemId: string, pointIndex: number) => {
    onChange(data.map(item => {
      if (item.id === itemId) {
        return { ...item, points: item.points.filter((_, idx) => idx !== pointIndex) };
      }
      return item;
    }));
  };

  return (
    <div className="border-t pt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Work Experience</h3>
        <button
          onClick={addItem}
          className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          + Add
        </button>
      </div>

      <div className="space-y-6">
        {data.length === 0 ? (
          <p className="text-gray-500 text-sm">No work experience added yet. Click "Add Experience" to start.</p>
        ) : (
          data.map((item) => (
            <div key={item.id} className="p-4 border border-gray-300 rounded-lg bg-gray-50">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-gray-700">Experience Entry</h4>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position/Role *
                  </label>
                  <input
                    type="text"
                    value={item.position}
                    onChange={(e) => updateItem(item.id, 'position', e.target.value)}
                    placeholder="Software Engineer"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company *
                  </label>
                  <input
                    type="text"
                    value={item.company}
                    onChange={(e) => updateItem(item.id, 'company', e.target.value)}
                    placeholder="Tech Corp Inc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Period *
                  </label>
                  <input
                    type="text"
                    value={item.period}
                    onChange={(e) => updateItem(item.id, 'period', e.target.value)}
                    placeholder="Jan 2022 - Present"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={item.location || ''}
                    onChange={(e) => updateItem(item.id, 'location', e.target.value)}
                    placeholder="San Francisco, CA"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Key Achievements & Responsibilities
                  </label>
                  <button
                    onClick={() => addPoint(item.id)}
                    className="text-gray-700 hover:text-gray-900 text-sm"
                  >
                    + Add Point
                  </button>
                </div>
                
                <div className="space-y-2">
                  {item.points.map((point, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => updatePoint(item.id, idx, e.target.value)}
                        placeholder="Describe your achievements and responsibilities..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                      {item.points.length > 1 && (
                        <button
                          onClick={() => removePoint(item.id, idx)}
                          className="px-3 py-2 text-gray-600 hover:text-gray-900"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkExperienceForm;
