import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ChevronDown } from 'lucide-react';
import {
  useAdminApplyPostsQuery,
  useCloseApplyPostMutation,
  useRemoveApplyPostMutation,
} from '../../api/applyPosts.queries';
import { AdminBreadcrumb } from '../../components/AdminBreadcrumb';
import { AdminPostTableRow } from '../../components/admin/AdminPostTableRow';
import { DeleteOrClosePostDialog } from '../../components/admin/DeleteOrClosePostDialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ApiError } from '@/lib/http';
import { cn } from '@/lib/utils';
import type { AdminPostListItem, ApplyPostStatus, ApplyPostType } from '../../types';

const TYPE_LABEL: Record<ApplyPostType, string> = { STUDY: '스터디', EVENT: '행사' };
type StatusTab = 'ALL' | ApplyPostStatus;

export default function AdminPostListPage() {
  const navigate = useNavigate();
  const [statusTab, setStatusTab] = useState<StatusTab>('ALL');
  const [typeFilter, setTypeFilter] = useState<'ALL' | ApplyPostType>('ALL');
  const [keyword, setKeyword] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<AdminPostListItem | null>(null);

  const { data } = useAdminApplyPostsQuery({
    status: statusTab === 'ALL' ? undefined : statusTab,
    type: typeFilter === 'ALL' ? undefined : typeFilter,
    keyword: keyword.trim() || undefined,
    size: 50,
  });
  const posts = data?.content ?? [];

  const { data: allForCounts } = useAdminApplyPostsQuery({ size: 100 });
  const openCount = allForCounts?.content.filter((p) => p.status === 'OPEN').length ?? 0;
  const closedCount = allForCounts?.content.filter((p) => p.status === 'CLOSED').length ?? 0;

  const closePostMutation = useCloseApplyPostMutation();
  const removePostMutation = useRemoveApplyPostMutation();

  function handleDeleteConfirm() {
    if (!deleteTarget) return;
    const target = deleteTarget;
    setDeleteTarget(null);

    if (target.submissionCount > 0) {
      closePostMutation.mutate(target.id);
      toast.success('제출자가 있어 삭제 대신 마감 처리했어요');
      return;
    }

    removePostMutation.mutate(target.id, {
      onError: (error) => {
        if (error instanceof ApiError && error.errorCode === 'POST_HAS_SUBMISSIONS') {
          closePostMutation.mutate(target.id);
          toast.success('제출자가 있어 삭제 대신 마감 처리했어요');
        } else {
          toast.error('삭제에 실패했어요');
        }
      },
    });
  }

  return (
    <>
      <AdminBreadcrumb page="신청글 목록" />

      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center gap-3">
          <Input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="검색어를 입력해주세요."
            className="h-10 flex-1"
          />
          <Button variant="wink" className="h-10" onClick={() => navigate('/admin/apply-posts/new')}>
            + 신청글 작성
          </Button>
        </div>

        <div className="mt-6 flex items-end justify-between border-b border-hairline">
          <div className="flex gap-6">
            {(
              [
                ['ALL', `전체 ${(allForCounts?.content.length ?? 0)}`],
                ['OPEN', `모집중 ${openCount}`],
                ['CLOSED', `마감 ${closedCount}`],
              ] as [StatusTab, string][]
            ).map(([tab, label]) => (
              <button
                key={tab}
                type="button"
                onClick={() => setStatusTab(tab)}
                className={cn(
                  'relative pb-3 text-sm',
                  statusTab === tab ? 'font-semibold text-brand' : 'text-muted-foreground',
                )}
              >
                {label}
                {statusTab === tab && (
                  <span className="absolute -bottom-px left-0 h-[3px] w-full rounded-[1px] bg-brand" />
                )}
              </button>
            ))}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="mb-2 gap-1">
                종류: {typeFilter === 'ALL' ? '전체' : TYPE_LABEL[typeFilter]}
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup
                value={typeFilter}
                onValueChange={(value) => setTypeFilter(value as 'ALL' | ApplyPostType)}
              >
                <DropdownMenuRadioItem value="ALL">전체</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="STUDY">스터디</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="EVENT">행사</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">번호</TableHead>
              <TableHead className="w-18">구분</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className="w-55 text-center">신청 기간</TableHead>
              <TableHead className="w-24 text-center">상태</TableHead>
              <TableHead className="w-24 text-center">제출 인원</TableHead>
              <TableHead className="w-24 text-center">액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length > 0 ? (
              posts.map((post) => (
                <AdminPostTableRow
                  key={post.id}
                  post={post}
                  onOpenSubmissions={() => navigate(`/admin/apply-posts/${post.id}/submissions`)}
                  onEdit={() => navigate(`/admin/apply-posts/${post.id}/edit`)}
                  onClose={() => closePostMutation.mutate(post.id)}
                  onDeleteRequest={() => setDeleteTarget(post)}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  신청글이 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <p className="text-xs text-muted-foreground">* 제출자가 있는 신청글은 삭제 대신 마감 처리돼요</p>
      </div>

      <DeleteOrClosePostDialog
        post={deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
