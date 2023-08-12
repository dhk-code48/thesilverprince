import UserAuthForm from "@/components/UserAuthForm";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

const SignIn: FC = () => {
  return (
    <div className="mt-32 container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col items-center text-center">
        <Image src={"/logo.png"} width={200} height={200} alt="website logo" />
        <h1 className="text-2xl font-semibold tracking-tight mt-10">
          Join Us !!
        </h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up an account in silver-prince.com
        </p>
      </div>
      <UserAuthForm />
    </div>
  );
};

export default SignIn;
