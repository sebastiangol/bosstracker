import React, { useContext } from 'react';
import { PlaythroughsContext } from '../context/PlaythroughsContext';

function Boss({ name, attempts, status }) {
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

  return (
    <div className="flex justify-between first:border-t border-b p-1 border-amber-400 mr-3">
      <p className="flex items-center">{name}</p>
      <div className="mb-1">
        {attempts} Attempts
        <div
          className={`font-semibold rounded-lg ${
            !status ? 'bg-red-500' : 'bg-green-600'
          }`}
        >
          <span className="font-semibold">
            {!status ? 'Pending' : 'Victory'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Boss;
