require('dotenv').config();

const express = require('express');
const db = require('./db');
const app = express();

app.use(express.json());

// Get all profiles
app.get('/api/v1/profiles', async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM profiles');
    const bosses = await db.query('SELECT * FROM bosses');
    // console.log(results);
    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: {
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
    console.log(results.rows[0]);
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

// Update a profile
app.put('/api/v1/profiles/:id', async (req, res) => {
  try {
    const results = await db.query(
      'UPDATE profiles SET profile_name = $1, profile_public = $2 WHERE profile_id = $3 RETURNING *',
      [req.body.profile_name, req.body.profile_public, req.params.id]
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

//Listen to port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
