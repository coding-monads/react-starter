import React from 'react';
import styled from 'styled-components';
import SignInForm from './SignInForm/SignInForm';
import MadeWithLove from '../../components/MadeWithLove/MadeWithLove';
import TextLink from '../../components/TextLink/TextLink';
import Container from '../../components/Container/Container';
import { IconAvatarLock } from '../../components/AvatarIcon/AvatarIcon';
import TextHeading from '../../components/TextHeading/TextHeading';

const LinksWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SignIn = () => (
  <Container maxWidth="xs">
    <IconAvatarLock color="pink" />
    <TextHeading variant="h5">Sign In</TextHeading>
    <SignInForm onSubmit={values => console.log(values)} />
    <LinksWrapper>
      <TextLink to="/">Forgot password?</TextLink>
      <TextLink to="/">Don&apos;t have an account? Sign Up</TextLink>
    </LinksWrapper>
    <MadeWithLove />
  </Container>
);

export default SignIn;
