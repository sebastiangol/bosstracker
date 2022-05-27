import React, { useContext, useEffect, useState } from 'react';
import PlaythroughsAPI from '../apis/PlaythroughsAPI';
import { PlaythroughsContext } from '../context/PlaythroughsContext';
import { useNavigate } from 'react-router-dom';

function DeletePlaythrough({ deletePTModal, setDeletePTModal, id, name }) {
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
    setBossDeleted,
  } = useContext(PlaythroughsContext);

  const navigate = useNavigate();

  console.log(name);

  const delPlaythrough = async (e) => {
    e.preventDefault();
    try {
      const response = await PlaythroughsAPI.delete(`/${id}`);
      console.log(response);
      console.log('The boss was deleted.');
      // setBossDeleted(bossDeleted + 1);
      setDeletePTModal(false);
      navigate(`/profiles/user/${session}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`fixed justify-center items-center left-0 top-0 h-screen w-screen ${
        deletePTModal === true ? 'flex' : 'hidden'
      }`}
    >
      <div
        className={`fixed justify-center items-center left-0 top-0 h-screen w-screen opacity-40 bg-black ${
          deletePTModal === true ? 'flex' : 'hidden'
        }`}
        onClick={() => setDeletePTModal(false)}
      ></div>
      <div className='relative flex flex-col h-fit items-center text-center bg-teal-800 rounded-lg shadow-md border border-amber-400 scale-150'>
        <span
          className='absolute font-mono text-xs right-1 cursor-pointer'
          onClick={() => setDeletePTModal(false)}
        >
          x
        </span>
        <h2 className='text-3xl 2xs:text-2xl p-2'>Delete Playthrough?</h2>
        <h3 className='p-2 2xs:text-xs'>
          Are you sure you want to delete this playthrough?
        </h3>
        <h4 className='pb-2'>{name}</h4>
        <div className='flex justify-between'>
          <button
            className='normal-button 2xs:text-xs mr-1 bg-red-800 hover:bg-red-700 text-white border-white'
            onClick={(e) => {
              delPlaythrough(e);
            }}
          >
            Delete
          </button>
          <button
            className='normal-button 2xs:text-xs ml-1'
            onClick={() => setDeletePTModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePlaythrough;
