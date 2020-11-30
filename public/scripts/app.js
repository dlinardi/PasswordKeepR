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


$('#test').on('click',  function(event) {
  event.preventDefault();

  console.log($('#test:last-child'))
  console.log("THIS",$(this))

  //below work but hard coded
  const toClip = $('#test')[0].lastElementChild.innerText;
  // console.log($('#test').children('.pwd')[0].innerText)
  // copyToClipboard($('#test').children('.pwd')[0].innerText)
  });

});
