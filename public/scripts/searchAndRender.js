const loadSearchResults = (searchQuery, action) => {
  $
  .ajax({
    url: `/search/${searchQuery}`,
    method: "GET"
  })
  .then((sites) => {
    action(sites);
  })
  .catch(error => console.log(error));
};

const search = (searchQuery) => {
  $.ajax({
    url: "/search",
    method: "POST",
    data: $(searchQuery).serialize()
  })
  .then(() => {
    loadSearchResults(searchQuery, renderSearch);
  })
  .catch(error => console.log(error));
};
