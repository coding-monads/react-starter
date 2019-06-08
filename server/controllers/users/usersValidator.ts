import { body } from "express-validator/check";

import { userMethods, REGISTER_USER, LOGIN_USER, UPDATE_USER } from "./methods";
import messages from "../messages";

export = (method: userMethods) => {
  switch (method) {
    case REGISTER_USER: {
      return [
        body("firstName", messages.FIRST_NAME_REQUIRED)
          .not()
          .isEmpty(),
        body("firstName", messages.FIRST_NAME_SPECIFIC_LENGTH).isLength({
          min: 2,
          max: 30
        }),
        body("lastName", messages.LAST_NAME_REQUIRED)
          .not()
          .isEmpty(),
        body("lastName", messages.LAST_NAME_SPECIFIC_LENGTH).isLength({
          min: 2,
          max: 30
        }),
        body("email", messages.EMAIL_IS_REQUIRED)
          .not()
          .isEmpty(),
        body("email", messages.PLEASE_ENTER_A_VALID_EMAIL).isEmail(),
        body("password", messages.PASSWORD_IS_REQUIRED)
          .not()
          .isEmpty(),
        body("password", messages.PASSWORD_SPECIFIC_LENGTH).isLength({ min: 6 })
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
        body("firstName", messages.FIRST_NAME_SPECIFIC_LENGTH)
          .optional()
          .isLength({ min: 2, max: 30 }),
        body("lastName", messages.LAST_NAME_SPECIFIC_LENGTH)
          .optional()
          .isLength({ min: 2, max: 30 }),
        body("email", messages.PLEASE_ENTER_A_VALID_EMAIL)
          .optional()
          .isEmail(),
        body("password", messages.PASSWORD_SPECIFIC_LENGTH)
          .optional()
          .isLength({ min: 6 })
      ];
    }
  }
};
