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
  );
};

export default WorkInfo;
