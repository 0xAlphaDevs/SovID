"use client";
import {
  CheckBadgeIcon,
  CheckCircleIcon,
  ClipboardIcon,
  DocumentDuplicateIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import { ViewfinderCircleIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  Chip,
} from "@material-tailwind/react";
import { useAccount, useEnsName, useContractRead } from "wagmi";
import { useState, useEffect, use } from "react";
import { authorizedUserTokenContractConfig } from "@/lib/contracts";

export function InfoCard() {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });

  const [walletAddress, setWalletAddress] = useState<any>(address);
  const [authToken, setAuthToken] = useState<any>({
    userName: "",
    category: "",
    allowedSBTs: [],
  });

  // state 🟢
  const [tooltipContent, setTooltipContent] = useState("Copy Wallet Address");

  // 🟢 - here is onClick function
  function copyAddress() {
    navigator.clipboard.writeText(String(address));
    setTooltipContent("Address Copied!");
    setTimeout(() => {
      setTooltipContent("Copy Wallet Address");
    }, 2000);
  }

  const { data, error, isLoading, isSuccess } = useContractRead({
    ...authorizedUserTokenContractConfig,
    functionName: "getVerifiedUserMetadata",
    args: [walletAddress],
    enabled: Boolean(walletAddress),
    onSuccess: (data) => {
      console.log("Queried Auth Token", data);
      setAuthToken(data);
    },
  });

  return (
    <Card
      color="white"
      variant="gradient"
      className="w-full  p-8"
      placeholder=""
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 "
        placeholder=""
      >
        <Typography
          placeholder=""
          variant="h1"
          color="gray"
          className="font-normal uppercase"
        >
          Welcome,{" "}
          <span className="text-blue-300 font-bold"> {authToken.userName}</span>
        </Typography>
        <Typography
          placeholder=""
          variant="h6"
          color="gray"
          className="font-normal uppercase flex gap-2"
        >
          Wallet Address :{" "}
          <span className="font-semibold text-blue-400">
            {ensName ?? address}
          </span>{" "}
          {/* Here is copy icon 🟢 */}
          <Tooltip content={tooltipContent}>
            <span
              onClick={copyAddress}
              className="inline-flex  h-[18px] cursor-pointer"
            >
              {tooltipContent === "Address Copied!" ? (
                <CheckCircleIcon />
              ) : (
                <DocumentDuplicateIcon />
              )}
            </span>
          </Tooltip>
          {/* <Chip size="lg" color="teal" value={authToken.category} /> */}
        </Typography>
        <Typography
          placeholder=""
          variant="h5"
          color="gray"
          className="font-normal flex gap-2 mt-2"
        >
          Industry / Category : {"   "}
          <Chip size="lg" color="teal" value={authToken.category} />
        </Typography>
      </CardHeader>
      <CardBody placeholder="" className="p-0">
        <ul className="flex flex-row gap-4 justify-around">
          <li className="flex items-center gap-4">
            <CheckBadgeIcon className="h-10 text-green-400" />
            <Typography placeholder="" className="font-semibold">
              Authorization Token Valid
            </Typography>
          </li>
          <li className="flex items-center gap-4">
            <IdentificationIcon className="h-10 text-green-400" />

            <Typography placeholder="" className="font-semibold inline-flex">
              <span className="text-3xl text-green-700">
                {authToken.allowedSBTs.length}
              </span>{" "}
              <span className="ml-2 mt-1">Allowed SBTs</span>
            </Typography>
          </li>
          <li className="flex items-center gap-4">
            <ViewfinderCircleIcon className="h-10 text-green-400" />

            <Typography placeholder="" className="font-semibold">
              Can create verification requests
            </Typography>
          </li>
        </ul>
      </CardBody>
    </Card>
  );
}
