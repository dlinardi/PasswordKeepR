
$(document).ready(function () {
  console.log("DOC READY")



  $('footer').on('click', '.card-action', function (event) {
    // Targets .pwd Class of the Clicked urlInfo, will clip innerText
    console.log("THIS>>",$(this))
    const toClip = $(this).parent().find('.pwd')[0].innerText
    console.log(toClip)
    copyToClipboard(toClip)
  });
// Org 18
loadSites(renderSites, 18);

});
