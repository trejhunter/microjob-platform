import NavBar from './NavBar/NavBarLanding/NavBarLanding';
import Backdrop from './Backdrop/Backdrop';
import SideNavigation from './NavBar/NavBarLanding/SideNavigation/SideNavigation';
import { useState } from 'react';

const Navigation = () => {
  const [sideNavigationOpen, setSideNavigationOpen] = useState(false);

  const sideNavigationClickHandler = () => {
    setSideNavigationOpen((prevSideNavigationOpen) => !prevSideNavigationOpen);
  };

  const backdropClickHandler = () => {
    setSideNavigationOpen(false);
  };

  let sideNavigation;
  let backDrop;

  if (sideNavigationOpen) {
    backDrop = <Backdrop click={backdropClickHandler} />;
  }

  return (
    <div>
      <NavBar clickHandler={sideNavigationClickHandler} />
      <SideNavigation show={sideNavigationOpen} />
      {backDrop}
    </div>
  );
};

export default Navigation;
