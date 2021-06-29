import React from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const allDepartment = ["CSE", "Civil", "ECE", "FET", "Mechanical"];

const AdminDialog = (props) => {
  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={props.open}
      onClose={props.close}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle>{props.formmode ? "Add New" : "Update"} Admin</DialogTitle>
      <ValidatorForm onSubmit={props.addUser}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="User Name"
                onChange={props.changeUsername}
                name="username"
                value={props.username}
                validators={["required"]}
                errorMessages={["this field is required"]}
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="Email"
                onChange={props.changeEmail}
                name="email"
                value={props.email}
                validators={["required"]}
                errorMessages={["this field is required"]}
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="User Type"
                onChange={props.changeUserType}
                name="gender"
                value={props.userType}
                validators={["required"]}
                errorMessages={["this field is required"]}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth margin="normal">
                <InputLabel id="demo-simple-select-outlined-label">
                  Department
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={props.department}
                  onChange={props.changeDepartment}
                  label="Department"
                >
                  {allDepartment.map((val) => (
                    <MenuItem value={val}>{val}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="secondary">
            {props.formmode ? "Add" : "Update"}
          </Button>
          <Button onClick={props.close} color="primary">
            Close
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
};

export default AdminDialog;
