import { useAudioState } from "@/contexts/audioContext/audioState";
import Hls, { Events } from "hls.js";
import { FC, useEffect, useRef } from "react";
import PlaybackControl from "./PlaybackControl";
import Timeber from "./Timeber";
import VolumeControl from "./VolumeControl";
import WorkInfo from "./WorkInfo";

const Player: FC<{
  title: string;
  duration: number;
  thumbnailURI: string;
  audioURI: string;
}> = ({ title, duration, audioURI, thumbnailURI }) => {
  const audio = useRef<HTMLAudioElement>(null);

  // prettier-ignore
  const {
    source,
    play,
    initialize,
    updateCurrentTime,
    setDuration
  } = useAudioState();

  // setup hls instance
  useEffect(() => {
    if (!Hls.isSupported()) {
      window.alert("error: hls not support");
      return;
    }

    source.current = new Hls();

    return () => {
      source.current?.destroy();
    };
  }, []);

  // load and play audio
  useEffect(() => {
    if (audioURI === "") {
      return;
    }

    if (!audio.current) {
      return;
    }

    initialize(audio.current).then(async () => {
      source.current!.loadSource(audioURI);

      await new Promise<void>((resolve) => {
        source.current!.once(Events.MANIFEST_PARSED, () => resolve());
      });

      setDuration(duration);

      play();
    });
  }, [audioURI]);

  if (audioURI !== "") {
    return (
      <div
        className="bg-black"
        style={{
          width: "460px",
          padding: "25px 30px 25px 40px",
          borderRadius: "10px",
          position: "absolute",
          right: "50px",
          bottom: "50px",
          boxShadow:
            "rgba(255, 255, 255, 0.2) 0px 0px 7px, rgba(255, 255, 255, 0.15) 0px 1px 3px 1px",
          zIndex: "100",
        }}
      >
        <WorkInfo thumbnailURI={thumbnailURI} title={title} />

        <div className="flex justify-center items-center">
          <Timeber />

          <VolumeControl />

          <PlaybackControl />

          <audio
            hidden
            ref={audio}
            onTimeUpdate={(e) => updateCurrentTime(e.currentTarget.currentTime)}
          ></audio>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Player;
