require('dotenv').config();

const express = require('express');
const db = require('./db');
const app = express();

app.use(express.json());

// Get all profiles
app.get('/api/v1/profiles', async (req, res) => {
  const results = await db.query('SELECT * FROM users');
  console.log(results);
  res.status(200).json({
    status: 'success',
    data: {
      profile: ['first', 'lvl1']
    }
  });
});

// Get one profile
app.get('/api/v1/profiles/:id', (req, res) => {
  console.log(req.params);

  res.status(200).json({
    status: 'success',
    data: {
      profile: 'second'
    }
  });
});

// Create a profile
app.post('/api/v1/profiles', (req, res) => {
  console.log(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      profile: '5th'
    }
  });
});

// Update a profile
app.put('/api/v1/profiles/:id', (req, res) => {
  console.log(req.params.id);
  console.log(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      profile: '3rd'
    }
  });
});

// Delete a profile
app.delete('/api/v1/profiles/:id', (req, res) => {
  console.log(req.params.id);

  res.status(204).json({
    status: 'success'
  });
});

//Listen to port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
