import { http, type ApiResponse } from '@/lib/http';
import type {
  MyForm,
  SubmissionCreatedResponse,
  SubmissionRequest,
  SubmissionUpdatedResponse,
} from '../types';

// FORM-02 신청서 조회 (이미 신청했으면 mySubmission에 내 답변이 들어있음)
export async function fetchMyForm(postId: number): Promise<MyForm> {
  const { data } = await http.get<ApiResponse<MyForm>>(`/api/posts/${postId}/form`);
  return data.data;
}

// SUB-01 신청서 제출
export async function submitForm(
  postId: number,
  request: SubmissionRequest,
): Promise<SubmissionCreatedResponse> {
  const { data } = await http.post<ApiResponse<SubmissionCreatedResponse>>(
    `/api/posts/${postId}/submissions`,
    request,
  );
  return data.data;
}

// SUB-05 답변 수정
export async function updateSubmission(
  postId: number,
  request: SubmissionRequest,
): Promise<SubmissionUpdatedResponse> {
  const { data } = await http.put<ApiResponse<SubmissionUpdatedResponse>>(
    `/api/posts/${postId}/submissions/me`,
    request,
  );
  return data.data;
}

// SUB-03 신청 취소
export async function cancelSubmission(postId: number): Promise<void> {
  await http.delete(`/api/posts/${postId}/submissions/me`);
}
