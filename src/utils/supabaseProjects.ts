
// This file is deprecated. Use imports from '@/utils/projects' instead.
// It exists only for backward compatibility during the refactoring process.

import { 
  fetchProjects,
  fetchProjectById,
  createProject,
  updateProject,
  deleteProject
} from './projects';

// Use 'export type' for type re-exports when isolatedModules is enabled
export type { Project } from './projects/types';
export type { ProjectFormData } from './projects/types';

// Re-export functions
export { 
  fetchProjects,
  fetchProjectById,
  createProject,
  updateProject,
  deleteProject
};
