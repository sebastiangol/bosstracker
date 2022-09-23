import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterAPI from '../apis/RegisterAPI';
import Header from '../components/Header';
import { PlaythroughsContext } from '../context/PlaythroughsContext';
import LoadingIcon from '../components/LoadingIcon.js';

function Register() {
  const { setAccountCreated, session } = useContext(PlaythroughsContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [invalid, setInvalid] = useState('');
  const [missing, setMissing] = useState('');
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // REGISTER NEW ACCOUNT
  const registerUser = async (e) => {
    setLoading(true);
    e.preventDefault();
    // CHECK FOR SPACES
    if (name.includes(' ')) {
      setInvalid('A username cannot contain spaces');
      setLoading(false);
      return;
    }

    // CHECK FOR EMPTY FIELDS
    if (!name || !password) {
      console.log('You must enter a username and password');
      setMissing('You must enter a username and password');
      setLoading(false);
      return;
    }

    // VALIDATE REGISTRATION ATTEMPT
    if (password === confirmPassword) {
      try {
        const response = await RegisterAPI.post('/', {
          user_name: name,
          user_password: password,
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
    setLoading(false);
  };

  useEffect(() => {
    setAccountCreated('');
  }, []);

  // REDIRECT LOGGED-IN USERS
  useEffect(() => {
    if (session !== -1) {
      navigate('/');
    }
  }, []);

  // RESET ERROR MESSAGES
  useEffect(() => {
    setMissing('');
    setInvalid('');
  }, [name, password, confirmPassword]);

  return (
    <div className='flex flex-col justify-center items-center fixed h-screen w-screen'>
      <Header />
      <div className='flex flex-col h-fit items-center text-center bg-teal-800 rounded-lg shadow-md border border-amber-400 scale-150 relative bottom-7'>
        <h2 className='text-3xl p-2'>Register</h2>
        <form
          onSubmit={(e) => registerUser(e)}
          action=''
          className='flex flex-col items-center'
        >
          <input
            type='text'
            placeholder='User Name'
            onChange={(e) => {
              setName(e.target.value);
            }}
            className='text-field xl:h-8 mb-1 xl:mb-0'
          />
          <input
            type='password'
            placeholder='Password'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className='text-field xl:h-8 mb-1 xl:mb-0'
          />
          <input
            type='password'
            placeholder='Confirm Password'
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            className='text-field xl:h-8 mb-3'
          />
          <p className='text-red-500'>{missing}</p>
          <p className='text-red-500'>{invalid}</p>
          <button
            type='submit'
            disabled={loading}
            className='normal-button w-16 disabled:pointer-events-none'
          >
            {loading ? <LoadingIcon /> : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
