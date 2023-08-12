"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UseAuth } from "@/context/AuthContext";
import addComment from "@/firebase/Create/addComment";
import useComments from "@/firebase/Read/getComments";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { LuSend, LuX } from "react-icons/lu";

interface pagePros {
  volId: string;
  novelId: string;
  chapId: string;
  novelTitle: string;
}
const NovelComments: FC<pagePros> = ({
  volId,
  novelId,
  chapId,
  novelTitle,
}) => {
  const { isLogIn, user } = UseAuth();
  const [newComment, setNewComment] = useState<string>("");
  const [focusState, setFocusState] = useState<boolean>(false);
  const comments = useComments(novelId, volId, chapId);

  function handleCommentAddition() {
    if (volId && chapId && user.displayName && isLogIn) {
      addComment({
        volId: volId,
        chapterId: chapId,
        message: newComment,
        novelId: novelId,
        user: user,
        novelTitle: novelTitle,
      });

      setNewComment("");
    }
  }
  return (
    <div className="mt-10">
      {isLogIn ? (
        <div className="flex  items-center mt-5 lg:p-5 pb-3">
          <Image
            alt="user profile"
            src={user.photoUrl}
            width={48}
            height={48}
            className="rounded-full"
          />
          <Input
            onFocus={() => setFocusState(true)}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Enter your Comment..."
            className="w-full focus:border-blue-300 focus:border-b-2 outline-none mx-2 lg:mx-5 text-[18px] font-body tracking-wide border-b border-gray-300 py-2"
          />
          {focusState && (
            <div className="flex items-center justify-end w-full mt-1">
              <div
                onClick={() => {
                  setNewComment("");
                  setFocusState(false);
                }}
                className="mx-1 bg-red-500 w-8 h-8 flex items-center justify-center rounded-lg text-white"
              >
                <LuX size={18} />
              </div>
              <div
                onClick={handleCommentAddition}
                className="mx-1 bg-blue-500 w-8 h-8 flex items-center justify-center rounded-lg text-white"
              >
                <LuSend size={18} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link href={"/sign-in"} className={buttonVariants()}>
          Login To Comment
        </Link>
      )}
      {comments !== null &&
        comments.map((comment, index) => {
          return (
            <div className="my-5" key={comment.id + index}>
              <div className="flex items-start gap-2">
                <Image
                  src={comment.photoUrl}
                  width={40}
                  height={40}
                  alt="commenter profile"
                  className="rounded-full"
                />
                <div>
                  <p className="font-bold text-muted-foreground">
                    {comment.displayName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {comment.timestamp &&
                      moment(comment.timestamp.toDate()).fromNow()}
                  </p>
                </div>
              </div>
              <p className="ml-11 mt-1">{comment.message}</p>
            </div>
          );
        })}
    </div>
  );
};

export default NovelComments;
