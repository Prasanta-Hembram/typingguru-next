import CBody from '@components/atoms/cbody';
import Container from '@components/atoms/container';
import AuthComponents, {
  userContext,
} from '@components/elements/auth-components';
import Header1 from '@components/elements/header1';
import { Button } from '@pages/auth/login';
import Link from 'next/link';
import { useContext } from 'react';

const ThisIsInBeta = () => {
  return (
    <div className="fixed bottom-0 right-0 p-2 text-gray-500 font-bold tracking-widest text-sm uppercase">
      🚧 This feature is still in development
    </div>
  );
};

const Block = ({ title = '', children = null }) => {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-bold text-lg tracking-wide">{title}</span>
      <div>{children}</div>
    </div>
  );
};

const I = () => {
  const { user } = useContext(userContext);
  return (
    <CBody>
      <ThisIsInBeta />
      <div>
        <Header1 user={user} />
      </div>
      <Container className="py-6">
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
              <Link href="/beta/race">
                <Button>Start Race</Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </CBody>
  );
};

const Index = () => (
  <AuthComponents>
    <I />
  </AuthComponents>
);

export default Index;
