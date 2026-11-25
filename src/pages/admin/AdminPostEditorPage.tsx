import { useState, type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ChevronDown, ChevronUp, GripVertical, X } from 'lucide-react';
import { AdminBreadcrumb } from '@/components/layout/AdminBreadcrumb';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useApplyPosts } from '@/hooks/useApplyPosts';
import { cn } from '@/lib/utils';
import type { ApplyFormQuestion, ApplyPostType } from '@/types/apply';

type UiQuestionType = 'CHOICE' | 'SHORT_TEXT' | 'LONG_TEXT';

interface QuestionDraft {
  id: string;
  uiType: UiQuestionType;
  allowMultiple: boolean;
  title: string;
  description: string;
  options: string[];
}

const UI_TYPE_LABEL: Record<UiQuestionType, string> = {
  CHOICE: '객관식',
  SHORT_TEXT: '단답형',
  LONG_TEXT: '장문형',
};

let draftIdCounter = 0;
function createDraftId() {
  draftIdCounter += 1;
  return `draft-${draftIdCounter}`;
}

function questionToDraft(question: ApplyFormQuestion): QuestionDraft {
  return {
    id: createDraftId(),
    uiType: question.type === 'MULTIPLE_CHOICE' || question.type === 'SINGLE_CHOICE' ? 'CHOICE' : question.type,
    allowMultiple: question.type === 'MULTIPLE_CHOICE',
    title: question.title,
    description: question.description ?? '',
    options: question.options ?? [],
  };
}

function createEmptyDraft(): QuestionDraft {
  return {
    id: createDraftId(),
    uiType: 'CHOICE',
    allowMultiple: false,
    title: '',
    description: '',
    options: ['', ''],
  };
}

function draftToQuestion(draft: QuestionDraft): ApplyFormQuestion {
  const type: ApplyFormQuestion['type'] =
    draft.uiType === 'CHOICE' ? (draft.allowMultiple ? 'MULTIPLE_CHOICE' : 'SINGLE_CHOICE') : draft.uiType;

  return {
    id: draft.id,
    type,
    title: draft.title.trim(),
    description: draft.description.trim() || undefined,
    options:
      draft.uiType === 'CHOICE'
        ? draft.options.map((option) => option.trim()).filter(Boolean)
        : undefined,
  };
}

