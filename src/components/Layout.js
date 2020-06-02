import Head from 'next/head';
import Header from './Header';
import Navigation from './Navigation';

const Layout = (props) => (
  <div style={{ height: '100%' }}>
    <Head>
      <title>MicroJob Platform</title>
      {/* <link rel='stylesheet' href='/bootstrap.min.css' /> */}
    </Head>

    <Navigation />
    <Header />
    <div>{props.children}</div>
  </div>
);

export default Layout;
