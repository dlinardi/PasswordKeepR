const createSiteElement = (siteObj) => {
  const { url, login_name, password } = siteObj;
  console.log("CREATING ELEMENT", url, login_name, password)

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

//====Create Org Elm=================================================================

const createOrgElement = (orgObj, orgUsers) => {

  if (orgUsers) {
    const { name, id } = orgObj;
    // creating structure of site container
    const container = $(`<section class="sites-container ${id}">`)
    const header = $(`<header class="org-site-head">`)

    const bar = $(`<div class="org-bar">`);
    const barEditForm = $('<div class="org-edit-form">');

    const barDetails = $('<div class="orgs-in-bar">');
    const barActions = $(' <div class="new-site">');

    //Div 1 (orgs-in-bar)
    const detailsSpan = $(`<span class="specific-org">${name}</span>`);

    const orgIcon = $('<i class="fas fa-user">');
    detailsSpan.prepend(orgIcon);

    // detailsSpan.append(orgName);

    //Div 2 (new-org)
    const addSpan = $(`<span name="${id}" id="${id}-add-form" class="add-site-button">`);
    const addBtn = $(`<a class="btn add" name="add_site" onclick="this.blur();" role="button">Add Site <i class="fas fa-plus"></i></a>`)
    addSpan.append(addBtn);

    const shareSpan = $(`<span name="${id}" id="${id}-share-form" class="share-org-button">`);
    const shareBtn = $(`<a class="btn share" name="share_org" onclick="this.blur();" role="button"> Share <i class="fas fa-plus"></i></a>`);
    shareSpan.append(shareBtn);

    //Build Divs
    barDetails.append(detailsSpan);
    barActions.append(addSpan);
    barActions.append(shareSpan);

    //Build Bar
    bar.append(barDetails);
    bar.append(barActions);

    barEditForm.append(`
    <div class="contain_${id}-add-form" style="display: none;">
        <form id="formAddSite_${id}">
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
          <button type="submit" name="${id}" class="btn btn-primary addSiteBtn">Add Site</button>
        </form>
    </div>`);
    barEditForm.append(`
    <div class="contain_${id}-share-form" style="display: none;">
        <form id="formAddUser_${id}">
        <input type="email" name="userEmail" placeholder="Email">
        <button type="submit" name="${id}" class="btn btn-primary addUserBtn">Invite</button>
        </form>
    </div>`);
    barEditForm.append(`<div class="${id}-share-form" style="display: none;">`);

    const footer = $(`<footer class="card-list_${id}">`);

    // create user table for every org
    const userTable = $(`<table class="table">`);
    const tableHead = $(`
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col"></th>
            </tr>
          </thead>
  `);
    const tableBody = $(`<tbody>`);

    userTable.append(tableHead);
    userTable.append(tableBody)

    for (let user of orgUsers) {
      // console.log("URSER", user, `<td>${user['last_name']}, ${user.first_name}</td>`)
      let uName = $(`<td>${user.last_name}, ${user.first_name}</td>`)
      let uEmail = $(`<td>${user.email}</td>`)
      let uDelete = $(`
    <td>
    <form>
      <button type="delete" class="btn btn-outline-danger tableShareForm">Delete</button>
    </form>
    </td>
    `)

      const userRows = $(`<tr id="orgUsers_${id}" class="table">`);
      userRows.append(uName)
      userRows.append(uEmail)
      userRows.append(uDelete)
      tableBody.append(userRows);
    }

    barEditForm.append(userTable);

    header.prepend(bar);
    header.append(barEditForm);
    container.append(header);
    container.append(footer);

    return container;
  }
}
