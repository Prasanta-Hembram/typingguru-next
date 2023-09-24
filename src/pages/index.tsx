import {
  FaBookOpen,
  FaRandom,
  FaUserGraduate,
  // FaBook,
  FaRecycle,
  FaGithub,
  FaSuperpowers,
} from 'react-icons/fa';
import Link from 'next/link';
import CBody from '@src/components/container-body';
import Card from '@src/components/card';

const Home = () => {
  return (
    <CBody>
      <div className="flex justify-center">
        <div className="header flex gap-6 w-full max-w-screen-xl p-3 py-6">
          <div className="flex">
            <Link href="/">
              <h1 className="text-xl font-resique cursor-pointer select-none">
                Typing Guru
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center gap-24 justify-center pt-12">
        <div className="max-w-screen-xl w-full">
          <div className="flex justify-center items-center w-full h-full">
            <div className="grid gap-12 grid-cols-4">
              {[
                {
                  link: '/lessons',
                  label: 'Lessons',
                  icon: <FaUserGraduate />,
                },
                { link: '/stories', label: 'Stories', icon: <FaBookOpen /> },
                // {
                //   link: '/custom-stories',
                //   label: 'Custom Stories',
                //   icon: <FaBook />,
                // },
                {
                  link: '/beta',
                  label: 'Beta',
                  icon: <FaSuperpowers />,
                },
                {
                  link: '/random-type',
                  label: 'Random Type',
                  icon: <FaRandom />,
                },

                {
                  link: '/issues',
                  label: 'Issues/Feedback',
                  icon: <FaRecycle />,
                },
                {
                  link: 'https://github.com/abdheshnayak/typingguru-next',
                  label: 'Github/Code',
                  icon: <FaGithub />,
                },
              ].map(({ link, label, icon }) => {
                return (
                  <Link key={link} href={link}>
                    <a>
                      <Card className="items-center justify-center min-w-[12rem] py-6">
                        <div className="text-4xl">{icon}</div>
                        <span className="font-redressed text-2xl">{label}</span>
                      </Card>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <div className="pb-24">
          <div className="flex justify-center">
            <iframe
              className="shadow-md rounded-md border"
              src="https://github.com/sponsors/abdheshnayak/card"
              title="Sponsor abdheshnayak"
              height="150"
              width="600"
            />
          </div>
        </div>
      </div>
    </CBody>
  );
};

Home.SSR = true;

export default Home;
