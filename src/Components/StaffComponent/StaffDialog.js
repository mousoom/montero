import React from 'react';

import {Dialog, DialogActions, DialogContent, DialogTitle, Button,
    Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,InputLabel, Select, MenuItem} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const allDepartment = [
    "CSE",
    "Civil",
    "ECE",
    "Mechanical"
]

const allRole = [
    "Sweeper",
    "Bathroom Cleaner",
    "Corridor Cleaner",
]

const allGender = [
    "Male",
    "Female",
]

const StaffDialog = (props) => {
    return (
        <Dialog
        fullWidth={true}
        maxWidth='md'
        open={props.open}
        onClose={props.close}
        aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle>{props.formmode ?  'Add New' : 'Update'}  Staff</DialogTitle>
            <ValidatorForm
                onSubmit={props.addStaff}
            >
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextValidator
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="First Name"
                            onChange={props.changeFirstname}
                            name="firstname"
                            value={props.firstname}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            autoComplete='off'
                        />
                        </Grid>
                        <Grid item xs={6}>
                            <TextValidator
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Last Name"
                            onChange={props.changeLastname}
                            name="lastname"
                            value={props.lastname}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            autoComplete='off'
                        />
                        </Grid>
                        <Grid item xs={6}>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Phone Number"
                                onChange={props.changePhoneNumber}
                                name="phonenumber"
                                value={props.phonenumber}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                autoComplete='off'
                            />
                        </Grid>
                        <Grid item xs={6} >
                            <FormControl variant="outlined" fullWidth  margin="normal">
                                <InputLabel id="demo-simple-select-outlined-label">Department</InputLabel>
                                <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={props.department}
                                onChange={props.changeDepartment}
                                label="Department"
                                >
                                    {allDepartment.map((val) => <MenuItem value={val}>{val}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth  margin="normal">
                                <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
                                <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={props.role}
                                onChange={props.changeRole}
                                label="Role"
                                >
                                    {allRole.map((val) => <MenuItem value={val}>{val}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                        <FormControl component="fieldset" fullWidth  margin="normal">
                        <FormLabel component="legend" >Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" value={props.gender} onChange={props.changeGender} style={{display:'flex',flexDirection:'row'}}>
                            {allGender.map((val) => <FormControlLabel value={val} control={<Radio />} label={val}/>)}
                        </RadioGroup>
                        </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" variant="contained" type="submit" >
                       {props.formmode ? 'Add' : 'Update'}
                    </Button>
                    <Button onClick={props.close} color="secondary" variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </Dialog>
    );
}

export default StaffDialog;