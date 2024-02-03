import React, { use } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useContractRead } from "wagmi";
import { sbts } from "@/constants/sbt";

interface ViewModalProps {
  sbtName: string;
  sbtSymbol: string;
  sbtAddress: `0x${string}`;
  tokenId: string;
}

export function ViewModal({
  sbtName,
  sbtSymbol,
  sbtAddress,
  tokenId,
}: ViewModalProps) {
  const [open, setOpen] = React.useState(false);

  const { data, isRefetching, refetch } = useContractRead({
    address: sbtAddress, // Fix: Prefix sbtAddress with '0x'
    abi: sbts["EDU"].abi,
    functionName: "verifyCredential",
    args: [tokenId],
    onSuccess: (data: any) => {
      console.log(data);
    },
  });

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        color="green"
        variant="gradient"
        placeholder=""
      >
        View
      </Button>
      <Dialog open={open} handler={handleOpen} placeholder="">
        <DialogHeader
          className="flex justify-center items-center"
          placeholder=""
        >
          {sbtName}
        </DialogHeader>
        <DialogBody placeholder="">
          <div className="bg-green-200 w-96 p-8 rounded-lg shadow-xl max-w-sm mx-auto border deep-purple-700">
            <ul>
              {/* {data?.Object.keys(data).map((field: string) => (
                <li key={field}>
                  <strong>
                    {field} : {String(data?.[field])}
                  </strong>{" "}
                
                </li>
              ))} */}
            </ul>
          </div>
        </DialogBody>
        <DialogFooter placeholder="">
          <Button
            variant="gradient"
            color="green"
            onClick={handleOpen}
            fullWidth
            placeholder=""
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
