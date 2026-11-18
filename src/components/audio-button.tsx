import { Button } from '@/components';
import { useAudio, type AudioSourcesType, type TranslationsType } from '@/contexts';
import { cn } from '@/lib';
import { Pause, Play, Volume2 } from 'lucide-react';
import { motion, useReducedMotion, useTransform } from 'motion/react';
import { useEffect, useId, type FC } from 'react';

const RING_RADIUS = 18.75;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

interface AudioButtonProps {
	text: string;
	translations?: TranslationsType;
	sources?: AudioSourcesType;
	className?: string;
	label?: string;
}

const AudioButton: FC<AudioButtonProps> = ({ text, translations, sources, className, label }) => {
	const { activeButton, progress, language, isPlaying, isPaused, isMuted, play, pause, resume, stop } = useAudio();
	const reduceMotion = useReducedMotion();
	const id = useId();

	const dashOffset = useTransform(progress, [0, 1], [RING_CIRCUMFERENCE, 0]);
	const isActive = activeButton === id;
	const isReading = isActive && isPlaying;
	const isPausedHere = isActive && isPaused;
	const action = isReading ? 'Pause reading' : isPausedHere ? 'Resume reading' : (label ?? 'Read aloud');
	const description = translations?.[language] || text;

	useEffect(() => () => stop(id), [id, stop]);

	const togglePlayback = () => {
		if (isReading) {
			pause();
		} else if (isPausedHere) {
			resume();
		} else {
			play(
				{
					en: text,
					...translations,
				},
				sources,
				id,
			);
		}
	};

	const Icon = isReading ? Pause : isPausedHere ? Play : Volume2;

	const icon = (
		<motion.span className='relative z-10 inline-flex' animate={{ scale: isReading && !reduceMotion ? [1, 1.12, 1] : 1 }} transition={{ duration: 0.8, repeat: isReading && !reduceMotion ? Infinity : 0 }}>
			<Icon className={label ? 'size-4' : 'size-5'} strokeWidth={2.6} aria-hidden='true' />
		</motion.span>
	);

	const ring = (
		<svg viewBox='0 0 40 40' className='pointer-events-none absolute inset-0 size-full fill-none stroke-current' aria-hidden='true'>
			<circle cx='20' cy='20' r={RING_RADIUS} className='fill-cream-50 stroke-none dark:fill-forest-950' />
			<circle cx='20' cy='20' r={RING_RADIUS} strokeWidth='2' opacity={isActive ? 0.35 : 1} />

			{isActive && (
				<>
					<path d='M20 36v3.75' strokeWidth='1' opacity='0.6' />
					<motion.circle cx='20' cy='20' r={RING_RADIUS} strokeWidth='2' transform='rotate(-90 20 20)' strokeDasharray={RING_CIRCUMFERENCE} style={{ strokeDashoffset: dashOffset }} />
				</>
			)}
		</svg>
	);

	if (label) {
		return (
			<Button variant='secondary' onClick={togglePlayback} className={className} disabled={isMuted}>
				{action}

				<span className='relative inline-flex size-7 shrink-0 items-center justify-center rounded-full text-forest-700 dark:text-sage-300'>
					{ring}
					{icon}
				</span>
			</Button>
		);
	}

	return (
		<button type='button' onClick={togglePlayback} className={cn('relative size-10 inline-flex items-center justify-center shrink-0 rounded-full text-forest-700 drop-shadow-sm dark:text-sage-300 enabled:motion-safe:hover:scale-105 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2', className)} title={action} aria-label={`${action}: ${description}`} disabled={isMuted}>
			{ring}
			{icon}
		</button>
	);
};

export { AudioButton };
