interface ApplyEmptyStateProps {
  onShowAll: () => void;
}

export function ApplyEmptyState({ onShowAll }: ApplyEmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-28">
      <p className="text-[18px] font-bold text-ink">아직 신청한 스터디·행사가 없어요</p>
      <p className="text-sm text-ink-soft">전체 탭에서 모집 중인 신청글을 찾아보세요</p>
      <button
        type="button"
        onClick={onShowAll}
        className="mt-2 rounded-lg border border-brand px-5 py-2.5 text-sm font-medium text-brand"
      >
        전체 신청글 보기
      </button>
    </div>
  );
}
