import { Link } from 'react-router-dom';
import { FolderCode, KeyRound, LogOut, UserIcon, UserPen } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/features/auth/useAuth';
import winkLogo from '@/assets/wink-logo.png';
import { getMenuItems } from './header-items';
import { NavItem } from './NavItem';

function notImplemented() {
  toast('준비 중인 기능이에요');
}

export function Header() {
  const { user, login, logout } = useAuth();
  const menuItems = getMenuItems(user);

  return (
    <header className="fixed top-0 z-50 flex h-14 w-full items-center justify-between bg-white px-4 shadow sm:px-8">
      <Link to="/apply">
        <img src={winkLogo} alt="WINK" className="h-[19.5px] w-12 sm:h-[26px] sm:w-16" />
      </Link>

      <nav className="hidden items-center gap-2 sm:flex">
        {menuItems.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 rounded-lg">
                <Avatar className="size-8">
                  <AvatarImage alt="avatar" />
                  <AvatarFallback>
                    <UserIcon size={16} />
                  </AvatarFallback>
                </Avatar>
                <span>{user.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={notImplemented}>
                  <UserPen />내 정보 수정
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={notImplemented}>
                  <KeyRound />내 비밀번호 변경
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={notImplemented}>
                  <FolderCode />내 애플리케이션
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onSelect={() => {
                    logout();
                    toast.success('로그아웃되었습니다.');
                  }}
                >
                  <LogOut />
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="ghost" className="rounded-lg" onClick={login}>
            Login
          </Button>
        )}
      </nav>
    </header>
  );
}
