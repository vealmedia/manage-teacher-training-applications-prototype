const express = require('express')
const router = express.Router()

require('./routes/application-list')(router)
require('./routes/application')(router)
require('./routes/enroll')(router)
require('./routes/withdraw-offer')(router)
require('./routes/make-offer')(router)
require('./routes/make-different-offer')(router)
require('./routes/reject-application')(router)
require('./routes/conditions')(router)
require('./routes/users')(router)
require('./routes/email')(router)

// Render other application pages
router.all('/search-results', (req, res) => {
  res.render('search-results', {
    q: req.query.q
  })
})

module.exports = router
