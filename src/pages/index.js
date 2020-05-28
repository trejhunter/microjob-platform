import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const HomePage = () => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );

  const homePageDisplay = () => {
    if (isAuthenticated) {
      if (user.role === 'organization') {
        return <h1 style={{ textAlign: 'center' }}> Organization Dashboard</h1>;
      } else if (user.role === 'minister') {
        return <h1 style={{ textAlign: 'center' }}> Minister Dashboard </h1>;
      }
    } else {
      return <h1 style={{ textAlign: 'center' }}> Landing Page </h1>;
    }
  };

  return (
    <Layout>
      <div className='container'>{homePageDisplay()}</div>
    </Layout>
  );
};

export default HomePage;
