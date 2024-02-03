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

export function DialogWithForm() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <Button placeholder="" onClick={handleOpen}>
        Sign In
      </Button>
      <Dialog
        placeholder=""
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card placeholder="" className="mx-auto w-full max-w-[24rem]">
          <CardBody placeholder="" className="flex flex-col gap-4">
            <Typography placeholder="" variant="h4" color="blue-gray">
              Sign In
            </Typography>
            <Typography
              placeholder=""
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter your email and password to Sign In.
            </Typography>
            <Typography placeholder="" className="-mb-2" variant="h6">
              Your Email
            </Typography>
            <Input crossOrigin="" label="Email" size="lg" />
            <Typography placeholder="" className="-mb-2" variant="h6">
              Your Password
            </Typography>
            <Input label="Password" size="lg" crossOrigin="" />
            <div className="-ml-2.5 -mt-3">
              <Checkbox crossOrigin="" label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter placeholder="" className="pt-0">
            <Button
              placeholder=""
              variant="gradient"
              onClick={handleOpen}
              fullWidth
            >
              Sign In
            </Button>
            <Typography
              placeholder=""
              variant="small"
              className="mt-4 flex justify-center"
            >
              Don&apos;t have an account?
              <Typography
                placeholder=""
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={handleOpen}
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
