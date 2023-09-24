import lessonList from '@src/lessons/lesson-list';
import storyList from '@src/lessons/story-list';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from 'react-icons/md';
import { FiCircle } from 'react-icons/fi';
import classNames from 'classnames';
import { FaCircle } from 'react-icons/fa';
import { IPage, useConfig } from '@src/hooks/use-config';
import { validateLanguage } from '@src/languages';
import { colorSchemeList } from '@src/color-schemes';
import { useActivePath } from '@src/hooks/use-active-path';
import Card from './card';
import Selector from './selector';

const languageList = [
  'English',
  'Hindi',
  'Nepali',
  'Punjabi',
  'Bengali',
  'Tamil',
  'Urdu',
];

const LessonOptionLabel = ({ index }: { index: number }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <span>Lesson {index + 1}</span>
      <span className="text-slate-500 font-redressed">
        {index + 1 <= 12 && 'Middle'}

        {index + 1 > 12 && index + 1 <= 26 && 'Top'}
        {index + 1 > 26 && index + 1 <= 36 && 'Bottom'}
        {index + 1 > 36 && 'All'}
      </span>
    </div>
  );
};

const Header = ({ label: _label }: { label?: string }) => {
  const {
    config,
    setLessonInfo,
    lessonInfo,
    setLanguage,
    setStoryInfo,
    storyInfo,
    visibleCards,
    setVisibleCards,
    setColorScheme,
    colorScheme,
    statics,
  } = useConfig();

  const { activePath: page } = useActivePath({ parent: '/' }) as {
    activePath: IPage;
  };

  console.log(page);

  return (
    <div className="text-sm z-20">
      {/* <CustomStoriesDialog */}
      {/*   visible={customStoriesModal} */}
      {/*   setVisible={setCustomStoriesModal} */}
      {/* /> */}
      <div className="flex justify-center z-10">
        <div className="flex gap-6 w-full max-w-screen-xl p-3 py-6">
          <span className="flex flex-col fixed text-sm font-redressed tracking-wider gap-1 left-6 top-32">
            <Link href="/" className="hover:text-primary-500 relative -left-3">
              Home
            </Link>
            <div className="relative origin-bottom-left flex flex-col items-start border-l gap-1 border-primary-900 text-xs z-[999]">
              {[
                { link: '/lessons', label: 'Lessons' },
                { link: '/stories', label: 'Stories' },
                // { link: '/custom-stories', label: 'Custom Stories' },
                { link: '/random-type', label: 'Random Type' },
                { link: '/beta', label: 'Beta' },
                { link: '/issues', label: 'Issues' },
              ].map(({ link, label }) => (
                <Link
                  key={link}
                  href={link}
                  className={classNames('hover:text-primary-500 flex gap-2', {
                    'text-primary-600':
                      `/${page.toLowerCase()}` === link.toLowerCase(),
                  })}
                >
                  <span>-&gt;</span>
                  {label}
                </Link>
              ))}
            </div>
          </span>

          {page === 'lessons' && (
            <span className="flex flex-col fixed text-sm font-redressed tracking-wider gap-1 right-6 top-32">
              <span className="relative -left-3">Keyboard Row</span>
              <div className="relative origin-bottom-left flex flex-col items-start border-l gap-1 border-primary-900 text-xs">
                {[
                  { label: 'Middle', index: 0, indexTo: 11 },
                  { label: 'Top', index: 12, indexTo: 25 },
                  { label: 'Bottom', index: 26, indexTo: 35 },
                  { label: 'All', index: 36, indexTo: 49 },
                ].map(({ label, index: _index, indexTo }) => (
                  <span
                    onClick={() =>
                      setLessonInfo((v) => ({
                        ...v,
                        index: _index,
                      }))
                    }
                    key={label}
                    className={classNames(
                      'hover:text-primary-500 flex gap-2  items-center cursor-pointer',
                      {
                        'text-primary-600':
                          lessonInfo.index >= _index &&
                          lessonInfo.index <= indexTo,
                      }
                    )}
                  >
                    <span>-&gt;</span>
                    {lessonInfo.index >= _index &&
                    lessonInfo.index <= indexTo ? (
                      <span className="text-xs">
                        <FaCircle />
                      </span>
                    ) : (
                      <span className="text-xs">
                        <FiCircle />
                      </span>
                    )}

                    {label}
                  </span>
                ))}
              </div>
            </span>
          )}

          <div className="flex w-full text-sm">
            <div className="flex-1 relative">
              <Link href="/">
                <h1 className="text-xl font-resique cursor-pointer select-none inline-flex relative">
                  <span className="whitespace-pre">Typing Guru</span>
                  <span className="font-lato text-xs font-bold text-primary-500 tracking-wider absolute top-[calc(100%-5px)] right-0 capitalize">
                    {` ${page}`}
                  </span>
                </h1>
              </Link>
            </div>

            {page !== 'issues' && (
              <div className="flex gap-6">
                {page !== 'random-type' && (
                  <>
                    {visibleCards.progress && (
                      <Card
                        variant="small"
                        className="font-redressed px-8 w-[10rem]"
                      >
                        <div>Progress</div>

                        <div className="text-right my-1">
                          <span className="text-xl">
                            {page === 'story'
                              ? (
                                  (storyInfo.cursorIndex /
                                    storyList[storyInfo.index].length) *
                                  100
                                ).toFixed(0)
                              : (
                                  (lessonInfo.cursorIndex /
                                    lessonList[lessonInfo.index].length) *
                                  100
                                ).toFixed(0)}
                          </span>{' '}
                          <span>% done</span>
                        </div>
                      </Card>
                    )}
                    {visibleCards.speed && (
                      <Card
                        variant="small"
                        className="font-redressed px-8 w-[10rem]"
                      >
                        <div>Speed</div>
                        <div className="text-right my-1">
                          <span className="text-xl">
                            {(statics.speed.value &&
                              (statics.speed.value > 300
                                ? 0
                                : statics.speed.value)) ||
                              0}
                          </span>{' '}
                          <span>wpm</span>
                        </div>
                      </Card>
                    )}

                    {visibleCards.accuracy && (
                      <Card
                        variant="small"
                        className="font-redressed px-8 w-[10rem]"
                      >
                        <div>Accuracy</div>
                        <div className="text-right my-1">
                          <span className="text-xl">
                            {statics.accuracy > 0 ? statics.accuracy : 0}
                          </span>{' '}
                          <span>%</span>
                        </div>
                      </Card>
                    )}
                  </>
                )}

                <div className="flex flex-col gap-2 font-lato justify-start">
                  {page === 'lessons' && (
                    <>
                      <Selector
                        options={lessonList.map((_, i: number) => {
                          return {
                            value: i,
                            label: <LessonOptionLabel index={i} />,
                          };
                        })}
                        onSelect={(val) => {
                          setLessonInfo((v) => ({
                            ...v,
                            index: val.value,
                          }));
                        }}
                        value={{
                          value: lessonInfo.index,
                          label: <LessonOptionLabel index={lessonInfo.index} />,
                        }}
                        label="Lesson"
                      />

                      <Selector
                        options={languageList.map((l) => ({
                          value: l,
                          label: (
                            <span key={l} className="flex items-center">
                              {l}
                            </span>
                          ),
                        }))}
                        onSelect={(val) => {
                          setLanguage(validateLanguage(val.value));
                        }}
                        value={{
                          value: config.language,
                          label: (
                            <span className="flex items-center">
                              {config.language}
                            </span>
                          ),
                        }}
                        label="Language"
                      />
                    </>
                  )}
                  {page === 'story' && (
                    <Selector
                      options={storyList.map((_, i) => ({
                        value: i,
                        label: (
                          <span className="flex" key={_}>
                            Story {i + 1}
                          </span>
                        ),
                      }))}
                      onSelect={(val) => {
                        setStoryInfo((v) => ({
                          ...v,
                          index: val.value,
                        }));
                      }}
                      value={{
                        value: storyInfo.index,
                        label: (
                          <span className="flex">
                            Story {storyInfo.index + 1}
                          </span>
                        ),
                      }}
                      label="Story"
                    />
                  )}
                </div>

                <div className="flex flex-col gap-1 py-1">
                  {['keyboard', 'hands'].map((item) => {
                    const iconClass = 'text-xl relative';
                    if (item === 'Hands' && !visibleCards.keyboard) {
                      return null;
                    }
                    return (
                      <motion.div
                        whileTap={{ y: 2 }}
                        key={item}
                        className="flex items-center font-lato gap-1 select-none cursor-pointer"
                        onClick={() => {
                          setVisibleCards((s) => ({
                            ...s,
                            [item]: !visibleCards[item],
                          }));
                        }}
                      >
                        {visibleCards[item] ? (
                          <MdOutlineCheckBox className={iconClass} />
                        ) : (
                          <MdCheckBoxOutlineBlank className={iconClass} />
                        )}
                        {item}
                      </motion.div>
                    );
                  })}

                  <Selector
                    label="Color Scheme"
                    onSelect={(e) => {
                      setColorScheme(e.value);
                    }}
                    value={{
                      value: colorScheme,
                      label: colorScheme,
                    }}
                    options={colorSchemeList.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                  />
                </div>
                {page !== 'random-type' && (
                  <div className="flex flex-col py-1 gap-1">
                    {['progress', 'speed', 'accuracy'].map((item) => {
                      const iconClass = 'text-xl relative';
                      return (
                        <motion.div
                          whileTap={{ y: 2 }}
                          key={item}
                          className="flex items-center font-lato gap-1 select-none cursor-pointer"
                          onClick={() => {
                            setVisibleCards((s) => ({
                              ...s,
                              [item]: !visibleCards[item],
                            }));
                          }}
                        >
                          {visibleCards[item] ? (
                            <MdOutlineCheckBox className={iconClass} />
                          ) : (
                            <MdCheckBoxOutlineBlank className={iconClass} />
                          )}
                          {item}
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
