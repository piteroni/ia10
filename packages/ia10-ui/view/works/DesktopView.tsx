import type { NextPage } from "next";
import { useState } from "react";
import Player from "./DesktopPlayer";
import { WorkData } from "./state";

const initialState: WorkData = {
  name: "",
  thumbnailURI: "",
  audioURI: "",
};

const WorksDesktopView: NextPage<{ works: WorkData[] }> = ({ works }) => {
  const [work, setWork] = useState<WorkData>({ ...initialState });

  return (
    <div
      className="lg:container mx-auto py-16 flex flex-wrap"
      style={{ color: "white" }}
    >
      {works &&
        works.map((work) => {
          return (
            <div
              key={work.name}
              className="mb-10 mx-8"
              style={{ cursor: "pointer" }}
              onClick={() => setWork({ ...work })}
            >
              <img
                width="250px"
                height="250px"
                className="mb-4"
                src={work.thumbnailURI}
                alt={work.name}
                style={{ border: "white 2px solid", borderRadius: "5px" }}
              />
              <div className="font-bold" style={{ color: "white" }}>
                {work.name}
              </div>
            </div>
          );
        })}

      <Player
        title={work.name}
        audioURI={work.audioURI}
        thumbnailURI={work.thumbnailURI}
      />
    </div>
  );
};

export default WorksDesktopView;