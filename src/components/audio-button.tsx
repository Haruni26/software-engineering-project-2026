import { Pause, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, type FC } from 'react';

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

export { AudioButton };
