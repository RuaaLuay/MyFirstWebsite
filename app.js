const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const connectDB = require('./server/config/db');
const bodyParser = require('body-parser');
const Contact = require('./server/models/contact');
const PORT = 3000 || process.env.PORT;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();


// Routes
app.get('/', (req, res) => {
    res.render('index');
});
app.post('/contact', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        const savedContact = await newContact.save();
        res.status(201).json({ message: 'Contact saved successfully', contact: savedContact });
    } catch (err) {
        if (err.errors) {
            const firstErrorKey = Object.keys(err.errors)[0]; 
            const firstErrorMessage = err.errors[firstErrorKey].message; 
            res.status(400).json({ message: firstErrorMessage });
        } else {
            res.status(400).json({ message: err.message });
        }
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});