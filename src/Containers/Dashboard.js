import React, { useEffect, useState } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { Typography, Grid, Paper } from "@material-ui/core";
import { useSelector } from "react-redux";
import firebase from "../firebaseHandler";
import Basic from "../Components/charts/Basic";
import Line from "../Components/charts/Line";
import moment from "moment";
const Moment = require('moment')
const db = firebase.firestore();

const Dashboard = (props) => {
  const user = useSelector((state) => state.auth.userData);
  const loggedin = useSelector((state) => state.auth.loggedin);
  // const [orgcourses, setOrgCourses] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [attendances, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);

  // const handleSearch = (e) => {
  //   let query = e.target.value;
  //   console.log("Search Courses Value", query);
  //   if (query != "") {
  //     query = query.toLowerCase();
  //     let result = courses.filter(
  //       (item) =>
  //         (
  //           item.name +
  //           item.courseCode +
  //           item.instructorName +
  //           item.instructorEmail
  //         )
  //           .toLowerCase()
  //           .indexOf(query) > -1
  //     );
  //     console.log("Result is", result);
  //     setCourses(result);
  //   } else {
  //     setCourses(orgcourses);
  //   }
  // };

  const getAllStaffs = () => {
    db.collection("staffs")
      .get()
      .then((querySnapshot) => {
        let staffs = [];
        querySnapshot.forEach((doc) => {
          staffs.push(doc.data());
        });
        // setOrgCourses(staffs);
        setStaffs(staffs);
      });
  };

  var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date()).toDate();
  var today = myTimestamp;
  const date =
    today.getDate() + "-" + today.getMonth() + "-" + today.getFullYear();
  const newDate = date.toString();

  const getAttendanceAdded = () => {
    db.collection("attendance")
      .get()
      .then((querySnapshot) => {
        let attendance = [];
        querySnapshot.forEach((doc) => {
          let obj = doc.data();
          attendance.push(obj);
        });
        setAttendance(attendance);
      })
      .catch((error) => {
        console.log("Error getting added feedback: ", error);
      });
  };

  useEffect(() => {
    getAllStaffs();
    getAttendanceAdded();
  },[]);

  var female = staffs.filter((x) => x.gender === "Female");
  var male = staffs.filter((x) => x.gender === "Male");
  var cse = staffs.filter((x) => x.department === "CSE");
  var civil = staffs.filter((x) => x.department === "Civil");
  var ece = staffs.filter((x) => x.department === "ECE");
  var mecha = staffs.filter((x) => x.department === "Mechanical");

  var staffLength = staffs.length;
  var femaleLength = Math.round((female.length / staffLength) * 100);
  var maleLength = Math.round((male.length / staffLength) * 100);

  var findDate = [];
  attendances.forEach((item) => {
    findDate.push(item.datePosted)
  })
  console.log(findDate)
  
  // remove duplicate dates in array
  function removeDuplicate(data) {
    return [...new Set(data)];
  }
  var mapDate = removeDuplicate(findDate);
  console.log(mapDate)

  // sort date
  var sortdate = mapDate.sort(function(a, b){
    var aa = a.split('-').reverse().join(),
        bb = b.split('-').reverse().join();
    return aa < bb ? -1 : (aa > bb ? 1 : 0);
});

console.log(sortdate)
  
  
  

  // var fun = "03-11-2014";
  // var newdate = fun.split("-").reverse().join("-");
  
  let newtrydate = [];// total present staff in particular date
  sortdate.forEach(function (doc, i) {
    var newdate = doc.split("-").reverse().join("-");
    newtrydate.push(newdate);
  });
  
  // total present staff
  var present = attendances.filter((x) => x.status === "Present");
// console.log(present)


  let newpresent = [];// total present staff in particular date
  sortdate.forEach(function (doc, i) {
    var setpresent = present.filter((x) => x.datePosted === doc);
    newpresent.push(setpresent.length);
  });


  // total absent staff
  var absent = attendances.filter((x) => x.status === "Absent");
  let newabsent = [];// total absent staff in particular date
  sortdate.forEach(function (doc, i) {
    var setabsent = absent.filter((x) => x.datePosted === doc);
    newabsent.push(setabsent.length);
  });


  // total leave staff
  var leave = attendances.filter((x) => x.status === "Leave");
  let newleave = [];// total leave staff in particular date
  sortdate.forEach(function (doc, i) {
    var setleave = leave.filter((x) => x.datePosted === doc);
    newleave.push(setleave.length);
  });


  useEffect(() => {
    if (!loggedin) {
      props.history.push("/");
    }
  },[]);

  return (
    <div
      style={{
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 40,
      }}
    >
      {user && user.userType === "Supervisor" ? (
        <div>
          <Grid xs={12} container spacing={3}>
            <Typography
              variant="h4"
              style={{ width: "100%", padding: "20px 0px 20px 10px" }}
            >
              Welcome {user.username}
            </Typography>
            <Grid item xs={6} sm={3}>
              <Paper
                style={{
                  padding: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  borderRadius: "16px",
                  boxShadow:
                    "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px",
                }}
              >
                <Typography
                  variant="body1"
                  style={{ fontWeight: "500", marginBottom: "20px" }}
                >
                  Total CSE Staff
                </Typography>
                <Typography variant="h4" style={{ fontWeight: "700" }}>
                  {cse.length}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper
                style={{
                  padding: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  borderRadius: "16px",
                  boxShadow:
                    "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px",
                }}
              >
                <Typography
                  variant="body1"
                  style={{ fontWeight: "500", marginBottom: "20px" }}
                >
                  Total Civil Staff
                </Typography>
                <Typography variant="h4" style={{ fontWeight: "700" }}>
                  {civil.length}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper
                style={{
                  padding: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  borderRadius: "16px",
                  boxShadow:
                    "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px",
                }}
              >
                <Typography
                  variant="body1"
                  style={{ fontWeight: "500", marginBottom: "20px" }}
                >
                  Total ECE Staff
                </Typography>
                <Typography variant="h4" style={{ fontWeight: "700" }}>
                  {ece.length}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper
                style={{
                  padding: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  borderRadius: "16px",
                  boxShadow:
                    "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px",
                }}
              >
                <Typography
                  variant="body1"
                  style={{ fontWeight: "500", marginBottom: "20px" }}
                >
                  Total Mecha Staff
                </Typography>
                <Typography variant="h4" style={{ fontWeight: "700" }}>
                  {mecha.length}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Grid container xs={12} spacing={3} >
            <Grid item xs={3}>
              <Paper
                  style={{
                    padding: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    borderRadius: "16px",
                    boxShadow:
                    "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px",
                  }}
                  >
                  <h2>Staffs by Gender</h2>
                  {staffLength && maleLength && femaleLength ?
                  <Basic
                    female={femaleLength}
                    male={maleLength}
                    staff={staffLength}
                    />
                    :
                    <h3>Data Loading ...</h3>
                    }
                </Paper>
            </Grid>
            <Grid item xs={9}>
              <Paper
                  style={{
                    padding: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    borderRadius: "16px",
                    boxShadow:
                      "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px",
                  }}
                >
                  <h2>Attendances by Date</h2>
                  {sortdate && newpresent && newabsent && newleave ? 
                  <Line newtrydate={sortdate} newpresent={newpresent} newabsent={newabsent} newleave={newleave}/>
                  : 
                  <h3>Data Loading ...</h3>
                  }
                  
                </Paper>
            </Grid>
                
              
                
          </Grid>
        </div>
      ) : (
        <Redirect to="/staff" />
      )}
    </div>
  );
};
export default withRouter(Dashboard);
