const CBody = ({ children, ...props }) => {
  return (
    <div
      className="flex flex-col min-h-screen min-w-[1080px] text-primary bg-background"
      {...props}
    >
      {children}
    </div>
  );
};

export default CBody;
