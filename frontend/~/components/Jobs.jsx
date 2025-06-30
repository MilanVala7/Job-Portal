import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (searchedQuery) {
      const filtered = allJobs.filter(job => {
        const q = searchedQuery.toLowerCase();
        let salary = {};
        try { salary = JSON.parse(searchedQuery); } catch {
          salary = {};
        }
        const inRange = salary.min !== undefined && job.salary >= salary.min && job.salary <= salary.max;

        return inRange
          ? inRange
          : job.title.toLowerCase().includes(q) ||
          job.location.toLowerCase().includes(q);
      });
      setFilterJobs(filtered);
    } else setFilterJobs(allJobs);
  }, [allJobs, searchedQuery]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <motion.div
        className="max-w-4xl mx-auto px-4 py-8 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}>
        <h1 className="text-4xl font-bold text-gray-800">
          Find Your <span className="text-indigo-600">Next Opportunity</span>
        </h1>
      </motion.div>

      <div className="lg:hidden sticky top-2 right-4 z-40 flex px-4 pb-2">
        <button
          onClick={() => setShowFilter(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 transition"
        >
          <Menu className="w-4 h-4" />
          Filters
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 pb-12 flex">
        <AnimatePresence>
          {showFilter && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowFilter(false)}
              />
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 h-full w-72 max-w-[90%] bg-white z-50 shadow-lg p-5 overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
                  <button
                    onClick={() => setShowFilter(false)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterCard />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <aside className="hidden lg:block lg:w-1/4">
          <FilterCard />
        </aside>

        <div className="flex-1 ml-0 lg:ml-6">
          {filterJobs.length === 0 ? (
            <motion.p
              className="text-center text-gray-500 mt-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}>
              No jobs found.
            </motion.p>
          ) : (
            <motion.div
              className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
              initial="hidden"
              animate="show"
              variants={{
                show: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {filterJobs.map(job => (
                <motion.div
                  key={job._id}
                  className="break-inside-avoid"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ translateY: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                  transition={{ type: 'spring', stiffness: 100 }}
                >
                  <Job job={job} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
