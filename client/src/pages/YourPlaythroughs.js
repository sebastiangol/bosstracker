import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import PlaythroughsAPI from '../apis/PlaythroughsAPI';
import { PlaythroughsContext } from '../context/PlaythroughsContext';
import Playthrough from '../components/Playthrough';
import { useParams } from 'react-router-dom';

function YourPlaythroughs() {
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

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PlaythroughsAPI.get(`/user/${id}`);
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
    <div>
      <Header />
      <div className="flex flex-col items-center text-center bg-teal-800 xl:max-w-6xl mx-auto p-4 m-4 mt-24 rounded-lg shadow-md">
        <h2 className="text-6xl pb-6">Your Playthroughs</h2>
        <div
          className={`${
            filteredData?.length === 0 ? 'flex' : 'grid grid-cols-2'
          }`}
        >
          {filteredData?.length === 0 ? (
            <div className="flex flex-col justify-center items-center">
              <p className="text-3xl m-4">You have no playthroughs yet.</p>
              <div
                className="cursor-pointer flex items-center justify-center p-2 text-amber-400 border-2 border-amber-400 rounded-md shadow-lg bg-teal-800 text-2xl font-bold w-fit hover:scale-105 active:scale-100 transition-transform duration-150 ease-in-out"
                onClick={() => setModalOpen(true)}
              >
                Create one!
              </div>
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
    </div>
  );
}

export default YourPlaythroughs;
