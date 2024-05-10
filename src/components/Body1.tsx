import Link from "next/link";

const Body1 = () => {
  return (
    <div className="">
      <div className="leading-tight mt-[100px]">
        <h1 className="text-[150px] text-center font-bold text-balance ">
          Success Driven by{" "}
          <span className="bg-gradient-to-r text-transparent bg-clip-text from-fuchsia-500 via-purple-600 to-cyan-400 leading-[5px] ">
            AI-Powered!
          </span>
        </h1>
      </div>
      <div className="mt-[20px]  text-[40px]">
        <p className="text-slate-200 text-balance text-center ">
          AI Content keeps your team’s work on-brand, on message, and on time.
          Innovation with AI.
        </p>
      </div>
      <div className="mt-9 flex justify-center">
        <Link href="/form">
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none font-medium rounded-lg text-xl px-7 py-4 text-center mb-2"
          >
            Start for fee
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Body1;
