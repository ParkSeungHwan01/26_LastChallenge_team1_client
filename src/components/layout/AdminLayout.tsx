import { Link, Navigate, Outlet } from 'react-router-dom';
import { ClipboardList, Ticket, User, UserCheck, Video } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/useAuth';
import { Header } from './Header';

const SIDE_ITEMS = [
  {
    group: '유저',
    items: [
      { title: '유저 목록', url: '#', icon: User },
      { title: '대기 유저 목록', url: '#', icon: UserCheck },
    ],
  },
  {
    group: '활동',
    items: [{ title: '활동 목록', url: '#', icon: Video }],
  },
  {
    group: '모집',
    items: [{ title: '모집 목록', url: '#', icon: Ticket }],
  },
  {
    group: '신청',
    items: [{ title: '신청글 목록', url: '/admin/apply-posts', icon: ClipboardList }],
  },
];

export function AdminLayout() {
  const { user } = useAuth();

  if (!user || !user.isAdmin) {
    return <Navigate to="/apply" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-14">
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              {SIDE_ITEMS.map(({ group, items }) => (
                <SidebarGroup key={group}>
                  <SidebarGroupLabel>{group}</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {items.map(({ title, url, icon: Icon }) => (
                        <SidebarMenuItem key={title}>
                          <SidebarMenuButton asChild>
                            <Link to={url}>
                              <Icon />
                              <span>{title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>
          </Sidebar>

          <div className="flex min-w-0 flex-1 flex-col gap-6 p-6">
            <Outlet />
          </div>
        </SidebarProvider>
      </main>
    </div>
  );
}
