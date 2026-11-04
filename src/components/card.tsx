import { Pause, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, type FC } from 'react';
import { Link } from 'react-router-dom';

interface AudioButtonProps {
	text: string;
	className?: string;
}

const AudioButton: FC<AudioButtonProps> = ({ text, className = '' }) => {
	const [isPlaying, setIsPlaying] = useState(false);

	const toggleSpeech = () => {
		if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
			return;
		}

		if (isPlaying) {
			window.speechSynthesis.cancel();
			setIsPlaying(false);
			return;
		}

		window.speechSynthesis.cancel();

		const speech = new SpeechSynthesisUtterance(text);
		speech.rate = 0.9;
		speech.onstart = () => setIsPlaying(true);
		speech.onend = () => setIsPlaying(false);
		speech.onerror = () => setIsPlaying(false);

		window.speechSynthesis.speak(speech);
	};

	return (
		<button type='button' onClick={toggleSpeech} className={`size-10 inline-flex items-center justify-center shrink-0 rounded-full border-2 border-forest-700 bg-white/90 text-forest-700 shadow-sm hover:scale-105 ${className}`} title={isPlaying ? 'Stop reading' : 'Read aloud'} aria-label={isPlaying ? 'Stop reading' : `Read aloud: ${text}`} aria-pressed={isPlaying}>
			<motion.span animate={{ scale: isPlaying ? [1, 1.12, 1] : 1 }} transition={{ duration: 0.8, repeat: isPlaying ? Infinity : 0 }}>
				{isPlaying ? <Pause size={18} strokeWidth={2.6} /> : <Volume2 size={20} strokeWidth={2.6} />}
			</motion.span>
		</button>
	);
};

type CardType = {
	title: string;
	desc: string;
	to: string;
	image: string;
};

const Card: FC<CardType> = ({ title, desc, to, image }) => {
	return (
		<article className='group overflow-hidden rounded-[23px] bg-sage-100 bg-linear-to-b text-forest-950'>
			<div className='select-none flex items-center justify-center overflow-hidden' aria-hidden='true'>
				<img className='select-none h-40 sm:h-48 shrink-0 object-center object-cover transition-all duration-500 ease-out will-change-transform group-hover:scale-95 group-hover:-translate-y-1' src={image} alt={title} />
			</div>

			<div className='min-h-36 p-4 sm:p-5 rounded-t-[18px] bg-cream-100/85'>
				<div className='flex items-center justify-between gap-2'>
					<h2 className='font-black text-2xl tracking-tight nunito'>{title}</h2>
					<AudioButton className='size-9' text={`${title}. ${desc}`} />
				</div>

				<p className='max-w-47.5 mt-1 mb-2 text-sm sm:text-base leading-snug'>{desc}</p>

				<Link to={to} className='select-none font-bold text-sm decoration-2 underline underline-offset-2 hover:opacity-80'>
					Explore {title}
				</Link>
			</div>
		</article>
	);
};

export { Card, type CardType };
