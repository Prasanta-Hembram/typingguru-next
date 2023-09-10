// import { userContext } from '@components/elements/auth-components';
// import { useContext } from 'react';

import { Button } from '@pages/auth/login';

const Block = ({ title = '', children = null }) => {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-bold text-lg tracking-wide">{title}</span>
      <div>{children}</div>
    </div>
  );
};

const Race = () => {
  // const { user } = useContext(userContext);
  return (
    <div className="flex w-full min-h-[calc(100vh-10rem)] divide-x-2">
      <div className="flex-[2] flex flex-col gap-6">
        <Block title="Races going On">
          <div className="flex">kk</div>
        </Block>
        <Block title="Races going To Start">
          <div className="flex">kk</div>
        </Block>
      </div>
      <div className="flex-1">
        <div className="flex h-full items-center justify-center">
          <Button>Start Race</Button>
        </div>
      </div>
    </div>
  );
};

export default Race;
