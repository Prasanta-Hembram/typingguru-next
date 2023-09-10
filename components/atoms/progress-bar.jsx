import lessonList from '@components/lessons/lesson-list';
import { motion } from 'framer-motion';

const Progressbar = ({ index, lsnIndex }) => {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.5 }}
      className="slider-outer"
    >
      <div className="slider">
        <div
          className="fill"
          style={{ width: `${(index / lessonList[lsnIndex].length) * 100}%` }}
        >
          <span>
            {((index / lessonList[lsnIndex].length) * 100).toFixed(0)}
          </span>
        </div>
      </div>
      <div className="info">
        <span className="start">0%</span>
        <span className="middle">50%</span>
        <span className="end">100%</span>
      </div>
    </motion.div>
  );
};

export default Progressbar;
