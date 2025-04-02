
// This file serves as a central export point for all account-related utilities
export * from './accountTypes';
export * from './accountIcons';
export * from './projectData';
export * from './accountData';
export * from './accountActions';
export { TiktokIcon } from '../components/icons/TiktokIcon';

// Re-export getPlatformIcon and getTypeIcon to avoid circular dependency issues
export { getPlatformIcon, getTypeIcon } from './accountIcons';
