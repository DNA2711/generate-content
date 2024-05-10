"use client";
import * as React from "react";
import { useState } from "react";
// import ListConfig from "./ListConfig";
import Image from "next/image";
import useSWRMutation from "swr/mutation";
import SocialButtons from "@/components/SocialButtons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ListConfig from "../ListConfig/page";

interface ContentConfigProps {
  content: string;
  data: string;
  emotion: string;
  contentIdea: string;
  keywords: string;
  links: string;
  outline_id: string;
  config: {
    key: number;
    opt: string;
  }[];
}
interface SendRequest {
  outline_id: string;
  user_id: string;
  content_type: string;
  tone_of_voice: string;
  content_length: string;
  content_about: string;
  keywords_of_content: string;
  // author: string;
  // emotion: string;
  // level_of_emotion: number;
  // back_link: string;
  language: string;
  outline: string;
  title: string;
  // schedule: string;
}
function sendRequest(url: string, { arg }: { arg: SendRequest }) {
  const info = {
    outline_id: arg.outline_id,
    user_id: arg.user_id,
    content_type: arg.content_type,
    tone_of_voice: arg.tone_of_voice,
    content_length: arg.content_length,
    language: arg.language,
    content_about: arg.content_about,
    keywords_of_content: arg.keywords_of_content,
    outline: arg.outline,
    title: arg.title,
  };
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  }).then((res) => res.json());
}

