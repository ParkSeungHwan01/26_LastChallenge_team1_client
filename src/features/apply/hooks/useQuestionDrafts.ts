import { useState } from 'react';
import {
  createEmptyDraft,
  questionToDraft,
  type QuestionDraft,
} from '../components/editor/questionDraft';
import type { ApplyFormQuestion } from '../types';

export function useQuestionDrafts(initialQuestions?: ApplyFormQuestion[]) {
  const [questions, setQuestions] = useState<QuestionDraft[]>(
    initialQuestions && initialQuestions.length > 0
      ? initialQuestions.map(questionToDraft)
      : [createEmptyDraft()],
  );

  function updateQuestion(draftKey: string, patch: Partial<QuestionDraft>) {
    setQuestions((prev) => prev.map((q) => (q.draftKey === draftKey ? { ...q, ...patch } : q)));
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

  function removeQuestion(draftKey: string) {
    setQuestions((prev) => prev.filter((q) => q.draftKey !== draftKey));
  }

  function addQuestion() {
    setQuestions((prev) => [...prev, createEmptyDraft()]);
  }

  function updateOption(draftKey: string, optionIndex: number, value: string) {
    setQuestions((prev) =>
      prev.map((q) =>
        q.draftKey === draftKey
          ? {
              ...q,
              options: q.options.map((option, i) =>
                i === optionIndex ? { ...option, content: value } : option,
              ),
            }
          : q,
      ),
    );
  }

  function addOption(draftKey: string) {
    setQuestions((prev) =>
      prev.map((q) =>
        q.draftKey === draftKey ? { ...q, options: [...q.options, { id: null, content: '' }] } : q,
      ),
    );
  }

  function removeOption(draftKey: string, optionIndex: number) {
    setQuestions((prev) =>
      prev.map((q) =>
        q.draftKey === draftKey
          ? { ...q, options: q.options.filter((_, i) => i !== optionIndex) }
          : q,
      ),
    );
  }

  return {
    questions,
    updateQuestion,
    moveQuestion,
    removeQuestion,
    addQuestion,
    updateOption,
    addOption,
    removeOption,
  };
}
