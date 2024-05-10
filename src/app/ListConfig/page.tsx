"use client";
import React, { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

interface EndProps {
  data: string;
}

interface SendRequest {
  id: string;
}
function sendRequest(url: string, { arg }: { arg: SendRequest }) {
  const info = {
    id: arg.id,
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

const ListConfig: React.FC<EndProps> = () => {
  const [showContent, setShowContent] = useState(false);
  const [modifiedHtml, setModifiedHtml] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const defaultStyles: Record<string, string> = {
    article:
      "font-family: 'Arial', sans-serif; font-size: 20px; margin: 10px 10px 0px 10px; padding: 10px;display: flex; flex-direction: column",
    h1: "font-size: 2.5rem; margin-bottom:5px;text-align:center;",
    h2: "font-size: 1.5rem;",
    h3: "font-size: 1rem;",
    p: "font-size: 1rem; margin-bottom: 0.5rem",
    img: "width: 200px; height: 200px;align-self:center;",
  };

  const applyDefaultStyles = (htmlString: string) => {
    let modifiedHtml = htmlString;
    Object.keys(defaultStyles).forEach((tag) => {
      const regex = new RegExp(`<${tag}\\b[^>]*>(.*?)<\\/${tag}>`, "g");
      modifiedHtml = modifiedHtml.replace(
        regex,
        `<${tag} style="${defaultStyles[tag]}">$1</${tag}>`
      );
    });
    return modifiedHtml;
  };

  const fetcher = (url: string): Promise<any> => {
    return fetch(url).then((r) => r.json());
  };

  const pathList = `api/all-config?user_id=user_1`;
  const { data, error, isLoading } = useSWR(pathList, fetcher);

  const pathApi = `api/generate-content2`;
  const { trigger, isMutating } = useSWRMutation(pathApi, sendRequest);

  const handleGenerateContent = async (id: string) => {
    const result = await trigger({
      id: id,
    });
    if (result) {
      const resultData = applyDefaultStyles(result.content[0]);
      setContent(resultData);
    }
  };

  return (
    <div className="flex flex-col items-center ">
      <div className="w-full flex flex-col rounded-xl">
        <div className="flex flex-col max-md:px-5 ">
          <div className="h-full ">
            {data && !error && !isLoading ? (
              <>
                {data.map((item: any, index: number) => (
                  <>
                    <div key={index}>
                      <button className="flex  h-[60px] w-full items-center justify-between self-center rounded border border-solid bg-white text-xl hover:bg-gray-200">
                        <h2 className="items-center justify-center text-black pl-4 text-xl">
                          {item.title}
                        </h2>
                        <div className="mr-4 flex items-center space-x-4">
                          <button
                            type="button"
                            data-drawer-target="drawer-update-product"
                            data-drawer-show="drawer-update-product"
                            aria-controls="drawer-update-product"
                            className="hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex items-center rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="-ml-0.5 mr-2 h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                              <path
                                fill-rule="evenodd"
                                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            Edit
                          </button>
                          <button
                            type="button"
                            data-drawer-target="drawer-read-product-advanced"
                            data-drawer-show="drawer-read-product-advanced"
                            aria-controls="drawer-read-product-advanced"
                            className="hover:text-primary-700 flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="-ml-0.5 mr-2 h-4 w-4"
                            >
                              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                              />
                            </svg>
                            Preview
                          </button>
                          <button
                            type="button"
                            data-modal-target="delete-modal"
                            data-modal-toggle="delete-modal"
                            className="flex items-center rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="-ml-0.5 mr-2 h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            Delete
                          </button>
                          <button
                            type="button"
                            className="inline-block rounded bg-sky-500 px-6 pb-2 pt-2.5 text-xs  font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-sky-600 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0"
                            // onClick={() => {
                            //   setShowContent(true);
                            //   setModifiedHtml(applyDefaultStyles(item.html));
                            // }}
                            onClick={() =>
                              handleGenerateContent(item.outline_id)
                            }
                          >
                            {isMutating ? "Generating..." : "Generate Content"}
                          </button>
                        </div>
                      </button>
                    </div>
                  </>
                ))}
              </>
            ) : null}
          </div>
          {content && (
            <div
              className="text-black bg-white"
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListConfig;
