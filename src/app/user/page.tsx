"use client";

import { useAccount } from "wagmi";
import UserNavbar from "@/components/user/navbar";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ConnectKitButton } from "connectkit";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

const User = () => {
  const { address, isDisconnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    // Check if there is an address and the user is not disconnected
    if (address && !isDisconnected) {
      // Redirect to /user/dashboard
      router.push("/user/dashboard");
    }
  }, [address, isDisconnected, router]);

  return (
    <>
      {isDisconnected && (
        <>
          <UserNavbar />
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
                  In case you are a Organization,{" "}
                  <a href="/admin" className="cursor-pointer underline">
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

export default User;
