
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

const createOrgElement = (siteObj) => {
  const { org_name, org_id } = siteObj;
  // creating structure of site container
  const container = $(`<section class="sites-container ${org_id}">`)
  const header = $(`<header class="org-site-head">`)

  const bar = $(`<div class="org-bar">`);
  const barEditForm = $('<div class="org-edit-form">');

  const barDetails = $('<div class="orgs-in-bar">');
  const barActions = $(' <div class="new-site">');

  //Div 1 (orgs-in-bar)
  const detailsSpan = $(`<span class="specific-org">${org_name}</span>`);

  const orgIcon = $('<i class="fas fa-user">');
  detailsSpan.prepend(orgIcon);

  // detailsSpan.append(orgName);

  //Div 2 (new-org)
  const addSpan = $(`<span name="${org_id}" id="${org_id}-add-form" class="add-site-button">`);
  const addBtn = $(`<a class="btn add" name="add_site" onclick="this.blur();" role="button">Add Site <i class="fas fa-plus"></i></a>`)
  addSpan.append(addBtn);

  const shareSpan = $(`<span name="${org_id}" id="${org_id}-share-form" class="share-org-button">`);
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
    <div class="contain_${org_id}-add-form" style="display: none;">
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
    </div>`);
    barEditForm.append(`
    <div class="contain_${org_id}-share-form" style="display: none;">
        <form id="formAddUser_${org_id}">
        <input type="email" name="userEmail" placeholder="Email">
        <button type="submit" name="${org_id}" class="btn btn-primary addUserBtn">Invite</button>
        </form>
    </div>`);

  const footer = $(`<footer class="card-list" id="${org_id}">`);

  header.prepend(bar);
  header.append(barEditForm);
  container.append(header);
  container.append(footer);

  return container;
}

const createAddSiteForm = () => {

};

