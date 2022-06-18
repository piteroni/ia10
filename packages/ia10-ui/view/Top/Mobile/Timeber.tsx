import Slider from "rc-slider";
import { FC } from "react";

const Timeber: FC = () => {
  // const [marks, setMarks] = useState<Record<number, any>>({});

  // // prettier-ignore
  // const {
  //   isPlay,
  //   duration,
  //   currentTime,
  //   source,
  //   pause,
  //   updateCurrentTime
  // } = useAudioState();

  // useEffect(() => {
  //   const remaining = duration - currentTime;

  //   const format = (time: number) => {
  //     const t = Math.round(time);
  //     const sec = t % 60;
  //     const min = Math.floor(t / 60) % 60;
  //     // const hour = Math.floor(t / 3600);

  //     return `${min.toString().padStart(2, "0")}:${sec
  //       .toString()
  //       .padStart(2, "0")}`;
  //   };

  //   setMarks({
  //     0: {
  //       style: { left: "5.5%" },
  //       label: format(currentTime),
  //     },
  //     [duration]: {
  //       style: { left: "93.2%" },
  //       label: "-" + format(remaining),
  //     },
  //   });

  //   if (Math.round(currentTime) === Math.round(duration)) {
  //     pause();
  //   }
  // }, [currentTime]);

  return (
    <Slider
      min={0}
      // max={duration}
      // value={currentTime}
      className="mr-6"
      dotStyle={{ display: "none" }}
      // onChange={(value) => {
      //   if (
      //     typeof value === "number" &&
      //     source.current &&
      //     source.current.media
      //   ) {
      //     updateCurrentTime(value);
      //     source.current.media.currentTime = value;
      //   }
      // }}
      // onBeforeChange={() => {
      //   source.current?.media?.pause();
      // }}
      // onAfterChange={() => {
      //   if (isPlay) {
      //     source.current?.media?.play();
      //   }
      // }}
      step={0.01}
      // marks={marks}
      trackStyle={{ backgroundColor: "white" }}
      handleStyle={{
        backgroundColor: "white",
        borderColor: "white",
        marginLeft: "2px",
      }}
    />
  );
};

export default Timeber;
