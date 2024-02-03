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

const Verification = () => {
  const { address } = useAccount();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [formData, setFormData] = React.useState({
    walletAddress: "",
    sbtSymbol: "",
    tokenId: "",
  } as any);

  const { config } = usePrepareContractWrite({
    address: sbts.EDU.address,
    abi: sbts.EDU.abi,
    functionName: "requestForVerification",
    args: [address, "0"],
  });

  const { write, data, isLoading, isError } = useContractWrite(config);

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
    setFormData({
      walletAddress: "",
      sbtSymbol: "",
      tokenId: "",
    } as any);
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
              {isLoading ? (
                <div className="flex justify-center mt-24">
                  <DefaultSpinner />
                </div>
              ) : (
                <Card placeholder="" className="mx-auto w-full max-w-[24rem]">
                  <CardHeader
                    placeholder=""
                    variant="gradient"
                    color="blue"
                    className="mb-4 grid h-28 place-items-center"
                  >
                    <Typography placeholder="" variant="h4" color="white">
                      Request for Verification
                    </Typography>
                  </CardHeader>
                  <CardBody placeholder="" className="flex flex-col gap-4">
                    <form
                      className="mb-4 flex flex-col gap-6"
                      onSubmit={handleSubmit}
                    >
                      <Input
                        className="focus:ring-0 "
                        size="lg"
                        label="SBT Holder Wallet Address"
                        value={formData.walletAddress}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            walletAddress: e.target.value,
                          });
                        }}
                        crossOrigin={undefined}
                        required={true}
                      />
                      <Select
                        onChange={(value) => {
                          setFormData({
                            ...formData,
                            sbtSymbol: value,
                          });
                        }}
                        label="Select SBT"
                        placeholder={formData.sbtSymbol}
                        value={formData.sbtSymbol}
                      >
                        <Option value="EDU">Educational ID</Option>
                        <Option value="EMP">Employee ID</Option>
                        <Option value="SSN">National ID</Option>
                        <Option value="PID">Passport ID</Option>
                      </Select>
                      <Input
                        type="number"
                        className="focus:ring-0 "
                        size="lg"
                        label="Document/Token ID"
                        value={formData.tokenId}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            tokenId: e.target.value,
                          });
                        }}
                        required={true}
                        crossOrigin={undefined}
                      />
                      <Button
                        placeholder=""
                        color="blue"
                        type="submit"
                        variant="gradient"
                        fullWidth
                      >
                        Send Request
                      </Button>
                    </form>
                  </CardBody>
                </Card>
              )}
            </Dialog>
          </div>
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
