"use client";
import UserAuthForm from "@/components/UserAuthForm";
import { UseAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

const SignIn: FC = () => {
  const { isLogIn, isLoading, user } = UseAuth();
  const router = useRouter();
  if (!isLoading && isLogIn) router.replace("/novel");

  return (
    <div className="flex flex-col justify-center space-y-6 mx-auto mt-32 w-full sm:w-[400px] container">
      <div className="flex flex-col items-center text-center">
        <Image src={"/logo.png"} width={200} height={200} alt="website logo" />
        <h1 className="mt-10 font-semibold text-2xl tracking-tight">
          Join Us !!
        </h1>
        <p className="mx-auto max-w-xs text-sm">
          By continuing, you are setting up an account in silver-prince.com
        </p>
      </div>
      <UserAuthForm />
    </div>
  );
};

export default SignIn;
