import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface NavLinkItem {
  title: string;
  href: string;
  badge?: string;
}

export interface NavGroupItem {
  title: string;
  items: NavLinkItem[];
}

export type NavItemType = NavLinkItem | NavGroupItem;

interface NavItemProps {
  item: NavItemType;
}

export function NavItem({ item }: NavItemProps) {
  const [isOpen, setOpen] = useState(false);

  if ('href' in item) {
    return (
      <Link to={item.href} onClick={() => setOpen(false)}>
        <Button variant="ghost" className="rounded-lg">
          {item.title}
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-lg">
          {item.title}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {item.items.map((subItem) => (
          <Link to={subItem.href} key={subItem.title} onClick={() => setOpen(false)}>
            <DropdownMenuItem className="flex items-center justify-between gap-4">
              {subItem.title}
              {subItem.badge && (
                <span className="rounded bg-brand px-1 py-0.5 text-[10px] font-medium text-white">
                  {subItem.badge}
                </span>
              )}
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
