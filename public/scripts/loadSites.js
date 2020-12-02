
const loadSites = (action) => {
  $.ajax(`/api/users/sites`,
      { method: "GET" }
    )
    .then(sites => {
      action(sites);
    })
    .catch(error => console.log(error));
};

const loadSearchResults = (action) => {
  $
  .ajax({
    url: "/search",
    method: "GET"
  })
  .then((sites) => {
    action(sites);
  })
  .catch(error => console.log(error));
};

const renderAllSites = function (sites) {
  let currOrg = null;
  for (const site of sites) {
    //Render Org Bar:  If !currOrg > Update Curr Org, and render Bar, proceed w. sites
    if (site.org_id !== currOrg) {
      currOrg = site.org_id
      $('.container').append(createOrgElement(site));
    }
    //render Sites for org
    $(`.${site.org_id}`).append(createSiteElement(site));
  }
}

const renderSites = (sites) => {
  for (const site of sites) {
    $('.sites-container').append(createSiteElement(site));
  }
};
