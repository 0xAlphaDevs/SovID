"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Connected } from "@/components/connected";
import AdminNavbar from "@/components/admin/navbar";
import StepperIssueSbt from "@/components/admin/issue/stepper";

const Issue = () => {
  const searchParams = useSearchParams();
  const tokenName = searchParams.get("tokenName");
  const tokenAddress = searchParams.get("tokenAddress");
  return (
    <>
      <Connected>
        <AdminNavbar />
        <div className="p-8 flex flex-col gap-4">
          {" "}
          <StepperIssueSbt tokenName={tokenName} tokenAddress={tokenAddress} />
        </div>
      </Connected>
    </>
  );
};

export default Issue;
