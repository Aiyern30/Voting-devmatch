"use client";
import Image from "next/image";
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

import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis, // Add YAxis import
  LabelList, // Import LabelList for bar labels
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/Chart";
import { useEffect, useState } from "react";
import { contract_reader } from "@/app/load_contract";
import Header from "@/components/ui/Components/Header";

interface Candidate {
  id: string;
  name: string;
  email?: string;
  gender?: string;
  position?: string;
  voteCount?: string;
}

const Page = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [electionTime, setElectionTime] = useState<number | null>(null);

  const [show_days, set_show_days] = useState<number | null>(null);
  const [show_hours, set_show_hours] = useState<number | null>(null);
  const [show_minutes, set_show_minutes] = useState<number | null>(null);
  const [show_seconds, set_show_seconds] = useState<number | null>(null);
  const [congratulationsCandidate, setCongratulationsCandidate] =
    useState<Candidate | null>(null);

  useEffect(() => {
    const fetchElectionTime = async () => {
      try {
        // Check if contract_reader is null or undefined
        if (!contract_reader) {
          throw new Error("Contract reader is not available.");
        }

        const data = await contract_reader.getElection_time();
        const timeInSeconds = Number(data); // Ensure it's a number
        localStorage.setItem("election_time", timeInSeconds.toString());
        setElectionTime(timeInSeconds);
      } catch (error: any) {
        // Handle error of type 'any'
        console.error("Error fetching election time:", error);

        // Check the specific error message at different levels
        const errorMessage =
          error?.data?.originalError?.message || error?.message;

        if (
          errorMessage === "execution reverted: Election has not started yet!"
        ) {
          setError("Election has not started yet!");
        } else {
          setError("Failed to fetch election time.");
        }
      }
    };

    fetchElectionTime();
  }, []);

  useEffect(() => {
    const storedTimeStr = localStorage.getItem("election_time");
    const storedTime = storedTimeStr ? Number(storedTimeStr) : null;

    if (storedTime === null) return; // Exit if no election time

    const update_election_time = setInterval(() => {
      setElectionTime((prevTime) => {
        if (prevTime !== null && prevTime > 0) {
          const newTime = prevTime - 1;
          const days = Math.floor(newTime / (24 * 3600));
          const hours = Math.floor((newTime % (24 * 3600)) / 3600);
          const minutes = Math.floor((newTime % 3600) / 60);
          const remainingSeconds = newTime % 60;

          set_show_days(days);
          set_show_hours(hours);
          set_show_minutes(minutes);
          set_show_seconds(remainingSeconds);

          // Save updated time to localStorage
          localStorage.setItem("election_time", newTime.toString());

          if (newTime <= 0) {
            localStorage.setItem("election_status", "Ended");
            clearInterval(update_election_time); // Clear interval when time ends
            return null; // Stop updating time
          }

          return newTime; // Continue updating
        }
        return prevTime; // No update if time is null
      });
    }, 1000);

    return () => clearInterval(update_election_time); // Clean up the interval on unmount
  }, []);
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
          id: item.cid,
          name: item.candidatename,
          email: item.candidateemail,
          gender: item.candidategender,
          position: item.candidateposition,
          voteCount: item.votecount,
        }));

        setCandidates(mappedCandidates);

        // Find the candidate with the highest vote count
        const highestVoteCandidate = mappedCandidates.reduce((prev, current) =>
          parseInt(prev.voteCount || "0") > parseInt(current.voteCount || "0")
            ? prev
            : current
        );

        setCongratulationsCandidate(highestVoteCandidate);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchCandidates();
  }, []);

  const chartData = candidates.map((candidate) => ({
    name: candidate.name,
    votes: parseInt(candidate.voteCount || "0"),
  }));

  const chartConfig = {
    votes: {
      label: "Votes",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-300 p-2 rounded">
          <p>{payload[0].payload.name}</p>
          <p>Votes: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className=" flex flex-col">
      <Header />
      <div className="flex justify-center items-center  h-screen">
        {electionTime !== null ? (
          <div className="flex flex-col justify-center items-center h-full">
            <div>Live Results</div>
            <ChartContainer
              config={chartConfig}
              className="h-[500px] w-[500px]"
            >
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value}
                />
                <YAxis
                  tickFormatter={(value) => value.toString()} // Ensure values are displayed as strings
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="votes" fill={chartConfig.votes.color} radius={4}>
                  <LabelList dataKey="votes" position="top" />
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <div className="text-center space-y-3">
              <div className="text-3xl font-bold">Congratulations!</div>
              {congratulationsCandidate && (
                <>
                  <Avatar className="mx-auto w-[150px] h-[150px]">
                    {/* Use RoboHash for the avatar image */}
                    <AvatarImage
                      src={`https://robohash.org/${congratulationsCandidate.name}.png?size=120x120`}
                      alt={congratulationsCandidate.name}
                    />
                    {/* Fallback in case the image fails to load */}
                    <AvatarFallback>
                      {congratulationsCandidate.name
                        ? congratulationsCandidate.name[0]
                        : "?"}
                    </AvatarFallback>
                  </Avatar>
                  <Card>
                    <CardContent className="flex p-4">
                      <div>
                        <div>Total votes:</div>
                        <div>Name:</div>
                        <div>Gender:</div>
                        <div>Position:</div>
                        <div>Email:</div>
                      </div>
                      <div>
                        <div>{congratulationsCandidate.voteCount}</div>
                        <div>{congratulationsCandidate.name}</div>
                        <div>{congratulationsCandidate.gender}</div>
                        <div>{congratulationsCandidate.position}</div>
                        <div>{congratulationsCandidate.email}</div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
