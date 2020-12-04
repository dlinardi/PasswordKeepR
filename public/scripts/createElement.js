const createSiteElement = (siteObj) => {
  const { url, login_name, password, site_id, org_id } = siteObj;

  console.log("CREATING ELEMENT", siteObj)

  // creating structure of site container
  const card = $('<article class="sites">');
  const cardHeader = $('<header>');
  const cardFooter = $('<footer>');

  const updateIcons = $(`<span class="edit-delete" name="${site_id}">`);

  const editIcon = $(`<i class="fas fa-edit cardEdit" name="${org_id}"></i>`);
  const deleteIcon = $('<i class="fas fa-trash-alt cardDelete"></i>');

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
    const barEditForm = $(`<div class="org-edit-form" id="${id}">`);

    const barDetails = $('<div class="orgs-in-bar">');
    const barActions = $(' <div class="new-site">');

    //Div 1 (orgs-in-bar)
    const detailsSpan = $(`<span class="specific-org">${name}</span>`);

    const orgIcon = $('<i class="fas fa-user">');
    detailsSpan.prepend(orgIcon);

    // detailsSpan.append(orgName);

    //Div 2 (new-org)
    const addSpan = $(`<span name="${id}" class="add-site-button active">`);
    const addBtn = $(`<a class="btn add" name="add_site" onclick="this.blur();" role="button">Add Site <i class="fas fa-address-card"></i></a>`)
    addSpan.append(addBtn);

    const shareSpan = $(`<span name="${id}" class="share-org-button active">`);
    const shareBtn = $(`<a class="btn share" name="share_org" onclick="this.blur();" role="button"> Edit <i class="fas fa-share"></i></a>`);
    shareSpan.append(shareBtn);

    //Build Divs
    barDetails.append(detailsSpan);
    barActions.append(addSpan);
    barActions.append(shareSpan);

    //Build Bar
    bar.append(barDetails);
    bar.append(barActions);

    barEditForm.append(`
    <div class="${id}-add-form add-site-form" style="display: none;">
      <form class="formAddSite_${id}">
        <div class="site-details-container">
          <h4 class="add-new-title">Site Details</h4>
          <input type="url" name="url" placeholder="Site URL">
          <input type="email" name="account_email" placeholder="Associated Email">
          <input type="text" name="login_name" placeholder="Login Name">
          <input type="text" name="tags" placeholder="Tags">
        </div>
        <div class="pass-gen-container">
          <h4 class="add-new-title">Password Generation Criteria</h4>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" checked="true" name="lowerCase" value="true">
            <label class="form-check-label" for="lowerCase">Lower Case Letters</label>

            <input class="form-check-input" type="checkbox" checked="true" name="upperCase" value="true">
            <label class="form-check-label" for="upperCase">Upper Case Letters</label>

            <input class="form-check-input" type="checkbox" checked="true" name="numbers" value="true">
            <label class="form-check-label" for="numbers">Numbers</label>

            <input class="form-check-input" type="checkbox" checked="true" name="symbols" value="true">
            <label class="form-check-label" for="symbols">Symbols</label>

            <input class="site-detail-length" type="text" name="length" value="20" maxlength="2" size="2">
            <label class="form-check-label" for="length">Length</label>
          </div>
        </div>
        <button type="submit" name="${id}" class="btn btn-success addSiteBtn">Add Site</button>
      </form>
    </div>`);
    barEditForm.append(`
    <div class="contain_${id}-share-form" style="display: none;">
        <form class="formAddUser">
          <input type="email" name="userEmail" placeholder="Email">
          <button type="submit" name="${id}" class="btn btn-primary addUserBtn">Invite</button>
        </form>
    </div>`);
    barEditForm.append(`<div class="${id}-share-form" style="display: none;">`);

    const footer = $(`<footer class="card-list" id="list-${id}">`);

    // create user table for every org
    const userTable = $(`<table class="table ${id}-table" style="display: none;">`);
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
    userTable.append(tableBody);

    tableBody.append(`
      <tr class="invite-user-row">
        <td>
        <i>Add new user to organization:</i>
        </td>
        <td>
          <form class="inline formAddUser_${id}">
            <input type="email" name="userEmail" class="emailInputTable" placeholder="Email">
          </form>
        </td>
        <td>
            <button type="submit" class="btn btn-outline-success tableShareForm addUserBtn">Invite</button>
        </td>
      </tr>`);

    for (let user of orgUsers) {
      // console.log("URSER", user)
      let uName = $(`<td>${user.last_name}, ${user.first_name}</td>`)
      let uEmail = $(`<td class="${id}-email">${user.email}</td>`)
      let uDelete = $(`
        <td>
        <form name="${user.user_id}">
          <button type="delete" class="btn btn-outline-danger tableShareForm delBtn" name="${id}">Delete
           </button>
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
