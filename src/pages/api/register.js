import nextConnect from 'next-connect';
import User from '../../../models/User';
import dbConnect from '../../../utils/dbConnect';

const handler = nextConnect();

handler
  .use((req, res, next) => {
    dbConnect();
    next();
  })
  .post((req, res) => {
    const {
      local: { email, password },
      role,
    } = req.body;
    User.findOne({ 'local.email': email }, (err, user) => {
      if (err) {
        res.status(500).json({
          message: {
            msgBody: 'Error has occured in finding user',
            msgError: true,
          },
        });
      }
      if (user) {
        res.status(400).json({
          message: { msgBody: 'Username is already taken', msgError: true },
        });
      } else {
        const newUser = new User({
          method: 'local',
          local: { email, password },
          role,
        });
        newUser.save((err) => {
          if (err) {
            res.status(500).json({
              message: {
                msgBody: 'Error has occured in creating user',
                msgError: true,
              },
            });
          } else {
            res.status(201).json({
              message: {
                msgBody: 'Account succesfully created',
                msgError: false,
              },
            });
          }
        });
      }
    });
  });

export default handler;
