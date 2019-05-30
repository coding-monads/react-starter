import React from 'react'
import SignInForm from './SignInForm/SignInForm'
import Grid from "@material-ui/core/Grid";

const SignIn = () => {
  return (
    <Grid
    container
    direction="column"
    alignItems="center"
    justify="center"
    style={{ minHeight: "100vh" }}
  >
      <SignInForm onSubmit={(values) => console.log(values)}/>
    </Grid>
  )
}

export default SignIn
