import * as React from "react";
import { useState } from "react";
import ListConfig from "./ListConfig";
import Image from "next/image";
import useSWRMutation from "swr/mutation";
import SocialButtons from "./components/SocialButtons";

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
          <div className="flex flex-col px-20 pt-12 pb-20 bg-white max-md:px-5 h-auto">
            <div className="flex gap-5 justify-between px-px w-full text-sm whitespace-nowrap text-zinc-700 max-md:flex-wrap max-md:max-w-full">
              <button>
                <Image
                  loading="lazy"
                  src="/logo.png"
                  alt=""
                  className="shrink-0 aspect-[1.09] w-[53px]"
                  width={53}
                  height={49}
                />
              </button>
            </div>
            <div className="self-center text-6xl bg-gradient-to-r from-blue-300 bg-clip-text inline-block text-transparent to-indigo-600 font-bold tracking-tighter text-black max-md:max-w-full max-md:text-4xl">
              Create Your Content with AI
            </div>
            <div className="flex flex-col w-full h-screen mt-16 max-md:mt-10 max-md:max-w-full">
              <div className="max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col w-[70%] max-md:ml-0 max-md:w-full">
                    <textarea
                      className="grow justify-center px-5 py-6 w-full text-lg h-[500px] font-semibold tracking-wide leading-6 rounded-md border border-solid  border-stone-300 text-black max-md:mt-10 max-md:max-w-full resize-none"
                      value={content ? content : ""}
                    />
                  </div>
                  <div className="flex flex-col max-md:w-full border border-solid w-[30%] border-gray-300 rounded-md p-6">
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
                      // value={author}
                      // onChange={handleAuthorChange}
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
                      {/* {emotion} */}
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

                    <SocialButtons />

                    <button
                      className="justify-center items-center w-full px-10 py-4 mt-8 max-w-full text-xl font-bold tracking-wide leading-7 text-center text-white whitespace-nowrap rounded-md bg-gradient-to-r from-blue-300 to-indigo-600  max-md:px-5 max-md:mr-2.5"
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
        </>
      ) : (
        <ListConfig data={data} />
      )}
    </>
  );
};

export default ContentConfig;
