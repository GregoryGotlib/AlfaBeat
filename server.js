const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const userPosts = require('./routes/api/posts');


const app = express();

// Database Config
const DB = require('./config/keys').mongoURI;

// Connect to mongoDB
mongoose.connect(DB,{ useNewUrlParser: true }).then(() => console.log('Connected to mongoDB..')).catch(error => console.log(error));

app.use('/api/posts',userPosts);
app.use('/api/users',users);
app.use('/api/profile',profile);

app.get('/', (req,res) => res.send('Hello world !!!!'));

const PORT = process.env.PORT || 5000;

app.listen(PORT , ()=>
    console.log(`Server running on port: ${PORT}`)
)

