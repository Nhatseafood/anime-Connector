const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateHighlightInput(data) {
  let errors = {};

  data.caption = !isEmpty(data.caption) ? data.caption : "";

  data.selectedImage = !isEmpty(data.selectedImage) ? data.selectedImage : "";

  if (Validator.isEmpty(data.caption)) {
    errors.caption = "field of caption is required";
  }

  if (Validator.isEmpty(data.selectedImage)) {
    errors.selectedImage = "selected Image is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
