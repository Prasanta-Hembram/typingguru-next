import { childProps } from '@src/interfaces/index';

const CBody = ({
  children,
  ...props
}: childProps & {
  [key: string]: any;
}) => {
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
