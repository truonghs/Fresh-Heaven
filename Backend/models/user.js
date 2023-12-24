const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  paymentMethod: {
    type: String,
    default: "",
  },
  addresses: [
    // location: {
    //   type: String,
    //   default: '',
    // },
  ],
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  otp: {
    otp: String,
    expireAt: Date,
  },
  verificationToken: String,
  passwordToken: {
    passwordToken: String,
    expireAt: Date,
  },

  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  firstTime: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("User", userSchema);
