import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import type { AnswerState, ApplyFormQuestion } from '../../types';

interface QuestionCardProps {
  index: number;
  question: ApplyFormQuestion;
  answer: AnswerState | undefined;
  onChangeSingle: (optionId: number) => void;
  onToggleMultiple: (optionId: number) => void;
  onChangeText: (value: string) => void;
}

export function QuestionCard({
  index,
  question,
  answer,
  onChangeSingle,
  onToggleMultiple,
  onChangeText,
}: QuestionCardProps) {
  const selectedOptionIds = answer?.optionIds ?? [];
  const textValue = answer?.text ?? '';

  return (
    <div className="flex w-full flex-col gap-4 rounded-md border border-hairline p-7">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-brand">Q{index + 1}</span>
          <span className="text-base font-bold tracking-[-0.16px]">{question.content}</span>
        </div>
        {question.description && (
          <p className="text-[13px] text-ink-soft">{question.description}</p>
        )}
      </div>

      {question.type === 'SINGLE' && (
        <RadioGroup
          value={selectedOptionIds[0] !== undefined ? String(selectedOptionIds[0]) : ''}
          onValueChange={(value) => onChangeSingle(Number(value))}
          className="gap-3"
        >
          {question.options.map((option) => (
            <label key={option.id} className="flex items-center gap-2.5 text-sm text-ink">
              <RadioGroupItem value={String(option.id)} className="size-[18px]" />
              {option.content}
            </label>
          ))}
        </RadioGroup>
      )}

      {question.type === 'MULTI' && (
        <div className="flex flex-col gap-3">
          {question.options.map((option) => (
            <label key={option.id} className="flex items-center gap-2.5 text-sm text-ink">
              <Checkbox
                checked={option.id !== null && selectedOptionIds.includes(option.id)}
                onCheckedChange={() => option.id !== null && onToggleMultiple(option.id)}
                className="size-[18px]"
              />
              {option.content}
            </label>
          ))}
        </div>
      )}

      {question.type === 'SHORT' && (
        <Input
          value={textValue}
          onChange={(event) => onChangeText(event.target.value)}
          placeholder="답변을 입력해주세요"
          className="h-12 border-field-border text-sm"
        />
      )}

      {question.type === 'LONG' && (
        <div className="flex flex-col gap-1">
          <Textarea
            value={textValue}
            onChange={(event) => onChangeText(event.target.value)}
            placeholder="답변을 입력해주세요"
            maxLength={500}
            className="min-h-[148px] border-field-border text-sm"
          />
          <p className="self-end text-xs text-placeholder">{textValue.length} / 500</p>
        </div>
      )}
    </div>
  );
}
