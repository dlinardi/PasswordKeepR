
$(document).ready(function () {
  console.log("DOC READY")



  $(document).on('click', '.card-action', function (event) {
    // Targets .pwd Class of the Clicked urlInfo, will clip innerText
    console.log("THIS>>",$(this))
    const toClip = $(this).parent().find('.pwd')[0].innerText
    console.log(toClip)
    copyToClipboard(toClip)
  });

  //(action, userId)
  loadSites(renderSites, 2);

});
