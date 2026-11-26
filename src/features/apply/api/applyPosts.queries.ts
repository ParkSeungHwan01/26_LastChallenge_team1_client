import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  closeApplyPost,
  createApplyPost,
  fetchAdminApplyPost,
  fetchAdminApplyPosts,
  fetchApplyPost,
  fetchApplyPosts,
  removeApplyPost,
  updateApplyPost,
} from './applyPosts.api';
import type {
  ApplyPostCreateRequest,
  ApplyPostStatus,
  ApplyPostType,
  ApplyPostUpdateRequest,
} from '../types';

const applyPostsRoot = ['applyPosts'] as const;

export function applyPostsQueryOptions(params: {
  recruiting?: boolean;
  type?: ApplyPostType;
  page?: number;
  size?: number;
}) {
  return queryOptions({
    queryKey: [...applyPostsRoot, 'list', params] as const,
    queryFn: () => fetchApplyPosts(params),
  });
}

export function useApplyPostsQuery(
  params: {
    recruiting?: boolean;
    type?: ApplyPostType;
    page?: number;
    size?: number;
  },
  options: { enabled?: boolean } = {},
) {
  return useQuery({ ...applyPostsQueryOptions(params), enabled: options.enabled ?? true });
}

export function applyPostQueryOptions(postId: number) {
  return queryOptions({
    queryKey: [...applyPostsRoot, 'detail', postId] as const,
    queryFn: () => fetchApplyPost(postId),
  });
}

export function useApplyPostQuery(postId: number) {
  return useQuery(applyPostQueryOptions(postId));
}

export function adminApplyPostsQueryOptions(params: {
  status?: ApplyPostStatus;
  type?: ApplyPostType;
  keyword?: string;
  page?: number;
  size?: number;
}) {
  return queryOptions({
    queryKey: [...applyPostsRoot, 'admin', 'list', params] as const,
    queryFn: () => fetchAdminApplyPosts(params),
  });
}

export function useAdminApplyPostsQuery(params: {
  status?: ApplyPostStatus;
  type?: ApplyPostType;
  keyword?: string;
  page?: number;
  size?: number;
}) {
  return useQuery(adminApplyPostsQueryOptions(params));
}

export function adminApplyPostQueryOptions(postId: number) {
  return queryOptions({
    queryKey: [...applyPostsRoot, 'admin', 'detail', postId] as const,
    queryFn: () => fetchAdminApplyPost(postId),
  });
}

export function useAdminApplyPostQuery(postId: number, options: { enabled?: boolean } = {}) {
  return useQuery({ ...adminApplyPostQueryOptions(postId), enabled: options.enabled ?? true });
}

export function useCreateApplyPostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: ApplyPostCreateRequest) => createApplyPost(request),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: applyPostsRoot }),
  });
}

export function useUpdateApplyPostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, request }: { postId: number; request: ApplyPostUpdateRequest }) =>
      updateApplyPost(postId, request),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: applyPostsRoot }),
  });
}

export function useRemoveApplyPostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: number) => removeApplyPost(postId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: applyPostsRoot }),
  });
}

export function useCloseApplyPostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: number) => closeApplyPost(postId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: applyPostsRoot }),
  });
}
