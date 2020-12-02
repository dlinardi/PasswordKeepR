
$(document).ready(function () {
  console.log("DOC READY")



  $(document).on('click', '.card-action', function (event) {
    // Targets .pwd Class of the Clicked urlInfo, will clip innerText
    console.log(Cookies.get(userId))

    const toClip = $(this).parent().find('.pwd')[0].innerText
    copyToClipboard(toClip)
  });

  //(action, userId)
  // alert( Cookies.get("example") );

  let userId = 2
  loadSites(renderAllSites, userId);

});
