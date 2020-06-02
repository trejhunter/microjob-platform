import { useState, useRef, useEffect } from 'react';
import AuthService from '../helper-functions/AuthService';
import Message from '../components/Message';
import { useRouter } from 'next/router';

const Register = (props) => {
  const [user, setUser] = useState({
    method: 'local',
    local: { email: '', password: '' },
    role: '',
  });
  const [message, setMessage] = useState(null);
  const router = useRouter();
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (event) => {
    const field = event.target.name;
    if (field === 'email' || field === 'password') {
      setUser({
        ...user,
        local: { ...user.local, [field]: event.target.value },
      });
    } else setUser({ ...user, [field]: event.target.value });
  };

  const resetForm = () => {
    setUser({
      local: { email: '', password: '' },
      role: '',
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    AuthService.register(user).then((data) => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          router.push('/log-in');
        }, 2000);
      }
    });
  };

  return (
    <div className='container'>
      <form onSubmit={onSubmit}>
        <h3>Please Sign Up</h3>
        <label htmlFor='email' className='sr-only'>
          Email:
        </label>
        <input
          type='text'
          name='email'
          value={user.local.email}
          onChange={onChange}
          className='form-control'
          placeholder='Enter Email Address'
        />
        <label htmlFor='password' className='sr-only'>
          Password:
        </label>
        <input
          type='password'
          name='password'
          value={user.local.password}
          onChange={onChange}
          className='form-control'
          placeholder='Enter Password'
        />
        <label htmlFor='role' className='sr-only'>
          Role:
        </label>
        <input
          type='text'
          name='role'
          value={user.role}
          onChange={onChange}
          className='form-control'
          placeholder='Enter Role (Organization/Individual)'
        />
        <button className='btn btn-secondary btn-lg btn-block' type='submit'>
          Register
        </button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default Register;
