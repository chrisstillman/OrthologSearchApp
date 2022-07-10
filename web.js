const express = require('express')
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (res,req)=>res.send("Hello"))

app.listen(PORT, () => {
    console.log(`Example app listening on port ${port}`)
  })