const express = require('express')
const app = express();
const {webOrtholog} = require('./webOrtholog')

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/generate', (req,res)=>{
    const values = req.body.values;
    webOrtholog(values, (link)=>{
        console.log("executing webortholog callback");
        res.set('Content-Type', 'text/plain');
        res.send(link)
    });
})

app.use('/',express.static('public'));



app.listen(PORT, () => {
    console.log('Example app listening on port '+PORT)
  });