import { createContext, useContext, useEffect, useState, type FC, type PropsWithChildren } from 'react';

const TEXT_SCALES = [1, 1.15, 1.3, 1.5] as const;

type TextSizeContextValueType = {
	canDecrease: boolean;
	canIncrease: boolean;
	decrease: () => void;
	increase: () => void;
	reset: () => void;
};

const TextSizeContext = createContext<TextSizeContextValueType | undefined>(undefined);

const TextSizeProvider: FC<PropsWithChildren> = ({ children }) => {
	const [sizeIndex, setSizeIndex] = useState<number>(() => {
		if (typeof window === 'undefined') {
			return 0;
		}

		const storedIndex = Number(window.localStorage.getItem('text-size'));
		return Number.isInteger(storedIndex) && storedIndex >= 0 && storedIndex < TEXT_SCALES.length ? storedIndex : 0;
	});

	useEffect(() => {
		document.documentElement.style.setProperty('--text-scale', String(TEXT_SCALES[sizeIndex]));
		window.localStorage.setItem('text-size', String(sizeIndex));
	}, [sizeIndex]);

	return (
		<TextSizeContext.Provider
			value={{
				canDecrease: sizeIndex > 0,
				canIncrease: sizeIndex < TEXT_SCALES.length - 1,
				decrease: () => setSizeIndex((current) => Math.max(current - 1, 0)),
				increase: () => setSizeIndex((current) => Math.min(current + 1, TEXT_SCALES.length - 1)),
				reset: () => setSizeIndex(0),
			}}>
			{children}
		</TextSizeContext.Provider>
	);
};

const useTextSize = () => {
	const context = useContext(TextSizeContext);

	if (!context) {
		throw new Error('useTextSize must be used within a TextSizeProvider');
	}

	return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { TextSizeProvider, useTextSize };