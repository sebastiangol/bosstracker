import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlaythroughsAPI from '../apis/PlaythroughsAPI';
import Boss from '../components/Boss';
import Header from '../components/Header';
import Playthrough from '../components/Playthrough';
import { PlaythroughsContext } from '../context/PlaythroughsContext';

function DetailedPlaythrough() {
  const { id } = useParams();

  const {
    playthroughs,
    setPlaythroughs,
    bosses,
    setBosses,
    users,
    setUsers,
    search,
    setSearch,
    modalOpen,
    setModalOpen
  } = useContext(PlaythroughsContext);

  const [selectedPlaythrough, setSelectedPlaythrough] = useState([]);
  const [selectedBosses, setSelectedBosses] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PlaythroughsAPI.get(`/${id}`);
        setSelectedPlaythrough(response?.data.data.profile);
        setSelectedBosses(response?.data.data.bosses);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center text-center bg-teal-800 xl:max-w-6xl mx-auto p-4 m-4 mt-24 rounded-lg shadow-md min-h-[39.6rem]">
        <h2 className="text-6xl pb-2">{selectedPlaythrough.profile_name}</h2>
        <h4 className="pb-2 text-3xl">
          By{' '}
          {users.map(
            user =>
              selectedPlaythrough.user_id === user.user_id && user.user_name
          )}
        </h4>
        <div className="flex flex-col w-[33rem]">
          {selectedBosses.map((boss, index) => (
            <div className="flex justify-between first:border-t border-b p-1 border-amber-400 mr-3">
              <p className="flex items-center">{boss.boss_name}</p>
              <div className="mb-1">
                {boss.attempts} Attempts
                <div
                  className={`font-semibold rounded-lg ${
                    !boss.completed ? 'bg-red-500' : 'bg-green-600'
                  }`}
                >
                  <span className="font-semibold">
                    {!boss.completed ? 'Pending' : 'Victory'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DetailedPlaythrough;
