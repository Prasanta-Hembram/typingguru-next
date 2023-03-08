import useColor from '@commons/helpers/use-color';

const CBody = ({ children, ...props }) => {
  const { color, background } = useColor();
  return (
    <div
      style={{
        color,
        background,
      }}
      className="flex flex-col min-h-screen min-w-[1080px]"
      {...props}
    >
      {children}
    </div>
  );
};

export default CBody;
