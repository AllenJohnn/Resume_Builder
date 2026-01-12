import React from 'react';

interface PersonalInfoFormProps {
  data: {
    name: string;
    email: string;
    phone?: string;
    location: string;
    portfolioUrl: string;
    linkedin?: string;
    github?: string;
  };
  onChange: (data: any) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange }) => {
  const handleChange = (field: string, value: string) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="border-b border-gray-200 pb-6 mb-6">
      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Personal Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Full Name</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="Alexander Mitchell"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="alex.mitchell@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Phone</label>
          <input
            type="tel"
            value={data.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Location</label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="San Francisco, CA"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Portfolio URL</label>
          <input
            type="url"
            value={data.portfolioUrl}
            onChange={(e) => handleChange('portfolioUrl', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="alexandermitchell.dev"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">LinkedIn</label>
          <input
            type="url"
            value={data.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="linkedin.com/in/username"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">GitHub</label>
          <input
            type="url"
            value={data.github || ''}
            onChange={(e) => handleChange('github', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="github.com/username"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;