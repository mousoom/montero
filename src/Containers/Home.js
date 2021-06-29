import React from 'react';
import { withRouter } from 'react-router-dom';
import Sidebar from "../Components/Sidebar";
import { useSelector } from "react-redux";
import Landing from './Landing';
import SidebarAdmin from '../Components/SidebarAdmin';


const Home = () => {

  const user = useSelector((state) => state.auth.userData);
  const loggedin = useSelector((state) => state.auth.loggedin);

  return (
    <>
    {loggedin ? (
      <>
      {user.userType == "Admin" ?
      <SidebarAdmin loading={false} loggedin={loggedin} user={user} />
      :
        <Sidebar loading={false} loggedin={loggedin} user={user} />
    }
      </>
    ) : (
      <>
      <Landing/>
      </>
    )}
  
  
  
    </>
    )
}

export default withRouter(Home);