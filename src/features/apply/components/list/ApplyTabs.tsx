import { cn } from '@/lib/utils';

interface ApplyTabsProps {
  isMyTab: boolean;
  showMyTab: boolean;
  onChange: (tab: 'all' | 'my') => void;
}

export function ApplyTabs({ isMyTab, showMyTab, onChange }: ApplyTabsProps) {
  return (
    <div className="relative flex h-[50px] items-end gap-6 border-b border-hairline">
      <button
        type="button"
        onClick={() => onChange('all')}
        className={cn(
          'relative pb-2 text-[18px]',
          !isMyTab ? 'font-bold text-brand' : 'font-normal text-ink',
        )}
      >
        전체
        {!isMyTab && (
          <span className="absolute -bottom-px left-0 h-[3px] w-full rounded-[1px] bg-brand" />
        )}
      </button>
      {showMyTab && (
        <button
          type="button"
          onClick={() => onChange('my')}
          className={cn(
            'relative pb-2 text-[18px]',
            isMyTab ? 'font-bold text-brand' : 'font-normal text-ink',
          )}
        >
          MY 신청
          {isMyTab && (
            <span className="absolute -bottom-px left-0 h-[3px] w-full rounded-[1px] bg-brand" />
          )}
        </button>
      )}
    </div>
  );
}
