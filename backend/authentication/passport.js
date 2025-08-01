const passport = require('passport');
const auth_strategy = require('passport-google-oauth20').Strategy;
const player = require('../models/users');

passport.use(
    new auth_strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.NODE_ENV == "development" ? 'http://localhost:8080/auth/google/callback' : process.env.GOOGLE_CALLBACK_URL,
        scope: ["profile", "email"],
        passReqToCallback: true
    },
    async function(req, accessToken, refreshToken, profile, done) {
        try {
            const email = profile.emails[0].value;
            const emailDomain = email.split('@')[1];

            if (emailDomain !== 'dlsu.edu.ph') {
                return done(null, false);
            }

            let user = await player.findOne({email: profile.emails[0].value})
            if (!user) {
                // same logic as addPlayer with fullName
                const fullName = `${profile.name.givenName} ${profile.name.familyName}`;
                user = await player.create({ email, fullName });
            }
            req.session.user = {
               // ...profile,
                _id: user._id,
                email: user.email,
                fullName: user.fullName,
                givenName: profile.name?.givenName ?? '',
                familyName: profile.name?.familyName ?? '',
                photos: profile.photos?.[0]?.value ?? ''
            };
            console.log("req.user:", req.user);
            console.log("req.session.user:", req.session.user);
            done(null, profile);
        } catch (error) {
            done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;