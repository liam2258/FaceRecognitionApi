import express from 'express';
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcrypt-nodejs';
import register from './controllers/register.js';
import signin from './controllers/signin.js';
import image from './controllers/image.js';

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
  });

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', function (req, res) {
    res.json('Success');
})

app.post('/signin', function(req, res){
    signin.handleSignin(req, res, db, bcrypt)
})

app.post('/register', function(req, res){
    register.handleRegister(req, res, db, bcrypt)
})

app.get('/profile/:id', function (req, res) {
    profile.handleProfile(req, res, db)
})

app.put('/image', function(req, res) {
    image.handleImage(req, res, db)
})

app.post('/imageurl', function(req, res) {
    image.handleApiCall(req, res)
})

app.listen(process.env.PORT || 3000, function() {
    console.log(`app is running on port ${process.env.PORT}`);
})