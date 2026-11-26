import { cn } from '@/lib/utils';
import type { ApplyPost } from '../../types';

const TYPE_LABEL: Record<ApplyPost['type'], string> = {
  STUDY: '스터디',
  EVENT: '행사',
};

interface ApplyPostRowProps {
  post: ApplyPost;
  isMyTab: boolean;
  onClick: () => void;
}

export function ApplyPostRow({ post, isMyTab, onClick }: ApplyPostRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 border-b border-hairline py-6 text-left"
    >
      <span className="w-9 pl-4 text-sm text-ink-soft">{post.id}</span>
      <span className="w-17 text-[13px] text-ink-soft">{TYPE_LABEL[post.type]}</span>
      <span className="flex flex-1 flex-col gap-1">
        <span className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-[-0.36px]">{post.title}</span>
          {post.status === 'OPEN' && typeof post.dDay === 'number' && (
            <span className="rounded bg-chip px-2.5 py-1 text-xs font-semibold text-brand">
              D-{post.dDay}
            </span>
          )}
          {isMyTab && post.status === 'CLOSED' && (
            <span className="rounded bg-neutral-500 px-2.5 py-1 text-xs font-medium text-white">
              마감
            </span>
          )}
        </span>
        <span className="text-[13px] text-ink-soft">{post.description}</span>
      </span>
      <span className="w-40 text-[13px] text-ink">
        {isMyTab ? post.myApplication?.appliedAt : `${post.periodStart} – ${post.periodEnd}`}
      </span>
      <span className="w-24 pr-4 text-right">
        {isMyTab ? (
          <span
            className={cn(
              'rounded px-2.5 py-1 text-xs font-medium',
              post.myApplication?.status === 'COMPLETED'
                ? 'bg-brand text-white'
                : 'bg-chip-soft text-brand',
            )}
          >
            {post.myApplication?.status === 'COMPLETED' ? '참여 완료' : '제출됨'}
          </span>
        ) : (
          <span
            className={cn(
              'rounded px-2.5 py-1 text-xs font-medium text-white',
              post.status === 'OPEN' ? 'bg-brand' : 'bg-neutral-500',
            )}
          >
            {post.status === 'OPEN' ? '모집 중' : '마감'}
          </span>
        )}
      </span>
    </button>
  );
}
