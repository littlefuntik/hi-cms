
/*
 * POST submit's
 */

exports.signin = function(req, res){
  if (req.xhr)
  {
    res.send("AJAX" + req.body.uname);
  }
  else
    res.send("Sign In");
};

exports.signup = function(req, res){
  if (req.xhr)
  {
    res.send("AJAX" + req.body.uname);
  }
  else
    res.send("Sign Up");
};