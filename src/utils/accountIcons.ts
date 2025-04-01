
// Utility function to get icon based on account type
export const getTypeIcon = (type: string) => {
  switch (type) {
    case 'domain':
      return 'Globe';
    case 'github':
      return 'Github';
    case 'twitter':
      return 'Twitter';
    case 'instagram':
      return 'Instagram';
    case 'linkedin':
      return 'Linkedin';
    case 'service':
      return 'AtSign';
    default:
      return 'Bookmark';
  }
};
