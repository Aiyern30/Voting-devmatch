"use client";
import Header from "@/components/ui/Components/HostHeader";
import React, { useEffect, useState } from "react";
import Footer from "@/components/ui/Components/Footer";
import Home from "./Home/page";
import { contract_reader } from "@/app/load_contract";

const Page = () => {
  const [electionTime, setElectionTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [show_days, set_show_days] = useState<number | null>(null);
  const [show_hours, set_show_hours] = useState<number | null>(null);
  const [show_minutes, set_show_minutes] = useState<number | null>(null);
  const [show_seconds, set_show_seconds] = useState<number | null>(null);

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

  return (
    <div>
      <Header />
      <div className="text-center">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p>
            Election Time:{" "}
            {electionTime !== null
              ? `${show_days} Days ${show_hours} Hours ${show_minutes} Minutes ${show_seconds} Seconds`
              : "Loading..."}
          </p>
        )}
      </div>

      <div className="top-[10px]">
        <Home />
      </div>
      <div className="bg-[#DBB5B5] h-16 mt-20"></div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
