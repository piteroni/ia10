import { AudioStateContextProvider } from "@/contexts/audioContext/audioState";
import WorksDesktopView from "@/view/Application/Desktop";
import WorksMobileView from "@/view/Application/Mobile";
import { WorkData } from "@/view/Application/state";
import type { GetServerSideProps, NextPage } from "next";

const Works: NextPage<{ works: WorkData[]; isDesktop: boolean }> = ({
  works,
  isDesktop,
}) => {
  return (
    <AudioStateContextProvider>
      {isDesktop ? (
        <WorksDesktopView works={works} />
      ) : (
        <WorksMobileView works={works} />
      )}
    </AudioStateContextProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const isDesktop = ((userAgent?: string) => {
    if (!userAgent) {
      return false;
    }

    const nonDesktopDevices = ["iphone", "ipod", "android", "mobile", "ipad"];

    for (const device of nonDesktopDevices) {
      if (userAgent.toLowerCase().indexOf(device) > 0) {
        return false;
      }
    }

    return true;
  })(req.headers["user-agent"]);

  const server =
    process.env.NODE_ENV !== "production"
      ? `http://host.docker.internal:8100`
      : `https://${req.headers.host}`;

  const response = await fetch(`${server}/api/works`);
  const data = await response.json();

  return { props: { works: data, isDesktop } };
};

export default Works;
