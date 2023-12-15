'use strict';

const express = require('express');
const seekerRoute = require('./seeker.route');
const employerRoute = require('./employer.route');
const adminRoute = require('./admin.route');
const router = express.Router();

const defaultRoutes = [
  {
    path: '/admin',
    route: adminRoute,
  },
  {
    path: '/seeker',
    route: seekerRoute,
  },
  {
    path: '/employer',
    route: employerRoute,
  },
];
// Register default routes
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
