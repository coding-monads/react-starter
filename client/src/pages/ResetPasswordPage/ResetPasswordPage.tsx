import React, { FC } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { MadeWithLove, TextLink, Container, AvatarIcon, TextHeading } from '../../components';
import { ResetPasswordForm } from '../../forms';
import { addAlert, CanAddAlert } from '../../store/actions/alertActions';

const LinksWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ResetPasswordPage: FC<CanAddAlert> = ({ addAlert }) => (
  <Container maxWidth='xs'>
    <AvatarIcon color='pink' />
    <TextHeading variant='h5'>Reset Password</TextHeading>
    <ResetPasswordForm addAlert={addAlert} />
    <LinksWrapper>
      <TextLink to='/login'>Already have an account? Sign In</TextLink>
      <TextLink to='/register'>Don&apos;t have an account? Sign Up</TextLink>
    </LinksWrapper>
    <MadeWithLove />
  </Container>
);

export default connect(
  null,
  { addAlert }
)(ResetPasswordPage);
