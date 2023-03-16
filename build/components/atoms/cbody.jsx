import classNames from 'classnames';

const CBody = ({ children, ...props }) => {
  return (
    <div
      className={classNames(
        'flex flex-col min-h-screen min-w-[1080px] text-primary bg-background'
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default CBody;
