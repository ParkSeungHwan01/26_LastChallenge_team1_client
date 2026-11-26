import { cn } from '@/lib/utils';
import type { AuthUser } from '@/features/auth/auth-context';
import type { ApplyPost, ApplyPostType } from '../../types';

const TYPE_LABEL: Record<ApplyPostType, string> = { STUDY: '스터디', EVENT: '행사' };

interface ApplyRecruitCardProps {
  post: ApplyPost;
  user: AuthUser | null;
  onLogin: () => void;
  onWriteOrEdit: () => void;
  onCancelRequest: () => void;
}

export function ApplyRecruitCard({
  post,
  user,
  onLogin,
  onWriteOrEdit,
  onCancelRequest,
}: ApplyRecruitCardProps) {
  const isClosed = post.status === 'CLOSED';
  const hasApplied = Boolean(post.myApplication);

  return (
    <aside className="flex w-[380px] shrink-0 flex-col gap-5 rounded-md border border-hairline p-7">
      <div className="flex items-center justify-between text-sm">
        <span className="text-ink-soft">구분</span>
        <span className="font-medium text-ink">{TYPE_LABEL[post.type]}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-ink-soft">신청 기간</span>
        <span className="font-medium text-ink">
          {post.periodStart} – {post.periodEnd}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-ink-soft">상태</span>
        <span
          className={cn(
            'rounded px-2.5 py-[3px] text-xs font-medium text-white',
            isClosed ? 'bg-neutral-500' : 'bg-brand',
          )}
        >
          {isClosed ? '마감' : '모집 중'}
        </span>
      </div>

      {isClosed ? (
        <>
          <button
            type="button"
            disabled
            className="h-[52px] w-full rounded bg-field-border text-base font-bold text-white"
          >
            마감되었습니다
          </button>
          <p className="text-center text-[13px] text-ink-soft">신청 기간이 끝났어요</p>
        </>
      ) : !user ? (
        <>
          <button
            type="button"
            onClick={onLogin}
            className="h-[52px] w-full rounded bg-brand text-base font-bold text-white"
          >
            로그인하고 신청하기
          </button>
          <p className="text-center text-[13px] text-ink-soft">
            신청서는 WINK 회원 로그인 후 작성할 수 있어요
          </p>
        </>
      ) : hasApplied ? (
        <>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onWriteOrEdit}
              className="h-[52px] flex-1 rounded border border-field-border text-base font-medium text-ink"
            >
              신청 수정
            </button>
            <button
              type="button"
              onClick={onCancelRequest}
              className="h-[52px] flex-1 rounded border border-field-border text-base font-medium text-ink"
            >
              신청 취소
            </button>
          </div>
          <p className="text-center text-[13px] text-ink-soft">
            {post.myApplication?.appliedAt}에 신청했어요 · 마감 전까지 수정·취소할 수 있어요
          </p>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={onWriteOrEdit}
            className="h-[52px] w-full rounded bg-brand text-base font-bold text-white"
          >
            신청서 작성하기
          </button>
          <p className="text-center text-[13px] text-ink-soft">
            {typeof post.dDay === 'number'
              ? `신청 마감까지 ${post.dDay}일 남았어요`
              : '지금 신청할 수 있어요'}
          </p>
        </>
      )}
    </aside>
  );
}
