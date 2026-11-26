import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApplyPost } from '../api/applyPosts.queries';
import { ApplyRecruitCard } from '../components/detail/ApplyRecruitCard';
import { CancelApplicationDialog } from '../components/detail/CancelApplicationDialog';
import { useAuth } from '@/features/auth/useAuth';
import { cn } from '@/lib/utils';
import type { ApplyPostType } from '../types';

const TYPE_LABEL: Record<ApplyPostType, string> = { STUDY: '스터디', EVENT: '행사' };

export default function ApplyDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [cancelOpen, setCancelOpen] = useState(false);

  const post = useApplyPost(Number(postId));

  if (!post) {
    return <div className="p-10">신청글을 찾을 수 없어요.</div>;
  }

  const { detail } = post;
  const isClosed = post.status === 'CLOSED';
  const hasApplied = Boolean(post.myApplication);

  return (
    <div className="flex flex-col items-center pb-[140px]">
      <div className="flex w-full flex-col gap-8 px-[120px] pt-14">
        <p className="text-[13px] text-ink-soft">신청 › {TYPE_LABEL[post.type]}</p>

        <div className="flex flex-col gap-3.5">
          <div className="flex items-center gap-1.5">
            <span className="rounded border border-field-border px-2.5 py-[3px] text-xs font-medium text-ink-soft">
              {TYPE_LABEL[post.type]}
            </span>
            <span
              className={cn(
                'rounded px-2.5 py-[3px] text-xs font-medium text-white',
                isClosed ? 'bg-neutral-500' : 'bg-brand',
              )}
            >
              {isClosed ? '마감' : '모집 중'}
            </span>
            {!isClosed && typeof post.dDay === 'number' && (
              <span className="rounded bg-chip px-2.5 py-[3px] text-xs font-semibold text-brand">
                D-{post.dDay}
              </span>
            )}
            {hasApplied && (
              <span className="rounded bg-chip px-2.5 py-[3px] text-xs font-medium text-brand">
                ✓ 신청 완료
              </span>
            )}
          </div>
          <h1 className="text-[36px] font-bold tracking-[-0.72px]">{post.title}</h1>
          <p className="text-sm text-ink-soft">
            {detail.author} · {detail.createdAt}
          </p>
        </div>

        <div className="h-px w-full bg-ink" />

        <div className="flex w-full gap-10">
          <div className="flex flex-1 flex-col gap-9">
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold tracking-[-0.18px]">
                {TYPE_LABEL[post.type]} 소개
              </h2>
              <p className="text-[15px] leading-[1.75] text-ink">{detail.intro}</p>
            </section>
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold tracking-[-0.18px]">진행 방식</h2>
              <div className="text-[15px] leading-[1.75] text-ink">
                {detail.process.map((line) => (
                  <p key={line}>• {line}</p>
                ))}
              </div>
            </section>
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold tracking-[-0.18px]">이런 분께 추천해요</h2>
              <div className="text-[15px] leading-[1.75] text-ink">
                {detail.recommend.map((line) => (
                  <p key={line}>• {line}</p>
                ))}
              </div>
            </section>
          </div>

          <ApplyRecruitCard
            post={post}
            user={user}
            onLogin={login}
            onWriteOrEdit={() => navigate(`/apply/${post.id}/form`)}
            onCancelRequest={() => setCancelOpen(true)}
          />
        </div>
      </div>

      <CancelApplicationDialog
        open={cancelOpen}
        postTitle={post.title}
        onOpenChange={setCancelOpen}
        onConfirm={() => setCancelOpen(false)}
      />
    </div>
  );
}
