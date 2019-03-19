// middleware for users constraints
function registerConstraints(req, res, next) {
  const USERNAME = req.body.username;
  const FIRSTNAME = req.body.firstname;
  const LASTNAME = req.body.lastname;
  const EMAIL = req.body.email;
  const CLEARPASSWORD = req.body.password;

  if (!USERNAME || USERNAME.length < 1) {
    return next({
      code: 400,
      error: `Please provide a 'username'.`,
    });
  }

  if (USERNAME.length > 20) {
    return next({
      code: 400,
      error: `The 'username' must be fewer than 20 characters.`,
    });
  }

  if (!FIRSTNAME || FIRSTNAME.length < 1) {
    return next({
      code: 400,
      error: `Please provide the 'firstname'.`,
    });
  }

  if (FIRSTNAME.length > 100) {
    return next({
      code: 400,
      error: `Your 'firstname' must be fewer than 100 characters.`,
    });
  }

  if (!LASTNAME || LASTNAME.length < 1) {
    return next({
      code: 400,
      error: `Please provide the 'lastname'.`,
    });
  }

  if (LASTNAME.length > 100) {
    return next({
      code: 400,
      error: `The 'lastname' must be fewer than 100 characters.`,
    });
  }

  if (!EMAIL || EMAIL.length < 1) {
    return next({
      code: 400,
      error: `Please provide the 'email'.`,
    });
  }

  if (EMAIL.length > 255) {
    return next({
      code: 400,
      error: `The 'username' must be fewer than 255 characters.`,
    });
  }

  if (!CLEARPASSWORD || CLEARPASSWORD.length < 1) {
    return next({
      code: 400,
      error: `Please provide a 'password' for the user.`,
    });
  }

  if (CLEARPASSWORD.length > 128) {
    return next({
      code: 400,
      error: `The 'password' must be fewer than 128 characters.`,
    });
  }

  // set the req object
  req.USERNAME = USERNAME;
  req.FIRSTNAME = FIRSTNAME;
  req.LASTNAME = LASTNAME;
  req.EMAIL = EMAIL;
  req.CLEARPASSWORD = CLEARPASSWORD;

  next();
}

function loginConstraints(req, res, next) {
  const USERNAME = req.body.username;
  const CLEARPASSWORD = req.body.password;

  if (!USERNAME || USERNAME.length < 1) {
    return next({
      code: 400,
      error: `Please provide a 'username'.`,
    });
  }

  if (!CLEARPASSWORD || CLEARPASSWORD.length < 1) {
    return next({
      code: 400,
      error: `Please provide a 'password' for the user.`,
    });
  }

  // set the req object
  req.USERNAME = USERNAME;
  req.CLEARPASSWORD = CLEARPASSWORD;

  next();
}

module.exports.registerConstraints = registerConstraints;
module.exports.loginConstraints = loginConstraints;
