import React from "react";
import { Connected } from "@/components/connected";
import AdminNavbar from "@/components/admin/navbar";

const Issue = () => {
  return (
    <>
      <Connected>
        <AdminNavbar />
        <div className="p-8 flex flex-col gap-4">Issue</div>
      </Connected>
    </>
  );
};

export default Issue;
