import React, { FC } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import MadeWithLove from "../../components/MadeWithLove/MadeWithLove";
import TextLink from "../../components/TextLink/TextLink";
import Container from "../../components/Container/Container";
import { IconAvatarLock } from "../../components/AvatarIcon/AvatarIcon";
import TextHeading from "../../components/TextHeading/TextHeading";
import { addAlert, CanAddAlert } from "../../store/actions/alertActions";
import ResetPasswordForm from "./ResetPasswordForm";

interface ResetPasswordFormProps {
  email?: string;
  message?: string;
}

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
    <ResetPasswordForm addAlert={addAlert} />
    <LinksWrapper>
      <TextLink to="/login">Already have an account? Sign In</TextLink>
      <TextLink to="/register">Don&apos;t have an account? Sign Up</TextLink>
    </LinksWrapper>
    <MadeWithLove />
  </Container>
);

export default connect(
  null,
  { addAlert }
)(ResetPassword);
