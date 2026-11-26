import type { useQuestionDrafts } from '../../hooks/useQuestionDrafts';
import { QuestionEditorCard } from './QuestionEditorCard';

type QuestionDraftsState = ReturnType<typeof useQuestionDrafts>;

export function PostQuestionsEditor({
  questions,
  updateQuestion,
  moveQuestion,
  removeQuestion,
  addQuestion,
  updateOption,
  addOption,
  removeOption,
}: QuestionDraftsState) {
  return (
    <section className="flex flex-col gap-5 rounded-md border border-hairline p-8">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold">신청서 질문</h2>
          <p className="mt-1 text-sm text-ink-soft">
            부원이 신청할 때 답할 질문을 만들어요. 순서는 화살표로 바꿀 수 있어요.
          </p>
        </div>
        <span className="pt-1.5 text-sm text-ink-soft">질문 {questions.length}개</span>
      </div>

      {questions.map((question, index) => (
        <QuestionEditorCard
          key={question.draftKey}
          question={question}
          index={index}
          isFirst={index === 0}
          isLast={index === questions.length - 1}
          onMove={(direction) => moveQuestion(index, direction)}
          onUpdate={(patch) => updateQuestion(question.draftKey, patch)}
          onRemove={() => removeQuestion(question.draftKey)}
          onUpdateOption={(optionIndex, value) =>
            updateOption(question.draftKey, optionIndex, value)
          }
          onAddOption={() => addOption(question.draftKey)}
          onRemoveOption={(optionIndex) => removeOption(question.draftKey, optionIndex)}
        />
      ))}

      <button
        type="button"
        onClick={addQuestion}
        className="h-14 rounded-md border border-dashed border-field-border text-sm font-medium text-ink-soft hover:border-brand hover:text-brand"
      >
        + 질문 추가
      </button>
    </section>
  );
}
