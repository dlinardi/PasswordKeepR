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


$('.urlInfo').on('click', event => {
  event.preventDefault();
  copyToClipboard('TEST CLIP')
  });

});
