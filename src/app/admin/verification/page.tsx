"use client";

import React from "react";
import { Connected } from "@/components/connected";
import AdminNavbar from "@/components/admin/navbar";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Alert,
  Select,
  Option,
} from "@material-tailwind/react";
import { sbts } from "@/constants/sbt";
import { DefaultSpinner } from "@/components/admin/spinner";
import VerificationRequestsTable from "@/components/admin/verification/verification-requests-table";
import SuccessIcon from "@/components/icons/successIcon";
import ErrorIcon from "@/components/icons/errorIcon";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import CreateVerificationRequest from "@/components/admin/verification/create-verification-request";

const Verification = () => {
  const { address } = useAccount();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [formData, setFormData] = React.useState({
    walletAddress: "",
    sbtSymbol: "",
    tokenId: "",
  } as any);

  const { write, data, isLoading, isError } = useContractWrite({
    address: sbts.EDU.address,
    abi: sbts.EDU.abi,
    functionName: "requestForVerification",
    args: [address, "0"],
    onError: (error) => {
      console.error("Error:", error);
    },
    onSettled: (data) => {
      console.log("Receipt:", data);
    },
    onSuccess: (result) => {
      console.log("Success:", result);
    },
  });

  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash });

  function prepareRequestVerificationArgs(formData: any) {
    let args: string[] = [];
    args[0] = formData.walletAddress;
    args[1] = formData.tokenId;

    return args;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      formData["walletAddress"] == undefined ||
      formData["sbtSymbol"] == undefined ||
      formData["tokenId"] == undefined
    ) {
      alert("Please fill all the fields");
      return;
    }
    console.log(formData);
    write?.();
  }

  return (
    <>
      <Connected>
        <AdminNavbar />
        <div className="p-8 flex flex-col gap-4">
          <div className="m-8">
            {/* <VerificationForm /> */}
            <VerificationRequestsTable requestVerification={handleOpen} />
            {/* Request for Verification Dialog */}
            <Dialog
              placeholder=""
              size="xs"
              open={open}
              handler={handleOpen}
              className="bg-transparent shadow-none"
            >
              <CreateVerificationRequest />
            </Dialog>
          </div>
          {/* Transaction result div */}
          <div className="absolute top-10 right-5">
            {isSuccess && (
              <Alert icon={<SuccessIcon />} color="green">
                Transaction Succesful
              </Alert>
            )}
            {isError && (
              <Alert icon={<ErrorIcon />} color="red">
                At this moment he knew he fucked up!
              </Alert>
            )}
          </div>
        </div>
      </Connected>
    </>
  );
};

export default Verification;
