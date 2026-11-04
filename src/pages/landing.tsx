import AnimalsImage from '@/assets/img/animals.png';
import BackgroundImage from '@/assets/img/background.png';
import KidImage from '@/assets/img/kid.png';
import KidsZoneImage from '@/assets/img/kids-zone.png';
import NatureMatchingImage from '@/assets/img/nature-matching.png';
import RaccoonImage from '@/assets/img/raccoon.png';
import TrailsImage from '@/assets/img/trails.png';
import TreesImage from '@/assets/img/trees.png';
import { AudioButton, Button, Card } from '@/components';
import type { CardType } from '@/types';
import { ArrowRight, Compass, Leaf, TreePine, Volume2 } from 'lucide-react';
import { useEffect, useRef } from 'react';

const lakePhoto = 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1100&q=85';

function say(text: string) {
	if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
		return;
	}

	window.speechSynthesis.cancel();

	const speech = new SpeechSynthesisUtterance(text);
	speech.rate = 0.9;

	window.speechSynthesis.speak(speech);
}

const featureCards: CardType[] = [
	{
		title: 'Animals',
		desc: 'Meet the animals that live here.',
		to: '/',
		image: AnimalsImage,
	},
	{
		title: 'Trees',
		desc: 'Learn about our talking trees!',
		to: '/',
		image: TreesImage,
	},
	{
		title: 'Trails',
		desc: 'See the trails and plan a visit.',
		to: '/',
		image: TrailsImage,
	},
	{
		title: 'Kids Zone',
		desc: 'Games, stories and fun facts!',
		to: '/',
		image: KidsZoneImage,
	},
];

const kidsCards: CardType[] = [
	{
		title: 'Talking Trees',
		desc: 'Listen to trees and learn fun facts!',
		to: '/',
		image: TreesImage,
	},
	{
		title: 'Animal Quiz',
		desc: 'Test your animal knowledge!',
		to: '/',
		image: RaccoonImage,
	},
	{
		title: 'Nature Matching',
		desc: 'Match the leaves, animals and more!',
		to: '/',
		image: NatureMatchingImage,
	},
	{
		title: 'Explore the Map',
		desc: 'Find the trails and landmarks!',
		to: '/',
		image: TrailsImage,
	},
];

