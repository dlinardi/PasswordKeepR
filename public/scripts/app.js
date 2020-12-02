$(document).ready(function () {
  console.log("DOC READY")

  loadSites(renderAllSites);


  $(document).on('click', '.card-action', function (event) {
    // Targets .pwd Class of the Clicked urlInfo, will clip innerText
    const toClip = $(this).parent().find('.pwd')[0].innerText
    copyToClipboard(toClip)
  });

  $('#search-vault').on('input', function () {
    const userInput = $(this).val();

    searchResults(userInput);
  })

});
