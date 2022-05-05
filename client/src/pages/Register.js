import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterAPI from '../apis/RegisterAPI';
import Header from '../components/Header';
import { PlaythroughsContext } from '../context/PlaythroughsContext';

function Register() {
  const { accountCreated, setAccountCreated, session } = useContext(PlaythroughsContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [invalid, setInvalid] = useState('');
  const [missing, setMissing] = useState('');
  let navigate = useNavigate();

  const registerUser = async e => {
    e.preventDefault();
    if (name.includes(' ')) {
      setInvalid('A username cannot contain spaces');
      return;
    }

    if (!name || !password) {
      console.log('You must enter a username and password');
      setMissing('You must enter a username and password');
      return;
    }

    if (password === confirmPassword) {
      try {
        const response = await RegisterAPI.post('/', {
          user_name: name,
          user_password: password
        });
        console.log(response);
        console.log('Success! Your account was created.');
        setAccountCreated('Success! Your account was created.');
        navigate('/login');
      } catch (err) {
        console.log(err);
        setInvalid('This username already exists');
      }
    } else {
      console.log('The two passwords do not match');
      setInvalid('The two passwords do not match');
    }
  };

  useEffect(() => {
    setMissing('');
    setInvalid('');
  }, [name, password, confirmPassword]);

  useEffect(() => {
    setAccountCreated('');
  }, []);

  useEffect(() => {
    if (session !== -1) {
      navigate("/")
    } 
  }, []);

  return (
    <div className="flex flex-col justify-center items-center fixed h-screen w-screen">
      <Header />
      <div>
        <div className="flex flex-col h-fit items-center text-center bg-teal-800 rounded-lg shadow-md border border-amber-400 scale-150">
          <h2 className="text-3xl p-2">Register</h2>
          <form
            onSubmit={e => registerUser(e)}
            action=""
            className="flex flex-col items-center"
          >
            <input
              type="text"
              placeholder="User Name"
              onChange={e => {
                setName(e.target.value);
              }}
              className="text-field mb-1"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={e => {
                setPassword(e.target.value);
              }}
              className="text-field mb-1"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={e => {
                setConfirmPassword(e.target.value);
              }}
              className="text-field mb-3"
            />
            <p className="text-red-500">{missing}</p>
            <p className="text-red-500">{invalid}</p>
            <button type="submit" className="normal-button">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
