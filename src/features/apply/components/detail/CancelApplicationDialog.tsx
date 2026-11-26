import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface CancelApplicationDialogProps {
  open: boolean;
  postTitle: string;
  pending?: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function CancelApplicationDialog({
  open,
  postTitle,
  pending,
  onOpenChange,
  onConfirm,
}: CancelApplicationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[420px] items-center gap-2 rounded-lg px-9 pt-10 pb-8 text-center"
        showCloseButton={false}
      >
        <DialogTitle className="text-xl font-bold">신청을 취소할까요?</DialogTitle>
        <p className="text-[15px] font-medium text-brand">{postTitle}</p>
        <p className="text-sm text-ink-soft">
          취소하면 작성한 신청서가 삭제돼요.
          <br />
          모집 기간 안에는 다시 신청할 수 있어요.
        </p>
        <div className="mt-5 flex w-full gap-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="h-[52px] flex-1 rounded border border-field-border text-[15px] font-medium text-ink"
          >
            닫기
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={pending}
            className="h-[52px] flex-1 rounded bg-danger text-[15px] font-bold text-white disabled:opacity-60"
          >
            신청 취소
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
