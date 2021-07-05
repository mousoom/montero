import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Avatar,
  Container,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import ProfileToolbar from "./ProfileToolbar";


const Profile = (props) => {
  const { history } = props;
  const user = useSelector((state) => state.auth.userData);
  if (!user) {
    return <Redirect to="/" />;
  } else {
    return (
      <div style={{ marginTop: "50px" }}>
        <Container>
          <ProfileToolbar user={user} />
          <Card
            style={{
              marginTop: "20px",
              padding: 20,
              borderRadius: "16px",
              boxShadow:
                "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px",
            }}
          >
            <CardContent
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                alt={user.displayName}
                src={user.photoURL}
                style={{
                  width: 100,
                  height: 100,
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: 20,
                }}
              />
              <Typography
                variant="h4"
                style={{
                  textTransform: "uppercase",
                  fontWeight: "600",
                  fontSize: "40px",
                  letterSpacing: "8px",
                }}
              >
                {user.username}
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                style={{
                  textTransform: "lowercase",
                  fontWeight: "700",
                  fontSize: "20px",
                  letterSpacing: "5px",
                }}
              >
                {user.email}
              </Typography>

                <Typography
                  variant="body1"
                  style={{
                    fontSize: "25px",
                    textTransform: "uppercase",
                    letterSpacing: "3px",
                  }}
                >
                  <span style={{ fontSize: "20px" }}>
                    <strong>{user.userType}</strong> of{" "}
                  </span>
                  CSE
                  <span style={{ fontSize: "20px" }}> Department</span>
                </Typography>
            </CardContent>
          </Card>
        </Container>
      </div>
    );
  }
};
export default withRouter(Profile);
