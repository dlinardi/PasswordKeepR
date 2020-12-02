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


  $('.card-action').on('click', function (event) {
    event.preventDefault();
    console.log($(this))
    // Targets .pwd Class of the Clicked urlInfo, will clip innerText
    // const toClip = $(this).children('.pwd')[0].innerText
    // copyToClipboard(toClip)
  });

  //GET the latest Tweet
  $.ajax("/api/orgs/18/sites")
    .then(res => {
      action(res);
    });

  loadSites(console.log);
});
