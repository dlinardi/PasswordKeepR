const { emit } = require('nodemon');
const generatePassword = require('../lib/generatePassword')
require('dotenv').config({ path: '../.env' });
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
});

pool
  .connect()
  .then((client) => console.log(`Connecting to DB ${process.env.DB_NAME}`))
  .catch((err) => console.log(`Error connecting to ${process.env.DB_NAME}...`));


//========= CREATE =========================
const addUser = (formObject) => {
  const queryString = (`
    INSERT INTO users (email, password, first_name, last_name)
    VALUES
    ($1,$2,$3,$4)
    RETURNING *;
    `);
  const values = [
    formObject.email,
    formObject.password,
    formObject.first_name,
    formObject.last_name
  ];
  return Promise.resolve(pool.query(queryString, values)
    .then(res => {
      results = res.rows[0]
      console.log("DB RESULT", results)
      return results
    })
    .catch(err => console.error(e.stack))
  );



  // return Promise.resolve(pool.query(queryString, values)
  //   .then(res => {
  //     console.log(`Added User`, res.rows[0])
  //     return res.rows[0].id
  //   }));
}

const addOrg = (orgName) => {
  const queryString = (`
    INSERT INTO organizations
    (name)
    VALUES
    ($1)
    RETURNING *;
    `);
  const values = [
    orgName
  ];
  return pool.query(queryString, values)
    .then(res => {
      results = res.rows[0]
      return results
    })
}

// Org ID wont be on the form, backend JS will need to add it
const addSite = (formObject) => {
  formObject.account_email = formObject['account_email'].toLowerCase();

  formObject.tags = formObject['tags'].toLowerCase();
  const queryString = (`
    INSERT INTO sites (url, login_name, account_email, tags, password, org_id)
    VALUES
    ($1,$2,$3,$4,$5,$6)
    RETURNING *;
    `);
  const values = [
    formObject.url,
    formObject.login_name,
    formObject.account_email,
    formObject.tags,
    generatePassword(formObject.length, formObject.lowerCase, formObject.UpperCase, formObject.numbers, formObject.symbols),
    formObject.org_id
  ];
  return pool.query(queryString, values)
    .then(res => console.log(`Added Site`, res.rows));
}

const addUserToOrg = (userId, orgId, canWrite = true) => {
  const queryString = (`
  INSERT INTO org_users
  (user_id, org_id, can_write)
  VALUES
  ($1, $2, $3)
  RETURNING *;
  `);
  const values = [userId, orgId, canWrite];
  return pool.query(queryString, values)
    .then(res => console.log(`Added user to org`, res.rows));
};

//========= READ ===========================

const getUserWithEmail = (email) => {
  console.log("Get user w. email:", email)
  const queryString = (`
    SELECT * FROM users WHERE email = $1;
  `);
  const values = [email];
  return Promise.resolve(pool.query(queryString, values)
    .then(res => {
      results = res.rows[0]
      return results
    })
    .catch(err => console.error(e.stack))
  );
}

const getUserWithId = (id) => {
  const queryString = `
        SELECT id, first_name, last_name, email
        FROM users
        WHERE id = $1;
        `;

  return Promise.resolve(pool.query(queryString, [id])
    .then(res => {
      results = res.rows[0]
      return results
    })
    .catch(err => { console.log(err) })
  );
}

const getUsers = () => {
  return Promise.resolve(pool.query('SELECT id, first_name, last_name, email FROM users;')
    .then(res => {
      results = res.rows
      return results
    })
    .catch(err => { console.log(err) })
  );
}

