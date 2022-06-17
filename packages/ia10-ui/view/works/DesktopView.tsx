import Header from "@/components/Header";
import type { NextPage } from "next";
import { useState } from "react";
import Player from "./DesktopPlayer";
import { WorkData } from "./state";

const initialState: WorkData = {
  title: "",
  thumbnailURI: "",
  audioURI: "",
};

const WorksDesktopView: NextPage<{ works: WorkData[] }> = ({ works }) => {
  const [work, setWork] = useState<WorkData>({ ...initialState });

  return (
    <>
      <Header>
        <form>
          <div className="relative ">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
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
                onClick={() => setWork({ ...work })}
              >
                <img
                  width="250px"
                  height="250px"
                  className="mb-4"
                  src={work.thumbnailURI}
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
          audioURI={work.audioURI}
          thumbnailURI={work.thumbnailURI}
        />
      </div>
    </>
  );
};

export default WorksDesktopView;
