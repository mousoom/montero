import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { toast } from "react-toastify";
import { getStaffs, addStaff, updateStaff } from "../../data/staffData";
import StaffDialog from "./StaffDialog";

const StaffListToolbar = (props) => {
  const user = useSelector((state) => state.auth.userData);
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
      const list = await getStaffs();
      setStaffs(list);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  const handleAdd = () => {
    setOpen(true);
    setFormMode(true);
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setGender("");
    setDepartment("");
    setRole("");
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
        adminName: user.username,
        adminEmail: user.email,
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
            Staff List
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
              <Typography style={{ color: "black" }}>Supervisor</Typography>
            )}

            <Typography color="inherit">Staff List</Typography>
          </Breadcrumbs>
        </Box>
        {user.userType === "Supervisor" ? (
          <Box sx={{ display: "flex" }}>
            <Button
              color="primary"
              variant="contained"
              onClick={handleAdd}
              style={{ boxShadow: "rgba(0, 171, 85, 0.24) 0px 8px 16px 0px" }}
            >
              <span style={{ fontSize: "20px", marginRight: "10px" }}>+</span>
              Add Staff
            </Button>
          </Box>
        ) : null}
      </Box>
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
    </Box>
  );
};

export default StaffListToolbar;
