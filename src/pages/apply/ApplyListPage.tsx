import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useApplyPosts } from '@/hooks/useApplyPosts';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import type { ApplyPost } from '@/types/apply';

const TYPE_LABEL: Record<ApplyPost['type'], string> = {
  STUDY: '스터디',
  EVENT: '행사',
};

export default function ApplyListPage() {
  const { user } = useAuth();
  const { posts: allApplyPosts } = useApplyPosts();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [recruitingOnly, setRecruitingOnly] = useState(false);

  const isMyTab = user !== null && searchParams.get('tab') === 'my';

  const myPosts = allApplyPosts.filter((post) => post.myApplication);
  const allPosts = recruitingOnly
    ? allApplyPosts.filter((post) => post.status === 'OPEN')
    : allApplyPosts;
  const posts = isMyTab ? myPosts : allPosts;

  function handleTabChange(tab: 'all' | 'my') {
    const next = new URLSearchParams(searchParams);
    if (tab === 'all') {
      next.delete('tab');
    } else {
      next.set('tab', 'my');
    }
    setSearchParams(next, { replace: true });
  }

  return (
    <div>
      <section className="flex h-[300px] flex-col items-center justify-center gap-2 bg-white">
        <h1 className="text-[64px] leading-none font-black tracking-[-1.92px]">신청</h1>
        <p className="text-[24px] font-light text-[#333]">WINK의 스터디와 행사에 참여해보세요</p>
      </section>

      <section className="mx-auto w-[1200px] py-6">
        <div className="relative flex h-[50px] items-end gap-6 border-b border-[#e8e8e8]">
          <button
            type="button"
            onClick={() => handleTabChange('all')}
            className={cn(
              'relative pb-2 text-[18px]',
              !isMyTab ? 'font-bold text-brand' : 'font-normal text-[#333]',
            )}
          >
            전체
            {!isMyTab && (
              <span className="absolute -bottom-px left-0 h-[3px] w-full rounded-[1px] bg-brand" />
            )}
          </button>
          {user && (
            <button
              type="button"
              onClick={() => handleTabChange('my')}
              className={cn(
                'relative pb-2 text-[18px]',
                isMyTab ? 'font-bold text-brand' : 'font-normal text-[#333]',
              )}
            >
              MY 신청
              {isMyTab && (
                <span className="absolute -bottom-px left-0 h-[3px] w-full rounded-[1px] bg-brand" />
              )}
            </button>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm text-[#333]">
            {isMyTab ? (
              <>
                내 신청 <span className="font-semibold text-brand">{myPosts.length}</span>건
              </>
            ) : (
              <>
                전체 <span className="font-semibold text-brand">{allPosts.length}</span>개의
                스터디·행사
              </>
            )}
          </p>
          {!isMyTab && (
            <label className="flex items-center gap-2 text-sm text-[#555]">
              모집 중인 글만 보기
              <Switch checked={recruitingOnly} onCheckedChange={setRecruitingOnly} />
            </label>
          )}
        </div>

        <div className="mt-5 flex h-12 items-center border-t border-[#333] border-b border-[#e8e8e8] text-[13px] text-[#7f7f7f]">
          <span className="w-9 pl-4">번호</span>
          <span className="w-17">구분</span>
          <span className="flex-1">제목</span>
          <span className="w-40">{isMyTab ? '신청일' : '신청 기간'}</span>
          <span className="w-24 pr-4 text-right">{isMyTab ? '내 신청 상태' : '상태'}</span>
        </div>

        {posts.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-28">
            <p className="text-[18px] font-bold text-[#222]">아직 신청한 스터디·행사가 없어요</p>
            <p className="text-sm text-[#888]">전체 탭에서 모집 중인 신청글을 찾아보세요</p>
            <button
              type="button"
              onClick={() => handleTabChange('all')}
              className="mt-2 rounded-lg border border-brand px-5 py-2.5 text-sm font-medium text-brand"
            >
              전체 신청글 보기
            </button>
          </div>
        ) : (
          posts.map((post) => (
            <button
              key={post.id}
              type="button"
              onClick={() => navigate(`/apply/${post.id}`)}
              className="flex w-full items-center gap-4 border-b border-[#e8e8e8] py-6 text-left"
            >
              <span className="w-9 pl-4 text-sm text-[#7f7f7f]">{post.id}</span>
              <span className="w-17 text-[13px] text-[#7f7f7f]">{TYPE_LABEL[post.type]}</span>
              <span className="flex flex-1 flex-col gap-1">
                <span className="flex items-center gap-2">
                  <span className="text-lg font-bold tracking-[-0.36px]">{post.title}</span>
                  {post.status === 'OPEN' && typeof post.dDay === 'number' && (
                    <span className="rounded bg-[#e4ebff] px-2.5 py-1 text-xs font-semibold text-brand">
                      D-{post.dDay}
                    </span>
                  )}
                  {isMyTab && post.status === 'CLOSED' && (
                    <span className="rounded bg-[#6e6e6e] px-2.5 py-1 text-xs font-medium text-white">
                      마감
                    </span>
                  )}
                </span>
                <span className="text-[13px] text-[#7f7f7f]">{post.description}</span>
              </span>
              <span className="w-40 text-[13px] text-[#333]">
                {isMyTab ? post.myApplication?.appliedAt : `${post.periodStart} – ${post.periodEnd}`}
              </span>
              <span className="w-24 pr-4 text-right">
                {isMyTab ? (
                  <span
                    className={cn(
                      'rounded px-2.5 py-1 text-xs font-medium',
                      post.myApplication?.status === 'COMPLETED'
                        ? 'bg-brand text-white'
                        : 'bg-[#eef3ff] text-brand',
                    )}
                  >
                    {post.myApplication?.status === 'COMPLETED' ? '참여 완료' : '제출됨'}
                  </span>
                ) : (
                  <span
                    className={cn(
                      'rounded px-2.5 py-1 text-xs font-medium text-white',
                      post.status === 'OPEN' ? 'bg-brand' : 'bg-[#6e6e6e]',
                    )}
                  >
                    {post.status === 'OPEN' ? '모집 중' : '마감'}
                  </span>
                )}
              </span>
            </button>
          ))
        )}

        {posts.length > 0 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              type="button"
              disabled
              className="flex size-10 items-center justify-center rounded-md text-[#ccc]"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="flex size-10 items-center justify-center rounded-md bg-brand text-sm font-semibold text-white">
              1
            </span>
            <button
              type="button"
              disabled
              className="flex size-10 items-center justify-center rounded-md text-[#ccc]"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
