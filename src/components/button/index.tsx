import React, { forwardRef, ForwardedRef } from 'react';
import { classNames } from '../../utils/common';

interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	variant?: 'primary' | 'secondary' | 'danger' | 'orange' | 'gray';
	className?: string;
	disabled?: boolean;
	type?: 'button' | 'submit';
	form?: string | undefined;
	selected?: boolean;
}
const isSelected = (selected?: boolean) => {
	return selected === true
		? 'bg-primary text-white'
		: selected === false
			? 'text-black bg-transparent'
			: '';
};

const Button = forwardRef(function Button(
	{
		onClick,
		children,
		type,
		form,
		className,
		variant,
		disabled,
		selected = false || undefined,
	}: ButtonProps,
	ref: ForwardedRef<HTMLButtonElement>
) {
	const primaryClass =
		'bg-yellow-500 hover:bg-yellow-600 hover:border-white border-transparent disabled:bg-[#E0781D] text-white';
	const secondaryClass =
		'bg-white text-yellow-500 hover:bg-gray-100 hover:border-black border-yellow-500 disabled:bg-white';
	const dangerClass =
		'bg-custom-red-500 hover:bg-custom-red-600 border-transparent disabled:bg-custom-red-500 text-white';
	const orangeClass =
		'bg-[#E0781D] hover:bg-[#E0781D] border-transparent disabled:bg-[#E0781D] text-white';
	const grayClass =
		'bg-[#ECEAEA] hover:bg-[#ECEAEA] border-transparent disabled:bg-[#E0781D] text-black';
	
	return (
		<button
			ref={ref}
			type={type}
			form={form}
			onClick={onClick}
			className={classNames(
				className ? className : '',
				isSelected(selected),
				variant === 'primary' ? primaryClass : '',
				variant === 'secondary' ? secondaryClass : '',
				variant === 'danger' ? dangerClass : '',
				variant === 'orange' ? orangeClass : '',
				variant === 'gray' ? grayClass : '',
				'border rounded-[5px] shadow-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'
			)}
			disabled={disabled}
		>
			{children}
		</button>
	);
});

Button.displayName = 'Button';

export default Button;