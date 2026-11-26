import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  closeApplyPost,
  createApplyPost,
  fetchApplyPosts,
  removeApplyPost,
  updateApplyPost,
} from './applyPosts.api';
import type { ApplyPost } from '../types';

const applyPostsKey = ['applyPosts'] as const;

export const applyPostsQueryOptions = queryOptions({
  queryKey: applyPostsKey,
  queryFn: fetchApplyPosts,
});

export function useApplyPostsQuery() {
  return useQuery(applyPostsQueryOptions);
}

export function useApplyPost(id: number): ApplyPost | undefined {
  const { data: posts } = useApplyPostsQuery();
  return posts?.find((post) => post.id === id);
}

export function useAddApplyPostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createApplyPost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: applyPostsKey }),
  });
}

export function useUpdateApplyPostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, patch }: { id: number; patch: Partial<ApplyPost> }) =>
      updateApplyPost(id, patch),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: applyPostsKey }),
  });
}

export function useCloseApplyPostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: closeApplyPost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: applyPostsKey }),
  });
}

export function useRemoveApplyPostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeApplyPost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: applyPostsKey }),
  });
}
