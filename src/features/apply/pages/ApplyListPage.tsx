import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApplyPostsQuery } from '../api/applyPosts.queries';
import { useMySubmissionsQuery } from '../api/mySubmissions.queries';
import { ApplyEmptyState } from '../components/list/ApplyEmptyState';
import { ApplyListHeaderRow } from '../components/list/ApplyListHeaderRow';
import { ApplyListToolbar } from '../components/list/ApplyListToolbar';
import { ApplyPagination } from '../components/list/ApplyPagination';
import { ApplyPostRow } from '../components/list/ApplyPostRow';
import { ApplyTabs } from '../components/list/ApplyTabs';
import { MySubmissionRow } from '../components/list/MySubmissionRow';
import { useAuth } from '@/features/auth/useAuth';

const PAGE_SIZE = 10;

export default function ApplyListPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [recruitingOnly, setRecruitingOnly] = useState(false);
  const [page, setPage] = useState(0);

  const isMyTab = user !== null && searchParams.get('tab') === 'my';

  const { data: allData } = useApplyPostsQuery(
    { recruiting: recruitingOnly, page, size: PAGE_SIZE },
    { enabled: !isMyTab },
  );
  const { data: myData } = useMySubmissionsQuery({ page, size: PAGE_SIZE }, { enabled: isMyTab });

  const data = isMyTab ? myData : allData;
  const posts = allData?.content ?? [];
  const mySubmissions = myData?.content ?? [];

  function handleTabChange(tab: 'all' | 'my') {
    const next = new URLSearchParams(searchParams);
    if (tab === 'all') {
      next.delete('tab');
    } else {
      next.set('tab', 'my');
    }
    setSearchParams(next, { replace: true });
    setPage(0);
  }

  function handleRecruitingOnlyChange(checked: boolean) {
    setRecruitingOnly(checked);
    setPage(0);
  }

  return (
    <div>
      <section className="flex h-[300px] flex-col items-center justify-center gap-2 bg-white">
        <h1 className="text-[48px] leading-none font-black tracking-[-1.44px]">신청</h1>
        <p className="text-[24px] font-light text-ink">WINK의 스터디와 행사에 참여해보세요</p>
      </section>

      <section className="mx-auto w-[1200px] py-6">
        <ApplyTabs isMyTab={isMyTab} showMyTab={user !== null} onChange={handleTabChange} />

        <ApplyListToolbar
          isMyTab={isMyTab}
          count={data?.totalElements ?? 0}
          recruitingOnly={recruitingOnly}
          onRecruitingOnlyChange={handleRecruitingOnlyChange}
        />

        <ApplyListHeaderRow isMyTab={isMyTab} />

        {isMyTab ? (
          mySubmissions.length === 0 ? (
            <ApplyEmptyState onShowAll={() => handleTabChange('all')} />
          ) : (
            mySubmissions.map((submission) => (
              <MySubmissionRow
                key={submission.submissionId}
                submission={submission}
                onClick={() => navigate(`/apply/${submission.postId}`)}
              />
            ))
          )
        ) : posts.length === 0 ? (
          <ApplyEmptyState onShowAll={() => handleRecruitingOnlyChange(false)} />
        ) : (
          posts.map((post) => (
            <ApplyPostRow key={post.id} post={post} onClick={() => navigate(`/apply/${post.id}`)} />
          ))
        )}

        {(data?.totalElements ?? 0) > 0 && (
          <ApplyPagination page={page} totalPages={data?.totalPages ?? 1} onPageChange={setPage} />
        )}
      </section>
    </div>
  );
}
