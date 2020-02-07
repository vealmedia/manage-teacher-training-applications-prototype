module.exports = router => {

  router.get('/application/:applicationId/withdraw', (req, res) => {
    res.render('application/withdraw', {
      applicationId: req.params.applicationId
    })
  })

  router.post('/application/:applicationId/withdraw', (req, res) => {
    res.redirect(`/application/${req.params.applicationId}/confirm-withdraw`)
  })

  router.get('/application/:applicationId/confirm-withdraw', (req, res) => {
    res.render(`application/confirm-withdraw`, {
      applicationId: req.params.applicationId
    })
  })

  router.post('/application/:applicationId/confirm-withdraw', (req, res) => {
    const applicationId = req.params.applicationId
    const application = req.session.data.applications[applicationId]

    application.status = "Offer withdrawn";
    application.offer.withdrawnDate = new Date().toISOString()
    req.flash('success', 'offer-withdrawn')
    res.redirect(`/application/${applicationId}`)
  })

}
