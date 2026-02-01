import React from 'react';

interface TagProps {
  children: React.ReactNode;
  onRemove?: () => void;
}

const Tag: React.FC<TagProps> = ({ children, onRemove }) => {
  return (
    <div className="inline-flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm">
      <span>{children}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-2 text-gray-500 hover:text-gray-700 font-medium"
          type="button"
          aria-label="Remove"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Tag;
