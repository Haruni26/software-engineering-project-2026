import { useId } from 'react';

type PageHeroProps = {
	title: string;
	description?: string;
};

const PageHero = ({ title, description }: PageHeroProps) => {
	const titleId = useId();

	return (
		<section aria-labelledby={titleId} className='relative isolate min-h-64 sm:min-h-72 flex items-center bg-forest-800 dark:bg-cream-300 overflow-hidden'>
			<div className='w-full max-w-340 mx-auto px-4 py-10 sm:px-6 lg:px-8'>
				<h1 id={titleId} className='max-w-3xl font-bold text-4xl sm:text-5xl lg:text-6xl text-white dark:text-forest-800 tracking-tight leading-tight'>
					{title}
				</h1>

				{description && <p className='max-w-xl mt-3 text-base sm:text-lg text-cream-50 dark:text-forest-600 leading-relaxed'>{description}</p>}
			</div>
		</section>
	);
};

export { PageHero };
