'use strict';

const Joi = require('joi');
const { password } = require('./custom.validation');

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const getUsers = {
  body: Joi.object().keys({
    username: Joi.string(),
    role: Joi.string().valid('JOB_SEEKER', 'EMPLOYER'),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};
const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};
const updateUser = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      username: Joi.string(),
      password: Joi.string().custom(password),
      role: Joi.string().valid('JOB_SEEKER', 'EMPLOYER'),
      status: Joi.string().valid('blocked', 'active', 'inactive', 'requested'),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.required().required(),
  }),
};
const getJobs = {
  body: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};
const getJob = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
const removeJob = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
const updateJob = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string(),
      location: Joi.string(),
      salary: Joi.number(),
      status: Joi.string().valid('active', 'inactive'),
    })
    .min(1),
};
const getApplications = {
  body: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};
module.exports = {
  login,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getJobs,
  getJob,
  removeJob,
  updateJob,
  getApplications,
};
