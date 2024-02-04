"use client";
import React, { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  Tooltip,
} from "@material-tailwind/react";
import { ViewModal } from "./view-modal";
import { sbts } from "@/constants/sbt";
import { useAccount, useContractReads } from "wagmi";

const TABLE_HEAD = ["Credential Name", "Credential Symbol", "Token ID", ""];

export function InfoTable() {
  const { address } = useAccount();
  const [filteredRows, setFilteredRows] = useState([]);
  const [walletSbts, setWalletSbts] = useState([]);
  const [tooltipContent, setTooltipContent] = useState("Copy Address");

  const { data, isSuccess, isLoading } = useContractReads({
    contracts: [
      {
        address: sbts.EDU.sbtAddress,
        abi: sbts.EDU.abi,
        functionName: "getTokenIdsByWallet",
        args: [],
      },
      {
        address: sbts.EMP.sbtAddress,
        abi: sbts.EMP.abi,
        functionName: "getTokenIdsByWallet",
        args: [],
      },
      {
        address: sbts.SSN.sbtAddress,
        abi: sbts.SSN.abi,
        functionName: "getTokenIdsByWallet",
        args: [],
      },
      {
        address: sbts.PID.sbtAddress,
        abi: sbts.PID.abi,
        functionName: "getTokenIdsByWallet",
        args: [],
      },
    ],
    onSuccess: (data: any) => {
      console.log("Queried SBTS", data);

      let allWalletSbts: any = [];

      let educationIdSbts = data[0].result;
      let employeeIdSbts = data[1].result;
      let nationalIdSbts = data[2].result;
      let passportIdSbts = data[3].result;

      educationIdSbts.forEach((sbt: any) => {
        allWalletSbts.push({
          sbtName: sbts.EDU.sbtName,
          sbtSymbol: sbts.EDU.sbtSymbol,
          sbtAddress: sbts.EDU.sbtAddress,
          tokenId: sbt,
        });
      });

      employeeIdSbts.forEach((sbt: any) => {
        allWalletSbts.push({
          sbtName: sbts.EMP.sbtName,
          sbtSymbol: sbts.EMP.sbtSymbol,
          sbtAddress: sbts.EMP.sbtAddress,
          tokenId: sbt,
        });
      });

      nationalIdSbts.forEach((sbt: any) => {
        allWalletSbts.push({
          sbtName: sbts.SSN.sbtName,
          sbtSymbol: sbts.SSN.sbtSymbol,
          sbtAddress: sbts.SSN.sbtAddress,
          tokenId: sbt,
        });
      });

      passportIdSbts.forEach((sbt: any) => {
        allWalletSbts.push({
          sbtName: sbts.PID.sbtName,
          sbtSymbol: sbts.PID.sbtSymbol,
          sbtAddress: sbts.PID.sbtAddress,
          tokenId: sbt,
        });
      });

      console.log("ALL SBTS", allWalletSbts);
      setWalletSbts(allWalletSbts);
      setFilteredRows(allWalletSbts);
    },
  });

  function copyAddress(address: string) {
    navigator.clipboard.writeText(address);
    setTooltipContent("Address Copied!");
    setTimeout(() => {
      setTooltipContent("Copy Address");
    }, 2000);
  }

  return (
    <Card className="h-full w-full" placeholder="">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none"
        placeholder=""
      >
        <div className="mb-0 flex items-center justify-between gap-4">
          <div>
            <Typography variant="h5" color="blue-gray" placeholder="">
              Owned Credentials / SBTs
            </Typography>
            <Typography
              color="gray"
              className="mt-1 font-normal"
              placeholder=""
            >
              List of all soul-bound tokens (SBTs) that you hold.
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-none px-0" placeholder="">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    placeholder=""
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.length == 0 ? (
              <>
                <div className="w-full m-4">No data found</div>
              </>
            ) : (
              filteredRows.map(
                ({ sbtName, sbtSymbol, sbtAddress, tokenId }, index) => {
                  const isLast = index === walletSbts.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={sbtName}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          {/* <Avatar src={img} alt={name} size="sm" /> */}
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                              placeholder=""
                            >
                              {sbtName}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                              placeholder=""
                            >
                              {String(sbtAddress).substring(0, 6) +
                                "..." +
                                String(sbtAddress).substring(
                                  String(sbtAddress).length - 6
                                )}
                              {/* Add a span of copy icon here 🟢*/}
                              <Tooltip content={tooltipContent}>
                                <span
                                  onClick={() => {
                                    copyAddress(sbtAddress);
                                  }}
                                  className="inline-flex ml-1 h-[15px] cursor-pointer"
                                >
                                  <DocumentDuplicateIcon />
                                </span>
                              </Tooltip>
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="black"
                            className="font-bold"
                            placeholder=""
                          >
                            {sbtSymbol}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="black"
                            className="font-bold"
                            placeholder=""
                          >
                            {String(tokenId)}
                          </Typography>
                        </div>
                      </td>

                      <td className={classes}>
                        <div className="flex flex-col">
                          <ViewModal
                            sbtName={sbtName}
                            sbtSymbol={sbtSymbol}
                            tokenId={tokenId}
                            sbtAddress={sbtAddress}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                }
              )
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
