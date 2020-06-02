import Layout from '../components/Layout';
import privateRoute from '../higher-order-components/PrivateRoute';

const MyJobs = () => (
  <Layout>
    <h1 style={{ textAlign: 'center' }}> My Job's Page... Soon coming</h1>
  </Layout>
);

export default privateRoute(MyJobs);
