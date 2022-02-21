import React from 'react';
import imgLanding from '../images/landing.png';

function Landing() {
  return (
    <div className="w-screen relative flex items-center justify-center">
      <img src={imgLanding} alt="" className="w-full" />
      <div className="absolute text-center text-5xl text-black font-bold flex flex-col justify-between top-64">
        <h1 className="pb-16">Track Your Boss Progress</h1>
        <div className="flex flex-col items-center">
          <h1>Browse Playthroughs Below</h1>
          <h1 className="p-6">Or</h1>
          <div className="cursor-pointer flex items-center justify-center p-2 text-amber-400 border-2 border-amber-400 rounded-md shadow-lg bg-teal-800 w-fit hover:scale-105 active:scale-100 transition-transform duration-150 ease-out">
            Create one!
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
