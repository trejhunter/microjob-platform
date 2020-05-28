import Head from 'next/head';
import Header from './Header';
import Navigation from './Navigation';

const Layout = (props) => (
  <div style={{ height: '100%' }}>
    <Head>
      <title>Go Missioned</title>
      <link
        rel='stylesheet'
        href='https://bootswatch.com/4/flatly/bootstrap.min.css'
      />
    </Head>
    <Navigation />
    <Header />
    <div>{props.children}</div>
  </div>
);

export default Layout;
