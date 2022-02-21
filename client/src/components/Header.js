import React, { useContext, useState } from 'react';
import logo from '../images/logo.png';
import {
  SearchIcon,
  LoginIcon,
  LogoutIcon,
  HomeIcon,
  UserAddIcon,
  DocumentAddIcon,
  FolderIcon
} from '@heroicons/react/outline';
import { PlaythroughsContext } from '../context/PlaythroughsContext';
import { Route, useNavigate } from 'react-router-dom';
//navigate('/');                    // Equivalent to "history.push('/');"
//navigate('/', { replace: true }); // Equivalent to "history.replace('/');"
//navigate(-1);                     // Equivalent to "history.goBack();"

function Header() {
  const { search, setSearch, loggedIn, setLoggedIn } =
    useContext(PlaythroughsContext);
  let navigate = useNavigate();

  const navHome = e => {
    e.preventDefault();
    navigate('/');
  };

  const navNew = e => {
    e.preventDefault();
    navigate('/newplaythrough');
  };

  const navYour = e => {
    e.preventDefault();
    navigate('/yourplaythroughs');
  };

  const navRegister = e => {
    e.preventDefault();
    navigate('/register');
  };

  return (
    <header className="p-3 shadow-md fixed w-screen top-0 z-50 bg-teal-800 border-b-teal-900">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        {/* left */}
        <div className="flex items-center w-full">
          <div className="mr-4">
            <img className="h-12" src={logo} alt="" />
          </div>
          <p className="text-4xl font-bold">Boss Tracker</p>
        </div>

        {/* middle */}
        <div className="relative flex items-center w-full">
          <div className="flex items-center absolute inset-y-0 pl-1">
            <SearchIcon className="h-8" />
          </div>
          <input
            type="text"
            placeholder="Search for a playthrough"
            onChange={e => {
              setSearch(e.target.value);
            }}
            className="block bg-teal-900 border-teal-900 rounded-md w-full h-10 pl-10 text-xl focus:ring-amber-400 focus:border-amber-400"
          />
        </div>

        {/* right */}
        <div className="flex items-center space-x-10 w-full justify-end">
          <HeaderButton Icon={HomeIcon} text="Home" onClick={e => navHome(e)} />
          {loggedIn ? (
            <>
              <HeaderButton
                Icon={DocumentAddIcon}
                text="New Playthrough"
                onClick={e => navNew(e)}
              />
              <HeaderButton
                Icon={FolderIcon}
                text="Your Playthroughs"
                onClick={e => {
                  navYour(e);
                }}
              />
              <HeaderButton
                Icon={LogoutIcon}
                text="Log Out"
                onClick={() => {
                  setLoggedIn(false);
                }}
              />
            </>
          ) : (
            <>
              <HeaderButton
                Icon={LoginIcon}
                text="Log In"
                onClick={() => {
                  setLoggedIn(true);
                }}
              />
              <HeaderButton
                Icon={UserAddIcon}
                text="Register"
                onClick={e => {
                  navRegister(e);
                }}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
}

const HeaderButton = ({ Icon, text, onClick }) => {
  return (
    <div className="header-button group" onClick={onClick}>
      <Icon className="h-8" />
      <span className="button-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
};

export default Header;
