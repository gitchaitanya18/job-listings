'use strict';

const express = require('express');
const { validate } = require('../middleware/validate');
const employerController = require('../controllers/employer.controller');
const { employerValidation } = require('../validations');
const { employerService, tokenService } = require('../services');

const router = express.Router();
router.post(
  "/register",
  validate(employerValidation.createEmployer),
  employerController.register
);
router.post('/login', employerController.login);
router
  .route('/profile')
  .post(
    tokenService.verifyToken,
    employerService.validateEmployer,
    employerController.getEmployerProfile
  );
router
  .route('/editProfile')
  .post(
    tokenService.verifyToken,
    employerService.validateEmployer,
    validate(employerValidation.updateUserProfile),
    employerController.updateEmployerProfile
  );
router
  .route("/job/:id")
  .get(
    tokenService.verifyToken,
    employerService.validateEmployer,
    validate(employerValidation.getJob),
    employerController.getJob
  );
router
  .route("/job/list")
  .post(
    tokenService.verifyToken,
    employerService.validateEmployer,
    validate(employerValidation.getJobs),
    employerController.getJobList
  );
router
  .route("/job/update")
  .post(
    tokenService.verifyToken,
    employerService.validateEmployer,
    validate(employerValidation.updateJob),
    employerController.updateJob
  );
router
  .route("/job/create")
  .post(
    tokenService.verifyToken,
    employerService.validateEmployer,
    validate(employerValidation.createJob),
    employerController.createJob
  );
router
  .route("/job/delete")
  .post(
    tokenService.verifyToken,
    employerService.validateEmployer,
    validate(employerValidation.removeJob),
    employerController.deleteJob
  );
router
  .route("/application/list")
  .post(
    tokenService.verifyToken,
    employerService.validateEmployer,
    validate(employerValidation.getApplications),
    employerController.getApplicationList
  );
router
  .route("/application/update")
  .post(
    tokenService.verifyToken,
    employerService.validateEmployer,
    validate(employerValidation.updateApplication),
    employerController.updateApplication
  );

module.exports = router;
