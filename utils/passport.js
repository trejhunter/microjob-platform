const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const User = require('../models/User');

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['access_token'];
  }
  return token;
};

// Authorization
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: 'HK151987',
    },
    (payload, done) => {
      User.findById({ _id: payload.sub }, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        else return done(null, false);
      });
    }
  )
);

// Authentication using Google OAuth
passport.use(
  new GoogleTokenStrategy(
    {
      clientID:
        '1093704183318-driiu8nepk3kcsiu2vu80o1utb3970qn.apps.googleusercontent.com',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);
        console.log('profile', profile);

        // Check if the user exists in the database
        const existingUser = await User.findOne({ 'google.id': profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }

        // Create new account if the user doesn't exist
        const newUser = new User({
          method: 'google',
          google: {
            id: profile.id,
            email: profile.emails[0].value,
          },
        });

        await newUser.save();
        done(null, newUser);
      } catch (err) {
        done(err, false, err.message);
      }
    }
  )
);

// Authentication using username and password
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ 'local.email': username }, (err, user) => {
      // Something went wrong with the database
      if (err) return done(err);
      // No user exists
      if (!user) return done(null, false);
      // Check if password is correct
      user.comparePassword(password, done);
    });
  })
);
