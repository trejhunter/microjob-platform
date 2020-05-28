import Head from 'next/head';
import NavBar from './NavBar/NavBarLanding';
import Header from './Header';

const Layout = (props) => (
  <div>
    <Head>
      <title>Go Missioned</title>
      <link
        rel='stylesheet'
        href='https://bootswatch.com/4/flatly/bootstrap.min.css'
      />
    </Head>

    <NavBar />
    <Header />
    <div>{props.children}</div>
  </div>
);

export default Layout;
