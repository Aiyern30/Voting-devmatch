"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import Header from "@/components/ui/Components/Header";
import React, { useEffect, useState } from "react";

interface Candidate {
  id: string; // or use candidateid if preferred
  name: string; // or use candidatename if preferred
  email?: string; // Add optional properties if needed
  gender?: string;
  position?: string;
  voteCount?: string; // Include other properties if needed
}

const Page = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]); // Initialize state with empty array
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch("/api/getCandidates", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
          },
        });
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const data: Candidate[] = await response.json();

        // Map API response to the Candidate interface
        const mappedCandidates: Candidate[] = data.map((item: any) => ({
          id: item.cid,
          name: item.candidatename,
          email: item.candidateemail,
          gender: item.candidategender,
          position: item.candidateposition,
          voteCount: item.voteCount || "0", // Adjust if voteCount is not part of the response
        }));

        setCandidates(mappedCandidates);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchCandidates(); // Call the fetch function when the component mounts
  }, []); // Runs whenever candidates changes

  const handleVote = async (candidate: Candidate) => {
    try {
      // Update the vote count of candidate
      const canResponse = await fetch("/api/setCandidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "incrementVote",
          formData: { id: candidate.id }, // Ensure the ID is correct
        }),
      });

      if (!canResponse.ok) {
        throw new Error(`Failed to increment vote: ${canResponse.statusText}`);
      }

      // Update the candidate's vote count in the local state
      const updatedCandidates = candidates.map((c) =>
        c.id === candidate.id
          ? {
              ...c,
              voteCount: (parseInt(c.voteCount || "0", 10) + 1).toString(),
            }
          : c
      );

      setCandidates(updatedCandidates);

      // Redirect to /LiveTrack
      router.push("/Login/VoterHomepage/LiveTrack");
    } catch (error) {
      console.error("Error incrementing vote:", error);
    }
  };

  return (
    <div>
      <div className="text-center my-8">
        <h2 className="text-3xl font-semibold">Pick a candidate to vote</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center items-center">
        {candidates.map((candidate, index) => (
          <Card
            key={index}
            className=" h-[420px] relative flex flex-col justify-center items-center"
          >
            <Avatar className="mx-auto w-[150px] h-[150px]">
              <AvatarImage
                src={`https://robohash.org/${candidate.email}.png?size=120x120`}
                alt={candidate.email}
              />
              <AvatarFallback>
                {candidate.email ? candidate.email[0] : "?"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-center space-y-2">
              <div className="text-2xl">{candidate.name}</div>
              <div>{candidate.position}</div>
            </div>

            <Button
              className="bg-[#FF0505] mx-auto absolute bottom-4 px-5 py-3"
              onClick={() => handleVote(candidate)}
            >
              Vote
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
