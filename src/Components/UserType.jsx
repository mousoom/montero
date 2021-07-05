import React, { useEffect, useState } from "react";
import { Select, Button, MenuItem } from "@material-ui/core";
import firebase from "../firebaseHandler";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { saveUserData } from "../redux/actions";
import Logo from "../logo/logo.png";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";
import { toast } from "react-toastify";
import { setAuth } from "../redux/actions";
import Typography from "@material-ui/core/Typography";
const db = firebase.firestore();

const allUserTypes = ["Assistant","Professor","Maintenance"];

const UserType = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData);
  const [userType, setUserType] = useState(
    user && user.userType ? user.userType : "Assistant"
  );

  const singOutUser = () => {
    toast.success("Log Out Successful");
    firebase
      .auth()
      .signOut()
      .then(async () => {
        await localStorage.clear();
        dispatch(setAuth(false));
        dispatch(saveUserData(null));
        // history.push("/");
        window.location.reload();
      })
      .catch(function (error) {
        // An error happened.
      });
  };
  const handleUserTypeChange = () => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .set(
          {
            userType: userType,
            email: user.email,
            username: user.displayName,
          },
          { merge: true }
        )
        .then(() => {
          console.log("Changed usertype to", userType);
          let newUser = user;
          newUser.userType = userType;
          dispatch(saveUserData(newUser));
          history.push("/profile");
          window.location.reload();
        })
        .catch((err) => {
          console.log("Could not change user-type", err);
        });
    }
  };

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, []);

  return (
    <>
    { user && user.userType !== "Assistant" && user.userType !== "Admin" && user.userType !== "HOD" && user.userType !== "Professor" && user.userType !== "Maintenance" &&
    <div
      style={{
        width: "100%",
        height:'90vh',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
      }}
    >
      <div style={{width:'100%',top:0,position:'absolute',height:'90px',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
      <Typography
                  style={{
                    fontWeight: "700",
                    fontSize: "20px",
                    paddingLeft: "5px",
                    color: "rgb(106, 56, 255)",
                    paddingLeft:'20px'
                  }}
                >
                  RMS
                </Typography>
       <IconButton>
            <ExitToAppIcon onClick={singOutUser} />
        </IconButton>
      </div>

      <p style={{ fontSize: 30, marginBottom: 30 }}>Set your user type</p>
      <p style={{ fontSize: 16, marginBottom: 30 }}>Let us know you better</p>
      <Select
        labelId="userType-select-label"
        id="userType-select"
        value={userType}
        onChange={(e) => setUserType(e.target.value)}
        variant="outlined"
        style={{ width: "30%", marginBottom: 30 }}
      >
        {allUserTypes.map((val) => (
          <MenuItem value={val}>{val}</MenuItem>
        ))}
      </Select>
      <br></br>
      <Button
        style={{ width: "20%" }}
        variant="contained"
        color="primary"
        onClick={handleUserTypeChange}
      >
        Save
      </Button>
    </div>
  }
  </>
  );
};

export default withRouter(UserType);
