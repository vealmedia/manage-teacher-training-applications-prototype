const applications = require( '../data/applications')

module.exports = router => {

  function getConditions(application) {
    let conditions = [];
    if(application['standard-conditions']) {
      application['standard-conditions'].map((item) => {
        return {
          text: item.description
        }
      }).forEach((item) => {
        conditions.push(item)
      });
    }

    if(application.conditions) {
      application.conditions.map((item) => {
        return {
          text: item.description
        }
      }).forEach((item) => {
        conditions.push(item)
      });
    }
    return conditions;
  }

  router.get('/application/:applicationId/mark-conditions', (req, res) => {
    const applicationId = req.params.applicationId;
    const application = req.session.data.applications[applicationId]

    res.render('application/mark-conditions', {
      applicationId: applicationId,
      conditions: getConditions(application)
    })
  })

  router.post('/application/:applicationId/mark-conditions', (req, res) => {
    const applicationId = req.params.applicationId
    const { conditionsmet } = req.body

    if (conditionsmet === 'yes') {
      res.redirect(`/application/${applicationId}/confirm-conditions-met`)
    } else {
      res.redirect(`/application/${applicationId}/confirm-conditions-not-met`)
    }
  })

  router.get('/application/:applicationId/confirm-conditions-met', (req, res) => {
    const applicationId = req.params.applicationId;
    const application = req.session.data.applications[applicationId]

    res.render('application/confirm-conditions-met', {
      applicationId: applicationId,
      conditions: getConditions(application)
    })
  })

  router.post('/application/:applicationId/confirm-conditions-met', (req, res) => {
    const applicationId = req.params.applicationId
    const application = req.session.data.applications[applicationId]

    application.statusA = "conditions-met";
    application.status['conditions-met'] = { };
    req.flash('success', 'conditions-met');
    res.redirect(`/application/${applicationId}`);
  })

  router.get('/application/:applicationId/confirm-conditions-not-met', (req, res) => {
    const applicationId = req.params.applicationId;
    const application = req.session.data.applications[applicationId]

    res.render('application/confirm-conditions-not-met', {
      applicationId: applicationId,
      conditions: getConditions(application)
    })
  })

  router.post('/application/:applicationId/confirm-conditions-not-met', (req, res) => {
    const applicationId = req.params.applicationId
    const application = req.session.data.applications[applicationId]

    application.statusA = "conditions-not-met";
    application.status['conditions-not-met'] = { };
    req.flash('success', 'conditions-not-met');
    res.redirect(`/application/${applicationId}`);
  })



}
