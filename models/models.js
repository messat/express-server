const fs = require('fs/promises')

exports.selectOwnersById = async (ownersId) =>{
    try {
        const ownersProfile = await fs.readFile(`./data/owners/o${ownersId}.json`, 'utf-8')
        console.log(ownersProfile)
        const parsedOwnersData = JSON.parse(ownersProfile)
        return parsedOwnersData
    } catch (e){
        throw e
    }

}