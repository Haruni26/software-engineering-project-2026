import type { ThemeContextValueType, ThemeType } from '@/types';
import { createContext, useContext, useEffect, useState, type FC, type PropsWithChildren } from 'react';

const ThemeContext = createContext<ThemeContextValueType | undefined>(undefined);

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
	const [theme, setTheme] = useState<ThemeType>(() => {
		if (typeof window === 'undefined') {
			return 'system';
		}

		const storedTheme = window.localStorage.getItem('theme');
		return storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system' ? storedTheme : 'system';
	});

	const [isSystemDarkMode, setIsSystemDarkMode] = useState<boolean>(() => typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

	const cycleTheme = () => {
		setTheme((current) => (current === 'system' ? 'light' : current === 'light' ? 'dark' : 'system'));
	};

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = (event: MediaQueryListEvent) => setIsSystemDarkMode(event.matches);

		mediaQuery.addEventListener('change', handleChange);

		return () => mediaQuery.removeEventListener('change', handleChange);
	}, []);

	useEffect(() => {
		const isDarkMode = theme === 'dark' || (theme === 'system' && isSystemDarkMode);
		document.documentElement.classList.toggle('dark', isDarkMode);
		window.localStorage.setItem('theme', theme);
	}, [isSystemDarkMode, theme]);

	return (
		<ThemeContext.Provider
			value={{
				theme,
				isDarkMode: theme === 'dark' || (theme === 'system' && isSystemDarkMode),
				cycleTheme,
			}}>
			{children}
		</ThemeContext.Provider>
	);
};

const useTheme = () => {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}

	return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ThemeProvider, useTheme };
