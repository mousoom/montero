import React from "react";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Container } from "@material-ui/core";
import StaffToolbar from "../Components/StaffComponent/StaffToolbar";
import StaffTable from "../Components/StaffComponent/StaffTable";
import StaffTableAdmin from "../Components/StaffComponent/StaffTableAdmin";
const StaffList = (props) => {
  const user = useSelector((state) => state.auth.userData);

  return (
    <>
      <Box style={{ marginTop: "50px" }}>
        <Container maxWidth={false}>
          <StaffToolbar />
          <Box>
            {user.userType === "Supervisor" ? (
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
