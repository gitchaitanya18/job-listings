"use strict";

const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

const createSeeker = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    username: Joi.string().required(),
    role: Joi.string().required().valid("JOB_SEEKER"),
  }),
};

const getJobs = {
  body: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    search: Joi.string(),
  }),
};
const getJob = {
  params: Joi.object().keys({
    id: Joi.string().required(),
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

const updateSeekerProfile = {
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      userName: Joi.string(),
      password: Joi.string().custom(password),
    })
    .min(1),
};
const applyJob = {
  body: Joi.object().keys({
    job_id: Joi.string().required(),
  }),
};

module.exports = {
  createSeeker,
  updateSeekerProfile,
  getApplications,
  getApplication,
  getJobs,
  getJob,
  applyJob,
};
