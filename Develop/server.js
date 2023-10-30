const express = require('express');
const path = require('path');
const notes = require('./db/db.json');

const PORT = 3002;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));

// Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.post('/api/notes', (req,res) => {
  console.log(`${req.method} request recieved`);

  const { title, text, id } = req.body;
})


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);


app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'notes.html'));
});