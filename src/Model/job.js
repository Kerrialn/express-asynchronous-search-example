const mongoose = require("mongoose");
const validator = require("validator");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    employer: {
      type: String,
      required: true
    },
    email:{
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("A valid E-mail address is required");
        }
      },
    },
    description: {
      type: String,
      required: true
    },
    requirements: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
)

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