const LandingPage = () => {
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
		<main className='main'>
			<section ref={heroRef} className='relative isolate min-h-[calc(100dvh-5.5rem)] flex items-center overflow-hidden bg-mist-300'>
				<img ref={backgroundRef} className='absolute inset-0 -z-30 select-none size-full origin-center object-cover object-center will-change-transform' src={BackgroundImage} alt="Illustrated woodland overlooking St. Margaret's Bay with a deer, evergreen trees, and a young explorer" />
				<div className='absolute inset-0 -z-20 select-none bg-black/30' aria-hidden='true' />

				<div className='relative z-10 w-full max-w-7xl mx-auto -mt-20 px-5 pt-12 sm:pt-16 lg:pt-20 flex flex-col items-center text-center'>
					<div className='mb-5 px-4 py-2 inline-flex items-center gap-2 rounded-full border border-forest-500/15 bg-cream-50/90 font-bold text-xs sm:text-sm text-forest-500 uppercase'>
						<Leaf className='size-5 shrink-0 fill-sage-500' />A world of nature awaits
					</div>

					<h1 className='max-w-4xl font-bold text-5xl md:text-8xl text-white tracking-tight leading-[1.04]'>
						Explore. Learn.
						<br />
						Protect.
					</h1>

					<p className='max-w-xl mt-5 font-semibold text-white/90 text-base sm:text-lg md:text-xl leading-relaxed'>Step into the wonders of Woodland Conservation Area. Discover talking trees, curious wildlife, and the natural beauty of St. Margaret&apos;s Bay.</p>

					<div className='w-full mt-8 flex flex-col md:flex-row items-center justify-center gap-4'>
						<Button to='/explore' variant='primary' size='xl' radius='lg' fullWidth={false} className='w-full md:w-auto hover:-translate-y-1'>
							Start Exploring
							<ArrowRight className='size-5 shrink-0 transition-all' />
						</Button>

						<Button to='/visit' variant='secondary' size='xl' radius='lg' fullWidth={false} className='w-full md:w-auto hover:-translate-y-1'>
							<Compass className='size-5 shrink-0' />
							Plan Your Visit
						</Button>
					</div>
				</div>
			</section>

			<section className='relative z-10 w-full px-4 sm:px-8 lg:px-12'>
				<div className='max-w-360 mx-auto p-3 sm:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 rounded-4xl bg-forest-800 dark:bg-cream-300 shadow-xl overflow-hidden'>
					{featureCards?.map((card: CardType, idx: number) => {
						return <Card key={idx} {...card} />;
					})}
				</div>
			</section>

			<section className='relative z-10 w-full px-4 sm:px-8 lg:px-12'>
				<div className='max-w-360 mx-auto p-3 sm:p-5 grid lg:grid-cols-[1.05fr_.95fr] gap-3 sm:gap-5 rounded-4xl bg-forest-800 dark:bg-cream-300 shadow-xl text-cream-50 overflow-hidden'>
					<div className='p-6 sm:p-10 lg:p-14 flex flex-col justify-between rounded-4xl bg-cream-300 dark:bg-forest-800'>
						<div>
							<div className='mb-6 px-3 py-1.5 inline-flex items-center gap-2 rounded-full border border-sage-300/30 bg-sage-300/10 font-bold text-sm text-sage-300'>
								<Leaf className='select-none size-4 shrink-0' />
								Our shared home
							</div>

							<h2 className='max-w-xl text-4xl font-black tracking-tight sm:text-5xl'>A place worth protecting.</h2>

							<p className='mt-5 max-w-xl text-base leading-relaxed text-cream-400 sm:text-lg'>Woodland connects forests, lakes, wildlife and people. Every visit helps us understand this place and care for it for generations to come.</p>
						</div>

						<div className='mt-10 grid grid-cols-3 gap-3 border-t border-white/15 pt-6 sm:gap-6'>
							<div>
								<p className='text-2xl font-black text-sage-300 sm:text-3xl'>100+</p>
								<p className='mt-1 text-xs text-muted-green-400 sm:text-sm'>years of stories</p>
							</div>

							<div>
								<p className='text-2xl font-black text-sage-300 sm:text-3xl'>4</p>
								<p className='mt-1 text-xs text-muted-green-400 sm:text-sm'>ways to explore</p>
							</div>

							<div>
								<p className='text-2xl font-black text-sage-300 sm:text-3xl'>1</p>
								<p className='mt-1 text-xs text-muted-green-400 sm:text-sm'>shared responsibility</p>
							</div>
						</div>
					</div>

					<div className='relative min-h-72 lg:min-h-full rounded-4xl bg-sage-200 overflow-hidden'>
						<img className='size-full object-cover transition-transform duration-700 hover:scale-105' src={lakePhoto} alt='A calm lake surrounded by woodland' />

						<div className='absolute inset-0 bg-linear-to-t from-forest-950/60 via-transparent to-transparent' />

						<div className='absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4 text-white'>
							<p className='max-w-xs text-sm font-bold leading-relaxed'>Protect the quiet places. Share the wonder.</p>
							<AudioButton text='Protect the quiet places. Share the wonder.' className='size-9' />
						</div>
					</div>
				</div>
			</section>

			<section className='relative z-10 w-full px-4 sm:px-8 lg:px-12'>
				<div className='max-w-360 mx-auto p-3 sm:p-5 grid lg:grid-cols-[.9fr_1.1fr] gap-3 sm:gap-5 rounded-4xl bg-forest-800 dark:bg-cream-300 shadow-xl text-cream-50 overflow-hidden'>
					<div className='relative min-h-80 p-6 flex items-end rounded-4xl bg-linear-to-b from-mist-200 to-mist-100 overflow-hidden'>
						<img className='absolute inset-x-0 bottom-0 h-[92%] w-full mx-auto object-contain object-bottom transition-all duration-500 hover:scale-105' src={TreesImage} alt='Illustration of a red maple tree' />

						<div className='relative z-10 max-w-xs p-4 inline-flex items-center justify-center rounded-2xl bg-cream-50/90 font-bold text-sm text-forest-900 shadow-lg backdrop-blur-sm'>
							<p>“I have watched this forest change for over 100 years”</p>
							<AudioButton text='I have watched this forest change for over 100 years.' />
						</div>
					</div>

					<div className='p-6 sm:p-10 lg:p-14 rounded-4xl bg-forest-800 text-cream-50'>
						<div className='mb-6 flex items-center justify-between gap-4'>
							<div>
								<div className='mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-sage-300'>
									<TreePine className='size-5' />
									Voices of the forest
								</div>

								<h2 className='text-4xl font-black tracking-tight sm:text-5xl'>Meet the trees.</h2>
							</div>

							<span className='text-5xl' aria-hidden='true'>
								🍁
							</span>
						</div>

						<p className='max-w-xl text-base leading-relaxed text-cream-400 sm:text-lg'>Every tree has a role to play. Learn how the red maple supports wildlife, cleans the air, and shapes the forest around us.</p>

						<div className='mt-8 grid gap-3 sm:grid-cols-3'>
							{[
								['100+', 'years growing'],
								['25m', 'canopy height'],
								['4', 'seasons of color'],
							].map(([value, label]) => (
								<div key={label} className='rounded-2xl border border-white/10 bg-white/5 p-4'>
									<p className='text-2xl font-black text-sage-300'>{value}</p>
									<p className='mt-1 text-xs text-muted-green-400'>{label}</p>
								</div>
							))}
						</div>

						<button type='button' onClick={() => say('Learn more about the red maple and its role in the forest.')} className='btn btn-primary mt-8 bg-sage-300! text-forest-950! hover:bg-sage-200!'>
							Listen to a tree
							<Volume2 className='size-4' />
						</button>
					</div>
				</div>
			</section>

			<section className='relative z-10 w-full px-4 sm:px-8 lg:px-12 mb-20'>
				<div className='p-6 flex items-center gap-3'>
					<img className='h-20 w-auto shrink-0 transition-all duration-300 hover:scale-105' src={KidImage} alt='Kid' />

					<div>
						<h2 className='font-black text-4xl text-forest-800 dark:text-cream-300 nunito'>Kids Zone</h2>
						<p className='text-neutral-600 dark:text-neutral-200'>Play, learn and explore the forest!</p>
					</div>
				</div>

				<div className='max-w-360 mx-auto p-3 sm:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 rounded-[28px] bg-forest-800 dark:bg-cream-300 shadow-xl overflow-hidden'>
					{kidsCards?.map((card: CardType, idx: number) => {
						return <Card key={idx} {...card} />;
					})}
				</div>
			</section>
		</main>
	);
};

export { LandingPage };
