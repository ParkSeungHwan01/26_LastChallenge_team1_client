import { ChevronLeft, ChevronRight } from 'lucide-react';

export function ApplyPagination() {
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        type="button"
        disabled
        className="flex size-10 items-center justify-center rounded-md text-muted-foreground"
      >
        <ChevronLeft size={16} />
      </button>
      <span className="flex size-10 items-center justify-center rounded-md bg-brand text-sm font-semibold text-white">
        1
      </span>
      <button
        type="button"
        disabled
        className="flex size-10 items-center justify-center rounded-md text-muted-foreground"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
