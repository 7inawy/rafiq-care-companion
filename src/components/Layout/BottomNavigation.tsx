
import React from 'react';
import { Button } from '@/components/ui/button';

interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  isActive?: boolean;
}

interface BottomNavigationProps {
  items: NavigationItem[];
  onItemClick: (id: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ items, onItemClick }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around">
        {items.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={`flex-1 flex flex-col items-center gap-1 py-2 px-2 ${
              item.isActive 
                ? 'text-primary bg-primary/10' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => onItemClick(item.id)}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
