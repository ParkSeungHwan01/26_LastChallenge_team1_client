import type { ApplyFormQuestion, ApplyFormQuestionType } from '../../types';

export type UiQuestionType = 'CHOICE' | 'SHORT_TEXT' | 'LONG_TEXT';

export interface OptionDraft {
  id: number | null; // 기존 선택지면 실제 id, 새로 추가한 선택지면 null
  content: string;
}

export interface QuestionDraft {
  draftKey: string; // 화면에서만 쓰는 key (React key / 수정 대상 식별)
  id: number | null; // 기존 질문이면 실제 id, 새로 추가한 질문이면 null
  uiType: UiQuestionType;
  allowMultiple: boolean;
  title: string;
  description: string;
  options: OptionDraft[];
}

export const UI_TYPE_LABEL: Record<UiQuestionType, string> = {
  CHOICE: '객관식',
  SHORT_TEXT: '단답형',
  LONG_TEXT: '장문형',
};

let draftKeyCounter = 0;
function createDraftKey() {
  draftKeyCounter += 1;
  return `draft-${draftKeyCounter}`;
}

function toUiType(type: ApplyFormQuestionType): UiQuestionType {
  if (type === 'SINGLE' || type === 'MULTI') return 'CHOICE';
  return type === 'SHORT' ? 'SHORT_TEXT' : 'LONG_TEXT';
}

export function questionToDraft(question: ApplyFormQuestion): QuestionDraft {
  return {
    draftKey: createDraftKey(),
    id: question.id,
    uiType: toUiType(question.type),
    allowMultiple: question.type === 'MULTI',
    title: question.content,
    description: question.description ?? '',
    options: question.options.map((option) => ({ id: option.id, content: option.content })),
  };
}

export function createEmptyDraft(): QuestionDraft {
  return {
    draftKey: createDraftKey(),
    id: null,
    uiType: 'CHOICE',
    allowMultiple: false,
    title: '',
    description: '',
    options: [
      { id: null, content: '' },
      { id: null, content: '' },
    ],
  };
}

function draftUiToType(draft: QuestionDraft): ApplyFormQuestionType {
  if (draft.uiType === 'SHORT_TEXT') return 'SHORT';
  if (draft.uiType === 'LONG_TEXT') return 'LONG';
  return draft.allowMultiple ? 'MULTI' : 'SINGLE';
}

// POST-01 작성 요청용 (선택지는 텍스트 배열만 받음)
export function draftToCreateQuestion(draft: QuestionDraft) {
  return {
    content: draft.title.trim(),
    description: draft.description.trim() || undefined,
    type: draftUiToType(draft),
    options:
      draft.uiType === 'CHOICE'
        ? draft.options.map((option) => option.content.trim()).filter(Boolean)
        : [],
  };
}

// POST-02 수정 요청용 (기존 id가 있으면 유지, 없으면 추가로 처리됨)
export function draftToUpdateQuestion(draft: QuestionDraft) {
  return {
    id: draft.id ?? undefined,
    content: draft.title.trim(),
    description: draft.description.trim() || undefined,
    type: draftUiToType(draft),
    options:
      draft.uiType === 'CHOICE'
        ? draft.options
            .map((option) => ({ id: option.id ?? undefined, content: option.content.trim() }))
            .filter((option) => option.content.length > 0)
        : [],
  };
}
