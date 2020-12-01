const db = require('../db/index');

const addNewSite = (formObject, userId) => {
  // To check for duplicates
  //JSON Stringify and compare ===
  // Compare only url then login
  // return db.getAllUserSites(userId)
  //   .then(allSites => {
  //     //Check for Duplicate Entry
  //   }
  //   })
  //Add to DB
  db.addSite(formObject)

};

module.exports = addNewSite;

// let testSite = {
//   url: 'www.otherSite.com',
//   login_name: 'myLogin',
//   account_email: 'me@email.ca',
//   tags: 'BUSINESS, Top Secret, Boss',
//   org_id: 18
// }
