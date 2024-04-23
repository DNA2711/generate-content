import * as React from "react";

interface ContentCardProps {
  imageSrc: string;
  title: string;
  date: string;
  author: string;
}

const ContentCard: React.FC<ContentCardProps> = ({
  imageSrc,
  title,
  date,
  author,
}) => {
  return (
    <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow px-3.5 pt-4 pb-7 text-xs text-white rounded border border-white border-solid max-md:mt-4">
        <h3 className="mt-3.5 text-base font-medium tracking-wide leading-7">
          {title}
        </h3>
        <div className="flex gap-2 mt-5">
          <time className="flex-auto my-auto">{date}</time>
        </div>
        <div className="flex gap-2 mt-3.5">
          <div className="flex-auto my-auto">{author}</div>
        </div>
      </div>
    </div>
  );
};

const recentContents = [
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/8b28ec6dc8a9d50a15a8252b17d61774c88c607706883097690d6418a552545f?apiKey=16f64c66af164103b8a4d36efaf73c1f&",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    date: "10 - 03 -2023",
    author: "William Shakepear",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/8b28ec6dc8a9d50a15a8252b17d61774c88c607706883097690d6418a552545f?apiKey=16f64c66af164103b8a4d36efaf73c1f&",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    date: "10 - 03 -2023",
    author: "William Shakepear",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/8b28ec6dc8a9d50a15a8252b17d61774c88c607706883097690d6418a552545f?apiKey=16f64c66af164103b8a4d36efaf73c1f&",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    date: "10 - 03 -2023",
    author: "William Shakepear",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/2df2407f9a7c7c44da90538d726d646b2b80f2949fe90314c8058d54b53fb7fe?apiKey=16f64c66af164103b8a4d36efaf73c1f&",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    date: "10 - 03 -2023",
    author: "William Shakepear",
  },
];

function MyComponent() {
  return (
    <div className="flex flex-col pb-20 bg-slate-950">
      <div className="flex flex-col self-center px-5 mt-4 w-full max-w-[1079px] max-md:max-w-full">
        <div className="flex gap-5 justify-between px-px text-2xl text-white max-md:flex-wrap">
          <div className="flex gap-3.5">
            <div className="flex-auto my-auto">Write your main topic</div>
          </div>
          <div className="flex gap-4">
            <div className="flex-auto my-auto">EFFORTLESS & TIME-SAVING</div>
          </div>
          <div className="flex gap-4">
            <div className="flex-auto my-auto">SEO FRIENDLY CONTENT</div>
          </div>
        </div>
        <h2 className="mt-28 text-2xl font-medium text-white max-md:mt-10 max-md:max-w-full">
          RECENT CONTENTS
        </h2>
        <div className="px-0.5 mt-14 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            {recentContents.map((content, index) => (
              <ContentCard key={index} {...content} />
            ))}
          </div>
        </div>

        <section className="mt-16 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[43%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow text-xl text-white max-md:mt-10 max-md:max-w-full">
                <h2 className="text-2xl max-md:max-w-full">
                  WHAT WOULD YOU LIKE TO WRITE ?
                </h2>
                <div className="mt-12 max-md:mt-10 max-md:max-w-full">
                  Type of content
                </div>
                <div className="mt-3.5 text-sm tracking-normal leading-5 text-neutral-500 max-md:max-w-full">
                  Choose the type of content that will be generated
                </div>
                <div className="mt-9 tracking-normal max-md:max-w-full">
                  Tone of voice
                </div>
                <div className="mt-5 text-base tracking-normal leading-6 text-neutral-500 max-md:max-w-full">
                  Choose your desired emotional impact on readers
                </div>
                <div className="mt-11 tracking-normal max-md:mt-10 max-md:max-w-full">
                  Content length
                </div>
                <div className="mt-3.5 text-base tracking-normal leading-6 text-neutral-500 max-md:max-w-full">
                  Choose the length of generated content
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[57%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col mt-16 text-sm font-medium tracking-normal text-white whitespace-nowrap max-md:mt-10 max-md:max-w-full">
                <div className="justify-center items-start px-6 py-3.5 rounded border border-white border-solid bg-white bg-opacity-10 max-md:px-5 max-md:max-w-full">
                  Posts
                </div>
                <div className="justify-center items-start px-6 py-3.5 mt-12 rounded border border-white border-solid bg-white bg-opacity-10 max-md:px-5 max-md:mt-10 max-md:max-w-full">
                  Neutral
                </div>
                <div className="justify-center items-start px-6 py-3.5 mt-14 rounded border border-white border-solid bg-white bg-opacity-10 max-md:px-5 max-md:mt-10 max-md:max-w-full">
                  Neutral
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-9 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[44%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col mt-2 text-xl tracking-normal text-white max-md:mt-10 max-md:max-w-full">
                <h2 className="max-md:max-w-full">
                  What is your content about?
                </h2>
                <div className="mt-80 max-md:mt-10 max-md:max-w-full">
                  What are the focus keywords of your content?
                </div>
                <div className="mt-9 text-base tracking-normal max-md:max-w-full">
                  Optional
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[56%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow text-sm leading-7 text-white max-md:mt-10 max-md:max-w-full">
                <div className="px-6 pt-5 pb-40 tracking-normal rounded border border-white border-solid bg-white bg-opacity-10 max-md:px-5 max-md:pb-10 max-md:max-w-full">
                  Let you know more about your content idea. For example:
                  Article about how to use WordPress to dive into website
                  development including tutorials how to use it in a simple way
                </div>
                <div className="px-6 pt-5 pb-20 mt-10 tracking-normal rounded border border-white border-solid bg-white bg-opacity-10 max-md:px-5 max-md:mt-10 max-md:max-w-full">
                  If you skip this part. AI will automatically generate keyword
                  suggestions after you generate the content
                </div>
                <button className="justify-center items-center px-16 py-3.5 mt-12 text-xl text-black rounded max-md:px-5 max-md:mt-10 max-md:max-w-full">
                  Generate content
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
