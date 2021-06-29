import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, withRouter } from "react-router-dom";
import {
  Button,
  Grid,
  Box,
  Paper,
  Container,
  Typography,
  InputLabel, Select, MenuItem,FormControl,TextField
} from "@material-ui/core";
import firebase from "../../firebaseHandler";
import GiveAttendanceToolbar from "./GiveAttendanceToolbar";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
const db = firebase.firestore();

const allStatus = [
  "Present",
  "Absent",
  "Leave",
]
const AttendanceDialog = (props) => {
  const { history } = props;
  const user = useSelector((state) => state.auth.userData);
  const location = useLocation();
  const params = location.state;
  const edit = params.edit;
  console.log(edit);
  const [inTime, setInTime] = useState("");
  const [outTime, setOutTime] = useState("");
  const [status, setStatus] = useState("");

  var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date()).toDate();
  var today = myTimestamp;
  console.log(today);
  const date =
    today.getDate() + "-" + today.getMonth() + "-" + today.getFullYear();
  const newDate = date.toString();

  const staff = params.staffDetails;

  const time = moment().format("LT");
  console.log(time);

  const handleInTime = () => {
    setInTime(time);
    toast.info("Out Time for " + " " + staff.firstname + " " + ":" + " " + time)
  };
  const handleOutTime = () => {
    setOutTime(time);
    toast.info("Out Time for " + " " + staff.firstname + " " + ":" + " " + time)
  };
  const handleSetStatus = (event) => {
    setStatus(event.target.value);
    toast.info("Status for " + " " + staff.firstname + " " + ":" + " " + event.target.value)
  };


  const handleInAttendance = () => {
    const toAdd = {
      uid: user.uid,
      adminDept: user.department,
      firstname: staff.firstname,
      lastname: staff.lastname,
      dept: staff.department,
      role: staff.role,
      inTime,
      outTime,
      status,
      datePosted: newDate,
    };
    if(!status){
      toast.error("Status not set");
    }else{
      db.collection("attendance")
      .add(toAdd)
      .then(() => {
        toast.success("Set In Time Successful");
        history.push("/attendance");
      })
      .catch((error) => {
        console.log("Course Add Failure", error);
      });
    }
  };
  console.log(staff);

  const handleOutAttendance = () => {
    const toUpdate = {
      outTime,
    };
    db.collection("attendance")
      .doc(staff.id)
      .update(toUpdate)
      .then(() => {
        toast.success("Set Out Time Successful");
        history.push("/attendance");
      })
      .catch((error) => {
        console.log("Course Add Failure", error);
      });
  };

  console.log("this is attendance");
  return (
    <Box style={{ marginTop: "30px" }}>
      <Container maxWidth={false}>
        <GiveAttendanceToolbar />
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "30px",
            height: "400px",
          }}
        >
          <Paper
            style={{
              borderRadius: "16px",
              boxShadow:
                "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px",
              width: "750px",
              padding: " 30px 0px 0px 0px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid
                    item
                    xs
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h4"
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "600",
                        fontSize: "40px",
                        letterSpacing: "8px",
                      }}
                    >
                      {staff.firstname} {staff.lastname}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "700",
                        fontSize: "20px",
                        letterSpacing: "5px",
                      }}
                    >
                      {staff.role}
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{
                        fontSize: "25px",
                        textTransform: "uppercase",
                        letterSpacing: "3px",
                      }}
                    >
                      <span style={{ fontSize: "20px" }}>Working at </span>
                      {user.department}
                      <span style={{ fontSize: "20px" }}> Department</span>
                    </Typography>
                    <Typography
                      variant="body2"
                      gutterBottom
                      style={{
                        fontSize: "20px",
                        textTransform: "uppercase",
                        fontWeight: "600",
                        letterSpacing: "2px",
                      }}
                    >
                      Tezpur University
                    </Typography>
                  </Grid>
                </Grid>

                {edit ? (
                  <Grid
                    container
                    item
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                    style={{
                      marginTop:'20px',
                    }}
                  >
                    <Grid item >
                      <Button
                      color="primary"
                      variant="contained"
                      disabled
                      onClick={handleInTime}
                      style={{
                        padding: "10px 20px",
                        borderRadius: "8px",
                      }}
                    >
                      IN TIME
                    </Button>
                    </Grid>
                    <Grid item xs={3} >
                       <TextField
                        id="outlined-select-currency"
                        select
                        label="Status"
                        value={status}
                        onChange={handleSetStatus}
                        // helperText="Please select your currency"
                        variant="outlined"
                        fullWidth
                        disabled
                        
                      >
                        {allStatus.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item > 
                    <Button
                      onClick={handleOutTime}
                      color="primary"
                      variant="contained"
                      style={{
                        padding: "10px 20px",
                        borderRadius: "8px",
                      }}
                    >
                      OUT TIME
                    </Button>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid
                    container
                    item
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                    style={{
                      marginTop:'20px',
                    }}
                  >
                    <Grid item >
                      <Button
                      color="primary"
                      variant="contained"
                      onClick={handleInTime}
                      style={{
                        padding: "10px 20px",
                        borderRadius: "8px",
                      }}
                    >
                      IN TIME
                    </Button>
                    </Grid>
                    <Grid item xs={3} >
                       <TextField
                        id="outlined-select-currency"
                        select
                        label="Status"
                        value={status}
                        onChange={handleSetStatus}
                        // helperText="Please select your currency"
                        variant="outlined"
                        fullWidth
                
                      >
                        {allStatus.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item > 
                    <Button
                      onClick={handleOutTime}
                      color="primary"
                      variant="contained"
                      disabled
                      style={{
                        padding: "10px 20px",
                        borderRadius: "8px",
                      }}
                    >
                      OUT TIME
                    </Button>
                    </Grid>
                  </Grid>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingBottom: "50px",
                  paddingTop: "20px",
                }}
              >
                {edit ? (
                  <Button color="primary" variant="contained" onClick={handleOutAttendance}>
                    Give Attendance
                  </Button>
                ) : (
                  <Button color="primary" variant="contained" onClick={handleInAttendance}>
                    Give Attendance
                  </Button>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default withRouter(AttendanceDialog);
