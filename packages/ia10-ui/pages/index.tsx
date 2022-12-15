import TopDesktopView from "@/components/pages/top/desktop";
import TopMobileView from "@/components/pages/top/mobile";
import { WorkData } from "@/components/pages/top/state";
import { AudioStateContextProvider } from "@/contexts/audioContext/audioState";
import { getIsDesktop } from "@/shared";
import type { GetServerSideProps, NextPage } from "next";

const Top: NextPage<{ works: WorkData[]; isDesktop: boolean }> = ({
  works,
  isDesktop,
}) => {
  return (
    <AudioStateContextProvider>
      {isDesktop ? (
        <TopDesktopView works={works} />
      ) : (
        <TopMobileView works={works} />
      )}
    </AudioStateContextProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const isDesktop = getIsDesktop(req.headers["user-agent"]);

  const server =
    process.env.NODE_ENV !== "production"
      ? `http://host.docker.internal:3000`
      : `https://${req.headers.host}`;

  const response = await fetch(`${server}/api/works`);
  const data = await response.json();

  return { props: { works: data, isDesktop } };
};

export default Top;
