import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import Image from "next/image";
import Header from "@/components/ui/Components/Header";
import { cn } from "@/lib/utils";
import React from "react";
import Footer from "@/components/ui/Components/Footer";

const Page = () => {
  const items = [
    { id: 1, picture: "/Profile1.png", name: "Hoi Kah Wei", description: "BBK" },
    {
      id: 2,
      picture: "/Profile1.png",
      name: "Jia Wen",
      description: "football player",
    },
    {
      id: 3,
      picture: "/Profile1.png",
      name: "lee Wei Xuan",
      description: "CEO",
    },
    {
      id: 4,
      picture: "/Profile1.png",
      name: "Ian Gan",
      description: "Full stack developer",
    },
    {
      id: 5,
      picture: "/Profile1.png",
      name: "Eric Kee",
      description: "A clown",
    },
  ];

  return (
    <div>
      <Header />
      <div className="text-3xl font-bold text-center my-5">About Us</div>
      <div className="flex justify-center items-center">
        <div className="h-[630px] w-[770px]">
          {items.map((item, index) => (
            <div
              key={index}
              className={cn(
                "border rounded-xl w-96 h-20 my-4",
                "bg-[#DBB5B5] border-[#987070]",
                "relative overflow-hidden",
                "flex items-center space-x-3 p-3",
                index % 2 === 0 ? "float-left" : "float-right"
              )}
            >
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div>{item.name}</div>
                <div>{item.description}</div>
              </div>

              <Image
                src={item.picture}
                alt=""
                width={80}
                height={80}
                className="absolute top-0 bottom-0 right-0 my-auto rounded-r-xl border border-[#987070] border-r-0"
              />
            </div>
          ))}
        </div>
      </div>

      {/* This is the grid that match the figma, but idk how to implement into the link*/}
      {/* <div className="grid grid-rows-5 grid-flow-col gap-4 h-auto ">
        <div className="border-2 border-red-500">1</div>

        <div className="grid grid-rows-subgrid gap-4 row-span-2">
          <div className="border-2 border-red-500 row-start-2">2</div>
        </div>
        <div className="grid grid-rows-subgrid gap-4 row-span-2">
          <div className="border-2 border-red-500 row-start-2">3</div>
        </div>
        <div className="grid grid-rows-subgrid gap-4 row-span-2">
          <div className="border-2 border-red-500 row-start-2">4</div>
        </div>
        <div className="grid grid-rows-subgrid gap-4 row-span-2">
          <div className="border-2 border-red-500 row-start-2">5</div>
        </div>
      </div> */}

      <div className="bg-[#DBB5B5] h-16 mt-20"></div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
