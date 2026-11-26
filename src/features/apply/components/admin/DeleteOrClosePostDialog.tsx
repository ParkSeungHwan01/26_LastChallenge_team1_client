import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import type { ApplyPost } from '../../types';

interface DeleteOrClosePostDialogProps {
  post: ApplyPost | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeleteOrClosePostDialog({
  post,
  onOpenChange,
  onConfirm,
}: DeleteOrClosePostDialogProps) {
  const willCloseInstead = Boolean(post && post.applicantCount > 0);

  return (
    <Dialog open={Boolean(post)} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[420px] items-center gap-2 rounded-lg px-9 pt-10 pb-8 text-center">
        <DialogTitle className="text-xl font-bold">
          {willCloseInstead ? '신청글을 마감할까요?' : '신청글을 삭제할까요?'}
        </DialogTitle>
        <p className="text-[15px] font-medium text-brand">{post?.title}</p>
        <p className="text-sm text-muted-foreground">
          {willCloseInstead
            ? '제출자가 있어 삭제 대신 마감 처리돼요.'
            : '삭제하면 되돌릴 수 없어요.'}
        </p>
        <div className="mt-5 flex w-full gap-2">
          <Button variant="outline" className="h-13 flex-1" onClick={() => onOpenChange(false)}>
            닫기
          </Button>
          <Button variant="destructive" className="h-13 flex-1" onClick={onConfirm}>
            {willCloseInstead ? '마감하기' : '삭제'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
