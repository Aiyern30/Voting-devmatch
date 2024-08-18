"use client";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import Header from "@/components/ui/Components/Header";
import { Input } from "@/components/ui/Input";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [passcode, setPasscode] = useState("");
  const router = useRouter();

  const handleButtonClick = (number: string) => {
    setPasscode((prev) => prev + number);
  };

  const handleEnterClick = () => {
    if (passcode === "1234") {
      router.push("/Voter/Vote-Attendees");
    } else {
      alert("Incorrect Passcode. Please try again.");
    }
    setPasscode("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <Card className="bg-[#C39898] border-[#987070] w-[600px]">
          <CardHeader>
            <CardTitle className="text-white text-center">Passcode</CardTitle>
            <CardDescription className="mx-auto w-full flex justify-center">
              <Input
                value={passcode}
                readOnly
                className="text-center bg-white text-black w-[360px] rounded-xl"
              />
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((number) => (
              <div className="mx-auto" key={number}>
                <Button
                  className="rounded-full bg-[#D9D9D9] text-black text-xl w-16 h-16"
                  onClick={() => handleButtonClick(number)}
                >
                  {number}
                </Button>
              </div>
            ))}
            <div className="col-span-3 flex justify-center">
              <Button
                className="rounded-full bg-[#D9D9D9] text-black text-xl w-16 h-16"
                onClick={() => handleButtonClick("0")}
              >
                0
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center mt-4">
            <Button
              className="rounded-full bg-[#D9D9D9] text-black text-xl px-8 py-6 hover:bg-white"
              onClick={handleEnterClick}
            >
              Enter
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Page;
