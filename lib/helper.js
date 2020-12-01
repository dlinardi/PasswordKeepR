
const reqAndCheckCookie = () => {
  const cookieID = req.session['session'];
  if (cookieId){
    return true;
  }
}
module.exports = reqAndCheckCookie;
// app.get("/", (req, res) => {
//   if (reqAndCheckCookie) {
//     res.render("index");
//   } else {
//     res.redirect('/login');
//   }
// });

// const checkDuplicate = (input, dbQuery) => {
// }

