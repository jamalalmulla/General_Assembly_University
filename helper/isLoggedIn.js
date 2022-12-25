module.exports = (req, res, next) => {
  if (req.user) {
    console.log(req.user);
    next()
  } else {
    res.redirect('/auth/signin')
  }
}
