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
const renderOrgWSites = function (sites) {

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

const renderOrgSites = (sites) => {

  $('#vault').empty()

  for (const site of sites) {
    $('#vault').append(createSiteElement(site));
  }
};
