import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlaythroughsAPI from '../apis/PlaythroughsAPI';
import DetailedBoss from '../components/DetailedBoss';
import Header from '../components/Header';
import Playthrough from '../components/Playthrough';
import { PlaythroughsContext } from '../context/PlaythroughsContext';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import DeletePlaythrough from '../components/DeletePlaythrough';

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
    session,
    bossDeleted,
    setBossDeleted
  } = useContext(PlaythroughsContext);

  const [selectedPlaythrough, setSelectedPlaythrough] = useState([]);
  const [selectedBosses, setSelectedBosses] = useState([]);
  const [name, setName] = useState('');
  // const [attempts, setAttempts] = useState(0);
  // const [notes, setNotes] = useState('');
  // const [completed, setCompleted] = useState(false);
  const [missing, setMissing] = useState('');
  const [bossAdded, setBossAdded] = useState(0);
  const [isPublic, setIsPublic] = useState(true);
  const [profileName, setProfileName] = useState('');
  const [deletePTModal, setDeletePTModal] = useState(false);
  const [publicCount, setPublicCount] = useState(0);

  // Fetch selected playthrough
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PlaythroughsAPI.get(`/${id}`);
        setSelectedPlaythrough(response.data.data.profile);
        setSelectedBosses(response.data.data.bosses);
        const responseUsers = await PlaythroughsAPI.get('/');
        setUsers(responseUsers.data.data.users);
        setIsPublic(response.data.data.profile.profile_public);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    console.log(users);
    console.log(selectedPlaythrough);
  }, [bossAdded, bossDeleted]);

  // Add boss to playthrough
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

  // Update playthrough privacy
  useEffect(() => {
    const updatePublic = async () => {
      console.log(isPublic);
      try {
        const response = await PlaythroughsAPI.put(`/${id}`, {
          profile_public: isPublic
        });
        console.log(isPublic);
        console.log(response);
        console.log('Playthrough publicity updated successfully');
      } catch (err) {
        console.log(err);
      }
    };

    if (publicCount > 0) {
      updatePublic();
    }
    setPublicCount(publicCount + 1);
  }, [isPublic]);

  useEffect(() => {
    setMissing('');
  }, [name]);

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center text-center bg-teal-800 xl:max-w-6xl mx-auto p-4 m-4 mt-24 rounded-lg shadow-md min-h-[39.6rem] ">
        <div className="w-full">
          <h2 className="text-6xl pb-4">{selectedPlaythrough.profile_name}</h2>
          <h4 className="pb-4 text-3xl">
            By{' '}
            {users?.map(
              user =>
                selectedPlaythrough.user_id === user.user_id && user.user_name
            )}
          </h4>
          {selectedPlaythrough.user_id === session && (
            <div className="flex flex-col items-center w-full">
              <div className="flex justify-between w-[32rem] border-b border-amber-400 mb-6">
                <div className="flex justify-center items-center">
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
                    onClick={() => setIsPublic(!isPublic)}
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
                <div
                  className={`normal-button mr-1 bg-red-800 hover:bg-red-700 text-white border-white m-1`}
                  onClick={() => {
                    setDeletePTModal(true);
                  }}
                >
                  Delete Playthrough
                </div>
              </div>
              <form
                onSubmit={e => addBoss(e)}
                className="flex justify-center items-center h-14 bg-teal-800 rounded-lg shadow-md border border-amber-400 w-fit"
              >
                <p className="text-xl ml-1 w-[8.4rem] font-semibold">
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
          <div className="flex h-[60%] justify-center items-center mt-6">
            <h3 className="text-3xl">No bosses yet!</h3>
          </div>
        ) : (
          <div className="flex flex-col w-[33rem] mt-6">
            {selectedBosses?.map(boss => (
              <DetailedBoss
                key={boss.boss_id}
                id={boss.boss_id}
                name={boss.boss_name}
                attempts={boss.attempts}
                completed={boss.completed}
                selectedPlaythrough={selectedPlaythrough}
                session={session}
              />
            ))}
          </div>
        )}
      </div>
      <DeletePlaythrough
        deletePTModal={deletePTModal}
        setDeletePTModal={setDeletePTModal}
        id={id}
        name={selectedPlaythrough.profile_name}
      />
    </div>
  );
}

export default DetailedPlaythrough;
