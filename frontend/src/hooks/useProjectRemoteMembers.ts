import { useQuery } from '@tanstack/react-query';
import { getSharedTaskAssignees } from '@/lib/remoteApi';
import type { UserData } from 'shared/types';

interface UseProjectRemoteMembersResult {
  data?: { members: UserData[] };
  isPending: boolean;
  isError: boolean;
  error: Error | null;
}

/**
 * hook para obtener members de un remote project que pueden ser asignados a shared tasks
 */
export function useProjectRemoteMembers(
  projectId: string | undefined
): UseProjectRemoteMembersResult {
  const query = useQuery<UserData[]>({
    queryKey: ['project-remote-members', projectId],
    queryFn: async () => {
      if (!projectId) {
        throw new Error('No project ID provided');
      }
      return getSharedTaskAssignees(projectId);
    },
    enabled: Boolean(projectId),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  return {
    data: query.data ? { members: query.data } : undefined,
    isPending: query.isPending,
    isError: query.isError,
    error: query.error,
  };
}
