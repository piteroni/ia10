import { FC, useRef, useState } from "react";
import { WorkData } from "../state";

const initialState: WorkData = {
  title: "",
  thumbnailURL: "",
  audioURL: "",
};

const WorksMobileView: FC<{ works: WorkData[] }> = ({ works }) => {
  const [work, setWork] = useState<WorkData>({ ...initialState });

  const audio = useRef<HTMLAudioElement | null>(null);

  return (
    <>
      <header
        className="flex mb-1.5 py-2 bg-white border-b border-gray-200 items-center header-shadow"
        style={{ backgroundColor: "#212121", color: "white" }}
      >
        <div className="px-6 w-full flex">
          <strong className="my-auto mr-8">ia10</strong>

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
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>

              <input
                type="search"
                id="default-search"
                className="block py-3 pl-10 w-64 text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="search by title"
                style={{ backgroundColor: "#212121", color: "white" }}
              />
            </div>
          </form>
        </div>
      </header>

      <div className="mx-auto flex flex-wrap" style={{ color: "white" }}>
        {works &&
          works.map((work) => {
            return (
              <div
                key={work.title}
                className="mt-8 ml-8 flex"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (!audio.current) {
                    return;
                  }

                  audio.current.src = work.audioURL;
                  audio.current.play();
                }}
              >
                <img
                  width="144px"
                  height="144px"
                  className="mr-4"
                  src={work.thumbnailURL}
                  alt={work.title}
                  style={{ border: "white 2px solid", borderRadius: "5px" }}
                />

                <div className="font-bold mt-3" style={{ color: "white" }}>
                  {work.title}
                </div>
              </div>
            );
          })}
      </div>

      <audio ref={audio} hidden></audio>
    </>
  );
};

export default WorksMobileView;
