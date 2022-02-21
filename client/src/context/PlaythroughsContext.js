import React, { useState, createContext } from 'react';

export const PlaythroughsContext = createContext();

export const PlaythroughsContextProvider = props => {
  const [playthroughs, setPlaythroughs] = useState([]);
  const [bosses, setBosses] = useState([]);
  const [users, setUsers] = useState([]);

  return (
    <PlaythroughsContext.Provider
      value={{
        playthroughs,
        setPlaythroughs,
        bosses,
        setBosses,
        users,
        setUsers
      }}
    >
      {props.children}
    </PlaythroughsContext.Provider>
  );
};
