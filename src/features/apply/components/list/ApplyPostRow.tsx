import { toDotDate } from '@/lib/date';
import type { ApplyPostListItem, ApplyPostType } from '../../types';

const TYPE_LABEL: Record<ApplyPostType, string> = {
  STUDY: '스터디',
  EVENT: '행사',
};

interface ApplyPostRowProps {
  post: ApplyPostListItem;
  onClick: () => void;
}

export function ApplyPostRow({ post, onClick }: ApplyPostRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 border-b border-hairline py-6 text-left"
    >
      <span className="w-16 pl-4 text-sm text-ink-soft">{post.no}</span>
      <span className="w-17 text-[13px] text-ink-soft">{TYPE_LABEL[post.type]}</span>
      <span className="flex flex-1 flex-col gap-1">
        <span className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-[-0.36px]">{post.title}</span>
          {post.status === 'OPEN' && typeof post.dDay === 'number' && (
            <span className="rounded bg-chip px-2.5 py-1 text-xs font-semibold text-brand">
              D-{post.dDay}
            </span>
          )}
        </span>
        <span className="text-[13px] text-ink-soft">{post.summary}</span>
      </span>
      <span className="w-40 text-[13px] text-ink">
        {toDotDate(post.startDate)} – {toDotDate(post.endDate)}
      </span>
      <span className="w-24 pr-4 text-right">
        <span
          className={`rounded px-2.5 py-1 text-xs font-medium text-white ${
            post.status === 'OPEN' ? 'bg-brand' : 'bg-neutral-500'
          }`}
        >
          {post.status === 'OPEN' ? '모집 중' : '마감'}
        </span>
      </span>
    </button>
  );
}
