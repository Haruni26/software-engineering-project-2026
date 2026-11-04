import TreesImage from '@/assets/img/trees.png';
import { ArrowUp, ArrowUpRight, MapPin } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { type CSSProperties, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type TreeStyle = CSSProperties & {
	'--tree-rotation': string;
};

const footerLinks = {
	Explore: [
		{ label: 'Explore the Forest', href: '/explore' },
		{ label: 'Meet the Animals', href: '/animals' },
		{ label: 'Discover the Trees', href: '/trees' },
		{ label: 'Trails & Maps', href: '/visit' },
	],
	Discover: [
		{ label: 'Kids Zone', href: '/kids' },
		{ label: 'Talking Trees', href: '/kids/talking-trees' },
		{ label: 'Nature Matching', href: '/kids/nature-matching' },
		{ label: 'Animal Quiz', href: '/kids/animal-quiz' },
	],
	Information: [
		{ label: 'About the Area', href: '/about' },
		{ label: 'Plan Your Visit', href: '/visit' },
		{ label: 'Conservation', href: '/conservation' },
		{ label: 'Accessibility', href: '/accessibility' },
	],
};

const Footer = () => {
	const currentYear = new Date().getFullYear();
	const [showScrollToTop, setShowScrollToTop] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setShowScrollToTop(window.scrollY > 240);
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<footer className='relative bg-forest-900 text-cream-300 overflow-hidden selection:bg-sage-200! selection:text-forest-900!'>
			<div className='relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8 sm:px-10 lg:px-12'>
				<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-x-8 gap-y-12'>
					<div className='max-w-xs col-span-2 md:col-span-1'>
						<Link to='/' className='select-none flex flex-col items-start justify-center gap-2 shrink-0 font-semibold text-xl! text-white nunito' aria-label='Woodland Conservation Area'>
							Woodland Conservation Area
						</Link>

						<p className='mt-2 text-sm text-muted-green-500 leading-relaxed'>A special place for people, wildlife, and future generations.</p>

						<div className='mt-6 flex items-start gap-2 text-sm text-sage-200'>
							<MapPin className='select-none size-5 mt-0.5 shrink-0 text-sage-300' />

							<span>
								St. Margaret&apos;s Bay
								<br />
								Nova Scotia, Canada
							</span>
						</div>
					</div>

					{Object.entries(footerLinks).map(([title, links]) => (
						<div key={title}>
							<h4 className='mb-5 font-extrabold text-sm text-muted-green-200 tracking-wide'>{title}</h4>

							<ul className='space-y-3.5'>
								{links.map((link, idx: number) => (
									<li key={idx}>
										<Link to={link?.href} className='group inline-flex items-center gap-1 text-sm text-muted-green-400 hover:text-white'>
											{link?.label}
											<ArrowUpRight className='size-3.5 transition-all opacity-0 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100' />
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className='mt-10 pt-7 flex flex-col sm:flex-row items-center justify-between gap-5 border-t border-white/15 text-center sm:text-left'>
					<p className='text-xs text-muted-green-300'>Copyright &copy; {currentYear} Woodland Conservation Area. All rights reserved.</p>

					<div className='flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-green-300'>
						<Link to='/' className='hover:text-white'>
							Privacy
						</Link>

						<Link to='/' className='hover:text-white'>
							Accessibility
						</Link>

						<Link to='/' className='hover:text-white'>
							Contact
						</Link>
					</div>
				</div>
			</div>

			<div className='pointer-events-none relative z-0 h-24 sm:h-28 lg:h-32 xl:h-36 -mt-12 overflow-hidden'>
				{[
					{
						count: 28,
						opacity: 'opacity-20',
						scale: 0.7,
						bottom: 30,
						height: 65,
					},
					{
						count: 24,
						opacity: 'opacity-35',
						scale: 0.85,
						bottom: 12,
						height: 85,
					},
					{
						count: 22,
						opacity: 'opacity-55',
						scale: 1,
						bottom: -16,
						height: 110,
					},
				].map((layer, layerIndex) => (
					<div
						key={layerIndex}
						className={`absolute inset-x-0 select-none flex items-end justify-between ${layer.opacity}`}
						style={{
							bottom: `${layer.bottom}px`,
							height: `${layer.height}%`,
						}}>
						{Array.from({ length: layer.count }).map((_, idx) => {
							const height = 55 + ((idx * 19 + layerIndex * 13) % 55);
							const rotation = ((idx * 7 + layerIndex * 3) % 13) - 6;
							const treeStyle: TreeStyle = {
								height: `${height * layer.scale}%`,
								marginLeft: idx === 0 ? 0 : '-2%',
								'--tree-rotation': `${rotation}deg`,
								transformOrigin: 'bottom center',
								animationDelay: `${(idx + layerIndex * 3) * 0.12}s`,
							};

							return <img key={idx} src={TreesImage} alt='' aria-hidden='true' draggable={false} className='tree-sway relative min-w-0 flex-1 object-contain object-bottom' style={treeStyle} />;
						})}
					</div>
				))}
			</div>

			<AnimatePresence>
				{showScrollToTop && (
					<motion.button
						//
						type='button'
						onClick={scrollToTop}
						className='btn btn-primary fixed right-6 bottom-6 z-50 size-11 rounded-full border border-white/20 p-0! shadow-lg'
						aria-label='Back to top'
						initial={{ opacity: 0, scale: 0.8, y: 16 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.8, y: 16 }}
						transition={{ duration: 0.2, ease: 'easeOut' }}>
						<ArrowUp size={18} />
					</motion.button>

					//       <button type='button' onClick={toggleSpeech} className={`size-10 inline-flex items-center justify-center shrink-0 rounded-full border-2 border-forest-700 bg-white/90 text-forest-700 shadow-sm hover:scale-105 ${className}`} title={isPlaying ? 'Stop reading' : 'Read aloud'} aria-label={isPlaying ? 'Stop reading' : `Read aloud: ${text}`} aria-pressed={isPlaying}>
					// 	<motion.span animate={{ scale: isPlaying ? [1, 1.12, 1] : 1 }} transition={{ duration: 0.8, repeat: isPlaying ? Infinity : 0 }}>
					// 		{isPlaying ? <Pause size={18} strokeWidth={2.6} /> : <Volume2 size={20} strokeWidth={2.6} />}
					// 	</motion.span>
					// </button>
				)}
			</AnimatePresence>
		</footer>
	);
};

export { Footer };
