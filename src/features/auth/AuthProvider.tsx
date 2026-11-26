import { useState, type ReactNode } from 'react';
import { AuthContext, MOCK_USERS, type AuthUser } from './auth-context';

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
        login: (memberId = MOCK_USERS[0].memberId) => {
          const nextUser = MOCK_USERS.find((candidate) => candidate.memberId === memberId);
          if (!nextUser) return;
          setUser(nextUser);
          writeStoredUser(nextUser);
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
