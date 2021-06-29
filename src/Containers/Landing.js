import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Paper,Grid,Box,Typography } from "@material-ui/core";
import firebase from "../firebaseHandler";
import Logo from "../logo/logo.png"
import Landingimg from "../logo/landing.svg"
import { Alert, AlertTitle } from '@material-ui/lab';
import InfoIcon from '@material-ui/icons/Info';

let redirect = <Redirect to="dashboard" />;


const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      return true;
    },
    signInFailure: function (error) {
    },

  },
  queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
  signInFlow: 'popup',
  signInSuccessUrl: window.location.hostname === "localhost" ? '/sms' : '/',//Specifying sign in success url can cause double redirect since we are also managing redirect in react-router with local state.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,

  ],

}



const Landing = () => {
  const loggedin = useSelector((state) => state.auth.loggedin);
  return (
    <div>
      {(loggedin ? redirect :
        <React.Fragment>
          <Grid container>
            <Grid item xs={12} sm={6} style={{padding:'30px 30px 0px 30px'}}>
              <Paper style={{padding:'30px',width:'500px',borderRadius: "16px",boxShadow: "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px"}}>
                <Box style={{display:'flex',alignItems:'center'}}>
                  <img src={Logo} style={{width:'70px'}} alt="logo"/>
                  <Typography style={{fontFamily: 'Comfortaa',fontWeight:'700',fontSize:'30px', paddingLeft:'5px',color:'#00ab55'}}>montero</Typography>
                </Box>
                <Box style={{padding:'80px 0px 0px 10px'}}>
                  <Typography variant="h4" style={{fontWeight:'700'}}>Hi! Welcome</Typography>
                </Box>
                <Box style={{ padding:'100px 0px 20px 00px'}}>
                <img src={Landingimg} style={{width:"100%"}} alt="illustration"/>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} style={{padding:'0px 30px 0px 10px',display:'flex',alignItems:'center'}}>
              <Paper elevation={0} > 
                <Box style={{padding:'20px 40px 0px 40px'}}>
                  <Typography variant="h5" style={{fontWeight:'500'}}>Sign in to Montero</Typography>
                </Box>
                <Box style={{padding:'20px 30px 20px 30px'}}>
                <Alert icon={<InfoIcon fontSize="inherit" /> } severity="success" style={{borderRadius:'16px'}}>
                  <AlertTitle>For Supervisor Account</AlertTitle>
                  Use email : <strong>supervisor@gmail.com</strong> / password : <strong>qwerty</strong>
                </Alert>
                <Alert icon={<InfoIcon fontSize="inherit" />} severity="success" style={{marginTop:'10px',borderRadius:'16px'}}>
                  <AlertTitle>For CSE Admin Account</AlertTitle>
                  Use email : <strong>cse@gmail.com</strong> / password : <strong>qwerty</strong>
                </Alert>
                </Box>
                <Box>
                   <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
                </Box>
                  
                
              </Paper>
            </Grid>
          </Grid>
          <div>
            
          </div>
        </React.Fragment>
      )}
    </div>

  );
}
export default Landing;