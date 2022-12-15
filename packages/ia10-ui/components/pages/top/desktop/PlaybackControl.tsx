import { useAudioState } from "@/contexts/audioContext/audioState";
import { FC, useEffect } from "react";

const PlaybackControl: FC = () => {
  const { isPlay, source, play, pause } = useAudioState();

  useEffect(() => {
    if (!source.current || !source.current.media) {
      return;
    }

    if (isPlay) {
      if (source.current.media.paused) {
        source.current.media.play();
      }
    } else {
      if (!source.current.media.paused) {
        source.current.media.pause();
      }
    }
  }, [isPlay]);

  return (
    <div className="cursor-pointer">
      {isPlay ? (
        // pause button
        <div onClick={() => pause()}>
          <svg height="30" width="30" viewBox="0 0 24 24">
            <path fill="#FFFFFF" d="M14,19H18V5H14M6,19H10V5H6V19Z"></path>
          </svg>
        </div>
      ) : (
        // play button
        <div onClick={() => play()}>
          <svg height="30" width="30" viewBox="0 0 24 24">
            <path fill="#FFFFFF" d="M8,5.14V19.14L19,12.14L8,5.14Z"></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default PlaybackControl;
