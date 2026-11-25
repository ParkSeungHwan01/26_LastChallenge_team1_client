import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ChevronDown, MoreHorizontal } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/layout/AdminBreadcrumb';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useApplyPosts } from '@/hooks/useApplyPosts';
import { cn } from '@/lib/utils';
import type { ApplyPost, ApplyPostType } from '@/types/apply';

const TYPE_LABEL: Record<ApplyPostType, string> = { STUDY: '스터디', EVENT: '행사' };
type StatusTab = 'ALL' | 'OPEN' | 'CLOSED';

export default function AdminPostListPage() {
  const navigate = useNavigate();
  const { posts, closePost, removePost } = useApplyPosts();
  const [statusTab, setStatusTab] = useState<StatusTab>('ALL');
  const [typeFilter, setTypeFilter] = useState<'ALL' | ApplyPostType>('ALL');
  const [keyword, setKeyword] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<ApplyPost | null>(null);

  const filtered = useMemo(() => {
    return posts
      .filter((post) => statusTab === 'ALL' || post.status === statusTab)
      .filter((post) => typeFilter === 'ALL' || post.type === typeFilter)
      .filter((post) => post.title.toLowerCase().includes(keyword.trim().toLowerCase()));
  }, [posts, statusTab, typeFilter, keyword]);

  function handleDeleteConfirm() {
    if (!deleteTarget) return;
    if (deleteTarget.applicantCount > 0) {
      closePost(deleteTarget.id);
      toast.success('제출자가 있어 삭제 대신 마감 처리했어요');
    } else {
      removePost(deleteTarget.id);
    }
    setDeleteTarget(null);
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
          <Button variant="wink" onClick={() => navigate('/admin/apply-posts/new')}>
            + 신청글 작성
          </Button>
        </div>

        <div className="mt-6 flex items-end justify-between border-b border-border">
          <div className="flex gap-6">
            {(
              [
                ['ALL', `전체 ${posts.length}`],
                ['OPEN', `모집중 ${posts.filter((p) => p.status === 'OPEN').length}`],
                ['CLOSED', `마감 ${posts.filter((p) => p.status === 'CLOSED').length}`],
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
            {filtered.length > 0 ? (
              filtered.map((post) => (
                <TableRow
                  key={post.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/admin/apply-posts/${post.id}/submissions`)}
                >
                  <TableCell className="text-muted-foreground">{post.id}</TableCell>
                  <TableCell className="text-muted-foreground">{TYPE_LABEL[post.type]}</TableCell>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell className="text-center">
                    {post.periodStart} – {post.periodEnd}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={cn(
                        'rounded px-2.5 py-[3px] text-xs font-medium text-white',
                        post.status === 'OPEN' ? 'bg-brand' : 'bg-neutral-500',
                      )}
                    >
                      {post.status === 'OPEN' ? '모집 중' : '마감'}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">{post.applicantCount}명</TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="size-8"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem
                          onClick={(event) => event.stopPropagation()}
                          onSelect={() => navigate(`/admin/apply-posts/${post.id}/submissions`)}
                        >
                          제출자 보기
                        </DropdownMenuItem>
                        {post.status === 'OPEN' && (
                          <>
                            <DropdownMenuItem
                              onClick={(event) => event.stopPropagation()}
                              onSelect={() => navigate(`/admin/apply-posts/${post.id}/edit`)}
                            >
                              수정
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(event) => event.stopPropagation()}
                              onSelect={() => closePost(post.id)}
                            >
                              마감하기
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={(event) => event.stopPropagation()}
                          onSelect={() => setDeleteTarget(post)}
                        >
                          삭제
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
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

      <Dialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent className="max-w-[420px] items-center gap-2 rounded-lg px-9 pt-10 pb-8 text-center">
          <DialogTitle className="text-xl font-bold">
            {deleteTarget && deleteTarget.applicantCount > 0
              ? '신청글을 마감할까요?'
              : '신청글을 삭제할까요?'}
          </DialogTitle>
          <p className="text-[15px] font-medium text-brand">{deleteTarget?.title}</p>
          <p className="text-sm text-muted-foreground">
            {deleteTarget && deleteTarget.applicantCount > 0
              ? '제출자가 있어 삭제 대신 마감 처리돼요.'
              : '삭제하면 되돌릴 수 없어요.'}
          </p>
          <div className="mt-5 flex w-full gap-2">
            <Button variant="outline" className="h-13 flex-1" onClick={() => setDeleteTarget(null)}>
              닫기
            </Button>
            <Button variant="destructive" className="h-13 flex-1" onClick={handleDeleteConfirm}>
              {deleteTarget && deleteTarget.applicantCount > 0 ? '마감하기' : '삭제'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
