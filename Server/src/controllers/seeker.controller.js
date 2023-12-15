"use strict";

const moment = require("moment");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { seekerService, tokenService } = require("../services");
const ResponseHelper = require("../utils/responseHandler");
const MESSAGES = require("../constants/response.message");
const bcrypt = require("bcrypt");
const pick = require("../utils/pick");

const register = catchAsync(async (req, res) => {
  try {
    const user = req.body;
    const userInfo = await seekerService.registerSeeker(user);

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
    console.error("Error login user:", error);
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
    const userInfo = await seekerService.getSeekerByEmail(email);
    console.log(userInfo, "userInfo");

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
    console.error("Error creating user:", error);
    return ResponseHelper.error(res, httpStatus.BAD_REQUEST, {
      message: error.message,
      error: true,
      status: error.status,
    });
  }
});
const getSeekerProfile = catchAsync(async (req, res) => {
  try {
    const user = req.user;
    console.log(user, "user");
    const userInfo = await seekerService.getSeekerById(user._id);
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
    console.error("Error getting user:", error);
    return ResponseHelper.error(res, httpStatus.OK, {
      message: error.message,
      error: true,
      status: error.status,
    });
  }
});
const updateSeekerProfile = catchAsync(async (req, res) => {
  try {
    const user = req.user;
    const userData = await seekerService.updateSeekerById(user._id, req.body);
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
const getJob = catchAsync(async (req, res) => {
  try {
    const id = req.params.id;

    const jobInfo = await seekerService.getJob(id);
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

const getJobList = catchAsync(async (req, res) => {
  try {
    const userId = req.user._id
    const search = req.body.search
    let filter = {}
    const options = pick(req.body, ["sortBy", "limit", "page"]);
    if (search) {
      filter["$or"] = [];

      filter["$or"].push({
        title: { $regex: search || "", $options: "i" },
      });
      filter["$or"].push({
        description: { $regex: search || "", $options: "i" },
      });
      filter["$or"].push({
        location: { $regex: search || "", $options: "i" },
      });
    }
    const result = await seekerService.getJobList(filter, options, userId);
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

const applyJob = catchAsync(async (req, res) => {
  try {
    let data = {};
    data.job_id = req.body.job_id;
    data.seeker_id = req.user._id;
    console.log('data==>main', data);
    const userInfo = await seekerService.applyJob(data);

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

const getApplication = catchAsync(async (req, res) => {
  try {
    const id = req.params.id;

    const jobInfo = await seekerService.getJob(id);
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

const getApplicationList = catchAsync(async (req, res) => {
  try {
    const userId = req.user._id
    const filter = {};
    const options = pick(req.body, ["sortBy", "limit", "page"]);
    const result = await seekerService.getApplicationList(filter, options, userId);
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



module.exports = {
  register,
  login,
  getSeekerProfile,
  updateSeekerProfile,
  getJobList,
  getJob,
  applyJob,
  getApplication,
  getApplicationList,
};
