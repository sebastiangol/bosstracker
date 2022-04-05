require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

// Register!
app.post('/api/v1/register', async (req, res) => {
  try {
    // bcrypt
    // const saltRound = 10;
    // const salt = await bcrypt.genSalt(saltRound);

    // const bcryptPassword = await bcrypt.hash(req.body.user_password, salt);

    const results = await db.query(
      'INSERT INTO users(user_name, user_password) VALUES($1, $2) RETURNING *',
      [req.body.user_name, req.body.user_password]
    );
    if (results) {
      console.log(results);
      res.status(201).json({
        status: 'success',
        data: {
          users: results.rows[0]
        }
      });
    } else {
      console.log('This username already exists');
      res.status(403).json({
        status: 'error',
        message: 'This username already exists'
      });
    }
  } catch (err) {
    console.log(err);
    res.status(403).json({
      status: 'error',
      message: 'This username already exists'
    });
  }
});

// Log In
app.post('/api/v1/login', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM users WHERE lower(user_name) = $1 AND user_password = $2',
      [req.body.user_name, req.body.user_password]
    );
    console.log(result.rows);
    if (result) {
      console.log('valid');
      res.status(201).json({
        status: 'success',
        data: {
          users: result.rows[0]
        }
      });
    } else {
      console.log('invalid');
      res.status(403).json({
        status: 'error',
        message: 'Invalid username or password'
      });
    }
  } catch (err) {
    console.log(err);
    res.send({ err: err });
  }
});

// Get all profiles
app.get('/api/v1/profiles', async (req, res) => {
  try {
    const users = await db.query('SELECT user_id, user_name FROM users');
    const results = await db.query(
      'SELECT users.user_name, profile_id, profiles.user_id, profile_name, profile_public FROM profiles, users WHERE users.user_id = profiles.user_id ORDER BY profile_id ASC'
    );
    const bosses = await db.query('SELECT * FROM bosses');
    // console.log(results);
    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: {
        users: users.rows,
        profiles: results.rows,
        bosses: bosses.rows
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// Get one profile
app.get('/api/v1/profiles/:id', async (req, res) => {
  try {
    const results = await db.query(
      'SELECT * FROM profiles WHERE profile_id = $1',
      [req.params.id]
    );
    const bosses = await db.query(
      'SELECT * FROM bosses WHERE profile_id = $1',
      [req.params.id]
    );
    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: {
        profile: results.rows[0],
        bosses: bosses.rows
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// Get all profiles belonging to a certain user
app.get('/api/v1/profiles/user/:id', async (req, res) => {
  try {
    const users = await db.query(
      'SELECT user_id, user_name FROM users WHERE user_id = $1',
      [req.params.id]
    );
    const results = await db.query(
      'SELECT * FROM profiles WHERE profiles.user_id = $1 ORDER BY profile_id ASC',
      [req.params.id]
    );
    const bosses = await db.query('SELECT * FROM bosses');
    // console.log(results);
    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: {
        users: users.rows,
        profiles: results.rows,
        bosses: bosses.rows
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// Create a profile
app.post('/api/v1/profiles', async (req, res) => {
  try {
    const results = await db.query(
      'INSERT INTO profiles(user_id, profile_name, profile_public) VALUES($1, $2, $3) RETURNING *',
      [req.body.user_id, req.body.profile_name, req.body.profile_public]
    );
    console.log(results);
    res.status(201).json({
      status: 'success',
      data: {
        profiles: results.rows
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// Update a profile's publicity
app.put('/api/v1/profiles/:id', async (req, res) => {
  try {
    const results = await db.query(
      'UPDATE profiles SET profile_public = $1 WHERE profile_id = $2 RETURNING *',
      [req.body.profile_public, req.params.id]
    );
    console.log(results);
    res.status(200).json({
      status: 'success',
      data: {
        profiles: results.rows[0]
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// Delete a profile
app.delete('/api/v1/profiles/:id', async (req, res) => {
  try {
    const results = await db.query(
      'DELETE FROM profiles WHERE profile_id = $1',
      [req.params.id]
    );

    console.log(req.params.id);

    res.status(204).json({
      status: 'success'
    });
  } catch (err) {
    console.log(err);
  }
});

// Create a boss
app.post('/api/v1/profiles/:id', async (req, res) => {
  try {
    const results = await db.query(
      'INSERT INTO bosses(profile_id, boss_name, attempts, notes, completed) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [
        req.body.profile_id,
        req.body.boss_name,
        req.body.attempts,
        req.body.notes,
        req.body.completed
      ]
    );
    console.log(results);
    res.status(201).json({
      status: 'success',
      data: {
        boss: results.rows[0]
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// Delete a boss
app.delete('/api/v1/bosses/:id', async (req, res) => {
  try {
    const results = await db.query('DELETE FROM bosses WHERE boss_id = $1', [
      req.params.id
    ]);

    console.log(req.params.id);
    console.log(results);
    res.status(204).json({
      status: 'success'
    });
  } catch (err) {
    console.log(err);
  }
});

//Listen to port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
