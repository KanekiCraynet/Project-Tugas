import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Zap } from 'lucide-react';

interface ThemeSelectorProps {
  currentTheme: 'light' | 'dark' | 'neon';
  onThemeChange: (theme: 'light' | 'dark' | 'neon') => void;
}

const themes = [
  {
    id: 'dark' as const,
    name: 'Dark',
    icon: Moon,
    gradient: 'from-slate-800 to-slate-900',
    description: 'Tema gelap yang nyaman untuk mata'
  },
  {
    id: 'light' as const,
    name: 'Light',
    icon: Sun,
    gradient: 'from-blue-50 to-indigo-100',
    description: 'Tema terang yang bersih'
  },
  {
    id: 'neon' as const,
    name: 'Neon',
    icon: Zap,
    gradient: 'from-purple-900 via-pink-900 to-red-900',
    description: 'Tema neon yang futuristik'
  }
];

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange
}) => {
  return (
    <div className="flex items-center space-x-2">
      {themes.map((theme) => {
        const Icon = theme.icon;
        const isActive = currentTheme === theme.id;
        
        return (
          <motion.button
            key={theme.id}
            className={`relative p-2 rounded-lg transition-all duration-300 ${
              isActive 
                ? 'bg-white/20 shadow-lg' 
                : 'bg-white/10 hover:bg-white/15'
            }`}
            onClick={() => onThemeChange(theme.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={theme.description}
          >
            <Icon 
              className={`w-4 h-4 transition-colors ${
                isActive ? 'text-white' : 'text-gray-400'
              }`} 
            />
            
            {/* Active indicator */}
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-lg border-2 border-blue-400"
                layoutId="activeTheme"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            
            {/* Glow effect for active theme */}
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-lg opacity-50"
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(59, 130, 246, 0.4)',
                    '0 0 10px rgba(59, 130, 246, 0.6)',
                    '0 0 0px rgba(59, 130, 246, 0.4)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};
