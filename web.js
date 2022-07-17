const express = require('express')
const app = express();
const {webOrtholog} = require('./webOrtholog')

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/',express.static('public'));

app.post('/generate', (req,res)=>{
    const values = req.body.values;
    webOrtholog(values, (link)=>{
        res.send(link+'')
        console.log(link)
    });
})



app.listen(PORT, () => {
    console.log('Example app listening on port '+PORT)
  });