const getAllUserSites = (userId) => {
  console.log("Get all Sites for user:", userId)
  // const queryString = `
  //   SELECT sites.*, orgs.name AS org_name
  //   FROM users
  //   JOIN org_users on org_users.user_id = users.id
  //   JOIN organizations orgs ON org_users.org_id = orgs.id
  //   JOIN sites ON sites.org_id = orgs.id
  //   WHERE users.id = $1
  //   ORDER BY orgs.name, sites.url;
  //   `;

  //Outer Join to show orgs w/o sites
  const queryString = `
    SELECT sites.url, sites.login_name, sites.account_email, sites.password, sites.tags, orgs.name AS org_name, orgs.id AS org_id
    FROM users
    JOIN org_users on org_users.user_id = users.id
    left outer JOIN organizations orgs ON org_users.org_id = orgs.id
    left outer  JOIN sites ON sites.org_id = orgs.id
    WHERE users.id = $1
    ORDER BY orgs.name, sites.url;
    `;
  const values = [userId];

  return Promise.resolve(pool.query(queryString, values)
    .then(res => {
      results = res.rows;
      // console.log("==============QAllSites",results)
      return results
    })
    .catch(err => { console.log(err) })
  );
}


const getUserSitesByOrg = (userId, orgId) => {
  console.log("Get all Sites for user:", userId, orgId)

  //Outer Join to show orgs w/o sites
  const queryString = `
    SELECT sites.url, sites.login_name, sites.account_email, sites.password, sites.tags, orgs.name AS org_name, orgs.id AS org_id
    FROM users
    JOIN org_users on org_users.user_id = users.id
    left outer JOIN organizations orgs ON org_users.org_id = orgs.id
    left outer  JOIN sites ON sites.org_id = orgs.id
    WHERE users.id = $1 AND orgs.id = $2
    ORDER BY orgs.name, sites.url;
    `;
  const values = [userId, orgId];

  return Promise.resolve(pool.query(queryString, values)
    .then(res => {
      results = res.rows;
      console.log("==============user/org", results)
      return results
    })
    .catch(err => { console.log(err) })
  );
}


const getAllUserSitesBySearch = (userId, searchString) => {
  console.log("Search for user, for...:", userId, searchString)
  const queryString = `
  SELECT sites.*, orgs.name AS org_name, org_users.*
  FROM users
  JOIN org_users on org_users.user_id = users.id
  JOIN organizations orgs ON org_users.org_id = orgs.id
  JOIN sites ON sites.org_id = orgs.id
  WHERE users.id = $1
  AND tags LIKE $2
  ORDER BY orgs.name, sites.url;
    `;

  const values = [userId, `%${searchString}%`]
  return Promise.resolve(pool.query(queryString, values)
    .then(res => {
      results = res.rows;
      // console.log(results)
      return results
    })
    .catch(err => { console.log(err) })
  );
}



const emailExists = (inputEmail) => {
  console.log("Checking if email exists:", inputEmail)
  const queryString = (`
    SELECT email FROM users WHERE email = $1;
  `);
  const values = [inputEmail];
  return Promise.resolve(pool.query(queryString, values)
    .then(res => {
      results = res.rows[0];
      if (!results) {
        console.log("No Results")
        return false;
      } else {
        console.log('match true')
        return true;
      }
    })
    .catch(err => console.error(err.stack))
  );
}

const getUserOrgs = (userId) => {
  console.log("Get orgs of user:", userId)
  const queryString = (`
  SELECT orgs.*
  FROM users
  JOIN org_users on org_users.user_id = users.id
  JOIN organizations orgs ON org_users.org_id = orgs.id
  WHERE users.id = $1;
  `);
  const values = [userId];
  return Promise.resolve(pool.query(queryString, values)
    .then(res => {
      results = res.rows;
      return results
    })
    .catch(err => { console.log(err) })
  );
}


const getOrgWithId = (id) => {
  const queryString = `
        SELECT id, name, display_picture as image
        FROM organizations
        WHERE id = $1;`

  return Promise.resolve(pool.query(queryString, [id])
    .then(res => {
      results = res.rows[0]
      return results
    })
    .catch(err => { console.log(err) })
  );
}

const getOrgIdwithName = (name) => {
  const queryString = `
        SELECT id,
        FROM organizations
        WHERE id = $1;`
  const values = [name]
  return Promise.resolve(pool.query(queryString, values)
    .then(res => {
      results = res.rows[0]
      return results
    })
    .catch(err => { console.log(err) })
  );
}

