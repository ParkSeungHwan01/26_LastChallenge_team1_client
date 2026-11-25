import { useContext } from 'react';
import { ApplyPostsContext } from '@/lib/apply-posts-context';

export function useApplyPosts() {
  const ctx = useContext(ApplyPostsContext);
  if (!ctx) throw new Error('useApplyPosts must be used within ApplyPostsProvider');
  return ctx;
}
