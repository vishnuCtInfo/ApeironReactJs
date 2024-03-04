import * as Yup from "yup";
import {email} from 'yup';

export const Schema_register_form = Yup.object({
  first_name: Yup.string()
    .min(3, "At least 3 characters")
    .required("* is required."),

  last_name: Yup.string()
    .min(3, "At least 3 characters")
    .required("* is required."),

  email: Yup.string().email().required("* is required."),
  phone_number: Yup.string()
    .min(10, "Invalid mobile number.")
    .max(10, "Invalid mobile number.")
    .required("* is required."),

  password: Yup.string()
    .required("* is required.")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]*$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number."
    ),
});

export const Schema_login_form = Yup.object({
  email: Yup.string().email().required("* email is required"),
  password: Yup.string().required("* password is required"),
});
