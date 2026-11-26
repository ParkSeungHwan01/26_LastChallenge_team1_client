import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import type { QuestionDraft } from './questionDraft';

interface PostPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  questions: QuestionDraft[];
}

export function PostPreviewDialog({ open, onOpenChange, title, questions }: PostPreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[560px] gap-4">
        <DialogTitle className="text-xl font-bold">{title || '(제목 없음)'}</DialogTitle>
        <div className="flex max-h-[60vh] flex-col gap-4 overflow-y-auto">
          {questions.map((question, index) => (
            <div key={question.draftKey} className="rounded-md border border-hairline p-4">
              <p className="text-sm font-bold">
                <span className="mr-1.5 text-brand">Q{index + 1}.</span>
                {question.title || '(질문 없음)'}
              </p>
              {question.description && (
                <p className="mt-1 text-xs text-ink-soft">{question.description}</p>
              )}
              {question.uiType === 'CHOICE' && (
                <ul className="mt-2 flex flex-col gap-1 text-sm text-ink">
                  {question.options.map((option, i) => (
                    <li key={option.id ?? i}>• {option.content || `선택지 ${i + 1}`}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
