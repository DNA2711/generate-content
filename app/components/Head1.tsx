import Image from "next/image";

const Head1 = () => {
  return (
    <header className="flex flex-col max-md:pl-5 max-md:max-w-full   ">
      <div
        className="bg-cover pt-5 pb-8"
        style={{
          backgroundImage: "url('/bg1.png')",
        }}
      >
        <div className="pl-5">
          <Image
            loading="lazy"
            src="/logo.png"
            alt=""
            className="shrink-0 aspect-[1.09] "
            width={80}
            height={49}
          />
        </div>

        <div className="flex justify-around gap-5 max-md:flex-col max-md:gap-0">
          <div className="pt-10">
            <h2
              className="text-4xl text-center"
              style={{ fontFamily: "UTM Ericsson Capital", color: "#00F9FF" }}
            >
              CREATE YOUR CONTENT WITH
            </h2>
            <h1
              className="text-5xl text-center"
              style={{ fontFamily: "UTM Ericsson Capital", color: "#00F9FF" }}
            >
              ARTIFICIAL INTELLIGENCE
            </h1>
          </div>
          <div>
            <Image
              loading="lazy"
              src="/robo.png"
              alt=""
              className=" flex-shrink: 0 pr-2"
              width={400}
              height={200}
            />{" "}
          </div>
        </div>
      </div>

      <div
        className="flex justify-around pt-8"
        style={{ fontFamily: "UTM Ericsson Capital" }}
      >
        <div className="flex">
          <Image
            loading="lazy"
            src="/icon1.png"
            alt=""
            className=" flex-shrink: 0 pr-2"
            width={35}
            height={51}
          />{" "}
          <h2 className="text-xl">Write your main topic</h2>{" "}
        </div>
        <div className="flex">
          <Image
            loading="lazy"
            src="/icon2.png"
            alt=""
            className=" flex-shrink: 0 pr-2"
            width={35}
            height={51}
          />{" "}
          <h2 className="text-xl">EFFORTLESS & TIME-SAVING</h2>{" "}
        </div>
        <div className="flex">
          <Image
            loading="lazy"
            src="/icon3.png"
            alt=""
            className=" flex-shrink: 0 pr-2"
            width={35}
            height={51}
          />{" "}
          <h2 className="text-xl">SEO FRIENDLY CONTENT</h2>
        </div>
      </div>
    </header>
  );
};

export default Head1;
