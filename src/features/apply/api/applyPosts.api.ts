import { http, type ApiResponse } from '@/lib/http';
import type {
  AdminPostDetail,
  AdminPostListItem,
  ApplyPostCreateRequest,
  ApplyPostDetail,
  ApplyPostListItem,
  ApplyPostStatus,
  ApplyPostType,
  ApplyPostUpdateRequest,
  Page,
  PostIdStatusResponse,
} from '../types';

// POST-04 부원 신청글 목록
export async function fetchApplyPosts(params: {
  recruiting?: boolean;
  type?: ApplyPostType;
  page?: number;
  size?: number;
}): Promise<Page<ApplyPostListItem>> {
  const { data } = await http.get<ApiResponse<Page<ApplyPostListItem>>>('/api/posts', { params });
  return data.data;
}

// POST-05 부원 신청글 상세
export async function fetchApplyPost(postId: number): Promise<ApplyPostDetail> {
  const { data } = await http.get<ApiResponse<ApplyPostDetail>>(`/api/posts/${postId}`);
  return data.data;
}

// POST-07 운영진 신청글 목록
export async function fetchAdminApplyPosts(params: {
  status?: ApplyPostStatus;
  type?: ApplyPostType;
  keyword?: string;
  page?: number;
  size?: number;
}): Promise<Page<AdminPostListItem>> {
  const { data } = await http.get<ApiResponse<Page<AdminPostListItem>>>('/api/admin/posts', {
    params,
  });
  return data.data;
}

// POST-02 운영진 수정 화면용 조회
export async function fetchAdminApplyPost(postId: number): Promise<AdminPostDetail> {
  const { data } = await http.get<ApiResponse<AdminPostDetail>>(`/api/admin/posts/${postId}`);
  return data.data;
}

// POST-01 신청글 작성
export async function createApplyPost(
  request: ApplyPostCreateRequest,
): Promise<PostIdStatusResponse> {
  const { data } = await http.post<ApiResponse<PostIdStatusResponse>>('/api/admin/posts', request);
  return data.data;
}

// POST-02 신청글 수정
export async function updateApplyPost(
  postId: number,
  request: ApplyPostUpdateRequest,
): Promise<PostIdStatusResponse> {
  const { data } = await http.put<ApiResponse<PostIdStatusResponse>>(
    `/api/admin/posts/${postId}`,
    request,
  );
  return data.data;
}

// POST-03 신청글 삭제
export async function removeApplyPost(postId: number): Promise<void> {
  await http.delete(`/api/admin/posts/${postId}`);
}

// POST-06 수동 마감
export async function closeApplyPost(postId: number): Promise<PostIdStatusResponse> {
  const { data } = await http.post<ApiResponse<PostIdStatusResponse>>(
    `/api/admin/posts/${postId}/close`,
  );
  return data.data;
}
