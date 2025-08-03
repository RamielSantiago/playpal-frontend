require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./authentication/passport');
const mongoose = require('mongoose');
const router = require('./db/crudRoutes');
const MongoStore = require('connect-mongo');
const app = express();
//
app.use(express.json());
app.use(cors({
  origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://playpal-frontend.vercel.app',
  credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      autoRemove: 'interval',
      autoRemoveInterval: 1440, // Interval time unit is Minutes; 1440 minutes = 24 Hours 
      dbName: 'test',
      collectionName: 'sessions'}),
    saveUninitialized: false,
    cookie: {
    secure: process.env.NODE_ENV === 'development' ? false : true,
    sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
    maxAge: 24 * 60 *60 * 1000 
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/crud', router);

app.get('/', (req, res) => {
  res.json({ message: 'PlayPal API is running' });
});

/*app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);*/

app.get('/auth/google', (req, res, next) => {
    const callbackURL = process.env.NODE_ENV === 'development'
        ? 'http://localhost:8080/auth/google/callback'
        : process.env.GOOGLE_CALLBACK_URL;

    console.log("📡 Sending Google OAuth request with redirect URI:", callbackURL);
    next();
}, passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/home' : 'https://playpal-frontend.vercel.app/home',
        failureRedirect: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://playpal-frontend.vercel.app'
    })
);

app.get('/auth/success', (req, res) => {
    res.json({ user: req.user });
});

app.get("/auth/me", (req, res) => {
    const sessionUser = req.session?.user;
    if (!sessionUser) {
        return res.status(200).json({ user: null }); //return null for now
    }
    //const email = req.user.emails && req.user.emails[0] ? req.user.emails[0].value : null;
    /*const emailDomain = email.split('@')[1];

    if (emailDomain !== 'dlsu.edu.ph') {
        return res.status(403).json({ 
            error: "Only DLSU emails are allowed",
            isDLSUEmail: false 
        });
    }*/

    /* set fullName if available
    let userWithFullName = { ...req.user };
    if (req.session && req.session.user && req.session.user.fullName) {
        userWithFullName.fullName = req.session.user.fullName;
    }*/

    res.json({ 
        user: {
            email: sessionUser.email,
            fullName: sessionUser.fullName,
            givenName: sessionUser.givenName,
            familyName: sessionUser.familyName,
            pfp: sessionUser.photos
        },
        isDLSUEmail: sessionUser.email.endsWith('@dlsu.edu.ph') ?? false 
    });
});
app.get('/profile', isAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

app.get('/home', isAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}

//MongoDB Connection with retry (just in case it fails)
const connectWithRetry = (retries = 5, delay = 10000) => {
  mongoose.connect(process.env.MONGODB_URI, {
    //dbName: 'PlayPal',
    dbName: 'test' //for sample data
  }).then(() => {
    console.log('DB Connection Established');
  }).catch((error) => {
    console.log(`DB Connection Failed (${retries} retries left):`, error);
    if (retries > 0) {
      setTimeout(() => connectWithRetry(retries - 1, delay), delay);
    } else {
      console.log('All retries fin. Could not connect to MongoDB.');
    }
  });
};
connectWithRetry();


  //PORT 8080 by default for now
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = app;
