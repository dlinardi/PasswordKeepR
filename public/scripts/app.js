
$(document).ready(function () {
  console.log("DOC READY")


  loadSites(renderAllSites);

//(action, userId)
  // alert( Cookies.get("example") );

  $(document).on('click', '.card-action', function (event) {
    // Targets .pwd Class of the Clicked urlInfo, will clip innerText
    const toClip = $(this).parent().find('.pwd')[0].innerText
    copyToClipboard(toClip)
  });


});
