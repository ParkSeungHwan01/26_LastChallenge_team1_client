import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import { toDotDate } from '@/lib/date';
import { cn } from '@/lib/utils';
import type { AdminPostListItem, ApplyPostType } from '../../types';

const TYPE_LABEL: Record<ApplyPostType, string> = { STUDY: '스터디', EVENT: '행사' };

interface AdminPostTableRowProps {
  post: AdminPostListItem;
  onOpenSubmissions: () => void;
  onEdit: () => void;
  onClose: () => void;
  onDeleteRequest: () => void;
}

export function AdminPostTableRow({
  post,
  onOpenSubmissions,
  onEdit,
  onClose,
  onDeleteRequest,
}: AdminPostTableRowProps) {
  return (
    <TableRow className="cursor-pointer" onClick={onOpenSubmissions}>
      <TableCell className="text-muted-foreground">{post.no}</TableCell>
      <TableCell className="text-muted-foreground">{TYPE_LABEL[post.type]}</TableCell>
      <TableCell className="font-medium">{post.title}</TableCell>
      <TableCell className="text-center">
        {toDotDate(post.startDate)} – {toDotDate(post.endDate)}
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
      <TableCell className="text-center">{post.submissionCount}명</TableCell>
      <TableCell className="text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="size-8" onClick={(event) => event.stopPropagation()}>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem
              onClick={(event) => event.stopPropagation()}
              onSelect={onOpenSubmissions}
            >
              제출자 보기
            </DropdownMenuItem>
            {post.status === 'OPEN' && (
              <>
                <DropdownMenuItem onClick={(event) => event.stopPropagation()} onSelect={onEdit}>
                  수정
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(event) => event.stopPropagation()} onSelect={onClose}>
                  마감하기
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={(event) => event.stopPropagation()}
              onSelect={onDeleteRequest}
            >
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
