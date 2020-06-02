import App from 'next/app';
import AuthProvider from '../context/AuthContext';
import '../../public/bootstrap.min.css';
import '../../public/loading.css';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    );
  }
}

export default MyApp;
