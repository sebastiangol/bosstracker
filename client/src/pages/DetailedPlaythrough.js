import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PlaythroughsAPI from '../apis/PlaythroughsAPI';
import CreatedBoss from '../components/CreateBoss';
import DetailedBoss from '../components/DetailedBoss';
import Header from '../components/Header';
import { PlaythroughsContext } from '../context/PlaythroughsContext';
import DeletePlaythrough from '../components/DeletePlaythrough';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import LoadingIcon from '../components/LoadingIcon';
import axios from 'axios';
import CreateBoss from '../components/CreateBoss';

function DetailedPlaythrough() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { users, setUsers, session, bossDeleted } =
    useContext(PlaythroughsContext);

  const [selectedPlaythrough, setSelectedPlaythrough] = useState([]);
  const [selectedBosses, setSelectedBosses] = useState([]);
  const [bossAdded, setBossAdded] = useState(0);
  const [isPublic, setIsPublic] = useState(true);
  const [deletePTModal, setDeletePTModal] = useState(false);
  const [publicCount, setPublicCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingPublic, setLoadingPublic] = useState(false);
  const [loadingNote, setLoadingNote] = useState(false);
  const [openNote, setOpenNote] = useState(0);
  const [refresh, setRefresh] = useState(0);
  // const [profileName, setProfileName] = useState('');

  // FETCH SELECTED PLAYTHROUGH
  useEffect(() => {
    let CancelToken = axios.CancelToken;
    let source = CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await PlaythroughsAPI.get(`/${id}`, {
          cancelToken: source.token,
        });
        setSelectedPlaythrough(response.data.data.profile);
        setSelectedBosses(response.data.data.bosses);
        const responseUsers = await PlaythroughsAPI.get('/', {
          cancelToken: source.token,
        });
        setUsers(responseUsers.data.data.users);
        setIsPublic(response.data.data.profile.profile_public);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchData();
    console.log(users);
    console.log(selectedPlaythrough);

    return () => {
      source.cancel('Fetch cancelled');
    };
  }, [bossAdded, bossDeleted, refresh]);

  // UPDATE PLAYTHROUGH PRIVACY
  useEffect(() => {
    let CancelToken = axios.CancelToken;
    let source = CancelToken.source();

    const updatePublic = async () => {
      setLoadingPublic(true);
      console.log(isPublic);
      try {
        const response = await PlaythroughsAPI.put(
          `/${id}`,
          {
            profile_public: isPublic,
          },
          { cancelToken: source.token }
        );
        console.log(isPublic);
        console.log(response);
        console.log('Playthrough publicity updated successfully');
      } catch (err) {
        console.log(err);
      }
      setLoadingPublic(false);
    };

    if (publicCount > 0) {
      updatePublic();
    }
    setPublicCount(publicCount + 1);

    return () => {
      source.cancel('Update cancelled');
    };
  }, [isPublic]);

  return (
    <div>
      <Header />
      <div className='flex flex-col items-center text-center bg-teal-800 w-[40rem] sm:w-[34rem] xs:w-[27rem] mx-auto p-4 m-4 mt-24 xl:mt-20 xl:pb-32 rounded-lg shadow-md min-h-[calc(100vh-7rem)] transition-all duration-150 ease-out relative'>
        <ArrowLeftIcon
          className='absolute left-4 h-8 hover:text-amber-300 cursor-pointer'
          onClick={() => navigate(-1 || '/')}
        />
        {loading ? (
          <div className='flex justify-center items-center h-screen'>
            <LoadingIcon />
          </div>
        ) : (
          <>
            <div className='w-[34rem] xs:w-[28rem] py-1'>
              <h2 className='text-6xl xl:text-5xl xs:text-4xl 2xs:text-3xl pb-4 xs:pb-2'>
                {selectedPlaythrough.profile_name}
              </h2>
              <h4 className='pb-4 xs:pb-2 text-3xl xs:text-2xl'>
                By{' '}
                {users?.map(
                  (user) =>
                    selectedPlaythrough.user_id === user.user_id &&
                    user.user_name
                )}
              </h4>
              {selectedPlaythrough.user_id === session && (
                <div className='flex flex-col items-center w-full'>
                  <div className='flex justify-between w-[32rem] xs:w-[25rem] border-b border-amber-400 mb-6 xs:text-sm'>
                    {/* CHANGE PRIVACY */}
                    <div className='flex justify-center items-center'>
                      <span
                        className={`transition-all duration-200 ease-out  ${
                          isPublic
                            ? 'font-extrabold scale-105'
                            : 'font-normal scale-90 opacity-50'
                        }`}
                      >
                        Public
                      </span>
                      <button
                        className='flex relative items-center justify-start bg-teal-900  border border-amber-400 w-16 m-2 h-6 rounded-3xl disabled:pointer-events-none'
                        disabled={loadingPublic}
                        onClick={() => setIsPublic(!isPublic)}
                      >
                        <div
                          className={`absolute cursor-pointer bg-amber-400 hover:bg-amber-300 w-7 m-2 h-5 rounded-3xl transition-all duration-200 ease-out ${
                            isPublic
                              ? 'left-[-0.39rem]'
                              : 'right-[-0.45rem] left-[1.56rem]'
                          }`}
                        ></div>
                      </button>
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
                    {/* DELETE PLAYTHROUGH */}
                    <div
                      className={`normal-button mr-1 bg-red-800 hover:bg-red-700 text-white border-white m-1`}
                      onClick={() => {
                        setDeletePTModal(true);
                      }}
                    >
                      Delete Playthrough
                    </div>
                  </div>

                  {/* CREATE BOSS */}
                  <CreateBoss
                    id={id}
                    bossAdded={bossAdded}
                    setBossAdded={setBossAdded}
                  />
                </div>
              )}
            </div>

            {/* BOSSES LIST */}
            {loading ? (
              <LoadingIcon />
            ) : selectedBosses.length === 0 ? (
              <div className='flex h-[60%] justify-center items-center mt-6'>
                <h3 className='text-3xl'>No bosses yet!</h3>
              </div>
            ) : (
              <ul className='flex flex-col w-[33rem] xs:w-full xs:text-sm mt-6'>
                {selectedBosses?.map((boss) => (
                  <DetailedBoss
                    key={boss.boss_id}
                    id={boss.boss_id}
                    name={boss.boss_name}
                    attempts={boss.attempts}
                    completed={boss.completed}
                    notes={boss.notes}
                    selectedPlaythrough={selectedPlaythrough}
                    openNote={openNote}
                    setOpenNote={setOpenNote}
                    loadingNote={loadingNote}
                    setLoadingNote={setLoadingNote}
                    refresh={refresh}
                    setRefresh={setRefresh}
                    session={session}
                  />
                ))}
              </ul>
            )}
          </>
        )}
      </div>
      {/* DELETE PLAYTHROUGH MODAL */}
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
