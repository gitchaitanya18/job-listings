'use strict';

const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createEmployer = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    username: Joi.string().required(),
    role: Joi.string().required().valid('EMPLOYER'),
  }),
};

const getSeekers = {
  body: Joi.object().keys({
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
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
const getSeeker = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};
const getApplications = {
  body: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};
const getApplication = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const updateEmployerProfile = {
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      userName: Joi.string(),
      password: Joi.string().custom(password),
    })
    .min(1),
};
const updateJob = {
  body: Joi.object()
    .keys({
      id: Joi.string().required(),
      title: Joi.string(),
      description: Joi.string(),
      location: Joi.string(),
      salary: Joi.number(),
      status: Joi.string().valid('active', 'inactive'),
    })
    .min(1),
};
const updateApplication = {
  body: Joi.object().keys({
    job_id: Joi.string().required(),
    userId: Joi.string().required(),
    status: Joi.string().valid("accepted", "pending", "rejected"),
  }),
};
const createJob = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    salary: Joi.number().required(),
  }),
};
const removeJob = {
  body: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
module.exports = {
  createEmployer,
  getSeekers,
  getSeeker,
  updateEmployerProfile,
  updateApplication,
  createJob,
  updateJob,
  getApplications,
  getApplication,
  getJobs,
  getJob,
  removeJob
};
