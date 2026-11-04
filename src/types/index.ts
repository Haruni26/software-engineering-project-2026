import { type CSSProperties } from 'react';

type CardType = {
	title: string;
	desc: string;
	to: string;
	image: string;
};

type NavLinkType = {
	to: string;
	label: string;
};

type ThemeType = 'light' | 'dark' | 'system';

type ThemeContextValueType = {
	theme: ThemeType;
	isDarkMode: boolean;
	cycleTheme: () => void;
};

type TreeStyleType = CSSProperties & {
	'--tree-rotation': string;
};

type ButtonVariantType = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

type ButtonSizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon';

type ButtonRadiusType = 'md' | 'lg' | 'full';

export type { ButtonRadiusType, ButtonSizeType, ButtonVariantType, CardType, NavLinkType, ThemeContextValueType, ThemeType, TreeStyleType };
