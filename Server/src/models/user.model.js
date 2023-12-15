const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: false
  },
  role: {
    type: String,
    enum: ['JOB_SEEKER', 'EMPLOYER', 'ADMIN'],
    default: "JOB_SEEKER"
  },
  status: {
    type: String,
    enum: ["blocked", "active", "inactive", "requested"],
    default: "active",
  },
  tokens: [
    {
      token: { type: String },
      type: { type: String },
      expires: { type: Date }
    },
  ],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Middleware to hash the password before saving the user document
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to compare the provided password with the saved one
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = model('users', UserSchema);

module.exports = User;