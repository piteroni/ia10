import { FC } from "react";

type Props = {
  title: string;
  thumbnailURI: string;
};

const WorkInfo: FC<Props> = ({ title, thumbnailURI }) => {
  return (
    <div className="mb-4 flex items-center">
      <img
        width="72px"
        height="72px"
        className="mr-4 border-2 border-white rounded-[5px]"
        src={thumbnailURI}
        alt={title}
      />
      <div className="font-bold text-white">{title}</div>
    </div>
  );
};

export default WorkInfo;
