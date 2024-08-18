"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import React, { useEffect, useState } from "react";
import Header from "@/components/ui/Components/HostHeader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { useRouter } from "next/navigation";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";
import { contract_reader, contract_writer } from "@/app/load_contract";

// import { v4 as uuidv4 } from "uuid";

type InputKey = "name" | "id" | "gender" | "position" | "email";

const Page = () => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  // const [candidateId, setCandidateId] = useState<string>(uuidv4()); // Generate a new ID initially
  const [cid, setCid] = useState<string | null>(null);
  const router = useRouter();
  const [input, setInput] = useState<{
    name: string;
    id: string;
    gender: string;
    position: string;
    email: string;
  }>({
    name: "",
    id: "",
    gender: "",
    position: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [id]: id === "id" ? parseInt(value) : value,
    }));
  };

  const handleGenderChange = (value: string) => {
    setInput((prevInput) => ({
      ...prevInput,
      gender: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      candidateid: input.id,
      candidateName: input.name,
      candidateGender: input.gender,
      candidatePosition: input.position,
      candidateEmail: input.email,
    };

    try {
      // Check if contract_writer is not null or undefined
      if (!contract_writer) {
        setSubmitError(
          "Contract writer is not available. Please try again later."
        );
        setTimeout(() => {
          setSubmitError(null);
        }, 3000);
        return; // Stop further execution
      }

      // Attempt to add the candidate
      await contract_writer.addCandidate(input.name, input.id);

      // If addCandidate is successful, proceed with the API call
      const response = await fetch("/api/setCandidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "register", formData }),
      });

      if (response.ok) {
        const data = await response.json();
        setSubmitSuccess("Submit successful!");
        setSubmitError(null);

        setTimeout(() => {
          router.push("/Login/OwnerHomepage/CandidateList");
        }, 3000);
      } else {
        const data = await response.json();
        setSubmitError(data.message);
        setTimeout(() => {
          setSubmitError(null);
        }, 3000);
      }
    } catch (error) {
      // Log the entire error object to the console for debugging
      console.error("Detailed error information:", error);

      // Determine if the error is an instance of Error
      if (error instanceof Error) {
        // Handle known errors
        if (error.message.includes("Candidate Existed")) {
          setSubmitError("Candidate ID already exists.");
        } else {
          setSubmitError(
            "An error occurred while adding the candidate. Please try again."
          );
        }
      } else if (typeof error === "object" && error !== null) {
        // Handle errors that are objects but not instances of Error
        const errorMessage =
          (error as any).message ||
          "An unknown error occurred. Please try again.";
        setSubmitError(errorMessage);
      } else {
        // Handle unknown error types
        setSubmitError("An unknown error occurred. Please try again.");
      }

      setTimeout(() => {
        setSubmitError(null);
      }, 3000);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex h-full top-12 justify-center items-center bg-transparent shadow-none relative">
        <Card className="bg-white border border-gray-200 shadow-lg rounded-lg">
          {submitError && (
            <Alert className="mb-4 bg-red-200">
              <AlertTitle>Oops!</AlertTitle>
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}
          {submitSuccess && (
            <Alert className="mb-4 bg-green-200">
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>{submitSuccess}</AlertDescription>
            </Alert>
          )}

          <CardContent className="p-8">
            <h1 className="text-2xl font-bold mb-6 text-center">
              Candidate Registration
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-4 text-lg font-medium">
                {[
                  {
                    label: "Name",
                    type: "text",
                    placeholder: "Enter your name",
                  },
                  {
                    label: "id",
                    type: "number",
                    placeholder: "Enter your ID",
                  },
                ].map(({ label, type, placeholder }, index) => (
                  <div key={index} className="flex w-full items-center gap-3">
                    <Label
                      htmlFor={label.toLowerCase()}
                      className="w-32 text-lg font-medium"
                    >
                      {label}:
                    </Label>
                    <Input
                      type={type}
                      id={label.toLowerCase()}
                      placeholder={placeholder}
                      className="flex-1"
                      // value={input[label.toLowerCase() as InputKey]}
                      onChange={handleChange}
                    />
                  </div>
                ))}
                <div className="flex w-full items-center gap-3">
                  <Label htmlFor="gender" className="w-32 text-lg font-medium">
                    Gender:
                  </Label>
                  <Select onValueChange={handleGenderChange}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Gender</SelectLabel>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                {[
                  {
                    label: "Position",
                    type: "text",
                    placeholder: "Enter your position",
                    key: "position",
                  },
                  {
                    label: "Email Address",
                    type: "email",
                    placeholder: "Enter your email address",
                    key: "email",
                  },
                ].map(({ label, type, placeholder, key }, index) => (
                  <div key={index} className="flex w-full items-center gap-3">
                    <Label htmlFor={key} className="w-32 text-lg font-medium">
                      {label}:
                    </Label>
                    <Input
                      type={type}
                      id={key}
                      placeholder={placeholder}
                      className="flex-1"
                      value={input[key as "position" | "email"]}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>
              <Button
                type="submit"
                variant={"default"}
                className="w-full mt-6 mx-auto bg-[#C39898] text-white rounded-full hover:bg-[#a76e6e] p-4"
                // className="flex mx-auto bg-[#C39898] text-white rounded-full hover:bg-white hover:text-black p-5"
                onClick={handleSubmit}
              >
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
