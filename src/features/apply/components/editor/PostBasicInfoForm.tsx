import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { ApplyPostType } from '../../types';
import { FormRow } from './FormRow';

interface PostBasicInfoFormProps {
  category: ApplyPostType;
  categoryLocked?: boolean;
  onCategoryChange: (value: ApplyPostType) => void;
  title: string;
  onTitleChange: (value: string) => void;
  summary: string;
  onSummaryChange: (value: string) => void;
  periodStart: string;
  onPeriodStartChange: (value: string) => void;
  periodEnd: string;
  onPeriodEndChange: (value: string) => void;
  body: string;
  onBodyChange: (value: string) => void;
}

export function PostBasicInfoForm({
  category,
  categoryLocked,
  onCategoryChange,
  title,
  onTitleChange,
  summary,
  onSummaryChange,
  periodStart,
  onPeriodStartChange,
  periodEnd,
  onPeriodEndChange,
  body,
  onBodyChange,
}: PostBasicInfoFormProps) {
  return (
    <section className="flex flex-col gap-5 rounded-md border border-hairline p-8">
      <h2 className="text-lg font-bold">기본 정보</h2>

      <FormRow label="구분" required>
        <div className="flex flex-col gap-1.5">
          <div className="flex overflow-hidden rounded-md border border-field-border">
            {(['STUDY', 'EVENT'] as ApplyPostType[]).map((value) => (
              <button
                key={value}
                type="button"
                disabled={categoryLocked}
                onClick={() => onCategoryChange(value)}
                className={cn(
                  'h-[46px] w-25 text-sm font-medium disabled:cursor-not-allowed',
                  category === value ? 'bg-brand text-white' : 'bg-white text-ink',
                )}
              >
                {value === 'STUDY' ? '스터디' : '행사'}
              </button>
            ))}
          </div>
          {categoryLocked && (
            <p className="text-xs text-ink-soft">등록 후에는 구분을 바꿀 수 없어요</p>
          )}
        </div>
      </FormRow>

      <FormRow label="제목" required>
        <Input
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="신청글 제목을 입력해주세요"
          className="h-[46px] max-w-[670px]"
        />
      </FormRow>

      <FormRow label="한 줄 소개">
        <Input
          value={summary}
          onChange={(event) => onSummaryChange(event.target.value)}
          placeholder="목록에 보일 짧은 소개를 입력해주세요"
          className="h-[46px] max-w-[670px]"
        />
      </FormRow>

      <FormRow label="신청 기간" required>
        <div className="flex max-w-[670px] items-center gap-2.5">
          <Input
            type="date"
            value={periodStart}
            onChange={(event) => onPeriodStartChange(event.target.value)}
            className="h-[46px] w-50"
          />
          <span className="text-ink-soft">~</span>
          <Input
            type="date"
            value={periodEnd}
            onChange={(event) => onPeriodEndChange(event.target.value)}
            className="h-[46px] w-50"
          />
        </div>
      </FormRow>

      <FormRow label="본문" required align="start">
        <Textarea
          value={body}
          onChange={(event) => onBodyChange(event.target.value)}
          placeholder="스터디 소개, 진행 방식, 일정, 장소, 대상 등 부원에게 안내할 내용을 자유롭게 적어주세요."
          className="min-h-50 max-w-[670px]"
        />
      </FormRow>
    </section>
  );
}
