const db = require('../db/index');


const addUserToOrg = (userId, inputOrgId, canWrite) => {

  return db.getUserOrgs(userId)
    .then(orgs => {

      //Check for Duplicate Entry
      for (org of orgs) {
        console.log(org.id)
        if (org.id === inputOrgId) {
          return null
        }
      }
    })
    .then(() => {
      //Add to DB
      db.addUserToOrg(inputOrgId, userId, canWrite)
    })

};

module.exports = addUserToOrg;

