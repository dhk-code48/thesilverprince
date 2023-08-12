import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { FC } from "react";
import { LuBook, LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface chProps {
  novelId: string;
  chapterTitle: string;
  prevDisable: boolean;
  nextDisable: boolean;
  handlePrevious: () => void;
  handleNext: () => void;
  noTitle?: boolean;
}
const ChapterHeader: FC<chProps> = ({
  chapterTitle,
  prevDisable,
  nextDisable,
  noTitle,
  handleNext,
  handlePrevious,
  novelId,
}) => {
  return (
    <div className="flex items-center lg:justify-between lg:gap-0 gap-5 justify-center flex-wrap-reverse">
      {!noTitle && (
        <h1 className="text-3xl text-center lg:text-left font-bold">
          {chapterTitle}
        </h1>
      )}

      <div className="flex gap-10">
        <Button
          disabled={prevDisable}
          onClick={handlePrevious}
          className="gap-2"
          size={"sm"}
          variant={"outline"}
        >
          <LuChevronLeft size={20} />
          Previous
        </Button>
        <Button
          disabled={nextDisable}
          onClick={handleNext}
          className="gap-2"
          size={"sm"}
          variant={"outline"}
        >
          Next <LuChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
};

export default ChapterHeader;
