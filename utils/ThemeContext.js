import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load theme preference from storage on app start
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme !== null) {
          setIsDarkMode(savedTheme === 'dark');
        } else {
          // Use system preference as default
          const systemColorScheme = Appearance.getColorScheme();
          setIsDarkMode(systemColorScheme === 'dark');
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
        // Fallback to system preference
        const systemColorScheme = Appearance.getColorScheme();
        setIsDarkMode(systemColorScheme === 'dark');
      } finally {
        setIsLoading(false);
      }
    };

    loadThemePreference();
  }, []);

  // Save theme preference when it changes
  const toggleTheme = async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    try {
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  // Theme colors
  const theme = {
    isDark: isDarkMode,
    colors: {
      // Background colors
      background: isDarkMode ? '#0f172a' : '#ffffff',
      surface: isDarkMode ? '#1e293b' : '#f8fafc',
      surfaceSecondary: isDarkMode ? '#334155' : '#e2e8f0',

      // Text colors
      text: isDarkMode ? '#f1f5f9' : '#1e293b',
      textSecondary: isDarkMode ? '#94a3b8' : '#64748b',
      textMuted: isDarkMode ? '#64748b' : '#94a3b8',

      // Primary colors (blue gradient theme)
      primary: isDarkMode ? '#3b82f6' : '#1e40af',
      primaryLight: isDarkMode ? '#60a5fa' : '#3b82f6',
      primaryDark: isDarkMode ? '#1e40af' : '#1e3a8a',

      // Status colors
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',

      // Border colors
      border: isDarkMode ? '#334155' : '#e2e8f0',
      borderLight: isDarkMode ? '#475569' : '#cbd5e1',

      // Input colors
      inputBackground: isDarkMode ? '#1e293b' : '#ffffff',
      inputBorder: isDarkMode ? '#475569' : '#cbd5e1',
      inputPlaceholder: isDarkMode ? '#64748b' : '#94a3b8',

      // Modal colors
      modalBackground: isDarkMode ? '#1e293b' : '#ffffff',
      modalOverlay: 'rgba(0, 0, 0, 0.6)',

      // Card colors
      cardBackground: isDarkMode ? '#1e293b' : '#ffffff',
      cardBorder: isDarkMode ? '#334155' : '#e2e8f0',

      // Status badge colors
      statusGreen: '#10b981',
      statusYellow: '#f59e0b',
      statusRed: '#ef4444',

      // Gradient colors
      gradientStart: isDarkMode ? '#1e3a8a' : '#0d47a1',
      gradientMiddle: isDarkMode ? '#1e40af' : '#1565C0',
      gradientEnd: isDarkMode ? '#3b82f6' : '#1e88e5',
    },

    // Spacing and sizing
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48,
    },

    // Border radius
    borderRadius: {
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
      full: 9999,
    },

    // Font sizes
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
    },

    // Font weights
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },

    // Shadows
    shadow: {
      sm: {
        shadowColor: isDarkMode ? '#000' : '#64748b',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: isDarkMode ? 0.3 : 0.1,
        shadowRadius: 2,
        elevation: 2,
      },
      md: {
        shadowColor: isDarkMode ? '#000' : '#64748b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDarkMode ? 0.4 : 0.15,
        shadowRadius: 4,
        elevation: 4,
      },
      lg: {
        shadowColor: isDarkMode ? '#000' : '#64748b',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDarkMode ? 0.5 : 0.2,
        shadowRadius: 8,
        elevation: 8,
      },
    },
  };

  if (isLoading) {
    return null; // Or a loading screen
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};