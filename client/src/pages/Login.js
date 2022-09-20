import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginAPI from '../apis/LoginAPI';
import Header from '../components/Header';
import { PlaythroughsContext } from '../context/PlaythroughsContext';

function Login() {
  const { session, setSession, accountCreated, setAccountCreated } =
    useContext(PlaythroughsContext);
  let navigate = useNavigate();
  let locale = useLocation();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [invalid, setInvalid] = useState('');
  const [missing, setMissing] = useState('');

  // LOG IN USER
  const loginUser = async (e) => {
    e.preventDefault();
    setAccountCreated('');
    // CHECK FOR EMPTY FIELDS
    if (!name || !password) {
      console.log('You must enter a username and password');
      setMissing('You must enter a username and password');
      return;
    }

    try {
      const response = await LoginAPI.post('/', {
        user_name: name,
        user_password: password,
      });
      console.log(response.data.data.users.user_id);
      // AUTHENTICATE LOGIN DETAILS
      if (response.data.data.users.length !== 0) {
        setSession(response.data.data.users.user_id);
        console.log('BELOW');
        console.log(session);
        console.log(locale);
        navigate('/');
      } else {
        console.log('invalid username or password');
        setInvalid('Invalid username or password');
      }
    } catch (err) {
      console.log(err);
      console.log('invalid username or password');
      setInvalid('Invalid username or password');
    }
  };

  const navRegister = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  const loginGuest = (e) => {
    e.preventDefault();
    setSession(3);
    navigate('/');
  };

  useEffect(() => {
    if (session !== -1) {
      navigate('/');
    }
  }, []);

  // RESET ERROR MESSAGES
  useEffect(() => {
    setMissing('');
    setInvalid('');
  }, [name, password]);

  return (
    <div className='flex flex-col justify-center items-center fixed h-screen w-screen'>
      <Header />
      <div className='flex flex-col h-fit items-center text-center bg-teal-800 rounded-lg shadow-md border border-amber-400 scale-150 relative bottom-7'>
        <h2 className='text-3xl p-2'>Log In</h2>
        <p className='text-green-300'>{accountCreated}</p>
        <form
          onSubmit={(e) => loginUser(e)}
          action=''
          className='flex flex-col items-center'
        >
          <input
            type='text'
            placeholder='User Name'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className='text-field xl:h-8 mb-1 xl:mb-0'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className='text-field xl:h-8 mb-3'
          />
          <p className='text-red-500 xl:text-sm'>{missing}</p>
          <p className='text-red-500 xl:text-sm'>{invalid}</p>
          <button type='submit' className='normal-button xl:text-sm'>
            Log In
          </button>
        </form>
        <p className='text-sm'>Don't have an account?</p>
        <div className='flex justify-evenly items-center w-full'>
          <button
            className='normal-button text-xs h-8 w-[4.84rem]'
            onClick={(e) => navRegister(e)}
          >
            Register
          </button>
          <p>Or</p>
          <button
            className='normal-button text-xs h-8 w-[4.84rem]'
            onClick={(e) => loginGuest(e)}
          >
            Login as Guest
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
