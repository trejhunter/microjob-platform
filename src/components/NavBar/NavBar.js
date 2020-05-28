import Link from 'next/link';
import AuthService from '../../context/AuthContext';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import './NavBar.css';
import './SideNavigation/HamburgerButton';
import HamburgerButton from './SideNavigation/HamburgerButton';

const NavBar = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  const unautehnticatedNavBar = () => {
    return (
      <>
        <div className='spacer' />
        <div className='toolbar_navigation_items'>
          <ul>
            <li>
              <Link href='/sign-up'>
                <a>Sign Up</a>
              </Link>
            </li>
            <li>
              <Link href='/log-in'>
                <a>Log In</a>
              </Link>
            </li>
          </ul>
        </div>
      </>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <>
        <form className='form-inline my-2 my-lg-0'>
          <input
            className='form-control mr-sm-2'
            type='text'
            placeholder='Search'
          />
          <button className='btn btn-secondary my-2 my-sm-0' type='submit'>
            Search
          </button>
        </form>
        <div className='spacer' />
        <div className='toolbar_navigation_items'>
          <ul>
            <li>
              <Link href='/'>
                <a>Catalog</a>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <a>My Jobs</a>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <a>Dashboard</a>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <a>✉️</a>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <a>🔔</a>
              </Link>
            </li>
            <li>
              <button
                type='button'
                className='btn btn-info'
                onClick={onClickLogoutHandler}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </>
    );
  };
  return (
    <>
      <header className='toolbar navbar-dark bg-primary'>
        <div className='container'>
          <nav className='toolbar_navigation'>
            <div className='toolbar_hamburger'>
              <HamburgerButton click={props.clickHandler} />
            </div>

            <div className='toolbar_logo'>
              <Link href='/'>
                <a>GO MISSIONED</a>
              </Link>
            </div>

            {!isAuthenticated ? unautehnticatedNavBar() : authenticatedNavBar()}
          </nav>
        </div>
      </header>
      <div style={{ marginTop: '64px' }}></div>
    </>
  );
};

export default NavBar;
