import { Component } from 'react';
import redirect from '../helper-functions/redirect';
import fetch from 'isomorphic-fetch';

const privateRoute = (Comp) => {
  return class PrivateRoute extends Component {
    static async getInitialProps(ctx) {
      const res = await fetch(`${process.env.SITE_URL}/api/authenticated`);
      if (res.status === 401) {
        redirect(ctx, '/log-in?redirected=true');
        return { redirected: true }; //Add the link that they are redirected from in case they need to go back
      }

      return { redirected: false };
    }

    render() {
      return <Comp {...this.props} />;
    }
  };
};

export default privateRoute;
