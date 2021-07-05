import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, withRouter } from 'react-router-dom';
import { Box, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { toast } from "react-toastify";

const ResourceToolbar = (props) => {
const { history } = props;
  const user = useSelector((state) => state.auth.userData);
  
  return (
    <Box {...props}>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box style={{ display: "flex", flexDirection: "column" }}>
          <Box
            style={{
              fontWeight: 700,
              fontSize: "1.5rem",
              fontFamily: "Public Sans, sans-serif",
              marginBottom: "8px",
            }}
          >
            Resource List
          </Box>
          <Breadcrumbs
            separator={
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  backgroundColor: "rgb(145, 158, 171)",
                  margin: "0px 7px",
                }}
              ></span>
            }
            aria-label="breadcrumb"
            style={{ lineHeight: "2", fontSize: "1rem" }}
          >
            <Typography style={{ color: "black" }}>Dashboard</Typography>
            {user.userType === "Admin" ? (
              <Typography style={{ color: "black" }}>Admin</Typography>
            ) : (
              <Typography style={{ color: "black" }}>{user.userType}</Typography>
            )}

            <Typography color="inherit">Resource List</Typography>
          </Breadcrumbs>
        </Box>
        {user.userType === "Admin" || user.userType === "HOD" ? 
        <Box sx={{ display: "flex" }}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => history.push({
                pathname: "/addresource",
                state: {resourceDetails:null}
               
              })}
              style={{ boxShadow: "rgba(106, 56, 255, 0.24) 0px 8px 16px 0px" }}
            >
              <span style={{ fontSize: "20px", marginRight: "10px" }}>+</span>
              Add Resource
            </Button>
          </Box>
        : 
        null}
          
      </Box>
    </Box>
  );
};

export default withRouter(ResourceToolbar);
