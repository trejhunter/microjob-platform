import nextConnect from 'next-connect';
import dbConnect from '../../../utils/dbConnect';
import passport from 'passport';
import passportConfig from '../../../utils/passport';
import JWT from 'jsonwebtoken';
import { serialize } from 'cookie';

const handler = nextConnect();

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: 'GoMissioned',
      sub: userID,
    },
    'HK151987',
    { expiresIn: '1h' }
  );
};

handler
  .use((req, res, next) => {
    dbConnect();
    next();
  })
  .use(passport.authenticate('local', { session: false }))
  .post((req, res) => {
    if (req.isAuthenticated()) {
      const { _id, email, role } = req.user;
      const token = signToken(_id);
      res.setHeader(
        'Set-Cookie',
        serialize('access_token', token, { httpOnly: true, sameSite: true })
      );
      res.status(200).json({ isAuthenticated: true, user: { email, role } });
    }
  });

export default handler;
