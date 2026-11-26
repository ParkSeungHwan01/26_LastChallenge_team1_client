// 이 파일의 타입들은 백엔드(26_LastChallenge_team1_server) 응답 DTO를 그대로 따라간다.
// 화면별로 받는 모양이 달라서 (목록/상세/운영진목록/운영진상세/신청서조회) 타입도 따로 둔다.

export type ApplyPostType = 'STUDY' | 'EVENT';
export type ApplyPostStatus = 'OPEN' | 'CLOSED';
export type SubmissionStatus = 'SUBMITTED' | 'COMPLETED';
export type ApplyFormQuestionType = 'SINGLE' | 'MULTI' | 'SHORT' | 'LONG';

// ===== POST-04 부원 목록 =====
export interface ApplyPostListItem {
  no: number;
  id: number;
  type: ApplyPostType;
  title: string;
  summary: string | null;
  startDate: string; // ISO yyyy-MM-dd
  endDate: string;
  status: ApplyPostStatus;
  dDay: number | null;
}

// ===== POST-05 부원 상세 =====
export interface MySubmissionSummary {
  submissionId: number;
  status: SubmissionStatus;
  submittedAt: string; // ISO datetime
}

export interface ApplyPostDetail {
  id: number;
  type: ApplyPostType;
  title: string;
  summary: string | null;
  content: string;
  authorName: string;
  createdAt: string; // ISO date
  startDate: string;
  endDate: string;
  status: ApplyPostStatus;
  dDay: number | null;
  mySubmission: MySubmissionSummary | null;
}

// ===== FORM-01 질문 (운영진 작성/수정 및 조회 공통) =====
export interface QuestionOption {
  id: number | null; // null = 아직 저장 안 된 새 선택지
  content: string;
}

export interface ApplyFormQuestion {
  id: number | null; // null = 아직 저장 안 된 새 질문
  content: string;
  description: string | null;
  type: ApplyFormQuestionType;
  options: QuestionOption[]; // SHORT·LONG이면 빈 배열
}

// ===== POST-07 운영진 목록 =====
export interface AdminPostListItem {
  no: number;
  id: number;
  type: ApplyPostType;
  title: string;
  startDate: string;
  endDate: string;
  status: ApplyPostStatus;
  submissionCount: number;
}

// ===== POST-02 운영진 수정용 조회 =====
export interface AdminPostDetail {
  id: number;
  type: ApplyPostType;
  title: string;
  summary: string | null;
  startDate: string;
  endDate: string;
  content: string;
  status: ApplyPostStatus;
  submissionCount: number;
  questions: ApplyFormQuestion[];
}

// POST-01 작성 요청 (options는 선택지 텍스트 배열)
export interface ApplyPostCreateRequest {
  type: ApplyPostType;
  title: string;
  summary: string;
  startDate: string;
  endDate: string;
  content: string;
  questions: {
    content: string;
    description?: string;
    type: ApplyFormQuestionType;
    options: string[];
  }[];
}

// POST-02 수정 요청 (type은 변경 불가, questions/options는 기존 id가 있으면 유지, 없으면 추가)
export interface ApplyPostUpdateRequest {
  type: ApplyPostType;
  title: string;
  summary: string;
  startDate: string;
  endDate: string;
  content: string;
  questions: {
    id?: number | null;
    content: string;
    description?: string;
    type: ApplyFormQuestionType;
    options: { id?: number | null; content: string }[];
  }[];
}

// POST-01/02/06 공통 응답
export interface PostIdStatusResponse {
  id: number;
  status: ApplyPostStatus;
}

// ===== FORM-02 신청서 조회 =====
export interface MyAnswer {
  questionId: number;
  optionIds: number[] | null;
  text: string | null;
}

export interface MyFormSubmission {
  submissionId: number;
  status: SubmissionStatus;
  answers: MyAnswer[];
}

export interface MyForm {
  postId: number;
  title: string;
  type: ApplyPostType;
  startDate: string;
  endDate: string;
  questions: ApplyFormQuestion[];
  mySubmission: MyFormSubmission | null;
}

// SUB-01/05 요청 바디
export interface SubmissionAnswerRequest {
  questionId: number;
  optionIds?: number[];
  text?: string;
}

export interface SubmissionRequest {
  answers: SubmissionAnswerRequest[];
}

// SUB-01 응답
export interface SubmissionCreatedResponse {
  submissionId: number;
  status: SubmissionStatus;
  submittedAt: string;
}

// SUB-05 응답
export interface SubmissionUpdatedResponse {
  submissionId: number;
  status: SubmissionStatus;
  updatedAt: string;
}

// FORM-04 응답
export interface StatusChangeResponse {
  submissionId: number;
  status: SubmissionStatus;
  completedAt: string | null;
}

// ===== FORM-03 제출자 목록 =====
export interface SubmissionPostSummary {
  id: number;
  title: string;
  type: ApplyPostType;
  status: ApplyPostStatus;
  startDate: string;
  endDate: string;
}

export interface SubmissionCounts {
  total: number;
  submitted: number;
  completed: number;
}

export interface ApplicantRow {
  submissionId: number;
  name: string;
  studentNo: string;
  submittedAt: string;
  status: SubmissionStatus;
}

export interface Applicants {
  post: SubmissionPostSummary;
  counts: SubmissionCounts;
  content: ApplicantRow[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// ===== FORM-06 제출 상세 =====
export interface OptionView {
  id: number;
  content: string;
}

export interface AnswerDetail {
  questionId: number;
  content: string;
  type: ApplyFormQuestionType;
  selectedOptions: OptionView[];
  text: string | null;
}

export interface SubmissionDetail {
  submissionId: number;
  name: string;
  studentNo: string;
  status: SubmissionStatus;
  submittedAt: string;
  answers: AnswerDetail[];
}

// MY 신청 탭 (SUB-04, GET /api/submissions/me)
export interface MySubmissionListItem {
  no: number;
  postId: number;
  type: ApplyPostType;
  title: string;
  summary: string | null;
  postStatus: ApplyPostStatus; // 신청글 자체의 모집 상태 (마감 뱃지 표시용)
  dDay: number | null;
  submittedAt: string; // ISO date
  myStatus: SubmissionStatus; // 내 신청 상태 (제출됨 / 참여 완료)
}

// 신청서 작성 화면에서 쓰는 답변 입력 상태 (questionId별)
export interface AnswerState {
  optionIds: number[];
  text: string;
}

// 페이지 공통
export interface Page<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
