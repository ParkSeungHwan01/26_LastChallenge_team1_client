import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useApplyPost } from '../api/applyPosts.queries';
import { QuestionCard } from '../components/form/QuestionCard';
import { SubmitSuccessDialog } from '../components/form/SubmitSuccessDialog';
import { useAuth } from '@/features/auth/useAuth';
import type { ApplyPostType } from '../types';

type Answers = Record<string, string | string[]>;

const TYPE_LABEL: Record<ApplyPostType, string> = { STUDY: '스터디', EVENT: '행사' };

export default function ApplyFormPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);

  const post = useApplyPost(Number(postId));

  if (!post) {
    return <div className="p-10">신청글을 찾을 수 없어요.</div>;
  }

  if (!user) {
    return <Navigate to={`/apply/${post.id}`} replace />;
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
        <p className="w-full text-[13px] text-ink-soft">신청 › {post.title} › 신청서 작성</p>

        <div className="flex flex-col gap-3.5">
          <p className="text-sm font-medium text-brand">신청서 작성</p>
          <h1 className="text-[36px] font-bold tracking-[-0.72px]">{post.title}</h1>
          <p className="text-sm text-ink-soft">
            {TYPE_LABEL[post.type]} · 신청 기간 {post.periodStart} – {post.periodEnd}
          </p>
        </div>

        <div className="h-px w-full bg-ink" />

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
              className="h-[52px] w-[140px] rounded border border-field-border text-base font-medium text-ink"
            >
              이전으로
            </button>
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="h-[52px] w-[180px] rounded bg-brand text-base font-bold text-white"
            >
              제출하기
            </button>
          </div>
        </div>
      </div>

      <SubmitSuccessDialog
        open={submitted}
        postTitle={post.title}
        onOpenChange={setSubmitted}
        onGoToList={() => navigate('/apply')}
        onGoToMyApplications={() => navigate('/apply?tab=my')}
      />
    </div>
  );
}
