import React, { useState, createContext } from 'react';

export const PlaythroughsContext = createContext();

export const PlaythroughsContextProvider = props => {
  const [playthroughs, setPlaythroughs] = useState([]);
  const [bosses, setBosses] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [session, setSession] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlaythrough, setSelectedPlaythrough] = useState([]);
  const [selectedBosses, setSelectedBosses] = useState([]);
  const [accountCreated, setAccountCreated] = useState('');

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
        setModalOpen,
        selectedPlaythrough,
        setSelectedPlaythrough,
        selectedBosses,
        setSelectedBosses,
        accountCreated,
        setAccountCreated
      }}
    >
      {props.children}
    </PlaythroughsContext.Provider>
  );
};
