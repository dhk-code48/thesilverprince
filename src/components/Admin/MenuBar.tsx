"use client";
import React, { FC, useEffect } from "react";
import { Button } from "../ui/button";
import { UseAuth } from "@/context/AuthContext";
import Image from "next/image";
import MainNav from "./MainNav";
import ThemeToggle from "../App/ThemeToggle";
import { useRouter } from "next/navigation";
import { AiOutlineLoading } from "react-icons/ai";

interface label {
  label: "admin" | "novel" | "news";
}

const MenuBar: FC<label> = ({ label }) => {
  const { user, isLoading, isAdmin } = UseAuth();
  const route = useRouter();

  useEffect(() => {
    if (isLoading === false) {
      if (isAdmin === false) {
        route.push("/sign-in");
      }
    }
  }, [isLoading, isAdmin, route]);

  return (
    <>
      {isLoading ? (
        <div className="z-50 w-full h-full flex justify-center items-center bg-background">
          <AiOutlineLoading size={40} className="animate-spin" />
        </div>
      ) : (
        <div className="border-b flex px-10 items-center h-20 fixed top-0 bg-background z-10 w-full">
          <Button variant="outline" className="whitespace-nowrap px-4 py-2">
            <Image
              src={user.photoUrl}
              width={25}
              height={25}
              className="rounded-full mr-2"
              alt="user profile"
            />
            {user.displayName}
          </Button>
          <MainNav label={label} />
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      )}
    </>
  );
};

export default MenuBar;
