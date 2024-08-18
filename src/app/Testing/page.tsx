"use client";
import React, { useEffect, useState } from "react";
import GetHost from "@/components/ui/Components/GetHost";
import { Owner } from "@/types/types"; // Adjust the import path according to your project structure
import { Candidate } from "@/types/types"; // Adjust the import path for Candidate
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import {
  verifyTAC,
  addCandidate,
  getElection_time,
  getElection_status,
  getCandidates_votecount,
  getResetElection_count,
} from "../../lib/interact"; // Adjust the path accordingly

const Page: React.FC = () => {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [candidateName, setCandidateName] = useState<string>(""); // State for candidate name
  const [candidateId, setCandidateId] = useState<number>(0); // State for candidate ID
  const [electionTime, setElectionTime] = useState<number | null>(null); // State for election time
  const [electionStatus, setElectionStatus] = useState<boolean | null>(null); // State for election status
  const [voteCounts, setVoteCounts] = useState<number[]>([]); // State for vote counts
  const [countReset, setCountReset] = useState<number | null>(null); // State for count reset
  console.log("countReset", countReset);
  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await fetch("/api/getOwners", {
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
        const data: Owner[] = await response.json();
        setOwners(data);
      } catch (error) {
        setError((error as Error).message);
      }
    };

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
        setCandidates(data);

        // Fetch vote counts for each candidate
        const counts = await Promise.all(
          data.map((candidate) => getCandidates_votecount(0))
        );
        setVoteCounts(counts);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    const fetchElectionDetails = async () => {
      try {
        const time = await getElection_time();
        const status = await getElection_status();
        const countReset = await getResetElection_count();
        setElectionTime(time.toNumber()); // Assuming time is a BigNumber
        setElectionStatus(status);
        setCountReset(countReset);
      } catch (error) {
        console.error("Error fetching election details:", error);
      }
    };

    fetchOwners();
    fetchCandidates();
    fetchElectionDetails(); // Fetch election details
    setLoading(false);
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page refresh

    try {
      // const result = await verifyTAC();
      // console.log("TAC Verification Result:", result);

      // Add the candidate using the addCandidate function
      const tx = await addCandidate(candidateName, candidateId);
      console.log("Candidate added successfully:", tx);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Election Host</h1>
      {countReset && <p>Count Reset: {countReset}</p>}
      <GetHost />
      <form onSubmit={handleRegister}>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Candidate Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Enter candidate name"
            value={candidateName} // Set the value of the input
            onChange={(e) => setCandidateName(e.target.value)} // Update state on change
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="id">Candidate ID</Label>
          <Input
            type="number"
            id="id"
            placeholder="Enter candidate ID"
            value={candidateId} // Set the value of the input
            onChange={(e) => setCandidateId(Number(e.target.value))} // Update state on change
          />
        </div>
        <Button type="submit">Add Candidate</Button>
      </form>

      {/* Display Election Time and Status */}
      <div>
        <h2>Election Details</h2>
        <p>
          Election Time:{" "}
          {electionTime
            ? new Date(electionTime * 1000).toString()
            : "Loading..."}
        </p>
        <p>
          Election Status:{" "}
          {electionStatus !== null
            ? electionStatus
              ? "Active"
              : "Inactive"
            : "Loading..."}
        </p>
      </div>

      {/* Display Candidates and their Vote Counts */}
      <h2>Candidates</h2>
      {candidates.map((candidate, index) => (
        <div key={candidate.candidateid}>
          <div>Candidate ID: {candidate.candidateid}</div>
          <div>Name: {candidate.candidatename}</div>
          <div>
            Vote Count:{" "}
            {voteCounts[index] !== undefined ? voteCounts[index] : "Loading..."}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
