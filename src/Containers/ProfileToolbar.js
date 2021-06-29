import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

const AttendanceToolbar = (props) => {
  const user = props.user;

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
            Profile
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
            <Typography>Dashboard</Typography>
            {user.userType === "Admin" ? (
              <Typography style={{ color: "black" }}>Admin</Typography>
            ) : (
              <Typography style={{ color: "black" }}>Supervisor</Typography>
            )}

            <Typography color="inherit">Profile</Typography>
          </Breadcrumbs>
        </Box>
      </Box>
    </Box>
  );
};

export default AttendanceToolbar;
