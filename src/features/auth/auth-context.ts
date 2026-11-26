import { createContext } from 'react';

export interface AuthUser {
  name: string;
  isAdmin: boolean;
}

export interface AuthContextValue {
  user: AuthUser | null;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
