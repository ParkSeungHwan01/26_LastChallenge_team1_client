import { cn } from '@/lib/utils';
import { toDotDate } from '@/lib/date';
import type { ApplyPostType, MySubmissionListItem } from '../../types';

const TYPE_LABEL: Record<ApplyPostType, string> = {
  STUDY: '스터디',
  EVENT: '행사',
};

interface MySubmissionRowProps {
  submission: MySubmissionListItem;
  onClick: () => void;
}

export function MySubmissionRow({ submission, onClick }: MySubmissionRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 border-b border-hairline py-6 text-left"
    >
      <span className="w-16 pl-4 text-sm text-ink-soft">{submission.no}</span>
      <span className="w-17 text-[13px] text-ink-soft">{TYPE_LABEL[submission.type]}</span>
      <span className="flex flex-1 flex-col gap-1">
        <span className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-[-0.36px]">{submission.title}</span>
          {submission.postStatus === 'CLOSED' && (
            <span className="rounded bg-neutral-500 px-2.5 py-1 text-xs font-medium text-white">
              마감
            </span>
          )}
        </span>
      </span>
      <span className="w-40 text-[13px] text-ink">{toDotDate(submission.submittedAt)}</span>
      <span className="w-24 pr-4 text-right">
        <span
          className={cn(
            'rounded px-2.5 py-1 text-xs font-medium',
            submission.status === 'COMPLETED' ? 'bg-brand text-white' : 'bg-chip-soft text-brand',
          )}
        >
          {submission.status === 'COMPLETED' ? '참여 완료' : '제출됨'}
        </span>
      </span>
    </button>
  );
}
