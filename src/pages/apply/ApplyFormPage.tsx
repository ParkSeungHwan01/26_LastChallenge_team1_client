import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useApplyPosts } from '@/hooks/useApplyPosts';
import { useAuth } from '@/hooks/useAuth';
import type { ApplyFormQuestion } from '@/types/apply';

type Answers = Record<string, string | string[]>;

const TYPE_LABEL = { STUDY: '스터디', EVENT: '행사' } as const;

export default function ApplyFormPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { posts } = useApplyPosts();
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);

  const post = posts.find((item) => item.id === Number(postId));

  if (!post) {
    return <div className="p-10">신청글을 찾을 수 없어요.</div>;
  }

  if (!user) {
    return <Navigate to={`/apply/${post.id}`} replace />;
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  function setAnswer(id: string, value: string | string[]) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function toggleMultiple(id: string, option: string) {
    setAnswers((prev) => {
      const current = (prev[id] as string[] | undefined) ?? [];
      const next = current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option];
      return { ...prev, [id]: next };
    });
  }

  return (
    <div className="flex flex-col items-center pb-[140px]">
      <div className="flex w-[780px] flex-col gap-6 pt-14">
        <p className="w-full text-[13px] text-[#7f7f7f]">신청 › {post.title} › 신청서 작성</p>

        <div className="flex flex-col gap-3.5">
          <p className="text-sm font-medium text-brand">신청서 작성</p>
          <h1 className="text-[36px] font-bold tracking-[-0.72px]">{post.title}</h1>
          <p className="text-sm text-[#7f7f7f]">
            {TYPE_LABEL[post.type]} · 신청 기간 {post.periodStart} – {post.periodEnd}
          </p>
        </div>

        <div className="h-px w-full bg-[#333]" />

        <div className="flex flex-col gap-5 pt-2">
          <h2 className="text-xl font-bold tracking-[-0.4px]">질문에 답해주세요</h2>

          {post.detail.questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              index={index}
              question={question}
              value={answers[question.id]}
              onChangeSingle={(value) => setAnswer(question.id, value)}
              onToggleMultiple={(option) => toggleMultiple(question.id, option)}
              onChangeText={(value) => setAnswer(question.id, value)}
            />
          ))}

          <div className="flex w-full justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="h-[52px] w-[140px] rounded border border-[#d9dce1] text-base font-medium text-[#333]"
            >
              이전으로
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="h-[52px] w-[180px] rounded bg-brand text-base font-bold text-white"
            >
              제출하기
            </button>
          </div>
        </div>
      </div>

      <Dialog open={submitted} onOpenChange={setSubmitted}>
        <DialogContent
          className="max-w-[440px] items-center gap-0 rounded-lg px-10 pt-11 pb-9 text-center"
          showCloseButton={false}
        >
          <span className="flex size-16 items-center justify-center rounded-full bg-[#e4ebff]">
            <Check size={28} className="text-brand" />
          </span>
          <DialogTitle className="mt-6 text-[22px] font-bold tracking-[-0.44px]">
            신청서가 제출되었어요
          </DialogTitle>
          <p className="mt-2 text-[15px] font-medium text-brand">{post.title}</p>
          <p className="mt-3 text-sm text-[#7f7f7f]">
            제출한 신청서와 진행 상태는
            <br />
            프로필의 내 신청 내역에서 확인할 수 있어요.
          </p>
          <div className="mt-8 flex w-full gap-2">
            <button
              type="button"
              onClick={() => navigate('/apply')}
              className="h-[52px] flex-1 rounded border border-[#d9dce1] text-[15px] font-medium text-[#333]"
            >
              목록으로
            </button>
            <button
              type="button"
              onClick={() => navigate('/apply?tab=my')}
              className="h-[52px] flex-1 rounded bg-brand text-[15px] font-bold text-white"
            >
              내 신청 내역 보기
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface QuestionCardProps {
  index: number;
  question: ApplyFormQuestion;
  value: string | string[] | undefined;
  onChangeSingle: (value: string) => void;
  onToggleMultiple: (option: string) => void;
  onChangeText: (value: string) => void;
}

function QuestionCard({
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
    <div className="flex w-full flex-col gap-4 rounded-md border border-[#e8e8e8] p-7">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-brand">Q{index + 1}</span>
          <span className="text-base font-bold tracking-[-0.16px]">{question.title}</span>
        </div>
        {question.description && (
          <p className="text-[13px] text-[#7f7f7f]">{question.description}</p>
        )}
      </div>

      {question.type === 'SINGLE_CHOICE' && (
        <RadioGroup value={textValue} onValueChange={onChangeSingle} className="gap-3">
          {question.options?.map((option) => (
            <label key={option} className="flex items-center gap-2.5 text-sm text-[#333]">
              <RadioGroupItem value={option} className="size-[18px]" />
              {option}
            </label>
          ))}
        </RadioGroup>
      )}

      {question.type === 'MULTIPLE_CHOICE' && (
        <div className="flex flex-col gap-3">
          {question.options?.map((option) => (
            <label key={option} className="flex items-center gap-2.5 text-sm text-[#333]">
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
          className="h-12 border-[#d9dce1] text-sm"
        />
      )}

      {question.type === 'LONG_TEXT' && (
        <div className="flex flex-col gap-1">
          <Textarea
            value={textValue}
            onChange={(event) => onChangeText(event.target.value)}
            placeholder="답변을 입력해주세요"
            maxLength={500}
            className="min-h-[148px] border-[#d9dce1] text-sm"
          />
          <p className="self-end text-xs text-[#a9aeb6]">{textValue.length} / 500</p>
        </div>
      )}
    </div>
  );
}
