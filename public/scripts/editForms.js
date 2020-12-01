

const editForms = ()=>{

$('#userToOrg').on('click', function (event) {
  event.preventDefault();
  console.log("Click on .userToOrg")
    //POST
  // $.ajax({
  //   method: 'POST',
  //   url: "/",
  //   data: $('form').serialize(),
  //   test: console.log(this.data)
  // })
});

}

module.exports = {editForms}
