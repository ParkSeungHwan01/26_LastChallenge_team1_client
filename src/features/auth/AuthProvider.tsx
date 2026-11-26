import { useState, type ReactNode } from 'react';
import { AuthContext, type AuthUser } from './auth-context';

const MOCK_USER: AuthUser = { name: '박승환', isAdmin: true };
const STORAGE_KEY = 'wink_mock_auth_user';

function readStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

function writeStoredUser(user: AuthUser | null) {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // localStorage 접근이 막힌 환경(프라이빗 모드 등)에서는 로그인 상태를 유지하지 않음
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(readStoredUser);

  return (
    <AuthContext.Provider
      value={{
        user,
        login: () => {
          setUser(MOCK_USER);
          writeStoredUser(MOCK_USER);
        },
        logout: () => {
          setUser(null);
          writeStoredUser(null);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
