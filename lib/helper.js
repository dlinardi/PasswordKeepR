
const checkCookie = () => {



}

app.get("/urls", (req, res) => {
  const cookieID = req.session['user_id'];
  let userEmail = null;
  if (checkCookie(cookieID) === true) {
    userEmail = users[cookieID].email;
    const templateVars = { urls: urlDatabase, username: userEmail, cookieID: cookieID };
    res.render("urls_index", templateVars);
  } else {
    res.redirect('/login');
  }

});


const checkDuplicate = (input, dbQuery) => {



}
