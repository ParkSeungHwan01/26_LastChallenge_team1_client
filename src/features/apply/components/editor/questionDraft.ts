import type { ApplyFormQuestion } from '../../types';

export type UiQuestionType = 'CHOICE' | 'SHORT_TEXT' | 'LONG_TEXT';

export interface QuestionDraft {
  id: string;
  uiType: UiQuestionType;
  allowMultiple: boolean;
  title: string;
  description: string;
  options: string[];
}

export const UI_TYPE_LABEL: Record<UiQuestionType, string> = {
  CHOICE: '객관식',
  SHORT_TEXT: '단답형',
  LONG_TEXT: '장문형',
};

let draftIdCounter = 0;
function createDraftId() {
  draftIdCounter += 1;
  return `draft-${draftIdCounter}`;
}

export function questionToDraft(question: ApplyFormQuestion): QuestionDraft {
  return {
    id: createDraftId(),
    uiType:
      question.type === 'MULTIPLE_CHOICE' || question.type === 'SINGLE_CHOICE'
        ? 'CHOICE'
        : question.type,
    allowMultiple: question.type === 'MULTIPLE_CHOICE',
    title: question.title,
    description: question.description ?? '',
    options: question.options ?? [],
  };
}

export function createEmptyDraft(): QuestionDraft {
  return {
    id: createDraftId(),
    uiType: 'CHOICE',
    allowMultiple: false,
    title: '',
    description: '',
    options: ['', ''],
  };
}

export function draftToQuestion(draft: QuestionDraft): ApplyFormQuestion {
  const type: ApplyFormQuestion['type'] =
    draft.uiType === 'CHOICE'
      ? draft.allowMultiple
        ? 'MULTIPLE_CHOICE'
        : 'SINGLE_CHOICE'
      : draft.uiType;

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
