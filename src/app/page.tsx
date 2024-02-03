"use client";
import { AdminForm } from "@/components/admin-form";
import { UserForm } from "@/components/user-form";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import Link from "next/link";

import React from "react";

export default function Homepage() {
  return (
    <>
      <Card className="mt-6 w-96 flex flex-col justify-around" placeholder="">
        <p className="flex justify-center">Are you a user or Admin?</p>
        <CardBody placeholder="">
          <div className="flex justify-around">
            <Link href="">
              <UserForm />
            </Link>
            <Link href="">
              <AdminForm />
            </Link>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
