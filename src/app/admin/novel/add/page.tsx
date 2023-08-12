"use client";
import MenuBar from "@/components/Admin/MenuBar";
import Rating from "@/components/App/Novel/Rating";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import addNovel from "@/firebase/Create/addNovel";
import { toast } from "@/lib/use-toast";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  banner: string;
  title: string;
  tags: string;
  rating: string;
  webLink: string;
  synopsis: string;
};

const AddNovel: FC = () => {
  const route = useRouter();
  const {
    register,
    handleSubmit,

    getValues,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    addNovel({
      banner: data.banner,
      synopsis: data.synopsis,
      tags: data.tags,
      title: data.title,
      rating: data.rating,
      webLink: data.webLink,
    })
      .then(() => {
        toast({
          title: "Adding Please Wait a second !!",
          description: "Your New Novel is being added",
          variant: "default",
        });
      })
      .finally(() => {
        toast({
          title: "Added Successfully !!",
          description: "Your New Novel has been Added successfully",
          variant: "default",
        });
        route.push("/admin/novel");
      })
      .catch((e) => {
        toast({
          title: "Error while adding",
          description: e.message,
          variant: "destructive",
        });
      });
  });

  const [bannerSrc, setBannerSrc] = useState<string | undefined>(
    getValues("banner")
  );

  const [rating, setRating] = useState<number | undefined>(
    parseFloat(getValues("rating"))
  );

  return (
    <div className="w-screen">
      <MenuBar label="novel" />{" "}
      <div className="pt-10 lg:w-[70%] mx-auto">
        <form onSubmit={onSubmit} className="flex justify-stretch mt-10 gap-10">
          <div>
            <Image
              src={bannerSrc || ""}
              width={300}
              height={400}
              className="rounded-xl"
              alt="background of card"
            />
            <Input
              {...register("banner", {
                onChange: (e) => {
                  setBannerSrc(e.target.value);
                },
              })}
              className="mt-4"
              placeholder="Source Image for Banner"
            />
          </div>
          <div className="flex justify-between flex-col">
            <div>
              <Input
                {...register("title")}
                placeholder="Title Goes Here ..."
                className="font-bold text-3xl"
              />
              <Input
                {...register("tags")}
                placeholder="Tags Goes Here ....."
                className="text-muted-foreground mt-1"
              />
              <div className="mt-8 flex gap-5 items-center w-auto">
                <Rating rating={rating || 0} />
                <Input
                  type="text"
                  placeholder="Rating"
                  {...register("rating", {
                    onChange: (e) => {
                      setRating(parseFloat(e.target.value));
                    },
                  })}
                  className="w-12"
                />
                <p className="text-lg cursor-pointer flex">
                  <Input
                    {...register("webLink")}
                    className="text-blue-500"
                    placeholder="Link To Webnovel"
                  />
                </p>
              </div>
            </div>
            <h1 className="text-xl font-bold pb-2">Synopsis</h1>
            <Textarea
              placeholder="Synopsis Goes Here...."
              {...register("synopsis")}
            />

            <div className="py-10">
              <Button
                type="submit"
                className="bg-destructive text-destructive-foreground hover:bg-red-700"
              >
                Save Changes
              </Button>{" "}
              <Link
                type="submit"
                className={buttonVariants({ variant: "outline" })}
                href={"/admin/novel"}
              >
                Go Back
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddNovel;
