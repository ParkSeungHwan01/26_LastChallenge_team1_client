import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useMyFormQuery, useSubmitFormMutation, useUpdateSubmissionMutation } from '../api/form.queries';
import { QuestionCard } from '../components/form/QuestionCard';
import { SubmitSuccessDialog } from '../components/form/SubmitSuccessDialog';
import { useAuth } from '@/features/auth/useAuth';
import { toDotDate } from '@/lib/date';
import type { AnswerState, ApplyPostType, MyForm, SubmissionAnswerRequest } from '../types';

type Answers = Record<number, AnswerState>;

const TYPE_LABEL: Record<ApplyPostType, string> = { STUDY: '스터디', EVENT: '행사' };

function buildAnswerRequests(answers: Answers): SubmissionAnswerRequest[] {
  return Object.entries(answers).map(([questionId, answer]) => ({
    questionId: Number(questionId),
    optionIds: answer.optionIds.length > 0 ? answer.optionIds : undefined,
    text: answer.text ? answer.text : undefined,
  }));
}

function answersFromSubmission(form: MyForm): Answers {
  const answers: Answers = {};
  for (const answer of form.mySubmission?.answers ?? []) {
    answers[answer.questionId] = { optionIds: answer.optionIds ?? [], text: answer.text ?? '' };
  }
  return answers;
}

export default function ApplyFormPage() {
  const { postId } = useParams();
  const id = Number(postId);
  const { user } = useAuth();
  const { data: form, isLoading } = useMyFormQuery(id);

  if (!user) {
    return <Navigate to={`/apply/${id}`} replace />;
  }

  if (isLoading) {
    return <div className="p-10">불러오는 중이에요...</div>;
  }

  if (!form) {
    return <div className="p-10">신청글을 찾을 수 없어요.</div>;
  }

  return <ApplyFormView key={form.postId} postId={id} form={form} />;
}

function ApplyFormView({ postId, form }: { postId: number; form: MyForm }) {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Answers>(() => answersFromSubmission(form));
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = useSubmitFormMutation(postId);
  const updateMutation = useUpdateSubmissionMutation(postId);
  const existingSubmission = form.mySubmission;

  function setSingleAnswer(questionId: number, optionId: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: { optionIds: [optionId], text: '' } }));
  }

  function toggleMultiAnswer(questionId: number, optionId: number) {
    setAnswers((prev) => {
      const current = prev[questionId]?.optionIds ?? [];
      const next = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];
      return { ...prev, [questionId]: { optionIds: next, text: '' } };
    });
  }

  function setTextAnswer(questionId: number, text: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: { optionIds: [], text } }));
  }

  function handleSubmit() {
    const request = { answers: buildAnswerRequests(answers) };
    const mutation = existingSubmission ? updateMutation : submitMutation;
    mutation.mutate(request, { onSuccess: () => setSubmitted(true) });
  }

  return (
    <div className="flex flex-col items-center pb-[140px]">
      <div className="flex w-[780px] flex-col gap-6 pt-14">
        <p className="w-full text-[13px] text-ink-soft">신청 › {form.title} › 신청서 작성</p>

        <div className="flex flex-col gap-3.5">
          <p className="text-sm font-medium text-brand">신청서 작성</p>
          <h1 className="text-[36px] font-bold tracking-[-0.72px]">{form.title}</h1>
          <p className="text-sm text-ink-soft">
            {TYPE_LABEL[form.type]} · 신청 기간 {toDotDate(form.startDate)} –{' '}
            {toDotDate(form.endDate)}
          </p>
        </div>

        <div className="h-px w-full bg-ink" />

        <div className="flex flex-col gap-5 pt-2">
          <h2 className="text-xl font-bold tracking-[-0.4px]">질문에 답해주세요</h2>

          {form.questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              index={index}
              question={question}
              answer={question.id !== null ? answers[question.id] : undefined}
              onChangeSingle={(optionId) => question.id !== null && setSingleAnswer(question.id, optionId)}
              onToggleMultiple={(optionId) =>
                question.id !== null && toggleMultiAnswer(question.id, optionId)
              }
              onChangeText={(value) => question.id !== null && setTextAnswer(question.id, value)}
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
              onClick={handleSubmit}
              disabled={submitMutation.isPending || updateMutation.isPending}
              className="h-[52px] w-[180px] rounded bg-brand text-base font-bold text-white disabled:opacity-60"
            >
              제출하기
            </button>
          </div>
        </div>
      </div>

      <SubmitSuccessDialog
        open={submitted}
        postTitle={form.title}
        onOpenChange={setSubmitted}
        onGoToList={() => navigate('/apply')}
        onGoToDetail={() => navigate(`/apply/${postId}`)}
      />
    </div>
  );
}
