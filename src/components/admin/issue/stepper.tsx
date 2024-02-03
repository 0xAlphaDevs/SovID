"use client";
import React, { use } from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import SbtCard from "./sbt-card";
import FillSbtDetails from "./fill-sbt-details";
import { sbts } from "@/constants/sbt";

interface Sbt {
  sbtName: string;
  sbtSymbol: string;
  sbtAddress: string;
  active: boolean;
}

export default function StepperIssueSbt({
  tokenName,
  tokenAddress,
}: {
  tokenName: string | null;
  tokenAddress: string | null;
}) {
  // const allowedSbtsList = useRecoilValue(allowedSbtsState);

  const ALL_SBTS: Sbt[] = Object.keys(sbts).map((key) => {
    return {
      sbtName: sbts[key].sbtName,
      sbtSymbol: sbts[key].sbtSymbol,
      sbtAddress: sbts[key].sbtAddress,
      active: sbts[key].active,
    };
  });

  let ALLOWED_SBTS = ALL_SBTS;

  console.log("ALLOWED_SBTS", ALLOWED_SBTS);

  // React.useEffect(() => {
  //   console.log("rerendered");
  //   console.log(ALLOWED_SBTS);
  //   ALLOWED_SBTS = ALL_SBTS.filter((sbt: Sbt) => {
  //     return allowedSbtsArray.includes(sbt.sbtAddress);
  //   });
  // }, [allowedSbtsList]);

  let currentStep = 0;

  if (tokenName) {
    currentStep = 1;
  }

  const [activeStep, setActiveStep] = React.useState(currentStep);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  // selected token
  const [selectedToken, setSelectedToken] = React.useState(tokenName);
  // selected token address
  const [selectedTokenAddress, setSelectedTokenAddress] =
    React.useState(tokenAddress);

  // sbtdata
  // const [sbtData, setSbtData] = React.useState({});

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  function issueCredential() {
    // check if data is correct and not empty
    // initiate transaction
  }

  return (
    <div className="w-full px-24 py-4">
      <Stepper
        placeholder=""
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step placeholder="">
          <UserIcon className="h-5 w-5" />
          <div className="absolute -bottom-[2.5rem] w-max text-center">
            <Typography
              placeholder=""
              variant="h6"
              color={activeStep === 0 ? "blue-gray" : "gray"}
            >
              Select Token
            </Typography>
          </div>
        </Step>
        <Step placeholder="">
          <CogIcon className="h-5 w-5" />
          <div className="absolute -bottom-[2.5rem] w-max text-center">
            <Typography
              placeholder=""
              variant="h6"
              color={activeStep === 1 ? "blue-gray" : "gray"}
            >
              Fill Token details
            </Typography>
          </div>
        </Step>
      </Stepper>

      <div className="mt-16">
        {activeStep === 0 && (
          <div className="flex flex-col items-center">
            <Typography placeholder="" variant="h5">
              Select Token
            </Typography>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 w-full">
              {/* Map allowed SBTs for organization 🟡*/}
              {ALLOWED_SBTS.map((sbt) => (
                <SbtCard
                  tokenName={sbt.sbtSymbol}
                  tokenAddress={sbt.sbtAddress}
                  description={sbt.sbtName}
                  selectedToken={selectedToken}
                  selectedClass={
                    selectedToken == sbt.sbtSymbol
                      ? "border-4 border-blue-500 bg-blue-50"
                      : ""
                  }
                  handleSelect={(token: string) => {
                    setSelectedToken(token);
                    setSelectedTokenAddress(sbt.sbtAddress);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {activeStep === 1 && (
          <div className="flex flex-col items-center">
            <Typography placeholder="" variant="h5">
              Fill details
            </Typography>
            <FillSbtDetails
              tokenName={selectedToken?.toString() || ""}
              tokenAddress={selectedTokenAddress?.toString() || ""}
            />
          </div>
        )}
      </div>
      <div className="my-10 flex justify-between">
        <Button
          placeholder=""
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handlePrev}
          disabled={isFirstStep}
        >
          Prev
        </Button>
        {activeStep === 1 ? (
          <></>
        ) : (
          <Button
            placeholder=""
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleNext}
            disabled={isLastStep || !selectedToken}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
