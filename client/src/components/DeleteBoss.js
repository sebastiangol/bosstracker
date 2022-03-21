import React, { useContext, useEffect, useState } from 'react';
import BossesAPI from '../apis/BossesAPI';
import { PlaythroughsContext } from '../context/PlaythroughsContext';

function DeleteBoss({ deleteBossModal, setDeleteBossModal, id, name }) {
  const {
    search,
    setSearch,
    loggedIn,
    setLoggedIn,
    modalOpen,
    setModalOpen,
    session,
    setSession,
    bossDeleted,
    setBossDeleted
  } = useContext(PlaythroughsContext);

  const delBoss = async e => {
    e.preventDefault();
    try {
      const response = await BossesAPI.delete(`/${id}`);
      console.log(response);
      console.log('The boss was deleted.');
      setBossDeleted(bossDeleted + 1);
      setDeleteBossModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`fixed justify-center items-center left-0 top-0 h-screen w-screen ${
        deleteBossModal === true ? 'flex' : 'hidden'
      }`}
    >
      <div
        className={`fixed justify-center items-center left-0 top-0 h-screen w-screen opacity-40 bg-black ${
          deleteBossModal === true ? 'flex' : 'hidden'
        }`}
        onClick={() => setDeleteBossModal(false)}
      ></div>
      <div className="relative flex flex-col h-fit items-center text-center bg-teal-800 rounded-lg shadow-md border border-amber-400 scale-150">
        <span
          className="absolute font-mono text-xs right-1 cursor-pointer"
          onClick={() => setDeleteBossModal(false)}
        >
          x
        </span>
        <h2 className="text-3xl p-2">Delete Boss?</h2>
        <h3 className="p-2">Are you sure you want to delete this boss?</h3>
        <h4 className="pb-2">{name}</h4>
        <div className="flex justify-between">
          <button
            className="normal-button mr-1"
            onClick={e => {
              delBoss(e);
            }}
          >
            Delete
          </button>
          <button
            className="normal-button ml-1"
            onClick={() => setDeleteBossModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteBoss;
