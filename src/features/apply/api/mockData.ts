import type { ApplyFormQuestion, ApplyPost, Submitter } from '../types';

const STUDY_QUESTIONS: ApplyFormQuestion[] = [
  {
    id: 'q1',
    type: 'SINGLE_CHOICE',
    title: '현재 학년을 선택해주세요',
    description: '하나만 선택할 수 있어요.',
    options: ['1학년', '2학년', '3학년', '4학년 이상'],
  },
  {
    id: 'q2',
    type: 'MULTIPLE_CHOICE',
    title: '참여 가능한 시간대를 모두 골라주세요',
    description: '여러 개 선택할 수 있어요.',
    options: ['평일 저녁', '주말 오전', '주말 오후'],
  },
  {
    id: 'q3',
    type: 'SHORT_TEXT',
    title: 'GitHub 주소를 알려주세요',
    description: '본인의 GitHub 프로필 링크를 적어주세요.',
  },
  {
    id: 'q4',
    type: 'LONG_TEXT',
    title: '지원 동기를 적어주세요',
    description: '스터디에서 얻고 싶은 것을 자유롭게 적어주세요.',
  },
];

export const INITIAL_APPLY_POSTS: ApplyPost[] = [
  {
    id: 3,
    type: 'STUDY',
    status: 'OPEN',
    title: 'Spring Boot 챌린지',
    description: '기초부터 함께 만드는 나의 첫 백엔드 서비스',
    periodStart: '2026.11.16',
    periodEnd: '2026.11.24',
    applicantCount: 12,
    dDay: 1,
    detail: {
      author: 'WINK 운영진',
      createdAt: '2026.11.14 등록',
      intro:
        'Spring Boot로 회원가입부터 게시판 API까지, 나만의 첫 백엔드 서비스를 처음부터 끝까지 만들어봐요. 매주 하나의 기능을 함께 구현하고, 코드 리뷰로 서로의 코드를 읽으며 성장하는 스터디예요.',
      process: [
        '매주 수요일 19:00, 미래관 605-1에서 2시간 진행',
        '주차별 과제를 GitHub에 올리고 서로 코드 리뷰',
        '4주 차에 각자 만든 API를 발표하고 회고',
      ],
      recommend: [
        '자바 기초 문법은 알지만 웹 서비스를 만들어본 적 없는 분',
        '백엔드 개발자를 목표로 첫 프로젝트를 시작하고 싶은 분',
      ],
      questions: STUDY_QUESTIONS,
    },
  },
  {
    id: 2,
    type: 'STUDY',
    status: 'OPEN',
    title: 'React 챌린지',
    description: '실전 프로젝트로 익히는 React의 깊이',
    periodStart: '2026.11.15',
    periodEnd: '2026.12.03',
    applicantCount: 8,
    dDay: 10,
    myApplication: {
      status: 'SUBMITTED',
      appliedAt: '2026.11.20',
    },
    detail: {
      author: 'WINK 운영진',
      createdAt: '2026.11.13 등록',
      intro:
        '실전 프로젝트를 만들며 React의 상태 관리, 렌더링 최적화, 커스텀 훅까지 깊이 있게 다루는 스터디예요. 혼자 공부하긴 어려웠던 부분을 함께 파고들어요.',
      process: [
        '매주 화요일 19:00, 온라인(Discord)으로 2시간 진행',
        '주차별 미션을 구현하고 PR로 코드 리뷰',
        '마지막 주에 팀 프로젝트를 발표',
      ],
      recommend: [
        'React 기초 문법은 알지만 실전 프로젝트 경험이 없는 분',
        '프론트엔드 개발자로 성장하고 싶은 분',
      ],
      questions: STUDY_QUESTIONS,
    },
  },
  {
    id: 1,
    type: 'EVENT',
    status: 'CLOSED',
    title: '위미나',
    description: '아이디어가 서비스가 되는, 우리만의 해커톤',
    periodStart: '2026.11.12',
    periodEnd: '2026.11.20',
    applicantCount: 24,
    myApplication: {
      status: 'COMPLETED',
      appliedAt: '2026.11.13',
    },
    detail: {
      author: 'WINK 운영진',
      createdAt: '2026.11.10 등록',
      intro:
        '아이디어 하나로 시작해서 24시간 안에 실제로 동작하는 서비스를 만들어보는 WINK의 대표 해커톤이에요. 팀을 이뤄 기획부터 개발, 발표까지 함께해요.',
      process: [
        '11.19(목) 19:00 ~ 11.20(금) 19:00, 24시간 진행',
        '팀별로 아이디어 기획 → 개발 → 발표 순으로 진행',
        '심사 후 우수 팀에게는 시상 및 상품 증정',
      ],
      recommend: ['새로운 아이디어를 직접 구현해보고 싶은 분', '다양한 직군의 팀원과 협업해보고 싶은 분'],
      questions: STUDY_QUESTIONS,
    },
  },
];

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

export const INITIAL_SUBMITTERS_BY_POST: Record<number, Submitter[]> = {
  1: WEMINA_SUBMITTERS,
  2: REACT_CHALLENGE_SUBMITTERS,
  3: SPRING_BOOT_SUBMITTERS,
};
