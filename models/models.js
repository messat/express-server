const fs = require("fs/promises");

exports.selectOwnersById = async (ownersId) => {
  try {
    const ownersProfile = await fs.readFile(
      `./data/owners/${ownersId}.json`,
      "utf-8"
    );
    const parsedOwnersData = JSON.parse(ownersProfile);
    return parsedOwnersData;
  } catch (e) {
    throw e;
  }
};

exports.selectAllOwners = async () => {
  try {
    const ownersDir = await fs.readdir("./data/owners", "utf-8");
    const allOwners = [];
    for (const ownerProfile of ownersDir) {
      const ownerIdObj = JSON.parse(
        await fs.readFile(`./data/owners/${ownerProfile}`, "utf-8")
      );
      allOwners.push(ownerIdObj);
    }
    return allOwners;
  } catch (e) {
    throw e;
  }
};

exports.selectAllPetsByOwnerId = async (ownerId) => {
  try {
    const allPetsByOwner = [];

    const petsDirectory = await fs.readdir("./data/pets", "utf-8");
    for (const petsFile of petsDirectory) {
      const petsProfile = JSON.parse(
        await fs.readFile(`./data/pets/${petsFile}`, "utf-8")
      );
      allPetsByOwner.push(petsProfile);
    }

    const filterPetsById = allPetsByOwner.filter((pet) => {
      return pet.owner === ownerId;
    });
    return filterPetsById;
  } catch (e) {
    throw e
  }
};
