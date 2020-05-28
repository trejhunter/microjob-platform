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
    if (req.user.role === 'organization') {
      res.json({ role: 'org' });
    } else if (req.user.role === 'minister') {
      res.json({ role: 'user' });
    }
  });

export default handler;
