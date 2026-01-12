import React from 'react';

interface ProfileFormProps {
  data: string;
  onChange: (data: string) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ data, onChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow border">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Professional Summary</h3>
      <textarea
        value={data}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Describe your professional background, skills, and career objectives..."
      />
    </div>
  );
};

export default ProfileForm;