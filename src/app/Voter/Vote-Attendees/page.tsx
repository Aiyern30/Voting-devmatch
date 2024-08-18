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
import Header from "@/components/ui/Components/Header";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  TooltipProps,
  XAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/Chart";

const page = () => {
  const chartData = [
    { name: "Ian", votes: 186 },
    { name: "Ivan", votes: 305 },
    { name: "Ivy", votes: 237 },
  ];

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
    <div>
      <Header />
      <div className="flex justify-center items-center h-[700px] space-x-16">
        <Card className="w-[384px] h-[498px] relative flex justify-center items-center">
          <div className="flex flex-col text-center space-y-3">
            <div className="text-3xl">Soon Wooi Yik</div>
            <div>Manager</div>
          </div>
          <Avatar className="absolute -top-7 mx-auto w-[150px] h-[150px]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Button className="bg-[#FF0505] mx-auto absolute bottom-5 px-7 py-4">
            Vote
          </Button>
        </Card>
        <Card className="w-[384px] h-[498px] relative flex justify-center items-center">
          <div className="flex flex-col text-center space-y-3">
            <div className="text-3xl">Soon Wooi Yik</div>
            <div>Manager</div>
          </div>
          <Avatar className="absolute -top-7 mx-auto w-[150px] h-[150px]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Button className="bg-[#FF0505] mx-auto absolute bottom-5 px-7 py-4">
            Vote
          </Button>
        </Card>
        <Card className="w-[384px] h-[498px] relative flex justify-center items-center">
          <div className="flex flex-col text-center space-y-3">
            <div className="text-3xl">Soon Wooi Yik</div>
            <div>Manager</div>
          </div>
          <Avatar className="absolute -top-7 mx-auto w-[150px] h-[150px]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Button className="bg-[#FF0505] mx-auto absolute bottom-5 px-7 py-4">
            Vote
          </Button>
        </Card>
      </div>
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col">
          <div className="text-center text-[96px]">Oops! Session Timeout</div>

          <Image
            src="/Timeout.png"
            alt=""
            width={512}
            height={512}
            className=" mx-auto"
          />
        </div>
      </div>
      <div className="flex justify-center items-center h-full">
        <ChartContainer config={chartConfig} className="h-[500px] w-[500px]">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <Tooltip content={<CustomTooltip />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="votes" fill={chartConfig.votes.color} radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
      <div className="flex justify-center items-center h-full">
        <div className="text-center space-y-3">
          <div className="text-3xl font-bold">Congratulations!</div>
          <Avatar className="mx-auto w-[150px] h-[150px]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Card>
            <CardContent className="flex p-4">
              <div>
                <div>Total voters:</div>
                <div>Name:</div>
                <div>Age:</div>
                <div>Gender:</div>
                <div>Position:</div>
                <div>Working experience:</div>
              </div>
              <div>
                <div>228</div>
                <div>Pearly Tan</div>
                <div>24</div>
                <div>Female</div>
                <div>IT Manager</div>
                <div>3 Years</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;
