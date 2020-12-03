
const createSiteElement = (siteObj) => {
  const { url, login_name, password } = siteObj;

  // creating structure of site container
  const card = $('<article class="sites">');
  const cardHeader = $('<header>');
  const cardFooter = $('<footer>');

  const updateIcons = $('<span class="edit-delete">');

  const editIcon = $('<i class="fas fa-edit"></i>');
  const deleteIcon = $('<i class="fas fa-trash-alt"></i>');

  updateIcons.append(editIcon);
  updateIcons.append(deleteIcon);

  const cardImage = $('<img src="http://placehold.jp/350x116.png">');

  cardHeader.append(updateIcons);
  cardHeader.append(cardImage);

  const cardDetail = $('<div class="card-details">');
  const cardTitle = $(`<span class="cardTitle">${url}</span>`);
  const cardAccName = $(`<span class="accountName">${login_name}</span>`);
  const cardPass = $(`<span class="pwd">${password}</span>`);

  cardDetail.append(cardTitle);
  cardDetail.append(cardAccName);
  cardDetail.append(cardPass);

  const cardAction = $('<div class="card-action">');
  const copyIcon = $('<span><i class="far fa-copy"></i></span>');

  cardAction.append(copyIcon);

  // append all footer content to footer
  cardFooter.append(cardDetail);
  cardFooter.append(cardAction);

  card.append(cardHeader);
  card.append(cardFooter);

  return card;
};

