import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AdminBreadcrumb } from '@/components/layout/AdminBreadcrumb';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useApplyPosts } from '@/hooks/useApplyPosts';
import { cn } from '@/lib/utils';
import { getSubmittersByPostId } from '@/mocks/adminSubmissions';
import type { Submitter } from '@/types/admin';

type StatusTab = 'ALL' | 'SUBMITTED' | 'COMPLETED';

export default function AdminSubmissionsPage() {
  const { postId } = useParams();
  const { posts } = useApplyPosts();
  const post = posts.find((item) => item.id === Number(postId));
  const [submitters, setSubmitters] = useState<Submitter[]>(
    getSubmittersByPostId(Number(postId)),
  );
  const [statusTab, setStatusTab] = useState<StatusTab>('ALL');
  const [openSubmitter, setOpenSubmitter] = useState<Submitter | null>(null);

  const submittedCount = submitters.filter((s) => s.status === 'SUBMITTED').length;
  const completedCount = submitters.filter((s) => s.status === 'COMPLETED').length;

  const filtered = useMemo(
    () => submitters.filter((s) => statusTab === 'ALL' || s.status === statusTab),
    [submitters, statusTab],
  );

  function markCompleted(submitterId: number) {
    setSubmitters((prev) =>
      prev.map((s) => (s.id === submitterId ? { ...s, status: 'COMPLETED' } : s)),
    );
    setOpenSubmitter((prev) =>
      prev && prev.id === submitterId ? { ...prev, status: 'COMPLETED' } : prev,
    );
  }

  if (!post) {
    return <div>신청글을 찾을 수 없어요.</div>;
  }

  return (
    <>
      <AdminBreadcrumb page="제출자 관리" />

      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <span
            className={cn(
              'rounded px-2.5 py-[3px] text-xs font-medium text-white',
              post.status === 'OPEN' ? 'bg-brand' : 'bg-neutral-500',
            )}
          >
            {post.status === 'OPEN' ? '모집 중' : '마감'}
          </span>
        </div>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {post.type === 'STUDY' ? '스터디' : '행사'} · 신청 기간 {post.periodStart} –{' '}
          {post.periodEnd}
        </p>

        <div className="mt-8 flex divide-x divide-border rounded-md border border-border">
          <StatCard label="전체 제출" value={submitters.length} />
          <StatCard label="제출됨" value={submittedCount} />
          <StatCard label="참여 완료" value={completedCount} />
        </div>

        <div className="mt-8 flex gap-6 border-b border-border">
          {(
            [
              ['ALL', `전체 ${submitters.length}`],
              ['SUBMITTED', `제출됨 ${submittedCount}`],
              ['COMPLETED', `참여 완료 ${completedCount}`],
            ] as [StatusTab, string][]
          ).map(([tab, label]) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStatusTab(tab)}
              className={cn(
                'relative pb-2.5 text-sm',
                statusTab === tab ? 'font-semibold text-brand' : 'text-foreground',
              )}
            >
              {label}
              {statusTab === tab && (
                <span className="absolute -bottom-px left-0 h-[3px] w-full rounded-[1px] bg-brand" />
              )}
            </button>
          ))}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>이름</TableHead>
              <TableHead className="text-center">학번</TableHead>
              <TableHead className="text-center">제출일</TableHead>
              <TableHead className="text-center">상태</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length > 0 ? (
              filtered.map((submitter) => (
                <TableRow
                  key={submitter.id}
                  className="cursor-pointer"
                  onClick={() => setOpenSubmitter(submitter)}
                >
                  <TableCell className="font-medium">{submitter.name}</TableCell>
                  <TableCell className="text-center">{submitter.studentId}</TableCell>
                  <TableCell className="text-center">{submitter.submittedAt}</TableCell>
                  <TableCell className="text-center">
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
                  </TableCell>
                  <TableCell />
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  해당하는 제출자가 없어요
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <p className="mt-4 text-xs text-muted-foreground">
          행을 누르면 제출한 신청서 답변을 볼 수 있어요
        </p>
      </div>

      <Dialog open={Boolean(openSubmitter)} onOpenChange={(open) => !open && setOpenSubmitter(null)}>
        <DialogContent className="max-w-[560px] gap-0 p-9">
          {openSubmitter && (
            <>
              <div className="flex items-center gap-2">
                <DialogTitle className="text-xl font-bold">{openSubmitter.name}</DialogTitle>
                <span
                  className={cn(
                    'rounded px-2.5 py-[3px] text-xs font-medium',
                    openSubmitter.status === 'COMPLETED'
                      ? 'bg-brand text-white'
                      : 'bg-wink-50 text-brand',
                  )}
                >
                  {openSubmitter.status === 'COMPLETED' ? '참여 완료' : '제출됨'}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {openSubmitter.studentId} · {openSubmitter.submittedAtTime}
              </p>

              <div className="mt-5 flex flex-col gap-4 border-t border-border pt-5">
                {post.detail.questions.map((question, index) => {
                  const answer = openSubmitter.answers.find((a) => a.questionId === question.id);
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
                  disabled={openSubmitter.status === 'COMPLETED'}
                  onClick={() => markCompleted(openSubmitter.id)}
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
    </>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-1 flex-col gap-1 p-6">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-3xl font-bold">{value}명</span>
    </div>
  );
}
