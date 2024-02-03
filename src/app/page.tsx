"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ConnectKitButton } from "connectkit";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import HomeNavbar from "@/components/navbar";
import { useAccount, useContractRead } from "wagmi";
import { authorizedUserTokenContractConfig } from "@/lib/contracts";

const Admin = () => {
  const { address, isDisconnected } = useAccount();
  const router = useRouter();
  const [isUnregistered, setIsUngistered] = useState(false);

  const { error, isLoading, isSuccess } = useContractRead({
    ...authorizedUserTokenContractConfig,
    functionName: "getVerifiedUserMetadata",
    args: [address],
    onSuccess: (data: any) => {
      if (data?.userName === "") {
        // router.push("/");
        setIsUngistered(true);
      } else if (data?.category === "individual") {
        router.push("/user/dashboard");
      } else router.push("/admin/dashboard");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <>
      {address && (
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
                </Typography>
              </CardBody>
              <CardFooter className="pt-0 flex justify-center" placeholder="">
                <ConnectKitButton />
              </CardFooter>
            </Card>
          </div>
          {isUnregistered && (
            <Card placeholder="" className="mt-6 mx-20 py-8">
              <Typography
                placeholder=""
                variant="h5"
                color="blue-gray"
                className="mb-2"
              >
                Register as
              </Typography>
              <div>
                <Button
                  placeholder=""
                  onClick={() => {
                    router.push("/user");
                  }}
                >
                  User
                </Button>
                <Button
                  placeholder=""
                  className="ml-8"
                  onClick={() => {
                    router.push("/admin");
                  }}
                >
                  Admin
                </Button>
              </div>
            </Card>
          )}
        </>
      )}
    </>
  );
};

export default Admin;
