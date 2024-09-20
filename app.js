const express = require('express')
const { getOwnersById } = require('./controller/controller')
const app = express()

app.get('/api', (req, res)=>{
    res.send("Hello world from the Home page")
})

app.get('/api/owners/:id', getOwnersById)

app.listen(4040, ()=>{
    console.log("Listening from port 4040")
})