import { Volume2 } from 'lucide-react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

function say(text: string) {
	if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
		return;
	}

	window.speechSynthesis.cancel();

	const speech = new SpeechSynthesisUtterance(text);
	speech.rate = 0.9;

	window.speechSynthesis.speak(speech);
}

function AudioButton({ text, className = '' }: { text: string; className?: string }) {
	return (
		<button type='button' onClick={() => say(text)} title='Read aloud' aria-label={`Read aloud: ${text}`} className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/90 text-forest-700 shadow-sm transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-700 ${className}`}>
			<Volume2 size={20} strokeWidth={2.6} />
		</button>
	);
}

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
