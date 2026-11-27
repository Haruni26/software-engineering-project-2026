import { cn } from '@/lib';
import type { ButtonRadiusType, ButtonSizeType, ButtonVariantType } from '@/types';
import { type ComponentPropsWithRef, type FC } from 'react';
import { Link } from 'react-router-dom';

type ButtonStyleProps = {
	variant?: ButtonVariantType;
	size?: ButtonSizeType;
	radius?: ButtonRadiusType;
	fullWidth?: boolean;
};

type ButtonProps = ButtonStyleProps & ((Omit<ComponentPropsWithRef<'button'>, keyof ButtonStyleProps> & { to?: never }) | Omit<ComponentPropsWithRef<typeof Link>, keyof ButtonStyleProps>);

const Button: FC<ButtonProps> = ({ className, variant = 'primary', size = 'md', radius = 'lg', fullWidth = false, ...props }) => {
	const buttonVariants = {
		base: 'btn',
		variant: {
			primary: 'btn-primary',
			secondary: 'btn-secondary',
			outline: cn(
				'border border-forest-700 bg-transparent text-forest-700',
				'hover:bg-forest-700 hover:text-white focus-visible:outline-forest-700',
				'dark:border-cream-300 dark:text-cream-50 dark:hover:bg-cream-300 dark:hover:text-forest-800 dark:focus-visible:outline-cream-300',
			),
			ghost: cn(
				'bg-transparent text-forest-700',
				'hover:bg-cream-200 focus-visible:outline-forest-700',
				'dark:text-cream-50 dark:hover:bg-forest-700 dark:focus-visible:outline-cream-300',
			),
			danger: cn(
				'bg-forest-950 text-white',
				'hover:bg-forest-800 focus-visible:outline-forest-950',
				'dark:bg-cream-50 dark:text-forest-950 dark:hover:bg-cream-200 dark:focus-visible:outline-cream-300',
			),
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

	const classes = cn(buttonVariants.base, buttonVariants.variant[variant], buttonVariants.size[size], buttonVariants.radius[radius], fullWidth && 'w-full', className);

		if ('to' in props && props.to !== undefined) {
		return <Link className={classes} {...(props as ComponentPropsWithRef<typeof Link>)} />;
	}

	const { type = 'button', ...buttonProps } = props as ComponentPropsWithRef<'button'>;

	return <button type={type} className={classes} {...buttonProps} />;
};

export { Button };