const getOrgUrls = (id) => {
  const queryString = `
    SELECT organizations.id as org_id, sites.id as site_id, url, login_name, account_email, password, tags, created_date, deleted_date, is_active
    FROM sites
    JOIN organizations ON organizations.id = org_id
    WHERE organizations.id = $1
    GROUP BY sites.id, organizations.id;
    `;

  return Promise.resolve(pool.query(queryString, [id])
    .then(res => {
      results = res.rows;
      console.log(results);
      return results
    })
    .catch(err => { console.log("!!! ", err) })
  );
}


const getOrgUrlsWithSiteId = (orgId, siteId) => {

  const queryString = `
    SELECT organizations.id as org_id, sites.id as site_id, url, login_name, account_email, tags, password, created_date, deleted_date, is_active
    FROM sites
    JOIN organizations ON organizations.id = org_id
    WHERE organizations.id = $1 AND sites.id = $2
    GROUP BY sites.id, organizations.id;
    `

  const values = [orgId, siteId];

  return Promise.resolve(pool.query(queryString, values)
    .then(res => {
      results = res.rows;
      console.log(results);
      return results
    })
    .catch(err => { console.log("!!! ", err) })
  );
}

const getUrlWithTags = (tag, org_id) => {
  tag = tag.toLowerCase()
  console.log("Get URLs w. Tag:", tag)
  const queryString = (`
    SELECT * FROM sites WHERE tags LIKE $1 AND org_id = $2;
  `);
  const values = [`%${tag}%`, org_id];
  return Promise.resolve(pool.query(queryString, values)
    .then(res => {
      results = res.rows;
      console.log(results);
      return results
    })
    .catch(err => { console.log("!!! ", err) })
  );
}

const getOrgs = () => {
  return Promise.resolve(pool.query(`SELECT * FROM organizations;`)
    .then(res => {
      results = res.rows;
      return results
    })
    .catch(err => { console.log(err) })
  );
}

const getOrgUsers = (orgId) => {
  const queryString = `
    SELECT users.id as user_id, first_name, last_name, email, users.display_picture as image
    FROM org_users
    JOIN users ON users.id = user_id
    JOIN organizations ON organizations.id = org_id
    WHERE organizations.id = $1
    GROUP BY users.id, organizations.id, org_users.can_write
    ORDER BY last_name;`;

  return Promise.resolve(pool.query(queryString, [orgId])
    .then(res => {
      results = res.rows;
      return results
    })
    .catch(err => { console.log(err) })
  );
}

const getOrgUsersWithId = (orgId, userId) => {

  const queryString = `
    SELECT users.id as user_id, first_name, last_name, email, users.display_picture as image
    FROM org_users
    JOIN users ON users.id = user_id
    JOIN organizations ON organizations.id = org_id
    WHERE organizations.id = $1 AND users.id = $2
    GROUP BY users.id, organizations.id, org_users.can_write
    ORDER BY can_write;
    `;

  const values = [orgId, userId];

  return Promise.resolve(pool.query(queryString, values)
    .then(res => {
      results = res.rows;
      return results
    })
    .catch(err => { console.log(err) })
  );
}

const getOrgsOfUser = (userId) => {

  const queryString = `
    SELECT organizations.name as org_name
    FROM org_users
    JOIN users ON users.id = user_id
    JOIN organizations ON organizations.id = org_id
    WHERE users.id = $1
    ORDER BY users.id
    `;

  return Promise.resolve(pool.query(queryString, [userId])
    .then(res => {
      results = res.rows;
      return results
    })
    .catch(err => { console.log(err) })
  );
}

//========= UPDATE =========================

