import { cn } from '@/lib';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon';
type ButtonRadius = 'md' | 'lg' | 'full';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: ButtonVariant;
	size?: ButtonSize;
	radius?: ButtonRadius;
	fullWidth?: boolean;
};

const buttonVariants = {
	base: 'inline-flex select-none items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50',
	variant: {
		primary: 'bg-forest-800 text-white hover:bg-forest-800/90 focus-visible:outline-forest-800',
		secondary: 'bg-sage-200 text-forest-950 hover:bg-sage-300 focus-visible:outline-forest-800',
		outline: 'border border-forest-800 bg-transparent text-forest-800 hover:bg-forest-800 hover:text-white focus-visible:outline-forest-800',
		ghost: 'bg-transparent text-forest-800 hover:bg-cream-200 focus-visible:outline-forest-800',
		danger: 'bg-red-700 text-white hover:bg-red-800 focus-visible:outline-red-700',
	},
	size: {
		xs: 'min-h-8 px-2.5 text-xs',
		sm: 'min-h-9 px-3 text-sm',
		md: 'min-h-10 px-4 text-sm',
		lg: 'min-h-11 px-5 text-base',
		xl: 'min-h-13 px-7 text-lg',
		icon: 'size-10 p-0',
	},
	radius: {
		md: 'rounded-lg',
		lg: 'rounded-xl',
		full: 'rounded-full',
	},
} as const;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = 'primary', size = 'md', radius = 'lg', fullWidth = false, type = 'button', ...props }, ref) => (
		<button
			ref={ref}
			type={type}
			className={cn(buttonVariants.base, buttonVariants.variant[variant], buttonVariants.size[size], buttonVariants.radius[radius], fullWidth && 'w-full', className)}
			{...props}
		/>
	),
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps, ButtonRadius, ButtonSize, ButtonVariant };
