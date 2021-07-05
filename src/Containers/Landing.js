import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Paper, Grid, Box, Typography } from "@material-ui/core";
import firebase from "../firebaseHandler";


let redirect = <Redirect to="resource" />;

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      return true;
    },
    signInFailure: function (error) {},
  },
  queryParameterForSignInSuccessUrl: "signInSuccessUrl",
  signInFlow: "popup",
  signInSuccessUrl: window.location.hostname === "localhost" ? "/rms" : "/", //Specifying sign in success url can cause double redirect since we are also managing redirect in react-router with local state.
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
};

const Landing = () => {
  const loggedin = useSelector((state) => state.auth.loggedin);
  return (
    <div>
      {loggedin ? (
        redirect
      ) : (
        <React.Fragment>
          <Grid container>
            <Grid
              item
              xs={12}
              style={{
                padding: "0px 30px 0px 10px",
                display: "flex",
                alignItems: "center",
                justifyContent:'center',
                flexDirection:'column',
                height:'80vh'
              }}
            > <Box style={{ padding: "20px 40px 0px 40px",display:'flex',alignItems:'center',flexDirection:'column',top:'30px',position:'fixed' }}>
                  <Typography variant="h3" style={{ fontWeight: "500" }}>
                    Welcome to Resource Management Software
                  </Typography>
                  <Typography variant="h4" style={{ fontWeight: "500" }}>
                    For CSE Dept
                  </Typography>
                </Box>

              <Paper elevation={0} style={{width:'400px',marginTop:'60px',textAlign:'center'}}>
              
                <Box style={{ padding: "20px 40px 0px 40px" }}>
                  <Typography variant="h5" style={{ fontWeight: "500",marginBottom:'20px' }}>
                    Sign in to RMS
                  </Typography>
                </Box>
                <Box>
                  <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <div></div>
        </React.Fragment>
      )}
    </div>
  );
};
export default Landing;
