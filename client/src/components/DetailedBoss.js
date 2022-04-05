import React, { useState } from 'react';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import DeleteBoss from './DeleteBoss';

function DetailedBoss({
  id,
  name,
  attempts,
  completed,
  selectedPlaythrough,
  session
}) {
  const [bossTooltip, setBossTooltip] = useState(false);
  const [deleteBossModal, setDeleteBossModal] = useState(false);
  return (
    <div
      key={id}
      className="flex justify-between first:border-t border-b p-1 border-amber-400 transition-all duration-150 ease-in-out"
    >
      <p className="flex items-center">{name}</p>
      <div className="flex transition-all duration-150 ease-in-out">
        <div className="mb-1 transition-all duration-150 ease-in-out">
          {attempts} Attempts
          <div
            className={`font-semibold rounded-lg transition-all duration-150 ease-in-out ${
              !completed ? 'bg-red-500' : 'bg-green-600'
            }`}
          >
            <span className="font-semibold transition-all duration-150 ease-in-out">
              {!completed ? 'Pending' : 'Victory'}
            </span>
          </div>
        </div>
        {selectedPlaythrough.user_id === session && (
          <div className="flex items-center ml-1 transition-all duration-150 ease-in-out origin">
            <DotsVerticalIcon
              className="h-6 cursor-pointer opacity-60 hover:opacity-100 active:scale-90 transition-all duration-150 ease-out z-0"
              onClick={() => setBossTooltip(true)}
            />
            <div
              className={`${
                bossTooltip ? 'flex' : 'hidden'
              } transition-all duration-150 ease-in-out h-full items-center`}
            >
              <div
                className="fixed h-screen w-screen top-0 left-0 z-10"
                onClick={() => setBossTooltip(false)}
              ></div>
              <span
                className={`relative ${
                  bossTooltip ? 'scale-100' : 'scale-0'
                } flex transition-all duration-150 ease-in-out cursor-pointer z-20 text-white text-lg active:text-gray-300 px-1 bg-red-800 hover:bg-red-700 active:bg-red-800 h-full items-center border-white border-2 rounded-md`}
                onClick={() => {
                  setDeleteBossModal(true);
                  setBossTooltip(false);
                }}
              >
                Delete
              </span>
            </div>
          </div>
        )}
      </div>
      <DeleteBoss
        deleteBossModal={deleteBossModal}
        setDeleteBossModal={setDeleteBossModal}
        id={id}
        name={name}
      />
    </div>
  );
}

export default DetailedBoss;
