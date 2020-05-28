import nextConnect from 'next-connect';
import dbConnect from '../../../utils/dbConnect';
import passport from 'passport';
import passportConfig from '../../../utils/passport';

const handler = nextConnect();

handler
  .use((req, res, next) => {
    dbConnect();
    next();
  })
  .use(passport.authenticate('jwt', { session: false }))
  .get((req, res) => {
    res.setHeader(
      'Set-Cookie',
      'access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    );
    res.json({ user: { username: '', role: '' }, success: true });
  });

export default handler;
