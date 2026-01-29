const shortid = require('shortid');
const URL = require('../models/url')


async function handleGenerateNewShortURL(req, res) {
     const body = req.body;
     if(!body.url) return res.status(400).json({error : 'URL is required'});
    const shortId = shortid.generate()
     await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
     })
     return res.render('home', {
      id : shortId,
     })
}

async function handleGetById(req, res) {
   const shortId = req.params.shortId;
   const entry =  await URL.findOneAndUpdate({shortId},
      {
         $push : {
            visitHistory : {
               timestamp : Date.now(),
            }
         }
      }
   )
   res.redirect(entry.redirectURL);
}

async function handleGetAnalytics(req, res){
   const shortId = req.params.shortId;
   const result = await URL.findOne({shortId})
   return res.json({totalClicks : result.visitHistory.length, analystics : result.visitHistory})
}

module.exports = {handleGenerateNewShortURL, handleGetAnalytics, handleGetById}