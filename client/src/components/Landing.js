import React, { useContext } from 'react';
import imgLanding from '../images/landing.png';
import { PlaythroughsContext } from '../context/PlaythroughsContext';
import NewPlaythrough from './NewPlaythrough';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const { modalOpen, setModalOpen, session } = useContext(PlaythroughsContext);
  let navigate = useNavigate();
  const openModalHandler = e => {
    e.preventDefault();
    session === -1 ? navigate('/login') : setModalOpen(true);
  };

  return (
    <div className="w-screen relative flex items-center justify-center">
      <img src={imgLanding} alt="" className="w-full" />
      <div className="absolute text-center text-5xl text-black font-bold flex flex-col justify-between top-64">
        <h1 className="pb-16">Track Your Boss Progress</h1>
        <div className="flex flex-col items-center">
          <h1>Browse Playthroughs Below</h1>
          <h1 className="p-6">Or</h1>
          <div
            className="cursor-pointer flex items-center justify-center p-2 text-amber-400 border-2 border-amber-400 rounded-md shadow-lg bg-teal-800 hover:bg-teal-700 w-fit hover:scale-105 active:scale-100 transition-all duration-150 ease-in-out"
            onClick={e => openModalHandler(e)}
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
