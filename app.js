const express = require('express')
const { getOwnersById, getAllOwners, getAllPetsByOwnerId, getAllPets, petById, patchOwnerById, postNewOwner, postNewPet, deletePet, deleteOwner } = require('./controller/controller')
const app = express()
const fs = require('fs/promises')

app.set('views', './views')
app.set('view engine', 'pug')
app.use(express.json())

app.use(async (req,res, next)=>{
    const methodReq = req.method
    const urlReq = req.originalUrl
    let currentTime = new Date();
    const loggedData = {method: methodReq, url: urlReq, currentTime: currentTime}
    await fs.appendFile('./log.txt', JSON.stringify(loggedData, null, 2))
    next()
})

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

app.delete('/api/pets/:id', deletePet)

app.delete('/api/owner/:id', deleteOwner)

app.get("*", (req, res)=>{
    res.status(404).send({message: "404 Route Not found"})
})

app.listen(4040, ()=>{
    console.log("Listening from port 4040")
})