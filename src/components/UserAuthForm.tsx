"use client";
import React, { FC, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";

import { MdFacebook } from "react-icons/md";
import { useToast } from "@/lib/use-toast";
import { UseAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import BasicSkeleton from "./Skleaton";

const UserAuthForm: FC = () => {
  const { toast } = useToast();
  const { googleSignIn, isLogIn, isLoading } = UseAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLogIn) {
      router.push("/");
    }
  }, [isLogIn, router]);

  const loginWithGoogle = async () => {
    try {
      googleSignIn();
    } catch (error) {
      toast({
        title: "There is an error while login with google",
        description: error + " please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <BasicSkeleton />
      ) : (
        <>
          <Button
            className="gap-4 text-lg"
            isLoading={isLoading}
            onClick={loginWithGoogle}
          >
            <FcGoogle />
            Google
          </Button>
          {/* <Button
            isLoading={isLoading}
            className="gap-4 text-lg bg-blue-600 text-white"
          >
            <MdFacebook />
            Facebook
          </Button> */}
        </>
      )}
    </>
  );
};

export default UserAuthForm;
