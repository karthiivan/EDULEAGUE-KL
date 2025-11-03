const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

module.exports = () => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user exists
          let user = await User.findOne({ 'codingProfiles.github.username': profile.username });

          if (user) {
            // Update GitHub data
            user.codingProfiles.github = {
              username: profile.username,
              repos: profile._json.public_repos,
              contributions: 0 // Would need GitHub API call to get this
            };
            await user.save();
            return done(null, user);
          }

          // Check if user exists by email
          user = await User.findOne({ email: profile._json.email });

          if (user) {
            // Link GitHub account
            user.codingProfiles.github = {
              username: profile.username,
              repos: profile._json.public_repos,
              contributions: 0
            };
            await user.save();
            return done(null, user);
          }

          // Create new user
          user = await User.create({
            name: profile.displayName || profile.username,
            email: profile._json.email || `${profile.username}@github.com`,
            password: Math.random().toString(36).slice(-8), // Random password
            role: 'student',
            codingProfiles: {
              github: {
                username: profile.username,
                repos: profile._json.public_repos,
                contributions: 0
              }
            }
          });

          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};
