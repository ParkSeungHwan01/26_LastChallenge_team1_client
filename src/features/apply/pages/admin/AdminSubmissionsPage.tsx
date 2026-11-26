import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSubmittersQuery } from '../../api/submitters.queries';
import { AdminBreadcrumb } from '../../components/AdminBreadcrumb';
import { SubmissionStats } from '../../components/admin/SubmissionStats';
import { SubmitterDetailDialog } from '../../components/admin/SubmitterDetailDialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toDotDate } from '@/lib/date';
import { cn } from '@/lib/utils';
import type { SubmissionStatus } from '../../types';

type StatusTab = 'ALL' | SubmissionStatus;

export default function AdminSubmissionsPage() {
  const { postId } = useParams();
  const id = Number(postId);
  const [statusTab, setStatusTab] = useState<StatusTab>('ALL');
  const [openSubmissionId, setOpenSubmissionId] = useState<number | null>(null);

  const { data } = useSubmittersQuery(id, {
    status: statusTab === 'ALL' ? undefined : statusTab,
  });

  if (!data) {
    return <div>불러오는 중이에요...</div>;
  }

  const { post, counts, content: submitters } = data;

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
          {post.type === 'STUDY' ? '스터디' : '행사'} · 신청 기간 {toDotDate(post.startDate)} –{' '}
          {toDotDate(post.endDate)}
        </p>

        <SubmissionStats total={counts.total} submitted={counts.submitted} completed={counts.completed} />

        <div className="mt-8 flex gap-6 border-b border-hairline">
          {(
            [
              ['ALL', `전체 ${counts.total}`],
              ['SUBMITTED', `제출됨 ${counts.submitted}`],
              ['COMPLETED', `참여 완료 ${counts.completed}`],
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
            {submitters.length > 0 ? (
              submitters.map((submitter) => (
                <TableRow
                  key={submitter.submissionId}
                  className="cursor-pointer"
                  onClick={() => setOpenSubmissionId(submitter.submissionId)}
                >
                  <TableCell className="font-medium">{submitter.name}</TableCell>
                  <TableCell className="text-center">{submitter.studentNo}</TableCell>
                  <TableCell className="text-center">{toDotDate(submitter.submittedAt)}</TableCell>
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

      <SubmitterDetailDialog
        postId={id}
        submissionId={openSubmissionId}
        onOpenChange={(open) => !open && setOpenSubmissionId(null)}
      />
    </>
  );
}
