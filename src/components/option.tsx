import React, { Children } from "react";
import { useState } from "react";

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
              className="flex px-5 py-5 mt-2 w-full rounded-md border border-solid max-md:pr-5"
              style={{
                borderColor: "#111111",
                backgroundColor: "rgba(255, 255, 255, 0.06)",
              }}
            >
              {data.options.map((option, index) => (
                <option
                  key={index}
                  value={option}
                  className="text-black text-xl"
                >
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

function ConfigOption({ handleChangeOption }: { handleChangeOption: any }) {
  const [options, setOptions] = useState<{ key: number; opt: string }[]>([
    { key: 1, opt: "Posts" },
    { key: 2, opt: "Neutral" },
    { key: 3, opt: "Short" },
    { key: 4, opt: "English" },
  ]);
  return (
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
  );
}
export default ConfigOption;
