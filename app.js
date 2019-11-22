const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const postRoutes = require('./routes/post');

mongoose.connect('mongodb+srv://luckidubi:VHqUGlBRquZNynH7@cluster0-ogi9i.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }).then(() => {
    console.log('MongoDB Atlas Connection successful');
}).catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/post', postRoutes);


module.exports = app;
