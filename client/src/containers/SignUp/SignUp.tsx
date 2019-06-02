import React from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import SignUpForm from './SignUpForm/SignUpForm';
import MadeWithLove from '../../components/MadeWithLove/MadeWithLove';
import TextLink from '../../components/TextLink/TextLink';
import Container from '../../components/Container/Container';
import { IconAvatarLock } from '../../components/AvatarIcon/AvatarIcon';
import TextHeading from '../../components/TextHeading/TextHeading';
import { registerUser } from "../../store/actions/regsiterActions";
import { Store } from "../../store/reducers";

const LinksWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

interface SignUpProps {
  registerUser: (registerData: Values) => void;
  errors: [{ msg: string }] | null;
}

const SignUp: React.SFC<SignUpProps> = ({registerUser, errors}) => (
  <Container maxWidth="xs">
    <IconAvatarLock color="pink" />
    <TextHeading variant="h5">Sign Up</TextHeading>
    <SignUpForm serverErrors={errors} onSubmit={registerData => registerUser(registerData)} />
    <LinksWrapper>
      <TextLink to="/login">Already have an account? Sign In</TextLink>
    </LinksWrapper>
    <MadeWithLove />
  </Container>
);

const mapStateToProps = (state: Store) => ({
  errors: state.auth.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(SignUp);
