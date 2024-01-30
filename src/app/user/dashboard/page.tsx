import { Connected } from "@/components/connected";
import UserNavbar from "@/components/user/navbar";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <Connected>
        <UserNavbar />
        <div></div>
      </Connected>
    </>
  );
};

export default Dashboard;
