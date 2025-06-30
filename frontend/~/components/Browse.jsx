import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { motion } from 'framer-motion'

const Browse = () => {
  useGetAllJobs()
  const { allJobs } = useSelector(store => store.job)
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""))
    }
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3e8ff] via-[#e0e7ff] to-[#f8fafc]">
      <Navbar />
      <motion.div
        className="max-w-7xl mx-auto my-6 px-2 sm:px-4 md:px-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h1 className="font-bold text-2xl sm:text-3xl my-8 mx-4 text-indigo-700">
          Search Results <span className="text-gray-500">({allJobs.length})</span>
        </h1>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08
              }
            }
          }}
        >
          {allJobs.map((job) => (
            <motion.div
              key={job._id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.4, type: "spring" }}
            >
              <Job job={job} />
            </motion.div>
          ))}
        </motion.div>
        {allJobs.length === 0 && (
          <div className="text-center text-gray-500 text-lg mt-16">
            No jobs found.
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Browse