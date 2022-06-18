const Footer = () => {
  return (
    <div
      className="w-full flex justify-center items-center bg-black md:absolute"
      style={{
        height: "70px",
        bottom: "0",
        marginTop: "20px",
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
