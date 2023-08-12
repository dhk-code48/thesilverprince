"use client";
import BasicSkeleton from "@/components/Skleaton";
import { UseAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";

const User: FC = () => {
  const { isLogIn, isLoading, user } = UseAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLogIn && !isLoading) {
      router.push("/sign-in");
    }
  }, [isLogIn, isLoading, router]);

  return (
    <div>
      {isLoading ? (
        <div className="flex flex-col gap-10 justify-center items-center mt-10">
          <BasicSkeleton />
          <BasicSkeleton />
        </div>
      ) : (
        <div>
          <h1>
            {user.displayName}
            <Image
              className="rounded-full"
              alt="user display profile"
              width={100}
              height={100}
              src={user.photoUrl}
            />
          </h1>
        </div>
      )}
    </div>
  );
};

export default User;
