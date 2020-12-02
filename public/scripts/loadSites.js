// http://192.168.1.198:8080/api/orgs/18/sites


// AJAX GET from above
// const loadSites = function(action) {
//   //GET the latest Tweet
//   $.ajax("/api/orgs/18/sites")
//     .then(res => {
//       action(res);
//     });
// };
const loadSites = () => {
  $
    .ajax(
      '/api/orgs/18/sites',
      { method: "GET" }
    )
    .then(sites => {
      console.log("\n\nAJAX RENDER", sites)
      renderSites(sites);
    })
    .catch(error => console.log(error));
};

// for each tweet in the array of tweet objects, prepend each tweet
const renderSites = (sites) => {
  console.log("RENDER")
  for (const site of sites) {
    // $('.sites-container').append(createSiteElement());
    $('.sites-container').append(<h1>test</h1>);
  }
};

