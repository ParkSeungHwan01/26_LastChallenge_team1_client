import { http, type ApiResponse } from '@/lib/http';
import type { MySubmissionListItem, Page, SubmissionStatus } from '../types';

// 내 신청 목록 (백엔드에 아직 없는 엔드포인트, 추가 예정)
// GET /api/submissions/me?status=&page=&size= (X-Member-Id 필요, 없으면 401)
export async function fetchMySubmissions(params: {
  status?: SubmissionStatus;
  page?: number;
  size?: number;
}): Promise<Page<MySubmissionListItem>> {
  const { data } = await http.get<ApiResponse<Page<MySubmissionListItem>>>(
    '/api/submissions/me',
    { params },
  );
  return data.data;
}
