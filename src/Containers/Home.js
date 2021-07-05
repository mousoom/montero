import React from "react";
import { withRouter,Redirect } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { useSelector } from "react-redux";
import Landing from "./Landing";
import SidebarAdmin from "../Components/SidebarAdmin";
import SelectUserType from "../Components/UserType";

const Home = () => {
  const user = useSelector((state) => state.auth.userData);
  const loggedin = useSelector((state) => state.auth.loggedin);

  return (
    <>
      {loggedin ? (
        <>
        <div>
          {user.userType === "Admin" || user.userType === "HOD"  ? (
            <SidebarAdmin loading={false} loggedin={loggedin} user={user} />
          ) : null}
         </div>
         <div>
          {(user.userType === "Assistant" || user.userType === "Professor" || user.userType === "Maintenance") &&( user.displayName && user.email && user.displayName !== "" && user.email !== "") ? 
            (<Sidebar loading={false} loggedin={loggedin} user={user} />)
          : null}
        </div>
        <div>
          {user.userType !== "Assistant" || user.userType !== "Admin" || user.userType !== "Professor" || user.userType !== "Maintenance" || user.userType !== "HOD" ?
          (<SelectUserType user={user} />)
          :
          null
        }
        </div>
        </>
      ) : (
        <>
          <Landing />
        </>
      )}
    </>
  );
};

export default withRouter(Home);
