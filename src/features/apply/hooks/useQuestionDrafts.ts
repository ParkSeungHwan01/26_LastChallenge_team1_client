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
