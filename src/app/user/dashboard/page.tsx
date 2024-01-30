import { Connected } from "@/components/connected";
import { InfoCard } from "@/components/user/dashboard/info-card";
import UserNavbar from "@/components/user/navbar";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <Connected>
        <UserNavbar />
        <div className="p-8">
          <InfoCard />
        </div>
      </Connected>
    </>
  );
};

export default Dashboard;
