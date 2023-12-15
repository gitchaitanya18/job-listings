'use strict';
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { employerService, tokenService } = require('../services');
const ResponseHelper = require('../utils/responseHandler');
const MESSAGES = require('../constants/response.message');
const bcrypt = require('bcrypt');

const register = catchAsync(async (req, res) => {
  try {

    const user = req.body;
    console.log('USER', user)
    const userInfo = await employerService.registerEmployer(user);

    if (userInfo.error) {
      throw new ApiError(httpStatus.OK, userInfo.message);
    }

    return ResponseHelper.success(res, httpStatus.OK, {
      data: userInfo,
      message: MESSAGES.USER.SUCCESS,
      error: false,
      status: httpStatus.OK,
    });
  } catch (error) {
    // Handle the error appropriately
    console.error('Error login user:', error);
    return ResponseHelper.error(res, httpStatus.OK, {
      message: error.message,
      error: true,
      status: error.status,
    });
  }
});

const login = catchAsync(async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists in the database
    const userInfo = await employerService.getEmployerByEmail(email);
    console.log(userInfo, 'userInfo');

    if (!userInfo) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        MESSAGES.ADMIN.LOGIN.wrong_email
      );
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, userInfo.password);

    if (!passwordMatch) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        MESSAGES.ADMIN.LOGIN.wrong_details
      );
    }

    // Generate a JWT token
    const token = await tokenService.generateAuthTokens(userInfo);

    return ResponseHelper.success(res, httpStatus.OK, {
      accessToken: token.access,
      refreshToken: token.refresh,
      data: userInfo,
      message: MESSAGES.ADMIN.LOGIN.success,
      error: false,
      status: httpStatus.OK,
    });
  } catch (error) {
    // Handle the error appropriately
    console.error('Error creating user:', error);
    return ResponseHelper.error(res, httpStatus.BAD_REQUEST, {
      message: error.message,
      error: true,
      status: error.status,
    });
  }
});

const getJob = catchAsync(async (req, res) => {
  try {
    const id = req.params.id;
    const jobInfo = await employerService.getJob(id);
    if (!jobInfo) {
      throw new ApiError(httpStatus.NOT_FOUND, MESSAGES.USER.PROFILE.FAILURE);
    }
    return ResponseHelper.success(res, httpStatus.OK, {
      data: jobInfo,
      message: MESSAGES.USER.PROFILE.SUCCESS,
      error: false,
      status: httpStatus.OK,
    });
  } catch (error) {
    // Handle the error appropriately
    console.error("Error getting user:", error);
    return ResponseHelper.error(res, httpStatus.NOT_FOUND, {
      message: error.message,
      error: true,
      status: error.status,
    });
  }
});

const getEmployerProfile = catchAsync(async (req, res) => {
  try {
    const user = req.user;
    console.log(user, 'user');
    const userInfo = await employerService.getEmployerById(user._id);
    if (!userInfo) {
      throw new ApiError(httpStatus.OK, MESSAGES.USER.PROFILE.FAILURE);
    }
    return ResponseHelper.success(res, httpStatus.OK, {
      data: userInfo,
      message: MESSAGES.USER.PROFILE.SUCCESS,
      error: false,
      status: httpStatus.OK,
    });
  } catch (error) {
    // Handle the error appropriately
    console.error('Error getting user:', error);
    return ResponseHelper.error(res, httpStatus.OK, {
      message: error.message,
      error: true,
      status: error.status,
    });
  }
});

const updateEmployerProfile = catchAsync(async (req, res) => {
  try {
    const user = req.user;
    const userData = await employerService.updateEmployerById(
      user._id,
      req.body
    );
    if (userData.error) {
      throw new ApiError(userData.status, userData.message);
    }
    return ResponseHelper.success(res, httpStatus.OK, {
      data: userData,
      message: MESSAGES.USER.UPDATE.success,
      error: false,
      status: httpStatus.OK,
    });
  } catch (error) {
    // Handle the error appropriately
    console.error('Error update user:', error);
    return ResponseHelper.error(res, httpStatus.OK, {
      message: error.message,
      error: true,
      status: error.status,
    });
  }
});

