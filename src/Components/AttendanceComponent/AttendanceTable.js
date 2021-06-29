import React from "react";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { TextField, InputAdornment, SvgIcon, Button } from "@material-ui/core";
import theme from "../../theme";
import { withStyles } from "@material-ui/core/styles";
import { Search as SearchIcon } from "react-feather";
import { toast } from "react-toastify";
import { getStaffs } from "../../data/staffData";

import firebase from "../../firebaseHandler";
const db = firebase.firestore();

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "name", label: "Name" },
  {
    id: "inTime",
    label: "In Time",
  },
  { id: "outTime", label: "Out Time" },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell
          padding="checkbox"
          style={{
            backgroundColor: "#f4f6f8",
            borderRadius: "8px 0px 0px 8px",
            paddingLeft: "24px",
            boxShadow: "#fff 8px 0px 0px inset",
            borderBottom: "none",
          }}
        >
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            style={{
              backgroundColor: "#f4f6f8",
              borderBottom: "none",
            }}
          >
            {headCell.label}
          </TableCell>
        ))}
        <TableCell
          align="center"
          style={{
            backgroundColor: "#f4f6f8",
            borderBottom: "none",
          }}
        >
          Status
        </TableCell>
        <TableCell
          style={{
            backgroundColor: "#f4f6f8",
            borderBottom: "none",
            borderRadius: "0px 8px 8px 0px",
            paddingRight: "24px",
            boxShadow: "#fff -8px 0px 0px inset",
          }}
        />
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    height: "90px",
    borderRadius: "16px 16px 0 0",
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  const CssTextField = withStyles({
    root: {
      "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        width: "240px",
        transition: theme.transitions.create(["width", "boxShadow"], {
          duration: theme.transitions.duration.shorter,
        }),

        "&:hover fieldset": {
          borderColor: "#00ab55",
        },
        "&.Mui-focused, .Mui-active ": {
          width: "320px",
          boxShadow: "rgba(0,0,0,0.24) 0px 8px 16px 0px",
        },
      },
    },
  })(TextField);

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <CssTextField
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon fontSize="small" color="inherit">
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            ),
          }}
          placeholder="Search staff"
          variant="outlined"
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "20px",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    borderRadius: "16px",
    boxShadow:
      "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px",
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

function EnhancedTable(props) {
  const { history } = props;
  const user = useSelector((state) => state.auth.userData);
  const loggedin = useSelector((state) => state.auth.loggedin);
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attendances, setAttendance] = useState([]);
  const [edit, setEdit] = useState(true);

  const getlist = async () => {
    try {
      setLoading(true);
      const list = await getStaffs();
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

  const handlehistory = (row) => {
    db.collection("attendance")
      .where("uid", "==", user.uid, "&&")
      .where("datePosted", "==", newDate)
      .where("firstname", "==", row.firstname)
      .get()
      .then((querySnapshot) => {
        let attendance = [];
        querySnapshot.forEach((doc) => {
          let obj = doc.data().outTime;
          attendance.push(obj);
        });
        console.log("Got added attendance", attendance);
        var inTime = attendance.toString();
        console.log(inTime.length);
        if (inTime.length === 0) {
          history.push({
            pathname: "/setattendance",
            state: { staffDetails: row, edit },
          });
        } else {
          toast.info("attendance already given");
        }
      });
    setEdit(true);
  };

  var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date()).toDate();
  var today = myTimestamp;
  const date =
    today.getDate() + "-" + today.getMonth() + "-" + today.getFullYear();
  const newDate = date.toString();

  const getAttendanceAdded = () => {
    db.collection("attendance")
      .where("uid", "==", user.uid, "&&")
      .where("datePosted", "==", newDate)
      .get()
      .then((querySnapshot) => {
        let attendance = [];
        querySnapshot.forEach((doc) => {
          let obj = doc.data();
          obj.id = doc.id;
          attendance.push(obj);
        });
        console.log("Got added attendance", attendance);
        setAttendance(attendance);
      })
      .catch((error) => {
        console.log("Error getting added feedback: ", error);
      });
  };
  useEffect(() => {
    getAttendanceAdded();
  }, []);
  console.log(attendances);
  const rows = attendances;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  useEffect(() => {
    if (!loggedin) {
      props.history.push("/");
    }
  }, []);
  return (
    <div className={classes.root}>
      {rows && rows.length > 0 ? (
        <Paper className={classes.paper}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        style={{
                          outline: "none",
                          height: "70px",
                        }}
                      >
                        <TableCell
                          padding="checkbox"
                          style={{ borderBottom: "none", paddingLeft: "24px" }}
                        >
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          style={{ borderBottom: "none", paddingLeft: "24px" }}
                        >
                          {row.firstname} {row.lastname}
                        </TableCell>
                        <TableCell style={{ borderBottom: "none" }}>
                          {row.inTime}
                        </TableCell>
                        <TableCell style={{ borderBottom: "none" }}>
                          {row.outTime}
                        </TableCell>

                        <TableCell
                          align="center"
                          style={{ borderBottom: "none" }}
                        >
                          {row.status === "Present" ? (
                            <span
                              style={{
                                fontWeight: 700,
                                backgroundColor: "rgba(84, 214, 44, 0.16)",
                                color: "rgb(34, 154, 22)",
                                padding: "8px 15px",
                                borderRadius: "16px",
                              }}
                            >
                              {row.status}
                            </span>
                          ) : null}
                          {row.status === "Absent" ? (
                            <span
                              style={{
                                fontWeight: 700,
                                backgroundColor: "rgba(255, 72, 66, 0.16)",
                                color: "rgb(183, 33, 54)",
                                padding: "8px 15px",
                                borderRadius: "16px",
                              }}
                            >
                              {row.status}
                            </span>
                          ) : null}
                          {row.status === "Leave" ? (
                            <span
                              style={{
                                fontWeight: 700,
                                backgroundColor: "rgba(48, 80, 255, 0.16)",
                                color: "rgb(33, 78, 214)",
                                padding: "5px 10px",
                                borderRadius: "16px",
                              }}
                            >
                              {row.status}
                            </span>
                          ) : null}
                        </TableCell>
                        <TableCell style={{ borderBottom: "none" }}>
                          {row.status === "Leave" ? (
                            <Button
                              color="secondary"
                              variant="contained"
                              disabled
                              onClick={() => handlehistory(row)}
                            >
                              Set Out Time
                            </Button>
                          ) : null}
                          {row.status === "Absent" ? (
                            <Button
                              color="secondary"
                              variant="contained"
                              disabled
                              onClick={() => handlehistory(row)}
                            >
                              Set Out Time
                            </Button>
                          ) : null}
                          {row.status === "Present" ? (
                            <Button
                              color="secondary"
                              variant="contained"
                              onClick={() => handlehistory(row)}
                            >
                              Set Out Time
                            </Button>
                          ) : null}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <Typography
          style={{
            width: "100%",
            padding: "30px",
            textAlign: "center",
            fontSize: "25px",
          }}
        >
          Todays Attendance has not Started
        </Typography>
      )}
    </div>
  );
}
export default withRouter(EnhancedTable);
