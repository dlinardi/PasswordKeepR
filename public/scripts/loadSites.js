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

//Sites for ONE org
const renderOrgSites = (sites) => {

  $('#vault').empty()

  for (const site of sites) {
    $('#vault').append(createSiteElement(site));
  }
};



// ===========================================================================================

const fetchUserOrgs = (userId) => {
  $.ajax(`/api/users/${userId}/orgs`,
    { method: "GET" }
  )
    .then(userOrgs => {
      return userOrgs
    })
};

const fetchOrgUsers = (orgId) => {
  $.ajax(`/api/orgs/${orgId}/users`,
    { method: "GET" }
  )
    .then(orgUsers => {
      console.log("FETCH============", orgUsers)
      return orgUsers
    })
    .catch(error => console.log(error));
};

const renderOrgBar = (org, orgUsers) => {
  console.log("Render ORG >>>>>>>>>>>")
  $('.content-container').append(createOrgElement(org, orgUsers));
  //Ref Prepend switch sql order by to make Alpha on whole render
};


const fetch = (userId) => {
  $.ajax(`/api/users/${userId}/orgs`, { method: "GET" })
    .then(userOrgs => {
      //ITERATE ORGS
      for (let org of userOrgs) {
        $.ajax(`/api/orgs/${org.id}/users`, { method: "GET" })
        .then(orgUsers =>{
          console.log(org, orgUsers)
          //render
          renderOrgBar(org, orgUsers)
        })

      }
    })
}



const fetchRenderOrgBars = (userId) => {
  console.log("===============================FETCH AND RENDER START===========================")
  return fetchUserOrgs(userId)  //ajax > getUserOrgs
    .then((listOfOrgs) => {
      console.log("LIST", listOfOrgs)
      for (let org of listOfOrgs) {
        return fetchOrgUsers(org.id) //ajax > getOrgUsers
          .then((orgUsers) => {
            console.log(`ABOUT TO RENDER\n ${org}\n${orgUsers}`)
            renderOrgBar(org, orgUsers)
          })
      }
    })
}

