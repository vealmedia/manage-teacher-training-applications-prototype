var uuid = require('uuid/v4');

module.exports = router => {

  router.get('/application/:applicationId/offer', (req, res) => {
    res.render(`application/offer`, {
      applicationId: req.params.applicationId
    })
  })

  router.post('/application/:applicationId/offer', (req, res) => {
    const applicationId = req.params.applicationId
    res.redirect(`/application/${applicationId}/confirm-offer`)
  })

  // Show confirmation
  router.get('/application/:applicationId/confirm-offer', (req, res) => {
    const applicationId = req.params.applicationId
    const application = req.session.data.applications[applicationId]

    let standardConditions = req.session.data['standard-conditions'].map((item) => {
      return {
        description: item
      }
    })

    let furtherConditions = [];

    if (req.session.data['condition-1']) {
      furtherConditions.push({ id: uuid(), description: req.session.data['condition-1'], met: false })
    }
    if (req.session.data['condition-2']) {
      furtherConditions.push({ id: uuid(), description: req.session.data['condition-2'], met: false })
    }
    if (req.session.data['condition-3']) {
      furtherConditions.push({ id: uuid(), description: req.session.data['condition-3'], met: false })
    }
    if (req.session.data['condition-4']) {
      furtherConditions.push({ id: uuid(), description: req.session.data['condition-4'], met: false })
    }

    let recommendations = req.session.data.recommendations

    res.render('application/confirm-offer', {
      applicationId: req.params.applicationId,
      standardConditions,
      furtherConditions,
      recommendations
    })
  })

  router.post('/application/:applicationId/confirm-offer', (req, res) => {
    const applicationId = req.params.applicationId
    const application = req.session.data.applications[applicationId]
    application.status = 'Offered';
    application.offer = {
      madeDate: new Date().toISOString()
    };

    application.offer.standardConditions = req.session.data['standard-conditions'].map((item) => {
      return {
        id: uuid(),
        description: item,
        complete: false
      }
    })

    const conditions = []
    if (req.session.data['condition-1']) {
      conditions.push({ id: uuid(), description: req.session.data['condition-1'], met: false })
    }
    if (req.session.data['condition-2']) {
      conditions.push({ id: uuid(), description: req.session.data['condition-2'], met: false })
    }
    if (req.session.data['condition-3']) {
      conditions.push({ id: uuid(), description: req.session.data['condition-3'], met: false })
    }
    if (req.session.data['condition-4']) {
      conditions.push({ id: uuid(), description: req.session.data['condition-4'], met: false })
    }
    application.offer.conditions = conditions;

    application.offer.recommendations = req.session.data.recommendations
    req.flash('success', 'offered')
    res.redirect(`/application/${req.params.applicationId}`)
  })

}
