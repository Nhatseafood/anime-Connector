const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCraftInput(data) {
  let errors = {};

  data.skills = !isEmpty(data.skills) ? data.skills : "";
  data.materialsUsed = !isEmpty(data.materialsUsed) ? data.materialsUsed : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills field is required";
  }

  if (Validator.isEmpty(data.materialsUsed)) {
    errors.materialsUsed = "Materials field is required";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From date field is required";
  }

  if (!Validator.isISO8601(data.from)) {
    errors.from = "Please format to YYYY-MM-DD";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
