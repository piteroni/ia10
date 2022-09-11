import Hls, { Events } from "hls.js";
import {
  createContext,
  FC,
  MutableRefObject,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";

type AudioStateContextValue = {
  isPlay: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  source: MutableRefObject<Hls | null>;
  play: () => void;
  pause: () => void;
  updateCurrentTime: (value: number) => void;
  updateVolume: (value: number) => void;
  setDuration: (value: number) => void;
  initialize: () => void;
  setupHls: (audio: HTMLAudioElement) => Promise<void>;
};

const AudioStateContext = createContext<AudioStateContextValue>({
  isPlay: false,
  currentTime: 0,
  duration: 0,
  volume: 0,
  source: { current: null },
  play: () => {},
  pause: () => {},
  updateCurrentTime: () => {},
  updateVolume: () => {},
  setDuration: () => {},
  initialize: async () => {},
  setupHls: async () => {},
});

export const AudioStateContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isPlay, setIsPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const source = useRef<Hls | null>(null);

  const play = () => setIsPlay(true);
  const pause = () => setIsPlay(false);
  const updateCurrentTime = (value: number) => setCurrentTime(value);
  const updateVolume = (value: number) => setVolume(value);

  const initialize = () => {
    setIsPlay(false);
    setCurrentTime(0);
    setDuration(0);
    setVolume(1);
  };

  const setupHls = async (audio: HTMLAudioElement) => {
    if (!source.current) {
      throw new Error("source ref not initiliazed");
    }

    if (source.current.media) {
      source.current.media.pause();
      source.current.media.currentTime = 0;

      source.current.stopLoad();
      source.current.detachMedia();

      new Promise<void>((resolve) => {
        source.current!.destroy();
        resolve();
      });
    }

    source.current = new Hls();
    source.current.attachMedia(audio);

    await new Promise<void>((resolve) => {
      source.current!.once(Events.MEDIA_ATTACHED, () => resolve());
    });
  };

  return (
    <AudioStateContext.Provider
      value={{
        isPlay,
        currentTime,
        duration,
        volume,
        source,
        play,
        pause,
        updateCurrentTime,
        updateVolume,
        setDuration,
        initialize,
        setupHls,
      }}
    >
      {children}
    </AudioStateContext.Provider>
  );
};

export const useAudioState = () => useContext(AudioStateContext);
