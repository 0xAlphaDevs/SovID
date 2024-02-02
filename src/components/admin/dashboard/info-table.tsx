"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
// import { RequestModal } from "./requestModal";
// import { useRecoilValue } from "recoil";
// import { allowedSbtsState } from "@/atoms/allowedSbts";
import { sbts } from "@/constants/sbt";

const TABS = [
  {
    label: "Allowed",
    value: "allowed",
  },
  {
    label: "All",
    value: "all",
  },
];

const TABLE_HEAD_ALLOWED = ["SBT Name", "SBT Symbol", "Status", ""];
const TABLE_HEAD_ALL = ["SBT Name", "SBT Symbol", "Status", ""];

interface Sbt {
  sbtName: string;
  sbtSymbol: string;
  sbtAddress: string;
  active: boolean;
}

export function SbtInfoTable() {
  //   const allowedSbtsList = useRecoilValue(allowedSbtsState);

  // console.log("allowedSbtsList", allowedSbtsList);

  const ALL_SBTS: Sbt[] = Object.keys(sbts).map((key) => {
    return {
      sbtName: sbts[key].sbtName,
      sbtSymbol: sbts[key].sbtSymbol,
      sbtAddress: sbts[key].sbtAddress,
      active: sbts[key].active,
    };
  });

  //   let allowedSbtsArray: string[] = allowedSbtsList;

  //   const ALLOWED_SBTS = ALL_SBTS.filter((sbt: Sbt) => {
  //     return allowedSbtsArray.includes(sbt.sbtAddress);
  //   });
  //   const [allowedSbts, setAllowedSbts] = useState(ALLOWED_SBTS);

  const [tooltipContent, setTooltipContent] = useState("Copy Address");

  //   useEffect(() => {
  //     // console.log("rerendered");

  //     setAllowedSbts(ALLOWED_SBTS);
  //   }, [allowedSbtsList]);

  useEffect(() => {
    console.log("rerendered");
  }, []);

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
        placeholder=""
        floated={false}
        shadow={false}
        className="rounded-none"
      >
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography placeholder="" variant="h5" color="blue-gray">
              Allowed SBTs
            </Typography>
            <Typography
              placeholder=""
              color="gray"
              className="mt-1 font-normal"
            >
              List of all soul-bound tokens (SBTs) that can be issued by
              Organization
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            {/* <Button color="blue" className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Request new
              SBT
            </Button> */}
          </div>
        </div>
      </CardHeader>

      <CardBody placeholder="" className="overflow-none px-0">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="allowed" className="w-full md:w-full">
            <TabsHeader placeholder="" className="w-80 ml-8">
              {TABS.map(({ label, value }) => (
                <Tab placeholder="" key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>

            <TabsBody placeholder="">
              {TABS.map(({ value }) => (
                <TabPanel key={value} value={value}>
                  {/* Add table here */}
                  {/* {value === "allowed"
                    ? AllowedSbtTable(allowedSbts, tooltipContent, copyAddress)
                    : AllSbtTable(
                        ALL_SBTS,
                        allowedSbtsList,
                        tooltipContent,
                        copyAddress
                      )} */}
                  will fill after the state management through recoil
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
      </CardBody>
    </Card>
  );
}

// Allowed Sbt table
function AllowedSbtTable(
  allowedSbts: Array<any>,
  tooltipContent: any,
  copyAddress: any
) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAllowedRows, setFilteredAllowedRows] = useState(allowedSbts);

  // console.log("allowedSbts in table", allowedSbts);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredAllowedRows(allowedSbts);
    } else {
      const filtered = allowedSbts.filter((row) =>
        row.sbtName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAllowedRows(filtered);
    }
  }, [searchTerm]);

  useEffect(() => {
    setFilteredAllowedRows(allowedSbts);
  }, [allowedSbts]);

  const handleClick = (sbtSymbol: any, sbtAddress: any) => {
    // replace hard coded string with sbt name
    router.push(`/issue/?tokenName=${sbtSymbol}&tokenAddress=${sbtAddress}`);
  };

  return (
    <div className="">
      <div className="w-full md:w-72 float-right mb-8">
        {/* Apply Logic 🟡🟡 */}
        <Input
          label="Search"
          className="focus:ring-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          crossOrigin={undefined}
        />
      </div>
      <table className="mt-4 w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD_ALLOWED.map((head, index) => (
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
                  {index !== TABLE_HEAD_ALLOWED.length - 1 && (
                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                  )}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredAllowedRows.length === 0 ? (
            <>
              <div className="justify-center w-full m-4">No data found</div>
            </>
          ) : (
            filteredAllowedRows.map(
              ({ sbtName, sbtSymbol, sbtAddress, active }, index) => {
                const isLast = index === filteredAllowedRows.length - 1;
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
                      <div className="flex items-center gap-3">
                        {/* <Avatar src={img} alt={name} size="sm" /> */}
                        <div className="flex flex-col">
                          <Typography
                            placeholder=""
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {sbtSymbol}
                          </Typography>
                        </div>
                      </div>
                    </td>

                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={active ? "Active" : "Inactive"}
                          color={active ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>

                    <td className={classes}>
                      {/* <Tooltip content="Issue this token"> */}
                      <Button
                        placeholder=""
                        color="green"
                        disabled={!active}
                        onClick={() => handleClick(sbtSymbol, sbtAddress)}
                      >
                        Issue {sbtSymbol}
                      </Button>
                      {/* </Tooltip> */}
                    </td>
                  </tr>
                );
              }
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

// all sbt table
function AllSbtTable(
  allSbts: Array<any>,
  allowedSbts: Array<any>,
  tooltipContent: any,
  copyAddress: any
) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAllRows, setFilteredAllRows] = useState(allSbts);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredAllRows(allSbts);
    } else {
      const filtered = allSbts.filter((row) =>
        row.sbtName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAllRows(filtered);
    }
  }, [searchTerm]);

  function isAllowedToIssue(sbtAddress: string) {
    console.log("allowedSbts", allowedSbts);
    console.log("sbtAddress", sbtAddress);

    return allowedSbts.includes(sbtAddress);
  }

  return (
    <>
      <div className="w-full md:w-72 float-right mb-8">
        {/* Apply Logic 🟡🟡 */}
        <Input
          label="Search"
          className="focus:ring-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          crossOrigin={undefined}
        />
      </div>
      <table className="mt-4 w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD_ALL.map((head, index) => (
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
                  {index !== TABLE_HEAD_ALLOWED.length - 1 && (
                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                  )}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredAllRows.length === 0 ? (
            <>
              <div className="justify-center w-full m-4">No data found</div>
            </>
          ) : (
            filteredAllRows.map(({ sbtName, sbtSymbol, sbtAddress }, index) => {
              const active = isAllowedToIssue(sbtAddress);
              const isLast = index === filteredAllRows.length - 1;
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
                    <div className="flex items-center gap-3">
                      {/* <Avatar src={img} alt={name} size="sm" /> */}
                      <div className="flex flex-col">
                        <Typography
                          placeholder=""
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {sbtSymbol}
                        </Typography>
                      </div>
                    </div>
                  </td>

                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={
                          active ? "Allowed to Issue" : "Not allowed to Issue"
                        }
                        color={active ? "green" : "red"}
                      />
                    </div>
                  </td>

                  <td className={classes}>
                    {/* <RequestModal
                      allowedToIssue={active}
                      sbtSymbol={sbtSymbol}
                      sbtAddress={sbtAddress}
                    /> */}
                    {/* <Tooltip content="Issue this token"> */}
                    {/* <Button
                        color="green"
                        disabled={!active}
                        onClick={handleClick}
                      >
                        Issue {sbtSymbol}
                      </Button> */}
                    {/* </Tooltip> */}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </>
  );
}
