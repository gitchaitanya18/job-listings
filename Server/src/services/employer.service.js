'use strict';

const httpStatus = require('http-status');
const { User, Jobs, Application } = require('../models');
const ApiError = require('../utils/ApiError');
const MESSAGES = require('../constants/response.message');
const ResponseHelper = require('../utils/responseHandler');

const getEmployerByEmail = async (email) => {
  try {
    return await User.findOne({
      role: 'EMPLOYER',
      email: email,
      status: { $ne: 'deleted' },
    }).lean();
  } catch (error) {
    console.error('Error retrieving admin by email:', error);
    return {
      error: true,
      message: error.message,
      status: error.status,
    };
  }
};

// Signup

const registerEmployer = async (data) => {
  try {
    console.log('data', data)
    const createdUser = await User.create(data);
    return createdUser;
  } catch (error) {
    console.error('Error retrieving user:', error);
    return {
      error: true,
      message: error.message,
      status: error.status,
    };
  }
};

const validateEmployer = async (req, res, next) => {
  try {
    const user = req.user;
    const userInfo = await User.findOne({
      _id: user._id,
      role: 'EMPLOYER',
      status: { $ne: 'deleted' },
    });

    if (!userInfo) {
      throw { message: MESSAGES.USER.FAILURE };
    }
    return next();
  } catch (error) {
    return ResponseHelper.error(res, httpStatus.OK, {
      message: MESSAGES.USER.RECORD_SUCCESS,
      error: true,
      status: httpStatus.OK,
    });
  }
};

const getEmployerById = async (userId) => {
  try {
    return await User.findOne({
      _id: userId,
      role: 'EMPLOYER',
      status: { $ne: 'deleted' },
    });
  } catch (error) {
    // Handle any errors that occurred during the database operation
    console.error('Error retrieving user by ID:', error);
    throw error;
  }
};

const updateEmployerById = async (userId, updateBody) => {
  try {
    const userData = await getUserById(userId);
    if (!userData) {
      throw new ApiError(httpStatus.OK, 'EMPLOYER not found');
    }

    await User.updateOne({ _id: userId }, { $set: updateBody });

    const updateData = await getUserLoginType(userId);
    return updateData;
  } catch (error) {
    // Handle any errors that occurred during the database operation
    console.error('Error updating user by ID:', error);
    return {
      error: true,
      message: error.message,
      status: error.status,
    };
  }
};
const createJob = async (data) => {
  try {
    const createdJob = await Jobs.create(data);
    return createdJob;
  } catch (error) {
    console.error('Error retrieving Job:', error);
    return {
      error: true,
      message: error.message,
      status: error.status,
    };
  }
};
const getJob = async (id) => {
  try {
    const job = await Jobs.findById(id).populate('employer_id').lean();

    if (!job) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
    }

    const applications = await Application.find({ job_id: id })
      .populate('seeker_id')
      .lean();

    return { job, applications };
  } catch (error) {
    console.error('Error retrieving job with applications:', error);
    throw error;
  }
};
const updateJob = async (data) => {
  try {
    const getJob = await Jobs.findOneAndUpdate(
      { _id: data.id, employer_id: data.userId },
      data,
      { new: true }
    );
    return getJob;
  } catch (error) {
    console.error('Error retrieving Job:', error);
    return {
      error: true,
      message: error.message,
      status: error.status,
    };
  }
};

const removeJob = async (data) => {
  try {
    const getJob = await Jobs.deleteOne({
      _id: data.id,
      employer_id: data.userId,
    });
    if (getJob.deletedCount === 0) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
    }
    return getJob;
  } catch (error) {
    console.error('Error retrieving Job:', error);
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

  const query = {
    ...filter,
    employer_id: userId,
  };

  const jobs = await Jobs.find(query)
    .sort({ created_at: 'desc' })
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
const updateApplication = async (data) => {
  try {
    const updateApplication = await Application.findOneAndUpdate(
      { job_id: data.job_id, seeker_id: data.userId },
      { status: data.status },
      { new: true }
    );
    return updateApplication;
  } catch (error) {
    console.error("Error retrieving Job:", error);
    return {
      error: true,
      message: error.message,
      status: error.status,
    };
  }
};

const getApplicationList = async (filter, options, userId) => {
  const { sortBy, limit = 10, page = 1 } = options;
  const offset = limit * (page - 1);

  // Find all jobs based on employer_id
  const jobs = await Jobs.find({ employer_id: userId }).lean();
  console.log('jobs')
    , jobs
  if (!jobs || jobs.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No jobs found for the employer');
  }

  // Extract job IDs from the found jobs
  const jobIds = jobs.map(job => job._id);

  // Use jobIds in the application query
  const applicationQuery = {
    ...filter,
    job_id: { $in: jobIds }, // Find applications for jobs that belong to the employer
  };

  const applications = await Application.find(applicationQuery)
    .sort({ created_at: "desc" })
    .populate("job_id")
    .populate("seeker_id")
    .limit(limit)
    .skip(offset)
    .lean();

  const totalCount = await Application.countDocuments(applicationQuery);
  const totalPages = Math.ceil(totalCount / limit);

  return {
    results: applications,
    totalCount,
    totalPages,
  };
};

module.exports = {
  getEmployerByEmail,
  validateEmployer,
  updateEmployerById,
  getEmployerById,
  registerEmployer,
  getEmployerByEmail,
  createJob,
  getJob,
  updateJob,
  removeJob,
  getJobList,
  updateApplication,
  getApplicationList
};
