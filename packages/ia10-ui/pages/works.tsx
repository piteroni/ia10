import type { NextPage } from "next";

const Works: NextPage = () => {
  return (
    <div className="lg:container mx-auto my-16" style={{ color: "white" }}>
      <div>
        <img
          width="250px"
          height="250px"
          className="mb-4"
          src="https://ia10-work.s3.ap-northeast-1.amazonaws.com/works/8e034d2e-1150-40df-9dcc-ce6dac93ec1d/thumbnail.jpeg"
          alt="2022-06-11 14:49:27+00:00"
          style={{ border: "white 2px solid", borderRadius: "5px" }}
        />
        <div className="font-bold" style={{ color: "white" }}>
          2022-06-11 14:49:27+00:00
        </div>
      </div>
    </div>
  );
};

export default Works;
