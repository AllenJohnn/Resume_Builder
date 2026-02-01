/**
 * Check if a string value is not empty
 */
export const hasText = (value?: string): boolean => {
  return !!value && value.trim().length > 0;
};

/**
 * Generate a unique ID based on timestamp
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Sanitize filename for export
 */
export const sanitizeFilename = (name: string, fallback = 'resume'): string => {
  if (!name || !name.trim()) return fallback;
  return name.trim().replace(/[^a-zA-Z0-9-_\s]/g, '').replace(/\s+/g, '_');
};

/**
 * Filter array items with empty values
 */
export const filterEmpty = <T>(arr: T[], predicate: (item: T) => boolean): T[] => {
  return arr.filter(predicate);
};
