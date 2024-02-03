import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Alert,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useState, useEffect } from "react";
import { authorizedUserTokenABI } from "@/lib/abi/authorizedUserTokenAbi";
import { DefaultSpinner } from "./admin/spinner";
import SuccessIcon from "@/components/icons/successIcon";
import ErrorIcon from "@/components/icons/errorIcon";

export function UserForm() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    userName: "",
  } as any);
  const handleOpen = () => setOpen((cur) => !cur);
  const handleClose = () => setOpen(false);

  const { config } = usePrepareContractWrite({
    address: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
    abi: authorizedUserTokenABI,
    functionName: "mintDefaultAuthSbtForTesting",
    args: [formData.userName, "individual", []],
  });
  const { write, data, error, isLoading, isError } = useContractWrite(config);

  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    write?.();
  };
  useEffect(() => {
    if (isSuccess) {
      router.push("/user");
    }
  }, [isSuccess, router]);

  return (
    <>
      <Button placeholder="" onClick={handleOpen}>
        User
      </Button>
      <Dialog
        placeholder=""
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card placeholder="" className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            placeholder=""
            className="flex justify-between bg-gray-900"
          >
            <Typography
              placeholder=""
              className=" text-white font-semibold p-2"
              variant="paragraph"
              color="gray"
            >
              Register Details
            </Typography>
            <Button
              placeholder=""
              className="p-2 m-2"
              onClick={handleClose}
              color="white"
            >
              X
            </Button>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            {isLoading ? (
              <div className="mt-8">
                <DefaultSpinner />
              </div>
            ) : (
              <>
                <CardBody placeholder="" className="flex flex-col gap-4">
                  <Typography placeholder="" className="-mb-2" variant="h6">
                    Your Name
                  </Typography>
                  <Input
                    crossOrigin=""
                    type="text"
                    placeholder="Your Name"
                    className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                    label="userName"
                    labelProps={{
                      className: "hidden",
                    }}
                    containerProps={{ className: "min-w-[100px]" }}
                    required={true}
                    value={formData.userName}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        userName: e.target.value,
                      });
                    }}
                  />
                </CardBody>
                <CardFooter placeholder="" className="pt-0">
                  <Button
                    placeholder=""
                    variant="gradient"
                    type="submit"
                    fullWidth
                  >
                    Register
                  </Button>
                </CardFooter>
              </>
            )}
          </form>
        </Card>
      </Dialog>
      <div className="fixed bottom-10 right-5">
        {isSuccess && (
          <Alert
            open={open}
            onClose={() => setOpen(false)}
            icon={<SuccessIcon />}
            color="green"
          >
            Credential Issued Successfully
          </Alert>
        )}

        {isError && (
          <Alert
            open={open}
            onClose={() => setOpen(false)}
            icon={<ErrorIcon />}
            color="red"
          >
            Oops! There was an error.
          </Alert>
        )}
      </div>
    </>
  );
}
