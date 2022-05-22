import React, { useContext, useEffect, useState } from 'react';
import logo from '../images/logo.png';
import {
  SearchIcon,
  LoginIcon,
  LogoutIcon,
  HomeIcon,
  UserAddIcon,
  DocumentAddIcon,
  FolderIcon,
} from '@heroicons/react/outline';
import { PlaythroughsContext } from '../context/PlaythroughsContext';
import { useNavigate } from 'react-router-dom';
import NewPlaythrough from './NewPlaythrough';
//navigate('/');                    // Equivalent to "history.push('/');"
//navigate('/', { replace: true }); // Equivalent to "history.replace('/');"
//navigate(-1);                     // Equivalent to "history.goBack();"

function Header() {
  const {
    search,
    setSearch,
    session,
    setSession,
    modalOpen,
    setModalOpen,
    users,
  } = useContext(PlaythroughsContext);
  let navigate = useNavigate();

  const navHome = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const navYour = (e) => {
    e.preventDefault();

    navigate(`/profiles/user/${session}`);
  };

  const navRegister = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  const navLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  useEffect(() => {
    setModalOpen(false);
    // setSession(true);
  }, [Header]);

  return (
    <>
      <header className='p-3 shadow-md fixed w-screen top-0 z-30 bg-teal-800 border-b-teal-900'>
        <div className='flex justify-evenly w-full mx-5 lg:mx-auto'>
          {/* left */}
          <div className='flex justify-center items-center w-full'>
            <div className='mr-4 cursor-pointer' onClick={(e) => navHome(e)}>
              <img className='h-12' src={logo} alt='' />
            </div>
            <p
              className='text-4xl font-bold cursor-pointer'
              onClick={(e) => navHome(e)}
            >
              Boss Tracker
            </p>
          </div>

          {/* middle */}
          <div className='relative flex items-center w-[65rem]'>
            <div className='flex items-center absolute inset-y-0 pl-1'>
              <SearchIcon className='h-8' />
            </div>
            <input
              type='text'
              placeholder='Search for a playthrough'
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className='block bg-teal-900 border-teal-900 rounded-md w-full h-10 pl-10 text-xl focus:ring-amber-400 focus:border-amber-400'
            />
          </div>

          {/* right */}
          <div className='flex items-center space-x-5 w-full justify-center'>
            <HeaderButton
              Icon={HomeIcon}
              text='Home'
              onClick={(e) => navHome(e)}
            />
            {session !== -1 ? (
              <>
                <HeaderButton
                  Icon={DocumentAddIcon}
                  text='New Playthrough'
                  onClick={() => setModalOpen(true)}
                />
                <HeaderButton
                  Icon={FolderIcon}
                  text='Your Playthroughs'
                  onClick={(e) => {
                    navYour(e);
                  }}
                />
                <HeaderButton
                  Icon={LogoutIcon}
                  text='Log Out'
                  onClick={(e) => {
                    setSession(-1);
                    navHome(e);
                  }}
                />
                {users?.map(
                  (user) =>
                    session === user.user_id && (
                      <p className='font-bold whitespace-nowrap overflow-hidden overflow-ellipsis w-24 shadow-sm border-l border-amber-400 pl-2 py-2'>
                        {user.user_name}
                      </p>
                    )
                )}
              </>
            ) : (
              <>
                <HeaderButton
                  Icon={LoginIcon}
                  text='Log In'
                  onClick={(e) => {
                    navLogin(e);
                  }}
                />
                <HeaderButton
                  Icon={UserAddIcon}
                  text='Register'
                  onClick={(e) => {
                    navRegister(e);
                  }}
                />
              </>
            )}
          </div>
        </div>
        <NewPlaythrough />
      </header>
    </>
  );
}

const HeaderButton = ({ Icon, text, onClick }) => {
  return (
    <div className='header-button group' onClick={onClick}>
      <Icon className='h-8' />
      <span className='button-tooltip group-hover:scale-100'>{text}</span>
    </div>
  );
};

export default Header;
