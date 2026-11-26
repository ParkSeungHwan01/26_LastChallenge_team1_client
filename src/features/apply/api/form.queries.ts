import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cancelSubmission, fetchMyForm, submitForm, updateSubmission } from './form.api';
import type { SubmissionRequest } from '../types';
import { applyPostQueryOptions } from './applyPosts.queries';

export function myFormQueryOptions(postId: number) {
  return queryOptions({
    queryKey: ['applyPosts', 'myForm', postId] as const,
    queryFn: () => fetchMyForm(postId),
  });
}

export function useMyFormQuery(postId: number) {
  return useQuery(myFormQueryOptions(postId));
}

function useInvalidateAfterSubmission(postId: number) {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: myFormQueryOptions(postId).queryKey });
    queryClient.invalidateQueries({ queryKey: applyPostQueryOptions(postId).queryKey });
    queryClient.invalidateQueries({ queryKey: ['applyPosts', 'list'] });
  };
}

export function useSubmitFormMutation(postId: number) {
  const invalidate = useInvalidateAfterSubmission(postId);
  return useMutation({
    mutationFn: (request: SubmissionRequest) => submitForm(postId, request),
    onSuccess: invalidate,
  });
}

export function useUpdateSubmissionMutation(postId: number) {
  const invalidate = useInvalidateAfterSubmission(postId);
  return useMutation({
    mutationFn: (request: SubmissionRequest) => updateSubmission(postId, request),
    onSuccess: invalidate,
  });
}

export function useCancelSubmissionMutation(postId: number) {
  const invalidate = useInvalidateAfterSubmission(postId);
  return useMutation({
    mutationFn: () => cancelSubmission(postId),
    onSuccess: invalidate,
  });
}
