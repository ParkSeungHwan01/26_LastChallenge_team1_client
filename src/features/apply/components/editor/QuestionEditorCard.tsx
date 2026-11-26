import { ChevronDown, ChevronUp, GripVertical, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { UI_TYPE_LABEL, type QuestionDraft, type UiQuestionType } from './questionDraft';

interface QuestionEditorCardProps {
  question: QuestionDraft;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  onMove: (direction: -1 | 1) => void;
  onUpdate: (patch: Partial<QuestionDraft>) => void;
  onRemove: () => void;
  onUpdateOption: (optionIndex: number, value: string) => void;
  onAddOption: () => void;
  onRemoveOption: (optionIndex: number) => void;
}

export function QuestionEditorCard({
  question,
  index,
  isFirst,
  isLast,
  onMove,
  onUpdate,
  onRemove,
  onUpdateOption,
  onAddOption,
  onRemoveOption,
}: QuestionEditorCardProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center gap-1 pt-6 text-placeholder">
        <button type="button" onClick={() => onMove(-1)} disabled={isFirst} className="disabled:opacity-30">
          <ChevronUp size={14} />
        </button>
        <GripVertical size={16} />
        <button type="button" onClick={() => onMove(1)} disabled={isLast} className="disabled:opacity-30">
          <ChevronDown size={14} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 rounded-md border border-hairline p-5">
        <div className="flex items-center gap-2">
          <span className="pt-2 text-sm font-semibold text-brand">Q{index + 1}</span>
          <Input
            value={question.title}
            onChange={(event) => onUpdate({ title: event.target.value })}
            placeholder="질문을 입력해주세요"
            className="h-[46px] flex-1"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-[46px] w-35 justify-between">
                {UI_TYPE_LABEL[question.uiType]}
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup
                value={question.uiType}
                onValueChange={(value) => onUpdate({ uiType: value as UiQuestionType })}
              >
                <DropdownMenuRadioItem value="CHOICE">객관식</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="SHORT_TEXT">단답형</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="LONG_TEXT">장문형</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Input
          value={question.description}
          onChange={(event) => onUpdate({ description: event.target.value })}
          placeholder="설명 (선택) · 질문 아래에 작게 보일 안내"
          className="h-10"
        />

        {question.uiType === 'CHOICE' && (
          <div className="flex flex-col gap-2">
            {question.options.map((option, optionIndex) => (
              <div key={option.id ?? optionIndex} className="flex items-center gap-2.5">
                <span
                  className={cn(
                    'size-4 shrink-0 border border-control-outline',
                    question.allowMultiple ? 'rounded-[4px]' : 'rounded-full',
                  )}
                />
                <Input
                  value={option.content}
                  onChange={(event) => onUpdateOption(optionIndex, event.target.value)}
                  placeholder={`선택지 ${optionIndex + 1}`}
                  className="h-10 flex-1"
                />
                <button
                  type="button"
                  onClick={() => onRemoveOption(optionIndex)}
                  className="text-placeholder hover:text-ink"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            <button type="button" onClick={onAddOption} className="self-start text-sm text-brand">
              + 선택지 추가
            </button>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 border-t border-hairline pt-3">
          {question.uiType === 'CHOICE' && (
            <label className="flex items-center gap-2 text-sm text-ink">
              여러 개 선택 허용
              <Switch
                checked={question.allowMultiple}
                onCheckedChange={(checked) => onUpdate({ allowMultiple: checked })}
              />
            </label>
          )}
          <button type="button" onClick={onRemove} className="text-placeholder hover:text-danger">
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
