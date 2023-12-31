"use strict";

const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

// const password = (value, helpers) => {
//   if (value.length < 8) {
//     return helpers.message("password must be at least 8 characters");
//   }
//   if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
//     return helpers.message(
//       "password must contain at least 1 letter and 1 number"
//     );
//   }
//   return value;
// };

const password = (value, helpers) => {
  // Implement your password validation logic here
  // For example, you might check for minimum length, special characters, etc.
  if (!/[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+/.test(value)) {
    return helpers.error('any.invalid');
  }

  return value;
};

module.exports = {
  objectId,
  password,
};
