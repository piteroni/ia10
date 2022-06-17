const Footer = () => {
  return (
    <div
      className="w-full flex justify-center items-center text-white text-sm"
      style={{
        position: "absolute",
        height: "110px",
        bottom: "0",
        borderTop: "solid 1px #fff",
        boxShadow: "3px 3px 6px 0 rgba(99, 78, 78, 0.2)",
        zIndex: "-100",
      }}
    >
      <div>
        <p className="flex justify-center">© piteroni</p>
      </div>
    </div>
  );
};

export default Footer;
