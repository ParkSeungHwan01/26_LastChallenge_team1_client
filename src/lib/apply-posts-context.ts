import { createContext } from 'react';
import type { ApplyPost } from '@/types/apply';

export interface ApplyPostsContextValue {
  posts: ApplyPost[];
  addPost: (post: ApplyPost) => void;
  updatePost: (id: number, patch: Partial<ApplyPost>) => void;
  closePost: (id: number) => void;
  removePost: (id: number) => void;
}

export const ApplyPostsContext = createContext<ApplyPostsContextValue | null>(null);
