const express = require('express')
const { getOwnersById, getAllOwners, getAllPetsByOwnerId, getAllPets } = require('./controller/controller')
const app = express()


app.get('/api', (req, res)=>{
    res.send("Hello world from the Home page")
})

app.get('/api/owners/:id', getOwnersById)

app.get('/api/owners', getAllOwners)

app.get('/api/owners/:id/pets', getAllPetsByOwnerId)

app.get('/api/pets', getAllPets)


app.get("*", (req, res)=>{
    res.status(404).send({message: "404 Route Not found"})
})

app.listen(4040, ()=>{
    console.log("Listening from port 4040")
})