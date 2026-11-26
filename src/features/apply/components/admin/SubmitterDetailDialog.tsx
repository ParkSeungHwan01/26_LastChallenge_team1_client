import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { ApplyFormQuestion, Submitter } from '../../types';

interface SubmitterDetailDialogProps {
  submitter: Submitter | null;
  questions: ApplyFormQuestion[];
  onOpenChange: (open: boolean) => void;
  onMarkCompleted: (submitterId: number) => void;
}

export function SubmitterDetailDialog({
  submitter,
  questions,
  onOpenChange,
  onMarkCompleted,
}: SubmitterDetailDialogProps) {
  return (
    <Dialog open={Boolean(submitter)} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[560px] gap-0 p-9">
        {submitter && (
          <>
            <div className="flex items-center gap-2">
              <DialogTitle className="text-xl font-bold">{submitter.name}</DialogTitle>
              <span
                className={cn(
                  'rounded px-2.5 py-[3px] text-xs font-medium',
                  submitter.status === 'COMPLETED'
                    ? 'bg-brand text-white'
                    : 'bg-wink-50 text-brand',
                )}
              >
                {submitter.status === 'COMPLETED' ? '참여 완료' : '제출됨'}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {submitter.studentId} · {submitter.submittedAtTime}
            </p>

            <div className="mt-5 flex flex-col gap-4 border-t border-border pt-5">
              {questions.map((question, index) => {
                const answer = submitter.answers.find((a) => a.questionId === question.id);
                return (
                  <div key={question.id}>
                    <p className="text-sm text-muted-foreground">
                      <span className="mr-1.5 font-medium text-foreground">Q{index + 1}</span>
                      {question.title}
                    </p>
                    <p className="mt-1.5 text-base">{answer?.value ?? '-'}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col gap-2 border-t border-border pt-6">
              <Button
                variant="wink"
                disabled={submitter.status === 'COMPLETED'}
                onClick={() => onMarkCompleted(submitter.id)}
              >
                참여 완료로 변경
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                활동이 끝나면 참여 완료로 바꿔주세요 (뱃지 지급 기준)
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
