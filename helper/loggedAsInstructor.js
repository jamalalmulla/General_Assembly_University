module.exports = (req, res, next) => {
  if (req.user && req.user.userRole === 'instructor') {
    next()
  } else {
    res.redirect('/auth/signin')
  }
}
