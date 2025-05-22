"use client";
import BasicSkeleton from "@/components/Skleaton";
import { Button } from "@/components/ui/button";
import { UseAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebaseConfig";
import { signOut } from "firebase/auth";
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
        <div className="flex flex-col justify-center items-center gap-10 mt-10">
          <BasicSkeleton />
          <BasicSkeleton />
        </div>
      ) : (
        <div className="place-content-center grid">
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
          <Button onClick={() => signOut(auth).then(() => router.push("/"))}>
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default User;
