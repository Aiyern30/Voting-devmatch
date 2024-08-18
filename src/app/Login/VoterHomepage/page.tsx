// "use client";
// import Image from "next/image";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
// import { Button } from "@/components/ui/Button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/Card";
// import Header from "@/components/ui/Components/Header";
// import React from "react";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Tooltip,
//   TooltipProps,
//   XAxis,
// } from "recharts";

// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltipContent,
//   ChartTooltip,
//   ChartLegend,
//   ChartLegendContent,
// } from "@/components/ui/Chart";

// const page = () => {
//   const chartData = [
//     { name: "Ian", votes: 186 },
//     { name: "Ivan", votes: 305 },
//     { name: "Ivy", votes: 237 },
//   ];

//   const chartConfig = {
//     votes: {
//       label: "Votes",
//       color: "#2563eb",
//     },
//   } satisfies ChartConfig;

//   const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white border border-gray-300 p-2 rounded">
//           <p>{payload[0].payload.name}</p>
//           <p>Votes: {payload[0].value}</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div>
//       <Header />
//       <div className="flex justify-center items-center h-[700px] space-x-16">
//         <Card className="w-[384px] h-[498px] relative flex justify-center items-center">
//           <div className="flex flex-col text-center space-y-3">
//             <div className="text-3xl">Soon Wooi Yik</div>
//             <div>Manager</div>
//           </div>
//           <Avatar className="absolute -top-7 mx-auto w-[150px] h-[150px]">
//             <AvatarImage src="https://github.com/shadcn.png" />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//           <Button className="bg-[#FF0505] mx-auto absolute bottom-5 px-7 py-4">
//             Vote
//           </Button>
//         </Card>
//         <Card className="w-[384px] h-[498px] relative flex justify-center items-center">
//           <div className="flex flex-col text-center space-y-3">
//             <div className="text-3xl">Soon Wooi Yik</div>
//             <div>Manager</div>
//           </div>
//           <Avatar className="absolute -top-7 mx-auto w-[150px] h-[150px]">
//             <AvatarImage src="https://github.com/shadcn.png" />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//           <Button className="bg-[#FF0505] mx-auto absolute bottom-5 px-7 py-4">
//             Vote
//           </Button>
//         </Card>
//         <Card className="w-[384px] h-[498px] relative flex justify-center items-center">
//           <div className="flex flex-col text-center space-y-3">
//             <div className="text-3xl">Soon Wooi Yik</div>
//             <div>Manager</div>
//           </div>
//           <Avatar className="absolute -top-7 mx-auto w-[150px] h-[150px]">
//             <AvatarImage src="https://github.com/shadcn.png" />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//           <Button className="bg-[#FF0505] mx-auto absolute bottom-5 px-7 py-4">
//             Vote
//           </Button>
//         </Card>
//       </div>
//       <div className="flex justify-center items-center h-full">
//         <div className="flex flex-col">
//           <div className="text-center text-[96px]">Oops! Session Timeout</div>

//           <Image
//             src="/Timeout.png"
//             alt=""
//             width={512}
//             height={512}
//             className=" mx-auto"
//           />
//         </div>
//       </div>
//       <div className="flex justify-center items-center h-full">
//         <ChartContainer config={chartConfig} className="h-[500px] w-[500px]">
//           <BarChart data={chartData}>
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="name"
//               tickLine={false}
//               tickMargin={10}
//               axisLine={false}
//               tickFormatter={(value) => value}
//             />
//             <Tooltip content={<CustomTooltip />} />
//             <ChartLegend content={<ChartLegendContent />} />
//             <Bar dataKey="votes" fill={chartConfig.votes.color} radius={4} />
//           </BarChart>
//         </ChartContainer>
//       </div>
//       <div className="flex justify-center items-center h-full">
//         <div className="text-center space-y-3">
//           <div className="text-3xl font-bold">Congratulations!</div>
//           <Avatar className="mx-auto w-[150px] h-[150px]">
//             <AvatarImage src="https://github.com/shadcn.png" />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//           <Card>
//             <CardContent className="flex p-4">
//               <div>
//                 <div>Total voters:</div>
//                 <div>Name:</div>
//                 <div>Age:</div>
//                 <div>Gender:</div>
//                 <div>Position:</div>
//                 <div>Working experience:</div>
//               </div>
//               <div>
//                 <div>228</div>
//                 <div>Pearly Tan</div>
//                 <div>24</div>
//                 <div>Female</div>
//                 <div>IT Manager</div>
//                 <div>3 Years</div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;

"use client";
import Header from "@/components/ui/Components/Header";
import React, { useEffect, useState } from "react";
import Footer from "@/components/ui/Components/Footer";
import VotePage from "./VotingPage/page";
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
        <VotePage />
      </div>
      <div className="bg-[#DBB5B5] h-16 mt-20"></div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
