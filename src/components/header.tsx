import TreeIcon from '@/assets/img/tree-icon.png';
import { ChevronDown, Globe2, Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

type NavLinkType = {
	to: string;
	label: string;
};

const NAV_LINKS: NavLinkType[] = [
	{ to: '/', label: 'Home' },
	{ to: '/explore', label: 'Explore' },
	{ to: '/animals', label: 'Animals' },
	{ to: '/trees', label: 'Trees' },
	{ to: '/visit', label: 'Visit' },
	{ to: '/kids', label: 'Kids' },
	{ to: '/about', label: 'About' },
];

const LANGUAGES = [
	{ label: 'English', code: 'en' },
	{ label: 'Français', code: 'fr' },
	{ label: "Mi'kmaq", code: 'mic' },
] as const;

const Header = () => {
	const languageMenuRef = useRef<HTMLDivElement>(null);

	const [language, setLanguage] = useState<(typeof LANGUAGES)[number]['label']>('English');
	const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState<boolean>(false);
	const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
	const [isMuted, setIsMuted] = useState<boolean>(false);

	const selectLanguage = (selectedLanguage: (typeof LANGUAGES)[number]) => {
		setLanguage(selectedLanguage.label);
		setIsLanguageMenuOpen(false);
	};

	useEffect(() => {
		document.documentElement.classList.toggle('dark', isDarkMode);
	}, [isDarkMode]);

	useEffect(() => {
		const selectedLanguage = LANGUAGES.find((option) => option.label === language);
		document.documentElement.lang = selectedLanguage?.code ?? 'en';
	}, [language]);

	useEffect(() => {
		const closeLanguageMenu = (event: MouseEvent) => {
			if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
				setIsLanguageMenuOpen(false);
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsLanguageMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', closeLanguageMenu);
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('mousedown', closeLanguageMenu);
			document.removeEventListener('keydown', handleEscape);
		};
	}, []);

	return (
		<header className='z-50 h-20 w-full flex flex-wrap md:flex-nowrap md:justify-start border-b-2 border-forest-800 bg-cream-300'>
			<nav className='relative w-full max-w-340 mx-auto py-2 px-4 sm:px-6 lg:px-8 md:flex md:items-center md:justify-between md:gap-3'>
				<div className='flex items-center justify-between gap-x-1'>
					<Link to='/' className='select-none flex flex-row items-center justify-start gap-2 shrink-0' aria-label='Woodland Conservation Area'>
						<img className='h-auto w-14 shrink-0' src={TreeIcon} alt='Tree' />

						<div className='flex flex-col items-start justify-center'>
							<span className='font-semibold text-xl! text-forest-800 nunito'>Woodland Conservation Area</span>
							<p className='-mt-1 font-medium text-sm! text-neutral-600 nunito'>St. Margaret's Bay, Nova Scotia</p>
						</div>
					</Link>

					<button
						type='button'
						className='hs-collapse-toggle md:hidden relative size-9 flex justify-center items-center font-medium text-sm rounded-lg bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-neutral-700 focus:outline-hidden focus:bg-gray-50 dark:focus:bg-neutral-700 disabled:opacity-50 disabled:pointer-events-none'
						id='hs-header-base-collapse'
						aria-expanded='false'
						aria-controls='hs-header-base'
						aria-label='Toggle navigation'
						data-hs-collapse='#hs-header-base'>
						<svg className='hs-collapse-open:hidden size-4' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
							<line x1='3' x2='21' y1='6' y2='6' />
							<line x1='3' x2='21' y1='12' y2='12' />
							<line x1='3' x2='21' y1='18' y2='18' />
						</svg>
						<svg className='hs-collapse-open:block shrink-0 hidden size-4' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
							<path d='M18 6 6 18' />
							<path d='m6 6 12 12' />
						</svg>
						<span className='sr-only'>Toggle navigation</span>
					</button>
				</div>

				<div className='py-2 md:py-0 flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1'>
					<div className='flex flex-col md:flex-row md:items-center md:justify-end gap-0.5 md:gap-1'>
						{NAV_LINKS?.map((navLink: NavLinkType, idx: number) => {
							return (
								<NavLink key={idx} to={navLink?.to} className='nav-link min-h-10'>
									{navLink?.label}
								</NavLink>
							);
						})}
					</div>

					<div className='my-2 md:my-0 md:ml-2 md:mr-4'>
						<div className='select-none h-px md:h-4 w-full md:border-s border-forest-800'></div>
					</div>

					<div className='flex flex-wrap items-center justify-end gap-2'>
						<div ref={languageMenuRef} className='relative'>
							<button
								type='button'
								onClick={() => setIsLanguageMenuOpen((current) => !current)}
								className='min-h-10 px-3 py-1.5 inline-flex items-center justify-center gap-2 rounded-lg border-2 border-forest-800 font-semibold text-sm text-forest-800 hover:text-forest-800 focus:text-forest-800 active:text-forest-800 bg-neutral-warm hover:bg-neutral-warm/90 focus:bg-neutral-warm/90 active:bg-neutral-warm/90'
								aria-label='Select language'
								aria-haspopup='listbox'
								aria-expanded={isLanguageMenuOpen}>
								<Globe2 className='size-5 shrink-0' />
								{language}
								<motion.span animate={{ rotate: isLanguageMenuOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
									<ChevronDown className='size-4 stroke-3 shrink-0' />
								</motion.span>
							</button>

							<AnimatePresence>
								{isLanguageMenuOpen && (
									<motion.div role='listbox' aria-label='Available languages' className='absolute right-0 z-50 mt-2 min-w-40 overflow-hidden rounded-xl border border-forest-800/15 bg-cream-50 p-1 shadow-xl' initial={{ opacity: 0, y: -8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.96 }} transition={{ duration: 0.15 }}>
										{LANGUAGES.map((option) => (
											<button key={option.code} type='button' role='option' aria-selected={language === option.label} onClick={() => selectLanguage(option)} className='flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold text-forest-800 hover:bg-cream-200'>
												{option.label}
												{language === option.label && <span aria-hidden='true'>✓</span>}
											</button>
										))}
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						<motion.button type='button' onClick={() => setIsDarkMode((current) => !current)} aria-label={isDarkMode ? 'Use light theme' : 'Use dark theme'} aria-pressed={isDarkMode} className='btn btn-primary btn-icon min-h-10' whileTap={{ scale: 0.9 }}>
							<motion.span animate={{ rotate: isDarkMode ? 0 : 180 }} transition={{ duration: 0.3 }}>
								{isDarkMode ? <Moon className='size-5 shrink-0 text-white/70' /> : <Sun className='size-5 shrink-0 text-yellow-500' />}
							</motion.span>
							<span className='sr-only'>{isDarkMode ? 'Light theme' : 'Dark theme'}</span>
						</motion.button>

						<motion.button type='button' onClick={() => setIsMuted((current) => !current)} aria-label={isMuted ? 'Unmute audio' : 'Mute audio'} aria-pressed={isMuted} className='btn btn-primary btn-icon min-h-10' whileTap={{ scale: 0.9 }}>
							<motion.span animate={{ rotate: isMuted ? 0 : 360 }} transition={{ duration: 0.3 }}>
								{isMuted ? <VolumeX className='size-5 shrink-0' /> : <Volume2 className='size-5 shrink-0' />}
							</motion.span>
							<span className='sr-only'>{isMuted ? 'Unmute audio' : 'Mute audio'}</span>
						</motion.button>
					</div>
				</div>
			</nav>
		</header>
	);
};

export { Header };
