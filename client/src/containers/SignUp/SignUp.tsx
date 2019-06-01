import React from 'react';
import styled from 'styled-components';
import SignUpForm from './SignUpForm/SignUpForm';
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

const SignUp = () => (
  <Container maxWidth="xs">
    <IconAvatarLock color="pink" />
    <TextHeading variant="h5">Sign Up</TextHeading>
    <SignUpForm onSubmit={values => console.log(values)} />
    <LinksWrapper>
      <TextLink to="/">Already have an account? Sign In</TextLink>
    </LinksWrapper>
    <MadeWithLove />
  </Container>
);

export default SignUp;
