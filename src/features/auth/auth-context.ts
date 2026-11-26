import { createContext } from 'react';

export interface AuthUser {
  memberId: number;
  name: string;
  isAdmin: boolean;
}

// 로그인 연동 전까지 쓰는 테스트 계정들. 백엔드 member 테이블(id 1·2·3·10)과 맞춰둠.
export const MOCK_USERS: AuthUser[] = [
  { memberId: 1, name: '박승환', isAdmin: true },
  { memberId: 2, name: '김보민', isAdmin: false },
  { memberId: 3, name: '김해인', isAdmin: false },
  { memberId: 10, name: '김호', isAdmin: false },
];

export interface AuthContextValue {
  user: AuthUser | null;
  login: (memberId?: number) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
