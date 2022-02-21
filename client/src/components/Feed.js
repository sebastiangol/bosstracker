import React, { useContext, useEffect } from 'react';
import PlaythroughsAPI from '../apis/PlaythroughsAPI';
import { PlaythroughsContext } from '../context/PlaythroughsContext';

function Feed(props) {
  const { playthroughs, setPlaythroughs, bosses, setBosses, users, setUsers } =
    useContext(PlaythroughsContext);

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

  return (
    <div className="flex flex-col items-center text-center bg-teal-800 xl:max-w-6xl mx-auto p-4 m-4 mt-0 rounded-lg shadow-md">
      <h2 className="text-6xl pb-6">Public Playthroughs</h2>
      <div className="flex flex-wrap justify-center">
        {/* <Playthrough entryName="Playthrough Name" creator="Dave" />
        <Playthrough
          entryName="super duper fantastic run okay"
          creator="longUsername2214"
        />
        <Playthrough
          entryName="Cool run"
          creator="superduperlongusername8542"
        />
        <Playthrough entryName="First EVER playthrough" creator="bob" /> */}
        {playthroughs.map(
          playthrough =>
            playthrough.profile_public && (
              <div
                key={playthrough.profile_id}
                className="bg-teal-900 flex flex-col p-4 border border-amber-400 m-3 rounded-md shadow-lg hover:scale-105 hover:bg-teal-800 active:scale-95 transition-all duration-200 ease-out w-[33rem] cursor-pointer h-[26.3rem] relative"
              >
                <h3 className="pb-1 text-4xl">{playthrough.profile_name}</h3>
                <h4 className="pb-2 text-xl">
                  By{' '}
                  {users.map(
                    user =>
                      playthrough.user_id === user.user_id && user.user_name
                  )}
                </h4>
                <div className="absolute w-full h-3 bg-gradient-to-b from-teal-900 right-0 top-24"></div>
                <div className="flex flex-col overflow-y-scroll scrollbar-thin scrollbar-thumb-black">
                  {bosses.map(
                    (boss, index) =>
                      boss.profile_id === playthrough.profile_id && (
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
const Playthrough = ({ entryName, creator }) => {
  return (
    <div className="bg-teal-900 flex flex-col p-4 border border-amber-400 m-3 rounded-md shadow-lg hover:scale-105 hover:bg-teal-800 active:scale-95 transition-all duration-200 ease-out w-[33rem] cursor-pointer h-[26.2rem]">
      <h3 className="pb-1 text-4xl">{entryName}</h3>
      <h4 className="pb-2 text-xl">By {creator}</h4>
      <div className="flex flex-col">
        <Boss name="first boss" attempts="2" status="Victory" />
        <Boss name="dwarf thing" attempts="9" status="Victory" />
        <Boss name="Ornstein and Jack" attempts="94" status="Pending" />
        <Boss name="lost knight ian" attempts="11" status="Victory" />
        <Boss
          name="The Dark Lord of Something"
          attempts="19"
          status="Pending"
        />
      </div>
    </div>
  );
};

const Boss = ({ name, attempts, status }) => {
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
};

export default Feed;
