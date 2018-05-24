const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateHighlightInput(data) {
  let errors = {};

  data.caption = !isEmpty(data.caption) ? data.caption : "";
  data.title = !isEmpty(data.title) ? data.title : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "title field is required";
  }

  if (Validator.isEmpty(data.caption)) {
    errors.caption = "field of caption is required";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "field of title is required";
  }

  if (Validator.isEmpty(data.selectedImage)) {
    errors.selectedImage = "selected Image is required";
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
