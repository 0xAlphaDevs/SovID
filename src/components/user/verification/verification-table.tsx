"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { sbts } from "@/constants/sbt";
import { useContractReads } from "wagmi";

const TABLE_HEAD = ["Requested by", "Requested Credential", "Status", ""];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    userName: "Vitalik",
    requestedBy: "0xb8b39ed3BebE64f835463Cb8b9F046cB827F90f1",
    sbtName: "Passport ID (PID)",
    sbtAddress: "0xb8b39ed3BebE64f835463Cb8b9F046cB827F90f7",
    online: true,
    status: "Pending",
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    userName: "Harsh Tyagi",
    requestedBy: "0xb8b39ed3BebE64f835463Cb8b9F046cB827F90f2",
    sbtName: "Employee ID (EMP)",
    sbtAddress: "0xb8b39ed3BebE64f835463Cb8b9F046cB827F90f8",
    online: false,
    status: "Accepted",
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    userName: "Yashasvi Chaudhary",
    requestedBy: "0xb8b39ed3BebE64f835463Cb8b9F046cB827F90f3",
    sbtName: "National ID (SSN)",
    sbtAddress: "0xb8b39ed3BebE64f835463Cb8b9F046cB827F90f9",
    online: false,
    status: "Rejected",
    date: "19/09/17",
  },
];

interface VerificationRequest {
  img: string;
  userName: string;
  requestedBy: string;
  sbtName: string;
  sbtAddress: string;
  online: boolean;
  status: string;
}

export default function VerificationRequestsTable({
  requestVerification,
}: any) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [verificationRequests, setVerificationRequests] = useState<
    VerificationRequest[]
  >([]);
  const [filteredRows, setFilteredRows] = useState<VerificationRequest[]>([]);
  const [tooltipContent, setTooltipContent] = useState("Copy Address");

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredRows(verificationRequests);
    } else {
      let filtered = verificationRequests.filter((row) =>
        row.requestedBy.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRows(filtered);
    }
  }, [searchTerm]);

  const { data, isSuccess, isLoading } = useContractReads({
    contracts: [
      {
        address: sbts.EDU.sbtAddress,
        abi: sbts.EDU.abi,
        functionName: "getVerificationRequestsForUser",
        args: [],
      },
      {
        address: sbts.EMP.sbtAddress,
        abi: sbts.EMP.abi,
        functionName: "getVerificationRequestsForUser",
        args: [],
      },
      {
        address: sbts.SSN.sbtAddress,
        abi: sbts.SSN.abi,
        functionName: "getVerificationRequestsForUser",
        args: [],
      },
      {
        address: sbts.PID.sbtAddress,
        abi: sbts.PID.abi,
        functionName: "getVerificationRequestsForUser",
        args: [],
      },
    ],
    onSuccess: (data: any) => {
      console.log("verification Requests", data);

      let allSentRequests: any = [];

      let educationIdRequests = data[0].result;
      let employeeIdRequests = data[1].result;
      let nationalIdRequests = data[2].result;
      let passportIdRequests = data[3].result;

      educationIdRequests.forEach((request: any) => {
        allSentRequests.push({
          img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
          requestedBy: request.requestedBy,
          sbtName: request.sbtName,
          sbtAddress: request.sbtAddress,
          online: true,
          status: request.status,
        });
      });

      employeeIdRequests.forEach((request: any) => {
        allSentRequests.push({
          img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
          requestedBy: request.requestedBy,
          sbtName: request.sbtName,
          sbtAddress: request.sbtAddress,
          online: false,
          status: request.status,
        });
      });

      nationalIdRequests.forEach((request: any) => {
        allSentRequests.push({
          img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
          requestedBy: request.requestedBy,
          sbtName: request.sbtName,
          sbtAddress: request.sbtAddress,
          online: false,
          status: request.status,
        });
      });

      passportIdRequests.forEach((request: any) => {
        allSentRequests.push({
          img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
          requestedBy: request.requestedBy,
          sbtName: request.sbtName,
          sbtAddress: request.sbtAddress,
          online: false,
          status: request.status,
        });
      });

      setVerificationRequests(allSentRequests);
      setFilteredRows(allSentRequests);
    },
  });

  const handleClick = () => {
    // replace hard coded string with sbt userName
    // router.push(`https://www.google.com`);
  };

  function copyAddress(address: string) {
    navigator.clipboard.writeText(address);
    setTooltipContent("Address Copied!");
    setTimeout(() => {
      setTooltipContent("Copy Address");
    }, 2000);
  }

  return (
    <Card placeholder="" className="h-full w-full">
      <CardHeader
        placeholder=""
        floated={false}
        shadow={false}
        className="rounded-none"
      >
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography placeholder="" variant="h5" color="blue-gray">
              All Received Requests
            </Typography>
            <Typography
              placeholder=""
              color="gray"
              className="mt-1 font-normal"
            >
              Here are all the requests you have received for verification.
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input
              label="Search requester"
              className="focus:ring-0 "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              crossOrigin={undefined}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody placeholder="" className="overflow-none px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    placeholder=""
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
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
            {filteredRows.length === 0 ? (
              <>
                <div className="justify-center w-full m-4">No data found</div>
              </>
            ) : (
              filteredRows.map(
                (
                  {
                    img,
                    userName,
                    requestedBy: requestedBy,
                    sbtName,
                    sbtAddress,
                    status,
                  },
                  index
                ) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={userName}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            placeholder=""
                            src={img}
                            alt={userName}
                            size="sm"
                          />
                          <div className="flex flex-col">
                            {/* <Typography
                              placeholder=""
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {userName}
                            </Typography> */}
                            <Typography
                              placeholder=""
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {requestedBy.substring(0, 6) +
                                "..." +
                                requestedBy.substring(requestedBy.length - 6)}
                              {/* Add a span of copy icon here 🟡*/}
                              <Tooltip content={tooltipContent}>
                                <span
                                  onClick={() => {
                                    copyAddress(requestedBy);
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
                            placeholder=""
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {sbtName}
                          </Typography>
                          <Typography
                            placeholder=""
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {sbtAddress.substring(0, 6) +
                              "..." +
                              sbtAddress.substring(sbtAddress.length - 6)}
                            {/* Add a span of copy icon here 🟡 */}
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
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={
                              status == "Pending"
                                ? "Pending"
                                : status == "Approved"
                                ? "Approved"
                                : "Rejected"
                            }
                            color={
                              status == "Pending"
                                ? "yellow"
                                : status == "Approved"
                                ? "green"
                                : "red"
                            }
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Tooltip content="You can view this SBT">
                          <Button
                            placeholder=""
                            color="green"
                            onClick={handleClick}
                            disabled={!(status == "Pending")}
                          >
                            {status == "Pending" ? "Approve" : "-NA-"}
                          </Button>
                        </Tooltip>
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
