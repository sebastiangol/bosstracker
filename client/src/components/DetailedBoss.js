import React, { useState } from 'react';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { MinusCircleIcon } from '@heroicons/react/outline';
import DeleteBoss from './DeleteBoss';
import BossesAPI from '../apis/BossesAPI';

function DetailedBoss({
  id,
  name,
  attempts,
  completed,
  selectedPlaythrough,
  session,
  refresh,
  setRefresh,
}) {
  const [bossTooltip, setBossTooltip] = useState(false);
  const [deleteBossModal, setDeleteBossModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [compLoading, setCompLoading] = useState(false);

  const plusAttempt = async (e) => {
    e.preventDefault();
    if (attempts + 1 === 1000) {
      return;
    }

    setLoading(true);
    try {
      const response = await BossesAPI.put(`/${id}/attempts`, {
        attempts: attempts + 1,
      });
      setRefresh(refresh + 1);
      setLoading(false);
      console.log(response);
      console.log('The boss attempts was updated.');
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const minusAttempt = async (e) => {
    e.preventDefault();
    if (attempts - 1 === -1) {
      return;
    }

    setLoading(true);
    try {
      const response = await BossesAPI.put(`/${id}/attempts`, {
        attempts: attempts - 1,
      });
      setRefresh(refresh + 1);
      setLoading(false);
      console.log(response);
      console.log('The boss attempts was updated.');
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const changeCompleted = async (e) => {
    e.preventDefault();
    setCompLoading(true);
    try {
      const response = await BossesAPI.put(`/${id}/completed`, {
        completed: !completed,
      });
      setRefresh(refresh + 1);
      setCompLoading(false);
      console.log(response);
      console.log('The boss attempts was updated.');
    } catch (err) {
      setCompLoading(false);
      console.log(err);
    }
  };

  return (
    <div
      key={id}
      className='flex justify-between first:border-t border-b p-1 2xs:p-[0.15rem] border-amber-400 transition-all duration-150 ease-in-out'
    >
      <p className='flex items-center justify-start'>{name}</p>
      <div className='flex transition-all duration-150 ease-in-out'>
        <div className='mb-1 transition-all duration-150 ease-in-out w-32'>
          <div className='flex items-center mb-[0.12rem] justify-end'>
            <p className='mr-1'>{attempts} Attempts</p>
            {selectedPlaythrough.user_id === session && (
              <>
                <button
                  className={`rounded-full shadow-md ${
                    !loading &&
                    'hover:bg-teal-700 active:bg-teal-800 cursor-pointer'
                  }active:scale-95 transition-all duration-150 ease-out disabled:opacity-50`}
                  onClick={(e) => plusAttempt(e)}
                  disabled={loading}
                >
                  <PlusCircleIcon className='h-6' />
                </button>
                <button
                  className={`rounded-full shadow-md ${
                    !loading &&
                    'hover:bg-teal-700 active:bg-teal-800 cursor-pointer'
                  } active:scale-95 transition-all duration-150 ease-out disabled:opacity-50`}
                  onClick={(e) => minusAttempt(e)}
                  disabled={loading}
                >
                  <MinusCircleIcon className='h-6' />
                </button>
              </>
            )}
          </div>
          <div className='flex justify-end'>
            <button
              className={`font-semibold rounded-lg transition-all duration-150 ease-in-out w-16 h-6 flex justify-center items-center shadow-md border border-amber-400 ${
                compLoading && 'opacity-50 scale-90'
              } ${!completed ? 'bg-red-600' : 'bg-green-600'} ${
                selectedPlaythrough.user_id === session &&
                `${
                  !completed
                    ? 'hover:bg-red-500 active:bg-red-600'
                    : 'hover:bg-green-500 active:bg-green-600'
                }`
              }`}
              onClick={(e) => changeCompleted(e)}
              disabled={selectedPlaythrough.user_id !== session || compLoading}
            >
              {!completed ? 'Pending' : 'Victory'}
            </button>
          </div>
        </div>
        {selectedPlaythrough.user_id === session && (
          <div className='flex items-center ml-1 transition-all duration-150 ease-in-out origin'>
            <DotsVerticalIcon
              className='h-6 cursor-pointer opacity-60 hover:opacity-100 active:scale-90 transition-all duration-150 ease-out z-0'
              onClick={() => setBossTooltip(true)}
            />
            <div
              className={`${
                bossTooltip ? 'flex' : 'hidden'
              } transition-all duration-150 ease-in-out h-full items-center`}
            >
              <div
                className='fixed h-screen w-screen top-0 left-0 z-10'
                onClick={() => setBossTooltip(false)}
              ></div>
              <span
                className={`relative ${
                  bossTooltip ? 'scale-100' : 'scale-0'
                } flex transition-all duration-150 ease-in-out cursor-pointer z-20 text-white text-lg xs:text-sm active:text-gray-300 px-1 bg-red-800 hover:bg-red-700 active:bg-red-800 h-full items-center border-white border-2 rounded-md`}
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
