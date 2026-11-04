import type { CardType } from '@/types';
import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { AudioButton } from './audio-button';

const Card: FC<CardType> = ({ title, desc, to, image }) => {
	return (
		<article className='group overflow-hidden rounded-[23px] bg-sage-100 dark:bg-forest-600 bg-linear-to-b text-forest-950 dark:text-cream-50'>
			<div className='select-none flex items-center justify-center overflow-hidden' aria-hidden='true'>
				<img className='select-none h-40 sm:h-48 shrink-0 object-center object-cover transition-all duration-500 ease-out will-change-transform group-hover:scale-95 group-hover:-translate-y-1' src={image} alt={title} />
			</div>

			<div className='min-h-36 p-4 sm:p-5 rounded-t-[23px] bg-cream-100/85 dark:bg-forest-800/90'>
				<div className='flex items-center justify-between gap-2'>
					<h2 className='font-black text-2xl tracking-tight nunito'>{title}</h2>
					<AudioButton className='size-9' text={`${title}. ${desc}`} />
				</div>

				<p className='max-w-47.5 mt-1 mb-2 text-sm sm:text-base leading-snug'>{desc}</p>

				<Link to={to} className='select-none font-bold text-sm text-forest-700 dark:text-sage-300 decoration-2 underline underline-offset-2 hover:opacity-80'>
					Explore {title}
				</Link>
			</div>
		</article>
	);
};

export { Card };
