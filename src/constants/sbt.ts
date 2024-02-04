import { authorizedUserTokenABI } from "@/lib/abi/authorizedUserTokenAbi";
import { educationalIdContractABI } from "@/lib/abi/educationalIdAbi";
import { employeeIdContractABI } from "@/lib/abi/employeeIdAbi";
import { nationalIdContractABI } from "@/lib/abi/nationalIdAbi";
import { passportIdContractABI } from "@/lib/abi/passportIdAbi";

export const sbts: { [key: string]: any } = {
  AUTH: {
    sbtSymbol: "AUTH",
    sbtName: "AuthorizedUser Token",
    sbtAddress: "0x6FB9EB6826B0978510E6d2F7623c3bC9A3dC9627",
    sbtFields: [
      { title: "User Name", type: "string" },
      { title: "Category", type: "string" },
      { title: "Allowed SBTs", type: "string" },
    ],
    abi: authorizedUserTokenABI,
    active: true,
  },
  EDU: {
    sbtSymbol: "EDU",
    sbtName: "Educational ID",
    sbtAddress: "0x3DaA9b9f3Ba4A5828473075CE68C704FEC124E73",
    sbtFields: [
      { title: "Holder Name", type: "string" },
      { title: "Institution", type: "string" },
      { title: "Course", type: "string" },
      { title: "Year Of Passing", type: "number" },
      { title: "Grade", type: "string" },
    ],
    abi: educationalIdContractABI,
    active: true,
  },
  EMP: {
    sbtSymbol: "EMP",
    sbtName: "Employee ID",
    sbtAddress: "0x456A103F7B5b8A5401a99eF244029b8C67c2BE78",
    sbtFields: [
      { title: "ID", type: "number" },
      { title: "Employee Name", type: "string" },
      { title: "Position", type: "string" },
      { title: "Date Of Joining", type: "date" },
    ],
    abi: employeeIdContractABI,
    active: true,
  },
  SSN: {
    sbtSymbol: "SSN",
    sbtName: "National ID",
    sbtAddress: "0x4612869797A1F8Ec40d5fC12FE17519674dAcf30",
    sbtFields: [
      { title: "ID", type: "number" },
      { title: "Holder Name", type: "string" },
      { title: "Gender", type: "string" },
      { title: "Date Of Birth", type: "date" },
    ],
    abi: nationalIdContractABI,
    active: true,
  },
  PID: {
    sbtSymbol: "PID",
    sbtName: "Passport ID",
    sbtAddress: "0x8dc7202c27De1d423AE8011F898Ca172AF28B762",
    sbtFields: [
      { title: "Passport Number", type: "string" },
      { title: "Holder Name", type: "string" },
      { title: "Nationality", type: "string" },
      { title: "Date Of Birth", type: "date" },
      { title: "Gender", type: "string" },
      { title: "Place Of Issue", type: "string" },
      { title: "Date Of Expiry", type: "date" },
    ],
    abi: passportIdContractABI,
    active: true,
  },
};
