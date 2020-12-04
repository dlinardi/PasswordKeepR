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
const renderOrgWSites = function (sites, orgData) {
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

const renderSearch = (sites) => {
  $(`#vault`).empty()
  for (const site of sites) {
    $(`#vault`).append(createSiteElement(site));
  }
}

// ===FETCH AND RENDER ORGS THEN SITES APPEND TO ORG======================================================



const renderOrgBar = (org, orgUsers) => {
  $('#vault').append(createOrgElement(org, orgUsers));
  //Ref Prepend switch sql order by to make Alpha on whole render
};

const renderOrgSites = (sites, orgId) => {

  $(`.card-list_${orgId}`).empty()
  for (const site of sites) {
    console.log("SITE", sites, orgId)
    $(`.card-list_${orgId}`).append(createSiteElement(site));
  }
};


const fetchUserOrgs = (userId) => {
  // Try to Make Modular
  $.ajax(`/api/users/${userId}/orgs`, { method: "GET" })  //Fetch userOrgs
    .then((userOrgs) => {
      return userOrgs
    })
}


const loadRenderAll = () => {
  return $.ajax(`/api/users/id`, { method: "GET" })                        //Fetch UserId
    .then((userId) => {
      $.ajax(`/api/users/${userId}/orgs`, { method: "GET" })       //Fetch userOrgs
        .then(userOrgs => {
          //ITERATE ORGS
          $(`#vault`).empty()
          for (const org of userOrgs) {
            $.ajax(`/api/orgs/${org.id}/users`, { method: "GET" })  //Fetch Users in that Org
              .then(orgUsers => {
                console.log("Rendering Orgs")
                renderOrgBar(org, orgUsers)
                return org
              })
              .then(org => {
                $.ajax(`/api/orgs/${org.id}/Sites`, { method: "GET" })  //Fetch Sites for that Org and Render
                  .then((sites) => {
                    console.log("Rendering Sites")
                    renderOrgSites(sites, org.id)

                  })
              })
          }
        })
    })
    .catch(error => console.log(error));
}

const loadRenderOrg = (orgId) => {
  $(`#vault`).empty()
      $.ajax(`/api/orgs/${orgId}/sites`, { method: "GET" })  //Fetch Sites for that Org and Render
        .then((sites) => {
          //Empty Org Container???
          console.log("Rendering Sites!!!!", sites)
          renderOrgSites(sites)

        })
}


