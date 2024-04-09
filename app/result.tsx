import * as React from "react";
import { useState } from "react";
import End from "./end";

interface ResultProps {
  content: string;
  data: string;
  config: {
    key: number;
    opt: string;
  }[];
}

const Result: React.FC<ResultProps> = ({ content, config, data }) => {
  const [rangeValue, setRangeValue] = useState(5);
  const [save, setSave] = useState(false);

  const handleSave = () => {
    let dataToSave = {
      content: content,
      title: data,
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

      if (item.key === 4) {
        const conf = { content_length: item.opt };
        dataToSave = { ...dataToSave, ...conf };
      }
      setSave(true);
    });

    const jsonData = JSON.stringify(dataToSave, null, 2);

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
    <>
      {!save ? (
        <>
          <div className="flex flex-col px-20 pt-12 pb-20 bg-white max-md:px-5 h-screen">
            <div className="self-center text-6xl bg-gradient-to-r from-blue-300 bg-clip-text inline-block text-transparent to-indigo-600 font-bold tracking-tighter text-black max-md:max-w-full max-md:text-4xl">
              Create Your Content with AI
            </div>
            <div className="flex flex-col mt-16 max-md:mt-10 max-md:max-w-full">
              <div className="max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col w-[70%] max-md:ml-0 max-md:w-full">
                    <textarea
                      className="grow justify-center px-5 py-6 w-full text-lg h-[500px] font-semibold tracking-wide leading-6 rounded-md border border-solid  border-stone-300 text-black max-md:mt-10 max-md:max-w-full resize-none"
                      value={content ? content : ""}
                    />
                  </div>
                  <div className="flex flex-col max-md:w-full border border-solid border-gray-300 rounded-md p-6">
                    <label
                      htmlFor="dropdown1"
                      className="text-lg font-semibold text-gray-800"
                    >
                      Trending{" "}
                    </label>
                    <select
                      id="dropdown1"
                      className="mt-2 px-4 py-2 border rounded-md text-black"
                      defaultValue="option1"
                    >
                      <option className="text-black" value="option1">
                        AI
                      </option>
                      <option className="text-black" value="option2">
                        Chat GPT
                      </option>
                      <option className="text-black" value="option3">
                        Job
                      </option>
                      <option className="text-black" value="option3">
                        Layoff
                      </option>
                      <option className="text-black" value="option3">
                        Apple
                      </option>
                      <option className="text-black" value="option3">
                        Russia vs Ukraine
                      </option>
                      <option className="text-black" value="option3">
                        Crypto
                      </option>
                    </select>

                    <label
                      htmlFor="dropdown2"
                      className="text-lg font-semibold text-gray-800 mt-6"
                    >
                      Author{" "}
                    </label>
                    <select
                      id="dropdown2"
                      className="mt-2 px-4 py-2 border rounded-md text-black"
                      defaultValue="option1"
                    >
                      <option className="text-black" value="option1">
                        Business Owner{" "}
                      </option>
                      <option className="text-black" value="option2">
                        Marketer{" "}
                      </option>
                      <option className="text-black" value="option3">
                        Educator{" "}
                      </option>
                      <option className="text-black" value="option3">
                        Travel Blogger{" "}
                      </option>
                      <option className="text-black" value="option3">
                        Financial Advisor{" "}
                      </option>
                      <option className="text-black" value="option3">
                        Creative Artist{" "}
                      </option>
                      <option className="text-black" value="option3">
                        Health and Wellness Coach{" "}
                      </option>
                      <option className="text-black" value="option3">
                        Salesperson{" "}
                      </option>
                    </select>

                    <label
                      htmlFor="inputField"
                      className="text-lg font-semibold text-gray-800 mt-6"
                    >
                      Backlink{" "}
                    </label>
                    <input
                      id="inputField"
                      type="text"
                      className="mt-2 px-4 py-2 border rounded-md text-black"
                    />

                    <label
                      htmlFor="emotionField"
                      className="text-lg font-semibold text-gray-800 mt-6"
                    >
                      {"Emotion"}
                    </label>
                    <input
                      id="rangeField"
                      type="range"
                      min={1}
                      max={10}
                      step={1}
                      value={rangeValue}
                      onChange={(event) =>
                        setRangeValue(Number(event.target.value))
                      }
                      className="mt-2 py-2 border rounded-md"
                    />
                    <div className="text-black border ">{rangeValue}</div>

                    <label
                      htmlFor="inputField"
                      className="text-lg font-semibold text-gray-800 mt-6"
                    >
                      API{" "}
                    </label>
                    <input
                      id="inputField"
                      type="text"
                      className="mt-2 px-4 py-2 border rounded-md text-black"
                    />
                  </div>
                </div>
              </div>
              <button
                className="justify-center items-center self-end px-10 py-4 mt-8 mr-[175px] max-w-full text-xl font-bold tracking-wide leading-7 text-center text-white whitespace-nowrap rounded-md bg-gradient-to-r from-blue-300 to-indigo-600 w-[297px] max-md:px-5 max-md:mr-2.5"
                type="button"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </>
      ) : (
        <End data={data} />
      )}
    </>
  );
};

export default Result;
