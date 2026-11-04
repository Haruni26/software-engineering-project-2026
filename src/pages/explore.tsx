import { PageHero } from '@/components';
import { useEffect, useRef } from 'react';

const ExplorePage = () => {
	const heroRef = useRef<HTMLElement>(null);
	const backgroundRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		const hero = heroRef.current;
		const background = backgroundRef.current;

		if (!hero || !background || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			return;
		}

		let frame = 0;
		const isMobile = window.matchMedia('(max-width: 767px)').matches;
		const zoomAmount = isMobile ? 0.015 : 0.08;
		const smoothing = isMobile ? 0.04 : 0.1;
		let currentProgress = 0;

		const updateParallax = () => {
			frame = 0;
			const progress = Math.max(0, Math.min(1, -hero.getBoundingClientRect().top / hero.offsetHeight));
			currentProgress += (progress - currentProgress) * smoothing;
			background.style.transform = `translate3d(0, ${currentProgress * 48}px, 0) scale(${1.08 + currentProgress * zoomAmount})`;

			if (Math.abs(progress - currentProgress) > 0.001) {
				frame = requestAnimationFrame(updateParallax);
			}
		};

		const handleScroll = () => {
			if (!frame) {
				frame = requestAnimationFrame(updateParallax);
			}
		};

		updateParallax();

		window.addEventListener('scroll', handleScroll, {
			passive: true,
		});

		return () => {
			window.removeEventListener('scroll', handleScroll);

			if (frame) {
				cancelAnimationFrame(frame);
			}
		};
	}, []);

	return (
		<main className='main'>
			<PageHero title='Explore' description="Discover woodland trails, curious wildlife, and the natural beauty of St. Margaret's Bay." />
		</main>
	);
};

export { ExplorePage };
