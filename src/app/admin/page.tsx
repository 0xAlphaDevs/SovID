"use client";

import React, { useEffect } from "react";
import AdminNavbar from "@/components/admin/navbar";
import { useContractRead } from "wagmi";
import { authorizedUserTokenContractConfig } from "@/lib/contracts";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { ConnectKitButton } from "connectkit";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

const Admin = () => {
  const { address, isDisconnected } = useAccount();
  const router = useRouter();

  React.useEffect(() => {
    if (address) {
      router.push("/admin/dashboard");
    }
  }, [address]);

  return (
    <>
      {isDisconnected && (
        <>
          <AdminNavbar />
          <div className="text-center">
            {" "}
            <Card className="mt-6 mx-20" placeholder="">
              <CardBody placeholder="">
                <Typography
                  placeholder=""
                  variant="h5"
                  color="blue-gray"
                  className="mb-2"
                >
                  Hello there 👋
                </Typography>
                <Typography placeholder="">
                  If you are an User, Connect your wallet to get started.
                  <br />
                  <br />
                  In case you are a User,{" "}
                  <a href="/user" className="cursor-pointer underline">
                    Click here
                  </a>{" "}
                  to got to user dashboard.
                </Typography>
              </CardBody>
              <CardFooter className="pt-0 flex justify-center" placeholder="">
                <ConnectKitButton />
              </CardFooter>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default Admin;
