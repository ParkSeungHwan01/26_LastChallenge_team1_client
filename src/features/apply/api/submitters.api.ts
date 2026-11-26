import { INITIAL_SUBMITTERS_BY_POST } from './mockData';
import type { Submitter } from '../types';

// 실제 백엔드가 준비되면 이 파일의 구현부만 axios 호출로 바꾸면 됩니다.
const submittersByPost: Record<number, Submitter[]> = Object.fromEntries(
  Object.entries(INITIAL_SUBMITTERS_BY_POST).map(([key, value]) => [
    key,
    value.map((submitter) => ({ ...submitter })),
  ]),
);

function delay<T>(value: T, ms = 150): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export function fetchSubmitters(postId: number): Promise<Submitter[]> {
  return delay(submittersByPost[postId] ?? []);
}

export function markSubmitterCompleted(
  postId: number,
  submitterId: number,
): Promise<Submitter[]> {
  const list = submittersByPost[postId] ?? [];
  submittersByPost[postId] = list.map((submitter) =>
    submitter.id === submitterId ? { ...submitter, status: 'COMPLETED' } : submitter,
  );
  return delay(submittersByPost[postId]);
}
