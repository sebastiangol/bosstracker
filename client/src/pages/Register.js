import React, { useState } from 'react';
import Header from '../components/Header';

function Register() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="flex flex-col justify-center items-center fixed h-screen w-screen">
      <Header />
      <div>
        <div className="flex flex-col h-fit items-center text-center bg-teal-800 rounded-lg shadow-md border border-amber-400 scale-150">
          <h2 className="text-3xl p-2">Register</h2>
          <form action="" className="flex flex-col items-center">
            <input
              type="text"
              placeholder="User Name"
              onChange={e => {
                setName(e.target.value);
              }}
              value={name}
              className="text-field mb-1"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={e => {
                setPassword(e.target.value);
              }}
              value={password}
              className="text-field mb-1"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={e => {
                setConfirmPassword(e.target.value);
              }}
              value={confirmPassword}
              className="text-field mb-3"
            />
            <div className="normal-button">Register</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
