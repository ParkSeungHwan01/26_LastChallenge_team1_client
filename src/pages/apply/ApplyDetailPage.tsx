import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useApplyPosts } from '@/hooks/useApplyPosts';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const TYPE_LABEL = { STUDY: '스터디', EVENT: '행사' } as const;

export default function ApplyDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const { posts } = useApplyPosts();
  const [cancelOpen, setCancelOpen] = useState(false);

  const post = posts.find((item) => item.id === Number(postId));

  if (!post) {
    return <div className="p-10">신청글을 찾을 수 없어요.</div>;
  }

  const { detail } = post;
  const isClosed = post.status === 'CLOSED';
  const hasApplied = Boolean(post.myApplication);

  function handleCancelConfirm() {
    setCancelOpen(false);
  }

  return (
    <div className="flex flex-col items-center pb-[140px]">
      <div className="flex w-full flex-col gap-8 px-[120px] pt-14">
        <p className="text-[13px] text-[#7f7f7f]">
          신청 › {TYPE_LABEL[post.type]}
        </p>

        <div className="flex flex-col gap-3.5">
          <div className="flex items-center gap-1.5">
            <span className="rounded border border-[#d9dce1] px-2.5 py-[3px] text-xs font-medium text-[#7f7f7f]">
              {TYPE_LABEL[post.type]}
            </span>
            <span
              className={cn(
                'rounded px-2.5 py-[3px] text-xs font-medium text-white',
                isClosed ? 'bg-[#6e6e6e]' : 'bg-brand',
              )}
            >
              {isClosed ? '마감' : '모집 중'}
            </span>
            {!isClosed && typeof post.dDay === 'number' && (
              <span className="rounded bg-[#e4ebff] px-2.5 py-[3px] text-xs font-semibold text-brand">
                D-{post.dDay}
              </span>
            )}
            {hasApplied && (
              <span className="rounded bg-[#e4ebff] px-2.5 py-[3px] text-xs font-medium text-brand">
                ✓ 신청 완료
              </span>
            )}
          </div>
          <h1 className="text-[36px] font-bold tracking-[-0.72px]">{post.title}</h1>
          <p className="text-sm text-[#7f7f7f]">
            {detail.author} · {detail.createdAt}
          </p>
        </div>

        <div className="h-px w-full bg-[#333]" />

        <div className="flex w-full gap-10">
          <div className="flex flex-1 flex-col gap-9">
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold tracking-[-0.18px]">
                {TYPE_LABEL[post.type]} 소개
              </h2>
              <p className="text-[15px] leading-[1.75] text-[#333]">{detail.intro}</p>
            </section>
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold tracking-[-0.18px]">진행 방식</h2>
              <div className="text-[15px] leading-[1.75] text-[#333]">
                {detail.process.map((line) => (
                  <p key={line}>• {line}</p>
                ))}
              </div>
            </section>
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold tracking-[-0.18px]">이런 분께 추천해요</h2>
              <div className="text-[15px] leading-[1.75] text-[#333]">
                {detail.recommend.map((line) => (
                  <p key={line}>• {line}</p>
                ))}
              </div>
            </section>
          </div>

          <aside className="flex w-[380px] shrink-0 flex-col gap-5 rounded-md border border-[#e8e8e8] p-7">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#7f7f7f]">구분</span>
              <span className="font-medium text-[#333]">{TYPE_LABEL[post.type]}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#7f7f7f]">신청 기간</span>
              <span className="font-medium text-[#333]">
                {post.periodStart} – {post.periodEnd}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#7f7f7f]">상태</span>
              <span
                className={cn(
                  'rounded px-2.5 py-[3px] text-xs font-medium text-white',
                  isClosed ? 'bg-[#6e6e6e]' : 'bg-brand',
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
                  className="h-[52px] w-full rounded bg-[#d9dce1] text-base font-bold text-white"
                >
                  마감되었습니다
                </button>
                <p className="text-center text-[13px] text-[#7f7f7f]">신청 기간이 끝났어요</p>
              </>
            ) : !user ? (
              <>
                <button
                  type="button"
                  onClick={login}
                  className="h-[52px] w-full rounded bg-brand text-base font-bold text-white"
                >
                  로그인하고 신청하기
                </button>
                <p className="text-center text-[13px] text-[#7f7f7f]">
                  신청서는 WINK 회원 로그인 후 작성할 수 있어요
                </p>
              </>
            ) : hasApplied ? (
              <>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => navigate(`/apply/${post.id}/form`)}
                    className="h-[52px] flex-1 rounded border border-[#d9dce1] text-base font-medium text-[#333]"
                  >
                    신청 수정
                  </button>
                  <button
                    type="button"
                    onClick={() => setCancelOpen(true)}
                    className="h-[52px] flex-1 rounded border border-[#d9dce1] text-base font-medium text-[#333]"
                  >
                    신청 취소
                  </button>
                </div>
                <p className="text-center text-[13px] text-[#7f7f7f]">
                  {post.myApplication?.appliedAt}에 신청했어요 · 마감 전까지 수정·취소할 수 있어요
                </p>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => navigate(`/apply/${post.id}/form`)}
                  className="h-[52px] w-full rounded bg-brand text-base font-bold text-white"
                >
                  신청서 작성하기
                </button>
                <p className="text-center text-[13px] text-[#7f7f7f]">
                  {typeof post.dDay === 'number'
                    ? `신청 마감까지 ${post.dDay}일 남았어요`
                    : '지금 신청할 수 있어요'}
                </p>
              </>
            )}
          </aside>
        </div>
      </div>

      <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <DialogContent
          className="max-w-[420px] items-center gap-2 rounded-lg px-9 pt-10 pb-8 text-center"
          showCloseButton={false}
        >
          <DialogTitle className="text-xl font-bold">신청을 취소할까요?</DialogTitle>
          <p className="text-[15px] font-medium text-brand">{post.title}</p>
          <p className="text-sm text-[#7f7f7f]">
            취소하면 작성한 신청서가 삭제돼요.
            <br />
            모집 기간 안에는 다시 신청할 수 있어요.
          </p>
          <div className="mt-5 flex w-full gap-2">
            <button
              type="button"
              onClick={() => setCancelOpen(false)}
              className="h-[52px] flex-1 rounded border border-[#d9dce1] text-[15px] font-medium text-[#333]"
            >
              닫기
            </button>
            <button
              type="button"
              onClick={handleCancelConfirm}
              className="h-[52px] flex-1 rounded bg-[#e5484d] text-[15px] font-bold text-white"
            >
              신청 취소
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
