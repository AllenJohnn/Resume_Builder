import React from 'react';

interface ProfileFormProps {
  data: string;
  onChange: (data: string) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ data, onChange }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all">
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">Professional Summary</h3>
        <p className="text-xs text-slate-400 font-medium">A short introduction to capture attention</p>
      </div>
      <textarea
        value={data}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full p-3 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all leading-relaxed"
        placeholder="Describe your professional background, core skills, and standout milestones..."
      />
    </div>
  );
};

export default ProfileForm;