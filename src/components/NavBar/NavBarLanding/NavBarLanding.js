import Link from 'next/link';
import './NavBarLanding.css';
import './SideNavigation/HamburgerButton';
import HamburgerButton from './SideNavigation/HamburgerButton';

const NavBar = (props) => (
  <>
    <header className='toolbar navbar-dark bg-primary'>
      <div className='container'>
        <nav className='toolbar_navigation'>
          <div className='toolbar_hamburger'>
            <HamburgerButton click={props.clickHandler} />
          </div>

          <div className='toolbar_logo'>
            <Link href='/'>
              <a>MICRO JOB PLATFORM</a>
            </Link>
          </div>

          <div className='spacer' />

          <div className='toolbar_navigation_items'>
            <ul>
              <li>
                <Link href='/authentication/sign-up'>
                  <a>Sign Up</a>
                </Link>
              </li>
              <li>
                <Link href='/authentication/log-in'>
                  <a>Log In</a>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
    <div style={{ marginTop: '64px' }}></div>
  </>
);

export default NavBar;
