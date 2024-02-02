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
} from "@material-tailwind/react";
import { DefaultSpinner } from "@/components/admin/spinner";
import VerificationRequestsTable from "@/components/admin/verification/verification-requests-table";
import SuccessIcon from "@/components/icons/successIcon";
import ErrorIcon from "@/components/icons/errorIcon";

const Verification = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [loading, setLoading] = React.useState<Boolean>();
  const [transactionStatus, setTransactionStatus] = React.useState<String>("");
  const [formData, setFormData] = React.useState({} as any);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
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
              {loading ? (
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
                        value={formData["SBT Holder Wallet Address"]}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            ["SBT Holder Wallet Address"]: e.target.value,
                          });
                        }}
                        crossOrigin={undefined}
                        required={true}
                      />
                      <Input
                        className="focus:ring-0 "
                        size="lg"
                        label="SBT Address"
                        value={formData["SBT Address"]}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            ["SBT Address"]: e.target.value,
                          });
                        }}
                        required={true}
                        crossOrigin={undefined}
                      />
                      <Input
                        className="focus:ring-0 "
                        size="lg"
                        label="Document/Token ID"
                        value={formData["Document/Token ID"]}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            ["Document/Token ID"]: e.target.value,
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
            {transactionStatus == "success" && (
              <Alert icon={<SuccessIcon />} color="green">
                Transaction Succesful
              </Alert>
            )}
            {transactionStatus == "error" && (
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
