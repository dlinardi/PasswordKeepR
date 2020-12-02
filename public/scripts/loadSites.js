// http://192.168.1.198:8080/api/orgs/18/sites


// AJAX GET from above
const loadSites = function(action) {
  //GET the latest Tweet
  $.ajax("/api/orgs/18/sites")
    .then(res => {
      action(res);
    });
};

