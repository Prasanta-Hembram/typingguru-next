import classNames from 'classnames';

const CBody = ({ children, className = '', ...props }) => {
  return (
    <div
      className={classNames(
        'flex flex-col min-h-screen min-w-[1080px] text-primary bg-background',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default CBody;
