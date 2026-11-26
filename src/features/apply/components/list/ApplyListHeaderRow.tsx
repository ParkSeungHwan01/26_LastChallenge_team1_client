interface ApplyListHeaderRowProps {
  isMyTab: boolean;
}

export function ApplyListHeaderRow({ isMyTab }: ApplyListHeaderRowProps) {
  return (
    <div className="mt-5 flex h-12 items-center border-t border-ink border-b border-hairline text-[13px] text-ink-soft">
      <span className="w-9 pl-4">번호</span>
      <span className="w-17">구분</span>
      <span className="flex-1">제목</span>
      <span className="w-40">{isMyTab ? '신청일' : '신청 기간'}</span>
      <span className="w-24 pr-4 text-right">{isMyTab ? '내 신청 상태' : '상태'}</span>
    </div>
  );
}
