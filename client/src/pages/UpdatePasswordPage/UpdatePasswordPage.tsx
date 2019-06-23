import React, { FC } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { MadeWithLove, TextLink, Container, AvatarIcon, TextHeading } from '../../components';
import { UpdatePasswordForm } from '../../forms';
import { addAlert, CanAddAlert } from '../../store/actions/alertActions';

const LinksWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

interface UpdatePasswordPageParams {
  match: { params: { token: string } };
}

const UpdatePasswordPage: FC<UpdatePasswordPageParams & CanAddAlert> = ({ match, addAlert }) => {
  return (
    <Container maxWidth="xs">
      <AvatarIcon color="pink" />
      <TextHeading variant="h5">Update Password</TextHeading>
      <UpdatePasswordForm token={match.params.token} addAlert={addAlert} />
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
  { addAlert },
)(UpdatePasswordPage);
