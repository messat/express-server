const express = require('express')
const app = express()

app.get('/api', (req, res)=>{
    res.send("Hello world from the Home page")
})

app.listen(4040, ()=>{
    console.log("Listening from port 4040")
})