import { Dispatch, FC, SetStateAction } from "react";

const PlaybackControl: FC<{
  isPlay: boolean;
  setIsPlay: Dispatch<SetStateAction<boolean>>;
}> = ({ isPlay, setIsPlay }) => {
  return (
    <div style={{ cursor: "pointer", right: "0px" }}>
      {isPlay ? (
        // pause button
        <div onClick={() => setIsPlay(false)}>
          <svg height="30" width="30" viewBox="0 0 24 24">
            <path fill="#FFFFFF" d="M14,19H18V5H14M6,19H10V5H6V19Z"></path>
          </svg>
        </div>
      ) : (
        // play button
        <div onClick={() => setIsPlay(true)}>
          <svg height="30" width="30" viewBox="0 0 24 24">
            <path fill="#FFFFFF" d="M8,5.14V19.14L19,12.14L8,5.14Z"></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default PlaybackControl;
