import TreeIcon from '@/assets/img/tree-icon.png';
import { useTheme } from '@/context/theme-context';
import { cn } from '@/lib';
import { ChevronDown, Globe2, Moon, Sun, SunMoon, Volume2, VolumeX } from 'lucide-react';
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
	const { cycleTheme, isDarkMode, theme } = useTheme();
	const languageMenuRef = useRef<HTMLDivElement>(null);

	const [language, setLanguage] = useState<(typeof LANGUAGES)[number]['label']>('English');
	const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState<boolean>(false);
	const [isMuted, setIsMuted] = useState<boolean>(false);
	const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

	const selectLanguage = (selectedLanguage: (typeof LANGUAGES)[number]) => {
		setLanguage(selectedLanguage.label);
		setIsLanguageMenuOpen(false);
	};

	useEffect(() => {
		document.body.style.overflow = isNavOpen ? 'hidden' : '';

		return () => {
			document.body.style.overflow = '';
		};
	}, [isNavOpen]);

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
		<header className={cn('fixed top-0 z-50 w-full flex flex-wrap md:min-h-22 md:flex-nowrap items-start md:items-center md:justify-start shrink-0 border-b-2 border-forest-800 dark:border-cream-300 bg-cream-300 dark:bg-forest-800', isNavOpen ? 'min-h-dvh overflow-hidden' : 'h-22')}>
			<nav className={cn('relative h-22 w-full max-w-340 md:min-h-22 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between md:gap-3', isNavOpen && 'min-h-dvh overflow-hidden')}>
				<div className='h-22 w-full flex items-center justify-between gap-x-1'>
					<Link to='/' className='select-none flex flex-row items-center justify-start gap-2 shrink-0' aria-label='Woodland Conservation Area'>
						<img className='h-auto w-14 shrink-0' src={TreeIcon} alt='Tree' />

						<div className='flex flex-col items-start justify-center'>
							<span className='font-semibold text-xl! text-forest-800 dark:text-cream-300 nunito'>Woodland Conservation Area</span>
							<p className='-mt-1 font-medium text-sm! text-neutral-600 dark:text-neutral-200 nunito'>St. Margaret's Bay, Nova Scotia</p>
						</div>
					</Link>

					<button
						type='button'
						onClick={() => setIsNavOpen((current) => !current)}
						className='md:hidden relative size-10 flex justify-center items-center rounded-xl bg-forest-800 text-white hover:bg-forest-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-800'
						aria-expanded={isNavOpen}
						aria-controls='site-navigation'
						aria-label={isNavOpen ? 'Close navigation' : 'Open navigation'}>
						<svg className='size-6' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
							<motion.line animate={{ x1: isNavOpen ? 6 : 3, x2: isNavOpen ? 18 : 21, y1: isNavOpen ? 6 : 6, y2: isNavOpen ? 18 : 6 }} transition={{ duration: 0.25 }} />
							<motion.line animate={{ opacity: isNavOpen ? 0 : 1, x1: 3, x2: 21, y1: 12, y2: 12 }} transition={{ duration: 0.15 }} />
							<motion.line animate={{ x1: isNavOpen ? 6 : 3, x2: isNavOpen ? 18 : 21, y1: isNavOpen ? 18 : 18, y2: isNavOpen ? 6 : 18 }} transition={{ duration: 0.25 }} />
						</svg>

						<span className='sr-only'>Toggle navigation</span>
					</button>
				</div>

				<div id='site-navigation' className={cn('min-h-[calc(100dvh-5.5rem)] w-full md:w-auto py-2 md:py-0 md:flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1', isNavOpen ? 'flex' : 'hidden')}>
					<div className='flex w-full flex-1 flex-col justify-start gap-0.5 md:w-auto md:flex-none md:flex-row md:items-center md:justify-end md:gap-1'>
						{NAV_LINKS?.map((navLink: NavLinkType, idx: number) => {
							return (
								<NavLink key={idx} to={navLink?.to} className={({ isActive }) => cn('nav-link relative', isActive && 'active')}>
									{({ isActive }) => (
										<>
											{isActive && <motion.span layoutId='active-nav-link' className='absolute inset-0 rounded-xl bg-forest-700 dark:bg-cream-300' transition={{ type: 'spring', stiffness: 500, damping: 35 }} />}
											<span className='relative z-10'>{navLink?.label}</span>
										</>
									)}
								</NavLink>
							);
						})}
					</div>

					<div className='my-2 md:my-0 md:ml-2 md:mr-4'>
						<div className='select-none h-px md:h-4 w-full md:border-s border-forest-800'></div>
					</div>

					<div className='w-full md:w-auto mb-10 md:mb-0 md:mt-0 flex items-center justify-between md:justify-end gap-2'>
						<div ref={languageMenuRef} className='relative'>
							<button
								type='button'
								onClick={() => setIsLanguageMenuOpen((current) => !current)}
								className='min-h-10 min-w-36 px-3 py-1.5 inline-flex items-center justify-between gap-2 rounded-lg border-2 border-forest-800 font-semibold text-sm text-forest-800 hover:text-forest-800 focus:text-forest-800 active:text-forest-800 bg-neutral-warm hover:bg-neutral-warm/90 focus:bg-neutral-warm/90 active:bg-neutral-warm/90'
								aria-label='Select language'
								aria-haspopup='listbox'
								aria-expanded={isLanguageMenuOpen}>
								<div className='inline-flex items-center justify-center gap-2'>
									<Globe2 className='size-5 shrink-0' />
									{language}
								</div>

								<motion.span animate={{ rotate: isLanguageMenuOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
									<ChevronDown className='size-4 stroke-3 shrink-0' />
								</motion.span>
							</button>

							<AnimatePresence>
								{isLanguageMenuOpen && (
									<motion.div role='listbox' aria-label='Available languages' className='absolute right-0 z-50 mt-2 min-w-40 overflow-hidden rounded-xl border border-forest-800/15 bg-cream-50 p-1 shadow-xl' initial={{ opacity: 0, y: -8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.96 }} transition={{ duration: 0.15 }}>
										{LANGUAGES?.map((option, idx: number) => (
											<button key={idx} type='button' onClick={() => selectLanguage(option)} className='w-full px-3 py-2 flex items-center justify-between rounded-lg text-left text-sm font-semibold text-forest-800 hover:bg-cream-200' role='option' aria-selected={language === option.label}>
												{option.label}
												{language === option.label && <span aria-hidden='true'>✓</span>}
											</button>
										))}
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						<div className='flex items-center gap-2'>
							<motion.button type='button' onClick={cycleTheme} aria-label={`Theme: ${theme}. Switch to ${theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system'} theme`} aria-pressed={theme === 'dark'} className='btn btn-primary btn-icon min-h-10' whileTap={{ scale: 0.9 }}>
								<motion.span animate={{ rotate: theme === 'system' ? 0 : isDarkMode ? 0 : 360 }} transition={{ duration: 0.3 }}>
									{theme === 'system' ? <SunMoon className='size-5 shrink-0 text-white' /> : isDarkMode ? <Moon className='size-5 shrink-0 text-blue-500' /> : <Sun className='size-5 shrink-0 text-yellow-500' />}
								</motion.span>

								<span className='sr-only'>{theme} theme</span>
							</motion.button>

							<motion.button type='button' onClick={() => setIsMuted((current) => !current)} aria-label={isMuted ? 'Unmute audio' : 'Mute audio'} aria-pressed={isMuted} className='btn btn-primary btn-icon min-h-10' whileTap={{ scale: 0.9 }}>
								<motion.span animate={{ rotate: isMuted ? 0 : 360 }} transition={{ duration: 0.3 }}>
									{isMuted ? <VolumeX className='size-5 shrink-0' /> : <Volume2 className='size-5 shrink-0' />}
								</motion.span>

								<span className='sr-only'>{isMuted ? 'Unmute audio' : 'Mute audio'}</span>
							</motion.button>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export { Header };
