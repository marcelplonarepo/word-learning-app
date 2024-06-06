require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
app.use(express.json())
app.use(cors());

const wordsRoutes = require('./routes/words');

app.use('/words', wordsRoutes);

mongoose.set('strictQuery', true);
mongoose.connect(process.env.URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port: ${process.env.PORT} `);
        });
    })
    .catch(err => {
        console.log(err);
        throw err;
    });