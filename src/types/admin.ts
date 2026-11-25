import type { MyApplicationStatus } from '@/types/apply';

export interface SubmitterAnswer {
  questionId: string;
  value: string;
}

export interface Submitter {
  id: number;
  name: string;
  studentId: string;
  submittedAt: string;
  submittedAtTime: string;
  status: MyApplicationStatus;
  answers: SubmitterAnswer[];
}
