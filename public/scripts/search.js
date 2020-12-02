const search = (searchQuery) => {

  $
  .ajax({
    url: "/search",
    method: "POST",
    data: $(searchQuery).serialize()
  })
  .then(() => {
    console.log('made it here')
    loadSearchResults();
  })
  .catch(error => console.log(error));

};
