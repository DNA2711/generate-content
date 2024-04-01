import * as React from "react";
import { useState } from "react";

interface ResultProps {
  content: string;
  config: {
    key: number;
    opt: string;
  }[];
}

const Result: React.FC<ResultProps> = ({ content, config }) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSave = () => {
    let dataToSave = {
      content: content,
    };
    const configs = config.map((item) => {
      if (item.key === 1) {
        const conf = { content_type: item.opt };
        dataToSave = { ...dataToSave, ...conf };
      }

      if (item.key === 2) {
        const conf = { tone_of_voice: item.opt };
        dataToSave = { ...dataToSave, ...conf };
      }

      if (item.key === 3) {
        const conf = { content_length: item.opt };
        dataToSave = { ...dataToSave, ...conf };
      }
    });

    const jsonData = JSON.stringify(dataToSave, null, 2);

    // Tạo một tệp JSON và tải về
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "saved_content.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col px-20 pt-12 pb-20 bg-white max-md:px-5 h-screen">
      <div className="self-center text-6xl font-bold tracking-tighter text-black max-md:max-w-full max-md:text-4xl">
        Create Your Content with AI
      </div>
      <div className="flex flex-col mt-16 max-md:mt-10 max-md:max-w-full">
        <div className="max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[73%] max-md:ml-0 max-md:w-full">
              <textarea
                className="grow justify-center px-5 py-6 w-full text-sm h-[500px] font-semibold tracking-wide leading-6 rounded-md border border-solid bg-stone-50 border-stone-300 text-black max-md:mt-10 max-md:max-w-full"
                value={content ? content : ""}
              />
            </div>
          </div>
        </div>
        <button
          className="justify-center items-center self-end px-10 py-4 mt-8 mr-28 max-w-full text-xl font-bold tracking-wide leading-7 text-center text-white whitespace-nowrap rounded-md bg-zinc-500 w-[297px] max-md:px-5 max-md:mr-2.5"
          type="button"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Result;