const updateSite = (siteId, formObject, genNewPass = false) => {
  console.log("\n>>>>>>>>>>>>>>>>>>>>>>>", formObject, "\n\n")
  formObject.account_email = formObject['account_email'].toLowerCase();
  formObject.tags = formObject['tags'].toLowerCase();

  if (genNewPass) {
    formObject.password = generatePassword(formObject.length, formObject.lowerCase, formObject.UpperCase, formObject.numbers, formObject.symbols);
  }

  const queryString = (`
    UPDATE sites
    SET url = $2,
    login_name = $3,
    account_email = $4,
    tags = $5,
    password = $6
    WHERE id = $1
    RETURNING *;
    `);
  const values = [
    siteId,
    formObject.url,
    formObject.login_name,
    formObject.account_email,
    formObject.tags,
    formObject.password
  ];
  console.log("\n>>>>>>>>>>>>>>>>>>>>>>>", values, "\n\n")
  pool.query(queryString, values)
    .then(res => {
      return res.rows;
    })

}


const updateOrg = (formObject) => {
  const queryString = (`
  UPDATE organizations
  SET name = $1,
  display_picture = $2
  WHERE id = $3
  RETURNING *;
  `);
  const values = [formObject['name'], formObject['url'], formObject['orgId']];
  pool.query(queryString, values)
    .then(res => console.log(`Update Org`, res.rows));
}

const updateUser = (userProperty, newValue, userId) => {
  const queryString = (`
  UPDATE users
  SET $1 = $2
  WHERE id = $3;
  `);
  const values = [userProperty, newValue, userId];
  pool.query(queryString, values)
    .then(res => console.log(`Update User`, res.rows));
}

const updateOrgUsers = (orgUsersProperty, newValue, userId) => {
  const queryString = (`
  UPDATE org_users
  SET $1 = $2
  WHERE id = $3;
  `);
  const values = [orgUsersProperty, newValue, userId];
  pool.query(queryString, values)
    .then(res => console.log(`Update Org Users`, res.rows));
}

//========= DELETE =========================
// DELETE QUERIES REQUIRE 2 WHERE CONDITIONS TO MATCH

const deleteSite = (siteId, orgId) => {
  const queryString = (`DELETE FROM sites WHERE id = $1 AND org_id = $2;`);
  const values = [siteId, orgId];
  pool.query(queryString, values)
    .then((res) => {
      return `Deleted site ${siteId} from Org ${orgId}`;
    })
}

const deleteUser = (userId, email) => {
  const queryString = (`DELETE FROM users WHERE id = $1 AND email = $2;`);
  const values = [userId, email];
  pool.query(queryString, values)
    .then(res => console.log(`Deleted user`, res.rows));
}

const deleteUserFromOrg = (userId, orgId) => {
  console.log(`\n\nDELETING..., user ${userId} from org ${orgId}`)
  const queryString = (`DELETE FROM org_users WHERE user_id = $1 AND org_id = $2;`);
  const values = [userId, orgId];
  pool.query(queryString, values)
    .then((res) => {
      return `Deleted user ${userId} from Org ${orgId}`;
    })
}

const deleteOrg = (orgId, name) => {
  const queryString = (`DELETE FROM organizations WHERE id = $1 AND name = $2;`);
  const values = [orgId, name];
  pool.query(queryString, values)
    .then(res => console.log(`Deleted Org`, res.rows));
}


//========= TESTING ========================
/*
let testUser = {
  email: '1@1.ca',
  password: 'password',
  first_name: 'Joe',
  last_name: 'Everyperson'
}
let testSite = {
  url: 'www.otherSite.com',
  login_name: 'myLogin',
  account_email: 'me@email.ca',
  tags: 'BUSINESS, Top Secret, Boss',
  org_id: 18
}
addSite(testSite)
 */



module.exports = {
  getUserWithEmail,
  getUserWithId,
  getUserOrgs,
  getUsers,
  getAllUserSites,
  getAllUserSitesBySearch,
  emailExists,
  getOrgs,
  getOrgWithId,
  getOrgIdwithName,
  getOrgUrls,
  getOrgUrlsWithSiteId,
  getUrlWithTags,
  getOrgUsers,
  getUserSitesByOrg,
  getOrgUsersWithId,
  getOrgsOfUser,
  deleteSite,
  deleteUser,
  deleteOrg,
  deleteUserFromOrg,
  addUser,
  addOrg,
  addSite,
  addUserToOrg,
  updateSite,
  updateOrg,
  updateUser,
  updateOrgUsers
}

