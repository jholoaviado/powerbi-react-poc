import { ReactNode } from 'react';
import { classNames } from '../../utils/common';

interface ITooltip {
	message: string | null,
	position: 'top' | 'left' | 'bottom' | 'right',
    children: ReactNode,
    className: string,
    isVisible?: boolean
}

const Tooltip= (props: ITooltip) => {

	return (
		<div className='group relative flex justify-center'>
			{props.children}
			<span className={classNames(
				'absolute scale-0 transition-all rounded',
				props.className,
				(props.position == 'top') ? 'bottom-10' : '',
				(props.position == 'left') ? 'right-10' : '',
				(props.position == 'bottom') ? 'top-10' : '',
				(props.position == 'right') ? 'left-10' : '',
				props.isVisible ? 'group-hover:scale-100' : '',
				
			)}>
				{props.isVisible ? props.message : null}
			</span>
		</div>
	);
};

export default Tooltip;