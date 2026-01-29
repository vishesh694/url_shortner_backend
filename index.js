const express = require('express');
const urlRoutes = require('./routes/url')
const {connectToMongoDB} = require('./connect');
const URL = require('./models/url');
const { now } = require('mongoose');
const path = require('path');
const staticRoute = require('./routes/staticRouter');

const app = express();

const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/short_url').then(() => console.log('MongoDB connected'))

app.set("view engine", "ejs");
app.set('views', path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({extended : false})) 

app.get('/test', async (req, res) =>{
    const allUrls = await URL.find({})
    res.render('home', {
        urls : allUrls,
    })
})

app.use('/', staticRoute);
app.use('/url', urlRoutes);


app.listen(PORT, ()=> console.log(`Server Startes at PORT : ${PORT}`))