import React from "react";
import { Form, Field } from "formik";
import axios from "axios";
import Button from "../../atoms/Button/Button";
import TextField from "../../atoms/TextField/TextField";
import TextHelper from "../../atoms/TextHelper/TextHelper";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import { CanAddAlert } from "../../../store/actions/alertActions";

const StyledFormikForm = styled(Form)`
  display: grid;
  grid-gap: 15px;
  width: 100%;
  max-width: 400px;
  padding: 20px 0;
`;

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
});

const ResetPasswordForm: React.FC<CanAddAlert> = ({ addAlert }) => (
  <Formik
    validateOnBlur={false}
    validateOnChange={false}
    initialValues={{ email: "" }}
    onSubmit={values => {
      axios
        .post("/api/users/password/reset", values)
        .then(({ data }) => {
          addAlert({
            message: data.msg,
            variant: "info"
          });
        })
        .catch(({ response: { data } }) => {
          console.log(JSON.stringify(data));
          addAlert({
            message: data.errors[0].msg,
            variant: "error"
          });
        });
    }}
    validationSchema={ResetPasswordSchema}
  >
    {({ errors, touched }) => (
      <StyledFormikForm>
        <Field
          name="email"
          label="Email Address*"
          error={!!errors.email}
          outllined
          component={TextField}
        />
        {touched.email && errors.email && (
          <TextHelper error component="div">
            <p style={{ marginBottom: "5px" }}>- {errors.email}</p>
          </TextHelper>
        )}
        <Button type="submit" color="primary">
          Send verification email
        </Button>
      </StyledFormikForm>
    )}
  </Formik>
);

export default ResetPasswordForm;
