
// This file serves as a central export point for all account-related utilities
export * from './accountTypes';
export * from './projectData';
export * from './accountData';
export * from './accountActions';
export { TiktokIcon } from '../components/icons/TiktokIcon';

// Import and re-export from accountIcons to avoid circular dependency issues
import { getPlatformIcon, getTypeIcon } from './accountIcons';
export { getPlatformIcon, getTypeIcon };
