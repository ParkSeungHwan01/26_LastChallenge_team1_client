import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { ApplyPostsContext } from '@/lib/apply-posts-context';
import { MOCK_APPLY_POSTS } from '@/mocks/applyPosts';
import type { ApplyPost } from '@/types/apply';

export function ApplyPostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<ApplyPost[]>(MOCK_APPLY_POSTS);

  const addPost = useCallback((post: ApplyPost) => {
    setPosts((prev) => [post, ...prev]);
  }, []);

  const updatePost = useCallback((id: number, patch: Partial<ApplyPost>) => {
    setPosts((prev) => prev.map((post) => (post.id === id ? { ...post, ...patch } : post)));
  }, []);

  const closePost = useCallback((id: number) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, status: 'CLOSED' } : post)),
    );
  }, []);

  const removePost = useCallback((id: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  }, []);

  const value = useMemo(
    () => ({ posts, addPost, updatePost, closePost, removePost }),
    [posts, addPost, updatePost, closePost, removePost],
  );

  return <ApplyPostsContext.Provider value={value}>{children}</ApplyPostsContext.Provider>;
}
