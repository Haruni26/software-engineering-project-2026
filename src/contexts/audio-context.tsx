import { useMotionValue, type MotionValue } from 'motion/react';
import { createContext, useCallback, useContext, useEffect, useRef, useState, type FC, type PropsWithChildren } from 'react';

type LanguageType = 'en' | 'fr' | 'mic';
type AudioStatusType = 'idle' | 'playing' | 'paused';
type TranslationsType = Partial<Record<LanguageType, string>>;
type AudioSourcesType = Partial<Record<LanguageType, string>>;

interface AudioContextValueType {
	language: LanguageType;
	status: AudioStatusType;
	rate: number;
	supported: boolean;
	isPlaying: boolean;
	isPaused: boolean;
	isMuted: boolean;
	toggleMute: () => void;
	hasContent: boolean;
	activeButton: string | null;
	progress: MotionValue<number>;
	error: string | null;
	setLanguage: (language: LanguageType) => void;
	setRate: (rate: number) => void;
	play: (translations?: TranslationsType, sources?: AudioSourcesType, buttonId?: string) => void;
	pause: () => void;
	resume: () => void;
	stop: (buttonId?: string) => void;
	restart: () => void;
	registerContent: (translations: TranslationsType, sources?: AudioSourcesType) => () => void;
}

const AudioContext = createContext<AudioContextValueType | undefined>(undefined);

const AUDIO_LANGUAGE_STORAGE_KEY = 'audio-language';

const LOCALES: Record<LanguageType, string> = {
	en: 'en-CA',
	fr: 'fr-CA',
	mic: 'mic',
};

