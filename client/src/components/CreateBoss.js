import React, { useEffect, useState } from 'react';
import PlaythroughsAPI from '../apis/PlaythroughsAPI';
import LoadingIcon from './LoadingIcon';

function CreateBoss({ id, bossAdded, setBossAdded }) {
  const [name, setName] = useState('');
  const [missing, setMissing] = useState('');
  const [loadingCreate, setLoadingCreate] = useState(false);

  const addBoss = async (e) => {
    setLoadingCreate(true);
    e.preventDefault();
    if (!name.trim()) {
      console.log('You must enter a boss name');
      setMissing('You must enter a boss name');
      setLoadingCreate(false);
      return;
    }

    try {
      const response = await PlaythroughsAPI.post(`/${id}`, {
        profile_id: id,
        boss_name: name,
        attempts: 0,
        notes: '',
        completed: false,
      });
      console.log(response);
      console.log('Success! The boss was created.');
      setName('');
      setBossAdded(bossAdded + 1);
    } catch (err) {
      console.log(err);
      setMissing('Something went wrong');
    }
    setLoadingCreate(false);
  };

  // RESET ERROR MESSAGES ON TYPE
  useEffect(() => {
    setMissing('');
  }, [name]);

  return (
    <>
      <form
        onSubmit={(e) => addBoss(e)}
        className='flex justify-center items-center h-14 bg-teal-800 rounded-lg shadow-md border border-amber-400 w-fit xs:w-[25rem] '
      >
        <p className='text-xl xs:text-base ml-1 w-[8.4rem] xs:w-[6.6rem] font-semibold'>
          Create a Boss
        </p>
        <input
          className='text-field w-60 xs:w-36'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Boss Name'
        />
        <button
          type='submit'
          className='normal-button m-0 text-lg xs:text-base mr-1 w-28 xs:w-20 disabled:pointer-events-none'
          disabled={loadingCreate}
        >
          {loadingCreate ? <LoadingIcon /> : 'Create'}
        </button>
      </form>
      {/* TEXTFIELD ERROR MESSAGE */}
      <p className='text-red-500 text-lg'>{missing}</p>
    </>
  );
}

export default CreateBoss;
