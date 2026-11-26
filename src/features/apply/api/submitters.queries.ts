import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchSubmitters, markSubmitterCompleted } from './submitters.api';

export function submittersQueryOptions(postId: number) {
  return queryOptions({
    queryKey: ['submitters', postId] as const,
    queryFn: () => fetchSubmitters(postId),
  });
}

export function useSubmittersQuery(postId: number) {
  return useQuery(submittersQueryOptions(postId));
}

export function useMarkSubmitterCompletedMutation(postId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (submitterId: number) => markSubmitterCompleted(postId, submitterId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['submitters', postId] }),
  });
}
