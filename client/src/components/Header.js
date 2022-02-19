import React from 'react';
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

function Header() {
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
            className="block bg-teal-900 border-teal-900 rounded-md w-full h-10 pl-10 text-xl focus:ring-amber-400 focus:border-amber-400"
          />
        </div>

        {/* right */}
        <div className="flex items-center space-x-10 w-full justify-end">
          <HeaderButton Icon={HomeIcon} text="Home" />
          <HeaderButton Icon={LoginIcon} text="Log In" />
          <HeaderButton Icon={UserAddIcon} text="Register" />
        </div>
      </div>
    </header>
  );
}

const HeaderButton = ({ Icon, text }) => {
  return (
    <div className="header-button group">
      <Icon className="h-8" />
      <span className="button-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
};

export default Header;
