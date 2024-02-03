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
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";

export function UserForm() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const handleOpen = () => setOpen((cur) => !cur);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    router.push("/user");
  };

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
              required
            />
          </CardBody>
          <CardFooter placeholder="" className="pt-0">
            <Button
              placeholder=""
              variant="gradient"
              onClick={handleSubmit}
              fullWidth
            >
              Register
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
