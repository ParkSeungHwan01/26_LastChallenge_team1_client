import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FormRowProps {
  label: string;
  required?: boolean;
  align?: 'center' | 'start';
  children: ReactNode;
}

export function FormRow({ label, required, align = 'center', children }: FormRowProps) {
  return (
    <div className={cn('flex gap-6', align === 'center' ? 'items-center' : 'items-start')}>
      <div
        className={cn(
          'flex w-25 shrink-0 gap-1 text-sm text-ink',
          align === 'start' && 'pt-2.5',
        )}
      >
        {label}
        {required && <span className="text-danger">*</span>}
      </div>
      {children}
    </div>
  );
}
