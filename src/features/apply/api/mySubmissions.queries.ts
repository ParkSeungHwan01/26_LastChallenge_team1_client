import { queryOptions, useQuery } from '@tanstack/react-query';
import { fetchMySubmissions } from './mySubmissions.api';

export function mySubmissionsQueryOptions(params: { page?: number; size?: number }) {
  return queryOptions({
    queryKey: ['mySubmissions', params] as const,
    queryFn: () => fetchMySubmissions(params),
  });
}

export function useMySubmissionsQuery(
  params: { page?: number; size?: number },
  options: { enabled?: boolean } = {},
) {
  return useQuery({ ...mySubmissionsQueryOptions(params), enabled: options.enabled ?? true });
}
