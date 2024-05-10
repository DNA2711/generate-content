import Image from "next/image";

const Header = () => {
  return (
    <nav className="mt-6 container">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex shrink-0">
              <a href="/">
                <Image src="/logo.png" alt="AI" width={70} height={500}></Image>
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center text-2xl space-x-4">
              <a
                href="/"
                className="text-white hover:bg-white p-2 hover:text-black rounded-lg"
              >
                Home
              </a>
              <a
                href=""
                className="text-white hover:bg-white p-2 hover:text-black rounded-lg"
              >
                Docs
              </a>
              <a
                href=""
                className="text-white hover:bg-white p-2 hover:text-black rounded-lg"
              >
                Features
              </a>
              <a
                href=""
                className="text-white hover:bg-white p-2 hover:text-black rounded-lg"
              >
                Pricing
              </a>
              <a
                href=""
                className="text-white hover:bg-white p-2 hover:text-black rounded-lg"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
