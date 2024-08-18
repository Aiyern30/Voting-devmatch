"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../Button";
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar";
import { usePathname } from "next/navigation"; // Correct import
import { useAuth } from "@/app/AuthContext"; // Adjust the import path
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/Dropdown-menu";

const Header = () => {
  const pathname = usePathname(); // Use usePathname hook to get the pathname
  const { isLoggedIn, loading, logout } = useAuth();

  // Use state to hold the display path
  const [displayPath, setDisplayPath] = useState("Home");

  // Use useEffect to update the displayPath whenever pathname changes
  useEffect(() => {
    const pathParts = pathname?.split("/").filter(Boolean) || [];
    if (pathParts.length > 0) {
      setDisplayPath(pathParts[pathParts.length - 1]); // Always set the last part of the path
    } else {
      setDisplayPath("Home"); // Default to "Home" if there's no specific path
    }
  }, [pathname]); // Re-run the effect whenever pathname changes

  const links = [
    // { name: "Home", href: "/" },
    // { name: "Overview", href: "/Overview" },
    // { name: "How it works", href: "/How-it-works" },
    // { name: "Features", href: "/Features" },
    // { name: "About Us", href: "/About-us" },
    ...(isLoggedIn ? [{ name: "Vote", href: "/Login/VoterHomepage" }] : []),
  ];

  return (
    <div className="h-[64px] flex justify-between items-center p-4 shadow-md bg-[#DBB5B5]">
      <div className="flex items-center space-x-4">
        <div className="cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>{displayPath}</div> {/* Display the correct part of the path */}
      </div>
      <div className="flex items-center space-x-4 cursor-pointer">
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
        {!isLoggedIn &&
          !loading && ( // Show login button only if not logged in and not loading
            <a href="/Login">
              <Button className="bg-[#C39898] border border-[#2A2929] text-black">
                Login / Register
              </Button>
            </a>
          )}
      </div>
    </div>
  );
};

export default Header;
