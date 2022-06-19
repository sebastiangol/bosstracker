import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlaythroughsContext } from '../context/PlaythroughsContext';
import Boss from './Boss';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

function Playthrough({ id, name, creator, isPublic, location }) {
  const { bosses, users } = useContext(PlaythroughsContext);

  const [filteredBosses, setFilteredBosses] = useState([]);

  let navigate = useNavigate();

  const navDetailed = (e, id) => {
    e.preventDefault();
    navigate(`/profiles/${id}`);
  };

  // GET PLAYTHROUGH'S BOSSES
  useEffect(() => {
    setFilteredBosses(
      bosses?.filter((boss) => {
        if (boss.profile_id === id) {
          return boss;
        }
      })
    );
  }, [bosses]);

  return (
    <div
      onClick={(e) => navDetailed(e, id)}
      className='bg-teal-900 flex flex-col p-4 border border-amber-400 m-3 rounded-md shadow-xl hover:scale-105 hover:bg-teal-800 active:scale-100 transition-all duration-200 ease-in-out w-[33rem] xs:w-full cursor-pointer h-[26.3rem] relative'
    >
      {location === 'personal' && (
        <div className='absolute xs:top-[3.3rem] flex justify-center items-center border border-amber-400 shadow-md rounded-md p-1 bg-teal-900'>
          {!isPublic ? (
            <EyeOffIcon className='h-5 opacity-50' />
          ) : (
            <EyeIcon className='h-5' />
          )}
          {!isPublic ? (
            <span className='font-normal ml-1 opacity-80'>Private</span>
          ) : (
            <span className='font-semibold ml-1'>Public</span>
          )}
        </div>
      )}
      <h3 className='pb-1 text-4xl sm:text-3xl xs:text-2xl font-semibold'>
        {name}
      </h3>
      <h4 className='pb-2 sm:pb-3 xs:pb-4 text-xl'>
        By {users.map((user) => creator === user.user_id && user.user_name)}
      </h4>
      {filteredBosses?.length === 0 ? (
        <div className='flex h-[60%] justify-center items-center'>
          <h3 className='text-3xl'>No bosses yet!</h3>
        </div>
      ) : (
        <>
          <div className='absolute w-full h-3 bg-gradient-to-b from-teal-900 right-0 top-24'></div>
          <div className='flex flex-col overflow-y-scroll scrollbar-thin scrollbar-thumb-amber-400'>
            {filteredBosses.map(
              (boss, index) =>
                boss.profile_id === id && (
                  <Boss
                    key={boss.boss_id}
                    name={boss.boss_name}
                    attempts={boss.attempts}
                    status={boss.completed}
                  />
                )
            )}
          </div>
          <div className='absolute w-full h-3 bg-gradient-to-t from-teal-900 right-0 bottom-4'></div>
        </>
      )}
    </div>
  );
}

export default Playthrough;
