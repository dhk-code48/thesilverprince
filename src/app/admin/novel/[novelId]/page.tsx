"use client";
import AddChapter from "@/components/Admin/AddChapter";
import EditChapter from "@/components/Admin/EditChapter";
import MenuBar from "@/components/Admin/MenuBar";
import AdminNovelInfo from "@/components/Admin/NovelInfo";
import AdminVolCollapse from "@/components/App/AdminVolCollapse";
import Rating from "@/components/App/Novel/Rating";
import BasicSkeleton from "@/components/Skleaton";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import addVolume from "@/firebase/Create/addVolume";
import deleteNovel from "@/firebase/Delete/deleteNovel";
import { chapterProps } from "@/firebase/Read/getChapter";
import useNovel from "@/firebase/Read/getNovelData";
import useVolumes, { VolumeProps } from "@/firebase/Read/getVolumes";
import editNovel from "@/firebase/Update/editNovelInfo";
import { toast } from "@/lib/use-toast";
import { FirebaseError } from "firebase/app";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuPlus, LuTrash2 } from "react-icons/lu";

interface pageProps {
  params: {
    novelId: string;
  };
}

interface pageState {
  chapterId: string | null;
  volume: VolumeProps | null;
  state: "novel" | "add" | "edit";
}

const AdminNovel: FC<pageProps> = ({ params }) => {
  const route = useRouter();
  const [pageState, setPageState] = useState<pageState>({
    state: "novel",
    volume: null,
    chapterId: null,
  });

  function setPageAdd(vol: VolumeProps) {
    setPageState((prev) => ({ ...prev, volume: vol, state: "add" }));
  }
  function setPageNovel() {
    setPageState((prev) => ({ ...prev, state: "novel" }));
  }
  function setPageEdit(vol: VolumeProps, chapter: string) {
    setPageState((prev) => ({
      chapterId: chapter,
      volume: vol,
      state: "edit",
    }));
  }

  const novel = useNovel(params.novelId);
  const volumes = useVolumes(params.novelId);

  return (
    <div>
      <MenuBar label="novel" />{" "}
      {novel !== null ? (
        <>
          {pageState.state === "novel" ? (
            <AdminNovelInfo
              setPageAdd={setPageAdd}
              setPageEdit={setPageEdit}
              novel={novel}
              volumes={volumes}
            />
          ) : pageState.state === "add" ? (
            pageState.volume && (
              <AddChapter
                novelId={novel.id}
                setPageNovel={setPageNovel}
                vol={pageState.volume}
              />
            )
          ) : pageState.state === "edit" ? (
            pageState.chapterId &&
            pageState.volume && (
              <EditChapter
                novelId={novel.id}
                pageState={pageState}
                setPageNovel={setPageNovel}
              />
            )
          ) : (
            <BasicSkeleton />
          )}
        </>
      ) : (
        <BasicSkeleton />
      )}
    </div>
  );
};
export default AdminNovel;
