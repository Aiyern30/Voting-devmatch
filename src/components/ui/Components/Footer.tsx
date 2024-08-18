"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/Dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar";
import { usePathname } from "next/navigation";

// import "~@flaticon/flaticon-uicons/css/all/all";
const Footer = () => {
  const links = [
    { name: "UI Design", href: "#" },
    { name: "UX Design", href: "#" },
    { name: "Wireframing", href: "#" },
    { name: "Diagramming", href: "#" },
    { name: "Brainstorming", href: "#" },
    { name: "Online Whiteboard", href: "#" },
    { name: "Team Collaboration", href: "#" },
  ];
  const ExploreLinks = [
    { name: "Design", href: "#" },
    { name: "Prototyping", href: "#" },
    { name: "Development features", href: "#" },
    { name: "Design Systems", href: "#" },
    { name: "Collaboration features", href: "#" },
  ];
  const ResourcesLinks = [
    { name: "Blog", href: "#" },
    { name: "Best practices", href: "#" },
    { name: "Colors", href: "#" },
    { name: "Color wheel", href: "#" },
    { name: "Support", href: "#" },
  ];
  const pathname = usePathname();
  return (
    <div>
      <div className="grid grid-cols-4 gap-10 ">
        <div className="h-full flex flex-col flex-wrap justify-center items-center">
          <div className="font-bold justify-center flex item-center p-3 ">
            Our social media
          </div>
          <div className="justify-center flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger className=" grid grid-cols-2 gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </div>
        </div>

        <div>
          <div className="font-bold py-3">Use Cases</div>
          <div className="grid grid-cols-2 gap-4">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-black ${
                  pathname === link.href ? "font-bold underline" : ""
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="font-bold py-3">Explore</div>
          <div className="grid grid-cols-2 gap-4">
            {ExploreLinks.map((link2) => (
              <a
                key={link2.name}
                href={link2.href}
                className={`text-black ${
                  pathname === link2.href ? "font-bold underline" : ""
                }`}
              >
                {link2.name}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="font-bold py-3">Resources</div>
          <div className="grid grid-cols-2 gap-4">
            {ResourcesLinks.map((link3) => (
              <a
                key={link3.name}
                href={link3.href}
                className={`text-black ${
                  pathname === link3.href ? "font-bold underline" : ""
                }`}
              >
                {link3.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
