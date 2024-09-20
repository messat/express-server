const { selectOwnersById, selectAllOwners, selectAllPetsByOwnerId } = require("../models/models");

exports.getOwnersById = async (req, res) => {
  const { id } = req.params;
  try {
    const ownersFileData = await selectOwnersById(id);
    res.status(200).send({ "Owner Profile": ownersFileData });
  } catch (e) {
    res.status(404).send({ message: "404 Not Found" });
  }
};

exports.getAllOwners = async (req, res) => {
  try {
    const allOwnersData = await selectAllOwners();
    if (allOwnersData.length){
        res.status(200).send({ Owners: allOwnersData });
    }
  } catch (e) {
    console.log(e);
    res.status(404).send({error: e})
  }
};

exports.getAllPetsByOwnerId = async (req, res)=>{
    const {id} = req.params

    try {
        const petsByOwnerId = await selectAllPetsByOwnerId(id)
        if(petsByOwnerId.length){
            res.status(200).send({"Owner By ID":petsByOwnerId})
        } else {
            res.status(404).send({message: "404 Not Found"})
        }

    } catch (e){
        console.log(e)
    }
}