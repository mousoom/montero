import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { ToastContainer, toast } from "react-toastify";

const AttendanceToolbar = (props) => {
  
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
            Attendance List
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
          ><Typography style={{ color: "black" }}>Dashboard</Typography>
            <Typography style={{ color: "black" }}>Admin</Typography>
            <Typography color="inherit">Attendance List</Typography>
          </Breadcrumbs>
        </Box>
      </Box>

    </Box>
  );
};

export default AttendanceToolbar;