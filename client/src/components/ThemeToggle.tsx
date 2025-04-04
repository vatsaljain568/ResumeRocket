import React from 'react';
import { useTheme } from '../lib/ThemeContext';
import { Switch } from '@/components/ui/switch';
import { MoonIcon, SunIcon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleTheme}>
      <SunIcon className={`h-4 w-4 ${theme === 'light' ? 'text-primary' : 'text-gray-400'}`} />
      <Switch checked={theme === 'dark'} />
      <MoonIcon className={`h-4 w-4 ${theme === 'dark' ? 'text-primary' : 'text-gray-400'}`} />
    </div>
  );
}