import React, { useState, useEffect } from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import { Card, CardActions, CardContent, Button, Typography, TextField,MenuItem } from '@material-ui/core';
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
    const [categories, setCategory] = useState([]);
    const [cost, setCost] = useState("")
    const [quantity, setQuantity] = useState("")
    const [cat, setCat] = useState("")

    const getCategoryAdded = () => {
        db.collection("category")
          .get()
          .then((querySnapshot) => {
            let category = [];
            querySnapshot.forEach((doc) => {
              let obj = doc.data();
              obj.id = doc.id;
              category.push(obj);
            });
            console.log("Got added category", category);
            setCategory(category);
          })
          .catch((error) => {
            console.log("Error getting added category: ", error);
          });
      };
      useEffect(() => {
        getCategoryAdded()
      }, []);

      const handleSetcategory = (event) => {
        setCat(event.target.value);
      };

    const handleAddResource = () => {
        const datePosted = Date.now();
        const toAdd = {
            name,
            cost,
            quantity,
            cat,
            datePosted
        };
        if (edit) {
            db.collection("resource").doc(params.resourceDetails.id).set(toAdd)
                .then(() => {
                    console.log("Resource Add Success");
                    history.push("/resource");
                })
                .catch((error) => {
                    console.log("Resource Add Failure", error);
                });
        }else{
           db.collection("resource").doc(name).set(toAdd)
            .then(() => {
                console.log("Resource Add Success");
                history.push("/resource");
            })
            .catch((error) => {
                console.log("Resource Add Failure", error);
            });
        }
    };
    const getEditableDetails = (resourceDetails) => {
        console.log("category details are", resourceDetails)
        setEdit(true);
        setName(resourceDetails.name)
        setCost(resourceDetails.cost)
        setQuantity(resourceDetails.quantity)
        setCat(resourceDetails.cat)
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
                if (params.resourceDetails) {
                    getEditableDetails(params.resourceDetails);
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
                display:'flex',flexDirection:'column',alignItems:'center'
            }} >

                <CardContent >
                    <Typography variant="h5" component="h2">
                       {edit ? 'Update' :' Add'} Resource Details
                    </Typography>

                    <TextField
                        id="Resource name"
                        label="Resource Name"
                        placeholder="Enter the resource name"
                        variant="outlined"
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            width: "100%",
                            marginTop: 20
                        }}
                        value={name}
                    />
                     <TextField
                        id="Cost"
                        label="Cost (Rs)"
                        placeholder="Enter the cost"
                        variant="outlined"
                        onChange={(e) => setCost(e.target.value)}
                        style={{
                            width: "100%",
                            marginTop: 20
                        }}
                        value={cost}
                    />
                      <TextField
                        id="Quantity"
                        label="Quantity"
                        placeholder="Enter the Quantity"
                        variant="outlined"
                        onChange={(e) => setQuantity(e.target.value)}
                        style={{
                            width: "100%",
                            marginTop: 20
                        }}
                        value={quantity}
                    />
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Category"
                        value={cat}
                        onChange={handleSetcategory}
                        // helperText="Please select your currency"
                        variant="outlined"
                        fullWidth
                        style={{
                            width: "100%",
                            marginTop: 20
                        }}
                      >
                        {categories.map((option) => (
                          <MenuItem key={option.name} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                </CardContent>
                <Button variant="contained" color="primary" style={{ marginBottom: 20, marginTop: 20 }} onClick={handleAddResource}>
                    {edit ? "Edit" : "Add"} Resource
                </Button>
            </Card>
        </div >

    );
}
export default withRouter(AddCategory);