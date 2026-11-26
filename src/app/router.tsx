import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { MainLayout } from '@/components/layout/MainLayout';
import AdminPostEditorPage from '@/features/apply/pages/admin/AdminPostEditorPage';
import AdminPostListPage from '@/features/apply/pages/admin/AdminPostListPage';
import AdminSubmissionsPage from '@/features/apply/pages/admin/AdminSubmissionsPage';
import ApplyDetailPage from '@/features/apply/pages/ApplyDetailPage';
import ApplyFormPage from '@/features/apply/pages/ApplyFormPage';
import ApplyListPage from '@/features/apply/pages/ApplyListPage';
import NotFoundPage from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/apply" replace /> },
  {
    element: <MainLayout />,
    children: [
      { path: '/apply', element: <ApplyListPage /> }, // 01 / 01-E
      { path: '/apply/:postId', element: <ApplyDetailPage /> }, // 02
      { path: '/apply/:postId/form', element: <ApplyFormPage /> }, // 02-C
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      { path: '/admin/apply-posts', element: <AdminPostListPage /> }, // 05
      { path: '/admin/apply-posts/new', element: <AdminPostEditorPage /> }, // 06
      { path: '/admin/apply-posts/:postId/edit', element: <AdminPostEditorPage /> }, // 06
      { path: '/admin/apply-posts/:postId/submissions', element: <AdminSubmissionsPage /> }, // 07 / 07-B
    ],
  },
]);
