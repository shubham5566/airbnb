exports.getLogin = (req, res, next) => {
 
   res.render('auth/login', {pageTitle: 'Login', isLoggedIn:false });
}
exports.postLogin = (req, res, next) => {
  res.cookie('isLoggedIn',true)
  
  console.log(req.body,req.isLoggedIn);
  
  res.redirect("/");
}
exports.postLogout = (req, res, next) => {
  res.cookie('isLoggedIn',false);
  
  res.redirect("/");
}