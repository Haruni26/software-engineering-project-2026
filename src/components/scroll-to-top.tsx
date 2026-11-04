import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

const ScrollToTop = () => {
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
		<AnimatePresence>
			{showScrollToTop && (
				<motion.button
					type='button'
					onClick={scrollToTop}
					className='btn btn-primary fixed right-6 bottom-6 z-40 size-11 rounded-full border border-white/20 p-0! shadow-lg'
					aria-label='Back to top'
					initial={{ opacity: 0, scale: 0.8, y: 16 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.8, y: 16 }}
					transition={{ duration: 0.2, ease: 'easeOut' }}>
					<ArrowUp size={18} />
				</motion.button>
			)}
		</AnimatePresence>
	);
};

export { ScrollToTop };
