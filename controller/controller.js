const { selectOwnersById, selectAllOwners } = require("../models/models");

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
