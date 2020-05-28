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
    const { email, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { email, role } });
  });

export default handler;
