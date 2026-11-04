import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
	const { pathname } = useLocation();
	const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	useLayoutEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant',
		});
	}, [pathname]);

	useEffect(() => {
		const handleScroll = () => {
			setShowScrollToTop(window.scrollY > 240);
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll, {
			passive: true,
		});

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<AnimatePresence>
			{showScrollToTop && (
				<motion.button
					type='button'
					onClick={scrollToTop}
					className='btn btn-primary fixed right-6 bottom-6 z-40 size-11 p-0! rounded-full border border-white/20 shadow-lg'
					aria-label='Back to top'
					initial={{
						opacity: 0,
						scale: 0.8,
						y: 16,
					}}
					animate={{
						opacity: 1,
						scale: 1,
						y: 0,
					}}
					exit={{
						opacity: 0,
						scale: 0.8,
						y: 16,
					}}
					transition={{
						duration: 0.2,
						ease: 'easeOut',
					}}>
					<ArrowUp size={18} />
				</motion.button>
			)}
		</AnimatePresence>
	);
};

export { ScrollToTop };