//Make Org Obj
const createOrgElement = (siteObj) => {
  const { org_name, org_id, org_users } = siteObj;
  // creating structure of site container
  const container = $(`<section id="${org_id}" class="sites-container">`)
  const bar = $(`<div class="org-bar">`);
  const barDetails = $('<div class="orgs-in-bar">');
  const barActions = $(' <div class="new-site">');

  //Div 1 (orgs-in-bar)
  const detailsSpan = $(`<span class="specific-org">${org_name}</span>`);

  const orgIcon = $('<i class="fas fa-user">');
  detailsSpan.prepend(orgIcon);

  // detailsSpan.append(orgName);

  //Div 2 (new-org)
  const addSpan = $('<span>');
  const addBtn = $(`<a class="btn add" name="${org_id}" href="#" onclick="this.blur();" role="button">Add Site <i class="fas fa-plus"></i></a>`)
  addSpan.append(addBtn);

  const shareSpan = $('<span>');
  const shareBtn = $(`<a class="btn share" name="${org_id}" href="#" onclick="this.blur();" role="button"> Share <i class="fas fa-plus"></i></a>`);
  shareSpan.append(shareBtn);

  //Build Divs
  barDetails.append(detailsSpan);
  barActions.append(addSpan);
  barActions.append(shareSpan);

  //Build Bar
  bar.append(barDetails);
  bar.append(barActions);

  //Site
  bar.append(`
    <div>
        <form id="formAddSite_${org_id}">
        <input  type="text" name="url" placeholder="Site URL">
        <input  type="email" name="account_email" placeholder="Associated Email">
        <input  type="text" name="login_name" placeholder="Login Name">
        <input  type="text" name="tags" placeholder="Tags">
      <div>
      <label for="lowerCase">Lower Case Letters</label>
      <input type="checkbox" checked="true" name="lowerCase" value="true">
      <label for="upperCase">Upper Case Letters</label>
      <input type="checkbox" checked="true" name="upperCase" value="true">
      <label for="digits">Numbers</label>
      <input type="checkbox" checked="true" name="numbers" value="true">
      <label for="symbols">Symbols</label>
      <input type="checkbox" checked="true" name="symbols" value="true">
        <input type="text" name="length" value="20">
     </div>
        <button type="submit" name="${org_id}" class="btn btn-primary addSiteBtn">Add Site</button>
        </form>

    </div>
`)

  let orgUsers = [
    {
      user_id: 55,
      first_name: "Jaiden",
      last_name: "Cantrell",
      email: "kingma@icloud.com",
      image: "./images/profile-hex.png"
    },
    {
      user_id: 53,
      first_name: "Saul",
      last_name: "Holloway",
      email: "jonadab@icloud.com",
      image: "./images/profile-hex.png"
    },
    {
      user_id: 45,
      first_name: "Jamari",
      last_name: "Kane",
      email: "shazow@live.com",
      image: "./images/profile-hex.png"
    },
    {
      user_id: 103,
      first_name: "Emely",
      last_name: "Kelly",
      email: "ilial@gmail.com",
      image: "./images/profile-hex.png"
    },
    {
      user_id: 20,
      first_name: "Talan",
      last_name: "Meza",
      email: "glenz@outlook.com",
      image: "./images/profile-hex.png"
    },
    {
      user_id: 102,
      first_name: "Zoe",
      last_name: "Norton",
      email: "duchamp@gmail.com",
      image: "./images/profile-hex.png"
    },
    {
      user_id: 54,
      first_name: "Xander",
      last_name: "Santiago",
      email: "mbswan@verizon.net",
      image: "./images/profile-hex.png"
    },
    {
      user_id: 52,
      first_name: "Jimmy",
      last_name: "Steele",
      email: "andale@msn.com",
      image: "./images/profile-hex.png"
    },
    {
      user_id: 2,
      first_name: "Suzy",
      last_name: "Test2",
      email: "test2@test.ca",
      image: "./images/profile-hex.png"
    },
    {
      user_id: 87,
      first_name: "Melina",
      last_name: "Velazquez",
      email: "sisyphus@att.net",
      image: "./images/profile-hex.png"
    },
    {
      user_id: 56,
      first_name: "Anahi",
      last_name: "Walls",
      email: "mglee@hotmail.com",
      image: "./images/profile-hex.png"
    }
  ]
  // bar.append(createOrgUsers(test))

  // Function to create and append Edit Org Table

  //   //Users in Org Form
  //   //FOR DIRECTLY MADE HERE...
  const userTable = $(`
        <h4>Users of Org</h4>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>

          <tbody >
          <tr id="orgUsers_${org_id}" class="table">
  `)


  // $(populateTable(orgUsers)).appendTo(`#orgUsers_${org_id}`)

  bar.append(userTable)

  for (let user of orgUsers) {
    // console.log("URSER", user, `<td>${user['last_name']}, ${user.first_name}</td>`)
    let uName = $(`<td>${user.last_name}, ${user.first_name}</td>`)
    let uEmail = $(`<td>${user.email}</td>`)
    let uDelete = $(`
    <td>
    <form >
    <button type="delete" class="btn btn-outline-danger">Delete</button>
    </form>
    </td>
    `)

    $( "<p>Test</p>" ).appendTo( `bar` );
    // uName.appendTo(`#orgUsers_${org_id}`)

    // userTable.html(uName)
    // userTable.append(uEmail)
    // userTable.append(uDelete)

    console.log("APPENDED...")
  }




  bar.append(`
  <div>
  <form id="formAddUser_${org_id}">
  <input type="email" name="userEmail" placeholder="Email">
  <button type="submit" name="${org_id}" class="btn btn-primary addUserBtn">Invite</button>
  </form>
</div>
`)

  //Call Up Org Users Partial  << Cant get working - just prints the characters (HTML Escape chars?)
  // bar.append($(`<%- include('partials/_header') %>`))

  container.append(bar);
  return container;
}

const populateTable = (orgUsers) => {

  //Takes JSON objects
  let output = $(`<tr>`)

  for (let user of orgUsers) {
    // console.log("URSER", user, `<td>${user['last_name']}, ${user.first_name}</td>`)
    let uName = $(`<td>${user.last_name}, ${user.first_name}</td>`)
    let uEmail = $(`<td>${user.email}</td>`)
    let uDelete = $(`
    <td>
    <form >
    <button type="delete" class="btn btn-outline-danger">Delete</button>
    </form>
    </td>
    `)

    userTable.append(uName)
    userTable.append(uEmail)
    userTable.append(uDelete)

    console.log("APPENDED...")
  }

  console.log("DONE LOOP", output)
  return output

}
