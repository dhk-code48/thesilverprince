import React, { FC, useState } from "react";
import { LuChevronsLeft, LuEye, LuFileUp, LuUpload } from "react-icons/lu";
import "suneditor/dist/css/suneditor.min.css";
import SunEditor from "suneditor-react";
import addChapter from "@/firebase/Create/addChapter";
import { useRouter } from "next/navigation";
import { VolumeProps } from "@/firebase/Read/getVolumes";
import { Input } from "../ui/input";

interface pageProps {
  novelId: string;
  vol: VolumeProps;
  setPageNovel: () => void;
}

const AddChapter: FC<pageProps> = ({ novelId, vol, setPageNovel }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  function handleChapterAddition() {
    // console.log("toc", vol.tabeleOfContents);
    addChapter({
      novelId: novelId,
      title: title,
      content: content,
      volume: vol,
    }).finally(() => {
      setPageNovel();
    });
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
        <div className="text-black-500">
          <button onClick={handleChapterAddition}>
            <LuUpload size={22} className="mx-5" />
          </button>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto">
        <Input
          placeholder="Title of an Chapter"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-5 py-2 mb-5 outline-blue-100 border rounded w-full text-2xl"
        />
        <SunEditor
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
    </div>
  );
};

export default AddChapter;
