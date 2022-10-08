import React, { useRef, useState } from 'react';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import {
  PlusCircleIcon,
  MinusCircleIcon,
  PencilIcon,
  CheckIcon,
} from '@heroicons/react/outline';
import LoadingIcon from './LoadingIcon';
import DeleteBoss from './DeleteBoss';
import BossesAPI from '../apis/BossesAPI';
import { useEffect } from 'react';

function DetailedBoss({
  id,
  name,
  attempts,
  completed,
  notes,
  selectedPlaythrough,
  openNote,
  setOpenNote,
  session,
  refresh,
  setRefresh,
  loadingNote,
  setLoadingNote,
}) {
  const [bossTooltip, setBossTooltip] = useState(false);
  const [deleteBossModal, setDeleteBossModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [compLoading, setCompLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef(null);
  const [newNote, setNewNote] = useState(notes);

  // ADD AN ATTEMPT
  const plusAttempt = async (e) => {
    e.preventDefault();
    if (attempts + 1 === 1000) {
      return;
    }

    setLoading(true);
    try {
      const response = await BossesAPI.put(`/${id}/attempts`, {
        attempts: attempts + 1,
      });
      setRefresh(refresh + 1);
      setLoading(false);
      console.log(response);
      console.log('The boss attempts was updated.');
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  // REMOVE AN ATTEMPT
  const minusAttempt = async (e) => {
    e.preventDefault();
    if (attempts - 1 === -1) {
      return;
    }

    setLoading(true);
    try {
      const response = await BossesAPI.put(`/${id}/attempts`, {
        attempts: attempts - 1,
      });
      setRefresh(refresh + 1);
      setLoading(false);
      console.log(response);
      console.log('The boss attempts was updated.');
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  // UPDATE COMPLETED STATUS
  const changeCompleted = async (e) => {
    e.preventDefault();
    setCompLoading(true);
    try {
      const response = await BossesAPI.put(`/${id}/completed`, {
        completed: !completed,
      });
      setRefresh(refresh + 1);
      setCompLoading(false);
      console.log(response);
      console.log('The boss attempts was updated.');
    } catch (err) {
      setCompLoading(false);
      console.log(err);
    }
  };

  //isEditingHandler
  const isEditingHandler = (e) => {
    e.preventDefault();
    setIsEditing(true);
    setTimeout(() => {
      ref.current.focus();
    }, 0);
  };

  // UPDATE BOSS NOTES
  const updateNote = async (e) => {
    e.preventDefault();
    setLoadingNote(true);

    try {
      const response = await BossesAPI.put(`/${id}/notes`, {
        notes: newNote,
      });
      setRefresh(refresh + 1);
      console.log(response);
      console.log('The boss notes were updated');
    } catch (err) {
      console.log(err);
    }
    setIsEditing(false);
    setLoadingNote(false);
  };

  useEffect(
    (openNote) => {
      setNewNote(notes);
    },
    [openNote]
  );

  return (
    <li
      key={id}
      className='flex flex-col w-[33rem] xs:w-[25rem] my-2 transition-all duration-150 ease-out'
    >
      <div className='flex relative justify-between  border-2 p-1 2xs:p-[0.15rem] bg-teal-800 border-amber-400 rounded-lg shadow-lg transition-all duration-150 ease-out hover:bg-teal-700'>
        <p className='flex font-semibold items-center justify-start ml-1'>
          {name}
        </p>
        <div className='flex transition-all duration-150 ease-in-out z-10'>
          <div className='mb-1 transition-all duration-150 ease-in-out w-32'>
            <div className='flex items-center mb-[0.12rem] justify-end'>
              <p className='mr-1'>{attempts} Attempts</p>
              {selectedPlaythrough.user_id === session && (
                <>
                  <button
                    className={`rounded-full shadow-md ${
                      !loading &&
                      'hover:bg-teal-700 active:bg-teal-800 cursor-pointer'
                    }active:scale-95 transition-all duration-150 ease-out disabled:opacity-50 disabled:pointer-events-none`}
                    onClick={(e) => plusAttempt(e)}
                    disabled={loading}
                  >
                    <PlusCircleIcon className='h-6' />
                  </button>
                  <button
                    className={`rounded-full shadow-md ${
                      !loading &&
                      'hover:bg-teal-700 active:bg-teal-800 cursor-pointer'
                    } active:scale-95 transition-all duration-150 ease-out disabled:opacity-50 disabled:pointer-events-none`}
                    onClick={(e) => minusAttempt(e)}
                    disabled={loading}
                  >
                    <MinusCircleIcon className='h-6' />
                  </button>
                </>
              )}
            </div>
            <div className='flex justify-end'>
              <button
                className={`font-semibold rounded-lg transition-all duration-150 ease-in-out w-16 h-6 mt-[0.15rem] flex justify-center items-center shadow-md border border-amber-400 disabled:pointer-events-none ${
                  compLoading && 'opacity-50 scale-90'
                } ${
                  !completed
                    ? 'bg-red-600 hover:bg-red-500'
                    : 'bg-green-600 hover:bg-green-500'
                } ${
                  selectedPlaythrough.user_id === session &&
                  `${
                    !completed
                      ? 'hover:bg-red-500 active:bg-red-600'
                      : 'hover:bg-green-500 active:bg-green-600'
                  }`
                }`}
                onClick={(e) => changeCompleted(e)}
                disabled={
                  selectedPlaythrough.user_id !== session || compLoading
                }
              >
                {!completed ? 'Pending' : 'Victory'}
              </button>
            </div>
          </div>
          {selectedPlaythrough.user_id === session && (
            <div className='flex items-center ml-1 transition-all duration-150 ease-in-out origin'>
              <DotsVerticalIcon
                className='h-6 cursor-pointer opacity-60 hover:opacity-100 active:scale-90 transition-all duration-150 ease-out z-0'
                onClick={() => setBossTooltip(true)}
              />
              <div
                className={`${
                  bossTooltip ? 'flex' : 'hidden'
                } transition-all duration-150 ease-in-out h-full items-center`}
              >
                <div
                  className='fixed h-screen w-screen top-0 left-0 z-10'
                  onClick={() => setBossTooltip(false)}
                ></div>
                <span
                  className={`relative ${
                    bossTooltip ? 'scale-100' : 'scale-0'
                  } flex transition-all duration-150 ease-in-out cursor-pointer z-20 text-white text-lg xs:text-sm active:text-gray-300 px-1 bg-red-800 hover:bg-red-700 active:bg-red-800 h-full items-center border-white border-2 rounded-md`}
                  onClick={() => {
                    setDeleteBossModal(true);
                    setBossTooltip(false);
                  }}
                >
                  Delete
                </span>
              </div>
            </div>
          )}
        </div>
        <div
          disabled={loadingNote}
          onClick={() => {
            setOpenNote(() => (openNote == id ? 0 : id));
            setIsEditing(false);
          }}
          className='absolute top-0 left-0 right-0 bottom-0 cursor-pointer'
        ></div>
        <DeleteBoss
          deleteBossModal={deleteBossModal}
          setDeleteBossModal={setDeleteBossModal}
          id={id}
          name={name}
        />
      </div>

      {/* Notes section */}
      <div
        className={`flex justify-center w-full relative transition-all duration-150 ease-in-out ${
          openNote == id ? 'h-48' : 'h-0'
        }`}
      >
        <div
          className={`${
            openNote !== id && 'h-0'
          } absolute w-[27rem] xs:w-[19rem] h-3 bg-gradient-to-b ${
            loadingNote ? 'from-gray-700' : 'from-teal-900'
          } z-10 right-12 xs:right-12 top-[0.08rem] transition-all duration-150 ease-in-out`}
        ></div>
        <textarea
          type='text'
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder='Add notes...'
          ref={ref}
          readOnly={!isEditing}
          disabled={loadingNote || selectedPlaythrough.user_id !== session}
          onDoubleClick={(e) => isEditingHandler(e)}
          className={`${loadingNote ? 'bg-gray-700' : 'bg-teal-900'} ${
            openNote == id
              ? 'h-48 p-5 px-10 overflow-y-scroll break-words border rounded-b-lg shadow-md'
              : 'h-0 p-0 overflow-none border-transparent border-0'
          } w-[32rem] xs:w-[24rem] border-amber-400 text-lg xs:text-base  scrollbar-thin md:scrollbar-none scrollbar-thumb-amber-400 transition-all duration-150 ease-in-out focus:ring-amber-400 focus:border-2 focus:border-amber-400 focus:outline-0 resize-none`}
        >
          {newNote}
        </textarea>
        <div
          className={`${
            openNote !== id && 'h-0'
          } absolute w-[31rem] xs:w-[19rem] h-3 bg-gradient-to-t ${
            loadingNote ? 'from-gray-700' : 'from-teal-900'
          } z-10 right-4 xs:right-12 bottom-[0.09rem] transition-all duration-150 ease-in-out`}
        ></div>
        {/* Edit note button */}
        {selectedPlaythrough.user_id === session && (
          <div
            onClick={(e) => {
              !isEditing ? isEditingHandler(e) : updateNote(e);
            }}
            disabled={loadingNote}
            className={`${
              openNote !== id ? 'h-0' : 'header-button'
            } absolute left-4 top-2 bg-teal-800 hover:bg-teal-700 active:scale-95`}
          >
            {loadingNote && openNote == id ? (
              <LoadingIcon small={true} />
            ) : isEditing ? (
              <CheckIcon className={`${openNote !== id ? 'h-0' : 'h-4'}`} />
            ) : (
              <PencilIcon className={`${openNote !== id ? 'h-0' : 'h-4'}`} />
            )}
          </div>
        )}
      </div>
    </li>
  );
}

export default DetailedBoss;
