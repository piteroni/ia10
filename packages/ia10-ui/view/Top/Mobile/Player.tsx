import { FC, useEffect, useRef, useState } from "react";
import { WorkData } from "../state";
import PlaybackControl from "./PlaybackControl";
import WorkInfo from "./WorkInfo";

const Player: FC<{ work: WorkData }> = ({ work }) => {
  const audio = useRef<HTMLAudioElement>(null);
  const [isPlay, setIsPlay] = useState(false);

  useEffect(() => {
    if (work.audioURL === "" || !audio.current) {
      return;
    }

    audio.current.src = work.audioURL;

    setIsPlay(true);
  }, [work.audioURL]);

  useEffect(() => {
    if (!audio.current) {
      return;
    }

    if (isPlay) {
      if (audio.current.paused) {
        audio.current.play();
      }
    } else {
      if (!audio.current.paused) {
        audio.current.pause();
      }
    }
  }, [isPlay]);

  if (work.audioURL !== "") {
    return (
      <>
        <div
          className="bg-black w-full flex items-center relative"
          style={{
            padding: "15px 0px 15px 22px",
            position: "fixed",
            bottom: "0",
            boxShadow:
              "rgba(255, 255, 255, 0.2) 0px 0px 7px, rgba(255, 255, 255, 0.15) 0px 1px 3px 1px",
            zIndex: "100",
          }}
        >
          <WorkInfo title={work.title} thumbnailURI={work.thumbnailURL} />

          <div style={{ position: "absolute", right: "20px" }}>
            <PlaybackControl isPlay={isPlay} setIsPlay={setIsPlay} />
          </div>
        </div>

        <audio ref={audio} hidden></audio>
      </>
    );
  } else {
    return <></>;
  }
};

export default Player;
