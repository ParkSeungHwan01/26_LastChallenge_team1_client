import { INITIAL_APPLY_POSTS } from './mockData';
import type { ApplyPost } from '../types';

// 실제 백엔드가 준비되면 이 파일의 구현부만 axios 호출로 바꾸면 됩니다.
// (queries.ts에서 호출하는 함수 시그니처는 그대로 유지)
let posts: ApplyPost[] = INITIAL_APPLY_POSTS.map((post) => ({ ...post }));

function delay<T>(value: T, ms = 150): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export function fetchApplyPosts(): Promise<ApplyPost[]> {
  return delay(posts);
}

export function fetchApplyPost(id: number): Promise<ApplyPost | undefined> {
  return delay(posts.find((post) => post.id === id));
}

export function createApplyPost(input: Omit<ApplyPost, 'id'>): Promise<ApplyPost> {
  const nextId = posts.reduce((max, post) => Math.max(max, post.id), 0) + 1;
  const created: ApplyPost = { ...input, id: nextId };
  posts = [created, ...posts];
  return delay(created);
}

export function updateApplyPost(
  id: number,
  patch: Partial<ApplyPost>,
): Promise<ApplyPost | undefined> {
  posts = posts.map((post) => (post.id === id ? { ...post, ...patch } : post));
  return delay(posts.find((post) => post.id === id));
}

export function closeApplyPost(id: number): Promise<ApplyPost | undefined> {
  return updateApplyPost(id, { status: 'CLOSED' });
}

export function removeApplyPost(id: number): Promise<void> {
  posts = posts.filter((post) => post.id !== id);
  return delay(undefined);
}
