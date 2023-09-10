import {
  configsContext,
  customStoriesContext,
} from '@commons/context/recoil-context';
import lessonList from '@components/lessons/lesson-list';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from 'react-icons/md';
import { FiChevronDown, FiCircle } from 'react-icons/fi';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import classNames from 'classnames';
import { usePersistentRecoilState } from '@components/hooks/use-recoil-presist';
import StoryList from '@components/lessons/story-list';
import { FaCircle } from 'react-icons/fa';
import useThemeHelper from '@components/hooks/use-theme-helper';
import Card from './card';
import Selector from './selector';
import CustomStoriesDialog from './custom-stories-dialog';

const languageList = [
  'English',
  'Hindi',
  'Nepali',
  'Punjabi',
  'Bengali',
  'Tamil',
  'Urdu',
];

const SCard = ({ children, className = '', ...etc }) => {
  const themeStatus = useThemeHelper();
  return (
    <motion.div
      className={classNames(
        'cursor-pointer border border-primary-300 select-none px-6 py-2 rounded-lg shadow-lg hover:border-primary-500 flex items-center gap-2 whitespace-pre justify-between text-xs',
        className,
        {
          'border-dark-primary-900': themeStatus.dark,
        }
      )}
      {...etc}
    >
      {children}
    </motion.div>
  );
};

