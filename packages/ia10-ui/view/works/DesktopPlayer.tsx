import Hls, { ErrorData, Events } from "hls.js";
import Slider from "rc-slider";
import { FC, useEffect, useRef, useState } from "react";

// This is very weak at adjusting his style.
const Player: FC<{
  title: string;
  thumbnailURI: string;
  audioURI: string;
}> = ({ audioURI, title, thumbnailURI }) => {
  const [isPlay, setIsPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMute, setIsMute] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [marks, setMarks] = useState<Record<number, any>>({});

  const hls = useRef<Hls | null>(null);
  const audio = useRef<HTMLMediaElement | null>(null);

  // initialize and setup destruction hls instance
  useEffect(() => {
    if (!Hls.isSupported()) {
      window.alert("error: hls not support");
      return;
    }

    hls.current = newHls();

    return () => {
      hls.current?.destroy();
    };
  }, []);

  // setting audio info and play audio
  useEffect(() => {
    if (!audio.current || audioURI === "") {
      return;
    }

    playAudio(audioURI);
  }, [audioURI]);

  // control audio playing
  useEffect(() => {
    if (!audio.current) {
      return;
    }

    if (isPlay) {
      audio.current.play();
    } else {
      audio.current.pause();
    }
  }, [isPlay]);

  // control audio volume
  useEffect(() => {
    if (!audio.current) {
      return;
    }

    if (volume > 0) {
      setIsMute(false);
    } else {
      setIsMute(true);
    }

    audio.current.volume = volume;
  }, [volume]);

  // update audio times
  useEffect(() => {
    const format = (time: number) => {
      const t = Math.round(time);
      const sec = t % 60;
      const min = Math.floor(t / 60) % 60;
      // const hour = Math.floor(t / 3600);

      return `${min.toString().padStart(2, "0")}:${sec
        .toString()
        .padStart(2, "0")}`;
    };

    const remaining = duration - currentTime;

    setMarks({
      0: {
        style: { left: "5.5%" },
        label: format(currentTime),
      },
      [duration]: {
        style: { left: "93.2%" },
        label: "-" + format(remaining),
      },
    });

    if (Math.round(currentTime) === Math.round(duration)) {
      setIsPlay(false);
    }
  }, [currentTime]);

  const playAudio = async (audioURI: string) => {
    if (audioURI === "") {
      return;
    }

    if (!audio.current || !hls.current) {
      throw new Error("audio ref or hls ref not initiliazed");
    }

    setIsPlay(false);
    setCurrentTime(0);
    setDuration(0);
    setVolume(1);
    setIsMute(false);
    setShowVolume(false);
    setMarks({});

    audio.current.pause();
    audio.current.currentTime = 0;

    if (hls.current.media) {
      hls.current.stopLoad();
      hls.current.detachMedia();

      new Promise<void>((resolve) => {
        hls.current!.destroy();
        resolve();
      });
    }

    hls.current = newHls();
    hls.current.attachMedia(audio.current);

    await new Promise<void>((resolve) => {
      hls.current!.once(Events.MEDIA_ATTACHED, () => resolve());
    });

    hls.current.loadSource(audioURI);

    await new Promise<void>((resolve) => {
      hls.current!.once(Events.MANIFEST_PARSED, () => resolve());
    });

    setDuration(audio.current.duration);

    setIsPlay(true);
  };

  const newHls = () => {
    const hls = new Hls();
    hls.on(Events.ERROR, (_, err: ErrorData) => {
      console.error(err);
    });

    return hls;
  };

  if (audioURI !== "") {
    return (
      <div
        style={{
          width: "460px",
          padding: "25px 30px 25px 40px",
          borderRadius: "10px",
          position: "absolute",
          right: "50px",
          bottom: "50px",
          boxShadow:
            "rgba(255, 255, 255, 0.2) 0px 0px 7px, rgba(255, 255, 255, 0.15) 0px 1px 3px 1px",
        }}
      >
        <div className="mb-4 flex items-center">
          <img
            width="72px"
            height="72px"
            className="mr-4"
            src={thumbnailURI}
            alt={title}
            style={{
              border: "white 2px solid",
              borderRadius: "5px",
            }}
          />
          <div className="font-bold" style={{ color: "white" }}>
            {title}
          </div>
        </div>

        <div className="flex justify-center items-center">
          <Slider
            className="mr-4 mb-6"
            min={0}
            max={duration}
            value={currentTime}
            dotStyle={{ display: "none" }}
            onChange={(value) => {
              if (typeof value === "number" && audio.current) {
                setCurrentTime(value);
                audio.current.currentTime = value;
              }
            }}
            onBeforeChange={() => {
              audio.current?.pause();
            }}
            onAfterChange={() => {
              if (isPlay) {
                audio.current?.play();
              }
            }}
            step={0.01}
            marks={marks}
            trackStyle={{ backgroundColor: "white" }}
            handleStyle={{
              backgroundColor: "white",
              borderColor: "white",
              marginLeft: "2px",
            }}
          />

          <div
            className="mr-2"
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setShowVolume(true)}
            onMouseLeave={() => setShowVolume(false)}
          >
            {!isMute ? (
              <VolumeIcon
                onClick={() => {
                  setVolume(0);
                  setIsMute(true);
                }}
              />
            ) : (
              <VolumeMuteIcon
                onClick={() => {
                  setVolume(1);
                  setIsMute(false);
                }}
              />
            )}

            {/* キモすぎw */}
            <div
              onClick={() => {
                if (!isMute) {
                  setVolume(0);
                  setIsMute(true);
                } else {
                  setVolume(1);
                  setIsMute(false);
                }
              }}
              style={{
                position: "absolute",
                top: "25px",
                right: "65px",
                height: "90px",
                width: "35px",
              }}
            />

            {/* volumn controller */}
            {showVolume && (
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "70px",
                  height: "90px",
                  padding: "5px",
                  borderRadius: "7px",
                  backgroundColor: "black",
                  boxShadow:
                    "rgba(255, 255, 255, 0.2) 0px 0px 7px, rgba(255, 255, 255, 0.15) 0px 1px 3px 1px",
                }}
              >
                <Slider
                  vertical={true}
                  min={0}
                  max={1}
                  step={0.1}
                  value={volume}
                  onChange={(value) => {
                    if (typeof value === "number" && audio.current) {
                      setVolume(value);
                    }
                  }}
                  trackStyle={{
                    backgroundColor: "white",
                  }}
                  handleStyle={{
                    backgroundColor: "white",
                    borderColor: "white",
                  }}
                />
              </div>
            )}
          </div>

          <div style={{ cursor: "pointer" }}>
            {isPlay ? (
              <PauseIcon onClick={() => setIsPlay(false)} />
            ) : (
              <PlayIcon onClick={() => setIsPlay(true)} />
            )}
          </div>
        </div>

        <audio
          hidden
          ref={audio}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        ></audio>
      </div>
    );
  } else {
    return <></>;
  }
};

const VolumeIcon: FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <svg onClick={onClick} height="30" width="30" viewBox="0 0 24 24">
      <path
        fill="#FFFFFF"
        d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
      ></path>
    </svg>
  );
};

const VolumeMuteIcon: FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <svg onClick={onClick} height="30" width="30" viewBox="0 0 24 24">
      <path
        fill="#FFFFFF"
        d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z"
      ></path>
    </svg>
  );
};

const PlayIcon: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <svg onClick={onClick} height="30" width="30" viewBox="0 0 24 24">
      <path fill="#FFFFFF" d="M8,5.14V19.14L19,12.14L8,5.14Z"></path>
    </svg>
  );
};

const PauseIcon: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      viewBox="0 0 24 24"
      style={{
        width: "30px",
        height: "30px",
      }}
    >
      <path fill="#FFFFFF" d="M14,19H18V5H14M6,19H10V5H6V19Z"></path>
    </svg>
  );
};

export default Player;
