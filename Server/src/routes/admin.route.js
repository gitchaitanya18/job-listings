'use strict';

const express = require('express');
const { validate } = require('../middleware/validate');
const { userValidation, adminValidation } = require('../validations');
const adminController = require('../controllers/admin.controller');
const { adminService, tokenService } = require('../services');
const router = express.Router();
router
  .route('/login')
  .post(validate(adminValidation.login), adminController.adminLogin);

router
  .route('/list')
  .post(
    tokenService.verifyToken,
    adminService.validateAdmin,
    validate(adminValidation.getUsers),
    adminController.getUserList
  );

router
  .route('/user/:userId')
  .put(
    tokenService.verifyToken,
    adminService.validateAdmin,
    validate(adminValidation.updateUser),
    adminController.updateUser
  );
router
  .route('/edit')
  .post(
    tokenService.verifyToken,
    adminService.validateAdmin,
    validate(adminValidation.updateUser),
    adminController.updateUser
  );
router
  .route('/user/:userId')
  .delete(
    tokenService.verifyToken,
    adminService.validateAdmin,
    validate(adminValidation.deleteUser),
    adminController.deleteUser
  );
router
  .route('/profile')
  .post(
    tokenService.verifyToken,
    adminService.validateAdmin,
    adminController.getUserProfile
  );
router
  .route('/editProfile')
  .post(
    tokenService.verifyToken,
    adminService.validateAdmin,
    adminController.updateUserProfile
  );
router
  .route('/job/:id')
  .get(
    tokenService.verifyToken,
    adminService.validateAdmin,
    validate(adminValidation.getJob),
    adminController.getJob
  );
router
  .route('/job/list')
  .post(
    tokenService.verifyToken,
    adminService.validateAdmin,
    validate(adminValidation.getJobs),
    adminController.getJobList
  );
router
  .route('/job/:id')
  .delete(
    tokenService.verifyToken,
    adminService.validateAdmin,
    validate(adminValidation.removeJob),
    adminController.deleteJob
  );
router
  .route('/job/:id')
  .put(
    tokenService.verifyToken,
    adminService.validateAdmin,
    validate(adminValidation.updateJob),
    adminController.updateJob
  );
router
  .route('/application/list')
  .post(
    tokenService.verifyToken,
    adminService.validateAdmin,
    validate(adminValidation.getApplications),
    adminController.getApplicationList
  );
module.exports = router;
