import type { NextPage } from "next";
import { ReactNode } from "react";

const Header: NextPage<{ children?: ReactNode }> = ({ children }) => {
  return (
    <header
      className="flex mb-1.5 py-2 bg-white border-b border-gray-200 items-center header-shadow"
      style={{ backgroundColor: "#212121", color: "white" }}
    >
      <div className="px-12 w-full flex">
        <strong className="my-auto mr-8">ia10</strong>

        {children}
      </div>
    </header>
  );
};

export default Header;
