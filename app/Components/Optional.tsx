// ContentOption.tsx
import React from "react";

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

const Optional: React.FC<ContentOptionProps> = ({
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

export default Optional;
