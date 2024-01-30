import React from "react";
import { Connected } from "@/components/connected";
import AdminNavbar from "@/components/admin/navbar";

const Verification = () => {
  return (
    <>
      <Connected>
        <AdminNavbar />
        <div className="p-8 flex flex-col gap-4">Verification</div>
      </Connected>
    </>
  );
};

export default Verification;
