"use client";

import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { ConnectKitButton } from "connectkit";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import HomeNavbar from "@/components/navbar";

const Admin = () => {
  const { address, isDisconnected } = useAccount();
  const router = useRouter();

  React.useEffect(() => {
    if (address) {
      router.push("/");
    }
  }, [address]);

  return (
    <>
      {isDisconnected && (
        <>
          <HomeNavbar />
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
                  Connect your wallet to get started.
                  <br />
                  <br />
                  {/* In case you are a User,{" "}
                  <a href="/user" className="cursor-pointer underline">
                    Click here
                  </a>{" "}
                  to go to user dashboard. */}
                </Typography>
                {/* <Typography placeholder="">
                  <br />
                  In case you are an Admin,{" "}
                  <a href="/user" className="cursor-pointer underline">
                    Click here
                  </a>{" "}
                  to go to admin dashboard.
                </Typography> */}
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
