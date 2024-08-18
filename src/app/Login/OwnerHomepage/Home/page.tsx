"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import React from "react";
import Footer from "@/components/ui/Components/Footer";
import Link from "next/link";

const page = () => {
  return (
    <div className="mt-16">
      {" "}
      {/* Adjust the value as needed */}
      {/* <div className="text-3xl font-bold text-center m-8">
        Decentralized Voting System
      </div> */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-12 p-4">
          <Link href="/Login/OwnerHomepage/CandidateList">
            <Card className="p-6 transform transition duration-300 hover:scale-105 hover:bg-green-500/20 hover:shadow-lg hover:shadow-green-500/50 cursor-pointer">
              <CardHeader>
                <CardTitle>Candidate List</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/Login/OwnerHomepage/VoterList">
            <Card className="p-6 transform transition duration-300 hover:scale-105 hover:bg-green-500/20 hover:shadow-lg hover:shadow-green-500/50 cursor-pointer">
              <CardHeader>
                <CardTitle>Voter List</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/Login/OwnerHomepage/RegisterCandidate">
            <Card className="p-6 transform transition duration-300 hover:scale-105 hover:bg-green-500/20 hover:shadow-lg hover:shadow-green-500/50 cursor-pointer">
              <CardHeader>
                <CardTitle>Register Candidate</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/Login/OwnerHomepage/SetEvent">
            <Card className="p-6 transform transition duration-300 hover:scale-105 hover:bg-green-500/20 hover:shadow-lg hover:shadow-green-500/50 cursor-pointer">
              <CardHeader>
                <CardTitle>Set Event</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
