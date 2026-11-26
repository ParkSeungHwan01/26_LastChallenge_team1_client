import { http, type ApiResponse } from '@/lib/http';
import type { Applicants, StatusChangeResponse, SubmissionDetail, SubmissionStatus } from '../types';

// FORM-03 제출자 목록
export async function fetchSubmitters(
  postId: number,
  params: { status?: SubmissionStatus; page?: number; size?: number },
): Promise<Applicants> {
  const { data } = await http.get<ApiResponse<Applicants>>(
    `/api/admin/posts/${postId}/submissions`,
    { params },
  );
  return data.data;
}

// FORM-06 제출 상세
export async function fetchSubmissionDetail(
  postId: number,
  submissionId: number,
): Promise<SubmissionDetail> {
  const { data } = await http.get<ApiResponse<SubmissionDetail>>(
    `/api/admin/posts/${postId}/submissions/${submissionId}`,
  );
  return data.data;
}

// FORM-04 참여 완료 처리 · 되돌리기
export async function changeSubmissionStatus(
  postId: number,
  submissionId: number,
  status: SubmissionStatus,
): Promise<StatusChangeResponse> {
  const { data } = await http.patch<ApiResponse<StatusChangeResponse>>(
    `/api/admin/posts/${postId}/submissions/${submissionId}/status`,
    { status },
  );
  return data.data;
}
