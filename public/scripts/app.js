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
// const { editForms } = require('./editForms')

$(document).ready(function () {
  console.log("DOC READY")


  $('.urlInfo').on('click', function (event) {
    event.preventDefault();
    // Targets .pwd Class of the Clicked urlInfo, will clip innerText
    const toClip = $(this).children('.pwd')[0].innerText
    copyToClipboard(toClip)
  });

  $('#userToOrg').on('click', function (event) {
    event.preventDefault();
    console.log("Click on .userToOrg")
    POST
    $.ajax({
      method: 'POST',
      url: "/",
      data:$('form').serialize()
    })
  });

});
