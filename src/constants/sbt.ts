import { educationalIdContractABI } from "@/lib/abi/educationalIdAbi";
import { employeeIdContractABI } from "@/lib/abi/employeeIdAbi";
import { nationalIdContractABI } from "@/lib/abi/nationalIdAbi";
import { passportIdContractABI } from "@/lib/abi/passportIdAbi";

export const sbts: { [key: string]: any } = {
  AUTH: {
    sbtSymbol: "AUTH",
    sbtName: "AuthorizedUser Token",
    sbtAddress: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
    sbtFields: [
      { title: "User Name", type: "string" },
      { title: "Category", type: "string" },
      { title: "Allowed SBTs", type: "string" },
    ],
    active: true,
  },
  EDU: {
    sbtSymbol: "EDU",
    sbtName: "Educational ID",
    sbtAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
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
    sbtAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
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
    sbtAddress: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
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
    sbtAddress: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
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
