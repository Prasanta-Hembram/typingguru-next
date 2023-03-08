import { motion } from 'framer-motion';
import classNames from 'classnames';

const Card = ({ children, className = '', varient = 'lg' }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 1 }}
    className={classNames(
      `shadow-lg rounded-xl flex flex-col select-none cursor-pointer dark:border dark:border-dark-background-keyboard`,
      className,
      {
        'p-5 gap-5': varient === 'lg',
        'p-2': varient === 'sm',
      }
    )}
  >
    {children}
  </motion.div>
);

export default Card;
