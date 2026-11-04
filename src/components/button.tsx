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

	const classes = cn(buttonVariants.base, buttonVariants.variant[variant], buttonVariants.size[size], buttonVariants.radius[radius], fullWidth && 'w-full', className);

	if (props.to !== undefined) {
		return <Link className={classes} {...props} />;
	}

	const { type = 'button', ...buttonProps } = props;

	return <button type={type} className={classes} {...buttonProps} />;
};

export { Button };
