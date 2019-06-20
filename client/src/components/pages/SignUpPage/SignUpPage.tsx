import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import SignUpForm, { Values } from "../../forms/SignUpForm/SignUpForm";
import MadeWithLove from "../../atoms/MadeWithLove/MadeWithLove";
import TextLink from "../../atoms/TextLink/TextLink";
import Container from "../../atoms/Container/Container";
import { IconAvatarLock } from "../../atoms/AvatarIcon/AvatarIcon";
import TextHeading from "../../atoms/TextHeading/TextHeading";
import { registerUser } from "../../../store/actions/authActions";
import { Store } from "../../../store/reducers";

const LinksWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

interface SignUpPageProps {
  registerUser: (registerData: Values) => void;
}

const SignUpPage: React.SFC<SignUpPageProps> = ({ registerUser }) => (
  <Container maxWidth="xs">
    <IconAvatarLock color="pink" />
    <TextHeading variant="h5">Sign Up</TextHeading>
    <SignUpForm onSubmit={ registerUser } />
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
)(SignUpPage);
