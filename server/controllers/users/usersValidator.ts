import { body } from "express-validator/check";
import {
  userMethods,
  REGISTER_USER,
  LOGIN_USER,
  UPDATE_USER,
  ADD_USER,
  RESET_PASSWORD,
  UPDATE_PASSWORD
} from "./methods";
import messages from "../messages";
import roles from "../adminRoles";

export const validate = (method: userMethods) => {
  switch (method) {
    case REGISTER_USER:
    case ADD_USER: {
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
        body("password", messages.PASSWORD_SPECIFIC_LENGTH).isLength({
          min: 6
        }),
        body("emailVerified", messages.MUST_BE_BOOLEAN)
          .optional()
          .isBoolean(),
        body("roles", messages.MUST_MATCH_PATTERN)
          .optional()
          .equals(roles.ADMIN)
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
          .isLength({ min: 6 }),
        body("emailVerified", messages.MUST_BE_BOOLEAN)
          .optional()
          .isBoolean(),
        body("roles", messages.MUST_MATCH_PATTERN)
          .optional()
          .equals(roles.ADMIN)
      ];
    }
    case RESET_PASSWORD: {
      return [
        body("email", messages.EMAIL_IS_REQUIRED)
          .not()
          .isEmpty(),
        body("email", messages.PLEASE_ENTER_A_VALID_EMAIL).isEmail()
      ];
    }
    case UPDATE_PASSWORD: {
      return [
        body("token", messages.TOKEN_REQUIRED)
          .not()
          .isEmpty(),
        body("password", messages.PASSWORD_IS_REQUIRED)
          .not()
          .isEmpty(),
        body("password", messages.PASSWORD_SPECIFIC_LENGTH).isLength({
          min: 6
        }),
        body("passwordConfirm", messages.PASSWORD_IS_REQUIRED)
          .not()
          .isEmpty(),
        body("passwordConfirm", messages.PASSWORD_SPECIFIC_LENGTH).isLength({
          min: 6
        }),
        body("password", "invalid password")
          .isLength({ min: 4 })
          .custom((value, { req }) => {
            if (value !== req.body.passwordConfirm) {
              throw new Error("Passwords don't match");
            } else {
              return value;
            }
          })
      ];
    }
  }
};
