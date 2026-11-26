import { Check } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface SubmitSuccessDialogProps {
  open: boolean;
  postTitle: string;
  onOpenChange: (open: boolean) => void;
  onGoToList: () => void;
  onGoToDetail: () => void;
}

export function SubmitSuccessDialog({
  open,
  postTitle,
  onOpenChange,
  onGoToList,
  onGoToDetail,
}: SubmitSuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[440px] items-center gap-0 rounded-lg px-10 pt-11 pb-9 text-center"
        showCloseButton={false}
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-chip">
          <Check size={28} className="text-brand" />
        </span>
        <DialogTitle className="mt-6 text-[22px] font-bold tracking-[-0.44px]">
          신청서가 제출되었어요
        </DialogTitle>
        <p className="mt-2 text-[15px] font-medium text-brand">{postTitle}</p>
        <p className="mt-3 text-sm text-ink-soft">
          제출한 신청서와 진행 상태는
          <br />
          신청글 상세 화면에서 확인할 수 있어요.
        </p>
        <div className="mt-8 flex w-full gap-2">
          <button
            type="button"
            onClick={onGoToList}
            className="h-[52px] flex-1 rounded border border-field-border text-[15px] font-medium text-ink"
          >
            목록으로
          </button>
          <button
            type="button"
            onClick={onGoToDetail}
            className="h-[52px] flex-1 rounded bg-brand text-[15px] font-bold text-white"
          >
            신청글 보기
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
