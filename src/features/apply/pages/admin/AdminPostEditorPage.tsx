import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import {
  useAddApplyPostMutation,
  useApplyPost,
  useUpdateApplyPostMutation,
} from '../../api/applyPosts.queries';
import { AdminBreadcrumb } from '../../components/AdminBreadcrumb';
import { draftToQuestion } from '../../components/editor/questionDraft';
import { PostBasicInfoForm } from '../../components/editor/PostBasicInfoForm';
import { PostPreviewDialog } from '../../components/editor/PostPreviewDialog';
import { PostQuestionsEditor } from '../../components/editor/PostQuestionsEditor';
import { useQuestionDrafts } from '../../hooks/useQuestionDrafts';
import { Button } from '@/components/ui/button';
import type { ApplyPostType } from '../../types';

export default function AdminPostEditorPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const existingPost = useApplyPost(Number(postId));
  const isEdit = Boolean(existingPost);
  const addPostMutation = useAddApplyPostMutation();
  const updatePostMutation = useUpdateApplyPostMutation();

  const [category, setCategory] = useState<ApplyPostType>(existingPost?.type ?? 'STUDY');
  const [title, setTitle] = useState(existingPost?.title ?? '');
  const [summary, setSummary] = useState(existingPost?.description ?? '');
  const [periodStart, setPeriodStart] = useState(
    existingPost?.periodStart.replaceAll('.', '-') ?? '',
  );
  const [periodEnd, setPeriodEnd] = useState(existingPost?.periodEnd.replaceAll('.', '-') ?? '');
  const [body, setBody] = useState(existingPost?.detail.intro ?? '');
  const questionDrafts = useQuestionDrafts(existingPost?.detail.questions);
  const [previewOpen, setPreviewOpen] = useState(false);

  function handlePublish() {
    if (!title.trim()) {
      toast.error('제목을 입력해주세요');
      return;
    }
    if (!periodStart || !periodEnd) {
      toast.error('신청 기간을 입력해주세요');
      return;
    }
    if (periodEnd < periodStart) {
      toast.error('신청 종료일이 시작일보다 빠를 수 없어요');
      return;
    }

    const formattedStart = periodStart.replaceAll('-', '.');
    const formattedEnd = periodEnd.replaceAll('-', '.');
    const formQuestions = questionDrafts.questions.map(draftToQuestion);

    if (isEdit && existingPost) {
      updatePostMutation.mutate({
        id: existingPost.id,
        patch: {
          type: category,
          title: title.trim(),
          description: summary.trim(),
          periodStart: formattedStart,
          periodEnd: formattedEnd,
          detail: {
            ...existingPost.detail,
            intro: body,
            questions: formQuestions,
          },
        },
      });
    } else {
      addPostMutation.mutate({
        type: category,
        status: 'OPEN',
        title: title.trim(),
        description: summary.trim(),
        periodStart: formattedStart,
        periodEnd: formattedEnd,
        applicantCount: 0,
        detail: {
          author: 'WINK 운영진',
          createdAt: `${new Date().toISOString().slice(0, 10).replaceAll('-', '.')} 등록`,
          intro: body,
          process: [],
          recommend: [],
          questions: formQuestions,
        },
      });
    }

    toast.success(isEdit ? '신청글이 수정되었어요' : '신청글이 등록되었어요');
    navigate('/admin/apply-posts');
  }

  return (
    <>
      <AdminBreadcrumb page={isEdit ? '신청글 수정' : '신청글 작성'} />

      <div className="flex flex-col items-center pb-20">
        <div className="flex w-[880px] flex-col gap-9 pt-9">
          <h1 className="text-2xl font-bold">{isEdit ? '신청글 수정' : '신청글 작성'}</h1>

          <PostBasicInfoForm
            category={category}
            onCategoryChange={setCategory}
            title={title}
            onTitleChange={setTitle}
            summary={summary}
            onSummaryChange={setSummary}
            periodStart={periodStart}
            onPeriodStartChange={setPeriodStart}
            periodEnd={periodEnd}
            onPeriodEndChange={setPeriodEnd}
            body={body}
            onBodyChange={setBody}
          />

          <PostQuestionsEditor {...questionDrafts} />

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              className="h-13 w-30"
              onClick={() => navigate('/admin/apply-posts')}
            >
              취소
            </Button>
            <Button variant="outline" className="h-13 w-30" onClick={() => setPreviewOpen(true)}>
              미리보기
            </Button>
            <Button variant="wink" className="h-13 w-40" onClick={handlePublish}>
              게시하기
            </Button>
          </div>
        </div>

        <PostPreviewDialog
          open={previewOpen}
          onOpenChange={setPreviewOpen}
          title={title}
          questions={questionDrafts.questions}
        />
      </div>
    </>
  );
}
