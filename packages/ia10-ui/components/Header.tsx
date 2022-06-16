import type { NextPage } from "next";

const Header: NextPage = () => {
  return (
    <header
      className="flex mb-1.5 bg-white border-b border-gray-200 h-14 items-center header-shadow"
      style={{ backgroundColor: "#212121", color: "white" }}
    >
      <div className="px-12 w-full flex justify-between">
        <strong className="my-auto">ia10</strong>
      </div>
    </header>
  );
};

export default Header;
