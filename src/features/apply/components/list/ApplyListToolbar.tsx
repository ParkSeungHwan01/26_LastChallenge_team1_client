import { Switch } from '@/components/ui/switch';

interface ApplyListToolbarProps {
  isMyTab: boolean;
  count: number;
  recruitingOnly: boolean;
  onRecruitingOnlyChange: (checked: boolean) => void;
}

export function ApplyListToolbar({
  isMyTab,
  count,
  recruitingOnly,
  onRecruitingOnlyChange,
}: ApplyListToolbarProps) {
  return (
    <div className="mt-3 flex items-center justify-between">
      <p className="text-sm text-ink">
        {isMyTab ? (
          <>
            내 신청 <span className="font-semibold text-brand">{count}</span>건
          </>
        ) : (
          <>
            전체 <span className="font-semibold text-brand">{count}</span>개의 스터디·행사
          </>
        )}
      </p>
      {!isMyTab && (
        <label className="flex items-center gap-2 text-sm text-ink-soft">
          모집 중인 글만 보기
          <Switch checked={recruitingOnly} onCheckedChange={onRecruitingOnlyChange} />
        </label>
      )}
    </div>
  );
}
