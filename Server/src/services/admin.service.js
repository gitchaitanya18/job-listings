'use strict';

const httpStatus = require('http-status');
const { User, Jobs, Application } = require('../models');
const ApiError = require('../utils/ApiError');
const MESSAGES = require('../constants/response.message');
const ResponseHelper = require('../utils/responseHandler');

const getUserList = async (filter, options, userId) => {
  const { sortBy, limit = 10, page = 1 } = options;
  const offset = limit * (page - 1);

  const query = {
    ...filter,
    _id: { $ne: userId },
    status: { $ne: 'deleted' },
  };

  const users = await User.find(query)
    .sort({ created_at: 'desc' })
    .limit(limit)
    .skip(offset)
    .lean();

  const totalCount = await User.countDocuments(query);
  const totalPages = Math.ceil(totalCount / limit);

  return {
    results: users,
    totalCount,
    totalPages,
  };
};

const getAdminById = async (userId) => {
  try {
    return await User.findOne({
      _id: userId,
      role: { $in: ['ADMIN'] },
      status: { $ne: 'deleted' },
    }).lean();
  } catch (error) {
    console.error('Error retrieving user by ID:', error);
    throw error;
  }
};

const getAdminByEmail = async (email) => {
  try {
    return await User.findOne({
      role: 'ADMIN',
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

const updateUserById = async (updateBody) => {
  try {
    const userData = await getUserById(updateBody.userId);
    if (!userData) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    await User.updateOne({ _id: updateBody.userId }, { $set: updateBody });
    const updateData = await getUserById(updateBody.userId);
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

const deleteUserById = async (userId) => {
  try {
    const userData = await getUserById(userId);
    if (!userData) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    const deleteUser = await User.updateOne(
      { _id: userId },
      { $set: { status: 'deleted' } }
    );

    return deleteUser;
  } catch (error) {
    // Handle any errors that occurred during the database operation
    console.error('Error deleting user by ID:', error);
    return {
      error: true,
      message: error.message,
      status: error.status,
    };
  }
};
const validateAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    const userInfo = await User.findOne({
      userId: user.userId,
      role: 'ADMIN',
      status: { $ne: 'deleted' },
    });
    if (!userInfo) {
      throw { message: MESSAGES.ADMIN.UNAUTHRIZED };
    }
    return next();
  } catch (error) {
    return ResponseHelper.error(res, httpStatus.UNAUTHORIZED, {
      message: MESSAGES.ADMIN.FAILURE,
      error: true,
      status: httpStatus.UNAUTHORIZED,
    });
  }
};
const getUserById = async (userId) => {
  try {
    const user = await User.findOne({
      _id: userId,
      status: { $ne: 'deleted' },
    }).lean();

    return user;
  } catch (error) {
    // Handle any errors that occurred during the database operation
    console.error('Error retrieving user by ID:', error);
    return {
      error: true,
      message: error.message,
      status: error.status,
    };
  }
};
const updateAdminById = async (userId, updateBody) => {
  try {
    const userData = await getAdminById(userId);
    if (!userData) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    await User.updateOne({ _id: userId }, { $set: updateBody });

    const updateData = await getAdminById(userId);
    return updateData;
  } catch (error) {
    // Handle any errors that occurred during the database operation
    console.error('Error updating admin by ID:', error);
    return {
      error: true,
      message: error.message,
      status: error.status,
    };
  }
};

const updateAdminByEmail = async (email, updateBody) => {
  try {
    const updateUser = await User.updateOne(
      { email: email },
      { $set: updateBody }
    );
    console.log(updateUser, 'updateUser');
    return updateUser;
  } catch (error) {
    // Handle any errors that occurred during the database operation
    console.error('Error updating admin by email:', error);
    return {
      error: true,
      message: error.message,
      status: error.status,
    };
  }
};

const getJobList = async (filter, options) => {
  const { sortBy, limit = 10, page = 1 } = options;
  const offset = limit * (page - 1);

  const query = {
    ...filter,
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
const getApplicationList = async (filter, options) => {
  const { sortBy, limit = 10, page = 1 } = options;
  const offset = limit * (page - 1);

  const query = {
    ...filter,
  };
  const applications = await Application.find(query)
    .populate('seeker_id', 'username email')
    .populate('job_id', 'title description location salary')
    .sort({ created_at: 'desc' })
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

const updateJob = async (id, data) => {
  try {
    const updateJob = await Jobs.updateOne({ _id: id }, { $set: data });

    return updateJob;
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
    const result = await Jobs.deleteOne({
      _id: data.id,
    });

    if (result.deletedCount === 0) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
    }

    return result;
  } catch (error) {
    console.error('Error deleting Job:', error);
    return {
      error: true,
      message: error.message,
      status: error.status,
    };
  }
};
module.exports = {
  getUserList,
  getAdminById,
  getAdminByEmail,
  updateUserById,
  deleteUserById,
  validateAdmin,
  getUserById,
  updateAdminById,
  updateAdminByEmail,
  getJobList,
  getApplicationList,
  updateJob,
  removeJob,
};
