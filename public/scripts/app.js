
$(document).ready(function () {
  console.log("DOC READY")


  $('.card-action').on('click', function (event) {
    event.preventDefault();
    console.log($(this))
    // Targets .pwd Class of the Clicked urlInfo, will clip innerText
    // const toClip = $(this).children('.pwd')[0].innerText
    // copyToClipboard(toClip)
  });

  loadSites(renderSites, 18);

});
