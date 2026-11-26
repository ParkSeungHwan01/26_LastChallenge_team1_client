import { http, type ApiResponse } from '@/lib/http';
import type { MySubmissionListItem, Page } from '../types';

// 내 신청 목록 (SUB-04)
// GET /api/submissions/me?page=&size= (X-Member-Id 필요, 없으면 401)
export async function fetchMySubmissions(params: {
  page?: number;
  size?: number;
}): Promise<Page<MySubmissionListItem>> {
  const { data } = await http.get<ApiResponse<Page<MySubmissionListItem>>>(
    '/api/submissions/me',
    { params },
  );
  return data.data;
}
