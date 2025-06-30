import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import LatestJobCards from './LatestJobCards';

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  const heading = 'Latest & Top Job Openings';
  const splitHeading = heading.split('');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
      <motion.h1
        ref={ref}
        className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center sm:text-left flex flex-wrap"
      >
        {splitHeading.map((char, index) => (
          <motion.span
            key={index}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ delay: index * 0.04, duration: 0.3 }}
            className={char === ' ' ? 'mr-1' : ''}
          >
            <span className={index < 13 ? 'text-[#6A38C2]' : ''}>{char}</span>
          </motion.span>
        ))}
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {allJobs.length <= 0 ? (
          <motion.span
            className="col-span-full text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No Job Available
          </motion.span>
        ) : (
          allJobs.slice(0, 6).map((job, index) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <LatestJobCards job={job} />
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default LatestJobs;
