const loadOrgUsers = (org_id, action) => {
  console.log('load org Users')
  $.ajax(`/api/orgs/${org_id}/users`,
    { method: "GET" }
  )
    .then(orgUsers => {
      return orgUsers
    })
    .catch(error => console.log(error));
};


const loadAllSites = (action) => {
  console.log('loadAll')
  $.ajax(`/api/users/sites`,
    { method: "GET" }
  )
    .then(sites => {
      action(sites);
    })
    .catch(error => console.log(error));
};

const loadOrgSites = (orgId, action) => {
  $.ajax(`/api/orgs/${orgId}/sites`,
    { method: "GET" }
  )
    .then(sites => {
      action(sites);
    })
    .catch(error => console.log(error));
};

//Everything in root (All Orgs and Sites for a User)
const renderOrgWSites = function (sites) {

  $('#vault').empty()

  let currOrg = null;

  for (const site of sites) {
    //Render Org Bar:  If !currOrg > Update Curr Org, and render Bar, proceed w. sites
    if (site.org_id !== currOrg) {
      currOrg = site.org_id

      $.ajax(`/api/orgs/${currOrg}/users`,
        { method: "GET" }
      )
        .then(orgUsers => {
          $('#vault').append(createOrgElement(site, orgUsers));
        })
    }
    console.log("Rendering Sites?>>.")
    //render Sites for org
    $(`#${site.org_id}`).append(createSiteElement(site))
  }
}




//Everything in root (All Orgs and Sites for a User)
const ORGrenderOrgWSites = function (sites) {

  $('#vault').empty()

  let currOrg = null;
  for (const site of sites) {
    //Render Org Bar:  If !currOrg > Update Curr Org, and render Bar, proceed w. sites
    if (site.org_id !== currOrg) {
      currOrg = site.org_id
      $('#vault').prepend(createOrgElement(site));
    }
    //render Sites for org
    $(`#${site.org_id}`).append(createSiteElement(site));
  }
}

//Sites for ONE org
const renderOrgSites = (sites) => {

  $('#vault').empty()

  for (const site of sites) {
    $('#vault').append(createSiteElement(site));
  }
};

//Render Only ONE ORG (Puts on Top)
//For Edit condister Replace With or All
const renderOrg = (org) => {
  $('#vault').prepend(createOrgElement(org));
};
