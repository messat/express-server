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
    throw e;
  }
};

exports.selectAllPets = async (temperament) => {
  try {
    const allPets = [];

    const petsDirectory = await fs.readdir("./data/pets", "utf-8");
    for (const petsFile of petsDirectory) {
      const petsProfile = JSON.parse(
        await fs.readFile(`./data/pets/${petsFile}`, "utf-8")
      );
      allPets.push(petsProfile);
    }
    if (temperament) {
      return allPets.filter((pet) => {
        return pet.temperament === temperament;
      });
    }
    return allPets;
  } catch (e) {
    throw e;
  }
};

exports.selectPetById = async (petId) => {
  try {
    const petProfile = JSON.parse(
      await fs.readFile(`./data/pets/${petId}.json`, "utf-8")
    );
    return petProfile;
  } catch (e) {
    throw e;
  }
};

exports.updateOwnerById = async (id, name, age)=>{
    try {
      if(id && name && age){
        const ownerProfile = JSON.parse(await fs.readFile(`./data/owners/${id}.json`, 'utf-8'))
        const newOwnerProfile = Object.assign(ownerProfile, {id: id, name: name, age: age})
        const updateOwner = await fs.writeFile(`./data/owners/${id}.json`, JSON.stringify(newOwnerProfile, null, 2))
        const readUpdatedOwner = JSON.parse(await fs.readFile(`./data/owners/${id}.json`, 'utf-8'))
        return readUpdatedOwner
      } else {
        return []
      }
    } catch (e){
      throw e
    }
}
