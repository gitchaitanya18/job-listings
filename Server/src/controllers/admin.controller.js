'use strict';

const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { adminService, tokenService } = require('../services');
const ResponseHelper = require('../utils/responseHandler');
const MESSAGES = require('../constants/response.message');
const bcrypt = require('bcrypt');

const adminLogin = catchAsync(async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists in the database
    const userInfo = await adminService.getAdminByEmail(email);
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

const createUser = catchAsync(async (req, res) => {
  try {
    const userData = await adminService.createUser(req.body);
    if (userData.error) {
      throw new ApiError(userData.status, userData.message);
    }
    return ResponseHelper.success(res, httpStatus.OK, {
      data: userData,
      message: MESSAGES.ADMIN.SUCCESS,
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

const getUserList = catchAsync(async (req, res) => {
  try {
    const userId = req.user._id;
    const filter = pick(req.body, ['firstName', 'lastName', 'role']);
    const options = pick(req.body, ['sortBy', 'limit', 'page']);
    const result = await adminService.getUserList(filter, options, userId);
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
    console.error('Error listing user:', error);
    return ResponseHelper.error(res, httpStatus.BAD_REQUEST, {
      message: error.message,
      error: true,
      status: error.status,
    });
  }
});

const getUser = catchAsync(async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await adminService.getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return ResponseHelper.success(res, httpStatus.OK, {
      data: user,
      message: MESSAGES.ADMIN.FOUND,
      error: false,
      status: httpStatus.OK,
    });
  } catch (error) {
    // Handle the error appropriately
    console.error('Error getting user:', error);
    return ResponseHelper.error(res, httpStatus.BAD_REQUEST, {
      message: error.message,
      error: true,
      status: error.status,
    });
  }
});

const updateUser = catchAsync(async (req, res) => {
  try {
    const data = req.body
    data.userId = req.params.userId
    console.log('DATA', data)
    const userData = await adminService.updateUserById(data);
    if (userData.error) {
      throw new ApiError(userData.status, userData.message);
    }
    return ResponseHelper.success(res, httpStatus.OK, {
      data: userData,
      message: MESSAGES.ADMIN.UPDATE.success,
      error: false,
      status: httpStatus.OK,
    });
  } catch (error) {
    // Handle the error appropriately
    console.error('Error getting user:', error);
    return ResponseHelper.error(res, httpStatus.BAD_REQUEST, {
      message: error.message,
      error: true,
      status: error.status,
    });
  }
});

const deleteUser = catchAsync(async (req, res) => {
  try {
    const userId = req.params.userId;
    const userData = await adminService.deleteUserById(userId);
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
    console.error('Error delete user:', error);
    return ResponseHelper.error(res, httpStatus.BAD_REQUEST, {
      message: error.message,
      error: true,
      status: error.status,
    });
  }
});
const getUserProfile = catchAsync(async (req, res) => {
  try {
    const user = req.user;
    console.log(user, 'user');
    const userInfo = await adminService.getAdminById(user._id);
    if (!userInfo) {
      throw new ApiError(httpStatus.NOT_FOUND, MESSAGES.ADMIN.PROFILE.FAILURE);
    }
    return ResponseHelper.success(res, httpStatus.OK, {
      data: userInfo,
      message: MESSAGES.ADMIN.PROFILE.SUCCESS,
      error: false,
      status: httpStatus.OK,
    });
  } catch (error) {
    // Handle the error appropriately
    console.error('Error getting user:', error);
    return ResponseHelper.error(res, httpStatus.BAD_REQUEST, {
      message: error.message,
      error: true,
      status: error.status,
    });
  }
});
const updateUserProfile = catchAsync(async (req, res) => {
  try {
    const user = req.user;
    const userData = await adminService.updateAdminById(user._id, req.body);
    if (userData.error) {
      throw new ApiError(userData.status, userData.message);
    }
    return ResponseHelper.success(res, httpStatus.OK, {
      data: userData,
      message: MESSAGES.ADMIN.UPDATE.success,
      error: false,
      status: httpStatus.OK,
    });
  } catch (error) {
    // Handle the error appropriately
    console.error('Error update user:', error);
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

    const jobInfo = await adminService.getJob(id);
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
    console.error('Error getting user:', error);
    return ResponseHelper.error(res, httpStatus.NOT_FOUND, {
      message: error.message,
      error: true,
      status: error.status,
    });
  }
});

const getJobList = catchAsync(async (req, res) => {
  try {
    const userId = req.user._id;
    const filter = pick(req.body, ['title', 'description']);
    const options = pick(req.body, ['sortBy', 'limit', 'page']);
    const result = await adminService.getJobList(filter, options);
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
    console.error('Error listing user:', error);
    return ResponseHelper.error(res, httpStatus.BAD_REQUEST, {
      message: error.message,
      error: true,
      status: error.status,
    });
  }
});
const deleteJob = catchAsync(async (req, res) => {
  try {
    const data = req.params;
    const userData = await adminService.removeJob(data);
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
    console.error('Error delete user:', error);
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
    const id = req.params.id;
    const userData = await adminService.updateJob(id, data);
    if (userData.error) {
      throw new ApiError(userData.status, userData.message);
    }
    return ResponseHelper.success(res, httpStatus.OK, {
      data: userData,
      message: 'Job Updated Successfully',
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

const getApplicationList = catchAsync(async (req, res) => {
  try {
    const filter = pick(req.body, ['title', 'description']);
    const options = pick(req.body, ['sortBy', 'limit', 'page']);
    const result = await adminService.getApplicationList(filter, options);
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
    console.error('Error listing user:', error);
    return ResponseHelper.error(res, httpStatus.BAD_REQUEST, {
      message: error.message,
      error: true,
      status: error.status,
    });
  }
});

module.exports = {
  adminLogin,
  createUser,
  getUserList,
  getUser,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  getJob,
  getJobList,
  updateJob,
  deleteJob,
  getApplicationList,
};
