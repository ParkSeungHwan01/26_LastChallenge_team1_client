import { queryOptions, useQuery } from '@tanstack/react-query';
import { fetchMySubmissions } from './mySubmissions.api';
import type { SubmissionStatus } from '../types';

export function mySubmissionsQueryOptions(params: {
  status?: SubmissionStatus;
  page?: number;
  size?: number;
}) {
  return queryOptions({
    queryKey: ['mySubmissions', params] as const,
    queryFn: () => fetchMySubmissions(params),
  });
}

export function useMySubmissionsQuery(
  params: { status?: SubmissionStatus; page?: number; size?: number },
  options: { enabled?: boolean } = {},
) {
  return useQuery({ ...mySubmissionsQueryOptions(params), enabled: options.enabled ?? true });
}