const AudioProvider: FC<PropsWithChildren> = ({ children }) => {
	const [language, setLanguageState] = useState<LanguageType>(() => {
		if (typeof window === 'undefined') {
			return 'en';
		}

		try {
			const storedLanguage = window.localStorage.getItem(AUDIO_LANGUAGE_STORAGE_KEY);
			return storedLanguage === 'en' || storedLanguage === 'fr' || storedLanguage === 'mic' ? storedLanguage : 'en';
		} catch {
			return 'en';
		}
	});
	const [status, setStatus] = useState<AudioStatusType>('idle');
	const [isMuted, setIsMuted] = useState(false);
	const [rate, setRateState] = useState<number>(1);
	const [activeButton, setActiveButton] = useState<string | null>(null);
	const activeButtonRef = useRef<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [hasContent, setHasContent] = useState<boolean>(false);

	const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
	const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const progress = useMotionValue(0);
	const speechTiming = useRef({ duration: 0, elapsed: 0, started: false });

	useEffect(() => {
		if (status !== 'playing') {
			return;
		}

		let frame = 0;
		let previousTime = performance.now();

		const updateProgress = (now: number) => {
			const audio = audioRef.current;
			const timing = speechTiming.current;

			if (audio && Number.isFinite(audio.duration) && audio.duration > 0) {
				progress.set(Math.min(1, audio.currentTime / audio.duration));
			} else if (timing.started) {
				timing.elapsed += now - previousTime;
				progress.set(Math.min(0.99, timing.elapsed / timing.duration));
			}

			previousTime = now;
			frame = requestAnimationFrame(updateProgress);
		};

		frame = requestAnimationFrame(updateProgress);
		return () => cancelAnimationFrame(frame);
	}, [activeButton, progress, status]);
	const translationsRef = useRef<TranslationsType | null>(null);
	const sourcesRef = useRef<AudioSourcesType | null>(null);

	const clearPlayback = useCallback((completed = false) => {
		activeButtonRef.current = null;
		speechTiming.current = { duration: 0, elapsed: 0, started: false };
		progress.set(completed ? 1 : 0);
		setActiveButton(null);
		setStatus('idle');
	}, [progress]);

	const stop = useCallback((buttonId?: string) => {
		if (buttonId !== undefined && activeButtonRef.current !== buttonId) {
			return;
		}

		if (utteranceRef.current) {
			utteranceRef.current.onstart = null;
			utteranceRef.current.onend = null;
			utteranceRef.current.onerror = null;
			utteranceRef.current = null;
		}

		if (supported) {
			window.speechSynthesis.cancel();
		}

		if (audioRef.current) {
			audioRef.current.pause();
			audioRef.current.onended = null;
			audioRef.current.onerror = null;
			audioRef.current.src = '';
			audioRef.current = null;
		}

		clearPlayback();
	}, [clearPlayback, supported]);

	const toggleMute = useCallback(() => {
		if (!isMuted) {
			stop();
			setError(null);
		}

		setIsMuted(!isMuted);
	}, [isMuted, stop]);

	const speak = useCallback(
		(translations: TranslationsType, sources: AudioSourcesType | null, selectedLanguage: LanguageType, selectedRate: number, buttonId: string | null = null) => {
			stop();
			setError(null);

			const source = sources?.[selectedLanguage];

			const startPlayback = () => {
				activeButtonRef.current = buttonId;
				setActiveButton(buttonId);
				setStatus('playing');
			};

			if (source) {
				const audio = new Audio(source);

				audio.playbackRate = selectedRate;
				audioRef.current = audio;

				audio.onended = () => {
					if (audioRef.current !== audio) {
						return;
					}

					audioRef.current = null;
					clearPlayback(true);
				};

				audio.onerror = () => {
					if (audioRef.current !== audio) {
						return;
					}

					audioRef.current = null;
					clearPlayback();
					setError('Unable to load the audio recording');
				};

				startPlayback();
				void audio.play().catch((error: unknown) => {
					if (audioRef.current !== audio || (error instanceof DOMException && error.name === 'AbortError')) {
						return;
					}

					audioRef.current = null;
					clearPlayback();
					setError('Unable to play the audio recording');
				});

				return;
			}

			if (selectedLanguage === 'mic') {
				setError("A Mi'kmaq audio recording is not available");
				return;
			}

			if (!supported) {
				setError('Text-to-speech is not supported by this browser');
				return;
			}

			const text = translations[selectedLanguage]?.trim();

			if (!text) {
				setError('No text is available for this language');
				return;
			}

			const synth = window.speechSynthesis;
			const utterance = new SpeechSynthesisUtterance(text);
			const locale = LOCALES[selectedLanguage];

			const voices = synth.getVoices();
			const voice = voices.find((voice) => voice.lang.toLowerCase() === locale.toLowerCase()) ?? voices.find((voice) => voice.lang.toLowerCase().split('-')[0] === selectedLanguage);

			if (!voice && voices.length > 0) {
				setError('No compatible speech voice is available for this language');
				return;
			}

			utterance.lang = voice?.lang ?? locale;
			utterance.voice = voice ?? null;
			utterance.rate = selectedRate;
			utterance.pitch = 1;
			utterance.volume = 1;

			const estimatedDuration = (text.split(/\s+/).length / 2.5 / selectedRate) * 1000;
			speechTiming.current.duration = estimatedDuration;
			utterance.onstart = () => {
				if (utteranceRef.current === utterance) {
					speechTiming.current.started = true;
				}
			};

			utterance.onend = () => {
				if (utteranceRef.current === utterance) {
					utteranceRef.current = null;
					clearPlayback(true);
				}
			};

			utterance.onerror = (event) => {
				if (utteranceRef.current !== utterance) {
					return;
				}

				utteranceRef.current = null;
				clearPlayback();

				if (event.error !== 'canceled' && event.error !== 'interrupted') {
					setError('Speech playback failed');
				}
			};

			utteranceRef.current = utterance;
			startPlayback();
			synth.speak(utterance);

			if (synth.paused) {
				synth.resume();
			}
		},
		[clearPlayback, stop, supported],
	);

	const resume = useCallback(() => {
		if (status !== 'paused') {
			return;
		}

		const audio = audioRef.current;

		if (audio) {
			setError(null);
			setStatus('playing');
			void audio.play().catch((error: unknown) => {
				if (audioRef.current === audio && !(error instanceof DOMException && error.name === 'AbortError')) {
					setStatus('paused');
					setError('Unable to resume audio.');
				}
			});
		} else if (supported && utteranceRef.current) {
			window.speechSynthesis.resume();
			setStatus('playing');
		}
	}, [status, supported]);

	const play = useCallback(
		(translations?: TranslationsType, sources?: AudioSourcesType, buttonId?: string) => {
			if (isMuted) {
				return;
			}

			if (buttonId !== undefined) {
				speak(translations ?? {}, sources ?? null, language, rate, buttonId);
				return;
			}

			if (!translations && status === 'paused') {
				resume();
				return;
			}

			if (translations) {
				translationsRef.current = translations;
				sourcesRef.current = sources ?? null;
				setHasContent(true);
			}

			if (translationsRef.current) {
				speak(translationsRef.current, sourcesRef.current, language, rate);
			}
		},
		[isMuted, language, rate, resume, speak, status],
	);

	const pause = useCallback(() => {
		if (audioRef.current) {
			audioRef.current.pause();
			setStatus('paused');
			return;
		}

		if (supported && utteranceRef.current) {
			window.speechSynthesis.pause();
			setStatus('paused');
		}
	}, [supported]);

	const restart = useCallback(() => {
		if (!isMuted && translationsRef.current) {
			speak(translationsRef.current, sourcesRef.current, language, rate);
		}
	}, [isMuted, language, rate, speak]);

	const setLanguage = useCallback(
		(nextLanguage: LanguageType) => {
			stop();
			setError(null);
			setLanguageState(nextLanguage);

			try {
				window.localStorage.setItem(AUDIO_LANGUAGE_STORAGE_KEY, nextLanguage);
			} catch {
				// The selection still works for the current visit if storage is unavailable.
			}
		},
		[stop],
	);

	const setRate = useCallback((nextRate: number) => {
		const safeRate = Math.min(2, Math.max(0.5, nextRate));

		setRateState(safeRate);

		if (audioRef.current) {
			audioRef.current.playbackRate = safeRate;
		}
	}, []);

	const registerContent = useCallback(
		(translations: TranslationsType, sources?: AudioSourcesType) => {
			translationsRef.current = translations;
			sourcesRef.current = sources ?? null;
			setHasContent(true);
			setError(null);

			return () => {
				stop();
				translationsRef.current = null;
				sourcesRef.current = null;
				setHasContent(false);
				setError(null);
			};
		},
		[stop],
	);

	useEffect(() => {
		return () => {
			stop();
		};
	}, [stop]);

	return (
		<AudioContext.Provider
			value={{
				language,
				status,
				rate,
				supported,
				isPlaying: status === 'playing',
				isPaused: status === 'paused',
				isMuted,
				toggleMute,
				hasContent,
				activeButton,
				progress,
				error,
				setLanguage,
				setRate,
				play,
				pause,
				resume,
				stop,
				restart,
				registerContent,
			}}>
			{children}
		</AudioContext.Provider>
	);
};

const useAudio = () => {
	const context = useContext(AudioContext);

	if (!context) {
		throw new Error('useAudio must be used within an AudioProvider');
	}

	return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AudioProvider, useAudio };
export type { AudioSourcesType, AudioStatusType, LanguageType, TranslationsType };
