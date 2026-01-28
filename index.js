const express = require('express');
const urlRoutes = require('./routes/url')
const {connectToMongoDB} = require('./connect');
const URL = require('./models/url');
const { now } = require('mongoose');

const app = express();

const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/short_url').then(() => console.log('MongoDB connected'))

app.use(express.json())

app.use('/url', urlRoutes);
app.get('/:shortId', async (req, res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId     
    }, {$push : {
        visitHistory : {
            timestamp : Date.now(),
        },
    }})
    res.redirect(entry.redirectURL)
})


app.listen(PORT, ()=> console.log(`Server Startes at PORT : ${PORT}`))