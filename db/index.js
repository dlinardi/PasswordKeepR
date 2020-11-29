const { emit } = require('nodemon');
const generatePassword = require('../public/scripts/generatePassword')

const { Pool } = require('pg');
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});
console.log("WARNING .env not in use (DB Access)!!!")

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
  return pool.query(queryString, values)
    .then(res => console.log(`Added User`, res.rows));
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
    .then(res => console.log(`Added org`, res.rows));
}

// Org ID wont be on the form, backend JS will need to add it
const addSite = (formObject) => {
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
    generatePassword(),
    formObject.org_id
  ];
  return pool.query(queryString, values)
    .then(res => console.log(`Added Site`, res.rows));
}

const addUserToOrg =(userId, orgId, canWrite = false) => {
  const queryString = (`
  INSERT INTO org_users
  (org_id, user_id, can_write)
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
    .catch(err => { console.log(err) })
  );
}

const getUserWithId = (id) => {
  console.log("Get user w. id:", id)
  const queryString = (`
    SELECT * FROM users WHERE id = $1;
  `);
  const values = [id];
  return Promise.resolve(pool.query(queryString, values)
    .then(res => {
      results = res.rows[0]
      return results
    })
    .catch(err => { console.log(err) })
  );
}

const getUserOrgs = (userId) => {
  console.log("Get users Orgs:", userId)
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
      console.log(results)
      return results
    })
    .catch(err => { console.log(err) })
  );
}

const getOrgWithId = (id) => {
  console.log("Get org w. id:", id)
  const queryString = (`
    SELECT * FROM organizations WHERE id = $1;
  `);
  const values = [id];
  return Promise.resolve(pool.query(queryString, values)
    .then(res => {
      results = res.rows[0]
      console.log(results);
      return results
    })
    .catch(err => { console.log(err) })
  );
}

const getOrgUrls = (id) => {
  console.log("Get URLs w. Org id:", id)
  const queryString = (`
    SELECT * FROM sites WHERE org_id = $1;
  `);
  const values = [id];
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

const getOrgUsers = (orgId) => {
  console.log("Get Users w. Org id:", orgId)
  const queryString = (`
    SELECT users.*
    FROM users
    JOIN org_users on org_users.user_id = users.id
    JOIN organizations orgs ON org_users.org_id = orgs.id
    WHERE orgs.id = $1;
  `);
  const values = [orgId];
  return Promise.resolve(pool.query(queryString, values)
    .then(res => {
      results = res.rows;
      console.log(results);
      return results
    })
    .catch(err => { console.log("!!! ", err) })
  );
}


//========= UPDATE =========================



//========= DELETE =========================
// DELETE QUERIES REQUIRE 2 WHERE CONDITIONS TO MATCH

const deleteSite = (siteId, orgId) => {
  const queryString = (`DELETE FROM sites WHERE id = $1 AND org_id = $2;`);
  const values = [siteId, orgId];
  pool.query(queryString, values)
    .then(res => console.log(`Deleted Site`, res.rows));
}

const deleteUser = (userId, email) => {
  const queryString = (`DELETE FROM users WHERE id = $1 AND email = $2;`);
  const values = [userId, email];
  pool.query(queryString, values)
    .then(res => console.log(`Deleted Org`, res.rows));
}

const deleteSite = (orgId, name) => {
  const queryString = (`DELETE FROM sites WHERE id = $1 AND name = $2;`);
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
  getOrgWithId,
  getOrgUrls,
  getUrlWithTags,
  getOrgUsers
}

