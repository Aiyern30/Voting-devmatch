"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/ui/Components/HostHeader";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { useRouter } from "next/navigation";
import { getCandidates } from "@/lib/candidate";
import { contract_writer } from "@/app/load_contract";

interface Candidate {
  candidateid: string;
  id: string; // or use candidateid if preferred
  name: string; // or use candidatename if preferred
  email?: string; // Add optional properties if needed
  gender?: string;
  position?: string;
  voteCount?: string; // Include other properties if needed
}

const Page = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  console.log("candidates", candidates);
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>(
    []
  );
  console.log("selectedCandidateIds", selectedCandidateIds);
  const [error, setError] = useState<string | null>(null);

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

        const mappedCandidates: Candidate[] = data.map((item: any) => ({
          candidateid: item.candidateid,
          id: item.cid,
          name: item.candidatename,
          email: item.candidateemail,
          gender: item.candidategender,
          position: item.candidateposition,
          voteCount: item.votecount,
        }));

        setCandidates(mappedCandidates);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchCandidates();
  }, []);

  const handleCheckboxChange = (candidateid: string) => {
    setSelectedCandidateIds((prevSelected) => {
      const newSelection = prevSelected.includes(candidateid)
        ? prevSelected.filter((id) => id !== candidateid)
        : [...prevSelected, candidateid];

      return newSelection;
    });
  };

  const handleRemoveSelected = async () => {
    try {
      // Ensure contract_writer is available
      if (!contract_writer) {
        setError("Contract writer is not available. Please try again later.");
        return;
      }

      // Await the removeCandidate function to ensure it completes successfully
      const transaction = await contract_writer.removeCandidate(
        selectedCandidateIds
      );
      console.log("Transaction result:", transaction);

      // Proceed with the API call only after removeCandidate is successful
      const response = await fetch("/api/setCandidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "delete",
          formData: { ids: selectedCandidateIds },
        }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("API response:", data);

      // Remove deleted candidates from state
      setCandidates((prevCandidates) =>
        prevCandidates.filter(
          (candidate) => !selectedCandidateIds.includes(candidate.candidateid)
        )
      );

      setSelectedCandidateIds([]); // Clear selection after removal
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div>
      <Header />
      <div className="p-5 pb-0 flex justify-end items-center">
        <a href="/Login/OwnerHomepage/RegisterCandidate">
          <Button
            variant="ghost"
            className="bg-[#987070] text-white border border-[#2A2929] ml-auto mx-5 mb-5"
          >
            Register Candidate
          </Button>
        </a>
      </div>

      <div className="flex flex-col h-screen p-10 pt-0">
        <Table>
          <TableHeader className="bg-[#C39898]">
            <TableRow>
              <TableHead className="text-white"></TableHead>
              <TableHead className="text-white">Id</TableHead>
              <TableHead className="text-white">Candidate Name</TableHead>
              <TableHead className="text-white">Candidate Email</TableHead>
              <TableHead className="text-white">Candidate Position</TableHead>
              <TableHead className="text-white">Candidate Gender</TableHead>
              <TableHead className="text-white">Vote Count</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white">
            {candidates.map((candidate: Candidate, index) => (
              <TableRow key={candidate.id}>
                <TableCell>
                  <Checkbox
                    id={`checkbox-${candidate.candidateid}`}
                    onCheckedChange={() =>
                      handleCheckboxChange(candidate.candidateid)
                    }
                    checked={selectedCandidateIds.includes(
                      candidate.candidateid
                    )}
                  />
                </TableCell>
                <TableCell className="font-medium">{candidate.id}</TableCell>
                <TableCell>{candidate.name}</TableCell>
                <TableCell>{candidate.email}</TableCell>
                <TableCell>{candidate.position}</TableCell>
                <TableCell>{candidate.gender}</TableCell>
                <TableCell>{candidate.voteCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 flex justify-center">
          <Button
            variant="destructive"
            onClick={handleRemoveSelected}
            disabled={selectedCandidateIds.length === 0}
          >
            Remove Selected
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
