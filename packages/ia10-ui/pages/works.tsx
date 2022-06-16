import Hls from "hls.js";
import type { NextPage } from "next";
import { useEffect } from "react";

type ApiResponse = Array<{
  name: string;
  thumbnailURI: string;
  audioURI: string;
}>;

const Works: NextPage<{ works: ApiResponse }> = ({ works }) => {
  let hls: any = null;

  const handleWorkOnClick = (audioURI: string) => {
    const audio = document.querySelector<HTMLMediaElement>(
      "#ia10-work-audio-player"
    )!;

    hls.loadSource(audioURI);
  };

  useEffect(() => {
    const audio = document.querySelector<HTMLMediaElement>(
      "#ia10-work-audio-player"
    )!;

    hls = new Hls();

    if (Hls.isSupported()) {
      hls.attachMedia(audio);
    } else {
      window.alert("hls not support");
    }

    hls.on(Hls.Events.ERROR, (error: any) => {
      window.alert(JSON.stringify(error));
    });
  }, []);

  return (
    <div
      className="lg:container mx-auto py-16 flex flex-wrap"
      style={{ color: "white" }}
    >
      <audio controls id="ia10-work-audio-player"></audio>

      {works &&
        works.map((work) => {
          return (
            <div
              key={work.name}
              className="mb-10 mx-8"
              style={{ cursor: "pointer" }}
              onClick={() => handleWorkOnClick(work.audioURI)}
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
    </div>
  );
};

Works.getInitialProps = async () => {
  const works = await fetch("http://host.docker.internal:8100/api/works").then(
    (r) => r.json()
  );

  return { works };
};

export default Works;
