interface SubmissionStatsProps {
  total: number;
  submitted: number;
  completed: number;
}

export function SubmissionStats({ total, submitted, completed }: SubmissionStatsProps) {
  return (
    <div className="mt-8 flex divide-x divide-border rounded-md border border-border">
      <StatCard label="전체 제출" value={total} />
      <StatCard label="제출됨" value={submitted} />
      <StatCard label="참여 완료" value={completed} />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-1 flex-col gap-1 p-6">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-3xl font-bold">{value}명</span>
    </div>
  );
}
