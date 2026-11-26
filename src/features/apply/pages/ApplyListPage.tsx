import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApplyPostsQuery } from '../api/applyPosts.queries';
import { ApplyEmptyState } from '../components/list/ApplyEmptyState';
import { ApplyListHeaderRow } from '../components/list/ApplyListHeaderRow';
import { ApplyListToolbar } from '../components/list/ApplyListToolbar';
import { ApplyPagination } from '../components/list/ApplyPagination';
import { ApplyPostRow } from '../components/list/ApplyPostRow';
import { ApplyTabs } from '../components/list/ApplyTabs';
import { useAuth } from '@/features/auth/useAuth';

export default function ApplyListPage() {
  const { user } = useAuth();
  const { data: allApplyPosts = [] } = useApplyPostsQuery();
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
        <p className="text-[24px] font-light text-ink">WINK의 스터디와 행사에 참여해보세요</p>
      </section>

      <section className="mx-auto w-[1200px] py-6">
        <ApplyTabs isMyTab={isMyTab} showMyTab={user !== null} onChange={handleTabChange} />

        <ApplyListToolbar
          isMyTab={isMyTab}
          count={isMyTab ? myPosts.length : allPosts.length}
          recruitingOnly={recruitingOnly}
          onRecruitingOnlyChange={setRecruitingOnly}
        />

        <ApplyListHeaderRow isMyTab={isMyTab} />

        {posts.length === 0 ? (
          <ApplyEmptyState onShowAll={() => handleTabChange('all')} />
        ) : (
          posts.map((post) => (
            <ApplyPostRow
              key={post.id}
              post={post}
              isMyTab={isMyTab}
              onClick={() => navigate(`/apply/${post.id}`)}
            />
          ))
        )}

        {posts.length > 0 && <ApplyPagination />}
      </section>
    </div>
  );
}
