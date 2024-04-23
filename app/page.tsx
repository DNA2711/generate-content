"use client";
import * as React from "react";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import ContentConfig from "./ContentConfig";
import Head1 from "./components/Head1";
import styles from "./styles/Home.module.css";
import { LanguageSelector } from "./components/LanguageSelector";
import { Inter } from "next/font/google";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

const inter = Inter({ subsets: ["latin"] });

interface ContentOptionData {
  id: number;
  label: string;
  description: string;
  options: string[];
}

interface ContentOptionProps {
  data: ContentOptionData;
  onChangeOption: (key: number, opt: string) => void;
}

function sendRequest(url: string) {
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

const ContentOption: React.FC<ContentOptionProps> = ({
  data,
  onChangeOption = () => {},
}) => {
  const [selectedOption, setSelectedOption] = React.useState("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    onChangeOption(data.id, event.target.value);
  };

  return (
    <div className=" max-md:ml-0 max-md:w-full">
      <div className="  max-md:mt-10">
        <div className="flex items-center  ">
          <div className=" w-1/2 text-xl">{data.label}</div>

          <div className="w-1/2">
            <select
              value={selectedOption}
              onChange={handleOptionChange}
              className="flex px-5 py-3 mt-2  w-full rounded-md border border-solid bg-stone-50 border-zinc-300 text-neutral-500 max-md:pr-5"
            >
              {data.options.map((option, index) => (
                <option key={index} value={option} className="">
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-6 leading-6 text-zinc-500">{data.description}</div>
      </div>
    </div>
  );
};

const contentOptions: ContentOptionData[] = [
  {
    id: 1,
    label: "Content type",
    description: "Choose the type of content that will be generated",
    options: [
      "Posts",
      "Articles",
      "Product descriptions",
      "Blog post",
      "Social media caption",
      "Product description",
      "Creative story",
      "How-to guide",
      "Review",
      "Opinion piece",
    ],
  },
  {
    id: 2,
    label: "Tone of voice",
    description: "Choose your desired emotional impact on readers",
    options: [
      "Neutral",
      "Formal",
      "Informal",
      "Friendly",
      "Professional",
      "Informative",
      "Humorous",
      "Persuasive",
      "Inspirational",
      "Educational",
      "Conversational",
      "Promotional",
      "Technical",
      "Casual",
    ],
  },
  {
    id: 3,
    label: "Content length",
    description: "Choose the length of generated content",
    options: ["Short", "Medium", "Long", "Very long"],
  },
  {
    id: 4,
    label: "Language",
    description: "Choose the language of generated content",
    options: [
      "English",
      "Vietnamese",
      "Hindi",
      "Chinese",
      "Japanese",
      "Standard Arabic",
      "Spanish",
      "French",
      "Russian",
      "Portuguese",
      "German",
      "Italian",
      "Turkish",
      "Dutch",
      "Polish",
      "Korean",
      "Indonesian",
      "Thai",
      "Romanian",
      "Greek",
    ],
  },
];

function Page1() {
  const [options, setOptions] = useState<{ key: number; opt: string }[]>([
    { key: 1, opt: "Posts" },
    { key: 2, opt: "Neutral" },
    { key: 3, opt: "Short" },
    { key: 4, opt: "English" },
  ]);

  const handleChangeOption = (key: number, opt: string) => {
    setOptions((prev) => {
      const index = prev.findIndex((item) => item.key === key);
      if (index >= 0) {
        prev[index] = { key, opt };
        return [...prev];
      } else {
        return [...prev, { key, opt }];
      }
    });
  };

  const findOption = (key: number) => {
    const index = options.findIndex((item) => item.key === key);
    return index >= 0 ? options[index].opt : "";
  };

  const [contentIdea, setContentIdea] = useState("");
  const [keywords, setKeywords] = useState("");
  const [emotion, setEmotion] = React.useState("");
  const [links, setLinks] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [outline_id, setoutline_id] = useState("");

  const handleContentIdeaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContentIdea(event.target.value);
  };

  const handleKeywordsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(event.target.value);
  };

  const handleLinksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLinks(event.target.value);
  };

  const pathApi = `api/generate-content?type=${findOption(1)}
  &tone=${findOption(2)}
  &length=${findOption(3)}
  &language=${findOption(4)}
  &about=${contentIdea}&keywords=${keywords}&links=${links}`;

  const { trigger, isMutating } = useSWRMutation(pathApi, sendRequest);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await trigger();
    if (result) {
      setContent(result.outline);
      setEmotion(result.emotion);
      setTitle(result.title);
      setoutline_id(result.outline_id);
    }
  };

  return (
    <>
      {content === "" ? (
        <>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center  bg-slate-950 max-md:px-5">
              <div className="flex flex-col w-full max-w-[1200px] max-md:max-w-full">
                <Head1 />
                <section>
                  <h2 className="mt-20 text-2xl font-black leading-9 max-md:mt-10 max-md:max-w-full">
                    WHAT WOULD YOU LIKE TO WRITE ?{" "}
                  </h2>
                  <div className="mt-11 max-md:pr-5 max-md:mt-10 max-md:max-w-full">
                    <div className=" gap-5 max-md:flex-col max-md:gap-0">
                      {contentOptions.map((option, index) => (
                        <ContentOption
                          key={index}
                          data={option}
                          onChangeOption={handleChangeOption}
                        />
                      ))}
                    </div>
                  </div>
                </section>

                <section className="flex">
                  <div className="flex w-1/2">
                    <h2 className="mt-8 text-xl  leading-9  max-md:mt-10 max-md:max-w-full">
                      What is your content about?
                    </h2>
                    <p className="text-red-500 mt-10 ml-2">*</p>
                  </div>

                  <textarea
                    className="px-7 pt-6 pb-56 mt-10 text-xl font-semibold tracking-wide leading-6 rounded-md border border-solid  max-md:px-5 max-md:pb-10 max-md:max-w-full w-1/2 resize-none text-black"
                    placeholder="Let us know more about your content idea. For example: Article about how to use WordPress to dive into website development including tutorials how to use it in a simple way..."
                    value={contentIdea}
                    onChange={handleContentIdeaChange}
                    required
                  />
                </section>

                <section className="flex mt-8">
                  <div className="flex w-1/2 gap-5 self-start mt-5  max-md:flex-wrap flex-col">
                    <h2 className="text-xl  max-md:max-w-full">
                      What are the focus keywords of your content?
                    </h2>
                    <div className="text-xl text-zinc-500">Optional</div>
                  </div>

                  <input
                    type="text"
                    className="justify-center items-start px-5 py-5 mt-2.5 text-sm tracking-wide leading-7 rounded-md border border-solid bg-stone-50 border-neutral-200 text-black max-md:px-5 max-md:max-w-full w-1/2"
                    placeholder="Example: website development. WordPress tutorial, ..."
                    value={keywords}
                    onChange={handleKeywordsChange}
                  />
                </section>

                <section className="flex mt-8">
                  <div className="flex flex-col gap-5 self-start mt-5  max-md:flex-wrap w-1/2">
                    <h2 className="text-xl max-md:max-w-full">
                      What is the content you want to write similar to?{" "}
                    </h2>
                    <div className="text-xl text-zinc-500">Optional</div>
                  </div>

                  <input
                    type="text"
                    className="justify-center items-start px-5 py-5 mt-2.5 text-sm tracking-wide leading-7 rounded-md border border-solid  border-white text-black max-md:px-5 max-md:max-w-full w-1/2 opacity-[6%]"
                    placeholder="Example: https://aicontent.dealsquery.com/"
                    value={links}
                    onChange={handleLinksChange}
                  />
                </section>

                <button
                  type="submit"
                  className="justify-center self-end px-10 py-4 mt-7 mr-16 text-xl font-bold tracking-wide leading-7 text-center text-white rounded-md bg-gradient-to-r from-blue-300 to-indigo-600 max-md:px-5 max-md:mr-2.5"
                >
                  {isMutating ? "Generating..." : "Generate Outline"}
                </button>
              </div>
            </div>
          </form>
        </>
      ) : (
        <>
          <ContentConfig
            content={content}
            config={options}
            data={title}
            emotion={emotion}
            contentIdea={contentIdea}
            keywords={keywords}
            links={links}
            outline_id={outline_id}
          />
        </>
      )}
    </>
  );
}

export default Page1;
