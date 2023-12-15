"use strict";

const httpStatus = require("http-status");
const { User, Jobs, Application } = require("../models");
const ResponseHelper = require('../utils/responseHandler');
const MESSAGES = require("../constants/response.message");
const objectId = require('objectid')

const getSeekerByEmail = async (email) => {
  try {
    return await User.findOne({
      role: "JOB_SEEKER",
      email: email,
      status: { $ne: "deleted" },
    }).lean();
  } catch (error) {
    console.error("Error retrieving admin by email:", error);
    return {
      error: true,
      message: error.message,
      status: error.status,
    };
  }
};

// Signup

const registerSeeker = async (data) => {
  try {
    const createdUser = await User.create(data);
    return createdUser;
  } catch (error) {
    console.error("Error retrieving user login type:", error);
    return {
      error: true,
      message: error.message,
      status: error.status,
    };
  }
};

const validateSeeker = async (req, res, next) => {
  try {
    const user = req.user;
    const userInfo = await User.findOne({
      _id: user._id,
      role: "JOB_SEEKER",
      status: { $ne: "deleted" },
    });

    if (!userInfo) {
      throw { message: MESSAGES.USER.FAILURE };
    }
    return next();
  } catch (error) {
    return ResponseHelper.error(res, httpStatus.OK, {
      message: MESSAGES.USER.FAILURE,
      error: true,
      status: httpStatus.OK,
    });
  }
};

const getSeekerById = async (userId) => {
  try {
    return await User.findOne({
      _id: userId,
      role: "JOB_SEEKER",
      status: { $ne: "deleted" },
    });
  } catch (error) {
    // Handle any errors that occurred during the database operation
    console.error("Error retrieving user by ID:", error);
    throw error;
  }
};

const updateSeekerById = async (userId, updateBody) => {
  try {
    const userData = await getUserById(userId);
    if (!userData) {
      throw new ApiError(httpStatus.OK, "JOB_SEEKER not found");
    }

    await User.updateOne({ _id: userId }, { $set: updateBody });

    const updateData = await getUserLoginType(userId);
    return updateData;
  } catch (error) {
    // Handle any errors that occurred during the database operation
    console.error("Error updating user by ID:", error);
    return {
      error: true,
      message: error.message,
      status: error.status,
    };
  }
};
const getJob = async (id) => {
  try {
    const getJob = await Jobs.findOne({ _id: id, status: { $ne: "inactive" } });
    return getJob;
  } catch (error) {
    console.error("Error retrieving Job:", error);
    return {
      error: true,
      message: error.message,
      status: error.status,
    };
  }
};

const getJobList = async (filter, options, userId) => {
  const { sortBy, limit = 10, page = 1 } = options;
  const offset = limit * (page - 1);
  const userApplications = await Application.find({
    seeker_id: userId,
  }).distinct("job_id");

  console.log('userApplications', userApplications)

  const query = {
    ...filter,
    _id: { $nin: userApplications },
    status: { $ne: "inactive" }
  };


  const jobs = await Jobs.find(query)
    .sort({ created_at: "desc" })
    .limit(limit)
    .skip(offset)
    .lean();

  const totalCount = await Jobs.countDocuments(query);
  const totalPages = Math.ceil(totalCount / limit);

  return {
    results: jobs,
    totalCount,
    totalPages,
  };
};

const getApplicationList = async (filter, options, userId) => {
  const { sortBy, limit = 10, page = 1 } = options;
  const offset = limit * (page - 1);

  const query = {
    ...filter,
    seeker_id: userId,
  };

  const applications = await Application.find(query)
    .sort({ created_at: -1 })
    .populate("job_id")
    .limit(limit)
    .skip(offset)
    .lean();

  const totalCount = await Application.countDocuments(query);
  const totalPages = Math.ceil(totalCount / limit);

  return {
    results: applications,
    totalCount,
    totalPages,
  };
};

const getApplication = async (id) => {
  try {
    const application = await Application.findById(id)
      .populate("job_id")
      .lean();

    if (!application) {
      throw new Error("Application not found");
    }

    return application;
  } catch (error) {
    console.error("Error retrieving application with job description:", error);
    throw error;
  }
};

const applyJob = async (data) => {
  try {
    console.log('data==>', data);
    const application = await Application.create(data);
    return application;
  } catch (error) {
    console.error('Error retrieving application with job description:', error);
    throw error;
  }
};

module.exports = {
  getSeekerByEmail,
  validateSeeker,
  updateSeekerById,
  getSeekerById,
  registerSeeker,
  getSeekerByEmail,
  getJob,
  getJobList,
  getApplicationList,
  getApplication,
  applyJob,
};
