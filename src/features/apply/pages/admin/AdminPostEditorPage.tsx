import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import {
  useAdminApplyPostQuery,
  useCreateApplyPostMutation,
  useUpdateApplyPostMutation,
} from '../../api/applyPosts.queries';
import { AdminBreadcrumb } from '../../components/AdminBreadcrumb';
import { draftToCreateQuestion, draftToUpdateQuestion } from '../../components/editor/questionDraft';
import { PostBasicInfoForm } from '../../components/editor/PostBasicInfoForm';
import { PostPreviewDialog } from '../../components/editor/PostPreviewDialog';
import { PostQuestionsEditor } from '../../components/editor/PostQuestionsEditor';
import { useQuestionDrafts } from '../../hooks/useQuestionDrafts';
import { Button } from '@/components/ui/button';
import { ApiError } from '@/lib/http';
import type { AdminPostDetail, ApplyPostType } from '../../types';

export default function AdminPostEditorPage() {
  const { postId } = useParams();
  const isEdit = Boolean(postId);
  const existingPostId = Number(postId);

  const { data: existingPost, isLoading } = useAdminApplyPostQuery(existingPostId, {
    enabled: isEdit,
  });

  if (isEdit && isLoading) {
    return <div className="p-10">불러오는 중이에요...</div>;
  }

  return (
    <PostEditorForm
      key={existingPost?.id ?? 'new'}
      isEdit={isEdit}
      existingPost={existingPost}
    />
  );
}

function PostEditorForm({
  isEdit,
  existingPost,
}: {
  isEdit: boolean;
  existingPost: AdminPostDetail | undefined;
}) {
  const navigate = useNavigate();
  const createPostMutation = useCreateApplyPostMutation();
  const updatePostMutation = useUpdateApplyPostMutation();

  const [category, setCategory] = useState<ApplyPostType>(existingPost?.type ?? 'STUDY');
  const [title, setTitle] = useState(existingPost?.title ?? '');
  const [summary, setSummary] = useState(existingPost?.summary ?? '');
  const [periodStart, setPeriodStart] = useState(existingPost?.startDate ?? '');
  const [periodEnd, setPeriodEnd] = useState(existingPost?.endDate ?? '');
  const [body, setBody] = useState(existingPost?.content ?? '');
  const questionDrafts = useQuestionDrafts(existingPost?.questions);
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
    if (!body.trim()) {
      toast.error('본문을 입력해주세요');
      return;
    }

    function handleSuccess() {
      toast.success(isEdit ? '신청글이 수정되었어요' : '신청글이 등록되었어요');
      navigate('/admin/apply-posts');
    }

    function handleError(error: unknown) {
      toast.error(error instanceof ApiError ? error.message : '저장에 실패했어요');
    }

    if (isEdit && existingPost) {
      updatePostMutation.mutate(
        {
          postId: existingPost.id,
          request: {
            type: existingPost.type,
            title: title.trim(),
            summary: summary.trim(),
            startDate: periodStart,
            endDate: periodEnd,
            content: body,
            questions: questionDrafts.questions.map(draftToUpdateQuestion),
          },
        },
        { onSuccess: handleSuccess, onError: handleError },
      );
    } else {
      createPostMutation.mutate(
        {
          type: category,
          title: title.trim(),
          summary: summary.trim(),
          startDate: periodStart,
          endDate: periodEnd,
          content: body,
          questions: questionDrafts.questions.map(draftToCreateQuestion),
        },
        { onSuccess: handleSuccess, onError: handleError },
      );
    }
  }

  const isSaving = createPostMutation.isPending || updatePostMutation.isPending;

  return (
    <>
      <AdminBreadcrumb page={isEdit ? '신청글 수정' : '신청글 작성'} />

      <div className="flex flex-col items-center pb-20">
        <div className="flex w-[880px] flex-col gap-9 pt-9">
          <h1 className="text-2xl font-bold">{isEdit ? '신청글 수정' : '신청글 작성'}</h1>

          <PostBasicInfoForm
            category={category}
            categoryLocked={isEdit}
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
            <Button variant="wink" className="h-13 w-40" disabled={isSaving} onClick={handlePublish}>
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
