"use client";
import * as React from "react";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
// import ContentConfig from "./ContentConfig";
import ConfigOption from "./option";
import ContentConfig from "@/app/ConfigOutline/page";
import Link from "next/link";

function sendRequest(url: string) {
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

function Page1() {
  const [options, setOptions] = useState<{ key: number; opt: string }[]>([
    { key: 1, opt: "Posts" },
    { key: 2, opt: "Neutral" },
    { key: 3, opt: "Short" },
    { key: 4, opt: "English" },
  ]);

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
  const [outline_id, setOutline_id] = useState("");

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
      setOutline_id(result.outline_id);
    }
  };

  return (
    <>
      {content === "" ? (
        <>
          <form onSubmit={handleSubmit}>
            <div className="flex text-black bg-white flex-col border  rounded-3xl items-center mb-5 max-md:px-5 ">
              <div className="flex flex-col w-full mb-5 container max-md:max-w-full">
                <section>
                  <h2 className="mt-20 text-2xl font-black leading-9 max-md:mt-10 max-md:max-w-full">
                    WHAT WOULD YOU LIKE TO WRITE ?{" "}
                  </h2>
                  <div className="mt-11 max-md:pr-5 max-md:mt-10 max-md:max-w-full">
                    <ConfigOption handleChangeOption={handleChangeOption} />
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
                    className="px-7 pt-6 pb-56 mt-10 text-xl font-semibold tracking-wide leading-6 rounded-md border border-black border-solid  max-md:px-5 max-md:pb-10 max-md:max-w-full w-1/2 resize-none"
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
                    className="justify-center  px-5 py-5 mt-2.5 text-xl tracking-wide leading-7 rounded-md max-md:px-5  max-md:max-w-full w-1/2 border border-solid border-black"
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
                    className="justify-center  px-5 py-5 mt-2.5 text-xl tracking-wide leading-7 rounded-md   max-md:px-5  max-md:max-w-full w-1/2 border border-solid border-black"
                    placeholder="Example: https://aicontent.dealsquery.com/"
                    value={links}
                    onChange={handleLinksChange}
                  />
                </section>

                <section className="mt-3 flex justify-end">
                  <div className="justify-center items-center pt-5">
                    {/* <Link href="/ConfigOutline"> */}
                    <button
                      type="submit"
                      className="py-5 px-8 text-xl font-bold tracking-wide leading-7 text-center text-white rounded-md bg-gradient-to-r from-blue-300 to-indigo-600 max-md:px-5 max-md:mr-2.5"
                    >
                      {isMutating ? "Generating..." : "Generate Outline"}
                    </button>
                    {/* </Link> */}
                  </div>
                </section>
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
