import AnimalsImage from '@/assets/img/animals.png';
import BackgroundImage from '@/assets/img/background.png';
import KidImage from '@/assets/img/kid.png';
import KidsZoneImage from '@/assets/img/kids-zone.png';
import NatureMatchingImage from '@/assets/img/nature-matching.png';
import RaccoonImage from '@/assets/img/raccoon.png';
import TrailsImage from '@/assets/img/trails.png';
import TreesImage from '@/assets/img/trees.png';
import { type CardType } from '@/components/card';
import { ArrowRight, Compass, Leaf, TreePine, Volume2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/card';

const lakePhoto = 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1100&q=85';

type Tab = 'Fun Facts' | 'My Role' | "In Mi'kmaq";

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

function AudioButton({ text, className = '' }: { text: string; className?: string }) {
	return (
		<button type='button' onClick={() => say(text)} title='Read aloud' aria-label={`Read aloud: ${text}`} className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/90 text-[#073e32] shadow-sm transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 ${className}`}>
			<Volume2 size={20} strokeWidth={2.6} />
		</button>
	);
}

const LandingPage = () => {
	const heroRef = useRef<HTMLElement>(null);
	const backgroundRef = useRef<HTMLImageElement>(null);

	const [tab, setTab] = useState<Tab>('Fun Facts');

	useEffect(() => {
		const hero = heroRef.current;
		const background = backgroundRef.current;

		if (!hero || !background || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			return;
		}

		let frame = 0;

		const updateParallax = () => {
			frame = 0;
			const progress = Math.max(0, Math.min(1, -hero.getBoundingClientRect().top / hero.offsetHeight));
			background.style.transform = `translate3d(0, ${progress * 48}px, 0) scale(${1.08 + progress * 0.08})`;
		};

		const handleScroll = () => {
			if (!frame) {
				frame = requestAnimationFrame(updateParallax);
			}
		};

		updateParallax();

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);

			if (frame) {
				cancelAnimationFrame(frame);
			}
		};
	}, []);

	return (
		<main className='min-h-screen flex flex-col'>
			<section ref={heroRef} className='relative isolate min-h-[calc(100dvh-5rem)] flex items-center overflow-hidden bg-[#a4d9ec]'>
				<img ref={backgroundRef} className='absolute inset-0 -z-30 select-none size-full origin-center object-cover object-center will-change-transform' src={BackgroundImage} alt="Illustrated woodland overlooking St. Margaret's Bay with a deer, evergreen trees, and a young explorer" />
				<div className='absolute inset-0 -z-20 select-none bg-black/30' aria-hidden='true' />

				<div className='relative z-10 w-full max-w-7xl mx-auto -mt-20 px-5 pt-12 sm:pt-16 lg:pt-20 flex flex-col items-center text-center'>
					<div className='select-none mb-5 px-4 py-2 inline-flex items-center gap-2 rounded-full border border-[#1b6146]/15 bg-[#fffdf0]/90 font-bold text-xs sm:text-sm text-[#1b6146] uppercase'>
						<Leaf className='size-5 shrink-0 fill-[#77aa58]' />A world of nature awaits
					</div>

					<h1 className='max-w-4xl font-bold text-8xl text-[#15362f] tracking-tight leading-[1.04] drop-shadow-[0_2px_1px_rgba(255,255,255,0.4)]'>
						Explore. Learn.
						<br />
						<span className='text-[#77aa58]'>Protect.</span>
					</h1>

					<p className='mt-5 max-w-xl font-semibold text-white/80 text-base sm:text-lg md:text-xl leading-relaxed'>Step into the wonders of Woodland Conservation Area. Discover talking trees, curious wildlife, and the natural beauty of St. Margaret&apos;s Bay.</p>

					<div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
						<Link to='/explore' className='group inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-[#07503d] px-7 py-3.5 text-base font-bold text-white shadow-[0_8px_24px_rgba(5,70,51,.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#0b6249]'>
							Start Exploring
							<ArrowRight size={20} className='transition-transform group-hover:translate-x-1' />
						</Link>

						<a href='#visit' className='inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-[#1c513f]/15 bg-[#fffdf0]/90 px-6 py-3.5 text-base font-bold text-[#194736] shadow-sm backdrop-blur-md transition hover:-translate-y-1 hover:bg-white'>
							<Compass size={19} />
							Plan Your Visit
						</a>
					</div>
				</div>
			</section>

			<section className='relative z-10 w-full px-4 sm:px-8 lg:px-12 py-20'>
				<div className='max-w-360 mx-auto p-3 sm:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 rounded-[28px] bg-[#fff9dc] dark:bg-[#15362f] shadow-xl overflow-hidden'>
					{featureCards?.map((card: CardType, idx: number) => {
						return <Card key={idx} {...card} />;
					})}
				</div>
			</section>

			<section className='relative z-10 w-full px-4 sm:px-8 lg:px-12 py-20'>
				<div className='max-w-360 mx-auto p-3 sm:p-5 grid grid-cols-2 lg:grid-cols-[1.2fr_1fr] gap-3 sm:gap-5 lg:items-center rounded-[28px] bg-[#fff9dc] dark:bg-[#15362f] shadow-xl overflow-hidden'>
					<div>
						<h2 className='text-3xl font-black tracking-tight sm:text-4xl'>Why This Place Matters</h2>
						<p className='mt-5 text-lg leading-relaxed'>The Woodland Conservation Area is home to forests, lakes, wildlife and a rich cultural history. It’s a special place for people, animals and future generations.</p>
						<AudioButton text='The Woodland Conservation Area is home to forests, lakes, wildlife and a rich cultural history. It’s a special place for people, animals and future generations.' className='mt-5' />
					</div>

					<div className='relative overflow-hidden rounded-[22px]'>
						<img src={lakePhoto} alt='Scenic lake surrounded by trees and forest' className='aspect-[16/9] w-full object-cover' />

						<AudioButton text='Protecting our forests, waterways and wildlife for future generations.' className='absolute right-4 bottom-4' />
					</div>
				</div>
			</section>

			<section id='trees' className='mx-3 my-5 overflow-hidden rounded-[26px] bg-[#cce9b2] shadow-md sm:mx-5 dark:bg-[#254936]'>
				<div className='flex items-center gap-3 border-b border-green-900/10 bg-[#fff9e2] p-5 dark:bg-[#203b2f]'>
					<TreePine className='text-green-800 dark:text-green-200' size={30} />

					<div>
						<h2 className='text-3xl font-black'>Meet the Talking Trees</h2>

						<p className='text-sm'>Discover stories from the forest.</p>
					</div>
				</div>

				<div className='grid gap-4 p-5 md:grid-cols-[.8fr_1.2fr] md:gap-6'>
					{/* TREE ILLUSTRATION */}
					<div className='relative flex min-h-[290px] items-center justify-center rounded-[24px] bg-gradient-to-b from-[#9bdbdc] to-[#74af55]'>
						<span className='text-[220px] leading-none' aria-hidden='true'>
							🌳
						</span>

						<div className='absolute top-3 right-3 max-w-[190px] rounded-3xl bg-white p-3 text-sm font-bold text-[#12332a] shadow'>
							Hi! I’m a red maple tree! I’ve been growing here for over 100 years.
							<AudioButton text="Hi! I'm a red maple tree! I've been growing here for over 100 years." className='mt-2 size-8' />
						</div>
					</div>

					{/* TREE INFORMATION */}
					<article className='rounded-[24px] bg-[#fffbea] p-5 text-[#162921] sm:p-7'>
						<div className='flex items-center justify-between'>
							<h3 className='text-3xl font-black'>Red Maple</h3>

							<span className='text-6xl'>🍁</span>
						</div>

						<p className='mt-2 max-w-lg'>I'm a red maple! I help provide shade, clean the air and a home for many animals. In the fall, my leaves turn bright red!</p>

						<AudioButton text="I'm a red maple! I help provide shade, clean the air and a home for many animals. In the fall, my leaves turn bright red!" className='mt-3 size-9' />

						{/* TABS */}
						<div className='mt-5 grid grid-cols-3 gap-2'>
							{(['Fun Facts', 'My Role', 'In Mi’kmaq'] as Tab[]).map((item) => (
								<button key={item} onClick={() => setTab(item)} className={`rounded-xl px-2 py-3 text-xs font-extrabold sm:text-sm ${tab === item ? 'bg-[#07503d] text-white' : 'bg-[#e4e4dc] text-[#23342d]'}`}>
									{item}
								</button>
							))}
						</div>

						{/* TAB CONTENT */}
						<div className='mt-5 min-h-[105px] text-sm leading-7'>
							{tab === 'Fun Facts' ? (
								<ul className='list-inside list-disc'>
									<li>My leaves turn red, orange or yellow in the fall!</li>
									<li>I give food and shelter to many animals.</li>
									<li>You can find me all over Nova Scotia.</li>
								</ul>
							) : tab === 'My Role' ? (
								<p>My leaves absorb carbon dioxide, my roots help protect the soil, and my branches provide shelter for forest animals.</p>
							) : (
								<p>Mi’kmaw language content should be written and reviewed with a Mi’kmaw language speaker before publication.</p>
							)}
						</div>
					</article>
				</div>
			</section>

			<section className='relative z-10 w-full px-4 sm:px-8 lg:px-12 py-20'>
				<div className='p-6 flex items-center gap-3'>
					<img className='h-20 w-auto shrink-0 transition-all duration-300 hover:scale-105' src={KidImage} alt='Kid' />

					<div>
						<h2 className='font-black text-4xl'>Kids Zone</h2>
						<p>Play, learn and explore the forest!</p>
					</div>
				</div>

				<div className='max-w-360 mx-auto p-3 sm:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 rounded-[28px] bg-[#fff9dc] dark:bg-[#15362f] shadow-xl overflow-hidden'>
					{kidsCards?.map((card: CardType, idx: number) => {
						return <Card key={idx} {...card} />;
					})}
				</div>
			</section>
		</main>
	);
};

export { LandingPage };