const ContentConfig: React.FC<ContentConfigProps> = ({
  data,
  content,
  config,
  contentIdea,
  keywords,
  links,
  outline_id,
  emotion,
}) => {
  const [rangeValue, setRangeValue] = useState(5);
  const [save, setSave] = useState(false);
  const [author, setAuthor] = useState(false);
  const pathApi = `api/saveconfig`;

  const { trigger, isMutating } = useSWRMutation(pathApi, sendRequest);
  const handleSave = async (
    id: string,
    userId: string,
    content_type: string,
    tone_of_voice: string,
    content_length: string,
    language: string,
    content_about: string,
    keywords_of_content: string,
    outline: string,
    title: string
  ) => {
    const ContentConfig = await trigger({
      outline_id: id,
      user_id: userId,
      content_type: content_type,
      tone_of_voice: tone_of_voice,
      content_length: content_length,
      language: language,
      content_about: content_about,
      keywords_of_content: keywords_of_content,
      outline: outline,
      title: data,
    });

    let dataToSave = {
      title: data,
      content: content,
      contentIdea: contentIdea,
      keywords: keywords,
      links: links,
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
        const conf = { language: item.opt };
        dataToSave = { ...dataToSave, ...conf };
      }
      setSave(true);
    });

    // const jsonData = JSON.stringify(dataToSave, null, 2);

    // const blob = new Blob([jsonData], { type: "application/json" });
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement("a");
    // a.href = url;
    // a.download = "Config.json";
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
    // URL.revokeObjectURL(url);

    // const handleAuthorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //   setAuthor(event.target.value);
    // };
  };
  return (
    <>
      {!save ? (
        <>
          <div className="flex h-auto mb-5 mt-10  flex-col items-center bg-white rounded-xl max-md:px-5">
            <div className="container mb-5 flex flex-col">
              <div className="mt-16 flex h-auto w-full flex-col max-md:mt-10 max-md:max-w-full">
                <div className="max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className=" flex h-max  w-[70%] flex-col rounded-md border border-solid max-md:ml-0 max-md:w-full">
                      <div className="flex items-center  justify-between rounded-tl-md rounded-tr-md border border-solid  py-4">
                        <div className="ml-5 text-2xl text-black">{data}</div>
                        <div className="">
                          <CopyToClipboard text={content ? content : ""}>
                            <button type="button" className=" mr-5 text-black ">
                              <div className="flex">
                                Copy
                                <Image
                                  src="/copy.png"
                                  className="ml-2"
                                  alt="Copy"
                                  width={20}
                                  height={49}
                                />
                              </div>
                            </button>
                          </CopyToClipboard>
                        </div>
                      </div>
                      <textarea
                        className=" h-screen w-full resize-none justify-center overflow-hidden bg-white text-black p-5 text-xl font-semibold leading-6 tracking-wide max-md:mt-10 max-md:max-w-full"
                        value={content ? content : ""}
                        readOnly
                      />
                    </div>

                    <div className="flex w-[40%] flex-col rounded-md border border-solid border-white text-black  max-md:w-full ">
                      <label
                        htmlFor="dropdown1"
                        className="text-lg font-semibold "
                      >
                        Trending{" "}
                      </label>
                      <select
                        id="dropdown1"
                        className="mt-2 rounded-md border bg-white px-4 py-2 "
                        defaultValue="option1"
                      >
                        <option className="" value="option1">
                          AI
                        </option>
                        <option className="" value="option2">
                          Chat GPT
                        </option>
                        <option className="" value="option3">
                          Job
                        </option>
                        <option className="" value="option3">
                          Layoff
                        </option>
                        <option className="" value="option3">
                          Apple
                        </option>
                        <option className="" value="option3">
                          Russia vs Ukraine
                        </option>
                        <option className="" value="option3">
                          Crypto
                        </option>
                      </select>

                      <label
                        htmlFor="dropdown2"
                        className="mt-6 text-lg  font-semibold"
                      >
                        Author{" "}
                      </label>
                      <select
                        id="dropdown2"
                        className="mt-2 rounded-md border bg-white px-4 py-2 "
                        defaultValue="option1"
                        // value={author}
                        // onChange={handleAuthorChange}
                      >
                        <option className="" value="option1">
                          Business Owner{" "}
                        </option>
                        <option className="" value="option2">
                          Marketer{" "}
                        </option>
                        <option className="" value="option3">
                          Educator{" "}
                        </option>
                        <option className="" value="option3">
                          Travel Blogger{" "}
                        </option>
                        <option className="" value="option3">
                          Financial Advisor{" "}
                        </option>
                        <option className="" value="option3">
                          Creative Artist{" "}
                        </option>
                        <option className="" value="option3">
                          Health and Wellness Coach{" "}
                        </option>
                        <option className="" value="option3">
                          Salesperson{" "}
                        </option>
                      </select>

                      <label
                        htmlFor="inputField"
                        className="mt-6 text-lg  font-semibold"
                      >
                        Backlink{" "}
                      </label>
                      <input
                        id="inputField"
                        type="text"
                        className="mt-2 rounded-md border bg-white px-4 py-2"
                      />

                      <label
                        htmlFor="emotionField"
                        className="mt-6 text-lg  font-semibold"
                      >
                        {emotion}
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
                        className="mt-2 rounded-md border py-2"
                      />
                      <div className=" border ">{rangeValue}</div>

                      <label
                        htmlFor="inputField"
                        className="mt-6 text-lg  font-semibold"
                      >
                        API{" "}
                      </label>
                      <input
                        id="inputField"
                        type="text"
                        className="mt-2 rounded-md border bg-white px-4 py-2"
                      />

                      <SocialButtons />

                      <button
                        className="mt-8 w-full max-w-full items-center justify-center whitespace-nowrap rounded-md bg-gradient-to-r from-blue-300 to-indigo-600 px-10 py-4 text-center text-xl font-bold leading-7 tracking-wide text-white  max-md:mr-2.5 max-md:px-5"
                        type="button"
                        onClick={() =>
                          handleSave(
                            outline_id,
                            "user_1",
                            config[0].opt,
                            config[1].opt,
                            config[2].opt,
                            config[3].opt,
                            contentIdea,
                            keywords,
                            content,
                            data
                          )
                        }
                      >
                        Save Config
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <ListConfig data={data} />
      )}
    </>
  );
};

export default ContentConfig;
