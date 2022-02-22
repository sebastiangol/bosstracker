import React, { useContext, useEffect, useState } from 'react';
import { PlaythroughsContext } from '../context/PlaythroughsContext';
import Header from './Header';

function NewPlaythrough() {
  const { search, setSearch, loggedIn, setLoggedIn, modalOpen, setModalOpen } =
    useContext(PlaythroughsContext);
  const [isPublic, setIsPublic] = useState(true);
  const [name, setName] = useState('');
  useEffect(() => {
    setIsPublic(true);
    setName('');
  }, [modalOpen]);
  return (
    <div
      className={`fixed justify-center items-center left-0 top-0 h-screen w-screen ${
        modalOpen === true ? 'flex' : 'hidden'
      }`}
    >
      <div
        className={`fixed justify-center items-center left-0 top-0 h-screen w-screen opacity-40 bg-gray-500 ${
          modalOpen === true ? 'flex' : 'hidden'
        }`}
        onClick={() => setModalOpen(false)}
      ></div>
      <div className="relative flex flex-col h-fit items-center text-center bg-teal-800 rounded-lg shadow-md border border-amber-400 scale-150">
        <span
          className="absolute font-mono text-xs right-1 cursor-pointer"
          onClick={() => setModalOpen(false)}
        >
          x
        </span>
        <h2 className="text-3xl p-2">New Playthrough</h2>
        <form action="" className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Playthrough Name"
            onChange={e => {
              setName(e.target.value);
            }}
            value={name}
            className="text-field"
          />
          <div className="flex justify-center items-center" value={isPublic}>
            <span
              className={`transition-all duration-200 ease-out  ${
                isPublic
                  ? 'font-extrabold scale-105'
                  : 'font-normal scale-90 opacity-50'
              }`}
            >
              Public
            </span>
            <div
              className="flex relative items-center justify-start bg-teal-900  border border-amber-400 w-16 m-2 h-6 rounded-3xl"
              onClick={() =>
                isPublic ? setIsPublic(false) : setIsPublic(true)
              }
            >
              <div
                className={`absolute cursor-pointer bg-amber-400 hover:bg-amber-300 w-7 m-2 h-5 rounded-3xl transition-all duration-200 ease-out ${
                  isPublic
                    ? 'left-[-0.39rem]'
                    : 'right-[-0.45rem] left-[1.56rem]'
                }`}
              ></div>
            </div>
            <span
              className={`transition-all duration-200 ease-out ${
                !isPublic
                  ? 'font-extrabold scale-105'
                  : 'font-normal scale-90 opacity-50'
              }`}
            >
              Private
            </span>
          </div>
          <div className="normal-button">Create Playthrough</div>
        </form>
      </div>
    </div>
  );
}

export default NewPlaythrough;
