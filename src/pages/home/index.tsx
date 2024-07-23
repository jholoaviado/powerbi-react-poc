// import { useState } from 'react';
// import { SessionExpiredModal } from '../../components/modals/sessionExipredModal';
import { PowerBIReport } from '../../components/powerbi';

export const Home = () => {
	// const [showModal, setShowmodal] = useState<boolean>(true);

	// const onClickContinue = () => {
	// 	return;
	// };

	// const onClickLeave = () => {
	// 	setShowmodal(false);
	// };

	return (
		<div className='flex w-full h-full justify-center items-center'>
			<PowerBIReport />
			{/* <SessionExpiredModal
				showModal={showModal}
				setShowmodal={setShowmodal}
				onClickContinue={onClickContinue}
				onClickLeave={onClickLeave}
			/> */}
		</div>
	);
};
