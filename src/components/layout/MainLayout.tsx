import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-14">
        <Outlet />
      </main>
    </div>
  );
}
