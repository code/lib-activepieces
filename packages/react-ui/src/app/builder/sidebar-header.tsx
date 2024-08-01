import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';

type SidebarHeaderProps = {
  children: React.ReactNode;
  onClose: () => void;
};
const SidebarHeader = ({ children, onClose }: SidebarHeaderProps) => {
  return (
    <div className="flex p-4 justify-center items-center">
      <div className="font-semibold text-lg">{children}</div>
      <div className="flex-grow"></div>
      <Button variant="ghost" size={'sm'} onClick={onClose}>
        <X size={16} />
      </Button>
    </div>
  );
};

export { SidebarHeader };