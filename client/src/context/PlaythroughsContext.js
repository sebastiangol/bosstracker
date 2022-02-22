import React, { useState, createContext } from 'react';

export const PlaythroughsContext = createContext();

export const PlaythroughsContextProvider = props => {
  const [playthroughs, setPlaythroughs] = useState([]);
  const [bosses, setBosses] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [session, setSession] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <PlaythroughsContext.Provider
      value={{
        playthroughs,
        setPlaythroughs,
        bosses,
        setBosses,
        users,
        setUsers,
        search,
        setSearch,
        session,
        setSession,
        modalOpen,
        setModalOpen
      }}
    >
      {props.children}
    </PlaythroughsContext.Provider>
  );
};
