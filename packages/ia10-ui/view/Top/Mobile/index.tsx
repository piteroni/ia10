import { FC, useState } from "react";
import { WorkData } from "../state";
import Player from "./Player";

const initialState: WorkData = {
  title: "",
  duration: 0,
  thumbnailURL: "",
  audioURL: "",
};

const TopMobileView: FC<{ works: WorkData[] }> = ({ works }) => {
  const [work, setWork] = useState<WorkData>({ ...initialState });

  return (
    <>
      <header className="flex mb-1.5 py-4 bg-black border-b border-gray-600 items-center header-shadow text-white">
        <div className="px-6 w-full flex">
          <strong className="my-auto mr-8">ia10</strong>

          <form className="w-full">
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>

              <input
                className="py-3 pl-10 text-sm text-gray-900 rounded-none border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                style={{
                  backgroundColor: "#212121",
                  color: "white",
                  borderRadius: "7px",
                  width: "100%",
                }}
              />
            </div>
          </form>
        </div>
      </header>

      <div className="mx-auto flex mt-6 flex-wrap text-white">
        {works &&
          works.map((work) => {
            return (
              <div
                key={work.title}
                className="mb-8 ml-8 flex"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  // if (!audio.current) {
                  //   return;
                  // }

                  setWork({ ...work });

                  // if (audio.current.src !== work.audioURL) {
                  //   audio.current.src = work.audioURL;
                  //   audio.current.play();
                  // }
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

                <div className="mt-3">
                  <div className="font-bold text-white mb-3">{work.title}</div>

                  <div className="flex items-center mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      width="14px"
                      height="14px"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="1"
                    >
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    <p className="text-xs ml-1">{format(work.duration)}</p>
                  </div>

                  <div className="flex items-center mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      width="14px"
                      height="14px"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-xs ml-1">2021/01/17 3:35</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <Player work={work} />
    </>
  );
};

const format = (time: number) => {
  const t = Math.round(time);
  const sec = t % 60;
  const min = Math.floor(t / 60) % 60;
  // const hour = Math.floor(t / 3600);

  return `${min}:${sec.toString().padStart(2, "0")}`;
};

export default TopMobileView;
