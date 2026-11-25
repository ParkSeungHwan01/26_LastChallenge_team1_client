export type ApplyPostType = 'STUDY' | 'EVENT';
export type ApplyPostStatus = 'OPEN' | 'CLOSED';
export type MyApplicationStatus = 'SUBMITTED' | 'COMPLETED';

export interface MyApplication {
  status: MyApplicationStatus;
  appliedAt: string;
}

export type ApplyFormQuestionType =
  | 'SINGLE_CHOICE'
  | 'MULTIPLE_CHOICE'
  | 'SHORT_TEXT'
  | 'LONG_TEXT';

export interface ApplyFormQuestion {
  id: string;
  type: ApplyFormQuestionType;
  title: string;
  description?: string;
  options?: string[];
}

export interface ApplyPostDetail {
  author: string;
  createdAt: string;
  intro: string;
  process: string[];
  recommend: string[];
  questions: ApplyFormQuestion[];
}

export interface ApplyPost {
  id: number;
  type: ApplyPostType;
  status: ApplyPostStatus;
  title: string;
  description: string;
  periodStart: string;
  periodEnd: string;
  applicantCount: number;
  dDay?: number;
  myApplication?: MyApplication;
  detail: ApplyPostDetail;
}
