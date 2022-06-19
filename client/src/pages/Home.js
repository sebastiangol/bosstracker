import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Landing from '../components/Landing';
import Feed from '../components/Feed';
import { PlaythroughsContext } from '../context/PlaythroughsContext';

function Home() {
  const { setModalOpen, session, setAccountCreated } =
    useContext(PlaythroughsContext);

  useEffect(() => {
    setModalOpen(false);
    console.log('HOME SESSION:');
    console.log(session);
    setAccountCreated('');
  }, [Home]);

  return (
    <div className=''>
      <Header />
      <Landing />
      <Feed />
    </div>
  );
}

export default Home;
