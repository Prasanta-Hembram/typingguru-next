import { createRef, useEffect, useRef } from 'react';
import OverlayMenu from 'overlaymenu';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import classNames from 'classnames';

const Selector = ({
  visible,
  setVisible,
  onSelect,
  optionList,
  title,
  selected,
}) => {
  const ref = useRef();

  const refs = optionList.map(() => createRef());

  useEffect(
    () =>
      refs[selected].current &&
      refs[selected].current.scrollIntoView({
        block: 'center',
      }),
    [refs]
  );
  return (
    <OverlayMenu visible={visible} setVisible={setVisible} container_ref={ref}>
      <motion.div
        transition={{ duration: 0.2 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="flex justify-center items-center backdrop-blur-sm fixed w-full h-full z-20 bg-opacity-25 left-0 font-lato cursor-pointer"
      >
        <motion.div
          whileTap={{ y: 2 }}
          className="right-6 top-6 bg-primary-300 absolute p-1 text-xl rounded-full hover:bg-primary-400"
        >
          <FiX />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          ref={ref}
          className="bg-white dark:bg-dark-background  max-h-[30vh] flex flex-col min-w-[13rem] cursor-auto rounded-md overflow-hidden shadow-xl relative bottom-20"
        >
          <div className="flex bg-primary-900 dark:bg-dark-primary-900 text-white p-2 font-bold tracking-wider pb-1">
            {title}
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            {optionList.map((option, index) => (
              <motion.div
                ref={refs[index]}
                whileTap={{ y: 2 }}
                key={option}
                className={classNames(
                  'flex justify-between items-center hover:bg-gray-200  relative py-2 pb-1.5 px-3 text-xs text-center  cursor-pointer dark:hover:bg-gray-700 dark:hover:text-white',
                  {
                    'bg-primary-200': selected === index,
                  }
                )}
                onClick={() => {
                  onSelect(index);
                  setVisible(false);
                }}
              >
                <span className="flex-1">{option}</span>
                {/* Lesson {index + 1} */}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </OverlayMenu>
  );
};

export default Selector;
