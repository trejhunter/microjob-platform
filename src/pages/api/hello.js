// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from '../../../utils/dbConnect';

dbConnect();
const User = require('../../../models/User');

const userInput = {
  username: 'noobcoder1234',
  email: 'noobcoder@gmail.com',
  password: '123456789',
  role: 'minister',
};

const user = new User(userInput);
user.save((err, document) => {
  if (err) console.log(err);
  else console.log(document);
});

export default (req, res) => {
  res.statusCode = 200;
  res.json({ name: 'John Doe' });
};
