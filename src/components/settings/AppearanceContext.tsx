
import React, { createContext, useContext, useState, useEffect } from 'react';

type FontSize = 'small' | 'medium' | 'large';
type ColorScheme = 'default' | 'purple' | 'green' | 'contrast';

interface AppearanceContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  animations: boolean;
  setAnimations: (enabled: boolean) => void;
}

const defaultContext: AppearanceContextType = {
  fontSize: 'medium',
  setFontSize: () => {},
  colorScheme: 'default',
  setColorScheme: () => {},
  animations: true,
  setAnimations: () => {},
};

const AppearanceContext = createContext<AppearanceContextType>(defaultContext);

export const useAppearance = () => useContext(AppearanceContext);

export const AppearanceProvider = ({ children }: { children: React.ReactNode }) => {
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [colorScheme, setColorScheme] = useState<ColorScheme>('default');
  const [animations, setAnimations] = useState<boolean>(true);

  // Apply font size to document
  useEffect(() => {
    document.body.classList.remove('text-size-small', 'text-size-medium', 'text-size-large');
    document.body.classList.add(`text-size-${fontSize}`);
  }, [fontSize]);

  // Apply color scheme to document
  useEffect(() => {
    document.documentElement.classList.remove('theme-purple', 'theme-green', 'theme-contrast');
    
    if (colorScheme !== 'default') {
      document.documentElement.classList.add(`theme-${colorScheme}`);
    }
  }, [colorScheme]);

  // Apply animations setting
  useEffect(() => {
    if (!animations) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }
  }, [animations]);

  return (
    <AppearanceContext.Provider 
      value={{ 
        fontSize, 
        setFontSize, 
        colorScheme, 
        setColorScheme, 
        animations, 
        setAnimations 
      }}
    >
      {children}
    </AppearanceContext.Provider>
  );
};
