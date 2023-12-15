'use strict';

const express = require('express');
const { validate } = require('../middleware/validate');
const { seekerValidation } = require('../validations');
const seekerController = require('../controllers/seeker.controller');
const auth = require('../middleware/auth');
const { seekerService, tokenService } = require('../services');

const router = express.Router();

router.post(
  "/register",
  validate(seekerValidation.createSeeker),
  seekerController.register
);

router.post('/login', seekerController.login);
router
  .route('/profile')
  .post(
    tokenService.verifyToken,
    seekerService.validateSeeker,
    seekerController.getSeekerProfile
  );
router
  .route('/editProfile')
  .post(
    tokenService.verifyToken,
    seekerService.validateSeeker,
    validate(seekerValidation.updateSeekerProfile),
    seekerController.updateSeekerProfile
  );
router
  .route("/job/:id")
  .get(
    tokenService.verifyToken,
    seekerService.validateSeeker,
    validate(seekerValidation.getJob),
    seekerController.getJob
  );
router
  .route("/job/list")
  .post(
    tokenService.verifyToken,
    seekerService.validateSeeker,
    validate(seekerValidation.getJobs),
    seekerController.getJobList
  );
router
  .route("/application/apply")
  .post(
    tokenService.verifyToken,
    seekerService.validateSeeker,
    validate(seekerValidation.applyJob),
    seekerController.applyJob
  );
router
  .route("/application/list")
  .post(
    tokenService.verifyToken,
    seekerService.validateSeeker,
    validate(seekerValidation.getApplications),
    seekerController.getApplicationList
  );
router
  .route("/application/:id")
  .get(
    tokenService.verifyToken,
    seekerService.validateSeeker,
    validate(seekerValidation.getApplication),
    seekerController.getApplication
  );
module.exports = router;
