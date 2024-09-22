const {
  selectOwnersById,
  selectAllOwners,
  selectAllPetsByOwnerId,
  selectAllPets,
  selectPetById,
  updateOwnerById,
  addnewOwner,
} = require("../models/models");

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
    if (allOwnersData.length) {
      res.status(200).send({ Owners: allOwnersData });
    }
  } catch (e) {
    console.log(e);
    res.status(404).send({ error: e });
  }
};

exports.getAllPetsByOwnerId = async (req, res) => {
  const { id } = req.params;

  try {
    const petsByOwnerId = await selectAllPetsByOwnerId(id);
    if (petsByOwnerId.length) {
      res.status(200).send({ "Owner By ID": petsByOwnerId });
    } else {
      res.status(404).send({ message: "404 Not Found" });
    }
  } catch (e) {
    console.log(e);
  }
};

exports.getAllPets = async (req, res) => {
  const { temperament } = req.query;
  try {
    const allPets = await selectAllPets(temperament);
    if (allPets.length) {
      res.status(200).send({ allPets });
    } else {
      res.status(404).send({ message: "404 Route Not Found" });
    }
  } catch (e) {
    console.log(e);
  }
};

exports.petById = async (req, res) => {
  const { id } = req.params;

  try {
    const petId = await selectPetById(id);
    res.status(200).send({ petId });
  } catch (e) {
    console.log(e);
    res.status(404).send({ message: "404 Not Found" });
  }
};

exports.patchOwnerById = async (req, res) => {
  const { id, name, age } = req.body;
  try {
    const patchedOwner = await updateOwnerById(id, name, age);
    if (!Array.isArray(patchedOwner)) {
      res.status(200).send({ patchedOwner });
    } else {
      res.status(304).send({ message: "Body does not follow schema" });
    }
  } catch (e) {
    console.log(e);
    res.status(404).send({ message: "404 Body not updated" });
  }
};

exports.postNewOwner = async (req, res) => {
  const { name, age } = req.body;
  try {
    const newOwner = await addnewOwner(name, age);
    if(typeof newOwner.name === 'string' && typeof newOwner.age === 'number'){
      res.status(201).send({ newOwner });
    } else {
      res.status(404).send({message: "404 Body does not follow schema"})
    }
  } catch (e) {
    console.log(e);
    res.status(404).send({message: "404 Not found"})
  }
};
