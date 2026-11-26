import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import type { ApplyFormQuestion } from '../../types';

interface QuestionCardProps {
  index: number;
  question: ApplyFormQuestion;
  value: string | string[] | undefined;
  onChangeSingle: (value: string) => void;
  onToggleMultiple: (option: string) => void;
  onChangeText: (value: string) => void;
}

export function QuestionCard({
  index,
  question,
  value,
  onChangeSingle,
  onToggleMultiple,
  onChangeText,
}: QuestionCardProps) {
  const textValue = typeof value === 'string' ? value : '';
  const selectedOptions = Array.isArray(value) ? value : [];

  return (
    <div className="flex w-full flex-col gap-4 rounded-md border border-hairline p-7">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-brand">Q{index + 1}</span>
          <span className="text-base font-bold tracking-[-0.16px]">{question.title}</span>
        </div>
        {question.description && (
          <p className="text-[13px] text-ink-soft">{question.description}</p>
        )}
      </div>

      {question.type === 'SINGLE_CHOICE' && (
        <RadioGroup value={textValue} onValueChange={onChangeSingle} className="gap-3">
          {question.options?.map((option) => (
            <label key={option} className="flex items-center gap-2.5 text-sm text-ink">
              <RadioGroupItem value={option} className="size-[18px]" />
              {option}
            </label>
          ))}
        </RadioGroup>
      )}

      {question.type === 'MULTIPLE_CHOICE' && (
        <div className="flex flex-col gap-3">
          {question.options?.map((option) => (
            <label key={option} className="flex items-center gap-2.5 text-sm text-ink">
              <Checkbox
                checked={selectedOptions.includes(option)}
                onCheckedChange={() => onToggleMultiple(option)}
                className="size-[18px]"
              />
              {option}
            </label>
          ))}
        </div>
      )}

      {question.type === 'SHORT_TEXT' && (
        <Input
          value={textValue}
          onChange={(event) => onChangeText(event.target.value)}
          placeholder="답변을 입력해주세요"
          className="h-12 border-field-border text-sm"
        />
      )}

      {question.type === 'LONG_TEXT' && (
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