export default function AdminPostEditorPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { posts, addPost, updatePost } = useApplyPosts();
  const existingPost = postId ? posts.find((post) => post.id === Number(postId)) : undefined;
  const isEdit = Boolean(existingPost);

  const [category, setCategory] = useState<ApplyPostType>(existingPost?.type ?? 'STUDY');
  const [title, setTitle] = useState(existingPost?.title ?? '');
  const [summary, setSummary] = useState(existingPost?.description ?? '');
  const [periodStart, setPeriodStart] = useState(existingPost?.periodStart.replaceAll('.', '-') ?? '');
  const [periodEnd, setPeriodEnd] = useState(existingPost?.periodEnd.replaceAll('.', '-') ?? '');
  const [body, setBody] = useState(existingPost?.detail.intro ?? '');
  const [questions, setQuestions] = useState<QuestionDraft[]>(
    existingPost ? existingPost.detail.questions.map(questionToDraft) : [createEmptyDraft()],
  );
  const [previewOpen, setPreviewOpen] = useState(false);

  function updateQuestion(id: string, patch: Partial<QuestionDraft>) {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, ...patch } : q)));
  }

  function moveQuestion(index: number, direction: -1 | 1) {
    setQuestions((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function removeQuestion(id: string) {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  }

  function addQuestion() {
    setQuestions((prev) => [...prev, createEmptyDraft()]);
  }

  function updateOption(questionId: string, optionIndex: number, value: string) {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? { ...q, options: q.options.map((option, i) => (i === optionIndex ? value : option)) }
          : q,
      ),
    );
  }

  function addOption(questionId: string) {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, options: [...q.options, ''] } : q)),
    );
  }

  function removeOption(questionId: string, optionIndex: number) {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? { ...q, options: q.options.filter((_, i) => i !== optionIndex) }
          : q,
      ),
    );
  }

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
    const formQuestions = questions.map(draftToQuestion);

    if (isEdit && existingPost) {
      updatePost(existingPost.id, {
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
      });
    } else {
      const nextId = posts.reduce((max, post) => Math.max(max, post.id), 0) + 1;
      addPost({
        id: nextId,
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

        <section className="flex flex-col gap-5 rounded-md border border-[#e8e8e8] p-8">
          <h2 className="text-lg font-bold">기본 정보</h2>

          <FormRow label="구분" required>
            <div className="flex overflow-hidden rounded-md border border-[#d9dce1]">
              {(['STUDY', 'EVENT'] as ApplyPostType[]).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setCategory(value)}
                  className={cn(
                    'h-[46px] w-25 text-sm font-medium',
                    category === value ? 'bg-brand text-white' : 'bg-white text-[#333]',
                  )}
                >
                  {value === 'STUDY' ? '스터디' : '행사'}
                </button>
              ))}
            </div>
          </FormRow>

          <FormRow label="제목" required>
            <Input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="신청글 제목을 입력해주세요"
              className="h-[46px] max-w-[670px]"
            />
          </FormRow>

          <FormRow label="한 줄 소개">
            <Input
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
              placeholder="목록에 보일 짧은 소개를 입력해주세요"
              className="h-[46px] max-w-[670px]"
            />
          </FormRow>

          <FormRow label="신청 기간" required>
            <div className="flex max-w-[670px] items-center gap-2.5">
              <Input
                type="date"
                value={periodStart}
                onChange={(event) => setPeriodStart(event.target.value)}
                className="h-[46px] w-50"
              />
              <span className="text-[#7f7f7f]">~</span>
              <Input
                type="date"
                value={periodEnd}
                onChange={(event) => setPeriodEnd(event.target.value)}
                className="h-[46px] w-50"
              />
            </div>
          </FormRow>

          <FormRow label="본문" required align="start">
            <Textarea
              value={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder="스터디 소개, 진행 방식, 일정, 장소, 대상 등 부원에게 안내할 내용을 자유롭게 적어주세요."
              className="min-h-50 max-w-[670px]"
            />
          </FormRow>
        </section>

        <section className="flex flex-col gap-5 rounded-md border border-[#e8e8e8] p-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold">신청서 질문</h2>
              <p className="mt-1 text-sm text-[#7f7f7f]">
                부원이 신청할 때 답할 질문을 만들어요. 순서는 화살표로 바꿀 수 있어요.
              </p>
            </div>
            <span className="pt-1.5 text-sm text-[#7f7f7f]">질문 {questions.length}개</span>
          </div>

          {questions.map((question, index) => (
            <div key={question.id} className="flex gap-4">
              <div className="flex flex-col items-center gap-1 pt-6 text-[#a9aeb6]">
                <button
                  type="button"
                  onClick={() => moveQuestion(index, -1)}
                  disabled={index === 0}
                  className="disabled:opacity-30"
                >
                  <ChevronUp size={14} />
                </button>
                <GripVertical size={16} />
                <button
                  type="button"
                  onClick={() => moveQuestion(index, 1)}
                  disabled={index === questions.length - 1}
                  className="disabled:opacity-30"
                >
                  <ChevronDown size={14} />
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-3 rounded-md border border-[#e8e8e8] p-5">
                <div className="flex items-center gap-2">
                  <span className="pt-2 text-sm font-semibold text-brand">Q{index + 1}</span>
                  <Input
                    value={question.title}
                    onChange={(event) => updateQuestion(question.id, { title: event.target.value })}
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
                        onValueChange={(value) =>
                          updateQuestion(question.id, { uiType: value as UiQuestionType })
                        }
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
                  onChange={(event) =>
                    updateQuestion(question.id, { description: event.target.value })
                  }
                  placeholder="설명 (선택) · 질문 아래에 작게 보일 안내"
                  className="h-10"
                />

                {question.uiType === 'CHOICE' && (
                  <div className="flex flex-col gap-2">
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            'size-4 shrink-0 border border-[#c9ccd1]',
                            question.allowMultiple ? 'rounded-[4px]' : 'rounded-full',
                          )}
                        />
                        <Input
                          value={option}
                          onChange={(event) =>
                            updateOption(question.id, optionIndex, event.target.value)
                          }
                          placeholder={`선택지 ${optionIndex + 1}`}
                          className="h-10 flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => removeOption(question.id, optionIndex)}
                          className="text-[#a9aeb6] hover:text-[#333]"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addOption(question.id)}
                      className="self-start text-sm text-brand"
                    >
                      + 선택지 추가
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 border-t border-[#e8e8e8] pt-3">
                  {question.uiType === 'CHOICE' && (
                    <label className="flex items-center gap-2 text-sm text-[#333]">
                      여러 개 선택 허용
                      <Switch
                        checked={question.allowMultiple}
                        onCheckedChange={(checked) =>
                          updateQuestion(question.id, { allowMultiple: checked })
                        }
                      />
                    </label>
                  )}
                  <button
                    type="button"
                    onClick={() => removeQuestion(question.id)}
                    className="text-[#a9aeb6] hover:text-[#e5484d]"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addQuestion}
            className="h-14 rounded-md border border-dashed border-[#d9dce1] text-sm font-medium text-[#7f7f7f] hover:border-brand hover:text-brand"
          >
            + 질문 추가
          </button>
        </section>

        <div className="flex justify-end gap-3">
          <Button variant="outline" className="h-13 w-30" onClick={() => navigate('/admin/apply-posts')}>
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

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-[560px] gap-4">
          <DialogTitle className="text-xl font-bold">{title || '(제목 없음)'}</DialogTitle>
          <div className="flex max-h-[60vh] flex-col gap-4 overflow-y-auto">
            {questions.map((question, index) => (
              <div key={question.id} className="rounded-md border border-[#e8e8e8] p-4">
                <p className="text-sm font-bold">
                  <span className="mr-1.5 text-brand">Q{index + 1}.</span>
                  {question.title || '(질문 없음)'}
                </p>
                {question.description && (
                  <p className="mt-1 text-xs text-[#7f7f7f]">{question.description}</p>
                )}
                {question.uiType === 'CHOICE' && (
                  <ul className="mt-2 flex flex-col gap-1 text-sm text-[#333]">
                    {question.options.map((option, i) => (
                      <li key={i}>• {option || `선택지 ${i + 1}`}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </>
  );
}

function FormRow({
  label,
  required,
  align = 'center',
  children,
}: {
  label: string;
  required?: boolean;
  align?: 'center' | 'start';
  children: ReactNode;
}) {
  return (
    <div className={cn('flex gap-6', align === 'center' ? 'items-center' : 'items-start')}>
      <div className={cn('flex w-25 shrink-0 gap-1 text-sm text-[#333]', align === 'start' && 'pt-2.5')}>
        {label}
        {required && <span className="text-[#e5484d]">*</span>}
      </div>
      {children}
    </div>
  );
}
