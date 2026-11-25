import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { MainLayout } from '@/components/layout/MainLayout';
import AdminPostEditorPage from '@/pages/admin/AdminPostEditorPage';
import AdminPostListPage from '@/pages/admin/AdminPostListPage';
import AdminSubmissionsPage from '@/pages/admin/AdminSubmissionsPage';
import ApplyDetailPage from '@/pages/apply/ApplyDetailPage';
import ApplyFormPage from '@/pages/apply/ApplyFormPage';
import ApplyListPage from '@/pages/apply/ApplyListPage';
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
