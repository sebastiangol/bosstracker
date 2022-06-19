import React, { useContext } from 'react';
import imgLanding from '../images/landing.png';
import { PlaythroughsContext } from '../context/PlaythroughsContext';
import NewPlaythrough from './NewPlaythrough';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const { setModalOpen, session } = useContext(PlaythroughsContext);
  let navigate = useNavigate();

  // LANDING CREATE-PLAYTHROUGH BUTTON
  const openModalHandler = (e) => {
    e.preventDefault();
    session === -1 ? navigate('/login') : setModalOpen(true);
  };

  return (
    <div className='w-screen relative flex items-center justify-center sm:top-16 xs:top-12'>
      <img src={imgLanding} alt='' className='w-full' />
      <div className='absolute text-center text-5xl lg:text-4xl md:text-3xl sm:text-3xl xs:text-2xl 2xs:text-xl text-black font-bold flex flex-col justify-between top-56 xl:top-32 lg:top-32 md:top-28 sm:top-20 xs:top-20 2xs:top-6'>
        <h1 className='pb-16 lg:pb-8 md:pb-8 sm:pb-5 xs:pb-2'>
          Track Your Boss Progress
        </h1>
        <div className='flex flex-col items-center'>
          <h1>Browse Playthroughs Below</h1>
          <h1 className='p-6 lg:p-4 md:p-4 sm:p-2 xs:p-1'>Or</h1>
          <div
            className='cursor-pointer flex items-center justify-center p-2 text-amber-400 border-2 border-amber-400 rounded-md shadow-lg bg-teal-800 hover:bg-teal-700 w-fit hover:scale-105 active:scale-100 transition-all duration-150 ease-in-out'
            onClick={(e) => openModalHandler(e)}
          >
            Create one!
          </div>
        </div>
      </div>
      <NewPlaythrough />
    </div>
  );
}

export default Landing;
