import React, { useState, useEffect } from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import { Card, CardActions, CardContent, Button, Typography, TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';
import firebase from "../../firebaseHandler";
const db = firebase.firestore();

const AddCategory = (props) => {
    const { history } = props;
    const user = useSelector((state) => state.auth.userData);
    const loggedin = useSelector((state) => state.auth.loggedin);
    const location = useLocation();
    const params = location.state;
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState("");   
    console.log(user.userType)

    const handleAddCategory = () => {
        const datePosted = Date.now();
        const toAdd = {
            name,
            datePosted
        };
        if (edit) {
            db.collection("category").doc(params.categoryDetails.id).set(toAdd)
                .then(() => {
                    console.log("Feedback Add Success");
                    history.push("/category");
                })
                .catch((error) => {
                    console.log("Feedback Add Failure", error);
                });
        }else{
           db.collection("category").doc(name).set(toAdd)
            .then(() => {
                console.log("Category Add Success");
                history.push("/category");
            })
            .catch((error) => {
                console.log("Category Add Failure", error);
            });
        }
    };
    const getEditableDetails = (categoryDetails) => {
        console.log("category details are", categoryDetails)
        setEdit(true);
        setName(categoryDetails.name)
    };

    useEffect(() => {
        if (!user) {
            history.push("/");
        }
        else {
            if (user.userType !== "Admin" && user.userType !== "HOD") {
                history.push("/profile");
            }
            else {
                if (params.categoryDetails) {
                    getEditableDetails(params.categoryDetails);
                }
            }
        }
    }, []);

    return (
        <div>
            <Card style={{
                width: "80%",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 30,
                padding: 20,
                marginBottom: 50,
                transition: "0.3s",
                boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                "&:hover": {
                    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
                },
                borderRadius: 30,
                paddingTop: 30,
                display:'flex',
                flexDirection:'column',
                alignItems:'center'
            }} >

                <CardContent style={{width:'100%'}}>
                    <Typography variant="h5" component="h2">
                       {edit ? 'Update' :' Add'} Category Details
                    </Typography>

                    <TextField
                        id="category name"
                        label="Category Name"
                        placeholder="Enter the category name"
                        variant="outlined"
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            width: "100%",
                            marginTop: 20
                        }}
                        value={name}
                    />

                </CardContent>
                <Button variant="contained" color="primary" style={{ marginBottom: 20, marginTop: 20 }} onClick={handleAddCategory}>
                    {edit ? "Edit" : "Add"} Category
                </Button>
            </Card>
        </div >

    );
}
export default withRouter(AddCategory);