import type { AuthUser } from '@/features/auth/auth-context';
import type { NavItemType } from './NavItem';

const DEFAULT_NAV_ITEMS: NavItemType[] = [
  {
    title: 'About Us',
    items: [
      { title: '동아리 소개', href: '#' },
      { title: '부원 목록', href: '#' },
    ],
  },
  {
    title: 'Program',
    items: [
      { title: '연혁', href: '#' },
      { title: '스터디', href: '#' },
      { title: '프로젝트', href: '#' },
      { title: '활동', href: '#' },
      { title: '신청', href: '/apply' },
    ],
  },
  {
    title: 'Recruit',
    href: '#',
  },
];

export function getMenuItems(user: AuthUser | null): NavItemType[] {
  return [
    ...DEFAULT_NAV_ITEMS,
    ...(user?.isAdmin ? [{ title: 'Admin', href: '/admin/apply-posts' }] : []),
  ];
}
