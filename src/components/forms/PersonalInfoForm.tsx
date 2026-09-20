import React from 'react';

interface PersonalInfoFormProps {
  data: {
    name: string;
    email: string;
    phone?: string;
    location: string;
    portfolioUrl?: string;
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
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all mb-6">
      <div className="mb-6">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">Personal Information</h3>
        <p className="text-xs text-slate-400 font-medium">Your primary contact details for recruiters</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Full Name *</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
            placeholder="Alexander Mitchell"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Email *</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
            placeholder="alex.mitchell@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Phone</label>
          <input
            type="tel"
            value={data.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Location *</label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
            placeholder="San Francisco, CA"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Portfolio URL (Optional)</label>
          <input
            type="url"
            value={data.portfolioUrl || ''}
            onChange={(e) => handleChange('portfolioUrl', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
            placeholder="alexandermitchell.dev"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">LinkedIn (Optional)</label>
          <input
            type="url"
            value={data.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
            placeholder="linkedin.com/in/username"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-500 mb-1.5">GitHub (Optional)</label>
          <input
            type="url"
            value={data.github || ''}
            onChange={(e) => handleChange('github', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
            placeholder="github.com/username"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;