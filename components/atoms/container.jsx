import classNames from 'classnames';

const Container = ({ children = null, className = '' }) => {
  return (
    <div className={classNames('flex w-full justify-center', className)}>
      <div className="w-full max-w-screen-xl flex justify-between items-center gap-3 mx-4">
        {children}
      </div>
    </div>
  );
};

export default Container;