const getJobList = catchAsync(async (req, res) => {
  try {
    const userId = req.user._id;
    const filter = pick(req.body, ["title", "description"]);
    const options = pick(req.body, ["sortBy", "limit", "page"]);
    const result = await employerService.getJobList(filter, options, userId);
    if (result.error) {
      throw new ApiError(result.status, result.message);
    }
    return ResponseHelper.success(res, httpStatus.OK, {
      data: result,
      message: MESSAGES.ADMIN.LIST,
      error: false,
      status: httpStatus.OK,
    });
  } catch (error) {
    // Handle the error appropriately
    console.error("Error listing user:", error);
    return ResponseHelper.error(res, httpStatus.BAD_REQUEST, {
      message: error.message,
      error: true,
      status: error.status,
    });
  }
});

const updateJob = catchAsync(async (req, res) => {
  try {
    const data = req.body;

    data.userId = req.user._id;

    const userData = await employerService.updateJob(data);
    if (userData.error) {
      throw new ApiError(userData.status, userData.message);
    }
    return ResponseHelper.success(res, httpStatus.OK, {
      data: userData,
      message: MESSAGES.USER.UPDATE.success,
      error: false,
      status: httpStatus.OK,
    });
  } catch (error) {
    // Handle the error appropriately
    console.error("Error update user:", error);
    return ResponseHelper.error(res, httpStatus.OK, {
      message: error.message,
      error: true,
      status: error.status,
    });
  }
});

const createJob = catchAsync(async (req, res) => {
  try {
    const job = req.body;
    console.log('JOB', job)
    job.employer_id = req.user._id;
    const userInfo = await employerService.createJob(job);

    if (userInfo.error) {
      throw new ApiError(httpStatus.OK, userInfo.message);
    }

    return ResponseHelper.success(res, httpStatus.OK, {
      data: userInfo,
      message: MESSAGES.USER.RECORD_SUCCESS,
      error: false,
      status: httpStatus.OK,
    });
  } catch (error) {
    // Handle the error appropriately
    console.error("Error login user:", error);
    return ResponseHelper.error(res, httpStatus.OK, {
      message: error.message,
      error: true,
      status: error.status,
    });
  }
});

const deleteJob = catchAsync(async (req, res) => {
  try {
    const data = req.body;
    data.userId = req.user._id;
    const userData = await employerService.removeJob(data);
    if (userData.error) {
      throw new ApiError(userData.status, userData.message);
    }
    return ResponseHelper.success(res, httpStatus.OK, {
      message: MESSAGES.ADMIN.DELETED,
      error: false,
      status: httpStatus.OK,
    });
  } catch (error) {
    // Handle the error appropriately
    console.error("Error delete user:", error);
    return ResponseHelper.error(res, httpStatus.BAD_REQUEST, {
      message: error.message,
      error: true,
      status: error.status,
    });
  }
});

const updateApplication = catchAsync(async (req, res) => {
  try {
    const data = req.body;

    const userData = await employerService.updateApplication(data);
    if (userData.error) {
      throw new ApiError(userData.status, userData.message);
    }
    return ResponseHelper.success(res, httpStatus.OK, {
      data: userData,
      message: MESSAGES.USER.UPDATE.success,
      error: false,
      status: httpStatus.OK,
    });
  } catch (error) {
    // Handle the error appropriately
    console.error("Error update user:", error);
    return ResponseHelper.error(res, httpStatus.OK, {
      message: error.message,
      error: true,
      status: error.status,
    });
  }
});

const getApplicationList = catchAsync(async (req, res) => {
  try {
    const userId = req.user._id
    const filter = pick(req.body, ["title", "description"]);
    const options = pick(req.body, ["sortBy", "limit", "page"]);
    const result = await employerService.getApplicationList(filter, options, userId);
    if (result.error) {
      throw new ApiError(result.status, result.message);
    }
    return ResponseHelper.success(res, httpStatus.OK, {
      data: result,
      message: MESSAGES.ADMIN.LIST,
      error: false,
      status: httpStatus.OK,
    });
  } catch (error) {
    return ResponseHelper.error(res, httpStatus.BAD_REQUEST, {
      message: error.message,
      error: true,
      status: error.status,
    });
  }
});

module.exports = {
  register,
  login,
  updateEmployerProfile,
  getEmployerProfile,
  getJob,
  getJobList,
  updateJob,
  createJob,
  deleteJob,
  updateApplication,
  getApplicationList
};
