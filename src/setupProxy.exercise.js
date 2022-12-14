// `res.redirect()` function sends back an HTTP 302 by default.
// When an HTTP client receives a response with status 302, it will send
// an HTTP request to the URL in the response, in this case `to/`
function proxy(app) {
  const regexUrlPath = `/\/$/`
  // redirect handler
  app.get(regexUrlPath, (req, res) => res.redirect('/discover'))
}

module.exports = proxy
