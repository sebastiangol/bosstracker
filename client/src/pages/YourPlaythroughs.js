import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import PlaythroughsAPI from '../apis/PlaythroughsAPI';
import { PlaythroughsContext } from '../context/PlaythroughsContext';
import Playthrough from '../components/Playthrough';
import { useNavigate, useParams } from 'react-router-dom';

function YourPlaythroughs() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    playthroughs,
    setPlaythroughs,
    bosses,
    setBosses,
    setUsers,
    search,
    setSearch,
    setModalOpen,
    session,
  } = useContext(PlaythroughsContext);

  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);

  // FETCH LOGGED-IN USER'S PLAYTHROUGHS
  useEffect(() => {
    id !== session &&
      (session === -1 ? navigate('/') : navigate(`/profiles/user/${session}`));
    setSearch('');
    const fetchData = async () => {
      try {
        const response = await PlaythroughsAPI.get(`/user/${id}`);
        setUsers(response.data.data.users);
        setPlaythroughs(response.data.data.profiles);
        setBosses(response.data.data.bosses);
        console.log(response);
        console.log(playthroughs);
        console.log(bosses);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // SEARCH FOR SPECIFIC PLAYTHROUGHS
  useEffect(() => {
    setFilteredData(
      playthroughs?.filter((playthrough) => {
        if (search === '') {
          return playthrough;
        } else if (
          (playthrough.profile_name &&
            playthrough?.profile_name
              .toString()
              .toLowerCase()
              .includes(search.toLowerCase())) ||
          (playthrough.user_name &&
            playthrough?.user_name
              .toString()
              .toLowerCase()
              .includes(search.toLowerCase()))
        ) {
          return playthrough;
        }
      })
    );
  }, [search, playthroughs]);

  return (
    <div>
      <Header />
      <div className='flex flex-col items-center text-center bg-teal-800 xl:max-w-6xl mx-auto p-4 m-4 mt-24 xl:mt-20 rounded-lg shadow-md min-h-[39.6rem] w-fit xl:mb-32'>
        <h2 className='text-6xl xs:text-5xl 2xs:text-4xl pb-6'>
          Your Playthroughs
        </h2>
        <div
          className={`${
            loading || playthroughs?.length === 0 || filteredData?.length === 0
              ? 'flex'
              : 'grid grid-cols-2 xl:flex xl:flex-col xl:items-center'
          }`}
        >
          {loading ? (
            <p className='text-3xl m-4'>...loading...</p>
          ) : playthroughs?.length === 0 ? (
            <div className='flex flex-col justify-center items-center'>
              <p className='text-3xl m-4'>You have no playthroughs yet!</p>
              <div
                className='cursor-pointer flex items-center justify-center p-2 text-amber-400 border-2 border-amber-400 rounded-md shadow-lg bg-teal-800 hover:bg-teal-700 text-2xl font-bold w-fit hover:scale-105 active:scale-100 transition-all duration-150 ease-in-out'
                onClick={() => setModalOpen(true)}
              >
                Create one!
              </div>
            </div>
          ) : filteredData?.length === 0 ? (
            <div className='flex justify-center items-center text-3xl m-4'>
              Your search found no results.
            </div>
          ) : (
            filteredData?.map((playthrough) => (
              <Playthrough
                key={playthrough.profile_id}
                id={playthrough.profile_id}
                name={playthrough.profile_name}
                creator={playthrough.user_id}
                isPublic={playthrough.profile_public}
                location='personal'
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default YourPlaythroughs;
