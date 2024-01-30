import React from "react";
import { Connected } from "@/components/connected";
import UserNavbar from "@/components/user/navbar";
import VerificationTable from "@/components/user/verification/verification-table";

const Verification = () => {
  return (
    <>
      <Connected>
        <UserNavbar />
        <div className="p-8 flex flex-col gap-4">
          <VerificationTable />
        </div>
      </Connected>
    </>
  );
};

export default Verification;
