import { useAudioState } from "@/contexts/audioContext/audioState";
import Slider from "rc-slider";
import { FC, useEffect, useState } from "react";

const VolumeControl: FC = () => {
  const [showVolume, setShowVolume] = useState(false);
  const [isMute, setIsMute] = useState(false);

  const { volume, updateVolume, source } = useAudioState();

  useEffect(() => {
    if (!source.current || !source.current.media) {
      return;
    }

    if (volume > 0) {
      setIsMute(false);
    } else {
      setIsMute(true);
    }

    source.current.media.volume = volume;
  }, [volume]);

  return (
    <div
      className="mr-2"
      style={{ cursor: "pointer" }}
      onMouseEnter={() => setShowVolume(true)}
      onMouseLeave={() => setShowVolume(false)}
    >
      {!isMute ? (
        <svg
          onClick={() => {
            updateVolume(0);
            setIsMute(true);
          }}
          height="30"
          width="30"
          viewBox="0 0 24 24"
        >
          <path
            fill="#FFFFFF"
            d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
          ></path>
        </svg>
      ) : (
        <svg
          onClick={() => {
            updateVolume(1);
            setIsMute(false);
          }}
          height="30"
          width="30"
          viewBox="0 0 24 24"
        >
          <path
            fill="#FFFFFF"
            d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z"
          ></path>
        </svg>
      )}

      {/* キモすぎる何か */}
      <div
        onClick={() => {
          if (!isMute) {
            updateVolume(0);
            setIsMute(true);
          } else {
            updateVolume(1);
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

      {/* volume controller */}
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
              if (typeof value === "number") {
                updateVolume(value);
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
  );
};

export default VolumeControl;
