import { useState, useContext } from 'react';
import AuthService from '../helper-functions/AuthService';
import Message from '../components/Message';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';

const Login = (props) => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    AuthService.login(user).then((data) => {
      const { isAuthenticated, user, message } = data;
      console.log(data);
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        router.push('/');
      } else setMessage(message);
    });
  };

  return (
    <div className='container'>
      <form onSubmit={onSubmit}>
        <h3>Please Log In to your Account</h3>
        <label htmlFor='username' className='sr-only'>
          Email:
        </label>
        <input
          type='text'
          name='username'
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
          onChange={onChange}
          className='form-control'
          placeholder='Enter Password'
        />
        <button className='btn btn-secondary btn-lg btn-block' type='submit'>
          Log In
        </button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default Login;
