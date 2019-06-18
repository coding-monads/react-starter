import React, { FC } from "react";
import { connect } from "react-redux";
import axios from "axios";
import * as Yup from "yup";
import { withFormik, FormikProps, Form, Field } from "formik";
import styled from "styled-components";
import MadeWithLove from "../../components/MadeWithLove/MadeWithLove";
import TextHelper from "../../components/TextHelper/TextHelper";
import TextLink from "../../components/TextLink/TextLink";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import { IconAvatarLock } from "../../components/AvatarIcon/AvatarIcon";
import TextHeading from "../../components/TextHeading/TextHeading";
import { addAlert, CanAddAlert } from "../../store/actions/alertActions";

const StyledFormikForm = styled(Form)`
  display: grid;
  grid-gap: 15px;
  width: 100%;
  max-width: 400px;
  padding: 20px 0;
`;

interface FormValues {
  token: string;
  password: string;
  passwordConfirm: string;
}

interface OtherProps {
  message?: string;
}

const UpdatePasswordForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, message } = props;
  return (
    <StyledFormikForm>
      <h1>{message}</h1>

      <Field
        name="password"
        type="password"
        error={!!errors.password}
        label="Password*"
        outllined
        component={TextField}
      />
      <Field
        name="passwordConfirm"
        type="password"
        error={!!errors.passwordConfirm}
        label="Password Confirm*"
        outllined
        component={TextField}
      />
      {touched.password && errors.password && (
        <TextHelper error component="div">
          <p style={{ marginBottom: "5px" }}>- {errors.password}</p>
        </TextHelper>
      )}
      {touched.passwordConfirm && errors.passwordConfirm && (
        <TextHelper error component="div">
          <p style={{ marginBottom: "5px" }}>- {errors.passwordConfirm}</p>
        </TextHelper>
      )}
      <Button type="submit" color="primary" disabled={isSubmitting}>
        Update password
      </Button>
    </StyledFormikForm>
  );
};

interface UpdatePasswordFormProps {
  token: string;
  message?: string;
}

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password length must be at least 6 characters")
    .required("Password is required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .min(6, "Password repeat length must be at least 6 characters")
    .required("Password repeat is required")
});

const UpdatePasswordFormWrapper = withFormik<
  UpdatePasswordFormProps & CanAddAlert,
  FormValues
>({
  mapPropsToValues: props => ({
    token: props.token,
    password: "",
    passwordConfirm: ""
  }),
  validationSchema: ResetPasswordSchema,
  handleSubmit: (values, bag) => {
    axios
      .post("/api/users/password/update", values)
      .then(({ data }) => {
        bag.props.addAlert({
          message: data.msg,
          variant: "success"
        });
      })
      .catch(({ response: { data } }) => {
        console.log(JSON.stringify(data));
        bag.props.addAlert({
          message: data.errors[0].msg,
          variant: "error"
        });
      });
  }
})(UpdatePasswordForm);

const LinksWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

interface UpdatePasswordParams {
  match: { params: { token: string } };
}

const UpdatePassword: FC<UpdatePasswordParams & CanAddAlert> = ({
  match,
  addAlert
}) => {
  return (
    <Container maxWidth="xs">
      <IconAvatarLock color="pink" />
      <TextHeading variant="h5">Update Password</TextHeading>
      <UpdatePasswordFormWrapper
        token={match.params.token}
        addAlert={addAlert}
      />
      <LinksWrapper>
        <TextLink to="/login">Already have an account? Sign In</TextLink>
        <TextLink to="/register">Don&apos;t have an account? Sign Up</TextLink>
      </LinksWrapper>
      <MadeWithLove />
    </Container>
  );
};

export default connect(
  null,
  { addAlert }
)(UpdatePassword);
