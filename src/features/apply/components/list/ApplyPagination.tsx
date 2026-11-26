import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ApplyPaginationProps {
  page: number; // 0-indexed
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ApplyPagination({ page, totalPages, onPageChange }: ApplyPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        type="button"
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
        className="flex size-10 items-center justify-center rounded-md text-muted-foreground disabled:opacity-40"
      >
        <ChevronLeft size={16} />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange(p)}
          className={cn(
            'flex size-10 items-center justify-center rounded-md text-sm font-semibold',
            p === page ? 'bg-brand text-white' : 'text-ink-soft',
          )}
        >
          {p + 1}
        </button>
      ))}
      <button
        type="button"
        disabled={page >= totalPages - 1}
        onClick={() => onPageChange(page + 1)}
        className="flex size-10 items-center justify-center rounded-md text-muted-foreground disabled:opacity-40"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
