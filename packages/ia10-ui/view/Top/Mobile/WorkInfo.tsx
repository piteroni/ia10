import { FC } from "react";

type Props = {
  title: string;
  thumbnailURI: string;
};

const WorkInfo: FC<Props> = ({ title, thumbnailURI }) => {
  return (
    <div className="flex items-center">
      <img
        width="42px"
        height="42px"
        className="mr-5"
        src={thumbnailURI}
        alt={title}
        style={{
          border: "white 2px solid",
          borderRadius: "5px",
        }}
      />

      <div className="text-white">{title}</div>
    </div>
  );
};

export default WorkInfo;
