
import React from 'react';
import { Bell, Settings, ChevronDown, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  title: string;
  showProfile?: boolean;
  onBack?: () => void;
  onNotificationClick?: () => void;
  onSettingsClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showProfile = true,
  onBack,
  onNotificationClick,
  onSettingsClick 
}) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {onBack && (
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={onBack}
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Button>
        )}
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="sm"
          className="relative p-2"
          onClick={onNotificationClick}
        >
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </Button>

        {/* Settings */}
        <Button
          variant="ghost"
          size="sm"
          className="p-2"
          onClick={onSettingsClick}
        >
          <Settings className="h-5 w-5 text-gray-600" />
        </Button>

        {/* Profile Dropdown */}
        {showProfile && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/api/placeholder/32/32" alt="أم سارة" />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    س
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:block text-sm font-medium">أم سارة</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <span>الملف الشخصي</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>إعدادات الحساب</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>مركز المساعدة</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <span>تسجيل الخروج</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default Header;
