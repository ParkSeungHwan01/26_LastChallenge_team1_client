import type { Submitter } from '@/types/admin';

const SPRING_BOOT_SUBMITTERS: Submitter[] = [
  {
    id: 1,
    name: '김해인',
    studentId: '20241234',
    submittedAt: '2026.11.20',
    submittedAtTime: '2026.11.20 14:32 제출',
    status: 'SUBMITTED',
    answers: [
      { questionId: 'q1', value: '2학년' },
      { questionId: 'q2', value: '평일 저녁, 주말 오후' },
      { questionId: 'q3', value: 'github.com/haein-kim' },
      {
        questionId: 'q4',
        value:
          '자바 기초는 공부했는데 웹 서비스를 직접 만들어본 적이 없어서 지원했어요. 이번 챌린지로 첫 API를 완성해보고 싶어요.',
      },
    ],
  },
  {
    id: 2,
    name: '김보민',
    studentId: '20230456',
    submittedAt: '2026.11.19',
    submittedAtTime: '2026.11.19 10:05 제출',
    status: 'SUBMITTED',
    answers: [
      { questionId: 'q1', value: '3학년' },
      { questionId: 'q2', value: '주말 오전' },
      { questionId: 'q3', value: 'github.com/bomin-kim' },
      { questionId: 'q4', value: '백엔드 개발자로 성장하고 싶어서 신청했어요.' },
    ],
  },
  {
    id: 3,
    name: '김호',
    studentId: '20250078',
    submittedAt: '2026.11.19',
    submittedAtTime: '2026.11.19 09:20 제출',
    status: 'SUBMITTED',
    answers: [
      { questionId: 'q1', value: '1학년' },
      { questionId: 'q2', value: '평일 저녁' },
      { questionId: 'q3', value: 'github.com/ho-kim' },
      { questionId: 'q4', value: '처음으로 백엔드 프로젝트를 끝까지 만들어보고 싶습니다.' },
    ],
  },
  {
    id: 4,
    name: '박승환',
    studentId: '20233048',
    submittedAt: '2026.11.18',
    submittedAtTime: '2026.11.18 20:11 제출',
    status: 'COMPLETED',
    answers: [
      { questionId: 'q1', value: '4학년 이상' },
      { questionId: 'q2', value: '평일 저녁, 주말 오전' },
      { questionId: 'q3', value: 'github.com/seunghwan-park' },
      { questionId: 'q4', value: '실무에서 쓰는 Spring Boot 구조를 제대로 익히고 싶어요.' },
    ],
  },
  {
    id: 5,
    name: '이상래',
    studentId: '20240311',
    submittedAt: '2026.11.18',
    submittedAtTime: '2026.11.18 18:47 제출',
    status: 'SUBMITTED',
    answers: [
      { questionId: 'q1', value: '2학년' },
      { questionId: 'q2', value: '주말 오후' },
      { questionId: 'q3', value: 'github.com/sangrae-lee' },
      { questionId: 'q4', value: '팀 프로젝트 경험을 쌓고 싶어서 지원합니다.' },
    ],
  },
  {
    id: 6,
    name: '이가인',
    studentId: '20250522',
    submittedAt: '2026.11.17',
    submittedAtTime: '2026.11.17 11:02 제출',
    status: 'SUBMITTED',
    answers: [
      { questionId: 'q1', value: '1학년' },
      { questionId: 'q2', value: '평일 저녁, 주말 오후' },
      { questionId: 'q3', value: 'github.com/gain-lee' },
      { questionId: 'q4', value: '웹 서비스 개발 전반을 경험해보고 싶어요.' },
    ],
  },
];

const REACT_CHALLENGE_SUBMITTERS: Submitter[] = [
  {
    id: 1,
    name: '정우진',
    studentId: '20231102',
    submittedAt: '2026.11.20',
    submittedAtTime: '2026.11.20 09:14 제출',
    status: 'SUBMITTED',
    answers: [
      { questionId: 'q1', value: '2학년' },
      { questionId: 'q2', value: '평일 저녁' },
      { questionId: 'q3', value: 'github.com/woojin-jung' },
      { questionId: 'q4', value: 'React 상태 관리를 제대로 익히고 싶어서 신청했어요.' },
    ],
  },
  {
    id: 2,
    name: '박승환',
    studentId: '20233048',
    submittedAt: '2026.11.19',
    submittedAtTime: '2026.11.19 21:05 제출',
    status: 'SUBMITTED',
    answers: [
      { questionId: 'q1', value: '3학년' },
      { questionId: 'q2', value: '주말 오후' },
      { questionId: 'q3', value: 'github.com/seunghwan-park' },
      { questionId: 'q4', value: '실전 프로젝트 경험을 쌓고 싶어요.' },
    ],
  },
];

const WEMINA_SUBMITTERS: Submitter[] = [
  {
    id: 1,
    name: '최지안',
    studentId: '20221234',
    submittedAt: '2026.11.13',
    submittedAtTime: '2026.11.13 10:00 제출',
    status: 'COMPLETED',
    answers: [
      { questionId: 'q1', value: '4학년 이상' },
      { questionId: 'q2', value: '평일 저녁, 주말 오전' },
      { questionId: 'q3', value: 'github.com/jian-choi' },
      { questionId: 'q4', value: '아이디어를 실제 서비스로 만들어보고 싶어요.' },
    ],
  },
  {
    id: 2,
    name: '한도윤',
    studentId: '20240987',
    submittedAt: '2026.11.13',
    submittedAtTime: '2026.11.13 13:40 제출',
    status: 'COMPLETED',
    answers: [
      { questionId: 'q1', value: '2학년' },
      { questionId: 'q2', value: '주말 오전, 주말 오후' },
      { questionId: 'q3', value: 'github.com/doyoon-han' },
      { questionId: 'q4', value: '팀 프로젝트로 협업 경험을 쌓고 싶어요.' },
    ],
  },
];

export const MOCK_SUBMITTERS_BY_POST: Record<number, Submitter[]> = {
  1: WEMINA_SUBMITTERS,
  2: REACT_CHALLENGE_SUBMITTERS,
  3: SPRING_BOOT_SUBMITTERS,
};

export function getSubmittersByPostId(postId: number): Submitter[] {
  return MOCK_SUBMITTERS_BY_POST[postId] ?? [];
}
