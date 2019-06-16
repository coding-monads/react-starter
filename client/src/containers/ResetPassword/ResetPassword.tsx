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
  email: string;
}

interface OtherProps {
  message?: string;
}

const ResetPasswordForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, message } = props;
  return (
    <StyledFormikForm>
      <h1>{message}</h1>
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

      <Button type="submit" color="primary" disabled={isSubmitting}>
        Send verification email
      </Button>
    </StyledFormikForm>
  );
};

interface ResetPasswordFormProps {
  email?: string;
  message?: string;
}

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
});

const ResetPasswordFormWrapper = withFormik<
  ResetPasswordFormProps & CanAddAlert,
  FormValues
>({
  mapPropsToValues: props => {
    return {
      email: props.email || ""
    };
  },
  validationSchema: ResetPasswordSchema,
  handleSubmit: (values, bag) => {
    axios
      .post("/api/users/password/reset", values)
      .then(x => {
        bag.props.addAlert({
          message: x.data.msg,
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
})(ResetPasswordForm);

const LinksWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ResetPassword: FC<CanAddAlert> = ({ addAlert }) => (
  <Container maxWidth="xs">
    <IconAvatarLock color="pink" />
    <TextHeading variant="h5">Reset Password</TextHeading>
    <ResetPasswordFormWrapper addAlert={addAlert} />
    <LinksWrapper>
      <TextLink to="/login">Already have an account? Sign In</TextLink>
      <TextLink to="/register">Don&apos;t have an account? Sign Up</TextLink>
    </LinksWrapper>
    <MadeWithLove />
  </Container>
);

export default connect(
  () => {},
  { addAlert }
)(ResetPassword);
