import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import { Box, Avatar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { saveUserData, setAuth } from "../redux/actions";
import { Route, Switch, withRouter } from "react-router-dom";
import firebase from "../firebaseHandler";
import Landing from "../Containers/Landing";
import Dashboard from "../Containers/Dashboard";
import UserType from "./UserType";
import Profile from "../Containers/Profile";
import Staff from "../Containers/Staff";
import Admin from "../Containers/Admin";
import HomeIcon from "@material-ui/icons/Home";
import Attendance from "../Containers/Attendance";
import AttendanceDialog from "../Components/AttendanceComponent/AttendanceDialog";
import NavItem from "./NavItem";
import {
  BarChart as BarChartIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
} from "react-feather";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Logo from "../logo/logo.png";
import { toast } from "react-toastify";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: "transparent",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { loading, loggedin, history, window } = props;
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
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

  const items = [
    {
      href: "/dashboard",
      icon: BarChartIcon,
      title: "Dashboard",
    },
    {
      href: "/admin",
      icon: UserPlusIcon,
      title: "Admins",
    },
    {
      href: "/staff",
      icon: UsersIcon,
      title: "Staffs",
    },
    {
      href: "/profile",
      icon: UserIcon,
      title: "Profile",
    },
  ];

  const CssNavItem = withStyles({
    root: {
      backgroundColor: "#fff",
      "&:hover": {
        backgroundColor: "",
      },
      "&.MuiButtonBase-root, .MuiButton-root": {
        paddingLeft: "40px",
        paddingRight: "20px",
        paddingTop: "5px",
        paddingBottom: "5px",

        "&:hover ": {
          backgroundColor: "#f2f3f5",
        },
        "&.active": {
          color: "rgb(0, 171, 85)",
          backgroundColor: "rgba(0, 171, 85, 0.08)",
          "&:before": {
            position: "absolute",
            content: '""',
            top: 0,
            bottom: 0,
            right: 0,
            width: "3px",
            borderRadius: "4px 0px 0px 4px",
            background: "#00ab55",
          },
        },
      },
    },
  })(NavItem);

  const container =
    window !== undefined ? () => window().document.body : undefined;
  console.log(user.userType);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{ height: "90px", boxShadow: "none" }}
        className={classes.appBar}
      >
        <Toolbar
          style={{
            height: "90px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <IconButton style={{ position: "fixed", right: "20px" }}>
            <ExitToAppIcon onClick={singOutUser} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "90px",
                  padding: "0px 0px 0px 25px",
                }}
              >
                <img src={Logo} style={{ width: "55px" }} alt="logo" />
                <Typography
                  style={{
                    fontFamily: "Comfortaa",
                    fontWeight: "700",
                    fontSize: "20px",
                    paddingLeft: "5px",
                    color: "#00ab55",
                  }}
                >
                  montero
                </Typography>
              </div>
              {user && (
                <Box
                  style={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    padding: "16px 20px",
                    background: "rgba(145, 158, 171, 0.12)",
                    margin: "35px 30px 30px 30px",
                    borderRadius: "10px",
                    color: "black",
                  }}
                >
                  <Avatar
                    style={{
                      cursor: "pointer",
                      width: 40,
                      height: 40,
                      marginRight: "10px",
                    }}
                  />
                  <div>
                    <Typography
                      style={{ fontWeight: "600", fontSize: "0.875rem" }}
                    >
                      {user.username}
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: "400",
                        textTransform: "lowercase",
                      }}
                    >
                      {user.userType}
                    </Typography>
                  </div>
                </Box>
              )}

              {loggedin ? (
                <List>
                  {items.map((item) => (
                    <CssNavItem
                      href={item.href}
                      key={item.title}
                      title={item.title}
                      icon={item.icon}
                    />
                  ))}
                </List>
              ) : (
                <List>
                  <ListItem
                    button
                    key={"Home"}
                    onClick={() => history.push("/")}
                  >
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Home"} />
                  </ListItem>
                </List>
              )}
            </div>
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "90px",
                  padding: "0px 0px 0px 25px",
                }}
              >
                <img src={Logo} style={{ width: "55px" }} alt="logo" />
                <Typography
                  style={{
                    fontFamily: "Comfortaa",
                    fontWeight: "700",
                    fontSize: "20px",
                    paddingLeft: "5px",
                    color: "#00ab55",
                  }}
                >
                  montero
                </Typography>
              </div>
              {user && (
                <Box
                  style={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    padding: "16px 20px",
                    background: "rgba(145, 158, 171, 0.12)",
                    margin: "35px 30px 30px 30px",
                    borderRadius: "10px",
                    color: "black",
                  }}
                >
                  <Avatar
                    style={{
                      cursor: "pointer",
                      width: 40,
                      height: 40,
                      marginRight: "10px",
                    }}
                  />
                  <div>
                    <Typography
                      style={{ fontWeight: "600", fontSize: "0.875rem" }}
                    >
                      {user.username}
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: "400",
                        textTransform: "lowercase",
                      }}
                    >
                      {user.userType}
                    </Typography>
                  </div>
                </Box>
              )}
              {loggedin ? (
                <List>
                  {items.map((item) => (
                    <CssNavItem
                      href={item.href}
                      key={item.title}
                      title={item.title}
                      icon={item.icon}
                    />
                  ))}
                </List>
              ) : (
                <List>
                  <ListItem
                    button
                    key={"Home"}
                    onClick={() => history.push("/")}
                  >
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Home"} />
                  </ListItem>
                </List>
              )}
            </div>
          </Drawer>
        </Hidden>
      </nav>
      <div style={{ marginTop: "10vh", width: "100%" }}>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <Landing loading={loading} loggedin={loggedin} user={user} />
            )}
          />
          <Route
            path="/dashboard"
            exact
            render={() => (
              <Dashboard loading={loading} loggedin={loggedin} user={user} />
            )}
          />
          <Route
            path="/changeUsertype"
            exact
            render={() => (
              <UserType loading={loading} loggedin={loggedin} user={user} />
            )}
          />

          <Route
            path="/profile"
            exact
            render={() => (
              <Profile loading={loading} loggedin={loggedin} user={user} />
            )}
          />
          <Route
            path="/staff"
            exact
            render={() => (
              <Staff loading={loading} loggedin={loggedin} user={user} />
            )}
          />
          <Route
            path="/admin"
            exact
            render={() => (
              <Admin loading={loading} loggedin={loggedin} user={user} />
            )}
          />
          <Route
            path="/attendance"
            exact
            render={() => (
              <Attendance loading={loading} loggedin={loggedin} user={user} />
            )}
          />
          <Route
            path="/setattendance"
            exact
            render={() => (
              <AttendanceDialog
                loading={loading}
                loggedin={loggedin}
                user={user}
              />
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(ResponsiveDrawer);
