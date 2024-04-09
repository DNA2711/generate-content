"use client";
import * as React from "react";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import Result from "./result";
import Image from "next/image";

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
    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow py-1.5 text-sm font-semibold tracking-wide max-md:mt-10">
        <div className=" text-slate-800">{data.label}</div>
        <select
          value={selectedOption}
          onChange={handleOptionChange}
          className="flex gap-5 justify-between px-6 py-5 mt-3.5 whitespace-nowrap rounded-md border border-solid bg-stone-50 border-zinc-300 leading-[200%] text-neutral-500 max-md:pr-5"
        >
          {data.options.map((option, index) => (
            <option key={index} value={option} className="">
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4 leading-6 text-zinc-500">{data.description}</div>
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

  const handleContentIdeaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContentIdea(event.target.value);
  };

  const handleKeywordsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(event.target.value);
  };

  const pathApi = `api/generate-content?type=${findOption(1)}&tone=${findOption(
    2
  )}&length=${findOption(
    3
  )}&about=${contentIdea}&keywords=${keywords}&language=${findOption(4)}`;

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const { trigger, isMutating } = useSWRMutation(pathApi, sendRequest);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await trigger();
    if (result.status === 200) {
      setContent(result.outline);
      setEmotion(result.emotion);
      setTitle(result.title);
    }
  };

  return (
    <>
      {content === "" ? (
        <>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center px-16 pt-12 pb-20 bg-white max-md:px-5">
              <div className="flex flex-col w-full max-w-[1162px] max-md:max-w-full">
                <header className="flex flex-col pl-8 text-black max-md:pl-5 max-md:max-w-full">
                  <div className="flex gap-5 justify-between px-px w-full text-sm whitespace-nowrap text-zinc-700 max-md:flex-wrap max-md:max-w-full">
                    <Image
                      loading="lazy"
                      src="/logo.png"
                      alt=""
                      className="shrink-0 aspect-[1.09] w-[53px]"
                      width={53}
                      height={49}
                    />
                  </div>
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col items-start self-stretch my-auto text-xl tracking-normal max-md:mt-10 max-md:max-w-full">
                        <div className="self-stretch text-5xl font-bold tracking-tight max-md:max-w-full max-md:text-4xl">
                          <span className="">
                            <h1 className="bg-gradient-to-r from-blue-300 to-indigo-600 bg-clip-text inline-block text-transparent">
                              {" "}
                              CREAT YOUR CONTENT <br /> WITH AI
                            </h1>
                          </span>
                        </div>

                        <div className="flex gap-5 mt-10 text-neutral-800 max-md:mt-10">
                          <Image
                            loading="lazy"
                            src="/icon.png"
                            alt=""
                            className="shrink-0 bg-white rounded-full aspect-square h-[39px] w-[39px]"
                            width={39}
                            height={39}
                          />
                          <div className="flex-auto my-auto">
                            Write your main topic
                          </div>
                        </div>
                        <div className="flex gap-5 mt-4 text-neutral-800">
                          <Image
                            loading="lazy"
                            src="/icon.png"
                            alt=""
                            className="shrink-0 bg-white rounded-full aspect-square h-[39px] w-[39px]"
                            width={39}
                            height={39}
                          />
                          <div className="flex-auto my-auto">
                            Effortless and time-saving
                          </div>
                        </div>
                        <div className="flex gap-5 mt-4 text-neutral-800">
                          <Image
                            loading="lazy"
                            src="/icon.png"
                            alt=""
                            className="shrink-0 bg-white rounded-full aspect-square h-[39px] w-[39px]"
                            width={39}
                            height={39}
                          />
                          <div className="flex-auto my-auto">
                            SEO-friendly content
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                      <Image
                        loading="lazy"
                        src="/anh1.png"
                        alt=""
                        className="grow w-full aspect-[1.04] max-md:mt-10 max-md:max-w-full"
                        width={624}
                        height={600}
                      />
                    </div>
                  </div>
                </header>
                <section>
                  <h2 className="mt-20 text-2xl font-black leading-9 text-black max-md:mt-10 max-md:max-w-full">
                    What do you want to make today?
                  </h2>
                  <div className="mt-11 max-md:pr-5 max-md:mt-10 max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
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
                <section>
                  <h2 className="mt-12 text-2xl font-black leading-9 text-black max-md:mt-10 max-md:max-w-full">
                    What is your content about?
                  </h2>
                  <textarea
                    className="px-7 pt-6 pb-56 mt-10 text-sm font-semibold tracking-wide leading-6 rounded-md border border-solid bg-stone-50 border-stone-300 text-black max-md:px-5 max-md:pb-10 max-md:max-w-full w-full resize-none"
                    placeholder="Let us know more about your content idea. For example: Article about how to use WordPress to dive into website development including tutorials how to use it in a simple way..."
                    value={contentIdea}
                    onChange={handleContentIdeaChange}
                    required
                  />
                  <div className="mt-2 text-sm font-semibold tracking-wide leading-6 text-zinc-500 max-md:max-w-full">
                    Enter at least 10 characters
                  </div>
                </section>
                <section>
                  <div className="flex gap-5 self-start mt-5 leading-[150%] max-md:flex-wrap">
                    <h2 className="text-2xl font-black text-black max-md:max-w-full">
                      What are the focus keywords of your content?
                    </h2>
                    <div className="text-xl text-zinc-500">Optional</div>
                  </div>
                  <div className="mt-7 text-sm leading-5 text-zinc-500 max-md:max-w-full">
                    If you skip this part. AI will automatically generate
                    keyword suggestions after you generate the content
                  </div>
                  <input
                    type="text"
                    className="justify-center items-start px-5 py-5 mt-2.5 text-sm tracking-wide leading-7 rounded-md border border-solid bg-stone-50 border-neutral-200 text-black max-md:px-5 max-md:max-w-full w-full"
                    placeholder="Example: website development. WordPress tutorial, ..."
                    value={keywords}
                    onChange={handleKeywordsChange}
                  />
                  <div className="mt-2.5 text-sm leading-5 text-zinc-500 max-md:max-w-full">
                    Press Enter key to finalize a keyword
                  </div>
                </section>

                <button
                  type="submit"
                  className="justify-center self-end px-10 py-4 mt-7 mr-16 text-xl font-bold tracking-wide leading-7 text-center text-white rounded-md bg-gradient-to-r from-blue-300 to-indigo-600 max-md:px-5 max-md:mr-2.5"
                >
                  {isMutating ? "Generating..." : "Generate Content"}
                </button>
              </div>
            </div>
          </form>
        </>
      ) : (
        <>
          <Result content={content} config={options} data={title} />
        </>
      )}
    </>
  );
}

export default Page1;
