
const loadSites = (action, userId) => {
  $
    .ajax(
      `/api/users/${userId}/sites`,
      { method: "GET" }
    )
    .then(sites => {
      action(sites);
    })
    .catch(error => console.log(error));
};

// for each tweet in the array of tweet objects, prepend each tweet
const renderSitesORG = (sites) => {
  for (const site of sites) {
    console.log("========================RENDER==============", site)
    $('.sites-container').append(createSiteElement(site));
  }
};

const renderSites = function (sites) {
  let currOrg = null;
  for (const site of sites) {
    //Render Org Bar:  If !currOrg > Update Curr Org, and render Bar, proceed w. sites
    if (site.org_id !== currOrg) {
      currOrg = site.org_id
      $('.sites-container').after(`<section class='${site.org_id}'><h2>${site.org_name}</h2></section>`);
    }
    //render Sites for org
    $(`.${site.org_id}`).append(createSiteElement(site));
  }


}

/*
Steps for Rendering (initial page load)
Iterate the JSON (allUserSites)
Render Category Bar for the first org_id
Then render site tile
Keep Iterating and site tiles UNTIL the org_id changes
Recursive loop: back to Step 2 with the new  org_id
BASE CASE when the initial loop ends (nothing else to render)
*/
