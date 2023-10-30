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

  const { title, text, id } = req.body;

  if (title && text && id) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    const noteString = JSON.stringify(newNote);

    fs.writefile(`./db/${newNote.title}.json`, noteString, (err) => 
      err
      ? console.error(err)
      :console.log(
        `Review for ${newNote.title} has been written to json file`
      )
    );

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


app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'notes.html'));
});