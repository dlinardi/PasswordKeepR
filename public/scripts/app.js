$(document).ready(function () {
  console.log("DOC READY")

  loadRenderAll();//Takes UserID
  // ==================================
  // loadAllSites(renderOrgWSites);


  $('#search-vault').on('input', function () {
    const userInput = $(this).val();
    if (userInput) {
      $('.sites-container').empty();
      search(userInput);
    } else {
      $('.sites-container').empty();
      // loadAllSites(renderOrgWSites);
      loadRenderAll()
    }
  })

  $(document).on('click', '.card-action', function (event) {
    // Targets .pwd Class of the Clicked urlInfo, will clip innerText
    const toClip = $(this).parent().find('.pwd')[0].innerText
    copyToClipboard(toClip)
  });

  $(document).on('click', '.addSiteBtn', function (event) {
    event.preventDefault();
    const org_id = $(this)[0].name
    // POST FORM
    $.ajax({
      method: 'POST',
      url: `/api/orgs/${org_id}/addSite`,
      data: $(`#formAddSite_${org_id}`).serialize()
    })
      // .then(loadOrgSites(org_id,renderOrgSites))
      .then($(`.site-tiles.${org_id}`).remove())
      .then(loadRenderOrg(org_id))
    //=======^^^^^^^^^^^^^^^^^^^^^^^================== NEED to render Only org rather than whole container
  });

  $(document).on('click', '.addUserBtn', function (event) {
    event.preventDefault();
    const org_id = $(this)[0].name
    $.ajax({
      method: 'POST',
      url: `/api/orgs/${org_id}/addUser`,
      data: $(`.formAddUser_${org_id}`).serialize()
    })
      .then(window.alert('User Added to Org'))
  });

  $(document).on('click', '.addOrgBtn', function (event) {
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: `/api/orgs/new`,
      data: $(`#formAddOrg`).serialize()
    })
      .then(loadRenderAll())

    $('.new-org-input').val('');

  });

  $(document).on('click', '.delBtn', function (event) {
    event.preventDefault();
    const orgId = $(this)[0].name;
    const userId = $(this).parent()[0].name;

    $.ajax({
      method: 'POST',
      url: `/api/orgs/${orgId}/users/delete/${userId}`,
    })
      .then(loadRenderAll());
  });

  $(document).on('click', '.cardEdit', function (event) {
    event.preventDefault();
    const orgId = $(this).attr("name");
    const siteId = $(this).parent().attr("name");
    console.log("TEST", orgId, siteId)

    $.ajax(`/api/orgs/${orgId}/sites/${siteId}`, { method: "GET" }) //Fetch Current data
      .then((site) => {
        //Populate Form with Site Info
        console.log("SITE", site)
        const { url, account_email, login_name, tags, password } = site[0];

        $(`#${orgId}.org-edit-form`).append(`
        <div class="${orgId}-edit-form add-site-form" style="display: none;">
          <form class="formEditSite_${orgId}">
            <div class="site-details-container">
              <h4 class="add-new-title">Edit Site Details</h4>
              <input type="url" name="url" placeholder="Site URL" value="${url}">
              <input type="email" name="account_email" placeholder="Associated Email" value="${account_email}">
              <input type="text" name="login_name" placeholder="Login Name" value="${login_name}">
              <input type="text" name="tags" placeholder="Tags" value="${tags}">
              <input type="text" class="dynPasswordInput" name="password" value="${password}" readonly>
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
            <div class="form-check form-check-inline update-actions" name="${siteId}">
              <span>
                <button type="submit" name="${orgId}" class="btn btn-success editSiteBtn">Update</button>
              </span>
              <span>
                <input class="form-check-input" type="checkbox" checked="false" name="genNewPass" value="false">
                <label class="form-check-label" for="password-checkbox">Generate New Password?</label>
              </span>
            </div>
          </form>
        </div>`);

        const addForm = $(`.${orgId}-add-form`);
        const table = $(`.${orgId}-table`);
        const shareForm = $(`.${orgId}-share-form`);
        const editForm = $(`.${orgId}-edit-form`);

        editForm.fadeToggle();
        addForm.hide();
        shareForm.hide();
        table.hide();


      });

  });

  $(document).on('click', '.editSiteBtn', function (e) {
    e.preventDefault();
    const orgId = $(this).attr("name");
    const siteId = $(this).parent().attr("name");
    console.log("TEST", orgId, siteId)

    $.ajax({
      method: 'POST',
      url: `/api/orgs/${orgId}/sites/edit/${siteId}`,
      data: $(`.formEditSite_${orgId}`).serialize()
    })
      .then(loadRenderAll());

  });



  // show add site form / show share org form

  $(document).on('click', '.add-site-button', function (e) {
    e.preventDefault();

    const org_id = $(this).attr("name");
    const addForm = $(`.${org_id}-add-form`);
    const table = $(`.${org_id}-table`);
    const editForm = $(`.${org_id}-edit-form`);
    const shareForm = $(`.${org_id}-share-form`);

    addForm.fadeToggle();
    shareForm.hide();
    table.hide();
    editForm.hide();
  });

  $(document).on('click', '.share-org-button', function (e) {
    e.preventDefault();

    const org_id = $(this).attr("name");
    const addForm = $(`.${org_id}-add-form`);
    const table = $(`.${org_id}-table`);
    const editForm = $(`.${org_id}-edit-form`);
    const shareForm = $(`.${org_id}-share-form`);

    shareForm.fadeToggle();
    table.fadeToggle();
    addForm.hide();
    editForm.hide();

  });




});
