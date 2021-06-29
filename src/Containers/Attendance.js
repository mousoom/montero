import { Box, Container } from "@material-ui/core";
import { useLocation, withRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import firebase from "../firebaseHandler";
import {
  getStaffs,
  addStaff,
  getStaff,
  updateStaff,
  deleteStaff,
} from "../data/staffData";
import AttendanceTable from "../Components/AttendanceComponent/AttendanceTable";
import AttendanceToolbar from "../Components/AttendanceComponent/AttendanceToolbar";

const Attendance = (props) => {
  const { history } = props;
  const user = useSelector((state) => state.auth.userData);
  const loggedin = useSelector((state) => state.auth.loggedin);
  const location = useLocation();
  const params = location.state;
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(false);

  const getlist = async () => {
    try {
      setLoading(true);
      const list = await getStaffs(user);
      setStaffs(list);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getlist();
  }, []);

  return (
    <>
      <Box style={{ marginTop: "50px" }}>
        <Container maxWidth={false}>
          <AttendanceToolbar/>
          <Box>
            <AttendanceTable staffDetails={staffs} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Attendance;
