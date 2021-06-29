import React, { useEffect, useState } from "react";
import { useLocation, withRouter, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Container } from "@material-ui/core";
import StaffToolbar from "../Components/StaffComponent/StaffToolbar";
import StaffTable from "../Components/StaffComponent/StaffTable";
import StaffTableAdmin from "../Components/StaffComponent/StaffTableAdmin";
const StaffList = (props) => {
  const { history } = props;
  const location = useLocation();
  const params = location.state;
  const user = useSelector((state) => state.auth.userData);
  const loggedin = useSelector((state) => state.auth.loggedin);

  return (
    <>
      <Box style={{marginTop: "50px"}}>
        <Container maxWidth={false}>
          <StaffToolbar />
          <Box>
            {user.userType == "Supervisor" ? (
              <StaffTableAdmin />
            ) : (
              <StaffTable />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default withRouter(StaffList);
