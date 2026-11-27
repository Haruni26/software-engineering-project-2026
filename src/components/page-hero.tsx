import { useEffect, useId, useRef, type FC } from 'react';

type PageHeroProps = {
	title: string;
	description?: string;
	backgroundImage?: string;
};

const PageHero: FC<PageHeroProps> = ({ title, description, backgroundImage }) => {
	const titleId = useId();
	const heroRef = useRef<HTMLElement>(null);
	const backgroundRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		const hero = heroRef.current;
		const background = backgroundRef.current;

		if (!hero || !background) {
			return;
		}

		const desktopMotion = window.matchMedia('(min-width: 48rem) and (prefers-reduced-motion: no-preference)');

		let frame = 0;
		let currentProgress = 0;

		const updateParallax = () => {
			frame = 0;

			const progress = Math.max(0, Math.min(1, -hero.getBoundingClientRect().top / hero.offsetHeight));
			currentProgress += (progress - currentProgress) * 0.1;

			background.style.transform = `translate3d(0, ${currentProgress * 48}px, 0) scale(${1.08 + currentProgress * 0.08})`;

			if (Math.abs(progress - currentProgress) > 0.001) {
				frame = requestAnimationFrame(updateParallax);
			}
		};

		const handleScroll = () => {
			if (!frame) {
				frame = requestAnimationFrame(updateParallax);
			}
		};

		const stopParallax = () => {
			window.removeEventListener('scroll', handleScroll);
			cancelAnimationFrame(frame);

			frame = 0;
			currentProgress = 0;

			background.style.removeProperty('transform');
		};

		const syncParallax = () => {
			stopParallax();

			if (desktopMotion.matches) {
				updateParallax();
				window.addEventListener('scroll', handleScroll, {
					passive: true,
				});
			}
		};

		syncParallax();
		desktopMotion.addEventListener('change', syncParallax);

		return () => {
			desktopMotion.removeEventListener('change', syncParallax);
			stopParallax();
		};
	}, []);

	return (
		<section ref={heroRef} className='relative isolate min-h-64 sm:min-h-72 flex items-center bg-forest-800 overflow-hidden' aria-labelledby={titleId}>
			{backgroundImage && (
				<>
					<img ref={backgroundRef} className='absolute inset-0 -z-30 select-none size-full origin-center object-cover object-center will-change-transform' src={backgroundImage} alt={title} />
					<div className='absolute inset-0 -z-20 select-none bg-black/30' aria-hidden='true' />
				</>
			)}

			<div className='relative w-full max-w-340 mx-auto px-4 py-10 sm:px-6 lg:px-8'>
				<h1 id={titleId} className='max-w-3xl font-normal text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.2]'>
					{title}
				</h1>

				{description && <p className='max-w-xl mt-3 text-base sm:text-lg text-cream-50 leading-[1.2]'>{description}</p>}
			</div>
		</section>
	);
};

export { PageHero };
