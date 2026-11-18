import { useAudio, type LanguageType } from '@/contexts';
import { createContext, useContext, type PropsWithChildren } from 'react';

const english = {
	siteName: 'Woodland Conservation Area',
	location: "St. Margaret's Bay, Nova Scotia",
	home: 'Home',
	explore: 'Explore',
	animals: 'Animals',
	trees: 'Trees',
	visit: 'Visit',
	kids: 'Kids',
	about: 'About',
	navigation: 'Main navigation',
	openNavigation: 'Open navigation',
	closeNavigation: 'Close navigation',
	selectLanguage: 'Select language',
	availableLanguages: 'Available languages',
	mute: 'Mute audio',
	unmute: 'Unmute audio',
	systemTheme: 'Switch to system theme',
	lightTheme: 'Switch to light theme',
	darkTheme: 'Switch to dark theme',
};

type HeaderKeyType = keyof typeof english;

const headerTranslations: Record<LanguageType, Partial<Record<HeaderKeyType, string>>> = {
	en: english,
	fr: {
		siteName: 'Aire de conservation Woodland',
		location: 'Baie St. Margarets, Nouvelle-Écosse',
		home: 'Accueil',
		explore: 'Explorer',
		animals: 'Animaux',
		trees: 'Arbres',
		visit: 'Visiter',
		kids: 'Enfants',
		about: 'À propos',
		navigation: 'Navigation principale',
		openNavigation: 'Ouvrir la navigation',
		closeNavigation: 'Fermer la navigation',
		selectLanguage: 'Choisir la langue',
		availableLanguages: 'Langues disponibles',
		mute: 'Couper le son',
		unmute: 'Rétablir le son',
		systemTheme: 'Utiliser le thème du système',
		lightTheme: 'Activer le thème clair',
		darkTheme: 'Activer le thème sombre',
	},
	mic: {
		// Welcome is the label for the homepage.
		home: "Pjila'si",
		animals: 'Waisisk',
		trees: "Miti'sg",
		kids: "Mijua'ji'jk",
	},
};

interface TranslationContextValue {
	language: LanguageType;
	setLanguage: (language: LanguageType) => void;
	t: (key: HeaderKeyType) => string;
	textLanguage: (key: HeaderKeyType) => LanguageType;
}

const TranslationContext = createContext<TranslationContextValue | undefined>(undefined);

const TranslationProvider = ({ children }: PropsWithChildren) => {
	const { language, setLanguage } = useAudio();
	const messages = headerTranslations[language];

	return (
		<TranslationContext.Provider
			value={{
				language,
				setLanguage,
				t: (key) => messages[key] ?? english[key],
				textLanguage: (key) => (messages[key] ? language : 'en'),
			}}>
			{children}
		</TranslationContext.Provider>
	);
};

const useTranslation = () => {
	const context = useContext(TranslationContext);

	if (!context) {
		throw new Error('useTranslation must be used within a TranslationProvider');
	}

	return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { TranslationProvider, useTranslation };
