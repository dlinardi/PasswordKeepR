
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

  bar.append(`
    <div>
        <form id="formAddSite_${org_id}">
        <input  type="text" name="url" placeholder="Site URL">
        <input  type="email" name="account_email" placeholder="Associated Email">
        <input  type="text" name="login_name" placeholder="Login Name">
        <input  type="text" name="tags" placeholder="Tags">
        <button type="submit" name="${org_id}" class="btn btn-primary addSiteBtn">Submit</button>
        </form>
    </div>
  `)
//   bar.append(`
//   <div>
//       <form>
//       <input class="form-control" type="email" name="email" placeholder="Email">
//       <button type="submit" name="${org_id}" class="btn btn-primary addUserBtn">Submit</button>
//       </form>
//   </div>
// `)

  container.append(bar);
  return container;
}

const createAddSiteForm = () => {

};
