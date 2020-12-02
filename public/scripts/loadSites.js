
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
const renderSites = (sites) => {
  console.log("RENDER", sites)
  for (const site of sites) {
    $('.sites-container').append(createSiteElement(site));
  }
};

