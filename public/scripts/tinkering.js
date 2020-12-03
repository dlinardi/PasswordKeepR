
/*
const createOrgUsersTable = function (orgUsers) {

  //Iterate over Org Users make td Lines for each > Put in Var
  //Insert that Var into $editForms
  //Rtn new Edit Forms  >> Append to org bar in other function



  const $editForm = $(`
      <h4>Users of Org</h4>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>

        <tbody id="#orgUsers_${org_id}">
        <tr>
          <td>${user.last_name}, ${user.first_name}</td>
          <td>${user.email}</td>
          <td>
            <form >
              <button type="delete" class="btn btn-outline-danger">Delete</button>
            </form>
          </td>
          </tr>
      </tbody>

      </table>

      <div>
          <form id="formAddUser_${org_id}">
          <input type="email" name="userEmail" placeholder="Email">
          <button type="submit" name="${org_id}" class="btn btn-primary addUserBtn">Invite</button>
          </form>
      </div>
`)

  for (let user of orgUsers) {
    user.firstName
    user.lastName
    user.email
    $(`<td> ${user.last_name}, ${user.first_name} </td><td>${user.email}</td>`).appendTo('tr.orgUsers')

  }


  console.log($editForm)
return $editForm;

}
