import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { MadeWithLove, TextLink, Container, AvatarIcon, TextHeading } from '../../components';
import { SignInForm } from '../../forms';
import { loginUser } from '../../store/actions/authActions';
import { Store } from '../../store/reducers';

const LinksWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

interface Values {
  email: string;
  password: string;
  remember: boolean;
}

interface SignInPageProps {
  loginUser: (loginData: Values) => void;
  errors: [{ msg: string }] | null;
}

const SignInPage: React.SFC<SignInPageProps> = ({ loginUser, errors }) => (
  <Container maxWidth="xs">
    <AvatarIcon color="pink" />
    <TextHeading variant="h5">Sign In</TextHeading>
    <SignInForm errors={errors} onSubmit={loginData => loginUser(loginData)} />
    <LinksWrapper>
      <TextLink to="/password/reset">Forgot password?</TextLink>
      <TextLink to="/register">Don&apos;t have an account? Sign Up</TextLink>
    </LinksWrapper>
    <MadeWithLove />
  </Container>
);

const mapStateToProps = (state: Store) => ({
  errors: state.auth.errors
});

export default connect(
  mapStateToProps,
  { loginUser },
)(SignInPage);
