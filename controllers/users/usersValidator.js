const { body } = require("express-validator/check");
const { REGISTER_USER, LOGIN_USER, UPDATE_USER } = require("./methods");
const messages = require("../messages");

exports.validate = method => {
  switch (method) {
    case REGISTER_USER: {
      return [
        body("firstName", "First name field is required")
          .not()
          .isEmpty(),
        body(
          "firstName",
          "Please enter a first name between 2 and 30 characters"
        ).isLength({
          min: 2,
          max: 30
        }),
        body("lastName", "Last name field is required")
          .not()
          .isEmpty(),
        body(
          "lastName",
          "Please enter a last name between 2 and 30 characters"
        ).isLength({
          min: 2,
          max: 30
        }),
        body("email", "Email field is required")
          .not()
          .isEmpty(),
        body("email", "Please enter a valid email").isEmail(),
        body("password", "Password field is required")
          .not()
          .isEmpty(),
        body(
          "password",
          "Please enter a password with 6 or more characters"
        ).isLength({ min: 6 })
      ];
    }
    case LOGIN_USER: {
      return [
        body("email", messages.EMAIL_IS_REQUIRED)
          .not()
          .isEmpty(),
        body("email", messages.PLEASE_ENTER_A_VALID_EMAIL).isEmail(),
        body("password", messages.PASSWORD_IS_REQUIRED)
          .not()
          .isEmpty()
      ];
    }
    case UPDATE_USER: {
      return [
        body(
            "firstName",
            "Please enter a first name between 2 and 30 characters"
        ).optional().isLength({
          min: 2,
          max: 30
        }),
        body(
            "lastName",
            "Please enter a last name between 2 and 30 characters"
        ).optional().isLength({
          min: 2,
          max: 30
        }),
        body("email", "Please enter a valid email").optional().isEmail(),
        body("password", "Please enter a password with 6 or more characters")
            .optional().isLength({ min: 6 })
      ]
    }
  }
};
