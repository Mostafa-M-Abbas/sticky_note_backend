const express = require('express');
const app = express(); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const notesRoutes = require('./routes/notes');

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs'); 

mongoose.connect("mongodb://localhost:27017/notesDB", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
    .then(() => {
    console.log('Connected to MongoDB'); 
    })
    .catch((err) => {
    console.error('Error connecting to MongoDB', err);
})
app.use('/notes', notesRoutes); 

app.get('/', (req, res) => {
    res.redirect('/notes') ; 
})
app.listen(3000, () => {
    console.log('Server running on port 3000');
});