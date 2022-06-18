import Header from "@/components/Header";
import { FC, useState } from "react";
import { WorkData } from "../state";
import Player from "./Player";

const initialState: WorkData = {
  title: "",
  duration: 0,
  thumbnailURL: "",
  audioURL: "",
};

const TopDesktopView: FC<{ works: WorkData[] }> = ({ works }) => {
  const [work, setWork] = useState<WorkData>({ ...initialState });

  return (
    <>
      <Header>
        <form>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>

            <input
              type="search"
              id="default-search"
              className="block py-3 pl-10 w-96 text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="search by title"
              style={{ backgroundColor: "#212121", color: "white" }}
            />
          </div>
        </form>
      </Header>

      <div
        className="lg:container mx-auto py-16 flex flex-wrap"
        style={{ color: "white" }}
      >
        {works &&
          works.map((work) => {
            return (
              <div
                key={work.title}
                className="mb-10 mx-8"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setWork({ ...work });
                }}
              >
                <img
                  width="250px"
                  height="250px"
                  className="mb-4"
                  src={work.thumbnailURL}
                  alt={work.title}
                  style={{ border: "white 2px solid", borderRadius: "5px" }}
                />
                <div className="font-bold" style={{ color: "white" }}>
                  {work.title}
                </div>
              </div>
            );
          })}

        <Player
          title={work.title}
          duration={work.duration}
          audioURI={work.audioURL}
          thumbnailURI={work.thumbnailURL}
        />
      </div>
    </>
  );
};

export default TopDesktopView;
