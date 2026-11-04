import { Volume2 } from 'lucide-react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

interface AudioButtonProps {
	text: string;
}

const AudioButton: FC<AudioButtonProps> = ({ text }) => {
	const say = (text: string) => {
		if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
			return;
		}

		window.speechSynthesis.cancel();

		const speech = new SpeechSynthesisUtterance(text);
		speech.rate = 0.9;

		window.speechSynthesis.speak(speech);
	};

	return (
		<button type='button' onClick={() => say(text)} className='size-10 inline-flex items-center justify-center shrink-0 rounded-full border-2 border-forest-700 bg-white/90 text-forest-700 shadow-sm hover:scale-105' title='Read aloud' aria-label={`Read aloud: ${text}`}>
			<Volume2 size={20} strokeWidth={2.6} />
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
