const Footer = () => {
  return (
    <div
      className="w-full flex justify-center items-center"
      style={{
        position: "absolute",
        height: "70px",
        bottom: "0",
      }}
    >
      <a
        className="flex text-sm justify-center"
        href="https://github.com/piteroni"
        style={{ color: "#bbb" }}
      >
        @piteroni
      </a>
    </div>
  );
};

export default Footer;
