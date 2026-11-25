import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <p className="text-sm font-semibold text-brand">404</p>
      <h1 className="text-2xl font-bold">페이지를 찾을 수 없어요</h1>
      <p className="text-sm text-muted-foreground">주소를 다시 확인해주세요.</p>
      <Link to="/apply" className="mt-2 rounded-lg border border-brand px-5 py-2.5 text-sm font-medium text-brand">
        신청 목록으로
      </Link>
    </div>
  );
}
