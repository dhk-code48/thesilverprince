import React, { FC, useEffect, useState } from "react";
import {
  LuChevronsLeft,
  LuEye,
  LuFileUp,
  LuTrash2,
  LuUpload,
} from "react-icons/lu";
import "suneditor/dist/css/suneditor.min.css";
import SunEditor from "suneditor-react";
import addChapter from "@/firebase/Create/addChapter";
import { useRouter } from "next/navigation";
import { VolumeProps, tabeleOfContents } from "@/firebase/Read/getVolumes";
import { Input } from "../ui/input";
import editChapter from "@/firebase/Update/editChapter";
import useChapter, { chapterProps } from "@/firebase/Read/getChapter";
import BasicSkeleton from "../Skleaton";
import { Button } from "../ui/button";
import deleteChapter from "@/firebase/Delete/deleteChapter";

interface pageProps {
  novelId: string;
  setPageNovel: () => void;
  pageState: {
    chapterId: string | null;
    volume: VolumeProps | null;
    state: "novel" | "add" | "edit";
  };
}

const EditChapter: FC<pageProps> = ({ novelId, setPageNovel, pageState }) => {
  const chapter = useChapter(
    novelId,
    pageState.volume ? pageState.volume.id : "",
    pageState.chapterId ? pageState.chapterId : ""
  );

  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  useEffect(() => {
    if (chapter !== null) {
      setTitle(chapter.title);
      setContent(chapter.content);
    }
  }, [chapter]);

  function handleChapterAddition() {
    if (chapter !== null && pageState.volume !== null) {
      let tableContents: tabeleOfContents[] = pageState.volume.tabeleOfContents;
      tableContents = tableContents.map((item) =>
        item.id === pageState.chapterId
          ? { title: title, id: pageState.chapterId }
          : item
      );
      editChapter({
        chapter: chapter,
        novelId: novelId,
        chapterTitle: title,
        chapterContent: content,
        volume: pageState.volume,
        tableContents: tableContents,
      }).finally(() => {
        setPageNovel();
        window.location.reload();
      });
    }
  }

  function handleChapterDeletion() {
    if (chapter !== null && pageState.volume !== null) {
      let tableContents: tabeleOfContents[] = pageState.volume.tabeleOfContents;
      tableContents = tableContents.filter(
        (item) => item.id !== pageState.chapterId
      );

      const a = prompt(
        "Enter the name of the chapter to delete (i.e) " + chapter.title
      );

      if (a === chapter.title) {
        deleteChapter({
          chapterId: chapter.id,
          volume: pageState.volume,
          novelId: novelId,
          tableContents: tableContents,
        }).finally(() => {
          setPageNovel();
          window.location.reload();
        });
      } else {
        alert("Chapter Name didn't Match");
      }
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center lg:w-[1300px] mx-auto p-10">
        <p
          onClick={setPageNovel}
          className="bg-blue-400 text-white rounded px-3 py-1 inline-block"
        >
          <LuChevronsLeft size={22} />
        </p>
        <div className="text-black-500 space-x-4">
          <Button
            className="bg-red-700 text-white hover:text-black"
            onClick={handleChapterDeletion}
          >
            <LuTrash2 size={22} className="mx-5" />
          </Button>
          <Button
            className="bg-green-700 text-white hover:text-black"
            onClick={handleChapterAddition}
          >
            <LuUpload size={22} className="mx-5" />
          </Button>
        </div>
      </div>

      {chapter !== null ? (
        <div className="max-w-[900px] mx-auto">
          <Input
            placeholder="Title of an Chapter"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-5 py-2 mb-5 outline-blue-100 border rounded w-full text-2xl"
          />
          <SunEditor
            setContents={content}
            onChange={handleEditorChange}
            setAllPlugins={true}
            setDefaultStyle="font-family:Merriweather; font-size:18px; line-height:32.8px"
            setOptions={{
              font: [
                "Merriweather",
                "Angkor",
                "'Nunito Sans'",
                "'Slabo 27px'",
                "Lobster",
              ],
              buttonList: [
                ["font", "fontSize", "formatBlock"],
                ["fontColor", "hiliteColor", "textStyle"],
                ["paragraphStyle"],
                [
                  "bold",
                  "underline",
                  "italic",
                  "strike",
                  "subscript",
                  "superscript",
                ],
                ["fontColor", "hiliteColor"],
                ["removeFormat"],
                "/", // Line break
                ["outdent", "indent"],
                ["align", "horizontalRule", "list", "lineHeight"],
                ["table", "link", "image", "video", "audio"],
                ["fullScreen", "showBlocks", "codeView"],
                ["preview"],
                ["undo", "redo"],
              ],
            }}
          />
        </div>
      ) : (
        <BasicSkeleton />
      )}
    </div>
  );
};

export default EditChapter;
