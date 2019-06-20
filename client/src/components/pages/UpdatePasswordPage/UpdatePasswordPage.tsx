import React, { FC } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import MadeWithLove from "../../../components/atoms/MadeWithLove/MadeWithLove";
import TextLink from "../../../components/atoms/TextLink/TextLink";
import Container from "../../../components/atoms/Container/Container";
import { IconAvatarLock } from "../../../components/atoms/AvatarIcon/AvatarIcon";
import TextHeading from "../../../components/atoms/TextHeading/TextHeading";
import { addAlert, CanAddAlert } from "../../../store/actions/alertActions";

import UpdatePasswordForm from "../../forms/UpdatePasswordForm/UpdatePasswordForm";

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
      <UpdatePasswordForm token={match.params.token} addAlert={addAlert}
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
