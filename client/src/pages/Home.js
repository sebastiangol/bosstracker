import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Landing from '../components/Landing';
import Feed from '../components/Feed';
import NewPlaythrough from '../components/NewPlaythrough';
import { PlaythroughsContext } from '../context/PlaythroughsContext';

function Home() {
  const { modalOpen, setModalOpen } = useContext(PlaythroughsContext);

  useEffect(() => {
    setModalOpen(false);
  }, [Home]);

  return (
    <div className="">
      <Header />
      <Landing />
      <Feed />
      {/* <NewPlaythrough /> */}
    </div>
  );
}

export default Home;