const Header = ({
  index = 0,
  lsnIndex = 0,
  storyIndex = 0,
  customStoryIndex = 0,
  speed = { speed: 0 },
  accuracy = 100,
  isWithLesson = false,
  isWithStories = false,
  isWithCustomStories = false,
  isRandomType = false,
  isIssuePage = false,
  page = '',
}) => {
  const [configs, setConfigs] = usePersistentRecoilState(configsContext);

  const [lessonModal, setLessonModal] = useState(false);
  const [languageModal, setLanguageModal] = useState(false);
  const [storiesModal, setStoriesModal] = useState(false);
  const [customStoriesModal, setCustomStoriesModal] = useState(false);
  const customStories = useRecoilValue(customStoriesContext());

  return (
    <div className="text-sm z-20">
      <Selector
        visible={lessonModal}
        setVisible={setLessonModal}
        optionList={lessonList.map((_, i) => (
          <div className="flex items-center justify-between" key={_}>
            <span>Lesson {i + 1}</span>
            <span className="text-slate-500 font-redressed">
              {i + 1 <= 12 && 'Middle'}

              {i + 1 > 12 && i + 1 <= 26 && 'Top'}
              {i + 1 > 26 && i + 1 <= 36 && 'Bottom'}
              {i + 1 > 36 && 'All'}
            </span>
          </div>
        ))}
        onSelect={(val) => {
          setConfigs((prev) => ({
            ...prev,
            lsnIndex: val,
          }));
        }}
        selected={configs.lsnIndex}
        title="Lesson"
      />
      <Selector
        visible={languageModal}
        setVisible={setLanguageModal}
        optionList={languageList.map((l) => (
          <span key={l} className="flex items-center">
            {l}
          </span>
        ))}
        onSelect={(val) => {
          setConfigs((prev) => ({
            ...prev,
            language: languageList[val],
          }));
        }}
        selected={languageList.reduce((acc, curr, ind) => {
          if (acc) return acc;
          if (curr === configs.language) {
            return ind;
          }
          return acc;
        }, undefined)}
        title="Language"
      />
      <Selector
        visible={storiesModal}
        setVisible={setStoriesModal}
        optionList={StoryList.map((_, i) => (
          <span className="flex" key={_}>
            Story {i + 1}
          </span>
        ))}
        onSelect={(val) => {
          setConfigs((prev) => ({
            ...prev,
            storyIndex: val,
          }));
        }}
        selected={configs.storyIndex}
        title="Story"
      />
      <CustomStoriesDialog
        visible={customStoriesModal}
        setVisible={setCustomStoriesModal}
      />
      <div className="flex justify-center z-10">
        <div className="flex gap-6 w-full max-w-screen-xl p-3 py-6">
          <span className="flex flex-col fixed text-sm font-redressed tracking-wider gap-1 left-6 top-32">
            <Link href="/">
              <a className="hover:text-primary-500 relative -left-3">Home</a>
            </Link>
            <div className="relative origin-bottom-left flex flex-col items-start border-l gap-1 border-primary-900 text-xs z-[999]">
              {[
                { link: '/lessons', label: 'Lessons' },
                { link: '/stories', label: 'Stories' },
                { link: '/custom-stories', label: 'Custom Stories' },
                { link: '/random-type', label: 'Random Type' },
                { link: '/beta', label: 'Beta' },
                { link: '/issues', label: 'Issues' },
              ].map(({ link, label }) => (
                <Link key={link} href={link}>
                  <a
                    className={classNames('hover:text-primary-500 flex gap-2', {
                      'text-primary-600':
                        page.toLowerCase() === label.toLowerCase(),
                    })}
                  >
                    <span>-&gt;</span>
                    {label}
                  </a>
                </Link>
              ))}
            </div>
          </span>

          {isWithLesson && (
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
                      setConfigs((s) => ({
                        ...s,
                        lsnIndex: _index,
                      }))
                    }
                    key={label}
                    className={classNames(
                      'hover:text-primary-500 flex gap-2  items-center cursor-pointer',
                      {
                        'text-primary-600':
                          configs.lsnIndex >= _index &&
                          configs.lsnIndex <= indexTo,
                      }
                    )}
                  >
                    <span>-&gt;</span>
                    {configs.lsnIndex >= _index &&
                    configs.lsnIndex <= indexTo ? (
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
                <a>
                  <h1 className="text-xl font-resique cursor-pointer select-none inline-flex relative">
                    <span className="whitespace-pre">Typing Guru</span>
                    <span className="font-lato text-xs font-bold text-primary-500 tracking-wider absolute top-[calc(100%-5px)] right-0 capitalize">
                      {` ${page}`}
                    </span>
                  </h1>
                </a>
              </Link>
            </div>

            {!isIssuePage && (
              <div className="flex gap-6">
                {!isRandomType && (
                  <>
                    {configs.Progress && (
                      <Card
                        varient="sm"
                        className="font-redressed px-8 w-[10rem]"
                      >
                        <div>Progress</div>

                        <div className="text-right my-1">
                          <span className="text-xl">
                            {page === 'stories'
                              ? (
                                  (index / StoryList[storyIndex].length) *
                                  100
                                ).toFixed(0)
                              : (
                                  (index / lessonList[lsnIndex].length) *
                                  100
                                ).toFixed(0)}
                          </span>{' '}
                          <span>% done</span>
                        </div>
                      </Card>
                    )}
                    {configs.Speed && (
                      <Card
                        varient="sm"
                        className="font-redressed px-8 w-[10rem]"
                      >
                        <div>Speed</div>
                        <div className="text-right my-1">
                          <span className="text-xl">
                            {(speed && (speed.speed > 300 ? 0 : speed.speed)) ||
                              0}
                          </span>{' '}
                          <span>wpm</span>
                        </div>
                      </Card>
                    )}

                    {configs.Accuracy && (
                      <Card
                        varient="sm"
                        className="font-redressed px-8 w-[10rem]"
                      >
                        <div>Accuracy</div>
                        <div className="text-right my-1">
                          <span className="text-xl">
                            {accuracy > 0 ? accuracy : 0}
                          </span>{' '}
                          <span>%</span>
                        </div>
                      </Card>
                    )}
                  </>
                )}

                <div className="flex flex-col gap-2 font-lato justify-start">
                  <SCard
                    whileTap={{ y: 2 }}
                    onClick={() => {
                      setLanguageModal((s) => !s);
                    }}
                  >
                    {configs.language}
                    <FiChevronDown />
                  </SCard>

                  {isWithLesson && (
                    <SCard
                      whileTap={{ y: 2 }}
                      onClick={() => {
                        setLessonModal((s) => !s);
                      }}
                    >
                      {`Lesson ${lsnIndex + 1}`}
                      <FiChevronDown />
                    </SCard>
                  )}
                  {isWithStories && (
                    <SCard
                      whileTap={{ y: 2 }}
                      onClick={() => {
                        setStoriesModal((s) => !s);
                      }}
                    >
                      {`Story ${storyIndex + 1}`}
                      <FiChevronDown />
                    </SCard>
                  )}
                  {isWithCustomStories && (
                    <SCard
                      whileTap={{ y: 2 }}
                      onClick={() => {
                        setCustomStoriesModal((s) => !s);
                      }}
                    >
                      <span className="truncate max-w-[8rem]">
                        {customStories[customStoryIndex]
                          ? `Story ${customStories[customStoryIndex].name}`
                          : 'Select Story'}
                      </span>
                      <FiChevronDown />
                    </SCard>
                  )}
                </div>

                <div className="flex flex-col gap-1 py-1">
                  {['Keyboard', 'Hands'].map((item) => {
                    const iconClass = 'text-xl relative';
                    if (item === 'Hands' && !configs.Keyboard) {
                      return null;
                    }
                    return (
                      <motion.div
                        whileTap={{ y: 2 }}
                        key={item}
                        className="flex items-center font-lato gap-1 select-none cursor-pointer"
                        onClick={() => {
                          setConfigs((s) => ({
                            ...s,
                            [item]: !configs[item],
                          }));
                        }}
                      >
                        {configs[item] ? (
                          <MdOutlineCheckBox className={iconClass} />
                        ) : (
                          <MdCheckBoxOutlineBlank className={iconClass} />
                        )}
                        {item}
                      </motion.div>
                    );
                  })}

                  <select
                    className="bg-transparent border rounded-md px-1 pb-0.5 my-0.5"
                    onChange={(e) => {
                      setConfigs((c) => ({
                        ...c,
                        colorScheme: e.target.value,
                      }));
                    }}
                    value={configs.colorScheme}
                  >
                    <option value="dark-teal">dark-teal</option>
                    <option value="light-purple">light-purple</option>
                    <option value="light-red">light-red</option>
                    <option value="light-plain">light-plain</option>
                  </select>
                </div>
                {!isRandomType && (
                  <div className="flex flex-col py-1 gap-1">
                    {['Progress', 'Speed', 'Accuracy'].map((item) => {
                      const iconClass = 'text-xl relative';
                      return (
                        <motion.div
                          whileTap={{ y: 2 }}
                          key={item}
                          className="flex items-center font-lato gap-1 select-none cursor-pointer"
                          onClick={() => {
                            setConfigs((s) => ({
                              ...s,
                              [item]: !configs[item],
                            }));
                          }}
                        >
                          {configs[item] ? (
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
