// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

$(document).ready(function () {
  console.log("DOC READY")


  $('.urlInfo').on('click',  function(event) {
    event.preventDefault();
    // Targets .pwd Class of the Clicked urlInfo, will clip innerText
    const toClip = $(this).children('.pwd')[0].innerText
    copyToClipboard(toClip)
  });

});
