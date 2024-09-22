const express = require('express')
const { getOwnersById, getAllOwners, getAllPetsByOwnerId, getAllPets, petById, patchOwnerById, postNewOwner, postNewPet } = require('./controller/controller')
const app = express()


app.use(express.json())

app.get('/api', (req, res)=>{
    res.send("Hello world from the Home page")
})

app.get('/api/owners/:id', getOwnersById)

app.get('/api/owners', getAllOwners)

app.get('/api/owners/:id/pets', getAllPetsByOwnerId)

app.get('/api/pets', getAllPets)

app.get('/api/pets/:id', petById)

app.patch('/api/owner/update', patchOwnerById)

app.post('/api/owner/post', postNewOwner)

app.post('/api/owners/:id/pets', postNewPet)

app.get("*", (req, res)=>{
    res.status(404).send({message: "404 Route Not found"})
})

app.listen(4040, ()=>{
    console.log("Listening from port 4040")
})