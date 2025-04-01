
import { useState, useEffect, useCallback } from 'react';
import { fetchProjects, Project } from '@/utils/supabaseProjects';

/**
 * Hook for fetching and managing projects data
 * @returns Projects data with loading and error states
 */
export function useProjects() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const loadProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      console.error('Error loading projects:', err);
      setError(err instanceof Error ? err : new Error('Failed to load projects'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Function to manually refresh projects data
  const refreshProjects = useCallback(async () => {
    await loadProjects();
  }, [loadProjects]);

  // Load projects on mount
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return {
    projects,
    isLoading,
    error,
    refreshProjects
  };
}
