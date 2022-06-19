import React, { useContext, useEffect, useState } from 'react';
import BossesAPI from '../apis/BossesAPI';
import { PlaythroughsContext } from '../context/PlaythroughsContext';

function DeleteBoss({ deleteBossModal, setDeleteBossModal, id, name }) {
  const { bossDeleted, setBossDeleted } = useContext(PlaythroughsContext);

  const delBoss = async (e) => {
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
      className={`fixed justify-center items-center left-0 top-0 h-screen w-screen z-40 ${
        deleteBossModal === true ? 'flex' : 'hidden'
      }`}
    >
      <div
        className={`fixed justify-center items-center left-0 top-0 h-screen w-screen opacity-40 bg-black ${
          deleteBossModal === true ? 'flex' : 'hidden'
        }`}
        onClick={() => setDeleteBossModal(false)}
      ></div>
      <div className='relative flex flex-col h-fit items-center text-center bg-teal-800 rounded-lg shadow-md border border-amber-400 scale-150'>
        <span
          className='absolute font-mono text-xs right-1 cursor-pointer'
          onClick={() => setDeleteBossModal(false)}
        >
          x
        </span>
        <h2 className='text-3xl 2xs:text-2xl p-2'>Delete Boss?</h2>
        <h3 className='p-2 2xs:text-sm'>
          Are you sure you want to delete this boss?
        </h3>
        <h4 className='pb-2'>{name}</h4>
        <div className='flex justify-between'>
          <button
            className='normal-button 2xs:text-xs mr-1 bg-red-800 hover:bg-red-700 text-white border-white'
            onClick={(e) => {
              delBoss(e);
            }}
          >
            Delete
          </button>
          <button
            className='normal-button 2xs:text-xs ml-1'
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
