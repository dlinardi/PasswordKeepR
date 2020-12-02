const search = (searchQuery) => {

  $
  .ajax({
    url: "/search",
    method: "POST",
    data: $(searchQuery).serialize()
  })
  .then((sites) => {
    console.log('sites json', sites);
    loadSearchResults(sites);
  })
  .catch(error => console.log(error));

};
