const db = require('../db/index');


const addOrg = (userId, inputOrgName) => {

  return db.getUserOrgs(userId)
    .then(orgs => {

      //Check for Duplicate Entry
      for (let org of orgs) {
        console.log("ALL ORGS", org.name, inputOrgName);
        if (org.name === inputOrgName) {
          return null;
        }
      }
      return userId;
    })
    .then((user) => {
      if (user) {
        console.log(">> adding org");
        //Add to DB
        return db.addOrg(inputOrgName);

      }
      console.log('Failed to add Org');
      return null;
    }).then((newOrg) =>{
      //Links the Org to the user
      db.addUserToOrg(userId, newOrg.id, true);
    });

};


module.exports = addOrg;
