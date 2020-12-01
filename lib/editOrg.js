const db = require('../db/index');

//Takes Both
const editOrg = (userId, formObject) => {

  return db.getUserOrgs(userId)
    .then(orgs => {
      //Check for Duplicate Entry
      for (let org of orgs) {
        if (org.name === formObject.name) {
          console.log("Org Name already exists")
          return null;
        }
      }
      return userId
    })
    .then((userId) => {
      //Edit DB Entry
      if (userId) {
        db.updateOrg(formObject);
      }
    })

};

module.exports = editOrg;

const values = {
  name: 'Flowers By Kate', url: 'newUrl', orgId: 24
};

editOrg(1, values)
