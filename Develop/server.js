const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');

// const api = require('./public/assets/js/index');

const PORT = process.env.PORT || 3002;

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

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', (err,data) => {
    if (err) {
      throw err
    } 
    res.send(data);
  })
});

app.post('/api/notes', (req,res) => {

  console.info(`${req.method} request recieved to add a review`);

  const { title, text } = req.body;

  if (title && text ) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      // upvotes: Math.floor(Math.random() * 100),
      id: uuidv4(),
    };


    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new review
        parsedNotes.push(newNote);

        // Write updated reviews back to the file
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note');
  }
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
