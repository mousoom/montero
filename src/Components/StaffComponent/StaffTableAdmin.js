import React, { useState, useEffect } from "react";
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
import {
  Box,
  TextField,
  InputAdornment,
  SvgIcon,
  Menu,
  MenuItem,
} from "@material-ui/core";
import theme from "../../theme";
import { withStyles } from "@material-ui/core/styles";
import { Search as SearchIcon } from "react-feather";
import { toast } from "react-toastify";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import {
  getAllStaffs,
  addStaff,
  getStaff,
  updateStaff,
  deleteStaff,
} from "../../data/staffData";
import StaffDialog from "./StaffDialog";

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
  { id: "name", numeric: false, disablePadding: true, label: "Name" },
  {
    id: "department",
    numeric: true,
    disablePadding: false,
    label: "Department",
  },
  { id: "role", numeric: true, disablePadding: false, label: "Role" },
  { id: "gender", numeric: true, disablePadding: false, label: "Gender" },
  { id: "phone", numeric: true, disablePadding: false, label: "Phone" },
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
          color: theme.palette.primary.main,
          backgroundColor: lighten(theme.palette.primary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.primary.dark,
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
  const [open, setOpen] = useState(false);
  const [formMode, setFormMode] = useState(true);
  const [staffId, setStaffId] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  console.log(user.userType);
  const handleClose = () => {
    setOpen(false);
  };
  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastName = (event) => {
    setLastName(event.target.value);
  };
  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleGender = (event) => {
    setGender(event.target.value);
  };
  const handleDepartment = (event) => {
    setDepartment(event.target.value);
  };
  const handleRole = (event) => {
    setRole(event.target.value);
  };

  const getlist = async () => {
    try {
      setLoading(true);
      const list = await getAllStaffs();
      setStaffs(list);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const getOneStaff = async (id) => {
    try {
      setFormMode(false);
      setStaffId(id);
      const response = await getStaff(id);
      setFirstName(response.firstname);
      setLastName(response.lastname);
      setPhoneNumber(response.phonenumber);
      setGender(response.gender);
      setDepartment(response.department);
      setRole(response.role);
      setOpen(true);
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteHandler = async (id) => {
    try {
      await deleteStaff(id);
      getlist();
      toast.success("Staff Deleted Successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  const addStaffHandler = async () => {
    try {
      const staff = {
        firstname,
        lastname,
        phonenumber,
        gender,
        department,
        role,
      };
      if (formMode) {
        await addStaff(staff);
        toast.success("Staff Added Successfully");
        getlist();
        setOpen(false);
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setGender("");
        setDepartment("");
        setRole("");
      } else {
        await updateStaff(staffId, staff);
        toast.success("Staff Updated Successfully");
        getlist();
        setOpen(false);
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setGender("");
        setDepartment("");
        setRole("");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getlist();
  }, []);

  const rows = staffs;
  console.log(rows);

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

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  useEffect(() => {
    if (!loggedin) {
      props.history.push("/");
    }
  }, [loggedin]);
  return (
    <div className={classes.root}>
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
                        {row.department}
                      </TableCell>
                      <TableCell style={{ borderBottom: "none" }}>
                        {row.role}
                      </TableCell>
                      <TableCell style={{ borderBottom: "none" }}>
                        {row.gender}
                      </TableCell>
                      <TableCell style={{ borderBottom: "none" }}>
                        {row.phonenumber}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "none",
                          paddingRight: "24px",
                          textAlign: "right",
                        }}
                      >
                        <PopupState variant="popover" popupId="demo-popup-menu">
                          {(popupState) => (
                            <React.Fragment>
                              <IconButton
                                variant="outlined"
                                {...bindTrigger(popupState)}
                              >
                                <MoreVertIcon />
                              </IconButton>
                              <Menu
                                style={{
                                  position: "absolute",
                                  left: " -50px",
                                  borderRadius: "16px",
                                }}
                                PaperProps={{
                                  style: {
                                    width: "200px",
                                    minHeight: "16px",
                                  },
                                }}
                                {...bindMenu(popupState)}
                              >
                                <MenuItem onClick={popupState.close}>
                                  <Box
                                    onClick={() => deleteHandler(row.id)}
                                    style={{ width: "100%", display: "flex" }}
                                  >
                                    <DeleteOutlineOutlinedIcon />
                                    <Typography
                                      style={{
                                        marginLeft: "10px",
                                        fontSize: "16px",
                                      }}
                                    >
                                      Delete
                                    </Typography>
                                  </Box>
                                </MenuItem>
                                <MenuItem onClick={popupState.close}>
                                  <Box
                                    onClick={() => getOneStaff(row.id)}
                                    style={{ width: "100%", display: "flex" }}
                                  >
                                    <EditOutlinedIcon />
                                    <Typography
                                      style={{
                                        marginLeft: "10px",
                                        fontSize: "16px",
                                      }}
                                    >
                                      Edit
                                    </Typography>
                                  </Box>
                                </MenuItem>
                              </Menu>
                            </React.Fragment>
                          )}
                        </PopupState>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <StaffDialog
            open={open}
            close={handleClose}
            formmode={formMode}
            firstname={firstname}
            lastname={lastname}
            phonenumber={phonenumber}
            gender={gender}
            department={department}
            role={role}
            changeFirstname={handleFirstName}
            changeLastname={handleLastName}
            changePhoneNumber={handlePhoneNumber}
            changeGender={handleGender}
            changeDepartment={handleDepartment}
            changeRole={handleRole}
            addStaff={addStaffHandler}
          />
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
    </div>
  );
}
export default withRouter(EnhancedTable);
