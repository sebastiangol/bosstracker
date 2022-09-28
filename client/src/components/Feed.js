import React, { useContext, useEffect, useState } from 'react';
import PlaythroughsAPI from '../apis/PlaythroughsAPI';
import { PlaythroughsContext } from '../context/PlaythroughsContext';
import Playthrough from './Playthrough';
import LoadingIcon from './LoadingIcon.js';
import axios from 'axios';

function Feed() {
  const {
    playthroughs,
    setPlaythroughs,
    bosses,
    setBosses,
    setUsers,
    search,
    setSearch,
  } = useContext(PlaythroughsContext);

  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH ALL PLAYTHROUGHS
  useEffect(() => {
    setSearch('');
    let CancelToken = axios.CancelToken;
    let source = CancelToken.source();
    const fetchData = async () => {
      try {
        const response = await PlaythroughsAPI.get('/', {
          cancelToken: source.token,
        });
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

    return () => {
      source.cancel('Fetch cancelled');
    };
  }, []);

  // SEARCH FOR SPECIFIC PLAYTHROUGHS
  useEffect(() => {
    setFilteredData(
      playthroughs?.filter((playthrough) => {
        if (search === '') {
          return playthrough;
        } else if (
          (playthrough.profile_public &&
            playthrough.profile_name &&
            playthrough?.profile_name
              .toString()
              .toLowerCase()
              .includes(search.toLowerCase())) ||
          (playthrough.profile_public &&
            playthrough.user_name &&
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
    <div className='flex flex-col items-center text-center bg-teal-800  mx-auto p-4 m-4 mt-0 rounded-lg shadow-md w-fit xl:mb-32 sm:mt-16 xs:mt-12'>
      <h2 className='text-6xl md:text-4xl xs:text-3xl pb-6 md:pb-2'>
        Public Playthroughs
      </h2>
      <div
        className={`${
          loading || playthroughs?.length === 0 || filteredData?.length === 0
            ? 'flex'
            : 'grid grid-cols-2 xl:flex xl:flex-col xl:items-center '
        }`}
      >
        {loading ? (
          <LoadingIcon />
        ) : playthroughs?.length === 0 ? (
          <div className='flex justify-center items-center text-3xl m-4'>
            No playthroughs were found.
          </div>
        ) : filteredData?.length === 0 ? (
          <div className='flex justify-center items-center text-3xl m-4'>
            Your search found no results.
          </div>
        ) : (
          filteredData?.map(
            (playthrough) =>
              playthrough.profile_public && (
                <Playthrough
                  key={playthrough.profile_id}
                  id={playthrough.profile_id}
                  name={playthrough.profile_name}
                  creator={playthrough.user_id}
                  isPublic={playthrough.profile_public}
                  location='home'
                />
              )
          )
        )}
      </div>
    </div>
  );
}
// 30 character limit for entryName (profile_name)
// 30 character limit for creator (user_name)
// 30 character limit for boss name (boss_name)
// 999 >= value limit for attempts (boss_attempts)
export default Feed;
