const db = require('../db/index');


const newOrg = (userId, inputOrgName) => {

  return db.getUserOrgs(userId)
    .then(orgs => {

      //Check for Duplicate Entry
      for (let org of orgs) {
        if (org.name === inputOrgName) {
          return null;
        }
      }
      return userId;
    })
    .then((user) => {
      if (user) {
        console.log(">> adding org", userId, inputOrgName);
        //Add to DB
        return db.addOrg(inputOrgName);

      }
      console.log('Failed to add Org');
      return null;
    }).then((newOrg) =>{
      //Links the Org to the user
      return db.addUserToOrg(userId, newOrg.id, true);
    });

};


module.exports = newOrg;
