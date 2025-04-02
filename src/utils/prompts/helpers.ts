
// Helper function to format tags as comma-separated string
export const formatTagsString = (tags: string[] | null): string => {
  if (!tags || tags.length === 0) return "";
  return tags.join(", ");
};
