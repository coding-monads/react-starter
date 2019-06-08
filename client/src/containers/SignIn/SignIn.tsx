import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import SignInForm from "./SignInForm/SignInForm";
import MadeWithLove from "../../components/MadeWithLove/MadeWithLove";
import TextLink from "../../components/TextLink/TextLink";
import Container from "../../components/Container/Container";
import { IconAvatarLock } from "../../components/AvatarIcon/AvatarIcon";
import TextHeading from "../../components/TextHeading/TextHeading";
import { loginUser } from "../../store/actions/authActions";
import { Store } from "../../store/reducers";

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

interface SignInProps {
  loginUser: (loginData: Values) => void;
  errors: [{ msg: string }] | null;
}

const SignIn: React.SFC<SignInProps> = ({ loginUser, errors }) => (
  <Container maxWidth="xs">
    <IconAvatarLock color="pink" />
    <TextHeading variant="h5">Sign In</TextHeading>
    <SignInForm errors={errors} onSubmit={loginData => loginUser(loginData)} />
    <LinksWrapper>
      <TextLink to="/">Forgot password?</TextLink>
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
  { loginUser }
)(SignIn);
