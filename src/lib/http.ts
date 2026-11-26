import axios from 'axios';
import type { AuthUser } from '@/features/auth/auth-context';

const AUTH_STORAGE_KEY = 'wink_mock_auth_user';

// 로그인 연동 전까지, 백엔드가 요구하는 X-Member-Id / X-Member-Role 헤더를
// mock 로그인 상태(localStorage)에서 읽어 매 요청에 자동으로 붙여준다.
// 실제 로그인이 붙으면 이 인터셉터만 토큰 첨부 방식으로 바꾸면 된다.
function readMockUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
});

// 백엔드는 성공 응답을 항상 { data: T } 로 감싼다.
export interface ApiResponse<T> {
  data: T;
}

http.interceptors.request.use((config) => {
  const user = readMockUser();
  if (user) {
    config.headers['X-Member-Id'] = String(user.memberId);
    if (user.isAdmin) {
      config.headers['X-Member-Role'] = 'ADMIN';
    }
  }
  return config;
});

export interface ApiFieldError {
  field: string;
  reason: string;
}

export interface ApiErrorBody {
  errorCode: string;
  message: string;
  fieldErrors: ApiFieldError[];
}

export class ApiError extends Error {
  errorCode: string;
  fieldErrors: ApiFieldError[];

  constructor(body: ApiErrorBody) {
    super(body.message);
    this.errorCode = body.errorCode;
    this.fieldErrors = body.fieldErrors;
  }
}

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const body = error?.response?.data as ApiErrorBody | undefined;
    if (body?.errorCode) {
      return Promise.reject(new ApiError(body));
    }
    return Promise.reject(error);
  },
);
