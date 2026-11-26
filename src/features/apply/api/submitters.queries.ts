import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  changeSubmissionStatus,
  fetchSubmissionDetail,
  fetchSubmitters,
} from './submitters.api';
import type { SubmissionStatus } from '../types';

function submittersKey(postId: number, params: { status?: SubmissionStatus; page?: number; size?: number }) {
  return ['submitters', postId, params] as const;
}

export function submittersQueryOptions(
  postId: number,
  params: { status?: SubmissionStatus; page?: number; size?: number } = {},
) {
  return queryOptions({
    queryKey: submittersKey(postId, params),
    queryFn: () => fetchSubmitters(postId, params),
  });
}

export function useSubmittersQuery(
  postId: number,
  params: { status?: SubmissionStatus; page?: number; size?: number } = {},
) {
  return useQuery(submittersQueryOptions(postId, params));
}

export function submissionDetailQueryOptions(postId: number, submissionId: number) {
  return queryOptions({
    queryKey: ['submitters', postId, 'detail', submissionId] as const,
    queryFn: () => fetchSubmissionDetail(postId, submissionId),
  });
}

export function useSubmissionDetailQuery(
  postId: number,
  submissionId: number,
  options: { enabled?: boolean } = {},
) {
  return useQuery({
    ...submissionDetailQueryOptions(postId, submissionId),
    enabled: options.enabled ?? true,
  });
}

export function useChangeSubmissionStatusMutation(postId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ submissionId, status }: { submissionId: number; status: SubmissionStatus }) =>
      changeSubmissionStatus(postId, submissionId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submitters', postId] });
      // 완료 처리 수도 목록 화면(submissionCount)에 영향을 주므로 같이 갱신
      queryClient.invalidateQueries({ queryKey: ['applyPosts'] });
    },
  });
}
