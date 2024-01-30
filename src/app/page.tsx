"use client";
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
            <Link href="/user">
              <div className="p-4 border border-black rounded-lg shadow-lg inline-block cursor-pointer">
                User
              </div>
            </Link>
            <Link href="/admin">
              <div className="p-4 border border-black rounded-lg shadow-lg inline-block cursor-pointer">
                Admin
              </div>
            </Link>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
