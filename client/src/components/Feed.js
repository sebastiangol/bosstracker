import React, { useContext, useEffect, useState } from 'react';
import PlaythroughsAPI from '../apis/PlaythroughsAPI';
import { PlaythroughsContext } from '../context/PlaythroughsContext';
import Playthrough from './Playthrough';

function Feed(props) {
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

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PlaythroughsAPI.get('/');
        setUsers(response.data.data.users);
        setPlaythroughs(response.data.data.profiles);
        setBosses(response.data.data.bosses);
        console.log(response);
        console.log(playthroughs);
        console.log(bosses);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(
      playthroughs?.filter(playthrough => {
        if (search == '') {
          return playthrough;
        } else if (
          playthrough.profile_name
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          playthrough.user_name
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase())
        ) {
          return playthrough;
        }
      })
    );
  }, [search, playthroughs]);

  return (
    <div className="flex flex-col items-center text-center bg-teal-800 xl:max-w-6xl mx-auto p-4 m-4 mt-0 rounded-lg shadow-md">
      <h2 className="text-6xl pb-6">Public Playthroughs</h2>
      <div
        className={`${
          filteredData?.length === 0 ? 'flex' : 'grid grid-cols-2'
        }`}
      >
        {playthroughs.length === 0 ? (
          <div className="flex justify-center items-center text-3xl m-4">
            No playthroughs were found.
          </div>
        ) : filteredData.length === 0 ? (
          <div className="flex justify-center items-center text-3xl m-4">
            Your search found no results.
          </div>
        ) : (
          filteredData?.map(
            playthrough =>
              playthrough.profile_public && (
                <Playthrough
                  key={playthrough.profile_id}
                  id={playthrough.profile_id}
                  name={playthrough.profile_name}
                  creator={playthrough.user_id}
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
