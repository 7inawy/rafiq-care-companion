
import React from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Child {
  id: string;
  name: string;
  age: string;
  avatar?: string;
}

interface ChildSelectorProps {
  selectedChild: Child;
  children: Child[];
  onChildSelect: (child: Child) => void;
  onAddChild: () => void;
}

const ChildSelector: React.FC<ChildSelectorProps> = ({
  selectedChild,
  children,
  onChildSelect,
  onAddChild
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-3 p-3 h-auto">
          <Avatar className="h-10 w-10">
            <AvatarImage src={selectedChild.avatar} alt={selectedChild.name} />
            <AvatarFallback className="bg-secondary/20 text-secondary">
              {selectedChild.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="text-right">
            <p className="font-semibold text-gray-900">{selectedChild.name}</p>
            <p className="text-sm text-gray-500">{selectedChild.age}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500 mr-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {children.map((child) => (
          <DropdownMenuItem
            key={child.id}
            onClick={() => onChildSelect(child)}
            className="flex items-center gap-3 p-3"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={child.avatar} alt={child.name} />
              <AvatarFallback className="bg-secondary/20 text-secondary text-sm">
                {child.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-right">
              <p className="font-medium">{child.name}</p>
              <p className="text-xs text-gray-500">{child.age}</p>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onAddChild} className="flex items-center gap-3 p-3 text-primary">
          <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Plus className="h-4 w-4" />
          </div>
          <span>إضافة طفل جديد</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChildSelector;
