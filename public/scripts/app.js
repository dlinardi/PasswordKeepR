$(document).ready(function () {
  console.log("DOC READY")

  loadSites(renderAllSites);

  $('#search-vault').on('input', function () {
    const userInput = $(this).val();
    if (userInput) {
      $('.sites-container').remove();
      search(userInput);
    } else {
      $('.sites-container').remove();
      loadSites(renderAllSites);
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
    console.log(org_id)
    // POST FORM
    $.ajax({
      method: 'POST',
      url: `/api/orgs/${org_id}/addSite`,
      data: $(`#formAddSite_${org_id}`).serialize()
    })
    .then(


    )


    // formObject.url,
    // formObject.login_name,
    // formObject.account_email,
    // formObject.tags,
    // formObject.org_id
  });




});
