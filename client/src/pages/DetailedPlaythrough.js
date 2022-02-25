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
    setModalOpen,
    session
  } = useContext(PlaythroughsContext);

  const [selectedPlaythrough, setSelectedPlaythrough] = useState([]);
  const [selectedBosses, setSelectedBosses] = useState([]);
  const [name, setName] = useState('');
  // const [attempts, setAttempts] = useState(0);
  // const [notes, setNotes] = useState('');
  // const [completed, setCompleted] = useState(false);
  const [missing, setMissing] = useState('');
  const [bossAdded, setBossAdded] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PlaythroughsAPI.get(`/${id}`);
        setSelectedPlaythrough(response.data.data.profile);
        setSelectedBosses(response.data.data.bosses);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    console.log(users);
    console.log(selectedPlaythrough);
  }, [bossAdded]);

  const addBoss = async e => {
    e.preventDefault();
    if (!name.trim()) {
      console.log('You must enter a boss name');
      setMissing('You must enter a boss name');
      return;
    }

    try {
      const response = await PlaythroughsAPI.post(`/${id}`, {
        profile_id: id,
        boss_name: name,
        attempts: 0,
        notes: '',
        completed: false
      });
      console.log(response);
      console.log('Success! The boss was created.');
      setName('');
      setBossAdded(bossAdded + 1);
    } catch (err) {
      console.log(err);
      setMissing('Something went wrong');
    }
  };

  useEffect(() => {
    setMissing('');
  }, [name]);

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center text-center bg-teal-800 xl:max-w-6xl mx-auto p-4 m-4 mt-24 rounded-lg shadow-md min-h-[39.6rem] h-[39.6rem]">
        <div className="w-full">
          <h2 className="text-6xl pb-4">{selectedPlaythrough.profile_name}</h2>
          <h4 className="pb-4 text-3xl">
            By{' '}
            {users.map(
              user =>
                selectedPlaythrough.user_id === user.user_id && user.user_name
            )}
          </h4>
          {selectedPlaythrough.user_id === session && (
            <div className="flex flex-col items-center w-full">
              <form
                onSubmit={e => addBoss(e)}
                className="flex justify-center items-center h-14 bg-teal-800 rounded-lg shadow-md border border-amber-400 w-fit"
              >
                <p className="text-2xl ml-1 w-28 font-semibold">
                  Create a Boss
                </p>
                <input
                  className="text-field w-60"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Boss Name"
                />
                <button
                  type="submit"
                  className="normal-button m-0 text-lg mr-1 w-28"
                >
                  Create
                </button>
              </form>
              <p className="text-red-500 text-lg">{missing}</p>
            </div>
          )}
        </div>
        {selectedBosses.length === 0 ? (
          <div className="flex h-[60%] justify-center items-center ">
            <h3 className="text-3xl">No bosses yet!</h3>
          </div>
        ) : (
          <div className="flex flex-col w-[33rem] mt-6">
            {selectedBosses?.map(boss => (
              <div
                key={boss.boss_id}
                className="flex justify-between first:border-t border-b p-1 border-amber-400 mr-3"
              >
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
        )}
      </div>
    </div>
  );
}

export default DetailedPlaythrough;
