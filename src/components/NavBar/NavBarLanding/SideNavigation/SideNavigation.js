import Link from 'next/link';
import './SideNavigation.css';

const SideNavigation = (props) => {
  let sideNavClasses = ['side_navigation'];
  if (props.show) {
    sideNavClasses = ['side_navigation open'];
  }
  return (
    <div className='container'>
      <nav className={sideNavClasses}>
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
      </nav>
    </div>
  );
};

export default SideNavigation;
