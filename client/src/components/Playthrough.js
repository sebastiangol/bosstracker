import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlaythroughsContext } from '../context/PlaythroughsContext';
import Boss from './Boss';

function Playthrough({ id, name, creator }) {
  const {
    playthroughs,
    setPlaythroughs,
    bosses,
    setBosses,
    users,
    setUsers,
    search,
    setSearch
  } = useContext(PlaythroughsContext);

  let navigate = useNavigate();

  const navDetailed = (e, id) => {
    e.preventDefault();
    navigate(`/profiles/${id}`);
  };

  return (
    <div
      onClick={e => navDetailed(e, id)}
      className="bg-teal-900 flex flex-col p-4 border border-amber-400 m-3 rounded-md shadow-lg hover:scale-105 hover:bg-teal-800 active:scale-100 transition-all duration-200 ease-in-out w-[33rem] cursor-pointer h-[26.3rem] relative"
    >
      <h3 className="pb-1 text-4xl">{name}</h3>
      <h4 className="pb-2 text-xl">
        By {users.map(user => creator === user.user_id && user.user_name)}
      </h4>
      <div className="absolute w-full h-3 bg-gradient-to-b from-teal-900 right-0 top-24"></div>
      <div className="flex flex-col overflow-y-scroll scrollbar-thin scrollbar-thumb-amber-400">
        {bosses.map(
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
      <div className="absolute w-full h-3 bg-gradient-to-t from-teal-900 right-0 bottom-4"></div>
    </div>
  );
}

export default Playthrough;
